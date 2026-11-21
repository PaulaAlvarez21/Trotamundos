# Árbol de utilidad — Trotamundos (Modo 3)

**Sistema:** Trotamundos — plataforma de gestión de viajes y reservas (web y móvil), con integración de proveedores externos (aerolíneas, hoteles, arrendadoras), proveedores de correo y redes sociales.

**Entrada:** escenarios QA-01 a QA-10 definidos en [`Escenarios_de_atributos_de_calidad.md`](./Escenarios_de_atributos_de_calidad.md) (Modo 1) y corregidos en [`correccionEscenariosTrotamundosV2.md`](./correccionEscenariosTrotamundosV2.md). Este documento aplica el Modo 3 (sección 34): verifica cada atributo contra su General Scenario, organiza el árbol Utility → atributo → preocupación → escenario y prioriza cada hoja.

> **Fuente única.** Este documento consolida el árbol de utilidad del equipo en un solo archivo; reemplaza a los borradores previos `arbol-utilidad.md` y `Documentacion/arbol-utilidad-trotamundos.md`.

---

## 1. Verificación de atributos contra sus General Scenarios (paso 4)

| Atributo (hojas) | GS de referencia | Correspondencia | Veredicto |
|---|---|---|---|
| Performance (QA-01, QA-02, QA-03) | s. 20 | Estímulo = llegada de un evento (solicitud/notificación); Response = procesar el evento y responder; Response Measure = latency / deadline | Directa |
| Availability (QA-04) | s. 15 | Stimulus = fault (indisponibilidad no planificada); Response = detectar, prevenir o recuperarse; Response Measure = medida de disponibilidad (5 min/mes) | Directa |
| Modifiability (QA-05) | s. 19 | El estímulo "necesidad de dimensionar la plataforma" corresponde a la opción literal **cambiar capacidad** del GS de Modifiability | Directa (ver nota 1) |
| Modifiability (QA-09) | s. 19 | El estímulo "incorporar un nuevo medio de transporte" corresponde a **agregar funcionalidad / agregar un producto** | Directa |
| Interoperability (QA-06) | Sin GS en la "A list" (caps. 4–13) | [BIBLIOGRAFÍA] Interoperability no tiene GS propio en el libro; aparece en el cap. 14 vía ISO/IEC 25010 como subcaracterística de Compatibility: sistemas intercambian información y la utilizan. [CÁTEDRA / CLASE] se analiza como preocupación de runtime | Válido como atributo de cátedra; validado contra ISO/IEC 25010 (ver nota 2) |
| Security (QA-07, QA-08) | s. 22 | Stimulus = intento no autorizado de visualizar datos / acceder a servicios; Response = proteger confidentiality (e integrity) y resistir el acceso | Directa |
| Usability (QA-10) | s. 24 | Stimulus = el usuario quiere usar el sistema eficientemente; Artifact = GUI / touch screen; Response = proporcionar las funcionalidades e interacción requeridas | Directa |

### Notas de verificación

**Nota 1 — QA-05 (escalabilidad como Modifiability).** El requisito se titula "Escalabilidad", pero el estímulo descrito es la necesidad de *dimensionar* la plataforma (cambiar capacidad), que es una opción literal del GS de Modifiability (s. 19). Una lectura alternativa como Performance (entorno *peak load*, s. 20) sería defendible solo si el enunciado describiera el comportamiento en ejecución ante picos; el enunciado, en cambio, plantea el dimensionamiento de la capacidad como objetivo de un cambio y no describe un estímulo de runtime bajo carga. Se mantiene Modifiability como atributo más específico y no se agrega una hoja de Performance por falta de estímulo en ejecución.

**Nota 2 — QA-06 (Interoperability).** El paréntesis "(integrar componentes existentes de una nueva manera)" proviene del GS de Integrability (s. 18), que funciona como referencia estructural más cercana porque el libro no incluye un GS de Interoperability. [CÁTEDRA / CLASE] El foco del escenario — sistemas en ejecución que intercambian información y la utilizan — es lo que distingue a Interoperability de Integrability (regla práctica de la sección 32.2); por eso el atributo elegido es Interoperability.

**Nota 3 — QA-09 vs QA-06.** "Incorporar un nuevo medio de transporte" (QA-09) es un cambio de funcionalidad → Modifiability; "intercambiar datos con proveedores en runtime" (QA-06) es interoperación. Ambos son defendibles y complementarios: ninguno reemplaza al otro.

