# Registro de correcciones — Segunda entrega

Este archivo registra, una por una, las correcciones realizadas sobre la documentación de Trotamundos a partir de la devolución del profesor. Se conservan las decisiones y la estructura ya evaluadas: cada corrección es puntual y se documenta en el momento en que se aplica.

**Restricciones respetadas:** no se modificó el prototipo; no se rehicieron documentos completos; no se inventaron requisitos, métricas ni resultados.

---

## Diagnóstico general (punto de partida)

| Corrección | Documento / sección | Situación detectada |
|---|---|---|
| A | `Documentacion/Utility_tree.md` §§2–5 | Las diez hojas tenían `(H, No especificado)`: no había diferenciación en importancia ni en dificultad, y el propio documento justificaba no asignar H/M/L a la dificultad. |
| B | `Documentacion/ADD.md` Paso 7 de las iteraciones 1–5 y §9.1 | Las conclusiones decían "objetivo cumplido" sin evidencia, mientras el backlog marca QA-04, QA-05 y QA-09 como *Parcial*. |
| C | `Documentacion/MADR/` | Cifras copiadas del enunciado sin procedencia y algunas alternativas de relleno. |
| D | `Documentacion/MADR/` | Faltan decisiones propias sobre datos, nube/infraestructura y contratos. |
| E | `Documentacion/Diagramas/` | Faltan leyendas de símbolos en las vistas. |

El orden de trabajo se definió corrigiendo primero la brújula (priorización) y después el cuerpo (decisiones y evaluaciones). Las correcciones se ejecutan de a una, con revisión previa de cada alcance.

---

## Corrección A — Priorización del árbol de utilidad

**Archivo modificado:** `Documentacion/Utility_tree.md`.
**Estado:** aplicada.

### 1. Problema detectado

Las diez hojas del árbol tenían la misma etiqueta `(H, No especificado)` en el árbol (§2) y en el listado de hojas priorizadas (§3). La sección 4 justificaba esa decisión afirmando que la dificultad era "No especificado" en las diez hojas y que no podía inferirse H/M/L. El checklist (§5) repetía esa regla. En la práctica, el documento no permitía priorizar: la segunda componente de la prioridad nunca se graduaba.

Además, el enlace a la corrección de escenarios V2 estaba roto: apuntaba a `./Documentacion/correccionEscenariosTrotamundosV2.md` estando el archivo ya dentro de `Documentacion/`.

### 2. Por qué se corrigió

Sin los dos ejes graduados no se puede responder la crítica del profesor sobre la priorización, y cualquier orden posterior sería arbitrario. La corrección es necesaria pero acotada: el árbol, los escenarios y su trazabilidad ya estaban bien evaluados, así que se conservan tal cual.

### 3. Solución aplicada

Se mantuvieron los 10 escenarios, el árbol Utility → atributo → preocupación → hoja y todas las tablas de escenarios. Solo se cambiaron las etiquetas, las justificaciones y el checklist:

| Escenario | Importancia | Dificultad/riesgo | Coherencia con el ADD |
|---|---|---|---|
| QA-01 — latencia web (800 ms) | H | M | Iteración 3; caché + modelo de lectura, con TTL por definir |
| QA-02 — FCP móvil (< 1,4 s) | H | L | Iteración 3; táctica madura y local, sin externos |
| QA-03 — frescura (5 min) | H | H | Iteración 2; depende de proveedores externos y de la cola |
| QA-04 — disponibilidad | H | H | Iteraciones 1, 2 y 4; *Parcial* en el backlog |
| QA-05 — capacidad de la plataforma | H | H | Iteraciones 1 y 3; *Parcial* y sin RPS en el enunciado |
| QA-06 — interoperabilidad | H | H | Iteraciones 1, 2 y 5; contratos externos fuera de control |
| QA-07 — itinerarios compartidos | H | M | Iteración 4; RBAC + reglas de compartición |
| QA-08 — privacidad del correo | H | M | Iteraciones 2 y 4; OAuth + cifrado, con dependencia del proveedor |
| QA-09 — nuevos medios de transporte | M | M | Iteraciones 1 y 5; preparación a futuro, *Parcial* |
| QA-10 — interfaz rica e i18n | M | M | Iteraciones 3 y 5; preparación cualitativa, dos preocupaciones en una hoja |

