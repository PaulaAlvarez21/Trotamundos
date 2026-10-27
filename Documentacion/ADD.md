# Proceso ADD — Sistema "Trotamundos" (borrador inicial)

> Documento de trabajo. Captura las iteraciones del método **ADD 3.0** (Attribute-Driven Design)
> aplicado al sistema Trotamundos, con sus artefactos intermedios. Los diagramas viven en la carpeta
> [`Diagramas/`](./Diagramas) y las decisiones de diseño en la carpeta [`MADR/`](./MADR).
>
> **Bibliografía de referencia del método:** H. Cervantes y R. Kazman, *Designing Software
> Architectures: A Practical Approach* (SEI Series in Software Engineering). Los pasos, la noción de
> *design concepts*, el *design roadmap*, el *architectural backlog* y el *design Kanban* siguen ese
> texto. Las decisiones se registran en formato **MADR** (con las alternativas consideradas).

---

## Índice

1. [Encuadre del método ADD 3.0](#1-encuadre-del-método-add-30)
2. [Paso 1 (transversal): Revisión de entradas](#2-paso-1-transversal-revisión-de-entradas)
3. [Hoja de ruta de diseño (design roadmap)](#3-hoja-de-ruta-de-diseño-design-roadmap)
4. [Iteración 1 — Estructura general del sistema](#4-iteración-1--estructura-general-del-sistema)
5. [Iteración 2 — Estructuras de soporte a la funcionalidad primaria: ingesta e integraciones](#5-iteración-2--estructuras-de-soporte-a-la-funcionalidad-primaria-ingesta-e-integraciones)
6. [Iteración 3 — Escenarios de rendimiento y usabilidad del acceso](#6-iteración-3--escenarios-de-rendimiento-y-usabilidad-del-acceso)
7. [Iteración 4 — Seguridad, compartición y analítica](#7-iteración-4--seguridad-compartición-y-analítica)
8. [Iteración 5 — Módulo avanzado: Asistente Virtual](#8-iteración-5--módulo-avanzado-asistente-virtual)
9. [Seguimiento del progreso: backlog y design Kanban](#9-seguimiento-del-progreso-backlog-y-design-kanban)
10. [Trazabilidad drivers → decisiones → vistas](#10-trazabilidad-drivers--decisiones--vistas)
11. [Riesgos, brechas y datos faltantes](#11-riesgos-brechas-y-datos-faltantes)

---

## 1. Encuadre del método ADD 3.0

ADD es un método iterativo y guiado por **drivers** que descompone y refina la arquitectura hasta
satisfacer los requisitos arquitectónicamente significativos. Cada iteración ejecuta **7 pasos**:

| Paso | Nombre |
|---|---|
| 1 | Revisar las entradas (*Review Inputs*) |
| 2 | Establecer el objetivo de la iteración seleccionando drivers (*Establish the Iteration Goal by Selecting Drivers*) |
| 3 | Elegir uno o más elementos del sistema a refinar (*Choose One or More Elements of the System to Refine*) |
| 4 | Elegir uno o más *design concepts* que satisfagan los drivers (*Choose One or More Design Concepts That Satisfy the Selected Drivers*) |
| 5 | Instanciar los elementos arquitectónicos, asignar responsabilidades y definir interfaces (*Instantiate Architectural Elements, Allocate Responsibilities, and Define Interfaces*) |
| 6 | Bocetar las vistas y registrar las decisiones de diseño (*Sketch Views and Record Design Decisions*) |
| 7 | Analizar el diseño actual y revisar el objetivo de la iteración y el logro del propósito de diseño (*Perform Analysis of Current Design and Review Iteration Goal and Achievement of Design Purpose*) |

### 1.1 Tipos de *design concepts* usados

Siguiendo el catálogo del libro (Apéndice A), clasificamos los conceptos empleados en:

- **Arquitecturas de referencia:** *Web Applications*, *Mobile Applications*.
- **Patrones arquitectónicos/estructurales:** Layers (capas), Client-Server (multitier), Ports &
  Adapters (Hexagonal), Adapter/Anticorruption Layer, Backend for Frontends (partición de interfaz),
  CQRS (variante ligera), Publish-Subscribe (mensajería), Orquestador de diálogo.
- **Patrones de despliegue:** Distributed Deployment, Load-Balanced Cluster.
- **Tácticas:** de rendimiento, disponibilidad, interoperabilidad, modificabilidad, seguridad y
  usabilidad (Apéndice A.4).
- **Componentes externos:** proveedores de viaje y de correo, agencia de viajes, proveedor de
  identidad, servicio de NLU.

### 1.2 Convenciones de nomenclatura

- **RF-xx:** requerimiento funcional ([`Requerimientos_funcionales.md`](./Requerimientos_funcionales.md)).
- **QA-xx:** escenario de atributo de calidad ([`Escenarios_de_atributos_de_calidad.md`](./Escenarios_de_atributos_de_calidad.md)).
- **MADR-xxxx:** registro de decisión de diseño ([`MADR/`](./MADR)).
- Todo supuesto que **no** proviene de la consigna se marca explícitamente como
  **“Inferencia/decision consciente”**, con su justificación y las alternativas evaluadas.

### 1.3 Propósito del diseño (design purpose)

Construir, desde cero, la próxima generación de un **panel de gestión de viajes** que sea el **único
punto de verdad** de las reservas del usuario, organizadas por viaje y accesibles desde web y móvil,
mitigando la frustración de rastrear múltiples aplicaciones. El diseño prioriza la **viabilidad de
implementación** por un equipo pequeño, sin perder la capacidad de **escalar** y **evolucionar**.

---

## 2. Paso 1 (transversal): Revisión de entradas

Antes de iterar se revisan y aceptan las entradas. Se listan los grupos de drivers.

### 2.1 Funcionalidad primaria (requisitos funcionales)

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | Agrupación y visualización de reservas por viaje | Alta |
| RF-02 | Gestión manual de reservas | Alta |
| RF-03 | Procesamiento de correo | Alta |
| RF-04 | Integración con terceros | Alta |
| RF-05 | Ciclo de vida del viaje | Alta |
| RF-06 | Módulo avanzado obligatorio (elegido: **Asistente Virtual / Chatbot**) | Alta |
| RF-07 | Filtros y whitelists de remitentes | Media |
| RF-08 | Resolución de problemas | Media |
| RF-09 | Analítica de datos | Media |
| RF-10 | Compartición controlada de itinerarios | Media |
| RF-11 | Gestión de usuarios y acceso | Media |

Fuente: [`Requerimientos_funcionales.md`](./Requerimientos_funcionales.md).

### 2.2 Atributos de calidad (escenarios)

| ID | Atributo | Escenario (resumen) |
|---|---|---|
| QA-01 | Performance | Consulta web ≤ 800 ms |
| QA-02 | Performance | FCP móvil < 1,4 s |
| QA-03 | Performance | Actualización externa presentada ≤ 5 min |
| QA-04 | Availability | ≤ 5 min de inactividad no planificada por mes |
| QA-05 | Modifiability | 15 M cuentas / 2 M usuarios activos semanales + picos |
| QA-06 | Interoperability | Integración con APIs estándar de terceros |
| QA-07 | Security | Solo designados ven un itinerario compartido |
| QA-08 | Security | Acceso seguro y autorizado al correo |
| QA-09 | Modifiability | Incorporar nuevos medios de transporte |
| QA-10 | Usability/i18n | Interfaz rica y preparación multiregión |

Fuente: [`Escenarios_de_atributos_de_calidad.md`](./Escenarios_de_atributos_de_calidad.md), con las
correcciones de atributos de [`Documentacion/correccionEscenariosTrotamundosV2.md`](./Documentacion/correccionEscenariosTrotamundosV2.md).
Los atributos usan los nombres bibliográficos del libro (QA-05 y QA-09 → *Modifiability*; QA-06 →
*Interoperability*). Priorización en [`Utility_tree.md`](./Utility_tree.md).

### 2.3 Restricciones (constraints)

- El sistema interactúa con **sistemas externos** (correo, aerolíneas, hoteles, arrendadoras,
  agencias, redes sociales) que quedan **fuera del límite** ([`Analisis_y_pre-requisitos.md`](./Analisis_y_pre-requisitos.md)).
- Escala global: 15 M cuentas, 2 M usuarios activos semanales, picos ante disrupciones.
- Disponibilidad de servicio global y continua.
- Es una *startup*: equipo y presupuesto acotados.

### 2.4 Preocupaciones arquitectónicas (architectural concerns)

- **Simplicidad operativa** y costo: mantener la carga operativa baja para un equipo pequeño.
- **Trazabilidad y *spec-driven*:** el diseño y el prototipo deben ser trazables (la consigna lo exige).
- **Seguridad y privacidad** por el tratamiento de datos personales.
- **Modificabilidad (evolucionabilidad):** preparar la incorporación de nuevos medios de transporte y módulos.

### 2.5 Documentación de contexto

- [Diagrama de contexto](./Diagramas/00_contexto.md) (límite del sistema y actores/sistemas externos).

### 2.6 Resultado del Paso 1

Las entradas se consideran **completas y aceptadas para iniciar la iteración 1**. Las entradas que
quedan incompletas (por ejemplo, métricas de concurrencia del pico, o el motor de NLU) se registran
como ítems del *backlog* (Sección 9) y se abordan en iteraciones posteriores o quedan como brechas.

---

## 3. Hoja de ruta de diseño (design roadmap)

Trotamundos es un **sistema greenfield de dominio maduro** (paneles de gestión de viajes son un
dominio conocido). El libro sugiere para este tipo de sistemas una hoja de ruta con:

1. **Iteración 1:** establecer la **estructura general** del sistema (arquitectura de referencia +
   patrón de despliegue).
2. **Iteración 2:** identificar las **estructuras de soporte a la funcionalidad primaria**.
3. **Iteraciones 3..n:** abordar los **escenarios de atributos de calidad** y las preocupaciones.

Adaptamos esa hoja de ruta a 5 iteraciones:

| Iteración | Foco | Drivers principales |
|---|---|---|
| 1 | Estructura general | QA-04, QA-05, QA-06, QA-09; RF-01, RF-03, RF-04 |
| 2 | Funcionalidad primaria: ingesta/integraciones | QA-03, QA-06, QA-04; RF-03, RF-04, RF-07 |
| 3 | Rendimiento y usabilidad del acceso | QA-01, QA-02, QA-05, QA-10; RF-01, RF-05, RF-10 |
| 4 | Seguridad, compartición y analítica | QA-07, QA-08, QA-04; RF-09, RF-10, RF-11 |
| 5 | Módulo avanzado (chatbot) | RF-06, RF-08; QA-06, QA-09, QA-10 |

---

## 4. Iteración 1 — Estructura general del sistema

### Paso 1 — Revisar entradas

Se consideran los drivers de la Sección 2 relevantes a la estructura general: propósito de diseño,
RF-01/RF-03/RF-04, QA-04, QA-05, QA-06, QA-09 y las restricciones/preocupaciones de la *startup*.

### Paso 2 — Establecer el objetivo de la iteración

Establecer la **estructura general** del sistema seleccionando la **arquitectura de referencia** y el
**patrón de despliegue**, que sienten las bases para la escalabilidad, la disponibilidad, la
interoperabilidad y la evolucionabilidad.

### Paso 3 — Elegir los elementos a refinar

Al tratarse de un sistema *greenfield*, el elemento a refinar es el **sistema completo**.

### Paso 4 — Elegir los *design concepts*

| Tipo | Concepto | Por qué |
|---|---|---|
| Arquitectura de referencia | *Web Applications* (+ *Mobile Applications* para el cliente) | blueprint probado: presentación / negocio / datos + concerns transversales |
| Patrón | **Client-Server multitier** + **Layers** | separación de tiers y modularidad interna |
| Patrón de despliegue | **Distributed Deployment** + **Load-Balanced Cluster** | escalado horizontal y tolerancia a fallos |
| Tácticas | modularidad (alta cohesión/bajo acoplamiento); evitar punto único de fallo; evitar límites fijos; limitar puntos de acceso | rendimiento, disponibilidad, seguridad |

Alternativas evaluadas en [MADR-0001](./MADR/MADR-0001-estilo-arquitectura-general.md): capas
monolíticas, service-based, microservicios y cliente-servidor de 2 capas.

### Paso 5 — Instanciar elementos, asignar responsabilidades y definir interfaces

Se instancian los **tiers** (presentación, aplicación, datos) y, dentro del tier de aplicación, los
**módulos de dominio** sobre **capas internas** ([MADR-0002](./MADR/MADR-0002-descomposicion-modulos-dominio.md)):
Identidad y Acceso, Reservas y Viajes (núcleo), Ingesta e Integraciones, Compartición, Analítica y
Asistente Virtual (este último en la Iteración 5).

**Interfaces (nivel general):**
- *Externa (cliente–sistema):* API de borde REST/JSON sobre HTTPS.
- *Interna (entre módulos):* interfaces de servicio; el detalle se difiere a iteraciones siguientes.
- *Con datos:* repositorios/DAO; no se comparte el esquema entre módulos arbitrariamente.

### Paso 6 — Bocetar las vistas

**Vistas bocetadas:**
- [Vista de capas y módulos](./Diagramas/iter1_capas.md)
- [Vista de componentes y conectores general](./Diagramas/iter1_cc_general.md)
- [Vista de despliegue](./Diagramas/iter1_despliegue.md)

### Decisiones de diseño

| MADR | Decisión | Drivers cubiertos |
|---|---|---|
| [MADR-0001](./MADR/MADR-0001-estilo-arquitectura-general.md) | Estilo de arquitectura general | QA-04, QA-05, QA-06, QA-09 |
| [MADR-0002](./MADR/MADR-0002-descomposicion-modulos-dominio.md) | Descomposición en módulos de dominio | RF-01, RF-03, RF-04 |

### Paso 7 — Analizar el diseño y revisar el objetivo

- **Satisfacción de drivers:** estructura general definida; QA-04/QA-05 (parcial) atendidos con
  clúster balanceado; QA-06/QA-09 (parcial) preparados mediante módulos y futuros adaptadores.
- **Riesgos/gaps detectados:** el tier de aplicación es un despliegue grande (posible cuello de
  botella); falta estrategia concreta de cacheo, ingesta asíncrona, seguridad y analítica.
- **Nuevos ítems para el backlog:** estrategia de caché/CDN; mensajería asíncrona; autenticación;
  aislamiento analítico; adaptadores de proveedores.
- **Conclusión:** objetivo cumplido; se continúa iterando.

---

## 5. Iteración 2 — Estructuras de soporte a la funcionalidad primaria: ingesta e integraciones

### Paso 1 — Revisar entradas

Drivers: RF-03 (correo), RF-04 (terceros), RF-07 (whitelists); QA-03 (≤ 5 min), QA-06
(interoperabilidad), QA-04 (ante fallos de proveedores) y la salida de la Iteración 1.

### Paso 2 — Establecer el objetivo de la iteración

Refinar el módulo de **Ingesta e Integraciones** para obtener correos y actualizaciones de
proveedores de forma confiable, dentro de la ventana de 5 minutos y con tolerancia a fallos externos.

### Paso 3 — Elegir los elementos a refinar

El **Módulo Ingesta e Integraciones** (definido en la Iteración 1).

### Paso 4 — Elegir los *design concepts*

| Tipo | Concepto | Por qué |
|---|---|---|
| Patrón | **Ports & Adapters (Hexagonal)** + **Adapter/ACL** | aislar el núcleo de los contratos externos |
| Patrón de concurrencia | **Publish-Subscribe** con cola/bus (Half-Sync/Half-Async) | desacoplar y absorber picos |
| Tácticas | interoperabilidad (orquestar/tailor); disponibilidad (*ping/echo*, *circuit breaker*, redundancia); rendimiento (cola de eventos, concurrencia); modificabilidad (encapsular) | QA-03, QA-06, QA-04 |

Alternativas: [MADR-0003](./MADR/MADR-0003-enfoque-integracion-externa.md),
[MADR-0004](./MADR/MADR-0004-procesamiento-asincrono-mensajeria.md),
[MADR-0005](./MADR/MADR-0005-patron-adaptador-acl.md),
[MADR-0006](./MADR/MADR-0006-acceso-seguro-correo.md).

### Paso 5 — Instanciar elementos, asignar responsabilidades y definir interfaces

Elementos: Receptor de Webhooks, Planificador de Polling, Conector de Correo, Adaptadores por
proveedor, Normalizador, Filtro/Whitelist, Worker de Ingesta, Cola/Bus, Registro de idempotencia y
DLQ (ver [vista C&C de ingesta](./Diagramas/iter2_cc_ingesta.md)).

**Interfaces:**
- *Puerto de dominio:* `IngestaReserva` (contrato interno que los adaptadores implementan).
- *Contrato de evento:* evento `ReservaActualizada` publicado en la cola (payload normalizado).
- *Externa:* webhook entrante y APIs de proveedores (traducidas por adaptadores).

### Paso 6 — Bocetar las vistas

**Vistas bocetadas:**
- [Vista de componentes y conectores de ingesta](./Diagramas/iter2_cc_ingesta.md)
- [Secuencia: actualización externa ≤ 5 min](./Diagramas/iter2_secuencia_actualizacion.md)

### Decisiones de diseño

| MADR | Decisión | Drivers cubiertos |
|---|---|---|
| [MADR-0003](./MADR/MADR-0003-enfoque-integracion-externa.md) | Enfoque de integración externa | RF-03, RF-04, RF-07 |
| [MADR-0004](./MADR/MADR-0004-procesamiento-asincrono-mensajeria.md) | Procesamiento asíncrono con mensajería | QA-03, QA-04 |
| [MADR-0005](./MADR/MADR-0005-patron-adaptador-acl.md) | Patrón adaptador / capa anticorrupción | QA-06 |
| [MADR-0006](./MADR/MADR-0006-acceso-seguro-correo.md) | Acceso seguro al correo | QA-08 |

### Paso 7 — Analizar el diseño y revisar el objetivo

- **Satisfacción de drivers:** QA-03 cubierto por el pipeline asíncrono con ventana de 5 min;
  QA-06 por adaptadores/ACL; QA-04 por reintentos, DLQ y desacoplamiento.
- **Riesgos/gaps:** consistencia eventual; cuotas y límites de rate de proveedores; monitoreo del
  *lag* de la cola.
- **Nuevos ítems:** definir periodos de polling y política de reintentos; observabilidad del pipeline.
- **Conclusión:** objetivo cumplido; se continúa iterando.

---

## 6. Iteración 3 — Escenarios de rendimiento y usabilidad del acceso

### Paso 1 — Revisar entradas

Drivers: QA-01 (web 800 ms), QA-02 (FCP móvil 1,4 s), QA-10 (usabilidad/i18n), QA-05 (carga de
lectura); RF-01 (visualización), RF-05 (ciclo de vida), RF-10 (compartición en la vista).

### Paso 2 — Establecer el objetivo de la iteración

Refinar el **camino de acceso del usuario** para satisfacer los objetivos de rendimiento web/móvil y
la preparación internacional, y descargar la base de datos en las lecturas.

### Paso 3 — Elegir los elementos a refinar

El **Tier de Presentación** y el **camino de lectura** del Módulo Reservas y Viajes.

### Paso 4 — Elegir los *design concepts*

| Tipo | Concepto | Por qué |
|---|---|---|
| Partición de interfaz | **Backend for Frontends (API por cliente)** | contratos óptimos por cliente |
| Patrón | **Cache-Aside** + **Modelo de lectura** (CQRS ligero) | reducir latencia y carga de lectura |
| Patrón de despliegue | **Load-Balanced Cluster** + **CDN** | arranque rápido y escalado |
| Tácticas | rendimiento (cachear, reducir overhead, introducir concurrencia); usabilidad (modelo de tarea/usuario, localización) | QA-01, QA-02, QA-05, QA-10 |

Alternativas: [MADR-0007](./MADR/MADR-0007-arquitectura-presentacion.md),
[MADR-0008](./MADR/MADR-0008-estrategia-cache-cdn.md),
[MADR-0009](./MADR/MADR-0009-read-model-replicas.md),
[MADR-0010](./MADR/MADR-0010-internacionalizacion-multiregion.md).

### Paso 5 — Instanciar elementos, asignar responsabilidades y definir interfaces

Elementos: API para Web, API para Móvil, Servicio de Consulta de Itinerarios, Caché de consultas,
Modelo de lectura desnormalizado, Réplica de lectura y CDN (ver
[vista C&C de acceso](./Diagramas/iter3_cc_acceso.md)).

**Interfaces:**
- *API Web:* `GET /viajes`, `GET /viajes/{id}` (payload orientado a web).
- *API Móvil:* `GET /trips` con payload reducido y campos de localización.
- *Contrato de datos:* modelo de lectura "reservas agrupadas por viaje".

### Paso 6 — Bocetar las vistas

**Vistas bocetadas:**
- [Vista de componentes y conectores de acceso](./Diagramas/iter3_cc_acceso.md)
- [Secuencia: consulta web ≤ 800 ms](./Diagramas/iter3_secuencia_consulta_web.md)

### Decisiones de diseño

| MADR | Decisión | Drivers cubiertos |
|---|---|---|
| [MADR-0007](./MADR/MADR-0007-arquitectura-presentacion.md) | Arquitectura de presentación con API dedicada por tipo de cliente | QA-01, QA-02 |
| [MADR-0008](./MADR/MADR-0008-estrategia-cache-cdn.md) | Estrategia de caché y CDN | QA-01, QA-02, QA-05 |
| [MADR-0009](./MADR/MADR-0009-read-model-replicas.md) | Modelo de lectura y réplicas | QA-01, QA-05 |
| [MADR-0010](./MADR/MADR-0010-internacionalizacion-multiregion.md) | Internacionalización y despliegue multiregión | QA-10 |

### Paso 7 — Analizar el diseño y revisar el objetivo

- **Satisfacción de drivers:** QA-01 vía caché + modelo de lectura + réplica; QA-02 vía CDN y
  payload reducido; QA-10 vía i18n en presentación + multiregión; QA-05 por escalado de lectura.
- **Riesgos/gaps:** consistencia eventual (TTL/invalidación); costo operativo multiregión; la
  consigna no define si los 800 ms son máximo/promedio/percentil.
- **Nuevos ítems:** política de invalidación de caché; métricas de rendimiento reales.
- **Conclusión:** objetivo cumplido; se continúa iterando.

---

## 7. Iteración 4 — Seguridad, compartición y analítica

### Paso 1 — Revisar entradas

Drivers: QA-07 (itinerarios compartidos), QA-08 (correo), QA-04 (disponibilidad de seguridad);
RF-09 (analítica), RF-10 (compartición), RF-11 (acceso).

### Paso 2 — Establecer el objetivo de la iteración

Refinar los módulos de **Identidad y Acceso**, **Compartición** y **Analítica**, garantizando acceso
autorizado, protección de datos sensibles y aislamiento de las consultas pesadas.

### Paso 3 — Elegir los elementos a refinar

Los módulos **Identidad y Acceso**, **Compartición** y **Analítica**.

### Paso 4 — Elegir los *design concepts*

| Tipo | Concepto | Por qué |
|---|---|---|
| Patrón | **Autenticación delegada (OAuth2/OIDC)** + **autorización centralizada (RBAC + reglas)** | QA-07, QA-08 |
| Patrón | **CDC/ETL hacia almacén analítico** | aislar consultas pesadas (RF-09) |
| Tácticas | seguridad (autenticar/autorizar, cifrar, limitar exposición y accesos, auditar); rendimiento (aislar recursos); disponibilidad (redundar el componente de autorización) | QA-07, QA-08, QA-04, RF-09 |

Alternativas: [MADR-0011](./MADR/MADR-0011-autenticacion-autorizacion.md),
[MADR-0012](./MADR/MADR-0012-aislamiento-analitica.md),
[MADR-0013](./MADR/MADR-0013-cifrado-gestion-secretos.md).

### Paso 5 — Instanciar elementos, asignar responsabilidades y definir interfaces

Elementos: Autenticación, Autorización, Gestor de secretos, Captura de eventos, CDC/ETL, Almacén
analítico (ver [vista de seguridad y analítica](./Diagramas/iter4_cc_seguridad_analitica.md)).

**Interfaces:**
- *Autenticación:* flujo OAuth2/OIDC (tokens de acceso/refresco).
- *Autorización:* consulta `puedeVer(usuario, itinerario)`.
- *Analítica:* contrato de evento de dominio y esquema de carga al almacén.

### Paso 6 — Bocetar las vistas

**Vistas bocetadas:**
- [Vista de componentes y conectores de seguridad y analítica](./Diagramas/iter4_cc_seguridad_analitica.md)
- [Secuencia: acceso a itinerario compartido](./Diagramas/iter4_secuencia_itinerario_compartido.md)

### Decisiones de diseño

| MADR | Decisión | Drivers cubiertos |
|---|---|---|
| [MADR-0011](./MADR/MADR-0011-autenticacion-autorizacion.md) | Autenticación delegada y autorización centralizada | QA-07, QA-08, RF-11 |
| [MADR-0012](./MADR/MADR-0012-aislamiento-analitica.md) | Aislamiento de la analítica | RF-09 |
| [MADR-0013](./MADR/MADR-0013-cifrado-gestion-secretos.md) | Cifrado de datos y gestión centralizada de secretos | QA-08 |

### Paso 7 — Analizar el diseño y revisar el objetivo

- **Satisfacción de drivers:** QA-07 por autorización centralizada y reglas de compartición; QA-08
  por OAuth2 + cifrado + mínimo privilegio; RF-09 por aislamiento analítico.
- **Riesgos/gaps:** el componente de autorización es crítico (debe redundarse — QA-04); tratamiento
  de PII; frescura de los datos analíticos.
- **Nuevos ítems:** definir auditoría y compliance; métricas de la frescura analítica.
- **Conclusión:** objetivo cumplido; se continúa a la iteración del módulo avanzado.

---

## 8. Iteración 5 — Módulo avanzado: Asistente Virtual

### Paso 1 — Revisar entradas

Drivers: RF-06 (chatbot), RF-08 (resolución de problemas/handoff); QA-10 (usabilidad), QA-06
(interoperabilidad con la agencia), QA-09 (evolucionabilidad).

### Paso 2 — Establecer el objetivo de la iteración

Incorporar el **Asistente Virtual** como primer nivel de soporte que resuelve consultas y problemas
menores y delega los casos complejos a la agencia de viajes preferida.

### Paso 3 — Elegir los elementos a refinar

El **Módulo Asistente Virtual** (nuevo, definido como extensión del tier de aplicación).

### Paso 4 — Elegir los *design concepts*

| Tipo | Concepto | Por qué |
|---|---|---|
| Arquitectura de referencia | Asistente conversacional (canal + NLU + diálogo + acciones) | estructura probada de bots |
| Patrón | **Orquestador de diálogo** + adaptador de integración con la agencia | RF-06, RF-08 |
| Tácticas | usabilidad (modelo de tarea/usuario, ayuda); interoperabilidad; modificabilidad; seguridad (limitar acceso) | QA-10, QA-06, QA-09 |

Alternativas: [MADR-0014](./MADR/MADR-0014-arquitectura-asistente-virtual.md),
[MADR-0015](./MADR/MADR-0015-integracion-chatbot-handoff.md),
[MADR-0016](./MADR/MADR-0016-build-vs-buy-nlu.md).

### Paso 5 — Instanciar elementos, asignar responsabilidades y definir interfaces

Elementos: Pasarela de Conversación, Motor NLU, Gestor de Diálogo, Almacén de sesión, Ejecutor de
Acciones y adaptador de handoff (ver [vista C&C del chatbot](./Diagramas/iter5_cc_chatbot.md)).

**Interfaces:**
- *Contrato de mensajes:* entrada normalizada (texto/intención) y salida (respuesta/acción).
- *Intenciones/acciones:* `consultar_estado`, `solicitar_reprogramacion`, `escalar_a_agencia`.
- *Handoff:* transferencia de contexto a la agencia (externa).

### Paso 6 — Bocetar las vistas

**Vistas bocetadas:**
- [Vista de componentes y conectores del chatbot](./Diagramas/iter5_cc_chatbot.md)
- [Secuencia: conversación y handoff](./Diagramas/iter5_secuencia_handoff.md)

### Decisiones de diseño

| MADR | Decisión | Drivers cubiertos |
|---|---|---|
| [MADR-0014](./MADR/MADR-0014-arquitectura-asistente-virtual.md) | Arquitectura del asistente virtual | RF-06, RF-08 |
| [MADR-0015](./MADR/MADR-0015-integracion-chatbot-handoff.md) | Integración del chatbot y handoff | RF-06, RF-08 |
| [MADR-0016](./MADR/MADR-0016-build-vs-buy-nlu.md) | Build vs. buy del motor NLU | RF-06, QA-09 |

### Paso 7 — Analizar el diseño y revisar el objetivo

- **Satisfacción de drivers:** RF-06 y RF-08 cubiertos por el orquestador con acciones y *handoff*;
  QA-10 por la interfaz conversacional; QA-09 por el desacoplamiento del motor NLU.
- **Riesgos/gaps:** precisión del NLU; calidad del escalamiento; privacidad de los datos enviados al
  proveedor de NLU; falta definir el contrato concreto con la agencia.
- **Nuevos ítems:** evaluación de precisión; contrato con la agencia; política de datos del NLU.
- **Conclusión:** objetivo cumplido. El diseño cumple los 5 objetivos iterativos; restan refinamientos
  de detalle y la implementación del prototipo.

---

## 9. Seguimiento del progreso: backlog y design Kanban

### 9.1 *Architectural backlog* (estado de los drivers)

| Driver | Descripción | Estado | Iteración |
|---|---|---|---|
| RF-01 | Visualización por viaje | Atendido | 1, 3 |
| RF-02 | Gestión manual de reservas | Parcial (diseño de dominio) | 1 |
| RF-03 | Procesamiento de correo | Atendido | 2 |
| RF-04 | Integración con terceros | Atendido | 2 |
| RF-05 | Ciclo de vida del viaje | Parcial | 3 |
| RF-06 | Módulo avanzado (chatbot) | Atendido | 5 |
| RF-07 | Filtros y whitelists | Atendido | 2 |
| RF-08 | Resolución de problemas | Atendido | 5 |
| RF-09 | Analítica de datos | Atendido | 4 |
| RF-10 | Compartición de itinerarios | Atendido | 4 |
| RF-11 | Gestión de usuarios y acceso | Atendido | 4 |
| QA-01 | Performance web | Atendido | 3 |
| QA-02 | Performance móvil | Atendido | 3 |
| QA-03 | Frescura ≤ 5 min | Atendido | 2 |
| QA-04 | Availability | Parcial | 1, 4 |
| QA-05 | Modifiability (capacidad) | Parcial | 1, 3 |
| QA-06 | Interoperability | Atendido | 1, 2 |
| QA-07 | Security de compartición | Atendido | 4 |
| QA-08 | Security del correo | Atendido | 2, 4 |
| QA-09 | Modifiability | Parcial | 1, 5 |
| QA-10 | Usability/i18n | Atendido | 3, 5 |

### 9.2 *Design Kanban board*

| Pendiente | En progreso | Completo |
|---|---|---|
| Métricas reales de concurrencia del pico | Contrato con la agencia de viajes | Estructura general (Iter. 1) |
| Política de invalidación de caché | Observabilidad del pipeline de ingesta | Ingesta e integraciones (Iter. 2) |
| Compliance/auditoría de PII | Evaluación de precisión del NLU | Acceso web/móvil (Iter. 3) |
| Elección definitiva de proveedor de nube | — | Seguridad y analítica (Iter. 4) |
| — | — | Asistente virtual (Iter. 5) |

---

## 10. Trazabilidad drivers → decisiones → vistas

| Driver | Decisión (MADR) | Vista |
|---|---|---|
| QA-04, QA-05, QA-06, QA-09 | MADR-0001, MADR-0002 | iter1_capas, iter1_cc_general, iter1_despliegue |
| QA-03, QA-06, QA-04 (RF-03/04/07) | MADR-0003, MADR-0004, MADR-0005, MADR-0006 | iter2_cc_ingesta, iter2_secuencia_actualizacion |
| QA-01, QA-02, QA-05, QA-10 | MADR-0007, MADR-0008, MADR-0009, MADR-0010 | iter3_cc_acceso, iter3_secuencia_consulta_web |
| QA-07, QA-08, RF-09 | MADR-0011, MADR-0012, MADR-0013 | iter4_cc_seguridad_analitica, iter4_secuencia_itinerario_compartido |
| RF-06, RF-08, QA-10, QA-09 | MADR-0014, MADR-0015, MADR-0016 | iter5_cc_chatbot, iter5_secuencia_handoff |

---

## 11. Riesgos, brechas y datos faltantes

1. **Métricas de carga no especificadas (QA-05):** la consigna da cuentas y usuarios activos, no
   solicitudes por segundo ni distribución de operaciones. Sin ello no puede validarse el pico.
   *Estado: brecha de información.*
2. **Rendimiento (QA-01):** no se aclara si 800 ms es máximo, promedio o percentil, ni las
   condiciones de red. *Estado: brecha de información; supuesto conservador.*
3. **Disponibilidad (QA-04):** no se define cómo se contabilizan interrupciones parciales ni globales
   por región. *Estado: brecha de información.*
4. **Interoperabilidad (QA-06):** no hay métrica cuantitativa; se proponen pruebas de contrato.
   *Estado: inferencia de diseño.*
5. **Proveedor de nube / tecnologías concretas:** no especificados; quedan como decisión abierta del
   *backlog* (no afectan la estructura, pero sí el despliegue final).
6. **Motor de NLU y contrato con la agencia:** sin especificar; decisión abierta (MADR-0016).
7. **Imagen del diagrama de contexto:** no pudo leerse automáticamente; se reconstruyó una versión
   Mermaid a partir de la descripción textual (ver [`Diagramas/00_contexto.md`](./Diagramas/00_contexto.md)).

---

## Apéndice — Correspondencia con la bibliografía

- **Método ADD 3.0 (7 pasos):** Cervantes & Kazman, *Designing Software Architectures*, cap. 3.
- **Drivers, design concepts, decisiones:** cap. 2.
- **Hoja de ruta para greenfield de dominio maduro:** cap. 3.3.1.
- **Catálogo de design concepts (referencia, patrones, despliegue, tácticas, componentes externos):** Apéndice A.
- **Cuestionarios basados en tácticas:** Apéndice B.