**Nota 4 — QA-10.** La preparación multirregión queda en la misma preocupación que la interfaz rica, tal como fue planteada en el escenario; el enunciado no fija métrica de localización (conservado "No especificado").

---

## 2. Árbol de utilidad

Cada hoja se etiqueta con `(Importancia, Dificultad/riesgo)` en escala **H** (alta), **M** (media) y **L** (baja). El criterio de cada eje y el orden resultante se explican en la sección 4.

```
UTILITY
├── Performance
│   ├── Latencia de respuesta web
│   │   └── (H, M) QA-01: viajero en navegador web solicita consultar
│   │       sus viajes y reservas; tiempo de respuesta de 800 ms.
│   ├── Primer contenido en móvil
│   │   └── (H, L) QA-02: viajero en dispositivo móvil abre la
│   │       aplicación; First Contentful Paint inferior a 1,4 s.
│   └── Actualización de reservas externas
│       └── (H, H) QA-03: proveedor externo genera una actualización
│           de reserva; se presenta en la aplicación dentro de los 5 minutos.
├── Availability
│   └── Indisponibilidad no planificada
│       └── (H, H) QA-04: fallo no planificado afecta al servicio;
│           máximo cinco minutos de inactividad no planificada por mes.
├── Modifiability
│   ├── Capacidad de la plataforma
│   │   └── (H, H) QA-05: dimensionar la plataforma para 15 M de
│   │       cuentas, 2 M de usuarios activos semanales y picos de tráfico.
│   └── Nuevos medios de transporte
│       └── (M, M) QA-09: desarrollador incorpora trenes o
│           autobuses manteniendo lo existente.
├── Interoperability
│   └── Intercambio con proveedores externos
│       └── (H, H) QA-06: proveedor de viajes, correo o servicio de
│           compartición intercambia datos con Trotamundos mediante interfaz
│           compatible.
├── Security
│   ├── Acceso a itinerarios compartidos
│   │   └── (H, M) QA-07: usuario intenta visualizar un itinerario
│   │       compartido; se verifica autorización antes de entregarlo.
│   └── Privacidad del correo integrado
│       └── (H, M) QA-08: escaneo de correos para detectar reservas;
│           acceso únicamente a los mensajes autorizados.
└── Usability
    └── Interfaz rica e internacionalización
        └── (M, M) QA-10: viajero consulta y gestiona sus viajes en
            web o móvil con capacidades nativas como GPS.
```

---

## 3. Escenarios (hojas) priorizados

### Hoja QA-01 — Performance / Latencia de respuesta web — Prioridad (H, M)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un navegador web (**end user**) |
| Stimulus | Solicita consultar sus viajes y reservas (**llegada de un evento: solicitud**). Tipo de evento: **estocástico** [INFERENCIA] — las solicitudes se generan de forma aleatoria según la actividad de cada usuario (No especificado en el enunciado) |
| Environment | Funcionamiento normal del sistema; carga y condiciones de red No especificado (**normal mode**) |
| Artifact | Interfaz web, API de consulta y componentes que recuperan los datos del viaje (**parte del sistema**) |
| Response | El sistema procesa la consulta y presenta los viajes y reservas (**procesar el evento y responder**) |
| Response Measure | Tiempo de respuesta web de 800 ms (**latency**). El enunciado no precisa si es máximo, promedio o percentil (No especificado) |

### Hoja QA-02 — Performance / Primer contenido en móvil — Prioridad (H, L)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un dispositivo móvil (**end user**) |
| Stimulus | Abre la aplicación o la interfaz móvil (**llegada de un evento: solicitud**). Tipo de evento: **esporádico** [INFERENCIA] — la apertura ocurre de forma irregular, a demanda del usuario (No especificado en el enunciado) |
| Environment | Inicio de la interfaz móvil; dispositivo y condiciones de red No especificado (**normal mode**) |
| Artifact | Interfaz móvil y recursos necesarios para presentar el contenido inicial (**parte del sistema**) |
| Response | La interfaz presenta el primer contenido visible (**procesar el evento y responder**) |
| Response Measure | First Contentful Paint (FCP) inferior a 1,4 segundos (**latency**) |

