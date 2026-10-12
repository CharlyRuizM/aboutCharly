import type { CaseStory, ReelImage } from '../../types'

const P = 'cases/prolana/'
const shot = (name: string, width: number, height: number, alt: string, kind: ReelImage['kind'] = 'screen'): ReelImage =>
  ({ src: `${P}${name}.webp`, width, height, alt, kind })

const WA_OFERTA = shot('wa-oferta', 540, 907, 'MVP en WhatsApp: Propaga ofrece un crédito en efectivo preaprobado con las opciones "Sí, me interesa", "Quiero más información" y "No, gracias".')
const WA_MONTO = shot('wa-monto', 540, 907, 'MVP en WhatsApp: el tendero solo puede elegir entre tres montos, $4,000, $3,000 o $2,000.')
const WA_CLABE = shot('wa-clabe', 540, 907, 'MVP en WhatsApp: el flujo pide la CLABE por mensaje y no la reconoce cuando el tendero escribe otra cosa.')
const WA_CONFIRMAR = shot('wa-confirmar', 540, 907, 'MVP en WhatsApp: confirmación final con monto, términos, tasa de 6% + IVA y pago a 15 días.')
const FLOW_CLABE = shot('flow-clabe', 480, 571, 'WhatsApp con Meta Flows: formulario para ingresar la CLABE.')
const FLOW_MONTO = shot('flow-monto', 480, 571, 'WhatsApp con Meta Flows: formulario para ingresar el monto del desembolso. La CLABE aparece difuminada.')
const FLOW_CONFIRMAR = shot('flow-confirmar', 480, 571, 'WhatsApp con Meta Flows: resumen del desembolso para confirmar. La CLABE aparece difuminada.')
const WEB_MONTO = shot('web-monto', 360, 807, 'Portal web: "¿Cuánto quieres pedir hoy?" con un control para elegir el monto hasta $10,000 y el desglose del costo.')
const WEB_CLABE = shot('web-clabe', 360, 685, 'Portal web: formulario para la cuenta de depósito con CLABE y banco, y el aviso de que la cuenta debe estar a nombre del tendero.')
const WEB_LISTO = shot('web-listo', 360, 810, 'Portal web: "Listo. Estamos procesando tu depósito" con el desglose del crédito y el destino del depósito.')

const g = (m: ReelImage, caption: string) => ({ src: m.src, width: m.width, height: m.height, alt: m.alt, caption })

