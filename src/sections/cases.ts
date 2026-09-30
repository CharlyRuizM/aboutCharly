import { cases } from '../data/cases'

export function renderCases() {
  const tags = cases.map(c => `<a class="tag" href="#${c.id}">${c.title}</a>`).join('')
  const items = cases
    .map((c, i) => `
      <article class="case" id="${c.id}" aria-labelledby="${c.id}-t">
        <span class="case-n">${String(i + 1).padStart(2, '0')}</span>
        <h3 id="${c.id}-t">${c.title}</h3>
        <p>${c.summary}</p>
        <div class="case-media" aria-hidden="true"></div>
      </article>`)
    .join('')

  return `
    <section class="cases" id="casos" aria-labelledby="casos-t">
      <header class="cases-head"><h2 id="casos-t">Casos de estudio</h2><span>${String(cases.length).padStart(2, '0')}</span></header>
      <div class="tagbar"><nav class="tags" aria-label="Casos de estudio">${tags}</nav></div>
      ${items}
    </section>`
}
