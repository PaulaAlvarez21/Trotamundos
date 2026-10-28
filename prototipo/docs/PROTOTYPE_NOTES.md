# Notas del Prototipo

## Estilos y tácticas aplicadas

El prototipo refleja los estilos y tácticas definidos en el diseño ADD:

- **Cliente-Servidor (multitier)**: API REST (`apps/api`) + frontend (`apps/web`), con separación entre presentación, aplicación y dominio.
- **Capas**: Organización por módulos de dominio con responsabilidades bien definidas.
- **Ports & Adapters (Hexagonal)**: Aplicado en `ingestion/` con `ports/` (interfaces) y `adapters/out/` (mocks), con ACL para normalización.
- **Publish-Subscribe**: `shared/events/eventBus.ts` basado en `EventEmitter`, usado para desacoplar ingesta, actualización y analítica.
- **CQRS ligero**: Separación entre consultas (lectura agrupada por viaje) y comandos (creación/actualización manual), sin infraestructura compleja.
- **Backend for Frontends (BFF)**: `main.ts` agrega endpoints específicos para la web (`/trips`, `/share/public/:token`, etc.).
- **Tácticas**: Desacoplamiento por eventos (rendimiento/modificabilidad), puertos/adaptadores (interoperabilidad), whitelist + tokens (seguridad), aislamiento de analítica (escalabilidad/seguridad), NLU rule-based con handoff (modificabilidad/extensibilidad).

## Decisiones pragmáticas (desvíos menores para el prototipo)

- **EventEmitter vs bus distribuido**: Se usa `EventEmitter` in-memory en lugar de Kafka/RabbitMQ. Esto permite demostrar el desacoplamiento asíncrono sin complejidad. Justificación: suficiente para mostrar el patrón de MADR-0004.
- **SQLite vs PostgreSQL**: El diseño plantea PostgreSQL, pero para facilitar ejecución local se usa almacenamiento en memoria. El modelo de datos es compatible.
- **Express vs NestJS**: Se optó por Express por simplicidad para que sea más fácil de entender. La estructura por módulos mantiene la trazabilidad con el diseño.
- **Autenticación mock**: Se simula con JWT estático en lugar de OAuth2/OIDC completo. Se deja claro que en producción sería delegada (MADR-0011).
- **NLU rule-based**: Se usa regex/keywords en lugar de un proveedor de NLU. Demuestra el orquestador y handoff sin costo (MADR-0016).

## Lo que se simula
- Correos (IMAP)
- APIs de proveedores de viaje
- Agencia de viajes preferida
- Proveedor de NLU
- Redes sociales para compartir
- Proveedor de identidad (OAuth)

## Trazabilidad
Cada módulo sigue la estructura hexagonal donde aplica (ingestion) y mantiene separación por dominio según MADR-0002.
