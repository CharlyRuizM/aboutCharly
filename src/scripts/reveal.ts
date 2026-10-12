// Muestra los elementos .reveal cuando entran en pantalla (una sola vez).
// Sin JS o con movimiento reducido, todo se ve desde el inicio.
export function reveal() {
  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) return els.forEach(el => el.classList.add('is-visible'))
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return
      e.target.classList.add('is-visible')
      io.unobserve(e.target)
    }),
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  )
  els.forEach(el => io.observe(el))
}
