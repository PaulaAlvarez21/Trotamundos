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

Las correcciones restantes se irán registrando aquí a medida que se realicen, una por una.
