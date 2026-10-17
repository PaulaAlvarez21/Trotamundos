# Verificación y corrección de escenarios de calidad — Trotamundos (v2)

**Modo 2 — Verificación y corrección de escenarios** (*Software Architecture in Practice, 4th ed.*, secc. 3.3 y cap. 4–13).

Sistema analizado: **Trotamundos** (gestor de viajes y reservas, uso global, integración con proveedores externos).

Este documento verifica los escenarios **QA-01 a QA-10** entregados, detecta errores contra el General Scenario (GS) del atributo correspondiente (`references/general-scenarios.md`) y devuelve cada escenario corregido.

**Cambio respecto de la versión anterior:** el escenario **QA-05** se reasigna de "Escalabilidad (Scalability)" a **Modifiability** (atributo de la "A list"). La lectura como **Performance** queda registrada como alternativa defendible en el análisis de ambigüedad del escenario.

---

## Notas transversales (aplican a los 10 escenarios)

1. **Convención de paréntesis (sección 13):** ningún escenario incluye, entre paréntesis, la **opción/valor bibliográfico** del GS. Se agregó en todos los escenarios corregidos, en el formato `dato concreto del sistema (opción/valor bibliográfico)`.
2. **Marcado de transparencia (secciones 3 y 26):** donde falta un dato se conserva **No especificado** y las interpretaciones se marcan **[INFERENCIA]**. Las notas "Inferencia de diseño" del enunciado se reclasifican como **[INFERENCIA]**.
3. **Nombres de atributo fuera de la lista del libro (sección 2 / E10):** "Escalabilidad (Scalability)", "Evolucionabilidad" e "Interoperabilidad" no son atributos de la "A list" de la 4.ª edición. Se reasignan al atributo bibliográfico más específico (Modifiability para QA-05) o se marcan con su procedencia (Interoperability → ISO/IEC 25010, cap. 14).
4. **Response Measure (secciones 26 y 26.1):** no se inventan valores. Donde el enunciado solo da condiciones observables o cifras de capacidad, se conserva como **[INFERENCIA]** y no como métrica explícita.

---

# QA-01 — Rendimiento web

## 1. Veredicto

**PARCIALMENTE CORRECTO.** Atributo y estructura general correctos, pero falta el **tipo de evento de llegada** exigido para Performance (sección 25.1) y no se aplicó la convención de paréntesis.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Performance) | Alternativa(s) |
|---|---|---|
| Evidencia del enunciado | "El tiempo de respuesta desde web debe ser de 800 ms." | — |
| Correspondencia bibliográfica | GS Performance: Response Measure = latency. | — |
| Especificidad contextual | La restricción es puramente temporal → Performance es el atributo específico. | No hay alternativa defendible. |
| ¿Maneja el escenario la ambigüedad? | N/A | — |
| Estado / conclusión | Confirmado. No hay ambigüedad relevante. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Stimulus | E7 | No indica el tipo de evento de llegada (periódico/esporádico/estocástico), exigido para Performance (sección 25.1). | Agregar "**evento de llegada estocástico**" marcado como inferido del contexto de solicitudes de usuario. |
| 2 | Todas | Convención | No hay opción/valor bibliográfico entre paréntesis (sección 13). | Aplicar `dato concreto (opción/valor bibliográfico)`. |
| 3 | Environment | E6 | Dice "carga y red no especificadas", correcto, pero conviene fijarlo como **No especificado**. | Conservar **No especificado**. |

## 3. Escenario corregido

**Atributo:** Performance — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un navegador web (**usuario**) |
| Stimulus | Solicita consultar sus viajes y reservas — **evento de llegada estocástico**: las solicitudes se generan de forma aleatoria según la actividad de cada usuario (**No especificado** en el enunciado) **[INFERENCIA]** |
| Environment | Funcionamiento normal del sistema; carga y condiciones de red **No especificado** (**normal mode**) |
| Artifact | Interfaz web, API de consulta y componentes que recuperan los datos del viaje (**parte/componente del sistema**) |
| Response | El sistema procesa la consulta y presenta los viajes y reservas (**procesar el evento y responder**) |
| Response Measure | Tiempo de respuesta web de 800 ms (**latency**). El enunciado no precisa si es máximo, promedio o percentil (**No especificado**) |

