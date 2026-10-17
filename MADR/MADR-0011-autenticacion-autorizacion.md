# MADR-0011: Autenticación delegada y autorización centralizada

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Trotamundos procesa información personal y permite **compartir itinerarios**, de modo que solo las
personas específicamente designadas puedan verlos (QA-07). También debe garantizar acceso seguro y
autorizado a las cuentas y a los correos (QA-08, RF-11). Hay que decidir cómo se autentica a los
usuarios y cómo se autoriza el acceso a recursos compartidos.

## Drivers de decisión

- **QA-07 (Security de itinerarios compartidos).**
- **QA-08 (Security y privacidad del correo).**
- **RF-10:** compartición controlada de itinerarios.
- **RF-11:** gestión de usuarios y acceso a la información.

## Opciones consideradas

- **Opción A:** **OAuth2/OIDC** para autenticación + **autorización centralizada** con RBAC y reglas
  de compartición (designados por itinerario).
- **Opción B:** **Sesiones propias** con usuario/contraseña.
- **Opción C:** **Tokens estáticos / API keys** por usuario.
- **Opción D:** **Autorización distribuida** en cada servicio/módulo.

## Resultado de la decisión

Se elige la **Opción A**. La autenticación delegada evita custodiar contraseñas y permite integrar
proveedores de identidad; la autorización centralizada aplica de forma uniforme RBAC y las reglas de
compartición (quién fue designado para ver qué itinerario), lo que responde directamente a QA-07 y
deja una traza auditable.

## Consecuencias

- Positivas: modelo de seguridad uniforme y auditable; sin custodia de contraseñas; la compartición
  se expresa como reglas explícitas.
- Negativas: la autorización centralizada es un punto crítico de disponibilidad (debe redundarse);
  introduce dependencia de un proveedor de identidad.

## Pros y contras de las opciones

### Opción A — OAuth2/OIDC + autorización centralizada
- Positivo: estándar, seguro y uniforme; soporta compartición desde un único punto.
- Negativo: componente crítico a redundar; dependencia externa de identidad.

### Opción B — Sesiones propias
- Positivo: control total; sin dependencias externas.
- Negativo: hay que implementar y asegurar hashing, sesiones, recuperación; más superficie de riesgo.

### Opción C — Tokens estáticos / API keys
- Positivo: simple para integraciones máquina a máquina.
- Negativo: pobres para usuarios y para permisos finos; difíciles de revocar; no aptos para
  compartición granular.

### Opción D — Autorización distribuida
- Positivo: cada módulo decide sin un componente central.
- Negativo: reglas dispersas y propensas a inconsistencias; difícil garantizar QA-07 y auditar.

## Vistas relacionadas

- [Iteración 4 — Vista de seguridad y analítica](../Diagramas/iter4_cc_seguridad_analitica.md)
- [Iteración 4 — Secuencia de acceso a itinerario compartido](../Diagramas/iter4_secuencia_itinerario_compartido.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no especifica protocolo ni modelo de autorización.
  Se propone OAuth2/OIDC + RBAC + reglas de compartición como concreción de las tácticas de
  seguridad de la bibliografía.
