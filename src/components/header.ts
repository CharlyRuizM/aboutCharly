import { profile } from '../data/profile'

export function renderHeader() {
  return `
    <header class="site-header">
      <a class="wordmark" href="#main" aria-label="${profile.siteName}, inicio">about<em>Charly</em>.</a>
      <span class="site-label">${profile.role}</span>
      <span class="site-label">${profile.company} · ${profile.location}</span>
      <nav class="site-nav" aria-label="Principal">
        <a href="#casos">Casos</a>
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>`
}
