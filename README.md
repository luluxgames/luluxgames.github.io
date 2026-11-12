# LULUX — Lucía Puga Pérez

Portfolio actualizado: contenido digital, UX/UI, narrativa y desarrollo.

## Archivos para GitHub Pages

El contenido de `dist/` es la web completa. Funciona como HTML, CSS y JavaScript, sin instalar dependencias ni compilar.

Para sustituir la web de https://luluxgames.github.io/:

1. Guarda una copia de tu repositorio actual.
2. Copia el contenido de `dist/` a la raíz del repositorio `luluxgames.github.io`. En el ZIP de entrega, esos archivos ya están en la raíz.
3. Conserva `.nojekyll`, la carpeta `img`, `style.css` y `site.js` junto a los HTML.
4. Haz commit y push a la rama que utiliza GitHub Pages. La publicación continuará usando el mismo dominio.

## Páginas

- `index.html`: presentación y proyectos con filtros.
- `digital-content-ux.html`: Eventbrite, VOGUE, Mythical Sanctuary y La Vecina.
- `latest-tech-work.html`: todos los juegos y proyectos técnicos.
- `narrative-portfolio.html`: tesis, guiones y adaptaciones.
- `work-experience.html`: experiencia, formación, herramientas e idiomas.
- `contact-networks.html`: correo y perfiles.
- `404.html`: página de error.

## Editar

Puedes editar directamente el texto de cada HTML y los colores en `:root` dentro de `style.css`.

`build_portfolio.py` genera los HTML a partir de una fuente común. Si lo utilizas, modifica el contenido en ese archivo antes de ejecutarlo con Python 3; una regeneración sobrescribe los HTML. No es necesario para publicar o abrir la web.

Los proyectos VOGUE y Eventbrite incluyen imágenes exportadas de los archivos de Figma y sus enlaces. Se identifican como proyectos académicos. El CV enlaza al archivo actual de Figma: no se ha utilizado el PDF anterior. Los permisos de lectura de los archivos de Figma se gestionan en Figma.

La portada reutiliza la foto y la flor de la web original. No se han modificado los colores ni la fotografía del CV de Figma.

La ficha de La Vecina utiliza una tarjeta de título. Para añadir muestras visuales de ese trabajo, sustituye la tarjeta por capturas o piezas de contenido que quieras mostrar.

## Validación

`python check_site.py` comprueba que los enlaces internos, los identificadores de destino y los recursos locales existen. `node --check dist/site.js` revisa la sintaxis del JavaScript.

También se revisaron el diseño de escritorio, el menú móvil, el caso de Eventbrite a 390 px y el filtro de contenido en el navegador.
