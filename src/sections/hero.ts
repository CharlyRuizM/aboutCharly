import { profile } from '../data/profile'

export function renderHero() {
  const [first] = profile.typedLines
  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-portrait" role="img" aria-label="Foto de ${profile.name} (pendiente)"></div>
      <h1 id="hero-title" class="hero-hello">
        Hola, soy <span class="hero-name">${profile.name}</span>,<br>
        <span class="visually-hidden">${first}</span>
        <span class="hero-typed" aria-hidden="true"><span data-typed>${first}</span><span class="caret"></span></span>
      </h1>
      <p class="hero-bio">${profile.bio}</p>
    </section>`
}
