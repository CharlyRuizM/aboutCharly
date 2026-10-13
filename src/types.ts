// Curva de retención ilustrativa (sin cifras) y niveles de un programa
export type CurveVisual = { type: 'curve'; caption: string; drops: { at: number; label: string }[]; threshold: { at: number; label: string }; bands?: { name: string; from: number; to: number }[] }
export type TiersVisual = { type: 'tiers'; items: { name: string; range: string; reward: string; note: string }[] }

// Gráficos de un caso. Todos son HTML/CSS, sin librerías.
export type Visual =
  | CurveVisual
  | TiersVisual
  | { type: 'chips'; title: string; items: string[] } // red de marcas o distribuidores
  | { type: 'ids'; store: string; note: string; items: { dist: string; id: string }[] } // una tienda, muchos IDs
  | { type: 'phone'; ids: string[]; label: string; phone: string } // muchos IDs → un número
  | { type: 'identity'; store: string; phone: string; dists: string[]; ids: string[] } // antes / después
  | { type: 'steps'; steps: string[] } // flujo en pasos
  | { type: 'shot'; src: string; width: number; height: number; alt: string; caption: string } // captura (ruta en public/)
  | { type: 'gallery'; caption: string; images: { src: string; width: number; height: number; alt: string; caption: string }[] } // varias capturas
  | { type: 'metrics'; items: { label: string; before: string; after: string }[] } // cifras antes → después
  | { type: 'compare'; columns: [string, string]; rows: { label: string; before: string; after: string }[] } // tabla antes / después

export type ReelImage = { src: string; width: number; height: number; alt: string; kind: 'phone' | 'desktop' | 'screen' } // screen: captura sin marco

// Escenas del resumen narrativo de la home
export type ReelScene = {
  label: string
  text: string
  visual:
    | { type: 'burst'; store: string; ids: string[]; count: string } // una tienda, muchos IDs
    | { type: 'converge'; ids: string[]; label: string; phone: string } // los IDs se vuelven un número
    | { type: 'screens'; images: ReelImage[] } // una o dos pantallas del producto
    | { type: 'metric'; items: { label: string; before: string; after: string }[] } // cifras antes → después
    | CurveVisual
    | TiersVisual
}

export type CaseSection = {
  id: string
  label: string // etiqueta corta para el índice (Contexto, Problema…)
  heading: string // admite <em> para el énfasis en itálica
  body: string[] // párrafos; admiten <b> y <em>
  options?: { name: string; verdict: 'Elegida' | 'Paso intermedio' | 'Roadmap' | 'Descartada'; reason: string }[] // alternativas evaluadas
  visuals?: Visual[]
  list?: { title: string; items: string[] } // lista corta (p. ej. métricas)
  after?: string[] // párrafos al final de la sección
  pending?: string[] // preguntas por responder; se muestran como nota mientras existan
}

export type CaseStory = {
  tagline: string
  meta: { label: string; value: string }[]
  reel: ReelScene[] // resumen narrativo en la home, una escena por paso
  sections: CaseSection[]
  beforeAfter?: { before: string; after: string; line: string }
  media?: { label: string } // espacio reservado para la animación del caso
}

export type CaseStudy = {
  id: string
  title: string
  summary: string
  story?: CaseStory // si existe, el caso tiene página propia en /casos/<id>/
  status?: 'wip' // en progreso: se muestra en la lista solo con título y una línea
}
