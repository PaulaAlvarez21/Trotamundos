# MADR-0016: Construir vs. comprar el motor de NLU del chatbot

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

El módulo de asistente virtual (MADR-0014) necesita interpretar lenguaje natural (intención y
entidades). Existen varias formas de obtener esa capacidad, con distintos costos, esfuerzos y
niveles de control. La decisión condiciona el esfuerzo inicial del equipo y la evolucionabilidad.

## Drivers de decisión

- **RF-06:** capacidad de comprender lenguaje natural.
- **Restricción:** equipo pequeño de *startup*.
- **QA-09 (Modifiability):** poder cambiar/mejorar el modelo sin rehacer el bot.
- **Architectural concern:** costo y *time-to-market*.

## Opciones consideradas

- **Opción A:** **Comprar**: usar un **servicio de NLU gestionado** (por ejemplo, un servicio de
  comprensión de lenguaje de un proveedor de nube o un LLM con API).
- **Opción B:** **Construir**: entrenar y operar un **modelo propio** *in-house*.
- **Opción C:** **Librería open source auto-hospedada** (framework de NLU).
- **Opción D:** **Sin NLU**: clasificador por reglas/expresiones.

## Resultado de la decisión

Se elige la **Opción A (comprar un servicio gestionado)**, dejando el motor NLU detrás de una
interfaz (puerto) para poder reemplazarlo. Para una *startup*, comprar acelera el *time-to-market* y
evita el costo de entrenar y operar modelos; el encapsulamiento permite migrar a otra opción luego
(QA-09). El riesgo de dependencia del proveedor se mitiga con esa frontera.

## Consecuencias

- Positivas: rápido de integrar; sin necesidad de datos de entrenamiento propios; escalable.
- Negativas: costo por uso y dependencia de un tercero; posibles límites de personalización; hay que
  cuidar la privacidad de los datos enviados al proveedor.

## Pros y contras de las opciones

### Opción A — Servicio gestionado (comprar)
- Positivo: rápido, sin operar modelos; buen *baseline* de precisión.
- Negativo: dependencia y costo recurrente; privacidad de datos a gestionar.

### Opción B — Modelo propio (construir)
- Positivo: control total y personalización; sin datos hacia terceros.
- Negativo: requiere datos, experiencia y cómputo; alto esfuerzo para una *startup*.

### Opción C — Open source auto-hospedado
- Positivo: control de datos; sin costo de licencia por uso.
- Negativo: hay que desplegar, ajustar y operar; esfuerzo mayor que comprar.

### Opción D — Sin NLU (reglas)
- Positivo: simple, determinista, sin dependencias.
- Negativo: frágil ante el lenguaje natural; mala escalabilidad del mantenimiento; experiencia pobre.

## Vistas relacionadas

- [Iteración 5 — Vista de componentes y conectores del chatbot](../Diagramas/iter5_cc_chatbot.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna **no** indica qué motor usar ni si construir o
  comprar. Se recomienda comprar por encaje con las restricciones de la *startup*, y se deja la
  decisión abierta y aislada tras una interfaz para poder revertirla. La elección final requiere
  validar costos, privacidad y precisión (queda en el *backlog*).