**Orden resultante:** primero por importancia y, dentro de igual importancia, por mayor dificultad/riesgo: QA-04, QA-03, QA-05, QA-06 (H,H); QA-01, QA-07, QA-08 (H,M); QA-02 (H,L); QA-09, QA-10 (M,M).

### 4. Procedencia de H/M/L

- **Importancia:** se lee del enunciado. Es **H** cuando hay una restricción verificable presente —plazos numéricos (QA-01, QA-02, QA-03), umbral mensual y alcance global (QA-04), cifras de capacidad (QA-05), carácter "imperativo" (QA-06) o exigencia sobre datos personales (QA-07, QA-08)—. Es **M** cuando la hoja expresa una preparación a futuro sin medida verificable (QA-09, QA-10). No hay hojas L porque el enunciado declara críticos los siete atributos.
- **Dificultad/riesgo:** se lee de las características del sistema y del estado del ADD, no de conocimiento general sobre los atributos. Es **H** si hay dependencia de externos heterogéneos, escala global con picos o un driver parcial en el backlog; **M** si hay tácticas conocidas con compromisos por resolver; **L** si la táctica es madura y local y el enunciado no describe condiciones adversas.

No se agregaron métricas nuevas. Los "No especificado" que quedan en el documento son datos de los escenarios (estímulo, ambiente o medida de respuesta) y se conservan.

### 5. Relación con el resto del trabajo

El orden resultante coincide con el modo en que el ADD fue tomando los escenarios: los cuatro (H,H) son los que se abordan desde las iteraciones 1 y 2 y incluyen los tres ítems marcados como *Parcial* en el backlog (`ADD.md` §9.1); los (M,M) se refinan en la iteración 5. La justificación de QA-10 aclara que la hoja cubre interfaz/usabilidad y preparación multirregión, y que no se crea un QA-11 para no alterar los 10 escenarios ni el ADD. El enlace a la corrección V2 quedó corregido.

---

## Corrección B — Evaluación del Paso 7 del ADD

**Archivo modificado:** `Documentacion/ADD.md` (Pasos 7 de las 5 iteraciones).
**Estado:** aplicada.

### 1. Problema detectado

Los cinco `Paso 7 — Analizar el diseño y revisar el objetivo` cerraban con la frase "objetivo cumplido" sin cálculos ni evidencia, y sin distinguir entre lo que la arquitectura propone y lo que se pudo demostrar. Además, esa afirmación contradecía el backlog (§9.1), donde QA-04, QA-05 y QA-09 figuran como *Parcial*.

### 2. Por qué se corrigió

El profesor señaló justamente ese punto: declarar cumplimiento sin argumentos cuantitativos ni evaluación del resultado. La corrección no rehace las iteraciones —la hoja de ruta y las decisiones están bien evaluadas—, solo hace explícita la evaluación que ya estaba implícita en los riesgos y en el backlog.

### 3. Solución aplicada

Se conservaron los bullets existentes de `Satisfacción de drivers`, `Riesgos/gaps` y `Nuevos ítems`. A cada Paso 7 se le agregaron dos bullets nuevos y se reemplazó únicamente la línea de `Conclusión`:

- **Estado del objetivo:** usa los tres valores pedidos —Cumplido, Parcial o Pendiente— y cita los MADR y el §9.1. Iteraciones 1 a 4 quedan *Parcial*; la 5 queda *Cumplido* para el módulo, con QA-09 y el contrato con la agencia como parciales.
- **Evidencia cuantitativa simple:** una cifra o argumento por iteración, siempre con procedencia declarada (enunciado, supuesto explícito o evidencia documental del ADD).
- **Conclusión:** deja de decir "objetivo cumplido" y explica qué quedó decidido, qué sigue parcial y qué no se demostró.

