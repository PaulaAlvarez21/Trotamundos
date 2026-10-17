# MADR-0010: Internacionalización y despliegue multiregión

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

El sistema es de **uso global** y debe estar preparado arquitectónicamente para operar en el mercado
internacional y en múltiples regiones (QA-10), además de tolerar muy poca inactividad (QA-04). Hay
que decidir cómo se estructura la localización del contenido y cómo se despliega para usuarios
geográficamente distribuidos.

## Drivers de decisión

- **QA-10 (Usability e internacionalización).**
- **QA-04 (Availability global).**
- **QA-05 (Modifiability).**
- **RF-01:** presentación de la información de viaje adaptada al contexto.

## Opciones consideradas

- **Opción A:** **i18n en la capa de presentación** (recursos de idioma/región) + **despliegue en
  múltiples regiones** con CDN.
- **Opción B:** **Idioma único** (sin internacionalización).
- **Opción C:** **Duplicar aplicaciones** completas por país/región.
- **Opción D:** **Localización en el backend** (el servicio devuelve textos ya traducidos).

## Resultado de la decisión

Se elige la **Opción A**. Mantener los recursos de localización en la presentación permite reutilizar
el mismo código base para todos los mercados, y el despliegue multiregión con CDN reduce latencia
global y mejora la disponibilidad percibida. El backend permanece independiente del idioma (los
datos de dominio no se traducen).

## Consecuencias

- Positivas: un solo código base para todos los mercados; menor latencia global; consistente con la
  arquitectura multitier.
- Negativas: la gestión de traducciones y formatos regionales (fechas, monedas, husos) agrega
  esfuerzo; el despliegue multiregión aumenta el costo y la complejidad operativa.

## Pros y contras de las opciones

### Opción A — i18n en presentación + multiregión
- Positivo: reutiliza el código; mejora QA-10 y QA-04; escalable.
- Negativo: costo de traducción y de operación multiregión.

### Opción B — Idioma único
- Positivo: cero esfuerzo de localización.
- Negativo: incumple la preparación internacional exigida por QA-10.

### Opción C — Aplicaciones duplicadas por país
- Positivo: cada mercado se adapta sin condicionar a los demás.
- Negativo: multiplica el mantenimiento; divergencia de funcionalidades; insostenible para una
  *startup*.

### Opción D — Localización en backend
- Positivo: el cliente es más "tonto".
- Negativo: acopla el dominio al idioma; mezcla responsabilidades; dificulta el cacheo por región.

## Vistas relacionadas

- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)
- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna pide "preparación arquitectónica" para operar
  internacionalmente, pero no fija una estrategia. Se opta por i18n en presentación + multiregión por
  ser la más compatible con la arquitectura elegida y la más económica de mantener.
