# Árbol de utilidad — Trotamundos

```
UTILITY
├── Performance
│   ├── Latencia de respuesta web
│   │   └── (H, No especificado) QA-01: viajero en navegador web solicita consultar
│   │       sus viajes y reservas; tiempo de respuesta de 800 ms.
│   ├── Primer contenido en móvil
│   │   └── (H, No especificado) QA-02: viajero en dispositivo móvil abre la
│   │       aplicación; First Contentful Paint inferior a 1,4 s.
│   └── Actualización de reservas externas
│       └── (H, No especificado) QA-03: proveedor externo genera una actualización
│           de reserva; se presenta en la aplicación dentro de los 5 minutos.
├── Availability
│   └── Indisponibilidad no planificada
│       └── (H, No especificado) QA-04: fallo no planificado afecta al servicio;
│           máximo cinco minutos de inactividad no planificada por mes.
├── Modifiability
│   ├── Capacidad de la plataforma
│   │   └── (H, No especificado) QA-05: dimensionar la plataforma para 15 M de
│   │       cuentas, 2 M de usuarios activos semanales y picos de tráfico.
│   └── Nuevos medios de transporte
│       └── (H, No especificado) QA-09: desarrollador incorpora trenes o
│           autobuses manteniendo lo existente.
├── Interoperability
│   └── Intercambio con proveedores externos
│       └── (H, No especificado) QA-06: proveedor de viajes, correo o servicio de
│           compartición intercambia datos con Trotamundos mediante interfaz
│           compatible.
├── Security
│   ├── Acceso a itinerarios compartidos
│   │   └── (H, No especificado) QA-07: usuario intenta visualizar un itinerario
│   │       compartido; se verifica autorización antes de entregarlo.
│   └── Privacidad del correo integrado
│       └── (H, No especificado) QA-08: escaneo de correos para detectar reservas;
│           acceso únicamente a los mensajes autorizados.
└── Usability
    └── Interfaz rica e internacionalización
        └── (H, No especificado) QA-10: viajero consulta y gestiona sus viajes en
            web o móvil con capacidades nativas como GPS.
```