### 4. Procedencia de las cifras

Ninguna cifra es un resultado de prueba ni una estimación presentada como dato real:

| Cálculo / argumento | Procedencia | Uso en el Paso 7 |
|---|---|---|
| 5 min/mes → ≈ 99,988 % | Enunciado + supuesto explícito de mes de 30 días (43.200 min) | Iteraciones 1 y 4: techo de disponibilidad, sin reparto por componente |
| 2 M / 15 M ≈ 13 % | Cifras del enunciado | Iteraciones 1 y 3: dimensionar por activos y picos, no por cuentas totales |
| 300 s para QA-03 | 5 min del enunciado, convertidos | Iteración 2: presupuesto sin desglose entre etapas |
| 800 ms vs 1.400 ms | Cifras del enunciado | Iteración 3: 600 ms más para móvil justifican la API dedicada |
| Condición binaria de PII | Texto del enunciado | Iteración 4: sin tasa de accesos inventada |
| Sin precisión de NLU | Ausencia de métrica en el enunciado | Iteración 5: supuesto de evaluación futura, no resultado |

Cuando faltan datos (RPS, si 800 ms es máximo o percentil, precisión del NLU), se dice explícitamente y no se inventa un valor.

### 5. Relación con el resto del trabajo

La evaluación queda alineada con la corrección A: los QA con mayor riesgo del árbol (QA-04, QA-05, QA-03, QA-06) son justamente los que aparecen como parciales o sin medir en estos Pasos 7. No se modificó el backlog ni la sección de riesgos, porque ya contenían esos datos y ahora se los cita como evidencia. El prototipo sigue intacto: se dice que no mide disponibilidad, latencias ni precisión, sin pedirle cambios.

---

## Corrección C — Justificación de los MADR existentes

**Archivos modificados:** `Documentacion/MADR/MADR-0001`, `0003`, `0004`, `0007`, `0008`, `0014` y `0016`.
**Estado:** aplicada.

### 1. Problema detectado

Las decisiones estaban bien relacionadas con los drivers, pero las cifras aparecían sin procedencia y varias alternativas descartadas parecían de relleno: la Opción D de MADR-0004 duplicaba la Opción B, la Opción D de MADR-0014 era un escenario irreal y la Opción D de MADR-0016 repetía la Opción B de MADR-0014. Además, MADR-0004 afirmaba que el procesamiento asíncrono estaba “holgadamente dentro de los 5 minutos” sin desglose ni medición.

### 2. Por qué se corrigió

El profesor pidió comparaciones realistas y cifras con procedencia clara. La corrección no rehace los MADR: solo quita opciones que no aportaban y explica de dónde salen los números que ya estaban. No se inventaron nuevas alternativas, tecnologías ni resultados.

### 3. Solución aplicada

- **Alternativas eliminadas** (en `Opciones consideradas` y en `Pros y contras`):
  - MADR-0004, Opción D “llamadas directas”: era equivalente a la Opción B síncrona.
  - MADR-0014, Opción D “LLM directo sin orquestación”: sin control de acciones ni trazabilidad, no era una opción arquitectónica defendible.
  - MADR-0016, Opción D “sin NLU”: duplicaba la Opción B de MADR-0014 y se confundía con el adaptador de reglas del prototipo.
- **MADR-0001:** se mantuvo la Opción E (2 capas), pero su contra ahora usa datos del enunciado: con 2 M de usuarios activos y picos (QA-05) la base sería punto único, y QA-07/QA-08 requieren seguridad compartida.
- **MADR-0004:** se reemplazó “holgadamente dentro de los 5 minutos” por “300 s sin desglose ni medición”, citando el Paso 7 de la Iteración 2 del ADD.
- **MADR-0008:** el TTL queda como parámetro acotado por la frescura de QA-03 (no superar los 5 min), no como valor medido.
- Se agregó una línea de **Procedencia de cifras** en MADR-0001, 0003, 0004, 0007 y 0008: todas las cifras son del enunciado; los cálculos se citan del ADD y no se repiten.

