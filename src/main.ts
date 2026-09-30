import './styles/variables.css'
import './styles/global.css'
import { renderHeader } from './components/header'
import { renderIntro } from './sections/intro'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Ir al contenido</a>
  ${renderHeader()}
  <main id="main">${renderIntro()}</main>
`
