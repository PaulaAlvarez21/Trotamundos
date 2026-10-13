# Materia: Diseño de Sistemas de Software

## TRABAJO PRÁCTICO ESPECIAL

**FACULTAD DE CIENCIAS EXACTAS - UNICEN**

### 1. Objetivo

Dada la especificación del sistema "Trotamundos", se requiere identificar, capturar y documentar las decisiones de diseño y construir la arquitectura de software del sistema aplicando el método ADD (Diseño Guiado por Atributos o Attribute-Driven Design). Adicionalmente, se deberá desarrollar una implementación prototipo del sistema que demuestre la viabilidad de la arquitectura propuesta.

### 2. Modalidad

El trabajo se realizará en forma grupal. Es fundamental que los grupos realicen una rigurosa gestión del tiempo y acoten el alcance (*scope*) del prototipo. Se espera que tanto las iteraciones de diseño como la implementación avancen fuertemente a través de ejercicios prácticos, asegurando así la viabilidad de las entregas dentro del cronograma estipulado.

### 3. Análisis Inicial y Pre-requisitos

Antes de iniciar el proceso ADD iterativo, cada grupo debe realizar un análisis detallado de los requerimientos e identificar claramente el alcance del sistema a diseñar. Se recomienda fuertemente elaborar un diagrama de contexto para establecer los límites del sistema y sus interacciones con actores externos.

A partir de esto, se debe identificar un conjunto priorizado de requerimientos funcionales y de atributos de calidad, los cuáles deben ser especificados claramente (ayudándose de la narrativa provista en la siguiente sección) y servirán como drivers inmutables durante el proceso de ADD.

### 4. Metodología y Entregable

Se deben capturar las iteraciones del proceso y los artefactos resultantes del mismo (tanto intermedios como finales) en formato de Wiki (por ej., Github). El proceso ADD debe involucrar 4 iteraciones (como mínimo, pueden requerirse más). La Wiki debe recibir actualizaciones periódicas que muestren la evolución del trabajo y la labor de cada integrante del grupo.

* **Documentación Arquitectónica:** Para la captura de decisiones de diseño, la arquitectura debe ser documentada exhaustivamente utilizando ADRs (*Architecture Decision Records*) bajo el formato MADR. Complementariamente, deben crearse las vistas arquitectónicas adecuadas (por ej., vistas de módulos, componentes y conectores, despliegue, diagramas de secuencia, etc.) que reflejen las estructuras del sistema.

* **Spec-driven Development:** Se recomienda enfáticamente adoptar un enfoque de *Spec-driven development* tanto para el diseño con ADD como para las tareas de implementación del prototipo.

### 5. Criterios de Evaluación

Se valorarán positivamente la claridad, precisión y completitud de la documentación entregada, tanto respecto al proceso de ADD como a las vistas y ADRs generados, incluyendo la correcta utilización de patrones y tácticas de diseño. Asimismo, se evaluará que el código del prototipo sea trazable, consistente con la arquitectura documentada y respete las especificaciones definidas contractualmente (*Spec-driven*).

## SISTEMA "TROTAMUNDOS"

Una nueva empresa emergente (*startup*) busca construir la próxima generación de un panel de gestión de viajes en línea para permitir a los viajeros ver todas sus reservas existentes organizadas por viaje, ya sea a través de la web o desde su dispositivo móvil. El objetivo es ofrecer un único punto de verdad para todos los arreglos de viaje (hoteles, autos, vuelos, trenes, autobuses) en una interfaz simple centrada en el viaje, mitigando la frustración de rastrear múltiples aplicaciones y bandejas de correo.

### Escala y Usuarios

El sistema debe soportar una carga de 2 millones de usuarios activos por semana, con un total de 15 millones de cuentas de usuario en la plataforma. Se esperan picos de uso marcados entre domingo-lunes y jueves-viernes, así como también durante interrupciones importantes de viajes (ej. disrupciones climáticas).

### Requerimientos Funcionales Principales

* **Procesamiento de Correo:** El sistema debe sondear y escanear el correo electrónico de los usuarios en busca de correos relacionados con viajes para agregar automáticamente las reservas al itinerario.

