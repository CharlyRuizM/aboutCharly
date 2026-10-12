// Se ejecuta en Node durante el build (y en dev), no en el navegador.
// Devuelve el HTML completo de cada página para que el sitio funcione sin JS.
import { renderHeader } from './components/header'
import { renderHero } from './sections/hero'
import { renderCases } from './sections/cases'
import { renderCasePage } from './sections/case-page'
import { cases } from './data/cases'

const shell = (root: string, main: string) => `
  <a class="skip-link" href="#main">Ir al contenido</a>
  ${renderHeader(root)}
  <main id="main">${main}</main>
`

// path: ruta de la página (p. ej. /casos/propaga-mobile/index.html)
export function renderPage(path = '/'): string {
  const slug = path.match(/\/casos\/([^/]+)/)?.[1]
  const study = slug && cases.find(c => c.id === slug && c.story)
  if (slug && !study) throw new Error(`No hay caso con página para "${slug}"`)
  if (study) return shell('../../', renderCasePage(study))
  return shell('./', renderHero() + renderCases())
}
