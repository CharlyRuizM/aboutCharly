import { existsSync, readdirSync } from 'node:fs'
import { defineConfig, runnerImport, type Plugin } from 'vite'

type RenderModule = { renderPage: (path: string, opts?: { draft?: boolean }) => string }
const RENDER_ENTRY = '/src/render.ts'
const RENDER_SOURCES = /\/src\/(render\.ts$|(components|sections|data|types)[/.])/

const SITE_URL = 'https://aboutcarlosruiz.com'

// Vista previa al compartir (WhatsApp, LinkedIn, Slack…): Open Graph y Twitter.
// Título y descripción salen del propio <head>; la imagen es public/og/<página>.jpg.
function withShareTags(html: string, path: string) {
  const slug = path.match(/\/casos\/([^/]+)/)?.[1] ?? (path.startsWith('/palenca') ? 'palenca' : 'home')
  const url = SITE_URL + (slug === 'home' ? '/' : slug === 'palenca' ? '/palenca/' : `/casos/${slug}/`)
  const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'aboutCharly'
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
  const image = `${SITE_URL}/og/${slug}.jpg`
  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="aboutCharly" />`,
    `<meta property="og:locale" content="es_MX" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(title)}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ].join('\n    ')
  return html.replace('</title>', `</title>\n    ${tags}`)
}

// Ejecuta src/render.ts y mete el HTML de cada página en su <!--app-->.
function prerender(): Plugin {
  return {
    name: 'prerender',
    async transformIndexHtml(html, ctx) {
      const { renderPage } = ctx.server
        ? ((await ctx.server.ssrLoadModule(RENDER_ENTRY)) as RenderModule)
        : (await runnerImport<RenderModule>(RENDER_ENTRY, { configFile: false })).module
      return withShareTags(html, ctx.path).replace('<!--app-->', renderPage(ctx.path, { draft: !!ctx.server }))
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

export default defineConfig(() => ({
  // Se sirve en la raíz del dominio (aboutcarlosruiz.com), en local y en producción.
  base: '/',
  plugins: [prerender()],
  build: { rollupOptions: { input: { main: 'index.html', palenca: 'palenca/index.html', ...casePages } } },
}))
