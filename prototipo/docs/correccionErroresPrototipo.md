# Corrección de errores del prototipo Trotamundos

## Problema identificado

La API no lograba buildear en Docker por dos causas principales:

### 1) Build context incorrecto
- **Antes:** En `docker-compose.yml`, el build de la API tenía como contexto `./apps/api`. 
- **Problema:** Los archivos de `packages/` (usados por imports como `../../../../packages/domain/...`) estaban fuera del contexto de build, por lo que no se podían copiar al contenedor. Los volúmenes solo ayudaban en runtime con hot-reload, pero el `docker build` fallaba.
- **Solución:** Cambiar el contexto a la raíz del monorepo (`.`) y pasar el Dockerfile con `dockerfile: apps/api/Dockerfile`. Así `packages/` queda dentro del contexto de build.

### 2) TypeScript no permite importar fuera de `rootDir`
- **Antes:** `apps/api/tsconfig.json` tenía `"rootDir": "./src"` e `"include": ["src/**/*"]`. 
- **Problema:** Muchos módulos importaban desde `packages/` que está fuera de `src/`, lo que hace que `tsc` falle con errores de compilación.
- **Solución:** Cambiar `rootDir` a `../..` (raíz de `prototipo/`) e incluir `../../packages/**/*` para permitir compilar tanto `src/` como `packages/`.

## Cambios realizados

### 1) `prototipo/docker-compose.yml`
Se modificaron los builds para usar contexto raíz y volúmenes ajustados al nuevo layout dentro del contenedor.

```yaml
services:
  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    container_name: trotamundos-api
    ports:
      - "4000:4000"
    volumes:
      - ./apps/api/src:/app/apps/api/src
      - ./packages:/app/packages
    environment:
      - NODE_ENV=development
    restart: unless-stopped

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    container_name: trotamundos-web
    ports:
      - "3000:3000"
    depends_on:
      - api
    volumes:
      - ./apps/web/src:/app/apps/web/src
    environment:
      - NODE_ENV=development
    restart: unless-stopped
```

### 2) `prototipo/apps/api/Dockerfile`
Ahora copia desde el contexto raíz, instala dependencias en `apps/api/` y copia tanto `apps/api/` como `packages/`.

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY apps/api/package*.json ./apps/api/

RUN cd apps/api && npm install

COPY apps/api ./apps/api
COPY packages ./packages

EXPOSE 4000

WORKDIR /app/apps/api

CMD ["npm", "run", "dev"]
```

### 3) `prototipo/apps/web/Dockerfile`
Análogo al de la API, adaptado al contexto raíz.

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY apps/web/package*.json ./apps/web/

RUN cd apps/web && npm install

COPY apps/web ./apps/web

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["npm", "run", "dev"]
```

### 4) `prototipo/apps/api/tsconfig.json`
Se relaja la restricción de `rootDir` para permitir imports de `packages/`.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "../..",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "declaration": true
  },
  "include": ["src/**/*", "../../packages/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## ¿Por qué el login se quedaba en la misma página?

El código de `apps/web/src/app/page.tsx` ya está correcto:
- Al hacer login exitoso, guarda el token en `localStorage`, pone `logged = true` y **se queda en `/` mostrando el dashboard** (no redirige con `router.push()`).
- Si el API no estaba levantado por los errores de build, el `fetch` a `http://localhost:4000/auth/login` fallaba y nunca se setea `logged = true`, quedándose en el formulario de login.

Con los fixes de build, la API debería levantar correctamente y el login funcionará tal como está implementado.

## Cómo probar después de los cambios

```bash
cd prototipo
docker compose up --build
```

1. Verificar API: [http://localhost:4000/health](http://localhost:4000/health) debe responder OK
2. Abrir web: [http://localhost:3000/](http://localhost:3000/)
3. Login con `test@test.com` → al ingresar, se muestra el dashboard en la misma página `/` con links a `/trips`, `/ingest`, `/assistant`, `/analytics`
4. Seguir el paso a paso de prueba del README

## Correcciones adicionales (tras levantar Docker)

### 5) `prototipo/apps/api/src/modules/trips-reservations/trips.service.ts`
Error: `Property 'reservation' does not exist on type '{}'` al subscribirse a `RESERVATION_INGESTED`. Se hizo más robusto el acceso al payload.

```typescript
eventBus.subscribe(DomainEventType.RESERVATION_INGESTED, (event: any) => {
  const reservation = event?.payload?.reservation ?? event?.reservation ?? event?.payload;
  if (!reservation) return;
  this.reservations.push(reservation);
  this.groupIntoTrip(reservation);
});
```

### 6) `prototipo/apps/web/src/app/trips/page.tsx`
Había código JSX fuera del componente (luego del `return`) que rompía la compilación. Se eliminó ese bloque y se corrigió el cierre del componente.

- Se removió el fragmento:
```jsx
        <div className="mb-4">
          <Link href="/trips/crear" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Agregar reserva manual
          </Link>
        </div>
```
- Se aseguró el cierre correcto: `</main> ) }`

### 7) Imports de JSON en adapters
Los adapters importaban con `import * as ... from '*.json'` y luego hacían `.filter()` lo cual fallaba con CommonJS/ts-node. Se cambió a default import.

- `apps/api/src/modules/ingestion/adapters/out/email-mock.adapter.ts`
- `apps/api/src/modules/ingestion/adapters/out/provider-mock.adapter.ts`
