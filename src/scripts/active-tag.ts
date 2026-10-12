// Marca el link del caso o sección que está en pantalla.
export function activeLinks(linkSelector: string, targetSelector: string) {
  const links = [...document.querySelectorAll<HTMLAnchorElement>(linkSelector)]
  if (!links.length) return
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      links.forEach(l => {
        const on = l.hash === `#${e.target.id}`
        l.classList.toggle('is-active', on)
        if (on) l.setAttribute('aria-current', 'true')
        else l.removeAttribute('aria-current')
      })
    }),
    { rootMargin: '-30% 0px -60% 0px' },
  )
  document.querySelectorAll(targetSelector).forEach(t => io.observe(t))
}
