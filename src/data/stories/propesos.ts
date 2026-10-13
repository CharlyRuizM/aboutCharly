import type { CaseStory, CurveVisual, ReelImage, TiersVisual } from '../../types'

const P = 'cases/propesos/'
const shot = (name: string, width: number, height: number, alt: string): ReelImage => ({ src: `${P}${name}.webp`, width, height, alt, kind: 'screen' })
const g = (m: ReelImage, caption: string) => ({ src: m.src, width: m.width, height: m.height, alt: m.alt, caption })

const HOME_BRONCE = shot('home-bronce', 375, 751, 'App de Propaga: banner de Nivel Bronce "Primeras compras" invitando a ganar Propesos, con el nuevo acceso a Propesos.')
const HOME_PROGRESO = shot('home-progreso', 375, 751, 'App de Propaga: el banner de Nivel Bronce muestra el avance, "Llevas 1 de 4 compras".')
const PROGRAMA = shot('programa', 360, 1245, 'Pantalla del programa de lealtad: Nivel Plata, Propesos acumulados, avance hacia Oro, ejemplo de cómo se ganan y preguntas frecuentes.')
const PAGAR = shot('pagar-con-propesos', 390, 780, 'Pantalla de pago: el tendero puede usar sus Propesos disponibles como descuento en su pago.')
const MENU = shot('menu-nivel', 288, 600, 'Menú de la app con el saldo disponible, el nivel Bronce y los Propesos acumulados.')

const CURVE: CurveVisual = {
  type: 'curve',
  caption: 'Ilustrativo · las cifras reales son confidenciales',
  drops: [{ at: 1, label: 'Abandono tras la 1ª' }, { at: 3, label: 'Abandono tras la 3ª' }],
  threshold: { at: 4, label: 'Rentable y mejor pagador desde la 4ª' },
  bands: [{ name: 'Bronce', from: 1, to: 5 }, { name: 'Plata', from: 6, to: 10 }, { name: 'Oro', from: 11, to: 99 }],
}

const TIERS: TiersVisual = {
  type: 'tiers',
  items: [
    { name: 'Bronce', range: 'Transacciones 1 a 5', reward: '8%', note: 'Acumula Propesos; todavía no los puede usar.' },
    { name: 'Plata', range: '6 a 10, pagadas a tiempo', reward: '9%', note: 'Ya puede usarlos como descuento en sus pagos.' },
    { name: 'Oro', range: 'Después de la 10', reward: '10%', note: 'La mejor devolución del programa.' },
  ],
}

