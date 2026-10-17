# MADR-0015: Integración del chatbot con el dominio y handoff a la agencia

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

El asistente virtual (MADR-0014) debe **resolver** consultas de estado y problemas menores actuando
sobre el dominio de reservas, y **delegar** los casos complejos a la agencia de viajes preferida del
usuario (RF-06, RF-08). Hay que decidir cómo interactúa el bot con el resto del sistema y cómo se
produce ese traspaso (*handoff*).

## Drivers de decisión

- **RF-06:** chatbot como primer nivel de soporte.
- **RF-08:** resolución de problemas con la agencia de viajes preferida.
- **QA-06 (Interoperability):** integración con la agencia externa.
- **QA-07/QA-08 (Security):** el bot no debe exponer datos ni actuar sin autorización.

## Opciones consideradas

- **Opción A:** **Orquestador con ejecutor de acciones** sobre el dominio (vía API) + **handoff con
  contexto** a la agencia para casos complejos.
- **Opción B:** Chatbot **aislado**, sin acceso al dominio (solo responde FAQ).
- **Opción C:** Derivar **todo** a la agencia (el bot solo saluda y transfiere).
- **Opción D:** Enlaces a **autoservicio** (páginas de ayuda) en lugar de acciones.

## Resultado de la decisión

Se elige la **Opción A**. El bot resuelve lo resoluble invocando capacidades del dominio a través de
una frontera controlada, y ante casos complejos transfiere a la agencia **con el contexto** de la
conversación, evitando que el usuario repita información. Satisface RF-06 (primer nivel real) y RF-08
(delegación efectiva), y respeta la seguridad al no exponer datos más allá de lo autorizado.

## Consecuencias

- Positivas: descarga a la agencia de casos triviales; mejor experiencia del usuario; reutiliza el
  dominio existente.
- Negativas: el ejecutor de acciones es sensible y debe validar autorización; el handoff depende de
  la integración con la agencia.

## Pros y contras de las opciones

### Opción A — Orquestador + acciones + handoff
- Positivo: cubre RF-06 y RF-08 de forma completa y contextual.
- Negativo: mayor responsabilidad de seguridad en las acciones.

### Opción B — Chatbot aislado (FAQ)
- Positivo: mínimo riesgo (no toca datos).
- Negativo: no resuelve reprogramaciones ni consultas de estado; no cumple RF-06.

### Opción C — Derivar todo
- Positivo: simple.
- Negativo: no aporta valor como primer nivel; contradice el espíritu de RF-06.

### Opción D — Autoservicio por enlaces
- Positivo: reutiliza documentación existente.
- Negativo: no es conversacional ni proactivo; mala experiencia; no gestiona casos.

## Vistas relacionadas

- [Iteración 5 — Vista de componentes y conectores del chatbot](../Diagramas/iter5_cc_chatbot.md)
- [Iteración 5 — Secuencia de conversación y handoff](../Diagramas/iter5_secuencia_handoff.md)

## Notas e inferencias

- **Inferencia/decision consciente:** ni el mecanismo de handoff ni el contrato con la agencia están
  especificados en la consigna; se proponen como integración vía API con transferencia de contexto.
