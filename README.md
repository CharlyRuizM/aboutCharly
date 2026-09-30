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
- `src/sections/`: secciones de la página.
- `src/data/`: contenido del portfolio.
- `src/styles/tokens.css`: colores, tipografías y variables visuales.
- `src/styles/base.css`: reset y estilos base.
- `src/styles/layout.css`: contenedor y cabecera.
- `src/styles/<sección>.css`: estilos de cada sección.
- `public/`: archivos públicos, como el favicon.

## Cómo se renderiza

Los componentes son funciones TypeScript que devuelven strings de HTML.
Un plugin en `vite.config.ts` ejecuta `renderPage()` y reemplaza `<!--app-->`
en `index.html`, así el sitio publicado es HTML estático que funciona sin JS.
El código de `render.ts`, `components/`, `sections/` y `data/` no se envía al navegador.

## Contexto del proyecto

- Repositorio: `git@github.com:CharlyRuizM/aboutCharly.git`.
- Dirección visual: inspiración Daft Punk. La portada actual es una base mínima; el diseño y el contenido del book se desarrollarán después.
- Publicación: por ahora solo local. El workflow `.github/workflows/deploy.yml` está listo pero solo corre a mano; cuando se active, en *Settings → Pages* la fuente debe ser **GitHub Actions**.
- Siguiente paso: definir el contenido de la homepage y los proyectos que se mostrarán.