**Justificación:** el fragmento fija una restricción temporal explícita (800 ms), lo que corresponde a Performance; el único faltante estructural era el tipo de evento de llegada (sección 25.1).

---

# QA-02 — Rendimiento móvil

## 1. Veredicto

**PARCIALMENTE CORRECTO.** Mismo faltante de tipo de evento de llegada y de convención de paréntesis.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Performance) | Alternativa(s) |
|---|---|---|
| Evidencia del enunciado | "First Contentful Paint (FCP) debe ocurrir en menos de 1,4 segundos." | Usability (experiencia de primer uso). |
| Correspondencia bibliográfica | FCP es una métrica de tiempo de carga → Response Measure = latency (GS Performance). | Usability se centra en task time, errores, aprendizaje, satisfacción; no en tiempo de carga. |
| Especificidad contextual | La medida es de latencia de presentación → Performance. | Usability no queda respaldada por una medida de carga. |
| ¿Maneja el escenario la ambigüedad? | N/A | — |
| Estado / conclusión | Performance es el atributo específico. La posible lectura como Usability se descarta por falta de soporte. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Stimulus | E7 | Falta el tipo de evento de llegada (sección 25.1). | Agregar "**evento de llegada esporádico**" marcado como inferido. |
| 2 | Todas | Convención | Sin opción/valor bibliográfico entre paréntesis. | Aplicar la convención (sección 13). |
| 3 | Environment | E6 | "Inicio de la interfaz móvil" no es una opción literal del GS (normal/emergency/peak/degraded); dispositivo y red no especificados. | Conservar la descripción y marcar **No especificado** para dispositivo/red. |

## 3. Escenario corregido

**Atributo:** Performance — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un dispositivo móvil (**usuario**) |
| Stimulus | Abre la aplicación o la interfaz móvil — **evento de llegada esporádico**: la apertura ocurre de forma irregular, a demanda del usuario (**No especificado** en el enunciado) **[INFERENCIA]** |
| Environment | Inicio de la interfaz móvil; dispositivo y condiciones de red **No especificado** (**normal mode**) |
| Artifact | Interfaz móvil y recursos necesarios para presentar el contenido inicial (**parte/componente del sistema**) |
| Response | La interfaz presenta el primer contenido visible (**procesar el evento y responder**) |
| Response Measure | First Contentful Paint (FCP) inferior a 1,4 segundos (**latency**) |

**Justificación:** el FCP es una métrica de latencia de presentación; corresponde a Performance y no a Usability.

---

# QA-03 — Actualización de reservas externas

## 1. Veredicto

**PARCIALMENTE CORRECTO.** El atributo es defendible, pero falta el tipo de evento de llegada y la convención de paréntesis.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Performance) | Alternativa(s): Interoperability / Integrability |
|---|---|---|
| Evidencia del enunciado | "presentarse en la aplicación dentro de los 5 minutos posteriores a su generación". | "integración fluida con intercambios de aerolíneas, hoteles y arrendadoras a través de APIs estándar". |
| Correspondencia bibliográfica | Latencia/deadline → GS Performance (Response Measure = deadline). | Interoperability (ISO/IEC 25010, cap. 14) / Integrability (GS 18). |
| Especificidad contextual | La medida explícita es temporal (5 min) → Performance describe lo que el requisito exige verificar. | La integración describe el medio, no la exigencia temporal. |
| ¿Maneja el escenario la ambigüedad? | Parcial: menciona la integración en el Artifact, pero no justifica por qué Performance prima. | — |
| Estado / conclusión | **Performance es el atributo específico** (hay deadline). Integrability aplica como preocupación de fondo, pero no fija la medida. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Stimulus | E7 | Falta el tipo de evento de llegada. | Agregar "**evento de llegada esporádico**" (actualizaciones irregulares) marcado como inferido. |
| 2 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |
| 3 | Ambigüedad | E9 | No se registra la lectura alternativa (integración con proveedores). | Registrar y justificar que Performance es el atributo específico por el deadline. |

