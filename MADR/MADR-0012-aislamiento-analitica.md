# MADR-0012: Aislar la analítica en un almacén dedicado (CDC/ETL)

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Trotamundos recopila datos analíticos (tendencias, destinos, cancelaciones) para monetizarlos, lo que
implica **consultas analíticas pesadas** (RF-09). Si esas consultas se ejecutan sobre la base de datos
transaccional, competirán por recursos con la operación en línea y degradarán el rendimiento (QA-01)
justo durante los picos (QA-05).

## Drivers de decisión

- **RF-09:** analítica de datos con consultas pesadas.
- **QA-01 (Performance web).**
- **QA-05 (Modifiability).**
- **Performance tactic:** aislar recursos (resource isolation / pooling).

## Opciones consideradas

- **Opción A:** **CDC/ETL por lotes** hacia un **almacén analítico** separado; las consultas pesadas
  corren allí.
- **Opción B:** Ejecutar las consultas analíticas **sobre la base transaccional**.
- **Opción C:** Usar una **réplica de lectura** como base analítica.
- **Opción D:** **Exportación manual periódica** de datos para análisis externo.

## Resultado de la decisión

Se elige la **Opción A**. Un proceso de captura de cambios/ETL sincroniza los datos hacia un almacén
analítico (orientado a consultas de agregación), aislando por completo la carga analítica de la
operación transaccional. Así, el equipo de datos consulta sin afectar QA-01 y ambos entornos escalan
según necesidades distintas (QA-05).

## Consecuencias

- Positivas: rendimiento transaccional protegido; el almacén analítico se modela para agregaciones;
  escalado independiente.
- Negativas: **consistencia eventual** (datos analíticos con retraso); costo y mantenimiento del
  pipeline y del almacén.

## Pros y contras de las opciones

### Opción A — Almacén analítico con CDC/ETL
- Positivo: aislamiento total de la carga analítica; óptimo para QA-01/05.
- Negativo: requiere pipeline; datos no en tiempo real.

### Opción B — Consultas sobre la transaccional
- Positivo: sin infraestructura extra; datos al día.
- Negativo: las consultas pesadas degradan la operación en línea. **Se descarta.**

### Opción C — Réplica de lectura como base analítica
- Positivo: descarga la primaria con poco esfuerzo.
- Negativo: la réplica sigue teniendo un esquema transaccional, poco óptimo para agregaciones; las
  consultas pesadas compiten con las lecturas del panel.

### Opción D — Exportación manual
- Positivo: mínimo costo.
- Negativo: no automatizable, propenso a errores, sin frescura; no sirve para monetización continua.

## Vistas relacionadas

- [Iteración 4 — Vista de seguridad y analítica](../Diagramas/iter4_cc_seguridad_analitica.md)
- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no detalla la solución analítica; se propone
  aislamiento por CDC/ETL como táctica de rendimiento, coherente con la arquitectura multitier.
- La "monetización" de los datos es un objetivo de negocio, no un requisito de diseño adicional.