// Textos basados en las respuestas de Carlos y en las capturas del programa.
export const propesos: CaseStory = {
  tagline: 'Un programa de lealtad para que el tendero <em>llegara a la 4ª compra.</em>',
  meta: [
    { label: 'Rol', value: 'Product Manager' },
    { label: 'Producto', value: 'Propesos · programa de lealtad' },
    { label: 'Equipo', value: 'Head of Product, Product Design, Tech, Datos' },
    { label: 'Lanzamiento', value: 'Por grupos, con feature flags' },
  ],
  reel: [
    { label: 'Problema', text: 'Los tenderos abandonaban después de su 1ª y su 3ª compra, y el negocio necesitaba que llegaran a la 4ª.', visual: CURVE },
    { label: 'Decisión', text: 'Tres niveles que devuelven en Propesos un porcentaje de la comisión pagada.', visual: TIERS },
    { label: 'Ejecución', text: 'Se ganan en cada pedido pagado y, desde Plata, se usan como descuento en sus pagos.', visual: { type: 'screens', images: [PROGRAMA, PAGAR] } },
    { label: 'Medición', text: 'Lo lanzamos por grupos con feature flags y lo medimos contra un grupo de control.', visual: { type: 'screens', images: [HOME_PROGRESO, MENU] } },
  ],
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Un producto sin nada que <em>premiara la constancia.</em>',
      body: [
        'El producto no tenía ninguna funcionalidad de retención. En encuestas, los tenderos decían que no se les valoraba el uso que le daban, aunque ya llevaran tiempo usándolo.',
      ],
    },
    {
      id: 'problema',
      label: 'Problema',
      heading: 'Se iban justo <em>antes de volverse rentables.</em>',
      body: [
        'Revisando con el equipo de Datos encontramos dos momentos de abandono: después de la <b>primera</b> transacción y después de la <b>tercera</b>.',
        'Y para el negocio, un tendero se volvía rentable, y más propenso a ser buen pagador, a partir de la <b>cuarta</b>. El reto era acompañarlo justo en ese tramo.',
      ],
      visuals: [CURVE],
    },
    {
      id: 'decision',
      label: 'Decisión',
      heading: 'Tres niveles y <em>un reembolso de la comisión.</em>',
      body: [
        'Diseñamos un programa de lealtad de tres niveles. En cada uno, el tendero recibe de vuelta en Propesos un porcentaje de la <b>comisión pagada</b>, no del monto total del pedido. Por ejemplo, en un pedido de $5,000 con $200 de comisión, un tendero Bronce gana $16 en Propesos.',
        'Bronce cubre las primeras cinco transacciones, justo donde estaban los dos momentos de abandono.',
      ],
      visuals: [TIERS],
    },
    {
      id: 'trade-offs',
      label: 'Trade-offs',
      heading: 'Por qué un reembolso <em>y no otro beneficio.</em>',
      body: ['Evaluamos tres formas de premiar al tendero:'],
      options: [
        { name: 'Reembolso de la comisión', verdict: 'Elegida', reason: 'Era lo que podíamos probar más rápido, sin depender de otros partners.' },
        { name: 'Alianzas con partners', verdict: 'Roadmap', reason: 'Mejores precios en producto para tenderos de cierto nivel. Quedó planeado para una siguiente etapa.' },
        { name: 'Que el tendero elija su beneficio', verdict: 'Descartada', reason: 'Por ejemplo, extender el plazo de pago o una tasa menor. Para un primer lanzamiento era demasiado complejo.' },
      ],
    },
    {
      id: 'reglas',
      label: 'Reglas',
      heading: 'Reglas que <em>premian pagar a tiempo.</em>',
      body: ['Toda la mecánica gira alrededor del pago.'],
      visuals: [{ type: 'steps', steps: ['On hold', 'Disponibles', 'Usados como descuento'] }],
      list: {
        title: 'Cómo funciona',
        items: [
          'Los Propesos quedan <b>on hold</b> mientras el crédito está abierto: el tendero ve lo que va a ganar y se le liberan cuando paga.',
          'Solo se pueden usar a partir de <b>Plata</b>, como descuento en sus pagos.',
          'Si paga tarde no pierde su nivel, pero con 3 días de mora deja de ganar Propesos y a los 30 días pierde todos los acumulados.',
        ],
      },
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      heading: 'De las reglas de negocio <em>a la pantalla.</em>',
      body: ['Las reglas de negocio y el flujo los trabajé con mi Head of Product. Después los bajamos a los equipos de Product Design y Tech para implementarlos.'],
      visuals: [{
        type: 'gallery',
        caption: 'App de Propaga · Propesos',
        images: [g(HOME_BRONCE, 'Primer nivel'), g(HOME_PROGRESO, 'Avance a la siguiente meta'), g(PROGRAMA, 'Programa de lealtad'), g(PAGAR, 'Usar Propesos al pagar'), g(MENU, 'Nivel y saldo en el menú')],
      }],
    },
    {
      id: 'medicion',
      label: 'Medición',
      heading: 'Lanzarlo por grupos <em>para saber si funciona.</em>',
      body: ['No lo liberamos a toda la base. Con Tech implementamos feature flags para mostrarlo solo a ciertos grupos y compararlos contra un grupo de control durante dos meses, antes de abrirlo a todos.'],
      visuals: [{ type: 'steps', steps: ['Feature flag a un grupo', '2 meses contra un grupo de control', 'Liberar a toda la base'] }],
      list: {
        title: 'Qué medimos',
        items: [
          'Tiempo en llegar a la 4ª transacción, contra el grupo de control.',
          'Cuántos tenderos pasaban de la 1ª transacción.',
          'Uso de los Propesos: acumulados, usados y por vencer.',
        ],
      },
      pending: [
        '¿En qué año o trimestre fue?',
        '¿Hay resultados del experimento que puedas compartir, aunque sea en relativo (por ejemplo, cuánto más rápido llegaban a la 4ª compra)?',
      ],
    },
  ],
}