### 4. Coherencia con el ADD y el prototipo

- MADR-0004: el prototipo usa `EventEmitter` en memoria como sustituto del bus, según `PROTOTYPE_NOTES.md`; por eso se aclara que no mide el plazo de 5 min.
- MADR-0014: el prototipo implementa la Opción A (pasarela + NLU + orquestador + handoff) en `assistant.service.ts`, con un adaptador de reglas en `nlu-rule-based.adapter.ts`. La aclaración evita confundir ese adaptador con una alternativa nueva.
- MADR-0016: la decisión sigue siendo “comprar servicio gestionado”; el clasificador de reglas del prototipo se registra como sustituto para demostrar el puerto, tal como ya decía `PROTOTYPE_NOTES.md`.
- Ningún archivo del prototipo fue modificado.

---

## Corrección E — Leyendas de las vistas arquitectónicas

**Archivos modificados:** las 12 vistas de `Documentacion/Diagramas/`.
**Estado:** aplicada.

### 1. Problema detectado

El profesor pidió agregar leyendas a las vistas. Los diagramas tenían `Catálogo de elementos` (8
vistas) o `Notas` (4 vistas de secuencia), que explican **qué hace** cada pieza, pero ninguno
explicaba **qué significa cada forma gráfica**: rectángulos, cilindros, círculos, `subgraph`, los
distintos tipos de flecha, `alt` o `Note over`.

### 2. Solución aplicada

Se agregó una sección `## Leyenda` justo debajo del bloque Mermaid, antes del Catálogo o las Notas:

- **8 vistas flowchart** (`00_contexto`, `iter1_capas`, `iter1_cc_general`, `iter1_despliegue`,
  `iter2_cc_ingesta`, `iter3_cc_acceso`, `iter4_cc_seguridad_analitica`, `iter5_cc_chatbot`):
  leyenda idéntica con siete entradas — rectángulo (componente/módulo/servicio/cola/almacén según
  el límite), cilindro (almacén de datos o estado), círculo doble (actor externo), `subgraph`
  (límite arquitectónico), `-->` (flujo o llamada), `<-->` (interacción bidireccional) y flecha con
  texto (flujo etiquetado).
- **4 vistas de secuencia** (`iter2_secuencia_actualizacion`, `iter3_secuencia_consulta_web`,
  `iter4_secuencia_itinerario_compartido`, `iter5_secuencia_handoff`): leyenda idéntica con seis
  entradas — `participant`, `->>`, `-->>`, `alt/else/end`, `Note over` y `autonumber`.

El significado de cada símbolo es el mismo en todas las vistas del mismo tipo. Como ninguna vista
usa la tabla completa (solo `iter5_cc_chatbot` tiene los siete símbolos, y tres de las cuatro
secuencias no tienen `alt`), se agregó debajo de cada tabla una línea
**“Símbolos presentes en esta vista: ...”** con la lista exacta de los elementos que aparecen en ese
diagrama. Así la leyenda sigue siendo uniforme en su significado y, al mismo tiempo, declara solo
los elementos utilizados, que es lo que pide el enunciado de la corrección. Se chequeó con un
recorrido de los 12 bloques Mermaid que la lista declarada coincide con los símbolos reales, sin
símbolos faltantes ni sobrantes.

Además, para que no haya duda sobre a qué figura se refiere cada notación, la columna `Símbolo` de
las 12 tablas lleva el nombre de la figura entre paréntesis: `["Texto"]` **(rectángulo)**,
`[("Texto")]` **(cilindro)**, `(("Texto"))` **(círculo)**, `subgraph` **(caja/límite)**, `-->`
**(flecha simple)**, `<-->` **(flecha doble)** y la flecha etiquetada; en las secuencias,
`participant` **(participante)**, `->>` **(flecha sólida)**, `-->>` **(flecha punteada)**,
`alt/else/end` **(bloque condicional)**, `Note over` **(nota)** y `autonumber` **(numeración)**.
Las 80 filas de las 12 leyendas fueron verificadas: todas incluyen la figura.

