import { profile } from '../data/profile'

// Página para la aplicación a Palenca (Product Growth Analyst): video + gracias + contacto.
const VIDEO_ID = 'gl5oZ8_hwuU' // YouTube, no listado

// Cada letra en su <span> para animarlas en secuencia; el texto real va en aria-label.
const letters = (word: string, start: number) =>
  [...word].map((ch, i) => `<span class="ch" style="--i:${start + i}">${ch}</span>`).join('')

export function renderPalenca(root = '../') {
  const phoneHref = `tel:${profile.phone.replace(/\s/g, '')}`
  const linkedinLabel = profile.linkedin.replace(/^https?:\/\/(www\.)?/, '')
  return `
    <section class="pal" aria-labelledby="pal-t">
      <p class="pal-meta">Para Palenca · Product Growth Analyst</p>
      <h1 id="pal-t" class="pal-title">Hola, equipo <em>Palenca</em>.</h1>

      <div class="pal-video">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&amp;modestbranding=1&amp;playsinline=1"
          title="Carlos Ruiz · Presentación para Palenca"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>

      <p class="pal-thanks reveal" aria-label="Gracias totales.">
        <span aria-hidden="true"><span class="w">${letters('Gracias', 0)}</span> <span class="w w-em">${letters('totales', 8)}<span class="ch dot" style="--i:15">.</span></span></span>
      </p>

      <div class="pal-actions" id="contacto">
        <a class="case-more" href="${root}#trabajo">Ver mi book <span aria-hidden="true">→</span></a>
        <a class="cv-link" href="${root}${profile.cv}" download>Descargar CV <span aria-hidden="true">↓</span></a>
      </div>

      <ul class="pal-contact" aria-label="Contacto">
        <li><span>Correo</span><a href="mailto:${profile.email}">${profile.email}</a></li>
        <li><span>Teléfono</span><a href="${phoneHref}">${profile.phone}</a></li>
        <li><span>LinkedIn</span><a href="${profile.linkedin}" target="_blank" rel="noopener">${linkedinLabel} ↗</a></li>
      </ul>
    </section>`
}
