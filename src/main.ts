// Entrada del navegador: estilos + comportamiento (progressive enhancement).
// El HTML ya viene prerenderizado desde src/render.ts.
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/cases.css'
import './styles/case-page.css'
import './styles/visuals.css'
import './styles/reel.css'
import './styles/experience.css'
import { typewriter } from './scripts/typewriter'
import { activeLinks } from './scripts/active-tag'
import { reveal } from './scripts/reveal'
import { reel } from './scripts/reel'
import { videos } from './scripts/videos'

// Avisa al script del <head> que el JS cargó (si no, se quitan las animaciones y todo queda visible).
document.documentElement.dataset.app = 'on'

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
const typed = document.querySelector<HTMLElement>('[data-typed]')
if (typed && !reducedMotion) typewriter(typed)
activeLinks('.tag', '.case')
activeLinks('.cs-index a', '.cs-section')
reveal()
reel()
videos()