## 3. Escenario corregido

**Atributo:** Performance — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, como una aerolínea, hotel o arrendadora (**sistema externo**) |
| Stimulus | Genera una actualización de una reserva — **evento de llegada esporádico**: los cambios llegan de forma irregular desde la fuente externa (**No especificado** en el enunciado) **[INFERENCIA]** |
| Environment | Funcionamiento del sistema mientras integra datos de proveedores externos; comportamiento ante caída prolongada del proveedor **No especificado** (**normal mode**) |
| Artifact | Integración externa, procesamiento de actualizaciones, persistencia de reservas y presentación del itinerario (**parte/componente del sistema**) |
| Response | Trotamundos procesa el cambio y lo presenta en la aplicación (**procesar el evento y responder**) |
| Response Measure | El cambio debe presentarse dentro de los cinco minutos posteriores a su generación por la fuente externa (**deadline/latency**) |

**Justificación:** el requisito impone un tiempo máximo de presentación (5 min) tras un evento externo; la integración con proveedores es el contexto, pero la medida verificable es temporal (Performance).

---

# QA-04 — Disponibilidad

## 1. Veredicto

**INCORRECTO.** El **Stimulus** no es un *fault*, sino una solicitud de usuario. Eso deforma el General Scenario de Availability (E7).

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Availability) | Alternativa(s) |
|---|---|---|
| Evidencia del enunciado | "accesible en todo momento", "máximo de 5 minutos por mes de inactividad no planificada". | — |
| Correspondencia bibliográfica | GS Availability: Stimulus = fault; Measure = nivel/tiempo de disponibilidad. | Performance (solicitud de usuario) no aplica: no hay medida de latencia por solicitud. |
| Especificidad contextual | La exigencia es permanencia del servicio → Availability. | No hay alternativa defendible. |
| ¿Maneja el escenario la ambigüedad? | N/A | — |
| Estado / conclusión | Availability confirmado; el error está en formular el estímulo como *fault*. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Stimulus | E7 | Se usó una solicitud de usuario en lugar de un *fault* (omission, crash, incorrect timing/response), que es el estímulo del GS. | Reformular como **fallo no planificado**. |
| 2 | Stimulus Source | E7 | "Un viajero que necesita acceder" no es la fuente del fault. | Fuente **No especificada** + **[INFERENCIA]** (componente de software/hardware/infraestructura). |
| 3 | Response | E7 | "permanece accesible" mezcla; debe formularse como recuperación del fault y mantenimiento del servicio. | Ajustar a detectar/prevenir/recuperarse del fault. |
| 4 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |

## 3. Escenario corregido

**Atributo:** Availability — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Fuente del fallo **No especificado**; **[INFERENCIA] Posible valor:** un componente de software, hardware o de infraestructura del servicio (**software / hardware / infraestructura física**) |
| Stimulus | Un fallo no planificado que afecta al servicio (**fault: omission, crash, incorrect timing o incorrect response**) |
| Environment | Operación global y continua (**normal operation**), incluyendo fallos no planificados |
| Artifact | El servicio de Trotamundos y la parte del sistema afectada por el fallo (**parte del sistema afectada por el fault**) |
| Response | El sistema detecta, previene o se recupera del fallo y mantiene/restablece el servicio conforme a su especificación (**detectar, prevenir o recuperarse del fault**) |
| Response Measure | Máximo de cinco minutos de inactividad no planificada por mes (**medida de disponibilidad / tiempo de indisponibilidad**). No se especifica cómo se contabilizan interrupciones parciales, si el cálculo es global o por región, ni el tratamiento de la indisponibilidad de un proveedor externo (**No especificado**) |

**Justificación:** el GS de Availability se dispara con un *fault*; el requisito exige recuperarse de fallos no planificados dentro de un umbral mensual de indisponibilidad.

---

# QA-05 — Escalabilidad ante picos de tráfico

*(reescribido como **Modifiability**)*

## 1. Veredicto

