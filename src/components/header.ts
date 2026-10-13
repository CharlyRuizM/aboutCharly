import { profile } from '../data/profile'

// root: ruta relativa a la home ('./' en la home, '../../' en /casos/<id>/).
export function renderHeader(root = './') {
  return `
    <header class="site-header">
      <a class="wordmark" href="${root}" aria-label="${profile.siteName}, inicio">about<em>Charly</em>.</a>
      <nav class="site-nav" aria-label="Principal">
        <a href="${root}#trabajo">Trabajo</a>
        <a href="${root}#experiencia">Experiencia</a>
        <a href="#contacto">Contacto</a>
        <a class="cv-link" href="${root}${profile.cv}" download>CV <span aria-hidden="true">↓</span></a>
      </nav>
    </header>`
}
