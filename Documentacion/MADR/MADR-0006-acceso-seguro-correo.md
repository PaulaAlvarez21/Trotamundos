# MADR-0006: Acceso seguro al correo con permisos mínimos y revocación

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Para agregar reservas automáticamente, Trotamundos debe **sondear y escanear el correo** de los
usuarios (RF-03). Eso implica acceso a información personal altamente sensible. El escenario **QA-08**
exige que el acceso sea **seguro y autorizado**, y la consigna subraya la privacidad. Hay que decidir
cómo se obtienen y custodian las credenciales/permisos de correo.

## Drivers de decisión

- **QA-08 (Security y privacidad del correo).**
- **RF-03:** escaneo de correos para detectar reservas.
- **Architectural concern:** mínimo privilegio y capacidad de revocación.

## Opciones consideradas

- **Opción A:** **OAuth2 con permisos mínimos** (solo lectura de correo), almacenamiento del *refresh
  token* **cifrado** en un gestor de secretos, y **revocación** del acceso por el usuario.
- **Opción B:** Guardar **usuario y contraseña** del correo del usuario.
- **Opción C:** El usuario **reenvía** sus correos a una dirección dedicada del sistema.
- **Opción D:** Acceso vía **IMAP con contraseña de aplicación** persistida.

## Resultado de la decisión

Se elige la **Opción A**. El protocolo de autorización delegada de los proveedores de correo permite
acceder **solo** con los *scopes* necesarios, sin conocer la contraseña del usuario, y con
posibilidad de revocar el acceso. Los tokens se cifran y se guardan en un gestor de secretos
(MADR-0013).

## Consecuencias

- Positivas: sin custodia de contraseñas; permisos acotados; revocación posible; alineado con las
  prácticas de los proveedores.
- Negativas: los flujos OAuth deben gestionarse y renovarse; los tokens caducan y hay que
  refrescarlos; algunos usuarios/proveedores pueden dificultar la integración.

## Pros y contras de las opciones

### Opción A — OAuth2 con permisos mínimos
- Positivo: no se almacena la contraseña; permisos acotados y revocables.
- Negativo: complejidad del flujo OAuth y de la renovación de tokens.

### Opción B — Usuario y contraseña
- Positivo: funcionalmente directo.
- Negativo: alto riesgo; expone credenciales maestras del usuario; muchos proveedores lo prohíben.
  **Se descarta.**

### Opción C — Reenvío a dirección dedicada
- Positivo: muy seguro respecto de credenciales (no se accede a la cuenta).
- Negativo: requiere acción y confianza del usuario; depende de que reenvíe todo; peor usabilidad.

### Opción D — IMAP con contraseña de aplicación
- Positivo: compatible con más proveedores.
- Negativo: sigue almacenando una credencial de larga vida; menor granularidad de permisos.

## Vistas relacionadas

- [Iteración 2 — Vista de componentes y conectores de ingesta](../Diagramas/iter2_cc_ingesta.md)
- [Iteración 4 — Vista de seguridad y analítica](../Diagramas/iter4_cc_seguridad_analitica.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no especifica protocolo de autorización. Se
  propone OAuth2 + mínimo privilegio + revocación como medida concreta de diseño; el protocolo exacto
  depende de cada proveedor de correo.