**PARCIALMENTE CORRECTO.** El atributo "Escalabilidad (Scalability)" no pertenece a la "A list" (E10). Se reasigna a **Modifiability**, porque el enunciado expresa la necesidad de **dimensionar la capacidad** de la plataforma, y *cambiar capacidad* es una opción explícita del Stimulus del GS de Modifiability.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo asignado (Modifiability) | Atributo alternativo (Performance) |
|---|---|---|
| Evidencia del enunciado | "La plataforma debe **dimensionarse** para soportar una base de 15 millones de cuentas, operando con 2 millones de usuarios activos semanales…". | "soportando dramáticos **picos de tráfico** ante eventos disruptivos masivos". |
| Correspondencia bibliográfica | GS Modifiability: Stimulus = **cambiar capacidad**; Measure = costo del cambio. | GS Performance: Environment = **peak load / overload**; Measure = throughput/latencia. |
| Especificidad contextual | Si lo que se exige es **prever o ampliar la capacidad** de forma evolutiva, Modifiability es el más específico. | Si lo que se exige es **rendir bajo pico**, Performance es el más específico. |
| ¿Maneja el escenario la ambigüedad? | Sí: queda registrada la lectura alternativa. | — |
| Estado / conclusión | **Modifiability** confirmado para este escenario. **Performance** sigue siendo defendible y puede construirse como escenario aparte. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Atributo | E10 (resuelto) | "Escalabilidad (Scalability)" no es un atributo del libro. | Reasignar a **Modifiability**. |
| 2 | Stimulus Source | E6 | No había fuente; el GS exige el actor que solicita el cambio. | **No especificado** + **[INFERENCIA]**: developer / product line owner. |
| 3 | Stimulus | E7 | Estaba redactado como "aumento de solicitudes concurrentes" (evento de llegada de Performance), no como un cambio solicitado. | Reformular como solicitud de **cambiar capacidad**. |
| 4 | Stimulus | E4 | "Períodos domingo-lunes y jueves-viernes" no aparece en el requerimiento citado. | Eliminado del escenario. |
| 5 | Environment | E7/E6 | Usaba "picos de uso" como entorno (opción de Performance). El GS de Modifiability admite *design time, build time, compile time, initiation time, runtime*. | **No especificado** + **[INFERENCIA]**: design time. |
| 6 | Response | E7 | "El sistema continúa atendiendo las solicitudes" es respuesta de Performance, no de Modifiability. | Ajustar a **realizar, probar y desplegar/adaptar la modificación**. |
| 7 | Response Measure | E8 | Usaba "15 M cuentas / 2 M usuarios activos semanales" como medida de respuesta; eso es el **objetivo de capacidad** del cambio, no su costo. | Mover al Stimulus; medida = **No especificado**. |
| 8 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |

## 3. Escenario corregido

**Atributo:** Modifiability — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | **No especificado** en el enunciado; **[INFERENCIA] Posible valor:** un desarrollador o arquitecto del sistema que requiere ampliar la capacidad de la plataforma (**developer / product line owner**) |
| Stimulus | Necesidad de dimensionar la plataforma para soportar 15 millones de cuentas, 2 millones de usuarios activos semanales y picos de tráfico ante eventos disruptivos masivos (**cambiar capacidad**) |
| Environment | **No especificado**; **[INFERENCIA] Posible valor:** tiempo de diseño/evolución de la plataforma (**design time**) |
| Artifact | Aplicación, API, procesamiento de solicitudes y persistencia (**componentes, recursos y configuraciones**) |
| Response | El equipo realiza, prueba y despliega la ampliación de capacidad manteniendo operativo el servicio (**realizar, probar y desplegar/adaptar la modificación**) |
| Response Measure | **No especificado** (costo del cambio: esfuerzo, tiempo, cantidad/complejidad de artifacts afectados, efectos sobre otros atributos y defectos introducidos). Las cifras de 15 M cuentas y 2 M usuarios activos semanales son el objetivo de capacidad del cambio, no el presupuesto del mismo |

