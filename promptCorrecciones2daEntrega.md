# Contexto y objetivo
Estoy trabajando en la segunda entrega de un trabajo práctico de Arquitectura de Software llamado **Trotamundos**. Ya realizamos una primera entrega aplicando el método ADD 3.0 y recibimos una devolución del profesor. El trabajo fue bien evaluado en general, pero nos señalaron varios aspectos que debemos corregir y profundizar para esta segunda entrega.
Quiero que analices los documentos y lo ya hecho, y nos ayudes a realizar las correcciones necesarias.
IMPORTANTE: no queremos rehacer el trabajo desde cero. Queremos conservar las decisiones y estructuras que están bien, corregir los errores señalados y mejorar los aspectos que quedaron incompletos.
Necesito que me vayas dando explicaciones claras y fundamentadas de cada correccion o cosa que agreguemos.

# 1. Contexto del proyecto
Trotamundos es un sistema que centraliza las reservas de viajes de un usuario, integrando información proveniente de correos electrónicos y proveedores externos de viajes.
El sistema permite gestionar reservas de vuelos, hoteles, autos, trenes y otros medios de transporte, organizarlas en viajes e itinerarios, consultar información, recibir actualizaciones y acceder a funcionalidades adicionales.
La arquitectura fue diseñada mediante ADD 3.0, con cinco iteraciones.

# 2. Devolución del profesor
La devolución recibida fue la siguiente:
"El trabajo especial está muy bien.
Método: ADD 3.0 aplicado de forma muy formal: ADD.md explica los 7 pasos, define propósito de diseño, elige un roadmap para greenfield de dominio maduro y recorre las 5 iteraciones con los 7 pasos. Hay backlog por driver, Kanban y tabla de trazabilidad.
Debilidades: el árbol de utilidad no prioriza, el paso 7 declara 'objetivo cumplido' siempre y sin cuentas, y la disponibilidad nunca tiene iteración propia. Muy bien organización y la hoja de ruta de las iteraciones.
Arquitectura: Cliente-servidor multitier con capas internas y módulos de dominio (monolito modular escalable por tier), Ports & Adapters con webhooks más polling, cola con idempotencia y DLQ, BFF por cliente, cache-aside más CDN, modelo de lectura con réplica, OAuth2/OIDC con RBAC, almacén analítico por CDC/ETL y, en la iteración 5, un módulo de chatbot. Resuelve el problema del enunciado (panel de reservas existentes con ingesta de correo y APIs). Descarta microservicios con motivo. Agregar leyenda a las vistas.
Justificación: Cada MADR liga drivers con ID, 4 o 5 opciones y consecuencias negativas explícitas, y marca como 'Inferencia/decisión consciente' lo que no sale del enunciado. Fortaleza: honestidad sobre lo que se asume. Debilidad: casi no hay cifras, y las opciones descartadas suelen ser de relleno.
ADR: 16 MADR, uno por decisión, de 71 a 96 líneas, con la misma estructura. Todos Propuesta, todos con fecha 2026-10-17. Cubren bien integración, lectura, seguridad y analítica. Sin ADR de disponibilidad, multirregión (más allá de MADR-0010), datos, nube o contratos."




# 3. Correcciones que necesitamos realizar
Quiero que trabajemos sobre los siguientes puntos:

## A. Árbol de utilidad (Utility Tree)
El profesor indicó que nuestro árbol de utilidad no prioriza los escenarios.
Necesitamos:
- Revisar el árbol actual.
- Verificar que todos los escenarios de atributos de calidad estén correctamente representados.
- Asignar a cada escenario una importancia y una dificultad/riesgo técnico, utilizando una escala H (alta), M (media) y L (baja).
- Justificar cada clasificación.
- IMPORTANTE:Comprobar que la priorización sea coherente con las decisiones arquitectónicas y las iteraciones ADD.

No queremos asignar valores arbitrariamente. Necesitamos fundamentar cada valoración según el enunciado y las características de Trotamundos.

## B. Evaluación del paso 7 de ADD
El profesor observó que siempre declaramos "objetivo cumplido" y que no presentamos cálculos ni evidencias.
Necesitamos:
- Revisar el paso 7 de cada iteración.
- Evaluar si el objetivo realmente se cumplió, se cumplió parcialmente o quedó pendiente.
- Relacionar las decisiones tomadas con los drivers que motivaron la iteración.
- Incorporar cálculos, estimaciones, métricas o argumentos cuantitativos cuando sea posible (nada muy complejo, simple)
- Identificar riesgos, limitaciones y aspectos que todavía no podemos garantizar.
- Diferenciar entre lo que la arquitectura propone y lo que efectivamente se pudo demostrar.
No inventes resultados de pruebas ni presentes estimaciones como si fueran datos reales. Si faltan datos, proponé supuestos explícitos y explicá cómo utilizarlos.

