# Árbol de utilidad — Trotamundos (Modo 3)

**Sistema:** Trotamundos — plataforma de gestión de viajes y reservas (web y móvil), con integración de proveedores externos (aerolíneas, hoteles, arrendadoras), proveedores de correo y redes sociales.

**Entrada:** escenarios QA-01 a QA-10 construidos previamente (Modo 1) a partir del enunciado. Este documento aplica el Modo 3 (sección 34): verifica cada atributo contra su General Scenario, organiza el árbol Utility → atributo → preocupación → escenario y prioriza cada hoja.

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

```
UTILITY
├── Performance
│   ├── Latencia de respuesta web
│   │   └── (H, No especificado) QA-01: viajero en navegador web solicita consultar
│   │       sus viajes y reservas; tiempo de respuesta de 800 ms.
│   ├── Primer contenido en móvil
│   │   └── (H, No especificado) QA-02: viajero en dispositivo móvil abre la
│   │       aplicación; First Contentful Paint inferior a 1,4 s.
│   └── Actualización de reservas externas
│       └── (H, No especificado) QA-03: proveedor externo genera una actualización
│           de reserva; se presenta en la aplicación dentro de los 5 minutos.
├── Availability
│   └── Indisponibilidad no planificada
│       └── (H, No especificado) QA-04: fallo no planificado afecta al servicio;
│           máximo cinco minutos de inactividad no planificada por mes.
├── Modifiability
│   ├── Capacidad de la plataforma
│   │   └── (H, No especificado) QA-05: dimensionar la plataforma para 15 M de
│   │       cuentas, 2 M de usuarios activos semanales y picos de tráfico.
│   └── Nuevos medios de transporte
│       └── (H, No especificado) QA-09: desarrollador incorpora trenes o
│           autobuses manteniendo lo existente.
├── Interoperability
│   └── Intercambio con proveedores externos
│       └── (H, No especificado) QA-06: proveedor de viajes, correo o servicio de
│           compartición intercambia datos con Trotamundos mediante interfaz
│           compatible.
├── Security
│   ├── Acceso a itinerarios compartidos
│   │   └── (H, No especificado) QA-07: usuario intenta visualizar un itinerario
│   │       compartido; se verifica autorización antes de entregarlo.
│   └── Privacidad del correo integrado
│       └── (H, No especificado) QA-08: escaneo de correos para detectar reservas;
│           acceso únicamente a los mensajes autorizados.
└── Usability
    └── Interfaz rica e internacionalización
        └── (H, No especificado) QA-10: viajero consulta y gestiona sus viajes en
            web o móvil con capacidades nativas como GPS.
```

---

## 3. Escenarios (hojas) priorizados

### Hoja QA-01 — Performance / Latencia de respuesta web — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un navegador web (**end user**) |
| Stimulus | Solicita consultar sus viajes y reservas (**llegada de un evento: solicitud**). Tipo de evento: **estocástico** [INFERENCIA] — las solicitudes se generan de forma aleatoria según la actividad de cada usuario (No especificado en el enunciado) |
| Environment | Funcionamiento normal del sistema; carga y condiciones de red No especificado (**normal mode**) |
| Artifact | Interfaz web, API de consulta y componentes que recuperan los datos del viaje (**parte del sistema**) |
| Response | El sistema procesa la consulta y presenta los viajes y reservas (**procesar el evento y responder**) |
| Response Measure | Tiempo de respuesta web de 800 ms (**latency**). El enunciado no precisa si es máximo, promedio o percentil (No especificado) |

### Hoja QA-02 — Performance / Primer contenido en móvil — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde un dispositivo móvil (**end user**) |
| Stimulus | Abre la aplicación o la interfaz móvil (**llegada de un evento: solicitud**). Tipo de evento: **esporádico** [INFERENCIA] — la apertura ocurre de forma irregular, a demanda del usuario (No especificado en el enunciado) |
| Environment | Inicio de la interfaz móvil; dispositivo y condiciones de red No especificado (**normal mode**) |
| Artifact | Interfaz móvil y recursos necesarios para presentar el contenido inicial (**parte del sistema**) |
| Response | La interfaz presenta el primer contenido visible (**procesar el evento y responder**) |
| Response Measure | First Contentful Paint (FCP) inferior a 1,4 segundos (**latency**) |

