import { cases, caseHref } from '../data/cases'
import type { CaseStudy } from '../types'

const ROOT = '../../'
const pad = (n: number) => String(n).padStart(2, '0')

export function renderCasePage(c: CaseStudy) {
  const s = c.story!
  const index = s.sections.map((x, i) => `<li><a href="#${x.id}"><span>${pad(i + 1)}</span>${x.label}</a></li>`).join('')
  const sections = s.sections
    .map((x, i) => `
      <section class="cs-section" id="${x.id}" aria-labelledby="${x.id}-t">
        <p class="cs-eyebrow"><span>${pad(i + 1)}</span>${x.label}</p>
        <h2 id="${x.id}-t">${x.heading}</h2>
        ${x.body.map(p => `<p>${p}</p>`).join('')}
        ${x.pending?.length ? `<aside class="cs-pending" aria-label="Por completar"><p>Por completar</p><ul>${x.pending.map(q => `<li>${q}</li>`).join('')}</ul></aside>` : ''}
      </section>`)
    .join('')

  const i = cases.findIndex(x => x.id === c.id)
  const next = cases.slice(i + 1).concat(cases.slice(0, i)).find(x => x.story)

  return `
    <article class="cs" aria-labelledby="cs-title">
      <header class="cs-head">
        <a class="cs-back" href="${ROOT}#casos">← Casos de estudio</a>
        <h1 id="cs-title">${c.title}</h1>
        <p class="cs-tagline">${s.tagline}</p>
        <dl class="cs-meta">${s.meta.map(m => `<div><dt>${m.label}</dt><dd>${m.value}</dd></div>`).join('')}</dl>
      </header>
      ${s.media ? `<figure class="cs-media"><div class="cs-media-box" role="img" aria-label="${s.media.label} (pendiente)"></div><figcaption>${s.media.label}</figcaption></figure>` : ''}
      <div class="cs-body">
        <nav class="cs-index" aria-label="Secciones del caso"><ol>${index}</ol></nav>
        <div class="cs-content">${sections}</div>
      </div>
      ${s.beforeAfter ? `
      <section class="cs-ba" aria-label="Antes y después">
        <div><span>Antes</span><b>${s.beforeAfter.before}</b></div>
        <div><span>Después</span><b>${s.beforeAfter.after}</b></div>
        <p>${s.beforeAfter.line}</p>
      </section>` : ''}
      <footer class="cs-foot">
        <a href="${ROOT}#casos">← Todos los casos</a>
        ${next && next.id !== c.id ? `<a href="${caseHref(next.id, ROOT)}">Siguiente: ${next.title} →</a>` : ''}
      </footer>
    </article>`
}
