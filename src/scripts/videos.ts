// Videos en loop: se pausan fuera de pantalla y, con movimiento reducido, no se reproducen solos.
export function videos() {
  const list = [...document.querySelectorAll<HTMLVideoElement>('video[data-loop]')]
  if (!list.length) return
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    list.forEach(v => { v.pause(); v.removeAttribute('autoplay'); v.controls = true })
    return
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target as HTMLVideoElement
    if (e.isIntersecting) v.play().catch(() => { v.controls = true })
    else v.pause()
  }), { threshold: 0.2 })
  list.forEach(v => io.observe(v))
}
