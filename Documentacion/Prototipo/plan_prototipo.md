# Plan para implementar un prototipo de *Trotamundos*

Teniendo en cuenta el diseño hecho con ADD 3.0, yo no implementaría *Trotamundos* como un monolito acoplado a APIs reales, sino como un **prototipo trazable a la arquitectura propuesta**. La clave acá es: **simular todo lo externo** para poder demostrar los flujos sin depender de Gmail, aerolíneas, agencia de viajes o un proveedor de NLU real.

## 1. Objetivo del prototipo

El prototipo debe demostrar que la arquitectura es viable mostrando, como mínimo, los siguientes casos:

| Requerimiento | ¿Qué demostrar? |
|---|---|
| **RF-01** | Agrupar reservas por viaje y visualizarlas en web/móvil (vista unificada). |
| **RF-02** | Alta, edición y baja manual de una reserva. |
| **RF-03/RF-04** | Ingesta de reservas a partir de *correos* y *actualizaciones* de terceros mediante **simuladores**. |
| **RF-05** | Archivado automático de un viaje al completarse. |
| **RF-07** | Filtros/whitelists de remitentes. |
| **RF-06/RF-08** | *Asistente Virtual* con *handoff* hacia una "agencia de viajes" simulada. |
| **RF-10/RF-11** | Compartición controlada de itinerario con link/token y acceso autorizado. |
| **RF-09** | Un camino mínimo hacia analítica (al menos registro de eventos de dominio). |

## 2. Principios a seguir

Basándome en lo que ya está documentado, mantendría estos principios para el código:

| Principio | Aplicación |
|---|---|
| **Hexagonal (Ports & Adapters)** | Seguir [MADR-0005](../MADR/MADR-0005-patron-adaptador-acl.md). El núcleo de `Reservas y Viajes` no debe conocer nada de Gmail, APIs de aerolíneas o la agencia. Todo eso va por *puertos* e *adaptadores*. |
| **Asíncrono y desacoplado** | Aplicar [MADR-0004](../MADR/MADR-0004-procesamiento-asincrono-mensajeria.md). Para la ingesta usar un *event bus* en memoria con *workers*. Esto permite demostrar the pipeline sin levantar Kafka/RabbitMQ. |
| **API por cliente (BFF)** | Seguir [MADR-0007](../MADR/MADR-0007-arquitectura-presentacion.md). Tener un BFF para *web* y, si hay tiempo, uno simplificado para *móvil*. |
| **Simular, no mockear globalmente** | Tratar a correo, proveedores, agencia y NLU como **sistemas externos simulados** con sus propios adaptadores (`*-mock`). Así se ve claro el límite del sistema tal como figura en el [diagrama de contexto](../Diagramas/00_contexto.md). |
| **Trazable al diseño** | Mantener estructura de carpetas que coincida con los módulos definidos en [MADR-0002](../MADR/MADR-0002-descomposicion-modulos-dominio.md) y referenciar MADRs en comentarios or en an `ARCHITECTURE.md` del repo. |

## 3. Stack tecnológico propuesto

Dado que es un prototipo para demostrar arquitectura y no para escalar a 15M usuarios, priorizaría velocidad de desarrollo y legibilidad.

| Capa | Tecnología | Justificación |
|---|---|---|
| **Backend** | `TypeScript` + `NestJS` (o `FastAPI` si se prefiere Python) | Permite organizar por módulos, DI, fácil de mapear a *capas* + *puertos/adapters*. Muy bueno para mostrar trazabilidad con las vistas C&C. |
| **Frontend Web** | `Next.js` (App Router) + `TailwindCSS` | Rápido para armar las vistas (`Mis viajes`, `Detalle de viaje`, `Asistente`, `Compartir`). Se puede simular estado con hooks. |
| **Base de datos** | `PostgreSQL` | Se ajusta al modelo relacional de viajes/reservas. Suficiente para demostrar el *read model* desnormalizado. |
| **Cache/lecturas** | `Redis` (or solo `in-memory` si se quiere cero deps extra) | Para demostrar la idea of *cache-aside* ([MADR-0008](../MADR/MADR-0008-estrategia-cache-cdn.md)) sin complejidad. |
| **Mensajería/Events** | `EventEmitter` nativo (Node) o `BullMQ` with Redis | Demuestra el bus de eventos de [MADR-0004](../MADR/MADR-0004-procesamiento-asincrono-mensajeria.md). With `EventEmitter` basta para el prototipo. |
| **Auth** | `JWT` + rol básico (`USER`, `DATA_TEAM`) | Suficiente para demostrar [MADR-0011](../MADR/MADR-0011-autenticacion-autorizacion.md). El *delegado/OIDC* queda representado por un "Login con proveedor" simulado. |

