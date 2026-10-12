export type CaseSection = {
  id: string
  label: string // etiqueta corta para el índice (Contexto, Problema…)
  heading: string // admite <em> para el énfasis en itálica
  body: string[] // párrafos; admiten <b> y <em>
  options?: { name: string; verdict: 'Elegida' | 'Descartada'; reason: string }[] // alternativas evaluadas
  after?: string[] // párrafos después de las alternativas
  list?: { title: string; items: string[] } // lista corta (p. ej. métricas)
  pending?: string[] // preguntas por responder; se muestran como nota mientras existan
}

export type CaseStory = {
  tagline: string
  meta: { label: string; value: string }[]
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
