import { profile } from '../data/profile'

export function renderHero() {
  const [first] = profile.typedLines
  return `
    <section class="hero${profile.photo ? '' : ' no-photo'}" aria-labelledby="hero-title">
      ${profile.photo ? `<img class="hero-portrait" src="./${profile.photo}" alt="Foto de ${profile.name}" width="680" height="850" decoding="async" fetchpriority="high">` : ''}
      <div class="hero-main">
      <p class="hero-meta">${profile.location}</p>
      <h1 id="hero-title" class="hero-hello">
        Hola, soy <span class="hero-name">${profile.name}</span>,<br>
        <span class="visually-hidden">${first}</span>
        <span class="hero-typed" aria-hidden="true"><span data-typed>${first}</span><span class="caret"></span></span>
      </h1>
      </div>
      <p class="hero-bio">${profile.bio}</p>
    </section>`
}