### Hoja QA-03 — Performance / Actualización de reservas externas — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, como una aerolínea, hotel o arrendadora (**sistema externo**) |
| Stimulus | Genera una actualización de una reserva (**llegada de un evento: notificación**). Tipo de evento: **esporádico** [INFERENCIA] — los cambios llegan de forma irregular desde la fuente externa (No especificado en el enunciado) |
| Environment | Funcionamiento del sistema mientras integra datos de proveedores externos; comportamiento ante caída prolongada del proveedor No especificado (**normal mode**) |
| Artifact | Integración externa, procesamiento de actualizaciones, persistencia de reservas y presentación del itinerario (**parte del sistema**) |
| Response | Trotamundos procesa el cambio y lo presenta en la aplicación (**procesar el evento y responder**) |
| Response Measure | El cambio debe presentarse dentro de los cinco minutos posteriores a su generación por la fuente externa (**deadline**) |

### Hoja QA-04 — Availability / Indisponibilidad no planificada — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | No especificado; [INFERENCIA] Posible valor: un componente de software, hardware o de infraestructura del servicio (**fuente interna o externa de faults**) |
| Stimulus | Un fallo no planificado que afecta al servicio, trazable al "tiempo de indisponibilidad no planificado" del enunciado (**fault**: omission, crash, incorrect timing o incorrect response) |
| Environment | Operación global y continua, tolerando fallos no planificados (**normal operation**) |
| Artifact | El servicio de Trotamundos y la parte del sistema afectada por el fallo (**parte del sistema afectada por el fault**) |
| Response | El sistema detecta, previene o se recupera del fallo y mantiene o restablece el servicio conforme a su especificación (**detectar, prevenir o recuperarse del fault**) |
| Response Measure | Máximo de cinco minutos de inactividad no planificada por mes (**medida de disponibilidad**). No se especifica cómo se contabilizan interrupciones parciales, si el cálculo es global o por región, ni el tratamiento de la indisponibilidad de un proveedor externo (No especificado) |

### Hoja QA-05 — Modifiability / Capacidad de la plataforma — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | No especificado en el enunciado; [INFERENCIA] Posible valor: un desarrollador o arquitecto del sistema que requiere ampliar la capacidad de la plataforma (**developer / product line owner**) |
| Stimulus | Necesidad de dimensionar la plataforma para soportar 15 millones de cuentas, 2 millones de usuarios activos semanales y picos de tráfico ante eventos disruptivos masivos (**cambiar capacidad**) |
| Environment | No especificado; [INFERENCIA] Posible valor: tiempo de diseño/evolución de la plataforma (**design time**) |
| Artifact | Aplicación, API, procesamiento de solicitudes y persistencia (**componentes, recursos y configuraciones**) |
| Response | El equipo realiza, prueba y despliega la ampliación de capacidad manteniendo operativo el servicio (**realizar, probar y desplegar la modificación**) |
| Response Measure | No especificado (**costo del cambio**: esfuerzo, tiempo, cantidad/complejidad de artifacts afectados, efectos sobre otros atributos y defectos introducidos). Las cifras de 15 M cuentas y 2 M usuarios activos semanales son el objetivo de capacidad del cambio, no el presupuesto del mismo |

### Hoja QA-06 — Interoperability / Intercambio con proveedores externos — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un proveedor externo de viajes, de correo o un servicio de compartición (**otra fuente del elemento que se integrará** — opción tomada del GS de Integrability, s. 18, por no existir GS de Interoperability) |
| Stimulus | Envía información o requiere intercambiar datos con Trotamundos mediante una interfaz compatible (**integrar componentes existentes de una nueva manera** — misma referencia del GS de Integrability) |
| Environment | Sistemas externos con distintos contratos y capacidades; operación en ejecución (**runtime**) |
| Artifact | Adaptadores, interfaces de integración y modelo interno de viajes y reservas (**componentes y elementos afectados**) |
| Response | Trotamundos intercambia los datos pertinentes y los interpreta de acuerdo con su modelo interno (**lograr la colaboración/intercambio correcto entre los elementos**) |
| Response Measure | No especificado (**esfuerzo/tiempo de integración y efectos sobre otros atributos**). El enunciado exige APIs estándar, pero no fija métrica cuantitativa de éxito, latencia ni tiempo de incorporación de proveedores. [INFERENCIA] Pruebas de contrato y medidas de interoperabilidad son propuestas de diseño, no valores de la consigna |

### Hoja QA-07 — Security / Acceso a itinerarios compartidos — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un usuario que intenta acceder a un itinerario compartido (**human**) |
| Stimulus | Solicita visualizar un itinerario para el cual puede tener o no autorización (**intento de visualizar datos**) |
| Environment | Operación normal, con itinerarios compartibles con personas específicas (**fully operational**) |
| Artifact | API, mecanismo de autorización, lógica de acceso a itinerarios y datos almacenados (**servicios, datos y componentes**) |
| Response | El sistema verifica los permisos y entrega el itinerario únicamente si el solicitante está autorizado; de lo contrario, rechaza el acceso (**proteger confidentiality; resistir el acceso**) |
| Response Measure | No especificado (**precisión de detección / accesos indebidos**). Condición observable del enunciado: solo las personas específicamente designadas pueden visualizar el itinerario |