**Justificación:** el requisito expresa la necesidad de **cambiar la capacidad** de la plataforma (opción literal del Stimulus del GS de Modifiability); por ello lo verificable es el costo de esa modificación, que el enunciado no fija. El objetivo de capacidad va en el Stimulus, y el pico de tráfico como condición de rendimiento corresponde a un escenario de **Performance** separado.

---

# QA-06 — Interoperabilidad con proveedores externos

## 1. Veredicto

**PARCIALMENTE CORRECTO.** El contenido es válido, pero (a) "Interoperabilidad" no es un atributo de la "A list" (procedencia ISO/IEC 25010, cap. 14) y debe validarse contra el GS de **Integrability**; (b) falta la convención de paréntesis.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Interoperability) | Alternativa: Integrability / Modifiability |
|---|---|---|
| Evidencia del enunciado | "interoperar con proveedores de correo… y redes sociales", "intercambios… a través de APIs estándar". | "integración fluida con intercambios de aerolíneas, hoteles y arrendadoras"; "tiempo de incorporación de proveedores". |
| Correspondencia bibliográfica | Interoperability = subcaracterística de Compatibility (ISO/IEC 25010, cap. 14); intercambio de información en runtime. | Integrability (GS 18): integrar elementos; Modifiability (GS 19): costo de incorporar un proveedor. |
| Especificidad contextual | El foco es **intercambiar información entre sistemas en ejecución** → Interoperability. | Modifiability aparece por el "tiempo de incorporación de proveedores". |
| ¿Maneja el escenario la ambigüedad? | No: no declara procedencia ni la alternativa de Modifiability. | — |
| Estado / conclusión | Interoperability prima (intercambio en runtime). Modifiability aplica como preocupación anexa (onboarding). Se documenta y se valida contra GS Integrability. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Atributo | E10 | No declara que Interoperability proviene de ISO/IEC 25010, ni su relación con Integrability. | Anotar procedencia y validar contra **GS Integrability**. |
| 2 | Ambigüedad | E9 | No considera la alternativa Modifiability (tiempo de incorporación de proveedores). | Registrar y justificar. |
| 3 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención (con valores del GS Integrability). |
| 4 | Response Measure | E6 | Correcto que sea "No especificado"; formalizarlo con la opción bibliográfica. | Conservar **No especificado** (esfuerzo/tiempo de integración). |

## 3. Escenario corregido

**Atributo:** Interoperability *(ISO/IEC 25010, cap. 14; validado contra GS Integrability)* — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, de correo o un servicio de compartición (**otra fuente del elemento que se integrará**) |
| Stimulus | Envía información o requiere intercambiar datos con Trotamundos mediante una interfaz compatible (**integrar componentes existentes de una nueva manera**) |
| Environment | Sistemas externos con distintos contratos y capacidades; operación en ejecución (**runtime**) |
| Artifact | Adaptadores, interfaces de integración y modelo interno de viajes y reservas (**componentes y elementos afectados**) |
| Response | Trotamundos intercambia los datos pertinentes y los interpreta de acuerdo con su modelo interno (**lograr la colaboración/intercambio correcto entre los elementos**) |
| Response Measure | **No especificado** (esfuerzo/tiempo de integración y efectos sobre otros atributos). El enunciado exige APIs estándar, pero no fija métrica cuantitativa de éxito, latencia ni tiempo de incorporación de proveedores. **[INFERENCIA]** Pruebas de contrato y medidas de interoperabilidad son propuestas de diseño, no valores de la consigna |

**Justificación:** el requisito describe intercambio de información entre sistemas en ejecución (Interoperability); por no existir GS propio en la referencia, se valida con el GS de Integrability, cuyo entorno admite *runtime*.

---

# QA-07 — Seguridad de itinerarios compartidos

## 1. Veredicto

