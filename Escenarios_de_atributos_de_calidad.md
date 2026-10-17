Requerimientos de Atributos de Calidad (Quality Attributes):

La arquitectura del sistema deberá satisfacer los siguientes atributos de calidad críticos identificados en la
especificación inicial:

• Rendimiento (Performance) y Latencia:
Las actualizaciones de viaje deben presentarse en la aplicación
dentro de los 5 minutos posteriores a su generación por la fuente externa. El tiempo de respuesta desde 
web debe ser de 800ms. En plataformas móviles, el primer despliegue de contenido (First-conten;ul paint)
debe ocurrir en menos de 1.4 segundos.


QA-01. Rendimiento web - PERFORMANCE
Parte	Descripción
1. Fuente del estímulo:	Un viajero que utiliza Trotamundos desde un navegador web (usuario).
2. Estímulo:	Solicita consultar sus viajes y reservas — evento de llegada estocástico: las solicitudes se generan de forma aleatoria según la actividad de cada usuario (No especificado en el enunciado) [INFERENCIA].
3. Entorno:	Funcionamiento normal del sistema; carga y condiciones de red No especificado (normal mode).
4. Artefacto:	Interfaz web, API de consulta y componentes que recuperan los datos del viaje (parte/componente del sistema).
5. Respuesta:	El sistema procesa la consulta y presenta los viajes y reservas (procesar el evento y responder).
6. Medida de respuesta:	Tiempo de respuesta web de 800 ms (latency). El enunciado no precisa si es máximo, promedio o percentil (No especificado).

QA-02. Rendimiento móvil - PERFORMANCE
1. Fuente del estímulo:	Un viajero que utiliza Trotamundos desde un dispositivo móvil (usuario).
2. Estímulo:	Abre la aplicación o la interfaz móvil — evento de llegada esporádico: la apertura ocurre de forma irregular, a demanda del usuario (No especificado en el enunciado) [INFERENCIA].
3. Entorno:	Inicio de la interfaz móvil; dispositivo y condiciones de red No especificado (normal mode).
4. Artefacto:	Interfaz móvil y recursos necesarios para presentar el contenido inicial (parte/componente del sistema).
5. Respuesta:	La interfaz presenta el primer contenido visible (procesar el evento y responder).
6. Medida de respuesta:	First Contentful Paint (FCP) inferior a 1,4 segundos (latency).

QA-03. Actualización de reservas externas - PERFORMANCE
Parte	Descripción
1. Fuente del estímulo:	Un proveedor externo de viajes, como una aerolínea, hotel o arrendadora (sistema externo).
2. Estímulo:	Genera una actualización de una reserva — evento de llegada esporádico: los cambios llegan de forma irregular desde la fuente externa (No especificado en el enunciado) [INFERENCIA].
3. Entorno:	Funcionamiento del sistema mientras integra datos de proveedores externos; comportamiento ante caída prolongada del proveedor No especificado (normal mode).
4. Artefacto:	Integración externa, procesamiento de actualizaciones, persistencia de reservas y presentación del itinerario (parte/componente del sistema).
5. Respuesta:	Trotamundos procesa el cambio y lo presenta en la aplicación (procesar el evento y responder).
6. Medida de respuesta:	El cambio debe presentarse dentro de los cinco minutos posteriores a su generación por la fuente externa (deadline/latency).


• Disponibilidad (Availability):
El sistema es de uso global y debe ser accesible en todo momento, tolerando
un máximo de 5 minutos por mes de tiempo de inactvidad no planificado.

QA-04 - DISPONIBILIDAD
Parte	Descripción
1. Fuente del estímulo:	Fuente del fallo No especificado; [INFERENCIA] Posible valor: un componente de software, hardware o de infraestructura del servicio (software / hardware / infraestructura física).
2. Estímulo:	Un fallo no planificado que afecta al servicio (fault: omission, crash, incorrect timing o incorrect response).
3. Entorno:	Operación global y continua (normal operation), incluyendo fallos no planificados.
4. Artefacto:	El servicio de Trotamundos y la parte del sistema afectada por el fallo (parte del sistema afectada por el fault).
5. Respuesta:	El sistema detecta, previene o se recupera del fallo y mantiene/restablece el servicio conforme a su especificación (detectar, prevenir o recuperarse del fault).
6. Medida de respuesta:	Máximo de cinco minutos de inactividad no planificada por mes (medida de disponibilidad / tiempo de indisponibilidad). No se especifica cómo se contabilizan interrupciones parciales, si el cálculo es global o por región, ni el tratamiento de la indisponibilidad de un proveedor externo (No especificado).

