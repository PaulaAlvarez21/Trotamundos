# Iteración 5 — Secuencia: conversación y handoff a la agencia

Diagrama de secuencia que muestra cómo el asistente virtual resuelve consultas menores y delega
casos complejos a la agencia de viajes preferida (RF-06, RF-08).

```mermaid
sequenceDiagram
    autonumber
    participant U as Viajero
    participant G as Pasarela de Conversación
    participant N as Motor NLU
    participant D as Gestor de Diálogo
    participant S as Almacén de sesión
    participant A as Ejecutor de Acciones
    participant R as Servicio Reservas y Viajes
    participant AG as Agencia de viajes (externa)

    U->>G: "¿Cuál es el estado de mi vuelo a Madrid?"
    G->>N: Analiza intención y entidades
    N-->>D: Intención: consultar_estado (vuelo, Madrid)
    D->>S: Recupera contexto de conversación
    D->>A: Ejecuta acción consultar_estado
    A->>R: Consulta reserva del usuario
    R-->>A: Estado actualizado
    A-->>D: Resultado
    D->>S: Actualiza contexto
    D-->>G: Respuesta
    G-->>U: "Tu vuelo a Madrid está confirmado..."

    U->>G: "Quiero reprogramar y pedir compensación"
    G->>N: Analiza intención
    N-->>D: Intención: caso_complejo
    D->>S: Marca caso para escalamiento
    D->>AG: Handoff con contexto del caso
    AG-->>U: Continúa la gestión del caso
    Note over D,AG: Los casos complejos se delegan; los menores se resuelven en el bot
```

## Leyenda

| Símbolo | Significado |
|---|---|
| `participant X as Nombre` **(participante)** | Participante de la secuencia: actor, componente o sistema externo |
| `->>` **(flecha sólida)** | Mensaje o llamada enviada por el participante de origen |
| `-->>` **(flecha punteada)** | Respuesta o retorno hacia el participante de origen |
| `alt / else / end` **(bloque condicional)** | Alternativa condicional: se ejecuta solo la rama que cumple la condición |
| `Note over` **(nota)** | Anotación del escenario (restricción o regla), no un mensaje |
| `autonumber` **(numeración)** | Numeración de los pasos para seguir el orden del flujo |

**Símbolos presentes en esta vista:** `participant`, `->>`, `-->>`, `Note over` y `autonumber`.

## Notas

- El bot actúa como **primer nivel**; el escalamiento libera a la agencia de casos triviales.
- El handoff transfiere el contexto para evitar repetir información al usuario.
- El asistente **no** ejecuta operaciones destructivas sin confirmación del usuario (usabilidad).

## Decisiones relacionadas
- [MADR-0015 Integración del chatbot y handoff](../MADR/MADR-0015-integracion-chatbot-handoff.md)

## Vistas relacionadas
- [Iteración 5 — Vista de componentes y conectores del chatbot](./iter5_cc_chatbot.md)
