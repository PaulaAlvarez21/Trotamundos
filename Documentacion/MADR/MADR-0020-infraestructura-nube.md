# MADR-0020: Modelo de infraestructura y nube

## Estado

Propuesta

## Fecha

2026-11-22

## Contexto y planteamiento del problema

MADR-0001 decidió un despliegue distribuido con clúster balanceado, y la vista de despliegue muestra
nodos genéricos. Sin embargo, el proveedor de nube y las tecnologías concretas siguen sin decidirse:
el ADD lo registra como brecha (§11.5) y como ítem pendiente del Kanban. Dado que el sistema debe
soportar 2 millones de usuarios activos semanales sobre 15 millones de cuentas, con picos marcados,
y que el equipo es pequeño, hay que fijar el modelo de infraestructura sin comprometer un proveedor
que la consigna no menciona.

## Drivers de decisión

- **QA-04 (Availability):** apoyar la redundancia decidida en MADR-0017.
- **QA-05 (Modifiability):** absorber picos marcados de tráfico.
- **QA-09 (Modifiability):** poder cambiar de proveedor con impacto localizado.
- **Restricción:** equipo pequeño de *startup*.

## Opciones consideradas

- **Opción A:** **Servicios gestionados** (base de datos, cola/broker y CDN) detrás de una capa de
  abstracción, con el proveedor concreto a elegir más adelante.
- **Opción B:** **Todo autohospedado sobre IaaS**: instancias, base de datos y broker propios.
- **Opción C:** **Serverless / FaaS primero** para toda la lógica de la aplicación.

## Resultado de la decisión

Se elige la **Opción A**. Reduce la carga operativa de un equipo pequeño y encaja con los
puertos/adaptadores de MADR-0005: la capa de abstracción limita el acoplamiento a un proveedor
futuro. La elección concreta de nube y tecnologías **sigue siendo una decisión abierta del Kanban**;
este MADR decide el modelo, no nombra proveedores ni productos.

## Consecuencias

- Positivas: menos trabajo de operación (parcheo, copias, ajuste de clúster); escalado gestionado
  ante picos; cambio de proveedor con impacto localizado (QA-09).
- Negativas: dependencia de un proveedor que aún no se elige y costo de servicios gestionados bajo
  picos; la abstracción no elimina por sí sola el *vendor lock-in*; no se fijan tecnologías concretas.

## Pros y contras de las opciones

### Opción A — Servicios gestionados con capa de abstracción
- Positivo: operación reducida y escalado gestionado, acorde con el tamaño del equipo.
- Negativo: costo y dependencia futura; requiere una evaluación antes de elegir proveedor.

### Opción B — Todo autohospedado en IaaS
- Positivo: mayor control y portabilidad.
- Negativo: carga operativa alta (parcheo, copias, ajuste del broker), difícil de sostener para una
  *startup* pequeña.

### Opción C — Serverless / FaaS primero
- Positivo: elasticidad y pago por uso.
- Negativo: arranques en frío frente a QA-01/QA-02, acoplamiento al proveedor y desajuste con un
  proceso de aplicación persistente como el descrito en MADR-0001.

## Vistas relacionadas

- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no nombra nube ni tecnologías. Se decide el modelo
  de infraestructura, no el proveedor: ADD §11.5 y el Kanban permanecen como decisión abierta.
- **Procedencia de cifras:** 2 millones de usuarios activos y 15 millones de cuentas son cifras del
  enunciado y se usan solo como indicadores de escala. No se calculan solicitudes por segundo ni
  costos: esa es la brecha de información registrada en ADD §11.1.
- **Coherencia con el prototipo:** la maqueta corre en un entorno local con Docker Compose; eso no
  decide la infraestructura y no se toma como evidencia de esta decisión.
