# Trotamundos - Prototipo

Este prototipo sigue la arquitectura propuesta en el ADD 3.0 del sistema **Trotamundos**. Se simulan todos los sistemas externos para poder demostrar los flujos sin depender de APIs reales.

## Mapeo: Módulo -> Iteración ADD -> MADR -> Vista

| Módulo | Iteración | MADRs relacionados | Vistas |
|---|---|---|---|
| `identity-access` | Iteración 1, 4 | [MADR-0001](../../Documentacion/MADR/MADR-0001-estilo-arquitectura-general.md), [MADR-0011](../../Documentacion/MADR/MADR-0011-autenticacion-autorizacion.md) | iter1_capas, iter4_cc_seguridad_analitica |
| `trips-reservations` | Iteración 1, 3 | [MADR-0002](../../Documentacion/MADR/MADR-0002-descomposicion-modulos-dominio.md), [MADR-0007](../../Documentacion/MADR/MADR-0007-arquitectura-presentacion.md), [MADR-0009](../../Documentacion/MADR/MADR-0009-read-model-replicas.md) | iter1_cc_general, iter3_cc_acceso |
| `ingestion` | Iteración 2 | [MADR-0003](../../Documentacion/MADR/MADR-0003-enfoque-integracion-externa.md), [MADR-0004](../../Documentacion/MADR/MADR-0004-procesamiento-asincrono-mensajeria.md), [MADR-0005](../../Documentacion/MADR/MADR-0005-patron-adaptador-acl.md), [MADR-0006](../../Documentacion/MADR/MADR-0006-acceso-seguro-correo.md) | iter2_cc_ingesta |
| `sharing` | Iteración 4 | [MADR-0011](../../Documentacion/MADR/MADR-0011-autenticacion-autorizacion.md) | iter4_secuencia_itinerario_compartido |
| `analytics` | Iteración 4 | [MADR-0012](../../Documentacion/MADR/MADR-0012-aislamiento-analitica.md) | iter4_cc_seguridad_analitica |
| `assistant` | Iteración 5 | [MADR-0014](../../Documentacion/MADR/MADR-0014-arquitectura-asistente-virtual.md), [MADR-0015](../../Documentacion/MADR/MADR-0015-integracion-chatbot-handoff.md), [MADR-0016](../../Documentacion/MADR/MADR-0016-build-vs-buy-nlu.md) | iter5_cc_chatbot, iter5_secuencia_handoff |

## Stack

- **Backend:** Node.js + TypeScript + Express
- **Frontend:** Next.js 14 + TailwindCSS
- **Eventos:** EventEmitter (in-memory) - Simula bus asíncrono
- **Datos:** En memoria (sin base de datos persistente)
- **Mocks:** JSON + servicios internos para simular sistemas externos

## Cómo correr

### Opción 1: Docker (Recomendado)

Desde la carpeta `prototipo/`:

```bash
docker compose up --build
```

Una vez levantado:

- **API:** [http://localhost:4000](http://localhost:4000) - Podés probar `http://localhost:4000/health`
- **Web:** [http://localhost:3000](http://localhost:3000)

Para detenerlo:

```bash
docker compose down
```

### Opción 2: Local con npm/pnpm/yarn

**Primera vez:**

```bash
# API (terminal 1)
cd apps/api && npm install && npm run dev

# Web (terminal 2)
cd apps/web && npm install && npm run dev
```

**Siguientes veces (si ya existe `node_modules/`):**

```bash
# API (terminal 1)
cd apps/api && npm run dev

# Web (terminal 2)
cd apps/web && npm run dev
```

> Si usan `pnpm` o `yarn`, reemplazan `npm install` por `pnpm install`/`yarn` y `npm run dev` por `pnpm dev`/`yarn dev`.

## Flujos para la demo

| Pantalla | Descripción | Requerimiento |
|---|---|---|
| `/` | Login simulado | RF-11 |
| `/trips` | Mis viajes agrupados por viaje. Permite agregar una reserva manual. | RF-01, RF-02, RF-05 |
| `/trips/[id]` | Detalle del viaje con timeline de reservas y opción para compartir. | RF-01, RF-10 |
| `/share/[token]` | Vista pública y de solo lectura del itinerario compartido. | RF-10 |
| `/ingest` | Simulador para procesar correos con whitelist y simular actualizaciones de proveedores. | RF-03, RF-04, RF-07 |
| `/assistant` | Asistente virtual con NLU rule-based y handoff a la agencia mock. | RF-06, RF-08 |
| `/analytics` | Panel con eventos de dominio y estadísticas. | RF-09 |

## Notas importantes

- **Datos en memoria:** Al reiniciar la API o bajar los contenedores con `docker compose down`, se pierden todos los viajes, reservas, shares y casos creados. Esto es intencional para el prototipo.
- **Todo simulado:** Correos, proveedores, agencia de viajes, NLU y autenticación son mocks. No se realiza ninguna llamada a APIs reales.
- **Hot reload:** Tanto con Docker (usando volúmenes) como con `npm run dev`, los cambios en `src/` se reflejan automáticamente.
- **Trazabilidad:** Ver [Documentacion/justificacion_lenguajes.md](../../Documentacion/justificacion_lenguajes.md) y [Documentacion/Prototipo/plan_prototipo.md](../../Documentacion/Prototipo/plan_prototipo.md) para más detalles sobre las decisiones de diseño.
