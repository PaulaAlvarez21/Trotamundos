# MADR-0009: Modelo de lectura y réplicas para las consultas

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Las consultas del panel deben agrupar reservas por viaje (RF-01), lo que sobre un modelo
transaccional normalizado implica *joins* costosos. Además, la carga de lectura es mucho mayor que
la de escritura y llega en picos (QA-05). Si todas las lecturas golpean la base transaccional
primaria, se compromete el rendimiento (QA-01) y la disponibilidad.

## Drivers de decisión

- **QA-01 (Performance web).**
- **QA-05 (Modifiability).**
- **RF-01:** agrupar reservas por viaje.
- **Performance tactic:** reducir la contención sobre el recurso crítico.

## Opciones consideradas

- **Opción A:** **Réplica de lectura** + **modelo de lectura desnormalizado** (CQRS "ligero", sin
  proyecciones por eventos complejas).
- **Opción B:** Solo base transaccional **primaria** para lecturas y escrituras.
- **Opción C:** Solo **caché**, sin réplica de lectura.
- **Opción D:** **CQRS completo** con proyecciones mantenidas por eventos.

## Resultado de la decisión

Se elige la **Opción A**. Una réplica de lectura descarga las consultas de la primaria, y un modelo
de lectura desnormalizado (por ejemplo, "reservas agrupadas por viaje" ya materializadas) evita
*joins* costosos. Esto satisface QA-01 y mejora la escalabilidad (QA-05) sin la complejidad total de
un CQRS con proyecciones por eventos.

## Consecuencias

- Positivas: lecturas rápidas; menor contención en la primaria; buen escalado de lectura.
- Negativas: **consistencia eventual** entre primaria y réplica/modelo; hay que mantener la
  sincronización; el modelo desnormalizado consume almacenamiento y requiere actualización.

## Pros y contras de las opciones

### Opción A — Réplica + modelo de lectura
- Positivo: buen equilibrio entre rendimiento y complejidad.
- Negativo: consistencia eventual y mantenimiento de la vista.

### Opción B — Solo primaria
- Positivo: consistencia fuerte y máxima simplicidad.
- Negativo: las consultas compiten con las escrituras; difícil cumplir QA-01 bajo picos.

### Opción C — Solo caché
- Positivo: evita consultas repetidas con poco esfuerzo.
- Negativo: en caso de fallo de caché, la consulta cae igualmente sobre la primaria con *joins*
  costosos; no resuelve el problema del modelo.

### Opción D — CQRS completo
- Positivo: máxima optimización y desacoplamiento de lectura/escritura.
- Negativo: complejidad y costo elevados (proyecciones, *replay* de eventos); probable
  sobredimensionamiento para el alcance del TPE.

## Vistas relacionadas

- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)
- [Iteración 3 — Secuencia de consulta web](../Diagramas/iter3_secuencia_consulta_web.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no exige CQRS. Se adopta una variante "ligera"
  (réplica + vista desnormalizada) como equilibrio razonable para un prototipo implementable.
