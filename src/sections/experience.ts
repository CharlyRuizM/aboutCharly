import { jobs, experienceIntro, skills, tools, education } from '../data/experience'
import { profile } from '../data/profile'

export function renderExperience(root = './') {
  const rows = jobs.map(j => `
    <article class="job">
      <p class="job-period">${j.period}</p>
      <div class="job-head">
        <h3>${j.company}</h3>
        <p class="job-role">${j.role}</p>
        ${(j.earlier ?? []).map(e => `<p class="job-earlier">Antes: ${e.role} · ${e.period}</p>`).join('')}
      </div>
      <div class="job-body">
        ${j.summary ? `<p>${j.summary}</p>` : ''}
        ${j.highlights?.length ? `<ul>${j.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
      </div>
    </article>`).join('')
  const chips = (items: string[]) => `<ul class="chips">${items.map(i => `<li>${i}</li>`).join('')}</ul>`
  return `
    <section class="experience" id="experiencia" aria-labelledby="experiencia-t">
      <header class="section-head"><h2 id="experiencia-t">Experiencia</h2><a class="cv-link" href="${root}${profile.cv}" download>Descargar CV <span aria-hidden="true">↓</span></a></header>
      <p class="experience-intro">${experienceIntro}</p>
      <div class="jobs">${rows}</div>
      <div class="experience-extra">
        <div><h3>Skills</h3>${chips(skills)}</div>
        <div><h3>Herramientas</h3>${chips(tools)}</div>
        <div><h3>Educación</h3><p>${education}</p></div>
      </div>
    </section>`
}