> Nota: CDN and multiregión quedan como **configuración/documentación** in the prototipo, no es necesario desplegar múltiples regiones para demostrar el diseño.

## 4. Estructura del repositorio

Para mantener el mapeo con el ADD, estructuraría el backend por módulos de dominio con enfoque hexagonal.

```text
trotamundos/
├── apps/
│   ├── web/                # Next.js (BFF + UI)
│   └── api/                # NestJS/FastAPI backend
├── packages/
│   ├── domain/             # Entidades/value objects (Trip, Reservation, etc.) - puro
│   ├── contracts/          # DTOs/event contracts compartidos
│   └── mocks/              # Datos de simulación (emails, proveedores, agencia)
└── docs/                   # Copia de ADD, MADR, Diagramas para trazabilidad
```

Dentro de `apps/api/src/`:

```text
src/
├── modules/
│   ├── identity-access/    # Auth, usuarios, autorización
│   ├── trips-reservations/ # Núcleo: viajes, reservas, ciclo de vida
│   ├── ingestion/          # Ports & Adapters + workers + cola
│   ├── sharing/            # Itinerarios compartidos + tokens
│   ├── analytics/          # Captura eventos + vista mínima analítica
│   └── assistant/          # Chatbot + orquestador + handoff
├── shared/
│   ├── events/             # Event bus, tipos de eventos
│   ├── config/
│   └── http/               # Filtros, guards
└── main.ts
```

Dentro de `ingestion/` seguiría estrictamente `ports/`, `application/`, `adapters/in/`, `adapters/out/` para dejar explícito el patrón elegido en iteración 2.

## 5. Modelo de datos mínimo

No hace falta cubrir todo el schema, con lo justo para los flujos demo alcanza.

| Entidad | Campos clave | Notas |
|---|---|---|
| `User` | `id`, `email`, `name`, `agency_preference_id` | Base para auth y autorización. |
| `Trip` | `id`, `userId`, `title`, `startDate`, `endDate`, `status` (`ACTIVE\|COMPLETED\|ARCHIVED`) | Agrupador principal (RF-01/RF-05). |
| `Reservation` | `id`, `tripId`, `userId`, `type` (`FLIGHT\|HOTEL\|CAR\|TRAIN\|BUS\|OTHER`), `provider`, `bookingRef`, `status`, `startAt`, `endAt`, `rawData`, `source` (`MANUAL\|EMAIL\|PROVIDER`) | Núcleo del itinerario. Guardar `rawData` ayuda a debuggear la normalización. |
| `EmailMessage` (simulado) | `id`, `from`, `subject`, `body`, `receivedAt`, `userId` | Alimenta el conector de correo simulado. |
| `ItineraryShare` | `id`, `tripId`, `ownerId`, `token`, `expiresAt`, `allowedEmails` | Controlado por token + verificación ([MADR-0011](../MADR/MADR-0011-autenticacion-autorizacion.md)). |
| `Conversation`/`Message` | `id`, `userId`, `sessionId`, `role`, `intent`, `payload` | Para el asistente virtual ([MADR-0014](../MADR/MADR-0014-arquitectura-asistente-virtual.md)). |
| `DomainEvent` (log) | `id`, `type`, `payload`, `occurredAt` | Suficiente para "analítica" mínima (RF-09). |

## 6. Estrategia de simulación (clave para este prototipo)

Como el sistema es un portal hacia apps externas, lo práctico es **generar eventos artificiales** desde el propio prototipo.

