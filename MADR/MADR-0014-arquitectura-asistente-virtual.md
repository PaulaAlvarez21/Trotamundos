# MADR-0014: Arquitectura del asistente virtual (chatbot)

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Se incorpora el módulo avanzado obligatorio **Opción B: Asistente Virtual (Chatbot)** (RF-06). El bot
debe actuar como **primer nivel de soporte** para gestionar reprogramaciones, consultas de estado y
problemas menores, delegando los casos complejos a la agencia de viajes (RF-08). Hay que decidir cómo
se estructura el módulo dentro de la arquitectura multitier.

## Drivers de decisión

- **RF-06:** módulo avanzado de asistente virtual.
- **QA-10 (Usability):** interfaz rica e interactiva.
- **QA-09 (Modifiability):** incorporar el módulo sin romper lo existente.
- **Architectural concern:** reutilizar la arquitectura existente (multitier).

## Opciones consideradas

- **Opción A:** Módulo por **capas**: pasarela de conversación + motor de NLU + gestor de diálogo +
  ejecutor de acciones (architectural pattern de aplicación conversacional).
- **Opción B:** **Reglas codificadas** sin NLU (respuestas por coincidencia de palabras clave).
- **Opción C:** **Árbol de decisión** guiado por menús.
- **Opción D:** **Integración directa con un LLM** sin orquestación ni control de acciones.

## Resultado de la decisión

Se elige la **Opción A**. La separación en canal, NLU, gestor de diálogo y ejecutor de acciones
mantiene la cohesión y permite evolucionar cada parte por separado (por ejemplo, cambiar de motor
NLU sin tocar el diálogo; ver MADR-0016). Encaja como un módulo más del tier de aplicación, sin
alterar la arquitectura general.

## Consecuencias

- Positivas: componentes desacoplados y evolucionables; el ejecutor de acciones actúa como frontera
  controlada hacia el dominio; reutiliza la arquitectura existente.
- Negativas: más piezas que un enfoque de reglas; requiere gestionar sesión/contexto.

## Pros y contras de las opciones

### Opción A — Capas de aplicación conversacional
- Positivo: desacoplamiento y evolucionabilidad; orquesta acciones reales.
- Negativo: más componentes y esfuerzo que reglas simples.

### Opción B — Reglas sin NLU
- Positivo: implementación simple y predecible.
- Negativo: poca flexibilidad ante lenguaje natural; mantenimiento de reglas creciente; mala
  experiencia ante variaciones.

### Opción C — Árbol de decisión
- Positivo: flujo controlado y simple.
- Negativo: rígido; el usuario debe navegar menús; no maneja bien problemas abiertos.

### Opción D — LLM directo sin orquestación
- Positivo: mínima estructura; respuestas naturales.
- Negativo: sin control de acciones ni trazabilidad; riesgo de ejecutar operaciones indebidas; sin
  separación de responsabilidades.

## Vistas relacionadas

- [Iteración 5 — Vista de componentes y conectores del chatbot](../Diagramas/iter5_cc_chatbot.md)
- [Iteración 5 — Secuencia de conversación y handoff](../Diagramas/iter5_secuencia_handoff.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no prescribe una arquitectura de chatbot. Se
  propone una estructura en capas coherente con la bibliografía y con el resto del sistema.