Además, una línea breve aclara un caso particular de cada vista: los almacenes dibujados como
rectángulos en `iter1_capas`, los `subgraph` como nodos de despliegue en `iter1_despliegue`, la cola
y la DLQ como rectángulos en `iter2_cc_ingesta`, las etiquetas de flujo en `iter3_cc_acceso` y
`iter5_cc_chatbot`, y los límites `SEG`/`ANA` en `iter4_cc_seguridad_analitica`.

### 3. Errata y coherencia

- Se corrigió **“Colea / Bus de mensajes” → “Cola / Bus de mensajes”** en el catálogo de
  `iter1_cc_general.md`, para coincidir con el nombre usado en el propio diagrama, en
  `iter2_cc_ingesta.md` y en MADR-0004.
- Se verificó que los nombres de la leyenda y de los catálogos coincidan con los MADR y el ADD:
  Cola/Bus, DLQ, BFF, caché, CDN, réplica de lectura, OAuth2/OIDC, RBAC, CDC/ETL y *handoff*.
  No se encontraron discrepancias que exigieran cambiar los diagramas.

### 4. Alcance

No se modificó ningún bloque Mermaid: el diff de las 12 vistas es de 171 líneas agregadas y una
solamente eliminada (la errata). No se tocaron el prototipo, el ADD ni los MADR. La corrección D
se registró más abajo y no se inició la F.

---

## Corrección D — MADR faltantes

**Archivos creados:** `Documentacion/MADR/MADR-0017` a `MADR-0021`.
**Archivos modificados:** `Documentacion/ADD.md` (§10 y §11).
**Estado:** aplicada.

### 1. Relevo previo

Se revisaron los 16 MADR existentes antes de crear nada. Cinco temas del profesor tenían cobertura
parcial pero ningún dueño:

| Tema | Cobertura previa | Brecha |
|---|---|---|
| Disponibilidad | Tácticas sueltas en 0001, 0004 y 0011 | Sin estrategia conjunta ni forma de contabilizar interrupciones (ADD §11.3); QA-04 *Parcial* |
| Multirregión | MADR-0010 (i18n + CDN) | Sin failover ni recuperación ante fallo regional |
| Datos | 0004, 0009, 0012 y 0013 cubren partes | Sin propiedad ni ciclo de vida (RF-02 y RF-05 *Parciales*) |
| Nube | Clúster balanceado en MADR-0001 | Proveedor y modelo de infraestructura abiertos (ADD §11.5 y Kanban) |
| Contratos | 0005, 0007 y 0015 rozan el tema | Sin specs, versionado ni validación, pese a que el enunciado pide *Spec-driven* (§79) |

### 2. Criterio: crear uno nuevo vs. ampliar

Se crearon 5 MADR porque cada tema tiene un driver distinto del MADR que lo rozaba. En particular,
**MADR-0010 quedó intacto**: sigue decidiendo i18n y CDN (QA-10), mientras que el nuevo MADR-0018
decide continuidad (QA-04). No se agregaron ADR para aumentar la cantidad de documentos.

### 3. Decisiones documentadas

