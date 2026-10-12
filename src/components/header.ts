import { profile } from '../data/profile'

// root: ruta relativa a la home ('./' en la home, '../../' en /casos/<id>/).
export function renderHeader(root = './') {
  return `
    <header class="site-header">
      <a class="wordmark" href="${root}" aria-label="${profile.siteName}, inicio">about<em>Charly</em>.</a>
      <span class="site-label">${profile.role}</span>
      <span class="site-label">${profile.company} · ${profile.location}</span>
      <nav class="site-nav" aria-label="Principal">
        <a href="${root}#casos">Casos</a>
        <a href="${root}#sobre-mi">Sobre mí</a>
        <a href="${root}#contacto">Contacto</a>
      </nav>
    </header>`
}