### Hoja QA-03 — Performance / Actualización de reservas externas — Prioridad (H, H)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, como una aerolínea, hotel o arrendadora (**sistema externo**) |
| Stimulus | Genera una actualización de una reserva (**llegada de un evento: notificación**). Tipo de evento: **esporádico** [INFERENCIA] — los cambios llegan de forma irregular desde la fuente externa (No especificado en el enunciado) |
| Environment | Funcionamiento del sistema mientras integra datos de proveedores externos; comportamiento ante caída prolongada del proveedor No especificado (**normal mode**) |
| Artifact | Integración externa, procesamiento de actualizaciones, persistencia de reservas y presentación del itinerario (**parte del sistema**) |
| Response | Trotamundos procesa el cambio y lo presenta en la aplicación (**procesar el evento y responder**) |
| Response Measure | El cambio debe presentarse dentro de los cinco minutos posteriores a su generación por la fuente externa (**deadline**) |

### Hoja QA-04 — Availability / Indisponibilidad no planificada — Prioridad (H, H)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | No especificado; [INFERENCIA] Posible valor: un componente de software, hardware o de infraestructura del servicio (**fuente interna o externa de faults**) |
| Stimulus | Un fallo no planificado que afecta al servicio, trazable al "tiempo de indisponibilidad no planificado" del enunciado (**fault**: omission, crash, incorrect timing o incorrect response) |
| Environment | Operación global y continua, tolerando fallos no planificados (**normal operation**) |
| Artifact | El servicio de Trotamundos y la parte del sistema afectada por el fallo (**parte del sistema afectada por el fault**) |
| Response | El sistema detecta, previene o se recupera del fallo y mantiene o restablece el servicio conforme a su especificación (**detectar, prevenir o recuperarse del fault**) |
| Response Measure | Máximo de cinco minutos de inactividad no planificada por mes (**medida de disponibilidad**). No se especifica cómo se contabilizan interrupciones parciales, si el cálculo es global o por región, ni el tratamiento de la indisponibilidad de un proveedor externo (No especificado) |

### Hoja QA-05 — Modifiability / Capacidad de la plataforma — Prioridad (H, H)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | No especificado en el enunciado; [INFERENCIA] Posible valor: un desarrollador o arquitecto del sistema que requiere ampliar la capacidad de la plataforma (**developer / product line owner**) |
| Stimulus | Necesidad de dimensionar la plataforma para soportar 15 millones de cuentas, 2 millones de usuarios activos semanales y picos de tráfico ante eventos disruptivos masivos (**cambiar capacidad**) |
| Environment | No especificado; [INFERENCIA] Posible valor: tiempo de diseño/evolución de la plataforma (**design time**) |
| Artifact | Aplicación, API, procesamiento de solicitudes y persistencia (**componentes, recursos y configuraciones**) |
| Response | El equipo realiza, prueba y despliega la ampliación de capacidad manteniendo operativo el servicio (**realizar, probar y desplegar la modificación**) |
| Response Measure | No especificado (**costo del cambio**: esfuerzo, tiempo, cantidad/complejidad de artifacts afectados, efectos sobre otros atributos y defectos introducidos). Las cifras de 15 M cuentas y 2 M usuarios activos semanales son el objetivo de capacidad del cambio, no el presupuesto del mismo |

### Hoja QA-06 — Interoperability / Intercambio con proveedores externos — Prioridad (H, H)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, de correo o un servicio de compartición (**otra fuente del elemento que se integrará** — opción tomada del GS de Integrability, s. 18, por no existir GS de Interoperability) |
| Stimulus | Envía información o requiere intercambiar datos con Trotamundos mediante una interfaz compatible (**integrar componentes existentes de una nueva manera** — misma referencia del GS de Integrability) |
| Environment | Sistemas externos con distintos contratos y capacidades; operación en ejecución (**runtime**) |
| Artifact | Adaptadores, interfaces de integración y modelo interno de viajes y reservas (**componentes y elementos afectados**) |
| Response | Trotamundos intercambia los datos pertinentes y los interpreta de acuerdo con su modelo interno (**lograr la colaboración/intercambio correcto entre los elementos**) |
| Response Measure | No especificado (**esfuerzo/tiempo de integración y efectos sobre otros atributos**). El enunciado exige APIs estándar, pero no fija métrica cuantitativa de éxito, latencia ni tiempo de incorporación de proveedores. [INFERENCIA] Pruebas de contrato y medidas de interoperabilidad son propuestas de diseño, no valores de la consigna |

