# Bloom 🌸

Bloom es una aplicación que estoy desarrollando para Programación VI. La idea es tener en un solo lugar distintas herramientas para organizar las actividades diarias, trabajar en hábitos y descubrir consejos que ayuden a mantener una rutina.

El proyecto todavía está en desarrollo, por lo que algunas partes pueden cambiar a medida que avance.

## Tecnologías

- Ionic
- Angular
- TypeScript
- Capacitor
- HTML y SCSS

## Secciones

La aplicación cuenta actualmente con tres pestañas:

- **Mi día:** sección para organizar las actividades del día.
- **Misiones:** permite completar pequeños desafíos y consultar el progreso.
- **Descubrir:** muestra consejos sobre hábitos, bienestar y productividad.

## Datos

La sección Descubrir obtiene sus consejos de un archivo JSON ubicado en `src/assets/data/tips.json`. Para cargar esos datos se utiliza un servicio de Angular llamado `TipsService`.

## Cómo ejecutar el proyecto

1. Clonar este repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Ejecutar `npm install`.
4. Ejecutar `ionic serve`.
5. Abrir en el navegador la dirección que proporciona Ionic.

## Estado del proyecto

Bloom sigue en desarrollo. Todavía quedan funcionalidades por completar y pruebas por realizar.
