Requerimientos de Atributos de Calidad (Quality Attributes):

La arquitectura del sistema deberá satisfacer los siguientes atributos de calidad críticos identificados en la
especificación inicial:

• Rendimiento (Performance) y Latencia:
Las actualizaciones de viaje deben presentarse en la aplicación
dentro de los 5 minutos posteriores a su generación por la fuente externa. El tiempo de respuesta desde 
web debe ser de 800ms. En plataformas móviles, el primer despliegue de contenido (First-conten;ul paint)
debe ocurrir en menos de 1.4 segundos.


QA-01. Rendimiento web
Parte	Descripción
1. Fuente del estímulo: Un viajero que utiliza Trotamundos desde un navegador web.
2. Estímulo:	Solicita consultar sus viajes y reservas.
3. Entorno:	Funcionamiento normal del sistema. La carga y las condiciones de red exactas no están especificadas.
4. Artefacto:	Interfaz web, API de consulta y componentes que recuperan los datos del viaje.
5. Respuesta:	El sistema procesa la consulta y presenta los viajes y reservas correspondientes.
6. Medida de respuesta:	Tiempo de respuesta web de 800 ms. El TPE no precisa si es máximo, promedio o percentil

QA-02. Rendimiento móvil
1. Fuente del estímulo: Un viajero que utiliza Trotamundos desde un dispositivo móvil.
2. Estímulo:	Abre la aplicación o la interfaz móvil.
3. Entorno:	Inicio de la interfaz móvil. El dispositivo y las condiciones de red no están especificados.
4. Artefacto:	Interfaz móvil y recursos necesarios para presentar el contenido inicial.
5. Respuesta:	La interfaz presenta el primer contenido visible.
6. Medida de respuesta:	First Contentful Paint (FCP) inferior a 1,4 segundos.

QA-03. Actualización de reservas externas
Parte	Descripción
1. Fuente del estímulo	Un proveedor externo de viajes, como una aerolínea, hotel o arrendadora.
2. Estímulo	Genera una actualización de una reserva.
3. Entorno	Funcionamiento del sistema mientras integra datos de proveedores externos. No se especifica qué ocurre durante una caída prolongada del proveedor.
4. Artefacto	Integración externa, procesamiento de actualizaciones, persistencia de reservas y presentación del itinerario.
5. Respuesta	Trotamundos procesa el cambio y lo presenta en la aplicación.
6. Medida de respuesta	El cambio debe presentarse dentro de los cinco minutos posteriores a su generación por la fuente externa.


• Disponibilidad (Availability):
El sistema es de uso global y debe ser accesible en todo momento, tolerando
un máximo de 5 minutos por mes de tiempo de inactvidad no planificado.

QA-04. Disponibilidad
Parte	Descripción
1. Fuente del estímulo	Un viajero que necesita acceder al sistema.
2. Estímulo	Solicita utilizar una funcionalidad disponible de Trotamundos.
3. Entorno	Operación global y continua, incluyendo posibles fallos no planificados.
4. Artefacto	Servicio de Trotamundos y componentes necesarios para atender la solicitud.
5. Respuesta	El sistema permanece accesible o recupera el servicio después de una interrupción.
6. Medida de respuesta	Máximo de cinco minutos de inactividad no planificada por mes.

Dato faltante: la especificación no define cómo se contabilizan las interrupciones parciales, si el cálculo es global o por región ni cómo se trata la indisponibilidad de un proveedor externo.

• Escalabilidad (Scalability): La plataforma debe dimensionarse para soportar una base de 15 millones de
cuentas, operando con 2 millones de usuarios ac4vos semanales y soportando dramá4cos picos de tráfico ante eventos disruptivos masivos.

QA-05. Escalabilidad ante picos de tráfico
(medida parcial)
Parte	Descripción
1. Fuente del estímulo	Los usuarios de Trotamundos, especialmente durante eventos de disrupción de viajes.
2. Estímulo	Se produce un aumento pronunciado de solicitudes concurrentes.
3. Entorno	Picos de uso, incluidos los períodos de domingo-lunes y jueves-viernes y las disrupciones importantes de viajes.
4. Artefacto	Aplicación, API, procesamiento de solicitudes y persistencia.
5. Respuesta	El sistema continúa atendiendo las solicitudes de los usuarios.
6. Medida de respuesta	La plataforma debe soportar 15 millones de cuentas y 2 millones de usuarios activos semanales. No se especifica la concurrencia máxima ni una latencia objetivo específica bajo el pico.

Importante: las cifras de cuentas y usuarios activos semanales no definen por sí solas una carga de concurrencia. Para validar el escenario faltan solicitudes por segundo, distribución de operaciones y duración e intensidad de los picos.

• Interoperabilidad (Interoperability): Es impera4va una integración fluida con intercambios de aerolíneas,
hoteles y arrendadoras a través de APIs estándar. Adicionalmente, el sistema debe interoperar con
proveedores de correo para el escaneo de mensajes y con redes sociales para comparar itinerarios.