### Hoja QA-08 — Security / Privacidad del correo integrado — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | El usuario que autoriza la integración de su correo y el proveedor de correo que entrega los mensajes (**human / another system**) |
| Stimulus | Se solicita o ejecuta el escaneo de mensajes para detectar reservas de viajes (**acceder a datos/servicios**) |
| Environment | El sistema procesa información personal con permisos concedidos al proveedor de correo (**fully operational / online**) |
| Artifact | Integración de correo, almacenamiento de credenciales o concesiones de acceso y procesador de mensajes (**servicios, datos y componentes**) |
| Response | El sistema accede únicamente a los mensajes autorizados y procesa la información pertinente para identificar reservas, protegiendo su confidencialidad e integridad (**proteger confidentiality e integrity**) |
| Response Measure | No especificado (**recursos asegurados / precisión de detección**). El enunciado exige acceso seguro y autorizado, sin métrica cuantitativa. [INFERENCIA] Limitar permisos al mínimo, permitir revocar el acceso y no exponer credenciales son medidas de diseño propuestas, no valores de la consigna |

### Hoja QA-09 — Modifiability / Nuevos medios de transporte — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un desarrollador del sistema (**developer**) |
| Stimulus | Necesita incorporar un nuevo medio de transporte, por ejemplo trenes o autobuses (**agregar funcionalidad / agregar un producto**) |
| Environment | Tiempo de diseño y evolución del sistema (**design time**) |
| Artifact | Modelo de reservas, contratos de integración, adaptadores y módulos del núcleo afectados por los nuevos datos (**componentes, interfaces y datos**) |
| Response | El desarrollador incorpora el nuevo medio de transporte manteniendo las funcionalidades existentes que no necesitan cambiar (**realizar, probar y desplegar la modificación**) |
| Response Measure | No especificado (**costo del cambio**: artifacts afectados, esfuerzo, tiempo, efectos sobre otros atributos). El enunciado exige prever la incorporación futura, pero no fija un presupuesto máximo de esfuerzo o tiempo. [INFERENCIA] La localización de los cambios es una decisión arquitectónica propuesta, no una garantía textual |

### Hoja QA-10 — Usability / Interfaz rica e internacionalización — Prioridad (H, No especificado)

| Parte | Escenario concreto |
|---|---|
| Stimulus Source | Un viajero que utiliza Trotamundos desde la web o un dispositivo móvil (**end user**) |
| Stimulus | Necesita consultar y gestionar sus viajes en una interfaz adecuada a su contexto de uso (**el usuario quiere usar el sistema eficientemente**) |
| Environment | Uso web o móvil, con acceso a capacidades nativas como GPS (**runtime**) |
| Artifact | Interfaz de usuario, presentación de itinerarios y acceso a capacidades del dispositivo (**GUI / touch screen**) |
| Response | El sistema presenta y permite gestionar la información de viaje mediante una interfaz adecuada al dispositivo (**proporcionar las funcionalidades e interacción requeridas**) |
| Response Measure | No especificado (**task time, number of errors, learning time, user satisfaction**). El enunciado exige una interfaz rica y preparación arquitectónica internacional, sin métrica cuantitativa de usabilidad o localización |

---

## 4. Justificación de prioridades

**QA-01 — Performance / Latencia web**

> **Importancia H:** el enunciado califica explícitamente a todos los atributos listados como "atributos de calidad críticos identificados en la especificación inicial", lo que constituye una indicación explícita de criticidad para este y los demás escenarios del árbol.
>
> **Dificultad No especificado:** el enunciado no proporciona evidencia de complejidad técnica para alcanzar los 800 ms. Faltaría información sobre la arquitectura prevista, la carga esperada o restricciones técnicas.

**QA-02 — Performance / Primer contenido en móvil**

> **Importancia H:** el escenario está incluido en el listado que el enunciado califica como "atributos de calidad críticos identificados en la especificación inicial".
>
> **Dificultad No especificado:** el enunciado no describe la complejidad técnica de lograr un First Contentful Paint inferior a 1,4 s; la métrica completa el Response Measure, no la dificultad.

**QA-03 — Performance / Actualización de reservas externas**

> **Importancia H:** el escenario pertenece al listado de "atributos de calidad críticos" declarado por el enunciado.
>
> **Dificultad No especificado:** el enunciado no aporta evidencia de complejidad técnica sobre la integración ni el procesamiento de actualizaciones externas dentro del deadline de cinco minutos.

**QA-04 — Availability / Indisponibilidad no planificada**

