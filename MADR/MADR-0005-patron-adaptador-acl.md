# MADR-0005: Encapsular los proveedores externos con adaptadores (Ports & Adapters / ACL)

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Los proveedores externos tienen contratos heterogéneos (distintos formatos, versiones, semánticas y
tecnologías). Si los detalles de esas APIs "permean" la lógica de negocio de Trotamundos, cualquier
cambio de un proveedor obligaría a modificar el núcleo, y agregar un nuevo medio de transporte
(trenes, autobuses) sería costoso.

## Drivers de decisión

- **QA-06 (Interoperability):** integrar contratos distintos mediante interfaces estándar.
- **QA-09 (Modifiability):** agregar proveedores/medios con cambios localizados.
- **Architectural concern:** bajo acoplamiento y alta portabilidad.

## Opciones consideradas

- **Opción A:** **Ports & Adapters (Hexagonal)** con **Capa Anticorrupción (ACL / Wrapper)**: un
  adaptador por proveedor que traduce su contrato al modelo interno.
- **Opción B:** **Integración directa**: la lógica de negocio llama directamente a cada API.
- **Opción C:** **ESB** central que media todas las integraciones.
- **Opción D:** **Librería compartida** de clientes usada por el núcleo.

## Resultado de la decisión

Se elige la **Opción A**. Cada proveedor se encapsula tras un puerto de dominio, y un adaptador
traduce el contrato externo al modelo interno de reservas. Así, un cambio o un proveedor nuevo se
resuelve escribiendo/cambiando un adaptador, sin tocar el núcleo (QA-09), y el núcleo solo conoce su
modelo interno (QA-06).

## Consecuencias

- Positivas: cambios localizados por proveedor; el núcleo queda aislado; facilita pruebas con
  *stubs*/dobles de los adaptadores.
- Negativas: introduce una capa de traducción y algo de sobrecarga; hay que mantener el mapeo cuando
  cambian los contratos externos.

## Pros y contras de las opciones

### Opción A — Ports & Adapters / ACL
- Positivo: desacopla el núcleo; alta evolucionabilidad y testabilidad.
- Negativo: una indirección más y esfuerzo de mapeo.

### Opción B — Integración directa
- Positivo: menos código inicial.
- Negativo: acopla el núcleo a cada proveedor; cambios externos impactan la lógica de negocio.

### Opción C — ESB central
- Positivo: mediación y transformación centralizadas.
- Negativo: sobredimensionado y costoso para una *startup*; introduce un componente central pesado.

### Opción D — Librería compartida de clientes
- Positivo: reutilización de clientes.
- Negativo: no aísla el modelo del núcleo; el cambio de contrato igualmente lo afecta.

## Vistas relacionadas

- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna pide "integración fluida con APIs estándar" pero no
  impone un patrón. Se elige Ports & Adapters/ACL por ser una táctica de interoperabilidad y
  modificabilidad de la bibliografía.
