import type { DsVisual } from '../types'
import { renderDsCard } from './ds-card'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function renderDsVisual(v: DsVisual, root = './'): string {
  switch (v.type) {
    case 'swipe':
      return `
        <figure class="v v-swipe reveal" data-swipe>
          <div class="swipe-tabs" role="tablist" aria-label="Pantallas">${v.items.map((it, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-i="${i}">${it.label}</button>`).join('')}</div>
          <div class="swipe-stage">
            ${v.items.map((it, i) => `
            <div class="swipe-item${i === 0 ? ' is-active' : ''}" style="aspect-ratio:${it.width}/${it.height}" data-label="${it.label}">
              <img src="${root}${it.after}" width="${it.width}" height="${it.height}" alt="${it.alt} Después: ${v.labels[1]}." loading="lazy" decoding="async">
              <div class="swipe-before"><img src="${root}${it.before}" width="${it.width}" height="${it.height}" alt="${it.alt} Antes: ${v.labels[0]}." loading="lazy" decoding="async"></div>
            </div>`).join('')}
            <span class="swipe-label is-before">${v.labels[0]}</span><span class="swipe-label is-after">${v.labels[1]}</span>
            <span class="swipe-handle" aria-hidden="true"></span>
            <input class="swipe-range" type="range" min="0" max="100" value="50" aria-label="Deslizar para comparar ${v.labels[0]} y ${v.labels[1]}">
          </div>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'ds-assemble':
      return `
        <figure class="v v-ds-assemble reveal">
          <div class="ds-stage">${renderDsCard({}, { assemble: true })}</div>
          <button type="button" class="ds-btn" data-apart aria-pressed="false"><span class="is-off">Ver las piezas</span><span class="is-on">Armar</span></button>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'ds-playground':
      return `
        <figure class="v v-ds-play reveal" data-play>
          <div class="ds-play">
            <div class="ds-stage">${renderDsCard()}</div>
            <form class="ds-panel" aria-label="Properties del componente" onsubmit="return false">
              <p class="ds-panel-h">Card Concert <span aria-hidden="true">◇</span></p>
              <label>Status<select name="status"><option value="active">Active</option><option value="soldout">Sold out</option><option value="past">Past</option></select></label>
              <label>Size<select name="size"><option value="desk">Desk</option><option value="mobile">Mobile</option></select></label>
              <label>Artist<input name="artist" value="Los Bloques" maxlength="22" autocomplete="off"></label>
              <label>Venue<input name="venue" value="Auditorio Nacional" maxlength="24" autocomplete="off"></label>
              <label>Day<input name="day" value="11" maxlength="2" inputmode="numeric" autocomplete="off"></label>
              <label>Month<input name="month" value="Sept" maxlength="5" autocomplete="off"></label>
              <label class="is-toggle">Pocos boletos<input type="checkbox" name="chip" checked></label>
              <label class="is-toggle">Show points<input type="checkbox" name="points" checked></label>
            </form>
          </div>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'ds-tokens':
      return `
        <figure class="v v-ds-tokens reveal" data-tokens data-mode="${v.modes[0].id}">
          <div class="ds-modes" role="radiogroup" aria-label="Modo">${v.modes.map((m, i) => `<button type="button" role="radio" aria-checked="${i === 0}" data-mode="${m.id}">${m.label}</button>`).join('')}</div>
          <div class="ds-tokens-grid">
            <div class="ds-stage">${renderDsCard({ artist: 'Los Bloques', chip: true })}</div>
            <dl class="ds-token-list">${v.tokens.map(t => `
              <div><dt>${t.name}</dt>${v.modes.map(m => `<dd data-for="${m.id}">${t.values[m.id].startsWith('#') ? `<i style="background:${t.values[m.id]}"></i>` : ''}${t.values[m.id]}${t.note ? ` <small>${t.note}</small>` : ''}</dd>`).join('')}</div>`).join('')}
            </dl>
          </div>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'palette':
      return `
        <figure class="v v-palette reveal">
          ${v.groups.map(g => `
          <div class="pal-group"><p>${g.name}</p><ul>${g.colors.map((c, i) => `<li style="--i:${i}"><i style="background:${c.value}"></i><span>${c.name}</span><code>${c.value}</code></li>`).join('')}</ul></div>`).join('')}
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'typescale':
      return `
        <figure class="v v-typescale reveal">
          <div class="ts-row is-head"><span>Estilo</span><span>Desktop</span><span>Mobile</span></div>
          ${v.rows.map((r, i) => `
          <div class="ts-row" style="--i:${i}"><span class="ts-name" style="font-size:${r.size}px;font-weight:${r.weight ?? 400}">${r.name}<small>${r.family}</small></span><span>${r.desk}</span><span>${r.mobile}</span></div>`).join('')}
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'strip':
      return `
        <figure class="v v-strip reveal">
          <ul tabindex="0" aria-label="${v.caption}">${v.images.map((m, i) => `
            <li style="--i:${i}"><img src="${root}${m.src}" width="${m.width}" height="${m.height}" alt="${m.alt}" decoding="async">${m.caption ? `<span>${m.caption}</span>` : ''}</li>`).join('')}</ul>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'code':
      return `
        <figure class="v v-code reveal">
          <pre><code>${esc(v.code)}</code></pre>
          <figcaption>${v.caption}</figcaption>
        </figure>`
  }
}