// Textos basados en las respuestas de Carlos y en las capturas del MVP, los Meta Flows y el portal web.
export const prolana: CaseStory = {
  tagline: 'De un chat de WhatsApp a <em>efectivo en minutos.</em>',
  meta: [
    { label: 'Rol', value: 'Product Manager' },
    { label: 'Producto', value: 'ProLana · crédito en efectivo' },
    { label: 'Equipo', value: 'Tech, Ops, Datos y Riesgos' },
    { label: 'Canal', value: 'WhatsApp → portal web' },
  ],
  reel: [
    {
      label: 'Problema',
      text: 'El crédito solo servía con un distribuidor, y pedir efectivo era un chat de WhatsApp que se rompía.',
      visual: { type: 'screens', images: [WA_OFERTA, WA_CLABE] },
    },
    {
      label: 'Decisión',
      text: 'Llevar la solicitud al portal web que ya existía: monto exacto y CLABE validada y guardada.',
      visual: { type: 'screens', images: [WEB_MONTO, WEB_CLABE] },
    },
    {
      label: 'Ejecución',
      text: 'Con Tech, Ops y Riesgos definimos montos, plazo y tasa, y automatizamos la dispersión.',
      visual: { type: 'screens', images: [WEB_LISTO] },
    },
    {
      label: 'Impacto',
      text: 'Solicitudes más rápidas y efectivo en la cuenta en minutos, no al día siguiente.',
      visual: { type: 'metric', items: [
        { label: 'Tiempo de solicitud', before: '7:00', after: '1:30' },
        { label: 'Llegada del depósito', before: '24 h', after: '15 min' },
      ] },
    },
  ],
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'El crédito servía para comprar, <em>pero solo a un distribuidor.</em>',
      body: [
        'Al inicio Propaga solo otorgaba crédito en producto, y cada línea estaba atada a un distribuidor: si el tendero tenía crédito con Grupo Modelo, solo podía usarlo para comprarle a Grupo Modelo.',
        'ProLana nació para que, con esa misma línea, el tendero pudiera pedir <b>efectivo</b> y seguir surtiendo su tienda. También buscaba que el producto se usara más, porque el uso dependía de un solo distribuidor. Todo esto pasó antes de la app móvil.',
      ],
      visuals: [{ type: 'chips', title: 'ProLana en corto', items: ['Hasta $15,000 de su disponible', 'Pago en 15 días', 'Tasa de 6% + IVA', 'Depósito a una cuenta a su nombre'] }],
    },
    {
      id: 'problema',
      label: 'Problema',
      heading: 'Un MVP en WhatsApp que <em>se rompía con facilidad.</em>',
      body: [
        'El MVP era un flujo de WhatsApp: el tendero respondía paso a paso si quería el crédito, elegía uno de tres montos, mandaba su CLABE y aceptaba las condiciones. Tomaba unos <b>7 minutos</b>, medidos desde que iniciaba la solicitud hasta que la terminaba.',
      ],
      visuals: [{
        type: 'gallery',
        caption: 'MVP en WhatsApp · cuenta de pruebas',
        images: [g(WA_OFERTA, 'Oferta'), g(WA_MONTO, 'Tres montos'), g(WA_CLABE, 'CLABE por mensaje'), g(WA_CONFIRMAR, 'Confirmación')],
      }],
      list: {
        title: 'Lo que fallaba',
        items: [
          'Si mandaba un número de tarjeta en lugar de la CLABE, el flujo no lo detectaba.',
          'No se validaba el crédito disponible: si ese día ya lo había usado, podía pedir más de lo que tenía.',
          'No se validaba que la CLABE estuviera a su nombre, lo que abría la puerta a fraudes.',
          'La CLABE no se guardaba: había que escribirla cada vez.',
          'Solo había tres montos posibles, según su línea.',
        ],
      },
      after: [
        'Además, nada caía a una base de datos. Las solicitudes se capturaban en Excel y las dispersiones se hacían a mano, con un corte al día: el tendero recibía su dinero hasta <b>24 horas después</b>. Esa carga recaía en Ops, el equipo que también atendía las dudas de los clientes, y a veces los tenderos le pedían a soporte que hiciera la solicitud por ellos.',
      ],
    },
    {
      id: 'decision',
      label: 'Decisión',
      heading: 'Del chat <em>al portal que ya existía.</em>',
      body: ['Antes de llegar a la versión final, probamos un paso intermedio dentro del mismo WhatsApp.'],
      options: [
        { name: 'Chat de WhatsApp (MVP)', verdict: 'Descartada', reason: 'Frágil: no interpretaba bien las respuestas, no validaba nada y todo terminaba en Excel.' },
        { name: 'WhatsApp con Meta Flows', verdict: 'Paso intermedio', reason: 'Automatizó una parte, porque se conectaba a nuestra base de datos para consultar el límite disponible. Pero no podía guardar la CLABE.' },
        { name: 'Portal web del usuario', verdict: 'Elegida', reason: 'Ya existía y el tendero solo tenía que entrar. Permitía guardar la CLABE, elegir el monto exacto y validar todo antes de dispersar.' },
      ],
      visuals: [{
        type: 'gallery',
        caption: 'Paso intermedio · WhatsApp con Meta Flows (CLABE difuminada)',
        images: [g(FLOW_CLABE, 'CLABE'), g(FLOW_MONTO, 'Monto'), g(FLOW_CONFIRMAR, 'Confirmación')],
      }],
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      heading: 'Un flujo corto, <em>validado de punta a punta.</em>',
      body: [
        'En el portal, el tendero elige la cantidad exacta en múltiplos de $100, hasta su disponible. La primera vez escribe su CLABE, que se valida en formato y longitud, y nuestro proveedor de dispersiones confirma que la cuenta esté a su nombre. Después la CLABE queda guardada y la siguiente solicitud es todavía más corta.',
        'La dispersión se volvió automática: el efectivo llega en <b>menos de 15 minutos</b>.',
      ],
      visuals: [{
        type: 'gallery',
        caption: 'Portal web · monto, cuenta y confirmación',
        images: [g(WEB_MONTO, 'Monto exacto'), g(WEB_CLABE, 'CLABE a su nombre'), g(WEB_LISTO, 'Depósito en proceso')],
      }],
      after: [
        'Trabajé directamente con Tech, Ops y el equipo de Datos y Riesgos. Con ellos definimos montos, plazo y, sobre todo, la tasa, y monitoreamos las cohortes de pago y la mora por tratarse de un producto nuevo.',
        'Para validar, analizamos las conversaciones de WhatsApp en las que el tendero pedía efectivo: en qué punto abandonaba y cuánto tardaba.',
      ],
    },
    {
      id: 'impacto',
      label: 'Impacto',
      heading: 'De 7 minutos y un Excel <em>a efectivo en minutos.</em>',
      body: ['El tendero ya podía pedir su efectivo solo, sin depender de soporte, y Ops dejó de capturar y dispersar a mano.'],
      visuals: [
        { type: 'metrics', items: [
          { label: 'Tiempo de solicitud', before: '7 min', after: '1.5 min' },
          { label: 'Llegada del depósito', before: 'hasta 24 h', after: '< 15 min' },
          { label: 'Monto a elegir', before: '3 opciones', after: 'exacto' },
        ] },
        { type: 'compare', columns: ['MVP en WhatsApp', 'Portal web'], rows: [
          { label: 'CLABE', before: 'No se validaba', after: 'Formato, longitud y titular' },
          { label: 'Crédito disponible', before: 'No se validaba', after: 'Se consulta antes de dispersar' },
          { label: 'Datos del tendero', before: 'Se pedían cada vez', after: 'La CLABE se guarda' },
          { label: 'Registro', before: 'Excel', after: 'Base de datos' },
          { label: 'Dispersión', before: 'Manual, un corte al día', after: 'Automática' },
        ] },
      ],
      pending: [
        '¿En qué año o trimestre fue?',
        '¿Hay datos de volumen o adopción (solicitudes por semana, % de tenderos que repiten), de cuánto bajó la carga de Ops o de cómo se comportó la mora?',
      ],
    },
  ],
  beforeAfter: { before: '7 min', after: '1.5 min', line: 'Solicitud de efectivo · de WhatsApp al portal web' },
}
