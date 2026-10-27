# MADR-0001: Adoptar un estilo cliente-servidor multitier con capas internas

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Trotamundos es un sistema *greenfield* (desarrollo desde cero) de un dominio maduro (paneles de
gestión de viajes), construido por una *startup* con un equipo pequeño. Debe atender 15 millones de
cuentas y 2 millones de usuarios activos semanales, con picos marcados, integración con muchos
sistemas externos y disponibilidad casi total (≤ 5 min/mes de inactividad). En la primera iteración
de ADD hay que establecer la **estructura general** del sistema. La cátedra planteó como opciones
viables "capas" y "cliente-servidor multitier", y advirtió que los microservicios podrían resultar
demasiado complejos para este sistema.

## Drivers de decisión

- **Propósito de diseño:** construir el panel de viajes con una arquitectura que sea implementable
  por un equipo pequeño y evolucionable a futuro.
- **QA-04 (Availability):** ≤ 5 min de inactividad no planificada por mes.
- **QA-05 (Modifiability):** 15 M cuentas / 2 M usuarios activos semanales + picos.
- **QA-06 (Interoperability):** integración fluida con APIs externas estándar.
- **QA-09 (Modifiability):** incorporar nuevos medios de transporte con cambios localizados.
- **Restricción:** equipo reducido y presupuesto de una *startup*.
- **Architectural concern:** simplicidad operativa.

## Opciones consideradas

- **Opción A:** Cliente-servidor **multitier** (tier de presentación, tier de aplicación, tier de
  datos) con **capas internas** (aplicación, dominio, persistencia) en el tier de aplicación.
- **Opción B:** Arquitectura **en capas** monolítica (presentación / lógica / datos en un solo
  despliegue).
- **Opción C:** Arquitectura **service-based** (unos pocos servicios de dominio gruesos).
- **Opción D:** **Microservicios** (muchos servicios finos con despliegue independiente).
- **Opción E:** Cliente-servidor de **2 capas** (cliente pesado ↔ base de datos).

## Resultado de la decisión

Se elige la **Opción A (cliente-servidor multitier con capas internas)**. El multitier separa la
presentación, la lógica y los datos en tiers desplegables y escalables por separado, lo que permite
escalar horizontalmente el tier de aplicación (QA-05) y tolerar la caída de una instancia (QA-04)
sin asumir la complejidad operativa de los microservicios. Las capas internas aportan la modularidad
necesaria para la evolucionabilidad (QA-09). Se alinea con la recomendación de la cátedra y es
suficiente para el prototipo.

## Consecuencias

- Positivas: estructura conocida y económica de construir; escalado horizontal del tier de
  aplicación; separación clara de responsabilidades; base para agregar cacheo, réplicas y CDN.
- Negativas: el tier de aplicación sigue siendo un despliegue relativamente grande; exige disciplina
  para no romper el encapsulamiento de capas; el escalado es por tier completo, no por módulo.

## Pros y contras de las opciones

### Opción A — Cliente-servidor multitier con capas internas
- Positivo: buen equilibrio entre simplicidad, escalabilidad y evolucionabilidad.
- Positivo: alineado con lo visto en clase; menor carga operativa que microservicios.
- Negativo: menor granularidad de escalado que service-based/microservicios.

### Opción B — Arquitectura en capas monolítica
- Positivo: la más simple de construir y de prototipar; mínimo costo operativo.
- Negativo: límites para escalar selectivamente; el pico global afecta todo el despliegue.

### Opción C — Service-based
- Positivo: mayor independencia de despliegue que un monolito, con pocos servicios.
- Negativo: introduce más infraestructura y coordinación de la que la *startup* necesita hoy.

### Opción D — Microservicios
- Positivo: máxima independencia de despliegue y escalado; alineado con el repo de referencia.
- Negativo: carga operativa, de observabilidad y de gobernanza alta para un equipo pequeño;
  la cátedra lo consideró posiblemente demasiado complejo para este sistema.

### Opción E — Cliente-servidor de 2 capas
- Positivo: muy simple conceptualmente.
- Negativo: acopla la lógica al cliente o a la base; no soporta bien reglas de negocio compartidas,
  seguridad ni escalabilidad global. Se descarta.

## Vistas relacionadas

- [Iteración 1 — Vista de capas y módulos](../Diagramas/iter1_capas.md)
- [Iteración 1 — Vista de componentes y conectores general](../Diagramas/iter1_cc_general.md)
- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no prescribe un estilo arquitectónico. La elección
  se fundamenta en la bibliografía (design concepts: *reference architecture* de aplicaciones web +
  patrón *Layers* + patrón de despliegue *Distributed / Load-Balanced Cluster*) y en las
  restricciones de la *startup*, no en un requisito textual.
- El estilo multitier y las "capas" no son excluyentes: el multitier describe la separación física
  (tiers) y las capas describen la organización lógica interna del tier de aplicación.
