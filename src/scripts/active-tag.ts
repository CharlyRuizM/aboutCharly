// Marca en la barra de tags el caso que está en pantalla.
export function activeTag() {
  const tags = [...document.querySelectorAll<HTMLAnchorElement>('.tag')]
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      tags.forEach(t => {
        const on = t.hash === `#${e.target.id}`
        t.classList.toggle('is-active', on)
        if (on) t.setAttribute('aria-current', 'true')
        else t.removeAttribute('aria-current')
      })
    }),
    { rootMargin: '-30% 0px -60% 0px' },
  )
  document.querySelectorAll('.case').forEach(c => io.observe(c))
}
