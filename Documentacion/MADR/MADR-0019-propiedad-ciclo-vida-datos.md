# MADR-0019: Propiedad y ciclo de vida de los datos

## Estado

Propuesta

## Fecha

2026-11-22

## Contexto y planteamiento del problema

El sistema produce reservas creadas o modificadas manualmente (RF-02), eventos de correo y
proveedores (RF-03/RF-04), registros de idempotencia y mensajes fallidos (MADR-0004), un modelo de
lectura con réplica (MADR-0009), sesiones del asistente (MADR-0014) y datos analíticos aislados
(MADR-0012). RF-02 y RF-05 (ciclo de vida del viaje) siguen *Parciales* en el ADD (§9.1). Falta una
decisión sobre quién es dueño de cada dato y cómo se gestiona su ciclo de vida, sin imponer una
tecnología de almacenamiento concreta.

## Drivers de decisión

- **RF-02:** gestión manual de reservas.
- **RF-05:** ciclo de vida del viaje.
- **QA-03 (Frescura):** actualizaciones presentadas dentro de los 5 minutos.
- **QA-08 (Security):** tratamiento de PII y mínimo privilegio.
- **QA-09 (Modifiability):** cambios localizados al incorporar nuevos medios de transporte.

## Opciones consideradas

- **Opción A:** **Propietario explícito por módulo sobre una base relacional compartida**, con un
  contrato de esquema y acceso mediante repositorios/DAO.
- **Opción B:** **Base de datos por módulo**, con aislamiento físico y transacciones coordinadas
  entre módulos.
- **Opción C:** **Esquema único compartido sin propietario**, con acceso directo desde cualquier
  módulo.

## Resultado de la decisión

Se elige la **Opción A**. Es la extensión natural de la descomposición en módulos de dominio de
MADR-0002 y respeta el aislamiento analítico de MADR-0012: cada módulo es dueño de sus tablas y las
demás áreas acceden solo a través de su contrato. La decisión define la propiedad y el ciclo de vida
del viaje (activo → completado → archivado) sin fijar tecnología ni plazos de retención: esos son
parámetros que la consigna no da y quedan abiertos. Esta decisión no modifica el camino de frescura
de QA-03 definido en MADR-0003/0004.

## Consecuencias

- Positivas: cambios localizados (QA-09); evita que la analítica acceda directamente a PII operativa;
  da un lugar explícito al ciclo de vida de RF-05.
- Negativas: no es aislamiento físico, depende de disciplina de acceso; la consistencia eventual de
  MADR-0009 permanece; la retención y el borrado de PII siguen sin definirse.

## Pros y contras de las opciones

### Opción A — Dueño por módulo sobre base compartida
- Positivo: equilibrio entre el monolito modular ya elegido y límites claros de propiedad.
- Negativo: no impide por sí sola accesos indebidos; requiere disciplina y contratos de esquema.

### Opción B — Base de datos por módulo
- Positivo: aislamiento fuerte y límites explícitos entre módulos.
- Negativo: transacciones entre módulos y operación más compleja; sobredimensionado para una
  *startup* pequeña.

### Opción C — Esquema único sin propietario
- Positivo: simplicidad inicial.
- Negativo: acopla los módulos (rompe QA-09), mezcla PII con analítica (QA-08/RF-09) y dificulta
  gobernar el ciclo de vida.

## Vistas relacionadas

- [Iteración 1 — Vista de capas y módulos](../Diagramas/iter1_capas.md)
- [Iteración 1 — Vista de componentes y conectores general](../Diagramas/iter1_cc_general.md)
- [Iteración 4 — Vista de componentes y conectores de seguridad y analítica](../Diagramas/iter4_cc_seguridad_analitica.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no prescribe modelo de datos ni política de
  retención. Se decide la propiedad lógica como extensión de MADR-0002, sin elegir producto ni
  tecnología de almacenamiento.
- **Procedencia de cifras:** no se introducen cifras nuevas. Los 5 minutos de QA-03 son del
  enunciado. La retención no se especifica y queda como parámetro abierto; no se inventa un plazo.
- **Coherencia con el prototipo:** la maqueta modela estados ACTIVO/COMPLETADO/ARCHIVADO y expiración
  de compartidos, pero con almacenamiento en memoria; la decisión es de diseño y no depende de esa
  implementación.