## C. MADR: mejorar la justificación de decisiones
El profesor considera que las decisiones están bien relacionadas con los drivers, pero que faltan cifras y que varias alternativas descartadas parecen de relleno.
Necesitamos:
- Revisar los MADR existentes.
- Comprobar que cada alternativa sea una opción arquitectónica realista.
- Mejorar la comparación entre alternativas.
- Explicar ventajas, desventajas, consecuencias y trade-offs concretos.
- Incorporar estimaciones y cálculos cuando aporten valor.
- Relacionar cada decisión con los escenarios de calidad que busca satisfacer.
- Identificar los riesgos y las limitaciones de la opción seleccionada.
Las cifras deben tener una procedencia clara: requisito del enunciado, supuesto del equipo o estimación técnica. No inventar requisitos ni números sin justificación.

## D. MADR faltantes o incompletos
El profesor indicó que faltan decisiones documentadas sobre:
1. Disponibilidad.
2. Multirregión, más allá de lo que ya cubre MADR-0010.
3. Datos.
4. Nube e infraestructura.
5. Contratos entre componentes y servicios externos.
Necesitamos revisar primero los MADR actuales para determinar qué temas ya están cubiertos parcialmente.
Después:
- Identificar qué decisiones realmente faltan.
- Determinar si conviene ampliar un MADR existente o crear uno nuevo.
- Proponer las decisiones necesarias.
- Comparar alternativas realistas.
- Documentar las consecuencias positivas y negativas.
- Relacionar cada MADR con los drivers correspondientes.
No crear ADR redundantes solamente para aumentar la cantidad de documentos.

## E. Vistas arquitectónicas
El profesor solicitó agregar leyendas a las vistas.
Necesitamos:
- Revisar los diagramas existentes.
- Identificar los símbolos utilizados.
- Incorporar leyendas claras y consistentes.
- Aclarar qué representan los componentes, conectores, flechas, bases de datos, colas, límites y demás elementos utilizados.
- Verificar que las vistas sean coherentes con los MADR y la arquitectura documentada.

## F. Iteraciones ADD y disponibilidad
El profesor señaló que la disponibilidad nunca tuvo una iteración propia.
Necesitamos:
- Revisar las cinco iteraciones existentes.
- Analizar qué drivers se seleccionaron en cada una.
- Determinar dónde conviene incorporar una iteración cuyo objetivo explícito sea abordar la disponibilidad.
- Evaluar si es necesario reorganizar alguna iteración o si se puede ajustar una existente sin desarmar la estructura general.
- Definir el objetivo de esa iteración, sus drivers, los elementos a refinar, las alternativas arquitectónicas y las decisiones resultantes.
- Mantener la coherencia con los siete pasos de ADD 3.0.
Considerar el requisito de disponibilidad del enunciado: funcionamiento global 24/7 y un máximo de cinco minutos de indisponibilidad no planificada por mes.

# 4. Metodología de trabajo que quiero que sigas
Esta parte es especialmente importante.
No quiero que analices todo superficialmente y generes una versión nueva del trabajo sin revisar lo que ya tenemos.
Quiero que trabajemos de manera progresiva:

**Paso 1: revisión del material**
Primero analizá todos los documentos que te proporcione. Identificá su contenido, estructura y relaciones. No propongas modificaciones todavía sin comprender cómo está organizado el trabajo.

**Paso 2: diagnóstico**
Compará nuestro trabajo con la devolución del profesor.
Fijate:
- Qué está correcto y debe conservarse.
- Qué está incompleto.
- Qué está mal y necesita corregirse.
- Qué falta incorporar.
- En qué documento o sección se encuentra cada problema.

**Paso 3: planificación de correcciones**
Proponé un orden de trabajo y explicá por qué conviene abordar las correcciones en ese orden.

**Paso 4: corrección progresiva**
Trabajemos un tema/correccion a la vez.

Para cada modificación:
1. Explicá qué problema detectaste.
2. Explicá por qué debe corregirse.
3. Proponé una solución arquitectónicamente fundamentada.
4. Mostrame cómo quedaría redactada o implementada en el documento.
5. Explicá cómo se relaciona con los demás elementos del trabajo.
No avances al siguiente tema hasta que hayamos revisado el actual.

**Paso 5: verificación de coherencia**
Una vez realizadas las correcciones, revisá que exista coherencia entre:
- Requisitos y drivers.
- Escenarios de atributos de calidad.
- Árbol de utilidad.
- Iteraciones ADD.
- Decisiones MADR.
- Vistas arquitectónicas.
- Contratos y especificaciones.
- Prototipo y trazabilidad.

# 5. Criterios importantes
- No toques el prototipo, y si algo quedó inconsistente (que no deberia) antes de hacer algo avisame
- Respetá el enunciado original y la devolución del profesor.
- Conservá las decisiones que ya fueron bien evaluadas.
- No rehagas documentos completos si alcanza con corregir una sección.
- No agregues tecnologías o patrones innecesarios.
- No inventes requisitos, métricas ni resultados.
- Utilizá correctamente la terminología de Arquitectura de Software y ADD 3.0.
- Fundamentá las decisiones con argumentos técnicos, no con frases genéricas.
- Cuando una decisión tenga varias alternativas, comparalas de manera realista y explicá los trade-offs.
- Mantené la estructura y el estilo de nuestros documentos siempre que sea posible.
- Documentá todas las correcciones en un archivo: correcciones2daEntrega.md

Comenzá por analizar los documentos y realizar el diagnóstico general. No empieces a modificar nada hasta haber identificado cómo está organizado nuestro trabajo.
