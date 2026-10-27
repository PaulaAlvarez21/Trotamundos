# MADR-0008: Estrategia de caché y CDN para el camino de lectura

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

El panel es de **uso intensivo de lectura**: los usuarios consultan sus itinerarios mucho más de lo
que los modifican. Los objetivos de rendimiento (QA-01: 800 ms web; QA-02: FCP móvil < 1,4 s) y la
escalabilidad ante picos (QA-05) exigen evitar que cada consulta llegue hasta la base de datos y que
cada carga descargue todos los recursos estáticos.

## Drivers de decisión

- **QA-01 (Performance web), QA-02 (Arranque móvil).**
- **QA-05 (Modifiability):** soportar picos de lectura.
- **Performance tactic:** reducir el trabajo en el camino crítico.

## Opciones consideradas

- **Opción A:** **CDN** para recursos estáticos + **caché de consultas** (*cache-aside*) delante del
  camino de lectura.
- **Opción B:** **Sin caché** (cada consulta a la base de datos y cada recurso al servidor).
- **Opción C:** **Caché solo en el cliente** (navegador/app).
- **Opción D:** **Caché solo en la base de datos** (buffer pool).

## Resultado de la decisión

Se elige la **Opción A**. La CDN acerca los recursos estáticos al usuario (mejora el FCP móvil, QA-02)
y la caché de consultas reduce la latencia y la carga sobre la base de datos (QA-01, QA-05). Es la
combinación que ataca tanto el arranque como las consultas recurrentes.

## Consecuencias

- Positivas: menores latencias; menos carga en BD; mejor tolerancia a picos; costo de egreso reducido
  por *offload* de estáticos.
- Negativas: **consistencia eventual** (datos potencialmente obsoletos dentro del TTL); hay que
  definir TTL e invalidación al escribir.

## Pros y contras de las opciones

### Opción A — CDN + caché de consultas
- Positivo: cubre arranque y consultas; gran impacto en QA-01/02/05.
- Negativo: necesita política de invalidación (consistencia eventual).

### Opción B — Sin caché
- Positivo: siempre datos frescos y diseño simple.
- Negativo: mayor latencia y carga; difícil cumplir QA-01/02 ante picos.

### Opción C — Solo caché de cliente
- Positivo: simple y sin infraestructura.
- Negativo: no ayuda al primer contenido (FCP) ni a la carga del servidor; limitada y volátil.

### Opción D — Solo caché de base de datos
- Positivo: transparente para la aplicación.
- Negativo: no evita el viaje de red ni reduce consultas repetidas; poco impacto en latencia de API.

## Vistas relacionadas

- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)
- [Iteración 3 — Secuencia de consulta web](../Diagramas/iter3_secuencia_consulta_web.md)
- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no especifica TTL ni tecnología de caché. Se dejan
  como parámetros configurables; el TTL debe equilibrar frescura (QA-03) y rendimiento (QA-01).
