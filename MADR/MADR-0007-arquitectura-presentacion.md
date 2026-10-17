# MADR-0007: Arquitectura de presentación con una API dedicada por tipo de cliente

## Estado

Propuesta

## Fecha

2026-10-17

## Contexto y planteamiento del problema

Trotamundos debe ofrecer web y móvil (RF-01) con objetivos distintos: la web debe responder en
800 ms (QA-01) y el móvil debe mostrar el primer contenido en menos de 1,4 s (QA-02). Además, la
interfaz debe ser rica y localizable (QA-10). Los requerimientos de ambos clientes difieren
(formato, tamaño de payload, capacidades nativas como GPS), por lo que una API genérica única puede
obligar a compromisos que perjudiquen a alguno.

## Drivers de decisión

- **QA-01 (Performance web).**
- **QA-02 (Performance/arranque móvil).**
- **QA-10 (Usability e internacionalización).**
- **RF-01:** visualización de reservas por viaje desde web y móvil.

## Opciones consideradas

- **Opción A:** **API dedicada por tipo de cliente** (una para web y una para móvil), sobre una capa
  de API común, aplicando *Interface Partitioning*.
- **Opción B:** **Una única API** para ambos clientes.
- **Opción C:** Renderizado de vistas en **servidor** (aplicación tradicional).
- **Opción D:** Un único **GraphQL** para todos los clientes.

## Resultado de la decisión

Se elige la **Opción A**. Cada cliente recibe un contrato ajustado a sus necesidades (payloads
menores y específicos para móvil, que ayudan al FCP; respuestas orientadas a web), lo que reduce
datos transferidos y tiempo de render. Es la variante del patrón *Backend for Frontends* recomendada
para clientes heterogéneos.

## Consecuencias

- Positivas: contratos óptimos por cliente; mejor rendimiento de arranque; evolución independiente de
  cada API.
- Negativas: más superficies que mantener y coordinar; riesgo de duplicar lógica si no se apoya en
  una capa común.

## Pros y contras de las opciones

### Opción A — API por cliente (BFF)
- Positivo: adapta contratos y payloads; favorece QA-01/QA-02.
- Negativo: dos APIs a mantener.

### Opción B — API única
- Positivo: una sola superficie de mantenimiento.
- Negativo: compromisos que pueden perjudicar a web o a móvil; payloads no óptimos.

### Opción C — Renderizado en servidor
- Positivo: arranque inicial rápido y simple.
- Negativo: menos rico e interactivo; no aprovecha bien capacidades nativas; peor encaje con SPA.

### Opción D — GraphQL único
- Positivo: el cliente pide exactamente lo que necesita; un único endpoint.
- Negativo: introduce una tecnología y modelo de gobierno nuevos; gestión de caché y autorización
  más compleja; posible sobredimensionamiento para el equipo.

## Vistas relacionadas

- [Iteración 3 — Vista de componentes y conectores de acceso](../Diagramas/iter3_cc_acceso.md)
- [Iteración 3 — Secuencia de consulta web](../Diagramas/iter3_secuencia_consulta_web.md)

## Notas e inferencias

- **Inferencia/decision consciente:** la consigna no prescribe BFF ni GraphQL. Se elige BFF por
  alinearse con los objetivos de rendimiento y con la bibliografía (patrón de partición de interfaz);
  GraphQL queda como alternativa evaluada.