### Hoja QA-07 — Security / Acceso a itinerarios compartidos — Prioridad (H, M)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un usuario que intenta acceder a un itinerario compartido (**human**) |
| Stimulus | Solicita visualizar un itinerario para el cual puede tener o no autorización (**intento de visualizar datos**) |
| Environment | Operación normal, con itinerarios compartibles con personas específicas (**fully operational**) |
| Artifact | API, mecanismo de autorización, lógica de acceso a itinerarios y datos almacenados (**servicios, datos y componentes**) |
| Response | El sistema verifica los permisos y entrega el itinerario únicamente si el solicitante está autorizado; de lo contrario, rechaza el acceso (**proteger confidentiality; resistir el acceso**) |
| Response Measure | No especificado (**precisión de detección / accesos indebidos**). Condición observable del enunciado: solo las personas específicamente designadas pueden visualizar el itinerario |

### Hoja QA-08 — Security / Privacidad del correo integrado — Prioridad (H, M)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | El usuario que autoriza la integración de su correo y el proveedor de correo que entrega los mensajes (**human / another system**) |
| Stimulus | Se solicita o ejecuta el escaneo de mensajes para detectar reservas de viajes (**acceder a datos/servicios**) |
| Environment | El sistema procesa información personal con permisos concedidos al proveedor de correo (**fully operational / online**) |
| Artifact | Integración de correo, almacenamiento de credenciales o concesiones de acceso y procesador de mensajes (**servicios, datos y componentes**) |
| Response | El sistema accede únicamente a los mensajes autorizados y procesa la información pertinente para identificar reservas, protegiendo su confidencialidad e integridad (**proteger confidentiality e integrity**) |
| Response Measure | No especificado (**recursos asegurados / precisión de detección**). El enunciado exige acceso seguro y autorizado, sin métrica cuantitativa. [INFERENCIA] Limitar permisos al mínimo, permitir revocar el acceso y no exponer credenciales son medidas de diseño propuestas, no valores de la consigna |

### Hoja QA-09 — Modifiability / Nuevos medios de transporte — Prioridad (M, M)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un desarrollador del sistema (**developer**) |
| Stimulus | Necesita incorporar un nuevo medio de transporte, por ejemplo trenes o autobuses (**agregar funcionalidad / agregar un producto**) |
| Environment | Tiempo de diseño y evolución del sistema (**design time**) |
| Artifact | Modelo de reservas, contratos de integración, adaptadores y módulos del núcleo afectados por los nuevos datos (**componentes, interfaces y datos**) |
| Response | El desarrollador incorpora el nuevo medio de transporte manteniendo las funcionalidades existentes que no necesitan cambiar (**realizar, probar y desplegar la modificación**) |
| Response Measure | No especificado (**costo del cambio**: artifacts afectados, esfuerzo, tiempo, efectos sobre otros atributos). El enunciado exige prever la incorporación futura, pero no fija un presupuesto máximo de esfuerzo o tiempo. [INFERENCIA] La localización de los cambios es una decisión arquitectónica propuesta, no una garantía textual |

### Hoja QA-10 — Usability / Interfaz rica e internacionalización — Prioridad (M, M)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde la web o un dispositivo móvil (**end user**) |
| Stimulus | Necesita consultar y gestionar sus viajes en una interfaz adecuada a su contexto de uso (**el usuario quiere usar el sistema eficientemente**) |
| Environment | Uso web o móvil, con acceso a capacidades nativas como GPS (**runtime**) |
| Artifact | Interfaz de usuario, presentación de itinerarios y acceso a capacidades del dispositivo (**GUI / touch screen**) |
| Response | El sistema presenta y permite gestionar la información de viaje mediante una interfaz adecuada al dispositivo (**proporcionar las funcionalidades e interacción requeridas**) |
| Response Measure | No especificado (**task time, number of errors, learning time, user satisfaction**). El enunciado exige una interfaz rica y preparación arquitectónica internacional, sin métrica cuantitativa de usabilidad o localización |

---

## 4. Criterio de priorización y justificación

La escala **H** (alta), **M** (media) y **L** (baja) se aplica por separado a dos ejes:

