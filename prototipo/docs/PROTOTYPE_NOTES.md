# Notas del Prototipo

## Decisiones pragmáticas (desvíos menores para el prototipo)

- **EventEmitter vs bus distribuido**: Se usa `EventEmitter` in-memory en lugar de Kafka/RabbitMQ. Esto permite demostrar el desacoplamiento asíncrono sin complejidad. Justificación: suficiente para mostrar el patrón de MADR-0004.
- **SQLite vs PostgreSQL**: El diseño plantea PostgreSQL, pero para facilitar ejecución local se puede usar SQLite. El modelo de datos es compatible.
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
