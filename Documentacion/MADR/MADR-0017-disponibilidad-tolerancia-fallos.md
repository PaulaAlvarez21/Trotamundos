# MADR-0017: Estrategia de disponibilidad y tolerancia a fallos

## Estado

Propuesta

## Fecha

2026-11-22

## Contexto y planteamiento del problema

El enunciado exige disponibilidad global y continua, con un máximo de 5 minutos por mes de
inactividad no planificada (QA-04). Las iteraciones anteriores tomaron decisiones que aportan a ese
objetivo —clúster balanceado (MADR-0001), cola con idempotencia y DLQ (MADR-0004) y autorización
redundante (MADR-0011)— pero ninguna define cómo se toleran los fallos en conjunto ni cómo se
contabilizan las interrupciones parciales. El ADD la registra como brecha (§11.3) y QA-04 sigue
*Parcial* en el backlog (§9.1). Hay que decidir la estrategia sin inventar un reparto del techo de
disponibilidad ni presentar mediciones que no existen.

## Drivers de decisión

- **QA-04 (Availability):** ≤ 5 min de inactividad no planificada por mes.
- **QA-05 (Modifiability):** absorber picos de tráfico sin degradar el servicio.
- **QA-03 (Frescura):** no perder actualizaciones ante fallos transitorios.
- **Architectural concern:** evitar puntos únicos de fallo, táctica ya presente en MADR-0001.

## Opciones consideradas

- **Opción A:** **Redundancia + degradación controlada**: *health checks*, *timeouts*, *circuit
  breaker* hacia proveedores, reintentos con *backoff* y *fallback* a caché/modelo de lectura.
- **Opción B:** **Solo redundancia de instancias**, según lo ya decidido en MADR-0001, sin manejo
  explícito de fallos de dependencias.
- **Opción C:** **Replicación síncrona de la base de datos** para conmutación automática.

## Resultado de la decisión

Se elige la **Opción A**. Cubre tanto la caída de instancias como la de dependencias externas sin
exigir consistencia síncrona, y aprovecha decisiones ya tomadas: la cola de MADR-0004 absorbe picos
y conserva eventos, y el modelo de lectura de MADR-0009 permite seguir sirviendo consultas ante un
fallo de escritura. No se afirma que el techo de 5 min/mes se cumple: no hay medición ni reparto del
presupuesto por componente, y la consigna no define cómo contabilizar interrupciones parciales.

## Consecuencias

- Positivas: tolera fallos parciales sin detener el camino de lectura; reutiliza la estructura ya
  decidida en lugar de agregar otra infraestructura.
- Negativas: requiere implementar y probar *timeouts*, reintentos y *fallbacks*; la degradación
  implica consistencia eventual; la brecha de medición de QA-04 (ADD §11.3) permanece abierta.

## Pros y contras de las opciones

### Opción A — Redundancia + degradación controlada
- Positivo: cubre dependencias externas y mantiene disponible la lectura ante fallos de escritura.
- Negativo: más complejidad; los parámetros (umbrales de *timeout*, *backoff*) no los da la consigna.

### Opción B — Solo redundancia de instancias
- Positivo: es simple y ya está decidida en MADR-0001.
- Negativo: no cubre fallos de la base, la cola, la autorización ni los proveedores, que es justamente
  donde está la brecha de QA-04.

### Opción C — Replicación síncrona de la base
- Positivo: consistencia fuerte y conmutación automática ante fallo de la primaria.
- Negativo: añade latencia y complejidad, no resuelve fallos de proveedores externos e introduce
  consistencia síncrona donde MADR-0004 decidió asincronía para la ingesta.

## Vistas relacionadas

- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)
- [Iteración 1 — Vista de componentes y conectores general](../Diagramas/iter1_cc_general.md)
- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna da el objetivo (5 min/mes) pero no prescribe
  tácticas ni un reparto por componente. Se proponen prácticas estándar como decisión de diseño, no
  como resultado demostrado.
- **Procedencia de cifras:** 5 min/mes es un requisito del enunciado. La conversión a ≈ 99,988 % con
  el supuesto explícito de mes de 30 días está registrada en `ADD.md`, Paso 7 de la Iteración 1. No se
  inventa un reparto por componente ni se mide disponibilidad real.
- **Coherencia con el prototipo:** la maqueta incluye un endpoint `/health`, pero no implementa
  redundancia, reintentos ni *circuit breaker*; la decisión no depende de esa implementación.
