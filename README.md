# Trotamundos

**Trabajo Práctico Especial - Diseño de Sistemas de Software | UNICEN**

## ¿Qué es Trotamundos?

**Trotamundos** es un panel de gestión de viajes unificado que centraliza todas las reservas del usuario (vuelos, hoteles, autos, trenes y autobuses) organizadas por viaje. Su objetivo es ser el **único punto de verdad**, evitando la frustración de rastrear múltiples aplicaciones y correos.

## Diseño y Documentación

Aplicamos el método **ADD 3.0** (*Attribute-Driven Design*), guiados por atributos de calidad y requerimientos funcionales. 

- **5 iteraciones** para refinar la arquitectura paso a paso
- **[ADRs/MADRs](Documentacion/MADR/)** para registrar cada decisión de diseño con sus alternativas
- **[Vistas arquitectónicas](Documentacion/Diagramas/)** (módulos, componentes-conectores, despliegue y secuencia)
- **[Proceso ADD](Documentacion/ADD.md)** documentado con trazabilidad completa entre drivers, decisiones y vistas
- **Módulo avanzado:** Elegimos la **Opción B - Asistente Virtual (Chatbot)** para soporte interactivo con *handoff* a la agencia de viajes cuando el caso lo requiere

## Prototipo

Implementamos un prototipo que demuestra la viabilidad de la arquitectura propuesta, con sistemas externos simulados mediante *mocks*.

- **Stack:** `Node.js + TypeScript + Express` (API) | `Next.js 14 + TailwindCSS` (Web)
- **Arquitectura:** Cliente-Servidor (*multitier*) con enfoque en **capas**, **Ports & Adapters (Hexagonal)**, **CQRS ligero**, **Publish-Subscribe** y **Backend for Frontends (BFF)**. Se aplicaron tácticas de rendimiento, disponibilidad, seguridad, interoperabilidad, modificabilidad y usabilidad.
- **Módulos:** Identidad/Acceso, Viajes/Reservas, Ingesta, Compartición, Analítica y Asistente Virtual
- **Simulación:** Correos, proveedores, agencia, NLU y autenticación son *mocks* (sin APIs reales)

**Para ejecutar el prototipo:** Ver [prototipo/README.md](prototipo/README.md)

## Estructura del Repositorio

```
├── Documentacion/   # Análisis, ADD, MADRs, diagramas y decisiones
└── prototipo/       # Implementación demostrativa
```