| Eje | Procedencia | Regla |
|---|---|---|
| **Importancia** | Enunciado (`enunciadoTPE.md`, sección de requerimientos de atributos de calidad) | **H** cuando el enunciado formula una restricción verificable presente: plazo numérico (QA-01, QA-02, QA-03), umbral mensual y alcance global (QA-04), cifras de capacidad (QA-05), carácter "imperativo" (QA-06) o exigencia explícita sobre datos personales (QA-07, QA-08). **M** cuando la hoja expresa una preparación a futuro sin medida verificable (QA-09, QA-10). No hay hojas **L**: el enunciado declara críticos los siete atributos. |
| **Dificultad / riesgo técnico** | Características del sistema derivadas del enunciado y estado del ADD | **H** cuando la satisfacción depende de sistemas externos heterogéneos, de la escala global con picos o de un driver aún parcial en el backlog; **M** cuando existen tácticas conocidas pero con compromisos por resolver; **L** cuando la táctica es madura, no depende de externos y el enunciado no describe condiciones adversas. |

**Orden resultante:** se prioriza primero por *importancia* y, dentro de igual importancia, por *dificultad/riesgo* (H > M > L), porque entre hojas igual de críticas requieren más atención las que presentan mayor riesgo. Queda: QA-04, QA-03, QA-05, QA-06 (H,H); QA-01, QA-07, QA-08 (H,M); QA-02 (H,L); QA-09, QA-10 (M,M).

**Coherencia con el ADD:** los cuatro escenarios (H,H) son los que el ADD aborda desde las iteraciones 1 y 2 — QA-04 y QA-05 figuran como *Parcial* en el backlog (`ADD.md` §9.1) y QA-03 y QA-06 dependen de proveedores externos —; los (M,M) se refinan en la iteración 5. La dificultad no se infiere del conocimiento general del atributo, sino de datos textuales del enunciado y del estado de las decisiones ya registradas.

**QA-01 — Performance / Latencia web**

> **Importancia H:** el enunciado fija una restricción verificable presente ("el tiempo de respuesta desde web debe ser de 800 ms") dentro del listado de atributos críticos.
>
> **Dificultad M:** existen tácticas conocidas (caché, modelo de lectura, CDN), pero queda por resolver el compromiso entre frescura y TTL y el enunciado no aclara si 800 ms es máximo o percentil; el ADD lo trata en la iteración 3.

**QA-02 — Performance / Primer contenido en móvil**

> **Importancia H:** el enunciado fija una restricción verificable presente ("First Contentful Paint ... en menos de 1,4 segundos") dentro del listado de atributos críticos.
>
> **Dificultad L:** se cubre con una táctica madura y local (CDN + payload reducido), sin dependencia de sistemas externos; el enunciado no describe red o dispositivo adversos. El ADD lo resuelve en la iteración 3.

**QA-03 — Performance / Actualización de reservas externas**

> **Importancia H:** el enunciado fija un plazo verificable de cinco minutos para presentar actualizaciones externas, dentro del listado de atributos críticos.
>
> **Dificultad H:** depende de proveedores externos con capacidades heterogéneas (webhooks/polling) y del pipeline de ingesta; el ADD le dedica la iteración 2 y aún quedan por definir periodicidad y reintentos (MADR-0003 y MADR-0004).

**QA-04 — Availability / Indisponibilidad no planificada**

> **Importancia H:** el enunciado exige que el sistema sea "accesible en todo momento" con un tope de cinco minutos de inactividad no planificada por mes y alcance global.
>
> **Dificultad H:** es el driver con mayor riesgo: aparece en las iteraciones 1, 2 y 4 del ADD y sigue **Parcial** en el backlog, además de no estar definida la contabilización de interrupciones parciales ni por región (`ADD.md` §11.3).

**QA-05 — Modifiability / Capacidad de la plataforma**

> **Importancia H:** el enunciado fija cifras de capacidad explícitas (15 M de cuentas, 2 M de usuarios activos semanales) y picos ante disrupciones, dentro del listado de atributos críticos.
>
> **Dificultad H:** el ADD lo marca **Parcial** (iteraciones 1 y 3) y la consigna no entrega solicitudes por segundo ni distribución del pico, por lo que no puede dimensionarse con los datos disponibles.

**QA-06 — Interoperability / Intercambio con proveedores externos**

> **Importancia H:** el enunciado califica la integración como "imperativa" ("Es imperativa una integración fluida con intercambios de aerolíneas, hoteles y arrendadoras"), además del calificativo general de "críticos".
>
> **Dificultad H:** los contratos y capacidades de los proveedores están fuera del control del sistema y son heterogéneos; el ADD la aborda en las iteraciones 1, 2 y 5 y requiere adaptadores/ACL y gobernanza de contratos aún incompleta (MADR-0005, MADR-0015).