> **Importancia H:** además del calificativo general de "críticos", el enunciado exige explícitamente que el sistema "debe ser accesible en todo momento", lo que refuerza la criticidad del requisito de disponibilidad.
>
> **Dificultad No especificado:** el objetivo de cinco minutos por mes completa el Response Measure; el enunciado no declara complejidad técnica explícita para lograrlo. Faltaría evidencia sobre restricciones o el esfuerzo estimado.

**QA-05 — Modifiability / Capacidad de la plataforma**

> **Importancia H:** el requisito integra el listado de "atributos de calidad críticos" del enunciado, que fija cifras de negocio explícitas (15 M de cuentas, 2 M de usuarios activos semanales).
>
> **Dificultad No especificado:** el enunciado no describe la complejidad técnica de la ampliación de capacidad; las cifras son el objetivo del cambio, no evidencia de dificultad.

**QA-06 — Interoperability / Intercambio con proveedores externos**

> **Importancia H:** el enunciado califica la integración como "imperativa" ("Es imperativa una integración fluida con intercambios de aerolíneas, hoteles y arrendadoras"), además del calificativo general de "críticos".
>
> **Dificultad No especificado:** el enunciado no fija evidencia de complejidad técnica; no describe la cantidad de proveedores, contratos ni restricciones que permitan estimar H/M/L.

**QA-07 — Security / Acceso a itinerarios compartidos**

> **Importancia H:** el escenario pertenece al listado de "atributos de calidad críticos" y responde a la exigencia de "asegurar que solo personas específicas designadas puedan visualizarlos".
>
> **Dificultad No especificado:** el enunciado no proporciona evidencia de complejidad técnica del mecanismo de autorización; faltaría información sobre los vectores de acceso y las restricciones técnicas previstas.

**QA-08 — Security / Privacidad del correo integrado**

> **Importancia H:** el enunciado declara que el sistema procesa información personal y que "debe garantizarse el acceso seguro y autorizado a los correos", además del calificativo general de "críticos".
>
> **Dificultad No especificado:** el enunciado no describe la complejidad técnica de la integración segura con proveedores de correo; las medidas de diseño son inferencias nuestras, no evidencia del enunciado.

**QA-09 — Modifiability / Nuevos medios de transporte**

> **Importancia H:** el escenario está cubierto por el calificativo general de "atributos de calidad críticos" y por la exigencia de que "la arquitectura debe prever la integración futura de otros medios de transporte".
>
> **Dificultad No especificado:** el enunciado no fija presupuesto de esfuerzo ni describe complejidad técnica; la localización de cambios es una inferencia de diseño, no evidencia de dificultad.

**QA-10 — Usability / Interfaz rica e internacionalización**

> **Importancia H:** el enunciado exige explícitamente "una interfaz rica" y la preparación arquitectónica para el mercado internacional, dentro del listado de "atributos de calidad críticos".
>
> **Dificultad No especificado:** el enunciado no aporta evidencia de complejidad técnica de la usabilidad ni de la localización; no fija métricas ni describe restricciones que permitan estimar H/M/L.

**Nota sobre la priorización:** la escala H/M/L y los criterios de importancia y dificultad provienen de la sección 19.4 del libro. La importancia de todas las hojas se apoya en la evidencia explícita del enunciado ("atributos de calidad críticos", "imperativa", "debe ser accesible en todo momento"), no en el uso de la palabra "debe" ni en la presencia de métricas técnicas. La dificultad es "No especificado" en las diez hojas: el enunciado no describe complejidad técnica explícita de ningún objetivo, y según la sección 34.3 no puede inferirse H/M/L a partir del conocimiento general sobre los atributos.

---

## 5. Checklist (Modo 3)

- [x] Cada atributo se verificó contra su General Scenario (sección 1).
- [x] Cada parte de cada escenario tiene trazabilidad directa con el enunciado o con categorías del GS.
- [x] No se inventaron artifacts, environments, sources ni responses.
- [x] No se sobre-adaptó el Artifact de QA-04 (sigue siendo el servicio / parte del sistema afectada).
- [x] No se agregaron contextos hipotéticos (peak load, temporadas, DDoS, etc.).
- [x] No se inventaron detalles técnicos para justificar prioridades.
- [x] El vocabulario del GS (fault, latency, deadline, etc.) va entre paréntesis como referencia bibliográfica.
- [x] Dificultad "No especificado" en las diez hojas, sin inferir H/M/L por conocimiento general.
- [x] Importancia sustentada en criticidad explícita del enunciado, no en la palabra "debe" ni en las métricas.
- [x] Justificación de prioridades en exactamente dos líneas por hoja.
- [x] Cada preocupación tiene evidencia del enunciado; no se forzaron subdivisiones.
- [x] "No especificado" conservado donde el enunciado no aporta datos.
