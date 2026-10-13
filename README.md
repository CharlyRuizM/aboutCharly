# aboutCharly

Portfolio personal de Charly, construido con Vite, TypeScript y CSS.

## Desarrollo

```sh
npm install
npm run dev
```

`npm run build` verifica TypeScript y genera la web en `dist/`.
`npm run preview` sirve esa compilación localmente.

## Estructura

- `src/render.ts`: arma el HTML de la página. Corre en Node (build y dev), no en el navegador.
- `src/main.ts`: entrada del navegador; estilos y comportamiento (progressive enhancement).
- `src/components/`: elementos compartidos, como la cabecera.
- `src/sections/`: secciones de la página (`hero`, `cases`).
- `src/data/`: contenido del portfolio (`profile.ts`, `cases.ts`). Para agregar un caso, edita `cases.ts`.
- `src/scripts/`: comportamiento en el navegador (escritura animada, tag activo).
- `src/types.ts`: tipos compartidos.
- `src/styles/fonts.css`: `@font-face` de las fuentes auto-hospedadas.
- `src/assets/fonts/`: archivos woff2 (subset latin) y sus licencias OFL.
- `src/styles/tokens.css`: colores, tipografías y variables visuales.
- `src/styles/base.css`: reset y estilos base.
- `src/styles/layout.css`: contenedor y cabecera.
- Tema: oscuro por defecto, claro si el sistema del visitante lo pide (`prefers-color-scheme` en `tokens.css`).
- `src/styles/<sección>.css`: estilos de cada sección.
- `public/`: archivos públicos, como el favicon.

## Páginas de casos

- Cada caso con historia completa vive en `src/data/stories/<id>.ts` y se enlaza desde `cases.ts` (campo `story`).
- Su página es `casos/<id>/index.html` (copia de `index.html` con su propio `<title>`); el build la detecta solo.
- Las preguntas en `pending` se muestran como nota "Por completar" hasta que se borren.

## Proyectos en progreso

- En `src/data/cases.ts`, `status: 'wip'` muestra el proyecto solo con título, etiqueta "En progreso" y su línea de resumen, sin página propia.
- Para publicarlo completo: agrega su `story` y quita `status: 'wip'`.
- Las notas `pending` ("Por completar") solo se ven en `npm run dev`, nunca en el build público.

## Cómo se renderiza

Los componentes son funciones TypeScript que devuelven strings de HTML.
Un plugin en `vite.config.ts` ejecuta `renderPage()` y reemplaza `<!--app-->`
en `index.html`, así el sitio publicado es HTML estático que funciona sin JS.
El código de `render.ts`, `components/`, `sections/` y `data/` no se envía al navegador.

## Tipografía

- Display: Instrument Serif (normal e itálica): la parte humana.
- Texto: Instrument Sans (variable, 400–700).
- Datos y etiquetas: DM Mono: la parte máquina.
- Displays puntuales: Doto (matriz de puntos), usarla con moderación.

## Contexto del proyecto

- Repositorio: `git@github.com:CharlyRuizM/aboutCharly.git`.
- Dirección visual: inspiración Daft Punk. La portada actual es una base mínima; el diseño y el contenido del book se desarrollarán después.
- Publicación: GitHub Pages vía GitHub Actions en cada push a `main`. En *Settings → Pages* la fuente debe ser **GitHub Actions**.
- Siguiente paso: definir el contenido de la homepage y los proyectos que se mostrarán.
