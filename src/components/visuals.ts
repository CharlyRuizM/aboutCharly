import type { Visual } from '../types'

// root: ruta relativa a la raíz del sitio, para las imágenes de public/.
export function renderVisual(v: Visual, root = './'): string {
  switch (v.type) {
    case 'chips':
      return `
        <figure class="v v-chips reveal">
          <figcaption>${v.title}</figcaption>
          <ul>${v.items.map((it, i) => `<li style="--i:${i}">${it}</li>`).join('')}</ul>
        </figure>`
    case 'ids':
      return `
        <figure class="v v-ids reveal">
          <div class="v-store"><span>Tienda</span>${v.store}</div>
          <ul>${v.items.map((it, i) => `<li style="--i:${i}"><span>${it.dist}</span><b>${it.id}</b></li>`).join('')}</ul>
          <figcaption>${v.note}</figcaption>
        </figure>`
    case 'phone':
      return `
        <figure class="v v-phone reveal">
          <ul aria-hidden="true">${v.ids.map((id, i) => `<li style="--i:${i}">${id}</li>`).join('')}</ul>
          <div class="v-phone-num"><span>${v.label}</span><b>${v.phone}</b></div>
        </figure>`
    case 'identity': {
      const rows = v.dists.map((d, i) => `<li style="--i:${i}"><b>${v.ids[i]}</b><span>${d}</span></li>`).join('')
      const hub = v.dists.map((d, i) => `<li style="--i:${i + 3}"><span>${d}</span></li>`).join('')
      return `
        <figure class="v v-identity reveal">
          <div class="v-col">
            <p class="v-tag">Antes</p>
            <div class="v-node">${v.store}</div>
            <ul class="v-fan is-before">${rows}</ul>
          </div>
          <div class="v-col">
            <p class="v-tag">Después</p>
            <div class="v-node">${v.store}</div>
            <div class="v-node is-phone">${v.phone}</div>
            <div class="v-node is-brand">Propaga</div>
            <ul class="v-fan is-after">${hub}</ul>
          </div>
        </figure>`
    }
    case 'steps':
      return `
        <ol class="v v-steps reveal">${v.steps.map((s, i) => `<li style="--i:${i}"><span>${String(i + 1).padStart(2, '0')}</span>${s}</li>`).join('')}</ol>`
    case 'shot':
      return renderShot(v, root)
  }
}

export function renderShot(v: Extract<Visual, { type: 'shot' }>, root = './') {
  return `
    <figure class="v v-shot reveal">
      <div class="v-shot-frame"><img src="${root}${v.src}" width="${v.width}" height="${v.height}" alt="${v.alt}" loading="lazy" decoding="async"></div>
      <figcaption>${v.caption}</figcaption>
    </figure>`
}