**PARCIALMENTE CORRECTO.** Buen mapeo a Security; solo falta la convención de paréntesis y formalizar la medida cualitativa.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Security) | Alternativa(s) |
|---|---|---|
| Evidencia del enunciado | "solo personas específicas designadas puedan visualizarlos", "acceso seguro y autorizado". | Safety (por la palabra "seguridad"). |
| Correspondencia bibliográfica | GS Security: intento no autorizado de visualizar datos; proteger confidentiality. | Safety se centra en estados inseguros/daño del sistema, no en autorización. |
| Especificidad contextual | Control de acceso a información → Security. | Safety descartado por definición. |
| ¿Maneja el escenario la ambigüedad? | N/A | — |
| Estado / conclusión | Security es el atributo específico. Sin ambigüedad relevante. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |
| 2 | Response Measure | E6 | "solo las personas designadas…" es una condición observable, no una métrica numérica. | Conservar la condición y marcar **No especificado** para la medida cuantitativa. |

## 3. Escenario corregido

**Atributo:** Security — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un usuario que intenta acceder a un itinerario compartido (**human**) |
| Stimulus | Solicita visualizar un itinerario para el cual puede tener o no autorización (**intento de visualizar datos**) |
| Environment | Operación normal, con itinerarios compartibles con personas específicas (**fully operational**) |
| Artifact | API, mecanismo de autorización, lógica de acceso a itinerarios y datos almacenados (**servicios, datos y componentes**) |
| Response | El sistema verifica los permisos y entrega el itinerario únicamente si el solicitante está autorizado; de lo contrario, rechaza el acceso (**proteger confidentiality; resistir/responder al acceso**) |
| Response Measure | **No especificado** (precisión de detección / accesos indebidos). Condición observable del enunciado: solo las personas específicamente designadas pueden visualizar el itinerario |

**Justificación:** la exigencia es proteger el acceso a datos frente a solicitantes no autorizados, lo que corresponde a Security (confidentiality y control de acceso).

---

# QA-08 — Seguridad y privacidad del correo

## 1. Veredicto

**PARCIALMENTE CORRECTO.** Mapeo correcto a Security; falta la convención de paréntesis y marcar la medida como **No especificado**.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Security) | Alternativa(s) |
|---|---|---|
| Evidencia del enunciado | "acceso seguro y autorizado a los correos", "procesa información personal", "permisos concedidos". | Privacidad (no es atributo de la "A list"; se trata dentro de Security). |
| Correspondencia bibliográfica | GS Security: proteger confidentiality/integrity de datos y recursos. | — |
| Especificidad contextual | Acceso autorizado a datos personales → Security. | No hay alternativa bibliográfica propia. |
| ¿Maneja el escenario la ambigüedad? | N/A | — |
| Estado / conclusión | Security confirmado. Sin ambigüedad relevante. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |
| 2 | Response Measure | E6 | "acceso seguro y autorizado" es descriptivo; falta la opción bibliográfica y el **No especificado**. | Formalizar. |

## 3. Escenario corregido

**Atributo:** Security — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | El usuario que autoriza la integración de su correo y el proveedor de correo que entrega los mensajes (**human / another system**) |
| Stimulus | Se solicita o ejecuta el escaneo de mensajes para detectar reservas de viajes (**acceder a datos/servicios**) |
| Environment | El sistema procesa información personal con permisos concedidos al proveedor de correo (**fully operational / online**) |
| Artifact | Integración de correo, almacenamiento de credenciales o concesiones de acceso y procesador de mensajes (**servicios, datos y componentes**) |
| Response | El sistema accede únicamente a los mensajes autorizados y procesa la información pertinente para identificar reservas, protegiendo su confidencialidad e integridad (**proteger confidentiality e integrity; registrar accesos**) |
| Response Measure | **No especificado** (recursos asegurados / precisión de detección). El enunciado exige acceso seguro y autorizado, sin métrica cuantitativa. **[INFERENCIA]** Limitar permisos al mínimo, permitir revocar el acceso y no exponer credenciales son medidas de diseño propuestas, no valores de la consigna |

**Justificación:** el requisito busca proteger el acceso a correos y datos personales frente a usos no autorizados, lo que corresponde a Security.

---

# QA-09 — Evolucionabilidad: incorporar un nuevo medio de transporte

## 1. Veredicto

