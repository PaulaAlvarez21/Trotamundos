# Iteración 1 — Vista de despliegue

Vista de **asignación** (allocation / deployment view). Muestra cómo los elementos lógicos se mapean
sobre nodos físicos siguiendo el patrón de despliegue **Distributed Deployment** con
**Load-Balanced Cluster** (Cervantes & Kazman, Apéndice A.2).

```mermaid
flowchart TB
    subgraph Cliente["Dispositivos del usuario"]
        nav["Navegador web"]
        tel["Dispositivo móvil"]
    end

    subgraph CDN["Red de distribución de contenido (estático)"]
        estaticos["Assets web y móviles"]
    end

    subgraph Region["Región de despliegue (nube)"]
        subgraph LB["Balanceador de carga"]
            balancer["Balanceador / proxy inverso"]
        end
        subgraph AppNodes["Clúster de servidores de aplicación (N instancias)"]
            app1["Instancia de aplicación 1"]
            app2["Instancia de aplicación 2"]
            appN["... instancia N"]
        end
        subgraph Workers["Clúster de trabajadores de ingesta"]
            w1["Worker de ingesta 1"]
            w2["Worker de ingesta 2"]
        end
        subgraph Datos["Capa de datos"]
            dbPrimary[("BD transaccional<br/>(primaria)")]
            dbReplica[("BD transaccional<br/>(réplica lectura)")]
            cacheNode[("Nodo de caché")]
            analyticStore[("Almacén analítico")]
        end
        broker["Broker de mensajes"]
    end

    nav --> estaticos
    tel --> estaticos
    nav --> balancer
    tel --> balancer
    balancer --> app1
    balancer --> app2
    balancer --> appN
    app1 <--> dbPrimary
    app2 <--> cacheNode
    appN <--> dbReplica
    app1 --> broker
    broker --> w1
    broker --> w2
    w1 <--> dbPrimary
    w2 <--> dbPrimary
    appN --> analyticStore
```

## Catálogo de elementos

#### Balanceador de carga
- Distribuye solicitudes entre las instancias de aplicación; primera línea de disponibilidad y escalado horizontal.

#### Clúster de servidores de aplicación
- Varias instancias sin estado que ejecutan la lógica de negocio. Permiten escalar horizontalmente y tolerar la caída de una instancia.

#### Clúster de trabajadores de ingesta
- Consumen mensajes del broker y procesan actualizaciones de correo y proveedores.

#### Capa de datos
- **BD transaccional (primaria + réplica de lectura):** persistencia del núcleo y descarga de lecturas.
- **Nodo de caché:** acelera consultas repetidas.
- **Almacén analítico:** aísla las consultas analíticas pesadas.

#### Broker de mensajes
- Desacopla productores (ingesta) de consumidores (reservas, analítica).

#### Red de distribución de contenido
- Sirve los recursos estáticos de web y móvil para mejorar el arranque (FCP).

> **Inferencia / decisión consciente.** El número de instancias y la tecnología concreta de cada nodo
> no están especificados en la consigna; se representan de forma genérica. La elección de un
> proveedor de nube y de servicios gestionados se deja como decisión abierta (ver backlog).

## Decisiones relacionadas
- [MADR-0001 Estilo de arquitectura general](../MADR/MADR-0001-estilo-arquitectura-general.md)
- [MADR-0008 Estrategia de caché y CDN](../MADR/MADR-0008-estrategia-cache-cdn.md)

## Vistas relacionadas
- [Iteración 1 — Vista de capas y módulos](./iter1_capas.md)
- [Iteración 1 — Vista de componentes y conectores general](./iter1_cc_general.md)
