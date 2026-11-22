# MADR-0018: Continuidad y recuperación multirregión

## Estado

Propuesta

## Fecha

2026-11-22

## Contexto y planteamiento del problema

MADR-0010 decidió internacionalización en la presentación y despliegue multirregión con CDN para
atender QA-10, pero no define qué ocurre cuando falla una región. QA-04 exige disponibilidad global
y el ADD señala que no se ha definido cómo se contabilizan las interrupciones parciales o globales por
región (§11.3). Hay que completar la preparación multirregión con una estrategia de continuidad sin
inventar objetivos de recuperación que la consigna no da.

## Drivers de decisión

- **QA-04 (Availability global):** continuidad del servicio ante fallo de una región.
- **QA-10 (Usabilidad e internacionalización):** preparación para operar en múltiples regiones.
- **QA-05 (Modifiability):** costo y complejidad operativa asumibles por una *startup*.

## Opciones consideradas

- **Opción A:** **Activo-pasivo con failover asistido**, más copias de seguridad y procedimiento de
  restauración: una región atiende las escrituras y otra queda en espera.
- **Opción B:** **Activo-activo con enrutamiento por latencia**: ambas regiones atienden solicitudes.
- **Opción C:** **Una sola región con copias de seguridad**, sin segundo sitio de despliegue.

## Resultado de la decisión

Se elige la **Opción A**. Es coherente con el despliegue multirregión y la CDN ya decididos en
MADR-0010, y evita resolver la consistencia de escrituras entre regiones, que sería costosa para un
equipo pequeño. Mantiene una sola región de escritura, sin alterar la propiedad de datos por módulo
de MADR-0019. Los objetivos de recuperación (RPO y RTO) quedan como **parámetros abiertos**: la
consigna no los especifica y no se inventan valores.

## Consecuencias

- Positivas: reduce el riesgo de interrupción regional sin duplicar toda la operación; mantiene un
  único punto de escritura, simplificando la consistencia.
- Negativas: el failover no es instantáneo y requiere procedimientos y pruebas de restauración;
  MADR-0010 ya reconoce el costo operativo multirregión; sin RPO/RTO definidos no se puede verificar
  QA-04.

## Pros y contras de las opciones

### Opción A — Activo-pasivo con failover asistido
- Positivo: equilibrio entre continuidad y complejidad operativa para una *startup*.
- Negativo: recuperación asistida; depende de disciplina operativa y de probar la restauración.

### Opción B — Activo-activo
- Positivo: mejor disponibilidad percibida y menor latencia global.
- Negativo: exige resolver consistencia de escrituras entre regiones y multiplica el costo operativo.

### Opción C — Una sola región con backups
- Positivo: mínima complejidad y costo.
- Negativo: no cubre un fallo regional y contradice la preparación multirregión de MADR-0010 y QA-10.

## Vistas relacionadas

- [Iteración 1 — Vista de despliegue](../Diagramas/iter1_despliegue.md)
- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna pide preparación multirregión y disponibilidad
  global, pero no fija topología de failover ni objetivos de recuperación. Se decide activo-pasivo
  como estrategia de diseño; MADR-0010 permanece sin cambios.
- **Procedencia de cifras:** no se introduce ninguna cifra nueva. El límite de 5 min/mes es del
  enunciado y ya se evaluó en MADR-0017; RPO y RTO se declaran parámetros abiertos, no estimaciones.
- **Coherencia con el prototipo:** la maqueta es local y no despliega regiones; no se toma como
  evidencia a favor o en contra de esta decisión.
