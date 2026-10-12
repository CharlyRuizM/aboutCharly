import type { CaseStory, Visual } from '../../types'

const SHOT: Extract<Visual, { type: 'shot' }> = {
  type: 'shot',
  src: 'cases/propaga-mobile/generar-orden.webp',
  width: 1547,
  height: 930,
  alt: 'Portal del distribuidor Mayco en Propaga: pantalla "Generar orden" con un campo para el número de cliente o celular a 10 dígitos y el monto de la orden.',
  caption: 'Portal del distribuidor · el pedido se levanta con el ID o con el celular',
}
const IDS = ['847291', '391842', '000583311', 'C-10284', '55-0192-7', 'TND-882']

// Textos basados en la narrativa de la animación del caso y en las respuestas de Carlos.
export const propagaMobile: CaseStory = {
  tagline: 'De más de 20 IDs a <em>un solo número.</em>',
  meta: [
    { label: 'Rol', value: 'Product Manager' },
    { label: 'Producto', value: 'Primera app móvil de Propaga' },
    { label: 'Equipo', value: 'Producto + Tech' },
    { label: 'Fecha', value: 'Q3 2026' },
  ],
  media: { label: 'Animación del caso · 40 s' },
  highlights: [
    { label: 'Problema', text: 'Un tendero manejaba más de 20 IDs, uno por distribuidor, para poder usar su crédito.' },
    { label: 'Decisión', text: 'Usar su número celular como identidad única en toda la red.' },
    { label: 'Ejecución', text: 'Primera app móvil de Propaga, con el objetivo de lanzar en 3 meses.' },
    { label: 'Impacto', text: 'Crédito con cualquier distribuidor, no solo con el que lo registró.' },
  ],
  cover: {
    ...SHOT,
    src: 'cases/propaga-mobile/generar-orden-detalle.webp',
    width: 810,
    height: 570,
    alt: 'Detalle del portal del distribuidor: el campo para levantar un pedido acepta el número de cliente o el celular a 10 dígitos.',
  },
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Una tiendita no le compra a <em>un solo distribuidor.</em>',
      body: [
        'Refrescos, lácteos, botanas y galletas llegan por rutas distintas: Grupo Modelo, Nestlé, Mondelez, Jumex, mayoristas regionales y distribuidores locales.',
        'Propaga se asoció con esos distribuidores. Recibía su base de tiendas y la analizaba con modelos de riesgo para ofrecer <b>crédito preaprobado</b> a los tenderos.',
      ],
      visuals: [{ type: 'chips', title: 'Algunas marcas y distribuidores de la red', items: ['Grupo Modelo', 'Nestlé', 'Mondelez', 'Jumex', 'Mayco', 'Surtace', 'La Gran Bodega'] }],
    },
    {
      id: 'problema',
      label: 'Problema',
      heading: 'Una misma tienda, <em>un ID distinto</em> en cada distribuidor.',
      body: [
        'Cada distribuidor registraba a la tienda por su cuenta, con su propio ID de cliente y su propio historial de compras. El crédito quedaba atado a ese ID.',
        'Un tendero podía trabajar con <b>más de 20 distribuidores</b> y tenía que recordar qué ID correspondía a cada uno para poder usar su crédito. Eso generaba fricción y errores en cada compra.',
      ],
      visuals: [{
        type: 'ids',
        store: 'Abarrotes Lupita',
        note: 'Ejemplo ilustrativo · una misma tienda, un ID por distribuidor',
        items: IDS.map((id, i) => ({ dist: `Distribuidor ${String.fromCharCode(65 + i)}`, id })),
      }],
    },
    {
      id: 'insight',
      label: 'Insight',
      heading: 'Había un dato que <em>todo tendero ya conocía.</em>',
      body: ['Su número celular. No había que inventar ni enseñar un identificador nuevo: ya lo usaban todos los días.'],
      visuals: [{ type: 'phone', ids: IDS, label: 'Número celular', phone: '55 8347 1920' }],
    },
    {
      id: 'decision',
      label: 'Decisión',
      heading: 'El celular se volvió <em>la identidad única</em> del tendero.',
      body: ['Propaga centralizó la identidad del cliente en un solo número. Antes de elegirlo evaluamos otras opciones:'],
      options: [
        { name: 'ID propio de Propaga', verdict: 'Descartada', reason: 'Iba a confundir: muchos tenderos no distinguían a Propaga del distribuidor y creían que el crédito era de la marca, no de un tercero.' },
        { name: 'CURP', verdict: 'Descartada', reason: 'Demasiado larga para recordarla en cada compra.' },
        { name: 'Código QR', verdict: 'Descartada', reason: 'La adopción iba a ser difícil: en México el QR no se usa tanto como en otros mercados, como China.' },
        { name: 'Número celular', verdict: 'Elegida', reason: 'Ya lo conocen, lo usan a diario y no hay que enseñarlo.' },
      ],
      visuals: [{ type: 'identity', store: 'Abarrotes Lupita', phone: '55 8347 1920', dists: ['Distribuidor A', 'Distribuidor B', 'Distribuidor C'], ids: IDS.slice(0, 3) }],
      after: [
        'El celular también traía su fricción: <b>los cambios de número.</b> La resolvimos automatizando el proceso: el tendero ingresa su nuevo número y valida su identidad con un KYC.',
      ],
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      heading: 'Tres meses, <em>de la tienda al rollout.</em>',
      body: [
        'El objetivo era lanzar en tres meses. Trabajé con mi equipo de producto, sobre todo con mi Head of Product, y con Tech para definir el alcance técnico, los tiempos y las prioridades.',
        'Para validar, hicimos <b>entrevistas en persona</b> con tenderos que ya eran clientes y con otros que todavía no lo eran.',
        'Mi parte fue diseñar el flujo de registro, la forma de pago y el cross-selling, y priorizar las tareas de los equipos de product design y Tech. El resultado: comprar a crédito en tres pasos, con cualquier distribuidor de la red.',
      ],
      visuals: [
        { type: 'steps', steps: ['Da su celular', 'Confirma la compra', 'Usa su crédito'] },
        SHOT,
      ],
    },
    {
      id: 'impacto',
      label: 'Impacto',
      heading: 'Ya no hacía falta registrarse <em>con cada distribuidor.</em>',
      body: [
        'Para activar su crédito bastaba con su número. El crédito dejó de estar limitado al distribuidor que originó al cliente, lo que eliminó una restricción del modelo y abrió <b>oportunidades de cross-selling</b> entre distribuidores.',
      ],
      list: {
        title: 'Cómo medimos el éxito',
        items: [
          'Descargas y uso de la app.',
          'Tiempo de registro.',
          'Tenderos que usan su crédito con un distribuidor distinto al que los originó.',
        ],
      },
      after: [
        'El lanzamiento fue gradual. En esta primera versión la prioridad del rollout era encontrar y corregir la mayor cantidad de bugs lo antes posible.',
      ],
      pending: ['Resultados del rollout cuando los tengas: descargas, tiempo de registro y % de tenderos que usan su crédito con otro distribuidor.'],
    },
  ],
  beforeAfter: { before: '20+ IDs', after: '1 número', line: 'Un tendero · un número · varios distribuidores' },
}
