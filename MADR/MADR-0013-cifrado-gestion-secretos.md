# MADR-0013: Cifrado de datos y gestión centralizada de secretos

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

El sistema maneja información personal, credenciales de acceso a correo y datos de itinerarios que se
comparten de forma controlada. Para satisfacer QA-07 y QA-08 se requiere **cifrado** de los datos y un
manejo seguro de los **secretos** (tokens de correo, claves, certificados). Hay que decidir dónde se
custodian los secretos y cómo se protegen los datos.

## Drivers de decisión

- **QA-07 (Security de itinerarios compartidos).**
- **QA-08 (Security y privacidad del correo).**
- **RF-11:** acceso seguro a la información.
- **Security tactic:** cifrar datos (en tránsito y en reposo) y limitar el acceso a secretos.

## Opciones consideradas

- **Opción A:** Cifrado **en tránsito y en reposo** + **gestor de secretos centralizado** (con
  rotación y control de acceso).
- **Opción B:** Sin cifrado en reposo (solo TLS en tránsito).
- **Opción C:** Cifrado **gestionado manualmente** dentro de la aplicación (claves en código/config).
- **Opción D:** Secretos en **archivos de configuración** o variables de entorno sin gestor.

## Resultado de la decisión

Se elige la **Opción A**. El cifrado en tránsito (TLS) y en reposo protege los datos sensibles, y un
gestor de secretos centraliza y controla el acceso a tokens y claves, permitiendo rotación y
auditoría. Los tokens de correo (MADR-0006) se custodian allí, nunca en el código.

## Consecuencias

- Positivas: datos y secretos protegidos; rotación y auditoría de accesos; cumplimiento de las
  tácticas de seguridad.
- Negativas: costo y dependencia del gestor de secretos; ligera sobrecarga de cifrado/descifrado.

## Pros y contras de las opciones

### Opción A — Cifrado + gestor de secretos
- Positivo: cobertura completa de secretos y datos; auditable y rotable.
- Negativo: infraestructura adicional y dependencia.

### Opción B — Solo TLS
- Positivo: protege el tránsito con bajo esfuerzo.
- Negativo: los datos en reposo y los secretos quedan expuestos ante acceso al almacenamiento.

### Opción C — Cifrado manual en la app
- Positivo: sin dependencias externas.
- Negativo: gestión de claves propensa a errores; difícil rotar; las claves terminan en código/config.

### Opción D — Secretos en configuración
- Positivo: simple.
- Negativo: alto riesgo (filtración en repositorios o logs); sin rotación ni control de acceso.

## Vistas relacionadas

- [Iteración 4 — Vista de seguridad y analítica](../Diagramas/iter4_cc_seguridad_analitica.md)
- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no especifica mecanismos de cifrado ni de gestión
  de secretos; se proponen como medidas de diseño para concretar QA-07/QA-08.
