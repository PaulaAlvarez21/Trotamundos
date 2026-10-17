# Iteración 4 — Secuencia: acceso a un itinerario compartido

Diagrama de secuencia para el escenario **QA-07**: solo las personas específicamente designadas
pueden visualizar un itinerario.

```mermaid
sequenceDiagram
    autonumber
    participant U as Solicitante (autenticado)
    participant API as API de Borde
    participant AUTHN as Autenticación
    participant AUTHZ as Autorización
    participant C as Servicio Compartición
    participant R as Servicio Reservas y Viajes
    participant DB as BD transaccional

    U->>API: GET /itinerarios/{id}
    API->>AUTHN: Verifica token de sesión
    AUTHN-->>API: Identidad confirmada
    API->>AUTHZ: ¿Puede {usuario} ver {itinerario}?
    AUTHZ->>C: Consulta reglas de compartición del itinerario
    C->>DB: Lee designados y permisos
    DB-->>C: Lista de autorizados
    alt Autorizado
        C-->>AUTHZ: Permiso concedido
        AUTHZ->>R: Solicita contenido del itinerario
        R->>DB: Recupera el itinerario
        DB-->>R: Datos del itinerario
        R-->>API: Itinerario
        API-->>U: 200 OK con itinerario
    else No autorizado
        C-->>AUTHZ: Sin permiso
        AUTHZ-->>API: Acceso denegado
        API-->>U: 403 Forbidden
    end
```

## Notas

- La autorización se resuelve de forma centralizada y auditable.
- El acceso denegado debe registrarse en una traza de auditoría.
- El compartir itinerarios no debe exponer datos de correo ni credenciales.

## Decisiones relacionadas
- [MADR-0011 Autenticación y autorización](../MADR/MADR-0011-autenticacion-autorizacion.md)

## Vistas relacionadas
- [Iteración 4 — Vista de seguridad y analítica](./iter4_cc_seguridad_analitica.md)
