import type { CaseStory } from '../../types'

// Textos basados en la narrativa de la animación del caso (40 s, 10 escenas).
export const propagaMobile: CaseStory = {
  tagline: 'De más de 20 IDs a <em>un solo número.</em>',
  meta: [
    { label: 'Rol', value: 'Product Manager' },
    { label: 'Producto', value: 'Primera app móvil de Propaga' },
    { label: 'Modelo', value: 'Crédito B2B2C' },
  ],
  media: { label: 'Animación del caso · 40 s' },
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Una tiendita no le compra a <em>un solo distribuidor.</em>',
      body: [
        'Refrescos, lácteos, botanas y galletas llegan por rutas distintas: Grupo Modelo, Nestlé, Mondelez, Jumex, mayoristas regionales y distribuidores locales.',
        'Propaga se asoció con esos distribuidores. Recibía su base de tiendas y la analizaba con modelos de riesgo para ofrecer <b>crédito preaprobado</b> a los tenderos.',
      ],
    },
    {
      id: 'problema',
      label: 'Problema',
      heading: 'Una misma tienda, <em>un ID distinto</em> en cada distribuidor.',
      body: [
        'Cada distribuidor registraba a la tienda por su cuenta, con su propio ID de cliente y su propio historial de compras. El crédito quedaba atado a ese ID.',
        'Un tendero podía trabajar con <b>más de 20 distribuidores</b> y tenía que recordar qué ID correspondía a cada uno para poder usar su crédito. Eso generaba fricción y errores en cada compra.',
      ],
    },
    {
      id: 'insight',
      label: 'Insight',
      heading: 'Había un dato que <em>todo tendero ya conocía.</em>',
      body: ['Su número celular. No había que inventar ni enseñar un identificador nuevo: ya lo usaban todos los días.'],
    },
    {
      id: 'decision',
      label: 'Decisión',
      heading: 'El celular se volvió <em>la identidad única</em> del tendero.',
      body: ['Propaga centralizó la identidad del cliente en un solo número. Los IDs de cada distribuidor siguieron existiendo, pero ya no eran lo que el tendero necesitaba recordar.'],
      pending: [
        '¿Qué alternativas evaluaron (ID propio de Propaga, CURP, QR) y por qué se descartaron?',
        '¿Qué riesgos traía el celular (números compartidos, cambios de número, fraude) y cómo se mitigaron?',
      ],
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      heading: 'Tres pasos para <em>usar su crédito.</em>',
      body: ['La primera app móvil de Propaga redujo la compra a crédito a tres pasos: el tendero da su celular, confirma la compra y usa su crédito, con cualquier distribuidor de la red.'],
      pending: [
        '¿Con quién trabajaste (equipo, distribuidores) y cuánto tomó?',
        '¿Cómo validaron la solución con tenderos antes de lanzarla?',
      ],
    },
    {
      id: 'impacto',
      label: 'Impacto',
      heading: 'Ya no hacía falta registrarse <em>con cada distribuidor.</em>',
      body: [
        'Para activar su crédito bastaba con su número. El crédito dejó de estar limitado al distribuidor que originó al cliente.',
        'Eso eliminó una restricción del modelo y abrió <b>oportunidades de cross-selling</b> entre distribuidores.',
      ],
      pending: ['¿Hay métricas que lo respalden (adopción, compras con más de un distribuidor, errores o tickets de soporte)?'],
    },
  ],
  beforeAfter: { before: '20+ IDs', after: '1 número', line: 'Un tendero · un número · varios distribuidores' },
}