| MADR | Decisión | Drivers |
|---|---|---|
| 0017 — Disponibilidad y tolerancia a fallos | Redundancia + degradación controlada (*health checks*, *timeouts*, *circuit breaker*, reintentos, *fallback*); Alternativas: solo redundancia de instancias; replicación síncrona de BD | QA-04, QA-05, QA-03 |
| 0018 — Continuidad y recuperación multirregión | Activo-pasivo con failover asistido y restauración; Alternativas: activo-activo; una sola región con backups | QA-04, QA-10, QA-05 |
| 0019 — Propiedad y ciclo de vida de los datos | Dueño por módulo sobre base relacional compartida con contrato de esquema; Alternativas: base por módulo; esquema único sin propietario | RF-02, RF-05, QA-03, QA-08, QA-09 |
| 0020 — Infraestructura y nube | Servicios gestionados con capa de abstracción, proveedor a elegir después; Alternativas: autohospedado en IaaS; *serverless* | QA-04, QA-05, QA-09, restricción *startup* |
| 0021 — Especificación y gobierno de contratos | *Spec-first* (OpenAPI/AsyncAPI) con versionado y pruebas de contrato; Alternativas: *code-first*; documentación informal | QA-06, QA-09, RF-04, enunciado §79 |

### 4. Cumplimiento de lo corregido en C

Los 5 MADR usan el mismo formato del `MADR-template.md` que los existentes y repiten las tres
prácticas incorporadas en la corrección C:

- **Alternativas realistas:** tres por decisión, sin duplicados ni escenarios irrealistas, con
  ventajas y desventajas atadas a los QA.
- **Procedencia de cifras:** solo las del enunciado (5 min/mes, 2 M/15 M) y la conversión a
  ≈ 99,988 % ya documentada en el ADD con supuesto de mes de 30 días. Los parámetros no dados
  (RPO, RTO, retención, proveedor, umbrales de *timeout*) se declaran abiertos: no se inventaron
  valores ni porcentajes, y no se afirma que QA-04 esté demostrado.
- **Coherencia con el prototipo:** una línea breve por MADR. La maqueta se trata como maqueta: no se
  adaptaron las decisiones a lo que implementa ni se afirmó que las implementa. Tampoco se
  contradijeron decisiones previas (cola asíncrona, BFF, caché, OAuth2/RBAC, ACL, multirregión).

### 5. Ajustes en el ADD y alcance

- **§10 Trazabilidad:** se agregaron 5 filas, una por MADR, más una aclaración de que son decisiones
  transversales fuera de las 5 iteraciones.
- **§11 Riesgos:** se actualizaron las brechas 3, 4 y 5 para indicar que ya hay decisión de diseño,
  manteniendo abiertos los parámetros de medición, el proveedor y el reparto de disponibilidad.
- **No se modificaron** el backlog (§9.1), los `Paso 7` de la corrección B, las vistas, el Kanban ni
  el prototipo. No se creó una nueva iteración ADD (la corrección F sigue afuera).

### 6. Chequeo final de consistencia con el ADD

Tras releer el ADD y los MADR existentes se aplicaron cinco ajustes cosméticos, sin cambiar ninguna
decisión:

- **ADD §10:** las filas de MADR-0017 a MADR-0020 ahora listan exactamente los mismos drivers que la
  sección `Drivers de decisión` de cada MADR (la fila de MADR-0021 ya coincidía).
- **MADR-0017:** se precisó que la opción de replicación síncrona *introduce consistencia síncrona
  donde MADR-0004 decidió asincronía para la ingesta*, en lugar de decir que la "contradice".
- **MADR-0018:** se quitó RF-01 de los drivers (QA-10 ya cubre el acceso global y no figuraba en el
  ADD ni en este registro) y se aclaró que la *única región de escritura* no altera la propiedad de
  datos por módulo de MADR-0019: son ejes distintos.
- **MADR-0019:** se hizo explícito que la propiedad de datos no modifica el camino de frescura de
  QA-03 definido en MADR-0003/0004, para que el driver listado no quede sin relación con la decisión.

---

## Corrección F — Iteraciones ADD y disponibilidad

**Archivos modificados:** `Documentacion/ADD.md` (§9.1) y `correcciones2daEntrega.md`.
**Estado:** aplicada.

### 1. Relevo