* **Filtros y Whitelists:** Debe permitir filtrar y crear listas de remitentes seguros (*whitelists*) para ciertos correos electrónicos de viaje.

* **Integración con Terceros:** El sistema debe integrarse de manera fluida con sistemas de viajes e interfaces de agencias de terceros a través de APIs estándar (por ejemplo, intercambios de aerolíneas o rentadoras) para obtener detalles de las reservas, actualizaciones y cancelaciones.

* **Gestión Manual:** Los clientes deben poder agregar, actualizar o eliminar sus reservas existentes de forma manual dentro del panel.

* **Ciclo de Vida del Viaje:** Los elementos en el panel de control deben poder agruparse por viaje, y una vez que el viaje se completa, deben archivarse o eliminarse automáticamente de la vista principal.

* **Resolución de Problemas:** El sistema debe integrarse con la agencia de viajes preferida del usuario para facilitar una rápida resolución de problemas.

* **Analítica de Datos:** "Trotamundos" recopilará datos analíticos de los viajes (tendencias, destinos, cancelaciones) para su monetización por parte del equipo de datos, implicando la ejecución de consultas analíticas pesadas.

### Requerimientos Avanzados (Selección Obligatoria, para 2da entrega)

Para definir el alcance final del diseño, el equipo deberá elegir e incorporar al menos uno de los siguientes módulos funcionales avanzados:

* **Opción A - Sistema de Recomendación:** Incorporar un módulo que aplique técnicas de análisis sobre el historial y preferencias de los usuarios para sugerir proactivamente alternativas de alojamiento, transporte o rutas. El diseño debe contemplar un esquema de optimización *human-in-the-loop*, donde el usuario interactúe con las sugerencias (aceptando o ajustando parámetros) para refinar continuamente el modelo de recomendación.

* **Opción B - Asistente Virtual (Chatbot):** Implementar un bot conversacional integrado que actúe como primer nivel de soporte interactivo para gestionar reprogramaciones, consultas de estado y problemas menores, delegando a la agencia de viajes preferida del usuario únicamente aquellos casos complejos.

### Requerimientos de Atributos de Calidad (*Quality Attributes*)

La arquitectura del sistema deberá satisfacer los siguientes atributos de calidad críticos identificados en la especificación inicial:

* **Rendimiento (*Performance*) y Latencia:** Las actualizaciones de viaje deben presentarse en la aplicación dentro de los 5 minutos posteriores a su generación por la fuente externa. El tiempo de respuesta desde la web debe ser de 800ms. En plataformas móviles, el primer despliegue de contenido (*First-contentful paint*) debe ocurrir en menos de 1.4 segundos.

* **Disponibilidad (*Availability*):** El sistema es de uso global y debe ser accesible en todo momento, tolerando un máximo de 5 minutos por mes de tiempo de inactividad no planificado.

* **Escalabilidad (*Scalability*):** La plataforma debe dimensionarse para soportar una base de 15 millones de cuentas, operando con 2 millones de usuarios activos semanales y soportando dramáticos picos de tráfico ante eventos disruptivos masivos.

* **Interoperabilidad (*Interoperability*):** Es imperativa una integración fluida con intercambios de aerolíneas, hoteles y arrendadoras a través de APIs estándar. Adicionalmente, el sistema debe interoperar con proveedores de correo para el escaneo de mensajes y con redes sociales para compartir itinerarios.

* **Seguridad y Privacidad (*Security*):** El sistema procesa información personal. Debe garantizarse el acceso seguro y autorizado a los correos, y permitir el uso compartido de itinerarios asegurando que solo personas específicas designadas puedan visualizarlos.

* **Evolucionabilidad y Mantenibilidad (*Evolvability*):** La arquitectura debe prever la integración futura de otros medios de transporte (trenes, autobuses, etc.). Apoyándose en el uso de ADRs y contratos (*Spec-driven*), el diseño general y el prototipo final deben exhibir una alta trazabilidad y facilitar evaluaciones futuras.

* **Usabilidad (*Usability*) e Internacionalización:** Se requiere una interfaz rica (aprovechando capacidades nativas como GPS en móviles) y el sistema debe estar preparado arquitectónicamente para operar en el mercado internacional (multiregión).