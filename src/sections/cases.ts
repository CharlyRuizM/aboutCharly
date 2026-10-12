import { cases, caseHref } from '../data/cases'
import { renderReel } from '../components/reel'
import type { CaseStudy } from '../types'

const pad = (n: number) => String(n).padStart(2, '0')

function renderCase(c: CaseStudy, i: number) {
  const s = c.story
  const head = `
    <span class="case-n">${pad(i + 1)}</span>
    <h3 id="${c.id}-t">${s ? `<a href="${caseHref(c.id)}">${c.title}</a>` : c.title}</h3>
    <p>${c.summary}</p>`

  if (!s) return `<article class="case" id="${c.id}" aria-labelledby="${c.id}-t">${head}<div class="case-media" aria-hidden="true"></div></article>`

  // Caso con historia: resumen narrativo que avanza con el scroll
  return `
    <article class="case has-story" id="${c.id}" aria-labelledby="${c.id}-t">
      ${head}
      ${renderReel(s.reel, caseHref(c.id))}
    </article>`
}

export function renderCases() {
  const tags = cases.map(c => `<a class="tag" href="#${c.id}">${c.title}</a>`).join('')
  return `
    <section class="cases" id="trabajo" aria-labelledby="trabajo-t">
      <header class="cases-head"><h2 id="trabajo-t">Trabajo</h2><span>${pad(cases.length)}</span></header>
      <div class="tagbar"><nav class="tags" aria-label="Proyectos">${tags}</nav></div>
      ${cases.map(renderCase).join('')}
    </section>`
}
