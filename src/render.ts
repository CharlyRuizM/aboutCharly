// Se ejecuta en Node durante el build (y en dev), no en el navegador.
// Devuelve el HTML completo de cada página para que el sitio funcione sin JS.
import { renderHeader } from './components/header'
import { renderHero } from './sections/hero'
import { renderCases } from './sections/cases'
import { renderCasePage } from './sections/case-page'
import { cases } from './data/cases'
import { renderFooter } from './components/footer'
import { renderExperience } from './sections/experience'
import { renderPalenca } from './sections/palenca'

const shell = (root: string, main: string, footer = true) => `
  <a class="skip-link" href="#main">Ir al contenido</a>
  ${renderHeader(root)}
  <main id="main">${main}</main>
  ${footer ? renderFooter(root) : ''}
`

// path: ruta de la página (p. ej. /casos/propaga-mobile/index.html)
// draft: en dev se muestran las notas "Por completar"; en el build público no.
export function renderPage(path = '/', { draft = false } = {}): string {
  // /palenca/ trae su propio bloque de contacto, así que va sin footer.
  if (/^\/palenca\//.test(path)) return shell('../', renderPalenca('../'), false)
  const slug = path.match(/\/casos\/([^/]+)/)?.[1]
  const study = slug && cases.find(c => c.id === slug && c.story && c.status !== 'wip')
  if (slug && !study) throw new Error(`No hay caso con página para "${slug}"`)
  if (study) return shell('../../', renderCasePage(study, draft))
  return shell('./', renderHero() + renderCases() + renderExperience())
}
