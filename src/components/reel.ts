import type { ReelScene, ReelImage } from '../types'

// Posiciones (left/top en %) donde caen los IDs dentro del escenario.
const SPOTS = [[16, 20], [80, 16], [10, 52], [88, 50], [22, 84], [76, 84], [48, 9], [52, 92]]
const pad = (n: number) => String(n).padStart(2, '0')

const chips = (ids: string[]) =>
  ids.slice(0, SPOTS.length).map((id, i) =>
    `<span class="r-chip" style="--l:${SPOTS[i][0]}%;--t:${SPOTS[i][1]}%;--i:${i}">${id}</span>`).join('')

const img = (m: ReelImage, root: string) =>
  `<img class="r-img is-${m.kind}" src="${root}${m.src}" width="${m.width}" height="${m.height}" alt="${m.alt}" loading="lazy" decoding="async">`

function scene(s: ReelScene, i: number, root: string) {
  const v = s.visual
  const inner =
    v.type === 'burst'
      ? `<div class="r-node"><span>Tienda</span>${v.store}</div>${chips(v.ids)}<p class="r-count"><b>${v.count}</b>IDs distintos</p>`
      : v.type === 'converge'
        ? `${chips(v.ids)}<div class="r-phone"><span>${v.label}</span><b>${v.phone}</b></div>`
        : v.images.map(m => img(m, root)).join('')
  return `<div class="scene scene-${v.type}" data-scene="${i}">${inner}</div>`
}

// Resumen narrativo de un caso: pasos a la izquierda, escenario fijo a la derecha.
export function renderReel(scenes: ReelScene[], more: string, root = './') {
  return `
    <div class="reel" data-reel>
      <div class="r-stage">
        <div class="r-seq" aria-hidden="true">${scenes.map(() => '<i></i>').join('')}</div>
        <div class="r-scenes">${scenes.map((s, i) => scene(s, i, root)).join('')}</div>
      </div>
      <div class="r-steps">
        ${scenes.map((s, i) => `
          <div class="r-step">
            <p class="r-label"><span>${pad(i + 1)}</span>${s.label}</p>
            <p class="r-text">${s.text}</p>
          </div>`).join('')}
        <a class="case-more" href="${more}">Ver caso completo <span aria-hidden="true">→</span></a>
      </div>
    </div>`
}