**PARCIALMENTE CORRECTO.** El atributo "Evolucionabilidad" no pertenece a la "A list" (E10): debe reasignarse a **Modifiability**, con posible lectura alternativa en **Integrability**.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario ("Evolucionabilidad") | Alternativa: Integrability |
|---|---|---|
| Evidencia del enunciado | "incorporar un nuevo medio de transporte", "prever la integración futura", alta trazabilidad. | "Apoyándose en… contratos (Spec-driven)" (integración de nuevos proveedores). |
| Correspondencia bibliográfica | GS Modifiability: agregar funcionalidad/capacidad; Response Measure = costo del cambio. | GS Integrability: integrar nuevos elementos. |
| Especificidad contextual | El foco es el **cambio** del sistema y su costo → Modifiability. | Integrability sería específico si el foco fuese solo integrar el proveedor, no modificar el núcleo. |
| ¿Maneja el escenario la ambigüedad? | No declara la alternativa. | — |
| Estado / conclusión | **Modifiability** es el atributo bibliográfico específico; Integrability queda como alternativa secundaria (documentada). | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Atributo | E10 | "Evolucionabilidad" no es un atributo del libro. | Reasignar a **Modifiability**. |
| 2 | Ambigüedad | E9 | No se registra la alternativa Integrability (nuevo proveedor/medio). | Registrar y justificar. |
| 3 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |
| 4 | Response Measure | E6 | Correcto como "No especificado". | Formalizar con la opción del GS Modifiability. |

## 3. Escenario corregido

**Atributo:** Modifiability — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un desarrollador del sistema (**developer**) |
| Stimulus | Necesita incorporar un nuevo medio de transporte, por ejemplo trenes o autobuses (**agregar funcionalidad / agregar un producto**) |
| Environment | Tiempo de diseño y evolución del sistema (**design time**) |
| Artifact | Modelo de reservas, contratos de integración, adaptadores y módulos del núcleo afectados por los nuevos datos (**componentes, interfaces y datos**) |
| Response | El desarrollador incorpora el nuevo medio de transporte manteniendo las funcionalidades existentes que no necesitan cambiar (**realizar, probar y desplegar la modificación**) |
| Response Measure | **No especificado** (costo del cambio: artifacts afectados, esfuerzo, tiempo, efectos sobre otros atributos). El enunciado exige prever la incorporación futura, pero no fija un presupuesto máximo de esfuerzo o tiempo. **[INFERENCIA]** La localización de los cambios es una decisión arquitectónica propuesta, no una garantía textual |

**Justificación:** el requisito se centra en el costo/impacto de incorporar una nueva capacidad al sistema, lo que corresponde a Modifiability; Integrability es la lectura secundaria por la integración de nuevos proveedores.

---

# QA-10 — Usabilidad e internacionalización

## 1. Veredicto

**PARCIALMENTE CORRECTO.** El atributo principal (Usability) es correcto, pero la preparación multirregión/multimercado admite una lectura alternativa en **Modifiability** que el escenario no registra (E9); además falta la convención de paréntesis.

## 1.1. Análisis de ambigüedad

| Aspecto | Atributo del escenario (Usability) | Alternativa: Modifiability |
|---|---|---|
| Evidencia del enunciado | "interfaz rica (aprovechando capacidades nativas como GPS)", "consultar y gestionar sus viajes". | "preparado arquitectónicamente para operar en el mercado internacional (multiregión)". |
| Correspondencia bibliográfica | GS Usability: end user, GUI/touch screen, proporcionar funcionalidades; medidas task time, errores, satisfacción. | GS Modifiability: cambiar plataforma/tecnología/ubicación de servicio; costo del cambio. |
| Especificidad contextual | El uso de la interfaz por el viajero → Usability. | "Preparado arquitectónicamente para multirregión" es una preocupación de **cambio/adaptación** → Modifiability. |
| ¿Maneja el escenario la ambigüedad? | Parcial: incluye localización en el Artifact, pero sin justificar. | — |
| Estado / conclusión | Usability prima (interfaz rica y uso por el viajero). La preparación multirregión es un requisito de **Modifiability** concurrente. | — |

## 2. Errores encontrados