Dato faltante: la especificación no define cómo se contabilizan las interrupciones parciales, si el cálculo es global o por región ni cómo se trata la indisponibilidad de un proveedor externo.

• Escalabilidad (Scalability): La plataforma debe dimensionarse para soportar una base de 15 millones de
cuentas, operando con 2 millones de usuarios ac4vos semanales y soportando dramá4cos picos de tráfico ante eventos disruptivos masivos.

QA-05. Escalabilidad ante picos de tráfico - MODIFICABILIDAD
Parte	Descripción
1. Fuente del estímulo:	No especificado en el enunciado; [INFERENCIA] Posible valor: un desarrollador o arquitecto del sistema que requiere ampliar la capacidad de la plataforma (developer / product line owner).
2. Estímulo:	Necesidad de dimensionar la plataforma para soportar 15 millones de cuentas, 2 millones de usuarios activos semanales y picos de tráfico ante eventos disruptivos masivos (cambiar capacidad).
3. Entorno:	No especificado; [INFERENCIA] Posible valor: tiempo de diseño/evolución de la plataforma (design time).
4. Artefacto:	Aplicación, API, procesamiento de solicitudes y persistencia (componentes, recursos y configuraciones).
5. Respuesta:	El equipo realiza, prueba y despliega la ampliación de capacidad manteniendo operativo el servicio (realizar, probar y desplegar/adaptar la modificación).
6. Medida de respuesta:	No especificado (costo del cambio: esfuerzo, tiempo, cantidad/complejidad de artifacts afectados, efectos sobre otros atributos y defectos introducidos). Las cifras de 15 M cuentas y 2 M usuarios activos semanales son el objetivo de capacidad del cambio, no el presupuesto del mismo.


• Interoperabilidad (Interoperability): Es imperativa una integración fluida con intercambios de aerolíneas,
hoteles y arrendadoras a través de APIs estándar. Adicionalmente, el sistema debe interoperar con
proveedores de correo para el escaneo de mensajes y con redes sociales para comparar itinerarios.

QA-06. Interoperabilidad con proveedores externos - INTEROPERABILIDAD
Parte	Descripción
1. Fuente del estímulo:	Un proveedor externo de viajes, de correo o un servicio de compartición (otra fuente del elemento que se integrará).
2. Estímulo:	Envía información o requiere intercambiar datos con Trotamundos mediante una interfaz compatible (integrar componentes existentes de una nueva manera).
3. Entorno:	Sistemas externos con distintos contratos y capacidades; operación en ejecución (runtime).
4. Artefacto:	Adaptadores, interfaces de integración y modelo interno de viajes y reservas (componentes y elementos afectados).
5. Respuesta:	Trotamundos intercambia los datos pertinentes y los interpreta de acuerdo con su modelo interno (lograr la colaboración/intercambio correcto entre los elementos).
6. Medida de respuesta:	No especificado (esfuerzo/tiempo de integración y efectos sobre otros atributos). El enunciado exige APIs estándar, pero no fija métrica cuantitativa de éxito, latencia ni tiempo de incorporación de proveedores. [INFERENCIA] Pruebas de contrato y medidas de interoperabilidad son propuestas de diseño, no valores de la consigna.

Inferencia de diseño: convendría definir pruebas de contrato y medidas de interoperabilidad para evaluar esta respuesta. Esas medidas adicionales no son valores establecidos por la consigna.

• Seguridad y Privacidad (Security): El sistema procesa información personal. Debe garan4zarse el acceso
seguro y autorizado a los correos, y permi4r el uso compar4do de i4nerarios asegurando que solo
personas específicas designadas puedan visualizarlos.

QA-07. Seguridad de itinerarios compartidos - SECURITY
Parte	Descripción
1. Fuente del estímulo:	Un usuario que intenta acceder a un itinerario compartido (human).
2. Estímulo:	Solicita visualizar un itinerario para el cual puede tener o no autorización (intento de visualizar datos).
3. Entorno:	Operación normal, con itinerarios compartibles con personas específicas (fully operational).
4. Artefacto:	API, mecanismo de autorización, lógica de acceso a itinerarios y datos almacenados (servicios, datos y componentes).
5. Respuesta:	El sistema verifica los permisos y entrega el itinerario únicamente si el solicitante está autorizado; de lo contrario, rechaza el acceso (proteger confidentiality; resistir/responder al acceso).
6. Medida de respuesta:	No especificado (precisión de detección / accesos indebidos). Condición observable del enunciado: solo las personas específicamente designadas pueden visualizar el itinerario.

