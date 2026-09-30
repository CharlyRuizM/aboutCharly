// Se ejecuta en Node durante el build (y en dev), no en el navegador.
// Devuelve el HTML completo de la página para que el sitio funcione sin JS.
import { renderHeader } from './components/header'
import { renderIntro } from './sections/intro'

export function renderPage(): string {
  return `
    <a class="skip-link" href="#main">Ir al contenido</a>
    ${renderHeader()}
    <main id="main">${renderIntro()}</main>
  `
}
