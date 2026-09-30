import { defineConfig, runnerImport, type Plugin } from 'vite'

type RenderModule = { renderPage: () => string }
const RENDER_ENTRY = '/src/render.ts'
const RENDER_SOURCES = /\/src\/(render\.ts$|(components|sections|data)\/)/

// Ejecuta src/render.ts y mete el HTML resultante en index.html (<!--app-->).
function prerender(): Plugin {
  return {
    name: 'prerender',
    async transformIndexHtml(html, ctx) {
      const { renderPage } = ctx.server
        ? ((await ctx.server.ssrLoadModule(RENDER_ENTRY)) as RenderModule)
        : (await runnerImport<RenderModule>(RENDER_ENTRY, { configFile: false })).module
      return html.replace('<!--app-->', renderPage())
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

export default defineConfig({
  base: '/aboutCharly/', // GitHub Pages: charlyruizm.github.io/aboutCharly/
  plugins: [prerender()],
})
