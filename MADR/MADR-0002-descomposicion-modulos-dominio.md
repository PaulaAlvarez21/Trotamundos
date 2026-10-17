# MADR-0002: Descomponer el tier de aplicación en módulos de dominio

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Una vez elegido el estilo multitier con capas internas (MADR-0001), hay que decidir **cómo se
descompone** el tier de aplicación. El sistema abarca funcionalidades muy distintas (identidad,
reservas, ingesta de correo e integraciones, compartición, analítica y, más adelante, un asistente
virtual). La descomposición elegida condiciona la cohesión y el acoplamiento y, por lo tanto, la
modificabilidad y la evolucionabilidad.

## Drivers de decisión

- **QA-09 (Modifiability):** cambios localizados al agregar medios de transporte.
- **RF-01, RF-03, RF-04:** funcionalidad núcleo (reservas, ingesta, integraciones).
- **Architectural concern:** alta cohesión y bajo acoplamiento (principio de modularidad).
- **RF-06:** incorporación posterior del módulo avanzado (chatbot).

## Opciones consideradas

- **Opción A:** Descomposición por **módulos de dominio** (Identidad y Acceso, Reservas y Viajes,
  Ingesta e Integraciones, Compartición, Analítica, Asistente Virtual) sobre las capas transversales
  aplicación/dominio/persistencia.
- **Opción B:** Descomposición **solo por capa técnica** (presentación / lógica / datos).
- **Opción C:** Descomposición **por tipo de transporte** (vuelos / hoteles / autos / trenes...).
- **Opción D:** Descomposición **por caso de uso**.

## Resultado de la decisión

Se elige la **Opción A**. Los módulos de dominio agrupan responsabilidades cohesionadas y aíslan los
cambios: incorporar un nuevo medio de transporte afecta principalmente a los adaptadores de ingesta
y al modelo de reservas (QA-09). Los módulos reutilizan las capas transversales, de modo que la
lógica de aplicación y de dominio no se dispersa.

## Consecuencias

- Positivas: cambios localizados; fronteras claras entre funcionalidades; permite que iteraciones
  posteriores refinen un módulo sin tocar los demás.
- Negativas: riesgo de duplicar lógica si no se reutilizan bien las capas transversales; requiere
  definir contratos internos entre módulos.

## Pros y contras de las opciones

### Opción A — Módulos de dominio
- Positivo: alta cohesión funcional y bajo acoplamiento; facilita la evolucionabilidad.
- Negativo: más elementos y contratos internos que una descomposición puramente técnica.

### Opción B — Solo por capa técnica
- Positivo: simple y uniforme.
- Negativo: una sola capa de "lógica" concentra responsabilidades dispares; el cambio por
  funcionalidad atraviesa todas las capas y no queda localizado.

### Opción C — Por tipo de transporte
- Positivo: intuitiva para el dominio de viajes.
- Negativo: la lógica transversal (usuarios, compartición, ciclo de vida del viaje) no tiene un
  hogar natural; obliga a duplicarla.

### Opción D — Por caso de uso
- Positivo: trazabilidad directa con los requisitos funcionales.
- Negativo: puede fragmentar en exceso y producir módulos muy finos con lógica compartida.

## Vistas relacionadas

- [Iteración 1 — Vista de capas y módulos](../Diagramas/iter1_capas.md)

## Notas e inferencias

- **Inferencia/decision consciente:** los nombres y el número exacto de módulos los propone el
  equipo. La consigna lista funcionalidades, no una descomposición de módulos.