QA-08. Seguridad y privacidad del correo - SECURITY
Parte	Descripción
1. Fuente del estímulo:	El usuario que autoriza la integración de su correo y el proveedor de correo que entrega los mensajes (human / another system).
2. Estímulo:	Se solicita o ejecuta el escaneo de mensajes para detectar reservas de viajes (acceder a datos/servicios).
3. Entorno:	El sistema procesa información personal con permisos concedidos al proveedor de correo (fully operational / online).
4. Artefacto:	Integración de correo, almacenamiento de credenciales o concesiones de acceso y procesador de mensajes (servicios, datos y componentes).
5. Respuesta:	El sistema accede únicamente a los mensajes autorizados y procesa la información pertinente para identificar reservas, protegiendo su confidencialidad e integridad (proteger confidentiality e integrity; registrar accesos).
6. Medida de respuesta:	No especificado (recursos asegurados / precisión de detección). El enunciado exige acceso seguro y autorizado, sin métrica cuantitativa. [INFERENCIA] Limitar permisos al mínimo, permitir revocar el acceso y no exponer credenciales son medidas de diseño propuestas, no valores de la consigna.

Inferencia de diseño: limitar los permisos al mínimo necesario, permitir la revocación del acceso y evitar exponer credenciales son medidas que proponemos para concretar el requisito. La consigna no determina el protocolo de autorización


• Evolucionabilidad y Mantenibilidad (Evolvability): La arquitectura debe prever la integración futura de
otros medios de transporte (trenes, autobuses, etc.). Apoyándose en el uso de ADRs y contratos (Specdriven), el diseño general y el proto4po final deben exhibir una alta trazabilidad y facilitar evaluaciones
futuras.

QA-09. Evolucionabilidad: incorporar un nuevo medio de transporte - MODIFICABILIDAD
Parte	Descripción
1. Fuente del estímulo:	Un desarrollador del sistema (developer).
2. Estímulo:	Necesita incorporar un nuevo medio de transporte, por ejemplo, trenes o autobuses (agregar funcionalidad / agregar un producto).
3. Entorno:	Tiempo de diseño y evolución del sistema (design time).
4. Artefacto:	Modelo de reservas, contratos de integración, adaptadores y módulos del núcleo afectados por los nuevos datos (componentes, interfaces y datos).
5. Respuesta:	El desarrollador incorpora el nuevo medio de transporte manteniendo las funcionalidades existentes que no necesitan cambiar (realizar, probar y desplegar la modificación).
6. Medida de respuesta:	No especificado (costo del cambio: artifacts afectados, esfuerzo, tiempo, efectos sobre otros atributos). El enunciado exige prever la incorporación futura, pero no fija un presupuesto máximo de esfuerzo o tiempo. [INFERENCIA] La localización de los cambios es una decisión arquitectónica propuesta, no una garantía textual.

La idea de que los cambios sean localizados es una decisión arquitectónica propuesta para satisfacer la evolucionabilidad; no una garantía textual de la especificación

• Usabilidad (Usability) e Internacionalización: Se requiere una interfaz rica (aprovechando capacidades
nativas como GPS en móviles) y el sistema debe estar preparado arquitectónicamente para operar en el
mercado internacional (multiregión).

QA-10. Usabilidad e internacionalización - USABILIDAD
Parte	Descripción
1. Fuente del estímulo:	Un viajero que utiliza Trotamundos desde la web o un dispositivo móvil (end user).
2. Estímulo:	Necesita consultar y gestionar sus viajes en una interfaz adecuada a su contexto de uso (el usuario quiere usar el sistema eficientemente).
3. Entorno:	Uso web o móvil, con acceso a capacidades nativas como GPS (runtime).
4. Artefacto:	Interfaz de usuario, presentación de itinerarios y acceso a capacidades del dispositivo (GUI / touch screen).
5. Respuesta:	El sistema presenta y permite gestionar la información de viaje mediante una interfaz adecuada al dispositivo (proporcionar las funcionalidades e interacción requeridas).
6. Medida de respuesta:	No especificado (task time, number of errors, learning time, user satisfaction). El enunciado exige una interfaz rica y preparación arquitectónica internacional, sin métrica cuantitativa de usabilidad o localización.
