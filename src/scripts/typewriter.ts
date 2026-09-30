import { profile } from '../data/profile'

const BEAT = 60000 / 123 // 123 BPM

// Borra y escribe las líneas de profile.typedLines al ritmo del BPM.
export function typewriter(el: HTMLElement) {
  const lines = profile.typedLines
  let line = 0
  let chars = lines[0].length
  let deleting = true

  const step = () => {
    if (deleting) {
      chars--
      if (chars <= 0) { deleting = false; line = (line + 1) % lines.length }
    } else {
      chars++
      if (chars >= lines[line].length) {
        deleting = true
        el.textContent = lines[line]
        return setTimeout(step, BEAT * 6)
      }
    }
    el.textContent = lines[line].slice(0, Math.max(chars, 0)) || '\u200b'
    setTimeout(step, deleting ? BEAT / 8 : BEAT / 4)
  }
  setTimeout(step, BEAT * 6)
}