QA-06. Interoperabilidad con proveedores externos
(Medida pendiente)
Parte	Descripción
1. Fuente del estímulo	Un proveedor externo de viajes, correo o un servicio de compartición.
2. Estímulo	Envía información o requiere intercambiar datos con Trotamundos mediante una interfaz compatible.
3. Entorno	Integración con sistemas externos que pueden tener diferentes contratos y capacidades.
4. Artefacto	Adaptadores, interfaces de integración y modelo interno de viajes y reservas.
5. Respuesta	Trotamundos intercambia los datos pertinentes y los interpreta de acuerdo con su modelo interno.
6. Medida de respuesta	El TPE exige integración mediante APIs estándar, pero no establece una métrica cuantitativa de éxito, latencia o tiempo de incorporación de proveedores.

Inferencia de diseño: convendría definir pruebas de contrato y medidas de interoperabilidad para evaluar esta respuesta. Esas medidas adicionales no son valores establecidos por la consigna.

• Seguridad y Privacidad (Security): El sistema procesa información personal. Debe garan4zarse el acceso
seguro y autorizado a los correos, y permi4r el uso compar4do de i4nerarios asegurando que solo
personas específicas designadas puedan visualizarlos.

QA-07. Seguridad de itinerarios compartidos
Parte	Descripción
1. Fuente del estímulo	Un usuario que intenta acceder a un itinerario compartido.
2. Estímulo	Solicita visualizar un itinerario para el cual puede tener o no autorización.
3. Entorno	Operación normal, con itinerarios que pueden compartirse con personas específicas.
4. Artefacto	API, mecanismo de autorización, lógica de acceso a itinerarios y datos almacenados.
5. Respuesta	El sistema verifica los permisos y entrega el itinerario únicamente si el solicitante está autorizado; de lo contrario, rechaza el acceso.
6. Medida de respuesta	Solo las personas específicamente designadas pueden visualizar el itinerario. No se especifica una tasa numérica de fallos de autorización.

QA-08. Seguridad y privacidad del correo
Parte	Descripción
1. Fuente del estímulo	El usuario que autoriza la integración de su correo y el proveedor de correo que entrega los mensajes.
2. Estímulo	Se solicita o ejecuta el escaneo de mensajes para detectar reservas de viajes.
3. Entorno	El sistema procesa información personal y opera con permisos concedidos al proveedor de correo.
4. Artefacto	Integración de correo, almacenamiento de credenciales o concesiones de acceso y procesador de mensajes.
5. Respuesta	El sistema accede a los mensajes autorizados y procesa la información pertinente para identificar reservas.
6. Medida de respuesta	El acceso debe ser seguro y autorizado. La especificación no fija métricas de seguridad cuantitativas.

Inferencia de diseño: limitar los permisos al mínimo necesario, permitir la revocación del acceso y evitar exponer credenciales son medidas que proponemos para concretar el requisito. La consigna no determina el protocolo de autorización


• Evolucionabilidad y Mantenibilidad (Evolvability): La arquitectura debe prever la integración futura de
otros medios de transporte (trenes, autobuses, etc.). Apoyándose en el uso de ADRs y contratos (Specdriven), el diseño general y el proto4po final deben exhibir una alta trazabilidad y facilitar evaluaciones
futuras.

QA-09. Evolucionabilidad: incorporar un nuevo medio de transporte
Parte	Descripción
1. Fuente del estímulo	Un desarrollador del sistema.
2. Estímulo	Necesita incorporar un nuevo medio de transporte, por ejemplo, trenes o autobuses.
3. Entorno	Tiempo de diseño y evolución del sistema.
4. Artefacto	Modelo de reservas, contratos de integración, adaptadores y módulos del núcleo afectados por los nuevos datos.
5. Respuesta	El desarrollador incorpora el nuevo medio de transporte manteniendo las funcionalidades existentes que no necesitan cambiar.
6. Medida de respuesta	La arquitectura debe prever la incorporación futura de otros medios de transporte. No se especifica un presupuesto máximo de esfuerzo o tiempo.

La idea de que los cambios sean localizados es una decisión arquitectónica propuesta para satisfacer la evolucionabilidad; no una garantía textual de la especificación

• Usabilidad (Usability) e Internacionalización: Se requiere una interfaz rica (aprovechando capacidades
nativas como GPS en móviles) y el sistema debe estar preparado arquitectónicamente para operar en el
mercado internacional (multiregión).

QA-10. Usabilidad e internacionalización
Parte	Descripción
1. Fuente del estímulo	Un viajero que utiliza Trotamundos desde la web o un dispositivo móvil.
2. Estímulo	Necesita consultar y gestionar sus viajes en una interfaz adecuada a su contexto de uso.
3. Entorno	Uso web o móvil en un sistema preparado para operar internacionalmente y aprovechar capacidades nativas como GPS.
4. Artefacto	Interfaz de usuario, presentación de itinerarios, localización y acceso a capacidades del dispositivo.
5. Respuesta	El sistema presenta y permite gestionar la información de viaje mediante una interfaz adecuada al dispositivo y preparada para distintos mercados.
6. Medida de respuesta	El TPE exige una interfaz rica y preparación arquitectónica para operar internacionalmente y en múltiples regiones, pero no fija una métrica cuantitativa de usabilidad o localización.
