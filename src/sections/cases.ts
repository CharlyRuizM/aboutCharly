import { cases, caseHref } from '../data/cases'
import { renderShot } from '../components/visuals'
import type { CaseStudy } from '../types'

const pad = (n: number) => String(n).padStart(2, '0')

function renderCase(c: CaseStudy, i: number) {
  const s = c.story
  const head = `
    <span class="case-n">${pad(i + 1)}</span>
    <h3 id="${c.id}-t">${s ? `<a href="${caseHref(c.id)}">${c.title}</a>` : c.title}</h3>
    <p>${c.summary}</p>`

  if (!s) return `<article class="case" id="${c.id}" aria-labelledby="${c.id}-t">${head}<div class="case-media" aria-hidden="true"></div></article>`

  // Caso con historia: resumen en cuatro tiempos que aparece al hacer scroll
  return `
    <article class="case has-story" id="${c.id}" aria-labelledby="${c.id}-t">
      ${head}
      <div class="case-story">
        <dl class="case-highlights">
          ${s.highlights.map(h => `<div class="reveal"><dt>${h.label}</dt><dd>${h.text}</dd></div>`).join('')}
        </dl>
        ${s.cover ? renderShot(s.cover) : ''}
        <a class="case-more reveal" href="${caseHref(c.id)}">Ver caso completo <span aria-hidden="true">→</span></a>
      </div>
    </article>`
}

export function renderCases() {
  const tags = cases.map(c => `<a class="tag" href="#${c.id}">${c.title}</a>`).join('')
  return `
    <section class="cases" id="casos" aria-labelledby="casos-t">
      <header class="cases-head"><h2 id="casos-t">Casos de estudio</h2><span>${pad(cases.length)}</span></header>
      <div class="tagbar"><nav class="tags" aria-label="Casos de estudio">${tags}</nav></div>
      ${cases.map(renderCase).join('')}
    </section>`
}
