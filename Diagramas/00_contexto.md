# Diagrama de contexto

Diagrama de contexto del sistema **Trotamundos**. Muestra el límite del sistema (la caja central)
y los actores o sistemas externos con los que interactúa. Se conserva además la versión gráfica
original en [`diagrama_de_contexto.png`](./diagrama_de_contexto.png).

> **Inferencia / decisión consciente.** La versión Mermaid siguiente se reconstruyó a partir de la
> descripción textual de [`../Analisis_y_pre-requisitos.md`](../Analisis_y_pre-requisitos.md) y del
> enunciado, dado que la imagen original no pudo ser leída automáticamente. No agrega actores ni
> interacciones nuevas respecto de lo ya documentado por el equipo.

```mermaid
flowchart TB
    viajero["Viajero<br/>(web y móvil)"]
    admin["Administrador /<br/>Equipo de datos"]
    correo["Proveedores de correo<br/>(Gmail, Outlook, ...)"]
    prov["Proveedores de viaje<br/>(aerolíneas, hoteles,<br/>arrendadoras, trenes, autobuses)"]
    agencia["Agencia de viajes<br/>preferida del usuario"]
    redes["Redes sociales<br/>(compartir itinerarios)"]

    subgraph SUT["Sistema Trotamundos"]
        core["Panel de gestión de viajes"]
    end

    viajero <--> core
    admin <--> core
    correo --> core
    core --> correo
    prov --> core
    core --> prov
    core <--> agencia
    core <--> redes
```

## Cómo leerlo

- El rectángulo **Sistema Trotamundos** marca el sistema que se diseña.
- El resto son actores o sistemas externos que quedan **fuera del límite**.
- Las flechas indican sentidos de interacción requeridos o necesarios según los casos descritos;
  no representan una API ya implementada.

## Referencias

- [`../Analisis_y_pre-requisitos.md`](../Analisis_y_pre-requisitos.md)
- [`../ADD_borrador_inicial.md`](../ADD_borrador_inicial.md)
