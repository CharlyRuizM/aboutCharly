// Interacciones del caso de design system. Sin JS, todo se ve estático y completo.
export function ds() {
  // Deslizador antes / después, con pestañas por pantalla
  document.querySelectorAll<HTMLElement>('[data-swipe]').forEach(fig => {
    const stage = fig.querySelector<HTMLElement>('.swipe-stage')!
    const range = fig.querySelector<HTMLInputElement>('.swipe-range')!
    const set = () => stage.style.setProperty('--pos', `${range.value}%`)
    range.addEventListener('input', set)
    set()
    const tabs = [...fig.querySelectorAll<HTMLButtonElement>('.swipe-tabs button')]
    const items = [...fig.querySelectorAll<HTMLElement>('.swipe-item')]
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => x.setAttribute('aria-selected', String(i === j)))
      items.forEach((x, j) => x.classList.toggle('is-active', i === j))
    }))
  })

  // Armar / desarmar la tarjeta
  document.querySelectorAll<HTMLButtonElement>('[data-apart]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('figure')!.querySelector('.dsc')!
    const apart = card.classList.toggle('is-apart')
    btn.setAttribute('aria-pressed', String(apart))
  }))

  // Panel de properties: cada control cambia un atributo o un texto del componente
  document.querySelectorAll<HTMLElement>('[data-play]').forEach(fig => {
    const card = fig.querySelector<HTMLElement>('.dsc')!
    const form = fig.querySelector<HTMLFormElement>('.ds-panel')!
    form.addEventListener('input', e => {
      const el = e.target as HTMLInputElement | HTMLSelectElement
      if (el instanceof HTMLInputElement && el.type === 'checkbox') card.dataset[el.name] = String(el.checked)
      else if (el instanceof HTMLSelectElement) card.dataset[el.name] = el.value
      else card.querySelector(`[data-prop="${el.name}"]`)!.textContent = el.value || ' '
    })
  })

  // Modos de tokens
  document.querySelectorAll<HTMLElement>('[data-tokens]').forEach(fig => {
    const btns = [...fig.querySelectorAll<HTMLButtonElement>('.ds-modes button')]
    btns.forEach(b => b.addEventListener('click', () => {
      fig.dataset.mode = b.dataset.mode
      btns.forEach(x => x.setAttribute('aria-checked', String(x === b)))
    }))
  })

  // Inspector del modelo de caja
  document.querySelectorAll<HTMLElement>('[data-inspect]').forEach(fig => {
    const card = fig.querySelector<HTMLElement>('.dsc')!
    const stage = fig.querySelector<HTMLElement>('.ins-stage')!
    const tip = fig.querySelector<HTMLElement>('.ins-tip')!
    fig.querySelectorAll<HTMLButtonElement>('button[data-ins]').forEach(b => b.addEventListener('click', () => {
      const on = card.classList.toggle(b.dataset.ins === 'flow' ? 'is-flow' : 'is-boxes')
      b.setAttribute('aria-pressed', String(on))
      clear()
    }))
    const range = fig.querySelector<HTMLInputElement>('input[data-ins="width"]')!
    const out = fig.querySelector('output')!
    range.addEventListener('input', () => { card.style.setProperty('--cw', `${range.value}px`); out.textContent = `${range.value} px`; clear() })

    const clear = () => { card.querySelectorAll('.is-hl').forEach(x => x.classList.remove('is-hl')); tip.classList.remove('is-on') }
    const show = (btn: HTMLButtonElement) => {
      clear()
      const els = [...card.querySelectorAll<HTMLElement>(btn.dataset.target!)]
      if (btn.dataset.target === '.dsc') els.push(card)
      if (!els.length) return
      els.forEach(x => x.classList.add('is-hl'))
      const el = els[0], r = el.getBoundingClientRect(), s = stage.getBoundingClientRect()
      const pos = getComputedStyle(el).position
      tip.textContent = `${btn.querySelector('code')!.textContent} · ${Math.round(r.width)} × ${Math.round(r.height)} · ${pos}`
      tip.classList.add('is-on')
      tip.style.left = `${Math.max(8, Math.min(r.left - s.left, s.width - tip.offsetWidth - 8))}px`
      tip.style.top = `${Math.min(r.bottom - s.top + 8, s.height - 34)}px`
      tip.classList.add('is-on')
    }
    fig.querySelectorAll<HTMLButtonElement>('.ins-tree button').forEach(b => {
      b.addEventListener('mouseenter', () => show(b))
      b.addEventListener('focus', () => show(b))
      b.addEventListener('click', () => show(b))
      b.addEventListener('mouseleave', clear)
      b.addEventListener('blur', clear)
    })
  })
}
