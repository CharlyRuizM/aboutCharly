import { profile } from '../data/profile'

export function renderIntro() {
  return `<section class="intro" aria-labelledby="intro-title"><p class="eyebrow">Hola, soy ${profile.name}</p><h1 id="intro-title">about<strong>${profile.name}</strong><span class="accent" aria-hidden="true">.</span></h1><p class="intro-copy">Un espacio para compartir lo que hago y lo que me mueve.</p><div class="intro-rule" aria-hidden="true"></div></section>`
}
