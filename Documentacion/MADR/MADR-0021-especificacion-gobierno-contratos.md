# MADR-0021: Especificación y gobierno de contratos

## Estado

Propuesta

## Fecha

2026-11-22

## Contexto y planteamiento del problema

El enunciado pide apoyarse en ADR y contratos (*Spec-driven*) para lograr alta trazabilidad (§79).
QA-06 exige interoperabilidad con APIs estándar y el ADD propone pruebas de contrato como evidencia
(§11.4), pero no hay una decisión que defina cómo se especifican, versionan y validan los contratos.
Ya hay decisiones sobre la traducción de contratos externos (MADR-0005), la forma de las APIs por
cliente (MADR-0007) y el traspaso a la agencia (MADR-0015); falta la capa de gobierno que las
sostenga.

## Drivers de decisión

- **QA-06 (Interoperability):** integración con proveedores, correo y redes sociales mediante APIs
  estándar.
- **QA-09 (Modifiability):** incorporar nuevos medios de transporte sin romper contratos existentes.
- **RF-04:** integración con terceros.
- **Requisito del enunciado:** enfoque *Spec-driven* y trazabilidad (§79).

## Opciones consideradas

- **Opción A:** **Spec-first**: contratos formales (OpenAPI para REST, AsyncAPI o esquemas para
  eventos de dominio), versionado y pruebas de contrato en integración continua.
- **Opción B:** **Code-first**: generar la especificación a partir del código implementado.
- **Opción C:** **Documentación informal** (wiki o ejemplos) sin validación automática.

## Resultado de la decisión

Se elige la **Opción A**. Da la evidencia que ADD §11.4 pide para QA-06 y materializa el enfoque
*Spec-driven* del enunciado. Aplica tanto a contratos internos (API por cliente ↔ dominio, eventos
de dominio) como a externos (proveedores de viaje, correo, agencia). El contrato concreto con la
agencia sigue pendiente en el Kanban, según MADR-0015; esta decisión define el mecanismo, no el
acuerdo particular.

## Consecuencias

- Positivas: los cambios incompatibles se detectan antes de integrar; hay trazabilidad entre ADR,
  contratos y vistas; se facilita incorporar nuevos medios de transporte (QA-09).
- Negativas: esfuerzo inicial de escribir y mantener especificaciones y el pipeline de pruebas; no
  garantiza por sí sola la calidad de los proveedores externos; el cumplimiento depende de la
  disciplina del equipo.

## Pros y contras de las opciones

### Opción A — Spec-first con pruebas de contrato
- Positivo: evidencia automática de compatibilidad y trazabilidad con los ADR.
- Negativo: costo de mantener especificaciones y pruebas actualizadas.

### Opción B — Code-first
- Positivo: menos trabajo inicial y especificación siempre derivada del código.
- Negativo: la especificación aparece después del cambio, por lo que un consumidor puede romperse
  antes de detectarlo; debilita el enfoque *Spec-driven*.

### Opción C — Documentación informal
- Positivo: mínimo esfuerzo.
- Negativo: sin validación, las incompatibilidades aparecen tarde y QA-06 queda sin evidencia
  verificable (ADD §11.4).

## Vistas relacionadas

- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)
- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)
- [Iteración 5 — Vista de componentes y conectores del chatbot](../Diagramas/iter5_cc_chatbot.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna pide contratos y *Spec-driven*, pero no prescribe
  formato ni herramientas. Se proponen OpenAPI y AsyncAPI como estándares usuales, sin fijar
  proveedor ni producto.
- **Procedencia de cifras:** no se introducen cifras nuevas. QA-06 no tiene métrica cuantitativa en
  el enunciado (ADD §11.4), así que no se inventa un porcentaje de cobertura de contratos.
- **Coherencia con el prototipo:** la maqueta expone REST y eventos con tipos definidos en código,
  pero no incluye especificaciones formales ni validación automática; la decisión no depende de esa
  implementación.
