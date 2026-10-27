# Trotamundos - Prototipo

Este prototipo sigue la arquitectura propuesta en el ADD 3.0 del sistema Trotamundos. Se simulan todos los sistemas externos para poder demostrar los flujos sin depender de APIs reales.

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
- Backend: Node.js + TypeScript + Express (simple para entender)
- Frontend: Next.js + TailwindCSS
- DB: SQLite (fácil para correr sin instalar Postgres) - se puede migrar después
- Eventos: EventEmitter (in-memory) - simula bus asíncrono
- Mocks: JSON + servicios internos

## Cómo correr

**Primera vez:**
```bash
# API
cd apps/api && npm install && npm run dev
# Web (otra terminal)
cd apps/web && npm install && npm run dev
```

**Siguientes veces (si ya existe node_modules/):**
```bash
# API
cd apps/api && npm run dev
# Web (otra terminal)
cd apps/web && npm run dev
```

## Feature flags
- `INGESTION_MODE=MOCK`
- `NLU_MODE=RULE_BASED` 
- `AGENCY_MODE=MOCK`