| Externo | Cómo simularlo | Propósito |
|---|---|---|
| **Correo (IMAP)** | Crear un `email-mock.adapter.ts` con un JSON de correos por usuario (`packages/mocks/emails.json`). Agregar un botón "Sincronizar correo" o un *job* que lea ese archivo. | Demostrar RF-03, RF-07 (whitelist) y el flujo de [iter2_secuencia_actualizacion](../Diagramas/iter2_secuencia_actualizacion.md). |
| **Proveedores de viaje (APIs)** | `provider-mock.adapter.ts` que exponga endpoints internos tipo `GET /mock/providers/:id/reservations/:ref` o que, al recibir un "poll", devuelva actualizaciones/cancelaciones. | Demostrar RF-04 e interoperabilidad ([MADR-0003](../MADR/MADR-0003-enfoque-integracion-externa.md)). |
| **Agencia de viajes preferida** | Servicio `agency-mock.service.ts` con endpoints `POST /handoff` y `GET /cases/:id`. Al recibir un *handoff* del chatbot, crea un "caso" y devuelve un `caseId` + estado. | Demostrar RF-08 y [MADR-0015](../MADR/MADR-0015-integracion-chatbot-handoff.md). |
| **NLU** | `nlu-rule-based.adapter.ts`. Reglas por keywords/intents (`estado`, `reprogramar`, `cancelar`, `problema`, `contactar`). Si no hay match confiable -> sugiere *handoff*. Esto cubre [MADR-0016](../MADR/MADR-0016-build-vs-buy-nlu.md) (razonando build vs buy sin integrar un proveedor pago). | Demostrar RF-06. |
| **Redes sociales / compartir** | Generar un `shareUrl` con `token` único + `expiresAt`. No publicar realmente, solo mostrar el link y validar acceso anónimo con token. | Demostrar RF-10. |
| **Autenticación delegada** | Pantalla "Iniciar sesión" con opción "Simular login con Google/Microsoft" que simplemente emite un JWT local. Deja claro que, en producción, sería OAuth2/OIDC. | Demostrar RF-11. |

## 7. Roadmap de implementación por slices

Yo iría por **vertical slices** (flujo end-to-end) en lugar de hacer todos los módulos a la vez. Esto mantiene viabilidad y permite ir mostrando trazabilidad con las iteraciones del ADD.

| Orden | Slice | Módulos | Objetivo | Trazable a |
|---|---|---|---|---|
| **1** | *Fundamentos* | `identity-access`, `shared/events` | Setup proyecto, auth mock, event bus, conexión DB. Definir entidades base. | Iteración 1 ([MADR-0001](../MADR/MADR-0001-estilo-arquitectura-general.md), [MADR-0002](../MADR/MADR-0002-descomposicion-modulos-dominio.md)) |
| **2** | *Núcleo de viajes* | `trips-reservations` | CRUD manual de reservas, agrupación por viaje, creación/edición/baja, cambio de estado. Vista "Mis viajes". | RF-01, RF-02, RF-05 |
| **3** | *Ingesta simulada* | `ingestion` | Implementar puertos `EmailPort`, `ProviderPort`. Crear `email-mock` y `provider-mock`. Worker que normaliza correos -> crea/actualiza `Reservation` y emite `ReservaDetectada`/`ReservaActualizada`. Agregar whitelist. | Iteración 2 ([MADR-0003](../MADR/MADR-0003-enfoque-integracion-externa.md)-[MADR-0006](../MADR/MADR-0006-acceso-seguro-correo.md)), [vista C&C ingesta](../Diagramas/iter2_cc_ingesta.md) |
| **4** | *Acceso optimizado* | `trips-reservations` (read model) + `web` BFF | Crear endpoint de lectura desnormalizado `GET /viajes` (agrupado). Agregar cache-aside con Redis/in-memory + invalidación al crear/actualizar por eventos. Simplificar payload para "móvil". | Iteración 3 ([MADR-0007](../MADR/MADR-0007-arquitectura-presentacion.md)-[MADR-0010](../MADR/MADR-0010-internacionalizacion-multiregion.md)) |
| **5** | *Compartir + seguridad* | `sharing`, `identity-access` | Generar link compartido con token, expiración, validación sin auth obligatoria pero con autorización por token. Guards para endpoints propios. | Iteración 4 parcial ([MADR-0011](../MADR/MADR-0011-autenticacion-autorizacion.md)) |
| **6** | *Asistente + handoff* | `assistant` | Conversación por sesión, orquestador de diálogo, NLU rule-based, acciones (`consultar_estado_viaje`, `escalar_a_agencia`). Integración con `agency-mock` para generar caso. | Iteración 5 ([MADR-0014](../MADR/MADR-0014-arquitectura-asistente-virtual.md)-[MADR-0016](../MADR/MADR-0016-build-vs-buy-nlu.md)) |
| **7** | *Pulido demo* | `analytics` + UI | Registrar eventos de dominio (`trip.created`, `reservation.ingested`, `share.created`, `handoff.created`). Panel mínimo "Eventos recientes" para el equipo de datos. Ajustar UX para demo. | Cierra trazabilidad con RF-09 y Kanban |

## 8. Interfaz mínima para la demo

No necesito un UI complejo. Con estas pantallas ya se demuestra todo el alcance.