**QA-07 — Security / Acceso a itinerarios compartidos**

> **Importancia H:** el escenario pertenece al listado de "atributos de calidad críticos" y responde a la exigencia de "asegurar que solo personas específicas designadas puedan visualizarlos".
>
> **Dificultad M:** existen tácticas conocidas (autenticación delegada, autorización centralizada con RBAC y reglas por itinerario), pero queda por definir la gobernanza de esas reglas y su integración con la compartición; el ADD lo trata en la iteración 4.

**QA-08 — Security / Privacidad del correo integrado**

> **Importancia H:** el enunciado declara que el sistema procesa información personal y que "debe garantizarse el acceso seguro y autorizado a los correos", además del calificativo general de "críticos".
>
> **Dificultad M:** hay tácticas maduras (OAuth2 con permisos mínimos, cifrado y revocación), pero la integración depende del proveedor de correo y de la custodia de tokens; el ADD la cubre en las iteraciones 2 y 4 (MADR-0006, MADR-0013).

**QA-09 — Modifiability / Nuevos medios de transporte**

> **Importancia M:** el enunciado lo formula como previsión de integración futura ("la arquitectura debe prever la integración futura de otros medios de transporte"), sin fijar una medida verificable de esfuerzo o tiempo, a diferencia de los plazos y cifras de las otras hojas.
>
> **Dificultad M:** la modificabilidad localizada es una táctica conocida (módulos de dominio + adaptadores), pero figuran como *Parcial* en el backlog (`ADD.md` §9.1) y la incorporación del chatbot en la iteración 5 muestra que el cambio no es trivial.

**QA-10 — Usability / Interfaz rica e internacionalización**

> **Importancia M:** el enunciado pide "una interfaz rica" y preparación arquitectónica para el mercado internacional, pero no fija métricas de usabilidad ni de localización: es una preparación a futuro, no una restricción verificable como las de QA-01 a QA-08.
>
> **Dificultad M:** la i18n y la CDN son tácticas conocidas, pero la hoja cubre dos preocupaciones —interfaz/usabilidad y preparación multirregión— y esta última exige coordinación entre regiones (MADR-0010); el ADD la trata en las iteraciones 3 y 5. No se separa en un escenario nuevo para conservar los 10 QA y no alterar el ADD.

**Nota sobre la priorización:** la escala H/M/L y los dos ejes (importancia y dificultad/riesgo) provienen de la sección 19.4 del libro. La importancia se toma de la formulación del enunciado, distinguiendo las restricciones verificables presentes de las preparaciones a futuro; la dificultad se gradúa con datos del propio sistema y del estado del ADD (externos heterogéneos, escala global y picos, PII, drivers parciales), no con conocimiento general sobre los atributos, según la sección 34.3. Esta distinción permite ordenar las diez hojas sin inventar métricas: el orden resultante se presenta al inicio de esta sección y es consistente con el orden en que el ADD fue abordando cada escenario.

---

## 5. Checklist (Modo 3)

- [x] Cada atributo se verificó contra su General Scenario (sección 1).
- [x] Cada parte de cada escenario tiene trazabilidad directa con el enunciado o con categorías del GS.
- [x] No se inventaron artifacts, environments, sources ni responses.
- [x] No se sobre-adaptó el Artifact de QA-04 (sigue siendo el servicio / parte del sistema afectada).
- [x] No se agregaron contextos hipotéticos (peak load, temporadas, DDoS, etc.).
- [x] No se inventaron detalles técnicos para justificar prioridades.
- [x] El vocabulario del GS (fault, latency, deadline, etc.) va entre paréntesis como referencia bibliográfica.
- [x] Importancia y dificultad/riesgo graduadas en escala H/M/L en las diez hojas.
- [x] Importancia derivada del enunciado y dificultad derivada de las características del sistema y del estado del ADD, sin inferir H/M/L por conocimiento general.
- [x] Priorización consistente con el orden en que el ADD abordó cada escenario.
- [x] Justificación de prioridades en exactamente dos líneas por hoja.
- [x] Cada preocupación tiene evidencia del enunciado; no se forzaron subdivisiones.
- [x] "No especificado" conservado en las partes de los escenarios donde el enunciado no aporta datos (no en la priorización).
