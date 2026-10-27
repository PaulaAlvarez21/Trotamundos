# MADR-0003: Enfoque híbrido de integración externa (webhooks + polling)

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Trotamundos debe obtener detalles, actualizaciones y cancelaciones de reservas desde proveedores
externos (aerolíneas, hoteles, arrendadoras) que exponen APIs con capacidades heterogéneas: algunos
ofrecen notificaciones *push* (webhooks), otros solo consulta (*pull*). El escenario **QA-03** exige
que una actualización se presente en la aplicación dentro de los 5 minutos posteriores a su
generación por la fuente externa, y **QA-06** exige integración mediante APIs estándar.

## Drivers de decisión

- **QA-03:** actualización externa presentada ≤ 5 min.
- **QA-06:** interoperabilidad con contratos y capacidades distintos.
- **QA-04:** tolerar fallos de un proveedor externo.
- **Restricción:** no todos los proveedores soportan el mismo mecanismo.

## Opciones consideradas

- **Opción A:** Enfoque **híbrido**: webhooks para los proveedores que los soportan y *polling*
  periódico para el resto.
- **Opción B:** Solo *polling* periódico para todos.
- **Opción C:** Solo webhooks (exigir webhooks a todos los proveedores).
- **Opción D:** Integración por **lotes nocturnos** (archivos/SFTP).

## Resultado de la decisión

Se elige la **Opción A**. El enfoque híbrido maximiza la frescura (QA-03) aprovechando los webhooks
donde existen y garantiza cobertura universal mediante polling con la periodicidad suficiente para
cumplir la ventana de 5 minutos. Es la única opción que no depende de una capacidad que no todos los
proveedores ofrecen.

## Consecuencias

- Positivas: cumple QA-03 en todos los casos; tolera la heterogeneidad de proveedores (QA-06).
- Negativas: hay que implementar y mantener **dos** caminos de entrada; el polling genera carga
  adicional y puede consumir cuota de las APIs.

## Pros y contras de las opciones

### Opción A — Híbrido (webhooks + polling)
- Positivo: mejor frescura posible sin depender de que todos ofrezcan webhooks.
- Negativo: mayor complejidad (dos mecanismos) y carga del polling.

### Opción B — Solo polling
- Positivo: un único mecanismo uniforme y simple.
- Negativo: para cumplir los 5 minutos hay que sondear muy seguido (carga y cuota); peor latencia
  media que con push.

### Opción C — Solo webhooks
- Positivo: frescura inmediata y menos carga.
- Negativo: **no** es viable con proveedores que no ofrecen webhooks → incumpliría QA-03 y QA-06.

### Opción D — Lotes nocturnos
- Positivo: simple y de bajo costo.
- Negativo: incumple de forma directa la ventana de 5 minutos de QA-03.

## Vistas relacionadas

- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)
- [Iteración 2 — Secuencia de actualización externa](../Diagramas/iter2_secuencia_actualizacion.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no indica qué proveedores ofrecen webhooks. Se
  asume que algunos sí y otros no; por eso el diseño cubre ambos.
- La periodicidad de polling y la política de reintentos son parámetros configurables derivados del
  límite de 5 minutos, no valores dados por la consigna.