| # | Parte | Código | Problema | Corrección propuesta |
|---|---|---|---|---|
| 1 | Ambigüedad | E9 | No se separa el requisito de usabilidad del de preparación multirregión (Modifiability). | Registrar ambos y justificar el atributo principal. |
| 2 | Todas | Convención | Sin opción/valor bibliográfico. | Aplicar la convención. |
| 3 | Response Measure | E6 | Correcto como "No especificado". | Formalizar con las opciones del GS Usability. |

## 3. Escenario corregido

**Atributo:** Usability — **Estado:** CONFIRMADO

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde la web o un dispositivo móvil (**end user**) |
| Stimulus | Necesita consultar y gestionar sus viajes en una interfaz adecuada a su contexto de uso (**el usuario quiere usar el sistema eficientemente**) |
| Environment | Uso web o móvil, con acceso a capacidades nativas como GPS (**runtime**) |
| Artifact | Interfaz de usuario, presentación de itinerarios y acceso a capacidades del dispositivo (**GUI / touch screen**) |
| Response | El sistema presenta y permite gestionar la información de viaje mediante una interfaz adecuada al dispositivo (**proporcionar las funcionalidades e interacción requeridas**) |
| Response Measure | **No especificado** (task time, number of errors, learning time, user satisfaction). El enunciado exige una interfaz rica y preparación arquitectónica internacional, sin métrica cuantitativa de usabilidad o localización |

**Justificación:** el foco es el uso de la interfaz por el viajero (Usability). La "preparación arquitectónica para multirregión" es un requisito de Modifiability que conviene modelar como escenario aparte.

---

# Resumen de veredictos

| Escenario | Atributo declarado | Atributo bibliográfico correcto | Veredicto | Errores principales |
|---|---|---|---|---|
| QA-01 | Rendimiento web | Performance | PARCIALMENTE CORRECTO | E7 (tipo de evento), convención |
| QA-02 | Rendimiento móvil | Performance | PARCIALMENTE CORRECTO | E7 (tipo de evento), convención |
| QA-03 | Actualización externa | Performance | PARCIALMENTE CORRECTO | E7, E9 (no registra Integrability) |
| QA-04 | Disponibilidad | Availability | INCORRECTO | E7 (Stimulus no es un fault) |
| QA-05 | Escalabilidad | **Modifiability** | PARCIALMENTE CORRECTO | E10, E7, E8, E4 (lectura alternativa: Performance) |
| QA-06 | Interoperabilidad | Interoperability / Integrability | PARCIALMENTE CORRECTO | E10, E9, convención |
| QA-07 | Seguridad itinerarios | Security | PARCIALMENTE CORRECTO | convención, E6 |
| QA-08 | Seguridad correo | Security | PARCIALMENTE CORRECTO | convención, E6 |
| QA-09 | Evolucionabilidad | Modifiability | PARCIALMENTE CORRECTO | E10, E9 |
| QA-10 | Usabilidad | Usability | PARCIALMENTE CORRECTO | E9 (Modifiability), convención |

---

# Checklist aplicado (sección 30)

- [x] Se usaron las seis partes en cada escenario corregido.
- [x] Se siguió el GS del libro para cada atributo (Performance, Availability, Modifiability, Integrability, Security, Usability).
- [x] Datos concretos fuera de paréntesis; opción/valor bibliográfico entre paréntesis (corrige la omisión sistemática).
- [x] Response Measure verificable y con trazabilidad; no se sustituyeron términos vagos por números inventados.
- [x] Se conservó **No especificado** donde el enunciado no aporta el dato.
- [x] Inferencias marcadas **[INFERENCIA]** (incluidas las antiguas "Inferencia de diseño").
- [x] Se verificó ambigüedad de atributos en cada escenario (E9 donde correspondía); en QA-05 se registró Performance como alternativa defendible.
- [x] Se identificaron atributos fuera de la "A list" y se reasignaron (E10): Escalabilidad → Modifiability (QA-05), Evolucionabilidad → Modifiability (QA-09), Interoperabilidad validada con Integrability (QA-06).
- [x] No se inventaron métricas ni condiciones; el dato "domingo-lunes / jueves-viernes" sin respaldo en el requerimiento citado fue eliminado de QA-05.
