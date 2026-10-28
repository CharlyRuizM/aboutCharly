import type { ChatMessage, DsVisual } from '../types'
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
    case 'ds-inspect':
      return `
        <figure class="v v-ds-inspect reveal" data-inspect>
          <div class="ins-bar">
            <button type="button" class="ds-btn" data-ins="boxes" aria-pressed="false">Ver cajas</button>
            <button type="button" class="ds-btn" data-ins="flow" aria-pressed="false">Quitar position: absolute</button>
            <label class="ins-width">Ancho <input type="range" min="240" max="440" value="340" data-ins="width"><output>340 px</output></label>
          </div>
          <div class="ins-grid">
            <div class="ds-stage ins-stage">${renderDsCard()}<span class="ins-tip" aria-live="polite"></span></div>
            <div class="ins-side">
              <p class="ins-legend"><span class="is-flow">Flujo normal</span><span class="is-abs">position: absolute</span></p>
              <ol class="ins-tree" aria-label="Estructura del componente en el DOM">${v.pieces.map(x => `
                <li><button type="button" data-target="${x.target}"><code>${esc(x.tag)}</code><small>${x.note}</small></button></li>`).join('')}
              </ol>
            </div>
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
    case 'chat': {
      const msg = (m: ChatMessage, i: number) => {
        if ('day' in m) return `<li class="msg-day" style="--i:${i}"><span>${m.day}</span></li>`
        const cls = `msg ${m.from === 'customer' ? 'is-out' : 'is-in'}`
        if ('ticket' in m) return `<li class="${cls} has-ticket" style="--i:${i}"><div class="ticket" role="img" aria-label="Foto de un ticket de servicio con datos ficticios"><b>${m.ticket.title}</b>${m.ticket.lines.map(l => `<span>${l}</span>`).join('')}</div>${m.text ? `<p>${m.text}</p>` : ''}</li>`
        if ('link' in m) return `<li class="${cls} has-link" style="--i:${i}"><div class="chat-link"><b>${m.link.title}</b><span>${m.link.text}</span></div></li>`
        return `<li class="${cls}" style="--i:${i}"><p>${m.text}</p>${m.buttons ? `<span class="msg-buttons">${m.buttons.map(b => `<span>${b}</span>`).join('')}</span>` : ''}</li>`
      }
      return `
        <figure class="v v-chat reveal">
          <div class="chat${v.dark ? ' is-dark' : ''}">
            <p class="chat-head">${v.logo ? `<img src="${root}${v.logo}" width="34" height="40" alt="">` : ''}<span><b>${v.business}</b><small>Cuenta de empresa</small></span></p>
            <ol class="chat-log" aria-label="Conversación de ejemplo">${v.messages.map(msg).join('')}</ol>
          </div>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    }
    case 'wa-slides':
      return `
        <figure class="v v-waslides reveal" data-slides>
          <div class="wa-phone">
            <div class="wa-screen">${v.slides.map((m, i) => `
              <img class="${i === 0 ? 'is-on' : ''}" src="${root}${m.src}" width="${m.width}" height="${m.height}" alt="${m.alt}" ${i ? 'loading="lazy" ' : ''}decoding="async">`).join('')}
            </div>
          </div>
          <ol class="wa-steps" aria-label="Pasos de la conversación">${v.slides.map((m, i) => `
            <li><button type="button" aria-pressed="${i === 0}" data-i="${i}"><span>${String(i + 1).padStart(2, '0')}</span>${m.caption}</button></li>`).join('')}
          </ol>
          <figcaption>${v.caption}</figcaption>
        </figure>`
    case 'flip-card':
      return `
        <figure class="v v-flip" data-flip>
          <div class="flip-sticky">
            <div class="flip-card" aria-hidden="true">
              <img class="flip-front" src="${root}${v.front.src}" width="${v.front.width}" height="${v.front.height}" alt="" decoding="async">
              <img class="flip-back" src="${root}${v.back.src}" width="${v.back.width}" height="${v.back.height}" alt="" decoding="async">
            </div>
            <ul class="flip-pains" aria-label="Problemas de la tarjeta física">${v.pains.map((p, i) => `<li style="--i:${i}">${p}</li>`).join('')}</ul>
            <p class="visually-hidden">${v.front.alt} ${v.back.alt}</p>
            <figcaption>${v.caption}</figcaption>
          </div>
        </figure>`
    case 'library':
      return `
        <figure class="v v-library reveal">
          <ul>${v.items.map((m, i) => `
            <li class="${m.wide ? 'is-wide' : ''}" style="--i:${i}">
              <div class="lib-img"><img src="${root}${m.src}" width="${m.width}" height="${m.height}" alt="${m.alt}" loading="lazy" decoding="async"></div>
              <p><b>${m.name}</b><span>${m.caption}</span></p>
            </li>`).join('')}</ul>
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
