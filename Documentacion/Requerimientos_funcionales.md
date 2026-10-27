# Requerimientos Funcionales — Sistema "Trotamundos"

Los requerimientos se priorizan según su importancia para el objetivo central del sistema: ser el **único punto de verdad** de todas las reservas de viaje del usuario, organizadas por viaje, accesibles desde web y móvil.

Escala de prioridad:
- **Alta (imprescindible):** sin este requerimiento el sistema no cumple su propósito.
- **Media (importante):** aporta valor significativo y completa la experiencia.
- **Baja (deseable):** complementa, puede diferirse sin romper el núcleo.

---

## RF-01 — Agrupación y visualización de reservas por viaje
**Prioridad: Alta**
El panel (web y móvil) debe mostrar todas las reservas existentes del usuario (hoteles, autos, vuelos, trenes, autobuses) organizadas y agrupadas por viaje, ofreciendo una interfaz simple centrada en el viaje.

## RF-02 — Gestión manual de reservas
**Prioridad: Alta**
El cliente debe poder agregar, actualizar y eliminar sus reservas existentes de forma manual dentro del panel.

## RF-03 — Procesamiento de correo
**Prioridad: Alta**
El sistema debe sondear y escanear el correo electrónico de los usuarios en busca de correos relacionados con viajes para agregar automáticamente las reservas al itinerario.

## RF-04 — Integración con terceros
**Prioridad: Alta**
El sistema debe integrarse de forma fluida con sistemas de viajes e interfaces de agencias de terceros mediante APIs estándar (por ejemplo, intercambios de aerolíneas o rentadoras) para obtener detalles de reservas, actualizaciones y cancelaciones.

## RF-05 — Ciclo de vida del viaje (archivado/eliminación automática)
**Prioridad: Alta**
Una vez que un viaje se completa, sus elementos deben archivarse o eliminarse automáticamente de la vista principal del panel de control.

## RF-06 — Módulo avanzado (selección obligatoria)
**Prioridad: Alta**
El diseño debe incorporar al menos uno de los módulos avanzados obligatorios:
- **Opción A — Sistema de Recomendación:** sugerir proactivamente alternativas de alojamiento, transporte o rutas a partir del historial y preferencias del usuario, con un esquema *human-in-the-loop* (aceptar/ajustar parámetros) para refinar el modelo.
- **Opción B — Asistente Virtual (Chatbot):** bot conversacional como primer nivel de soporte para reprogramaciones, consultas de estado y problemas menores, delegando a la agencia de viajes los casos complejos.

## RF-07 — Filtros y whitelists de remitentes
**Prioridad: Media**
El sistema debe permitir filtrar y crear listas de remitentes seguros (*whitelists*) para ciertos correos electrónicos de viaje.

## RF-08 — Resolución de problemas
**Prioridad: Media**
El sistema debe integrarse con la agencia de viajes preferida del usuario para facilitar una rápida resolución de problemas.

## RF-09 — Analítica de datos
**Prioridad: Media**
El sistema debe recopilar datos analíticos de los viajes (tendencias, destinos, cancelaciones) para su monetización por parte del equipo de datos, lo que implica la ejecución de consultas analíticas pesadas.

## RF-10 — Compartición controlada de itinerarios
**Prioridad: Media**
El sistema debe permitir el uso compartido de itinerarios, asegurando que solo las personas específicamente designadas puedan visualizarlos.

## RF-11 — Gestión de usuarios y acceso a la información
**Prioridad: Media**
El sistema debe garantizar el acceso seguro y autorizado a las cuentas, a los correos y a la información personal de cada usuario.

---

## Resumen de priorización

| ID     | Requerimiento                                   | Prioridad |
|--------|--------------------------------------------------|-----------|
| RF-01  | Agrupación y visualización de reservas por viaje | Alta      |
| RF-02  | Gestión manual de reservas                       | Alta      |
| RF-03  | Procesamiento de correo                          | Alta      |
| RF-04  | Integración con terceros                         | Alta      |
| RF-05  | Ciclo de vida del viaje                          | Alta      |
| RF-06  | Módulo avanzado (obligatorio)                    | Alta      |
| RF-07  | Filtros y whitelists                             | Media     |
| RF-08  | Resolución de problemas                          | Media     |
| RF-09  | Analítica de datos                               | Media     |
| RF-10  | Compartición controlada de itinerarios           | Media     |
| RF-11  | Gestión de usuarios y acceso                     | Media     |
