// Entrada del navegador: estilos + comportamiento (progressive enhancement).
// El HTML ya viene prerenderizado desde src/render.ts.
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import './styles/layout.css'
import './styles/hero.css'
import './styles/cases.css'
import { typewriter } from './scripts/typewriter'
import { activeTag } from './scripts/active-tag'

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
const typed = document.querySelector<HTMLElement>('[data-typed]')
if (typed && !reducedMotion) typewriter(typed)
activeTag()
