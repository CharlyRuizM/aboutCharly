import { existsSync, readdirSync } from 'node:fs'
import { defineConfig, runnerImport, type Plugin } from 'vite'

type RenderModule = { renderPage: (path: string) => string }
const RENDER_ENTRY = '/src/render.ts'
const RENDER_SOURCES = /\/src\/(render\.ts$|(components|sections|data|types)[/.])/

// Ejecuta src/render.ts y mete el HTML de cada página en su <!--app-->.
function prerender(): Plugin {
  return {
    name: 'prerender',
    async transformIndexHtml(html, ctx) {
      const { renderPage } = ctx.server
        ? ((await ctx.server.ssrLoadModule(RENDER_ENTRY)) as RenderModule)
        : (await runnerImport<RenderModule>(RENDER_ENTRY, { configFile: false })).module
      return html.replace('<!--app-->', renderPage(ctx.path))
    },
    // En dev, recarga la página cuando cambia algo que se renderiza en Node.
    handleHotUpdate({ file, server }) {
      if (RENDER_SOURCES.test(file)) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

// Cada carpeta en casos/<id>/ con un index.html es una página del build.
const casePages = existsSync('casos')
  ? Object.fromEntries(
      readdirSync('casos', { withFileTypes: true })
        .filter(d => d.isDirectory() && existsSync(`casos/${d.name}/index.html`))
        .map(d => [d.name, `casos/${d.name}/index.html`]),
    )
  : {}

export default defineConfig(({ command }) => ({
  // En local se sirve en la raíz; el build usa la ruta de GitHub Pages.
  base: command === 'build' ? '/aboutCharly/' : '/',
  plugins: [prerender()],
  build: { rollupOptions: { input: { main: 'index.html', ...casePages } } },
}))