El profesor señaló que no vio una iteración del ADD dedicada a la disponibilidad. Al releer las cinco
iteraciones, la disponibilidad no está ausente: figura como driver en la hoja de ruta (§3), se
selecciona en los Pasos 1 de tres iteraciones, se concreta en tácticas y elementos de diseño y se
revisa en sus Pasos 7. **No fue el objetivo principal de una iteración, pero sí se trató en varias**,
de forma repartida. Además, la corrección D documentó la estrategia conjunta que faltaba.

### 2. Dónde se trata QA-04 y de qué forma

| Iteración | Cómo se trata | Soluciones buscadas |
|---|---|---|
| **1 — Estructura general** | Driver en la hoja de ruta y en el Paso 1. El Paso 2 la menciona como consecuencia esperada de la estructura general | Despliegue distribuido y clúster balanceado (MADR-0001): escalado horizontal y tolerancia a la caída de una instancia, evitando puntos únicos de fallo |
| **2 — Ingesta e integraciones** | Paso 1: *"QA-04 (ante fallos de proveedores)"*. Paso 2: ingesta confiable con tolerancia a fallos externos. Paso 4: tácticas *ping/echo*, *circuit breaker* y redundancia. Paso 7: QA-04 se atribuye a reintentos, DLQ y desacoplamiento | Cola/bus, registro de idempotencia y DLQ (MADR-0004): que una caída momentánea del proveedor o del consumidor no pierda eventos. *Aclaración:* los "5 minutos" del Paso 2 son de QA-03 (frescura), no los 5 min/mes de QA-04 |
| **4 — Seguridad, compartición y analítica** | Paso 1: *"QA-04 (disponibilidad de seguridad)"*. Paso 4: redundar el componente de autorización. Paso 7: se marca como riesgo | Evitar que la autorización centralizada —crítica según MADR-0011— se convierta en punto único de fallo |
| **3 y 5** | No seleccionan QA-04; sus objetivos son rendimiento/usabilidad y asistente virtual | — |

En las tres iteraciones QA-04 cierra *Parcial* en el Paso 7: se trató como **estructura** (iteración
1), **ingesta** (iteración 2) y **seguridad** (iteración 4). Lo que no existía era una estrategia
conjunta y medible; eso se completó en la corrección D con MADR-0017 (tolerancia a fallos),
MADR-0018 (continuidad multirregión) y MADR-0020 (infraestructura), más la trazabilidad en §10 y las
brechas 3–5 en §11. El propio ADD declara esas decisiones como transversales a las cinco iteraciones.

### 3. Por qué no se agregó una iteración nueva

- El enunciado pide **4 iteraciones como mínimo**, no una por atributo de calidad: las 5 actuales ya
  cumplen ese requisito.
- **QA-04 no fue olvidado**: está en la hoja de ruta, en tres Pasos 1, en tácticas y elementos
  concretos y en tres Pasos 7. Una sexta iteración no agregaría decisiones nuevas y dejaría sin
  sentido el tratamiento ya documentado.
- Se evaluó reorganizar o ajustar una existente: cambiar el objetivo de la iteración 2 reescribiría
  una parte ya evaluada y reduciría la disponibilidad a la ingesta, sin cubrir la continuidad
  multirregión ni la infraestructura, que ya están resueltas en D.
- En cambio se corrigió el seguimiento: **§9.1 pasa de `QA-04 | Parcial | 1, 4` a
  `QA-04 | Parcial | 1, 2, 4`**, para que el backlog refleje que la iteración 2 sí trató QA-04. Se
  mantiene la aclaración de §10 sobre las decisiones transversales.

### 4. Estado y alcance

- QA-04 sigue *Parcial*: no se afirma que se cumplan los 5 min/mes, no se inventa medición ni reparto
  por componente, y la contabilización de interrupciones permanece abierta (§11.3).
- No se crean MADR, vistas ni código. Las únicas modificaciones son esta entrada y la celda del
  backlog en §9.1.

---

Con las correcciones A, B, C, D, E y F ya registradas, este documento queda completo.
