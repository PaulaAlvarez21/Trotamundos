# Justificación de los lenguajes y tecnologías elegidas

Para el desarrollo del prototipo de Trotamundos, se optó por **TypeScript con Node.js/Express** para el backend y **TypeScript con Next.js** para el frontend. Esta decisión se tomó teniendo en cuenta la finalidad del prototipo: demostrar la viabilidad de la arquitectura propuesta en el ADD, manteniendo trazabilidad con el diseño y facilitando la comprensión del mismo.

## Comparación con otras alternativas

| Aspecto | TypeScript/Node.js + Next.js | Java (Spring Boot) | Go (Gin/Fiber) |
|---|---|---|---|
| **Velocidad de desarrollo para un prototipo** | Alta. Permite armar los flujos end-to-end con poco código y configuración mínima. | Media-Alta. Muy robusto, pero requiere mayor boilerplate para levantar un MVP funcional. | Alta, pero menos orientado a aplicaciones fullstack con UI integrada. |
| **Claridad para visualizar el flujo arquitectónico** | Buena. Es fácil identificar rutas, servicios, puertos/adaptadores y eventos sin demasiada abstracción oculta. | Bueno, pero el uso extensivo de anotaciones y configuración automática puede dificultar seguir el flujo a simple vista. | Bueno. Muy explícito, aunque para este caso se requeriría mayor código para routing, serialización y estructura de vistas. |
| **Facilidad para simular sistemas externos** | Muy alta. Permite crear mocks con JSON, objetos en memoria y un bus de eventos simple con `EventEmitter`. Ideal para emular correos, proveedores, agencia de viajes y NLU. | Posible, pero más verboso para generar mocks rápidos y para orquestar flujos simulados. | Posible, aunque requiere mayor código para lograr los mismos resultados en un tiempo acotado. |
| **Trazabilidad con el diseño ADD** | Buena. La estructura por módulos, puertos/adaptadores, eventos y BFF se adapta fácilmente a las vistas C&C y a los MADRs documentados. | Muy buena. Spring permite aplicar arquitecturas limpias/hexagonales, aunque con mayor complejidad estructural. | Buena, pero menos natural para representar rápidamente un BFF y un frontend unificado. |
| **Integración frontend-backend** | Excelente. Al poder trabajar en un monorepo (`apps/api`, `apps/web`), se facilita la demo y la integración entre ambos. | Requiere levantar dos proyectos separados o integrar con mayor configuración. | Requiere mayor esfuerzo para integrar con un frontend moderno en el mismo flujo de desarrollo. |

## Razones de la elección

- **Simplicidad**: Express es minimalista, por lo que el paso *request → handler → servicio* es explícito y fácil de seguir, lo cual resulta ideal para un prototipo académico.
- **Tipado**: TypeScript ofrece un sistema de tipos similar al de Java, lo que facilita la lectura sin sacrificar agilidad.
- **Rapidez para demostrar flujos**: Next.js permite construir las pantallas necesarias para la demo (mis viajes, ingesta, asistente, compartir, analítica) sin invertir tiempo en configurar un router o tooling complejo.
- **Alineado al objetivo**: El foco del trabajo es demostrar que se aplicó el proceso ADD, se siguieron las decisiones registradas en los MADR y se simularon correctamente los sistemas externos. Para eso, se priorizó la claridad sobre la optimización o la complejidad técnica.

Si bien Java o Go hubieran sido opciones válidas para implementar esta arquitectura, se consideró que TypeScript + Node.js/Next.js ofrecía el mejor equilibrio entre trazabilidad, rapidez y legibilidad para este prototipo.
