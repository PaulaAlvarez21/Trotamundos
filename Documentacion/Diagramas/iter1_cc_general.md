# Iteración 1 — Vista de componentes y conectores (general)

Vista de **componentes y conectores** (C&C) que muestra los elementos en tiempo de ejecución y sus
conectores en la estructura general del sistema, antes de refinar cada módulo. Corresponde a la
Iteración 1 del método ADD.

```mermaid
flowchart LR
    usuario(("Actor: Viajero"))
    admin(("Actor:<br/>Admin / Datos"))

    web["App Web"]
    movil["App Móvil"]
    borde["API de Borde<br/>(balanceador / proxy)"]

    ident["Servicio Identidad y Acceso"]
    reservas["Servicio Reservas y Viajes"]
    ingesta["Servicio Ingesta e Integraciones"]
    compartir["Servicio Compartición"]
    analitica["Servicio Analítica"]
    chatbot["Servicio Asistente Virtual"]

    cola["Cola / Bus de mensajes"]
    db[("BD transaccional")]
    cache[("Caché")]
    dw[("Almacén analítico")]

    prov["Proveedores de viaje<br/>(externos)"]
    correo["Proveedores de correo<br/>(externos)"]
    agencia["Agencia de viajes<br/>(externa)"]
    redes["Redes sociales<br/>(externas)"]

    usuario --> web
    usuario --> movil
    admin --> web
    web --> borde
    movil --> borde
    borde --> ident
    borde --> reservas
    borde --> compartir
    borde --> chatbot

    reservas <--> db
    reservas <--> cache
    ident <--> db
    compartir <--> db

    ingesta <--> cola
    ingesta --> prov
    correo --> ingesta
    cola --> reservas
    cola --> analitica
    analitica <--> dw
    analitica <--> db

    chatbot <--> reservas
    chatbot <--> agencia
    reservas <--> redes
```

## Leyenda

| Símbolo | Significado |
|---|---|
| `["Texto"]` **(rectángulo)** | Elemento con nombre: componente, módulo, servicio, cola o almacén según el límite que lo contiene |
| `[("Texto")]` **(cilindro)** | Almacén de datos o de estado: base de datos, caché, almacén analítico, sesión o registro de idempotencia |
| `(("Texto"))` **(círculo)** | Actor externo: persona o sistema situado fuera del límite del sistema |
| `subgraph` **(caja/límite)** | Límite arquitectónico: capa, módulo, región o nodo de despliegue |
| `-->` **(flecha simple)** | Flujo, llamada o publicación de mensaje en el sentido de la flecha |
| `<-->` **(flecha doble)** | Interacción bidireccional (por ejemplo, lectura y escritura sobre un almacén) |
| Flecha con texto sobre `-->` **(flecha etiquetada)** | Flujo con etiqueta: contenido, protocolo o condición del mensaje |

**Símbolos presentes en esta vista:** rectángulo, cilindro, círculo, `-->` y `<-->`.

## Catálogo de elementos

#### Actores
- **Viajero:** consulta y gestiona sus viajes desde web o móvil.
- **Admin / Datos:** administración y consumo de analítica.

#### Componentes de presentación
- **App Web**, **App Móvil:** clientes que consumen la API de borde.
- **API de Borde:** punto de entrada; balancea y enruta hacia los servicios internos.

#### Componentes de lógica
- **Servicio Identidad y Acceso**, **Servicio Reservas y Viajes**, **Servicio Ingesta e
  Integraciones**, **Servicio Compartición**, **Servicio Analítica** y **Servicio Asistente
  Virtual** (incorporado en la Iteración 5).

#### Conectores
- **Cola / Bus de mensajes:** conector asíncrono para desacoplar la ingesta de la persistencia.
- **Llamadas REST/HTTPS:** conector síncrono entre borde, servicios y clientes.
- **Conectores de datos:** acceso a BD transaccional, caché y almacén analítico.

#### Sistemas externos
- Proveedores de viaje, proveedores de correo, agencia de viajes y redes sociales.

## Decisiones relacionadas
- [MADR-0001 Estilo de arquitectura general](../MADR/MADR-0001-estilo-arquitectura-general.md)
- [MADR-0004 Procesamiento asíncrono con mensajería](../MADR/MADR-0004-procesamiento-asincrono-mensajeria.md)

## Vistas relacionadas
- [Iteración 1 — Vista de capas y módulos](./iter1_capas.md)
- [Iteración 1 — Vista de despliegue](./iter1_despliegue.md)
