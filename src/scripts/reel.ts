// Activa la escena del paso que cruza el centro de la pantalla.
export function reel() {
  document.querySelectorAll<HTMLElement>('[data-reel]').forEach(root => {
    const steps = [...root.querySelectorAll<HTMLElement>('.r-step')]
    const groups = [steps, [...root.querySelectorAll('.scene')], [...root.querySelectorAll('.r-seq i')]]
    let current = -1
    const set = (i: number) => {
      if (i === current || i < 0) return
      current = i
      groups.forEach(list => list.forEach((el, k) => el.classList.toggle('is-active', k === i)))
    }
    // La primera escena arranca cuando el bloque entra en pantalla, no al cargar.
    const enter = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting && current < 0) set(0) }), { threshold: 0.25 })
    enter.observe(root)
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) set(steps.indexOf(e.target as HTMLElement)) }),
      // En móvil el escenario ocupa la parte de arriba: el paso activo se lee abajo.
      { rootMargin: matchMedia('(max-width: 900px)').matches ? '-72% 0px -18% 0px' : '-45% 0px -45% 0px' },
    )
    steps.forEach(s => io.observe(s))
  })
}
