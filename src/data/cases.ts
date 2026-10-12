import type { CaseStudy } from '../types'
import { propagaMobile } from './stories/propaga-mobile'
import { prolana } from './stories/prolana'

export const cases: CaseStudy[] = [
  { id: 'propaga-mobile', title: 'Propaga Mobile', summary: 'Un tendero manejaba más de 20 IDs, uno por distribuidor. Su celular pasó a ser su identidad única.', story: propagaMobile },
  { id: 'prolana', title: 'ProLana', summary: 'De un MVP operado por WhatsApp a una solicitud self-service: de 7 a 1.5 minutos.', story: prolana },
  { id: 'propesos', title: 'Propesos', summary: 'Lealtad por niveles con reembolso de comisión: Bronce 8%, Plata 9%, Oro 10%.' },
  { id: 'onboarding', title: 'Mixpanel · Onboarding', summary: 'La primera medición de producto: funnels, replays y drop-offs. −40% en tiempo de registro.' },
  { id: 'recuperacion-de-registro', title: 'Recuperación de registro', summary: 'Si un tendero dejaba su registro a medias, le llegaba un mensaje justo en el paso donde se quedó.' },
  { id: 'adquisicion', title: 'Adquisición', summary: 'Meta Ads, WhatsApp y SMS: +80% de usuarios en un mes y 70% de activación a la semana 3.' },
]

export const caseHref = (id: string, root = './') => `${root}casos/${id}/`
