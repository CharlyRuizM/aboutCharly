// Gráficos de un caso. Todos son HTML/CSS, sin librerías.
export type Visual =
  | { type: 'chips'; title: string; items: string[] } // red de marcas o distribuidores
  | { type: 'ids'; store: string; note: string; items: { dist: string; id: string }[] } // una tienda, muchos IDs
  | { type: 'phone'; ids: string[]; label: string; phone: string } // muchos IDs → un número
  | { type: 'identity'; store: string; phone: string; dists: string[]; ids: string[] } // antes / después
  | { type: 'steps'; steps: string[] } // flujo en pasos
  | { type: 'shot'; src: string; width: number; height: number; alt: string; caption: string } // captura (ruta en public/)

export type CaseSection = {
  id: string
  label: string // etiqueta corta para el índice (Contexto, Problema…)
  heading: string // admite <em> para el énfasis en itálica
  body: string[] // párrafos; admiten <b> y <em>
  options?: { name: string; verdict: 'Elegida' | 'Descartada'; reason: string }[] // alternativas evaluadas
  visuals?: Visual[]
  list?: { title: string; items: string[] } // lista corta (p. ej. métricas)
  after?: string[] // párrafos al final de la sección
  pending?: string[] // preguntas por responder; se muestran como nota mientras existan
}

export type CaseStory = {
  tagline: string
  meta: { label: string; value: string }[]
  highlights: { label: string; text: string }[] // resumen que aparece en la home
  cover?: Extract<Visual, { type: 'shot' }> // imagen del resumen en la home
  sections: CaseSection[]
  beforeAfter?: { before: string; after: string; line: string }
  media?: { label: string } // espacio reservado para la animación del caso
}

export type CaseStudy = {
  id: string
  title: string
  summary: string
  story?: CaseStory // si existe, el caso tiene página propia en /casos/<id>/
}