| Pantalla | Componentes | Qué muestra |
|---|---|---|
| **Login** | Botón "Entrar (simulado)" | Autenticación mock. |
| **"Mis Viajes" (Home)** | Cards agrupadas por viaje, fechas, estado (`ACTIVO/COMPLETADO`). Filtros básicos. | RF-01 + ciclo de vida (RF-05). |
| **Detalle de Viaje** | Timeline con reservas (vuelo/hotel/auto), origen (`Manual/Email/Proveedor`), estado. Botón "Agregar reserva manual". | RF-01, RF-02. |
| **"Ingesta" (Panel de simulación)** | Lista de correos mock, botón "Procesar correos", lista de proveedores mock, botón "Simular actualización proveedor". Log de eventos. | RF-03, RF-04, RF-07. Muy útil para explicar el desacoplamiento. |
| **Compartir** | Modal "Compartir itinerario", generar link con expiración, copiar link. Vista pública `/share/[token]` con itinerario read-only. | RF-10. |
| **Asistente Virtual** | Chat widget/página, mensajes usuario/bot, sugerencias de intención, botón "Escalar a agencia", modal con `caseId` devuelto por mock. | RF-06, RF-08. |
| **Admin/Simuladores** | Switches para whitelist, forzar viaje a COMPLETED (para ver archivado), disparar eventos. | Permite demostrar casos sin tocar DB directo. |

## 9. Cómo mantener trazabilidad con el ADD

Para que la implementación siga siendo "spec-driven" tal como pide la consigna:

| Acción | Detalle |
|---|---|
| **Mapeo carpeta -> iteración** | En `README.md` agregar una tabla "Módulo -> Iteración ADD -> MADR -> Vista". |
| **Contratos primero** | Definir interfaces en `ports/` antes de implementar adaptadores. Esto fuerza a pensar en el límite del sistema. |
| **Eventos como contrato** | Centralizar `events/types.ts` con nombres como `reservation.ingested`, `trip.completed`. Reflejan lo que aparece en las secuencias ([iter2_secuencia_actualizacion](../Diagramas/iter2_secuencia_actualizacion.md), [iter5_secuencia_handoff](../Diagramas/iter5_secuencia_handoff.md)). |
| **Feature flags para mocks** | Usar `INGESTION_MODE=MOCK`, `NLU_MODE=RULE_BASED`, `AGENCY_MODE=MOCK`. Esto deja explícito qué se simula vs qué iría a producción. |
| **Documentar decisiones inline** | Si hay un pequeño desvío pragmático para el prototipo (ej. usar EventEmitter en lugar de bus distribuido), dejarlo anotado en `docs/PROTOTYPE_NOTES.md` con justificación. |
| **Validar contra vistas** | Al terminar cada slice, comparar brevemente contra la vista C&C correspondiente (ej. *ingesta* vs `iter2_cc_ingesta.md`). Suele encontrar huecos rápido. |

## 10. Recomendaciones prácticas

- **Empezar por el núcleo**: No empieces por el chatbot. Si `Mis viajes` + `Agregar manual` + `Agrupar por viaje` funcionan bien, ya se ve el valor del producto.
- **Hacer el "botón simular" visible**: El hecho de tener "Sincronizar correo" y "Simular actualización proveedor" es perfecto para una demo. Muestra el pipeline asíncrono sin explicar teoría.
- **Mantener ACL explícita**: En `ingestion/adapters/out`, traducir el JSON del mock al modelo interno. Ahí se ve [MADR-0005](../MADR/MADR-0005-patron-adaptador-acl.md) en acción.
- **No sobreingenieriar el NLU**: Un matcher por regex + intents es más que suficiente. El punto es demostrar el *orquestador* + *handoff*, no un modelo de ML.
- **Pensar en idempotencia**: Para el worker de ingesta, chequear `bookingRef + provider` antes de crear. Esto evita duplicados si apretamos el botón "Procesar correos" dos veces.
- **Read model primero para la home**: Para cumplir con [QA-01/QA-02](../Escenarios_de_atributos_de_calidad.md) conceptualmente, devolver desde un DTO agrupado (`TripWithReservations[]`) evita N+1 y se parece al enfoque propuesto.

**Mi enfoque final:** Implementaría **slices 1-6 funcionales** con todos los externos simulados. El resultado sería un prototipo que "huele" a portal (trae info de otros lados), pero cuyo único punto de verdad es la base de datos de *Trotamundos*, tal como plantea el objetivo de diseño. Eso es, justamente, lo que hay que demostrar con esta arquitectura.
