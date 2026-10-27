# MADR-0004: Procesar la ingesta de forma asíncrona con mensajería

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

La llegada de correos y de actualizaciones de proveedores es **irregular** y puede crecer de forma
abrupta ante disrupciones masivas de viajes (tormentas, huelgas, cancelaciones en cadena). Procesar
esa carga de forma síncrona, en el mismo hilo de la petición, acoplaría la ingesta a la persistencia
y expondría al sistema a picos que degradarían el rendimiento y la disponibilidad.

## Drivers de decisión

- **QA-05 (Modifiability):** soportar picos dramáticos de tráfico.
- **QA-04 (Availability):** que una caída momentánea no pierda datos.
- **QA-03 (Frescura):** procesamiento dentro de los 5 minutos.
- **Performance:** no degradar el camino de lectura del usuario.

## Opciones consideradas

- **Opción A:** **Cola/bus de mensajes** entre la recepción y el procesamiento (asíncrono,
  *Half-Sync/Half-Async*).
- **Opción B:** Procesamiento **síncrono** dentro de la petición de recepción.
- **Opción C:** Procesamiento por **lotes programados** (*batch*).
- **Opción D:** Llamadas **directas** entre el receptor y el servicio de reservas.

## Resultado de la decisión

Se elige la **Opción A**. La cola/bus desacopla productores de consumidores, absorbe los picos
(buffer), permite reintentos e idempotencia y evita que una caída del consumidor pierda eventos
(QA-04). El procesamiento asíncrono sigue holgadamente dentro de la ventana de 5 minutos (QA-03).

## Consecuencias

- Positivas: absorción de picos; desacoplamiento temporal; reintentos y DLQ; escalado independiente
  de los workers.
- Negativas: introduce **consistencia eventual**; requiere monitoreo del *lag* de la cola y de la
  DLQ; más infraestructura que un procesamiento directo.

## Pros y contras de las opciones

### Opción A — Mensajería asíncrona
- Positivo: resiliencia ante picos y fallos; idempotencia y reintentos naturales.
- Negativo: consistencia eventual y complejidad operativa del broker.

### Opción B — Síncrono
- Positivo: simple; el resultado es inmediato.
- Negativo: acopla recepción y persistencia; un pico o una caída del consumidor degrada o pierde
  la recepción.

### Opción C — Lotes programados
- Positivo: eficiente para volúmenes grandes y constantes.
- Negativo: la latencia puede superar la ventana de 5 minutos según la frecuencia; poca reacción en
  tiempo real.

### Opción D — Llamadas directas
- Positivo: mínima infraestructura.
- Negativo: acoplamiento fuerte y punto único de fallo; no soporta picos.

## Vistas relacionadas

- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)
- [Iteración 2 — Secuencia de actualización externa](../Diagramas/iter2_secuencia_actualizacion.md)
- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no menciona mensajería. Es una decisión de diseño
  derivada de QA-05 y QA-04 (tácticas de *introducir concurrencia* y *mantener múltiples copias*).
