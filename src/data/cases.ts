import type { CaseStudy } from '../types'
import { propagaMobile } from './stories/propaga-mobile'
import { italika } from './stories/italika'
import { prolana } from './stories/prolana'
import { propesos } from './stories/propesos'
import { banamex } from './stories/banamex'
import { banamexDs } from './stories/banamex-ds'

export const cases: CaseStudy[] = [
  { id: 'italika-lealtad', title: 'Italika · Lealtad por WhatsApp', summary: 'Un back office y un programa de lealtad que viven en WhatsApp para talleres autorizados Italika: del reporte semanal al sello automático.', story: italika },
  { id: 'propaga-mobile', title: 'Propaga Mobile', summary: 'Un tendero manejaba más de 20 IDs, uno por distribuidor. Su celular pasó a ser su identidad única.', story: propagaMobile },
  { id: 'prolana', title: 'ProLana', summary: 'De un MVP operado por WhatsApp a una solicitud self-service: de 7 a 1.5 minutos.', story: prolana },
  { id: 'propesos', title: 'Propesos · Loyalty program', summary: 'Un programa de lealtad de tres niveles para que el tendero llegara a la 4ª compra, medido contra un grupo de control.', story: propesos },
  { id: 'banamex-conciertos', title: 'Conciertos Privados · Citibanamex', summary: 'Canje de puntos y pago mixto para conciertos exclusivos: del programa ThankYou a todos los tarjetahabientes.', story: banamex },
  { id: 'banamex-design-system', title: 'Design system · Banamex', summary: 'Una marca hecha de piezas que encajan como LEGO, convertida en componentes con Auto Layout, variantes y properties.', story: banamexDs },
  { id: 'onboarding', title: 'Mixpanel · Onboarding', summary: 'La primera medición de producto: funnels, replays y drop-offs. −40% en tiempo de registro.', status: 'wip' },
  { id: 'recuperacion-de-registro', title: 'Recuperación de registro', summary: 'Si un tendero dejaba su registro a medias, le llegaba un mensaje justo en el paso donde se quedó.', status: 'wip' },
  { id: 'adquisicion', title: 'Adquisición', summary: 'Meta Ads, WhatsApp y SMS: +80% de usuarios en un mes y 70% de activación a la semana 3.', status: 'wip' },
]

export const caseHref = (id: string, root = './') => `${root}casos/${id}/`
