import type { CaseStory, ReelImage } from '../../types'

const P = 'cases/banamex-conciertos/'
const img = (name: string, width: number, height: number, alt: string, kind: ReelImage['kind']): ReelImage => ({ src: `${P}${name}.webp`, width, height, alt, kind })
const g = (m: ReelImage, caption: string) => ({ src: m.src, width: m.width, height: m.height, alt: m.alt, caption })

const LANDING = img('landing', 1280, 787, 'Conciertos Privados: portada con la cartelera de conciertos y el acceso exclusivo para ingresar.', 'desktop')
const CARTELERA = img('cartelera', 1019, 995, 'Conciertos Privados: cartelera con fechas, recintos y precio en puntos de cada concierto.', 'desktop')
const DETALLE = img('detalle', 951, 728, 'Conciertos Privados: detalle de un concierto con mapa de zonas, fecha, lugar y selección de boletos.', 'desktop')
const CANJE = img('canje', 640, 1000, 'Conciertos Privados: confirmación de canje exitoso con los boletos y los puntos canjeados. El folio y el código aparecen difuminados.', 'screen')

// Textos basados en el borrador del caso de Carlos.
export const banamex: CaseStory = {
  tagline: 'De un beneficio exclusivo <em>a toda la base de tarjetahabientes.</em>',
  meta: [
    { label: 'Rol', value: 'Product Designer · Fidelity Marketing' },
    { label: 'Cliente', value: 'Citibanamex' },
    { label: 'Producto', value: 'Web de canje de puntos y pago mixto' },
    { label: 'Año', value: '2024' },
  ],
  reel: [
    {
      label: 'Contexto',
      text: 'Citibanamex lanzó conciertos privados para clientes ThankYou, canjeables 100% con puntos.',
      visual: { type: 'screens', images: [LANDING] },
    },
    {
      label: 'Decisión',
      text: 'Para abrirlo a todos los tarjetahabientes, el login pasó a pedir solo el número de tarjeta.',
      visual: { type: 'screens', images: [CARTELERA, CANJE] },
    },
    {
      label: 'Impacto',
      text: 'Más del doble de personas lograron entrar al portal en su primer intento.',
      visual: { type: 'metric', items: [
        { label: 'Primer login exitoso', before: '25%', after: '57%' },
        { label: 'Rebote en el primer login', before: '75%', after: '43%' },
      ] },
    },
    {
      label: 'Escala',
      text: 'El segundo lanzamiento tuvo 2.6 veces más aforo y se canjeó más rápido.',
      visual: { type: 'metric', items: [
        { label: 'Butacas', before: '3,150', after: '8,200' },
        { label: 'Tiempo de canje', before: '', after: '−22%' },
      ] },
    },
  ],
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Un banco que quería <em>reforzar su entretenimiento.</em>',
      body: [
        'En 2024, Citibanamex quería reforzar su oferta de entretenimiento después de separarse de su principal socio. Desde Fidelity Marketing, como Product Designer en un equipo multidisciplinario, lanzamos Conciertos Privados: una plataforma web y móvil para conseguir boletos de conciertos exclusivos con puntos.',
        'El primer lanzamiento fue <b>The Killers</b>, solo para clientes ThankYou y con canje 100% en puntos.',
      ],
    },
    {
      id: 'oportunidad',
      label: 'Oportunidad',
      heading: 'Había demanda <em>fuera de ThankYou.</em>',
      body: [
        'El primer lanzamiento funcionó y dejó ver una demanda que el programa no cubría. Abrirlo a todos los tarjetahabientes nos daba más usuarios, más aforo y más visibilidad para la marca.',
        'El reto era doble: que cualquier tarjetahabiente sintiera que el beneficio también era para él, y que se entendiera el nuevo modelo híbrido de <b>puntos + pago con tarjeta</b>.',
      ],
      visuals: [{ type: 'compare', columns: ['The Killers', 'Alejandro Sanz'], rows: [
        { label: 'Público', before: 'Clientes ThankYou', after: 'Todos los tarjetahabientes' },
        { label: 'Forma de pago', before: '100% con puntos', after: 'Puntos + pago con tarjeta' },
        { label: 'Butacas', before: '3,150', after: '8,200' },
      ] }],
    },
    {
      id: 'decision',
      label: 'Decisión',
      heading: 'Un login que <em>no dejara a nadie afuera.</em>',
      body: ['El login original era exclusivo para usuarios ThankYou. Lo rediseñamos para que cualquier tarjetahabiente entrara solo con su número de tarjeta, y movimos la validación de titularidad al momento de completar el pago.'],
      options: [
        { name: 'Login exclusivo ThankYou', verdict: 'Descartada', reason: 'Dejaba fuera a la mayoría de los tarjetahabientes, justo a quienes queríamos sumar.' },
        { name: 'Acceso con el número de tarjeta', verdict: 'Elegida', reason: 'Quita la barrera de entrada: el usuario conoce el concierto y los costos antes de tener que validar su titularidad.' },
      ],
    },
    {
      id: 'comunicacion',
      label: 'Comunicación',
      heading: 'Test A/B: <em>regalo de puntos o beneficio exclusivo.</em>',
      body: ['Probamos dos mensajes: comunicar un regalo de puntos o enfatizar que era un "beneficio exclusivo".'],
      options: [
        { name: 'Regalo de puntos', verdict: 'Elegida', reason: 'En redes sociales y en las llamadas a los centros de atención, del banco y de ThankYou, no quedaba claro que el beneficio estuviera activo para todos. El regalo lo hacía evidente.' },
        { name: 'Beneficio exclusivo', verdict: 'Descartada', reason: 'No resolvía la duda que veíamos en redes y en atención a clientes: si el beneficio era para todos.' },
      ],
    },
    {
      id: 'ejecucion',
      label: 'Ejecución',
      heading: 'Del acceso <em>al boleto.</em>',
      body: ['El usuario entra, explora la cartelera, elige zona y número de boletos, canjea con puntos o combina puntos y pago, y emite sus boletos en Ticketmaster.'],
      visuals: [{
        type: 'gallery',
        wide: true,
        caption: 'Conciertos Privados · web',
        images: [g(LANDING, 'Acceso'), g(CARTELERA, 'Cartelera'), g(DETALLE, 'Detalle y zonas'), g(CANJE, 'Canje exitoso')],
      }],
    },
    {
      id: 'impacto',
      label: 'Impacto',
      heading: 'Más gente entrando, <em>y más rápido al canje.</em>',
      body: ['El login simplificado cambió la entrada al portal, y el segundo lanzamiento llegó a una base mucho más grande.'],
      visuals: [{ type: 'metrics', items: [
        { label: 'Primer login exitoso', before: '25%', after: '57%' },
        { label: 'Rebote en el primer login', before: '75%', after: '43%' },
        { label: 'Tiempo de canje', before: '', after: '−22%' },
      ] }],
      list: {
        title: 'Resultados por lanzamiento',
        items: [
          '<b>The Killers:</b> 3,150 butacas, 100% canjeadas en unos 9 días.',
          '<b>Alejandro Sanz:</b> 8,200 butacas (2.6 veces el aforo), 90% canjeadas en 7 días.',
        ],
      },
    },
    {
      id: 'aprendizajes',
      label: 'Aprendizajes',
      heading: 'Lo que <em>me llevé.</em>',
      body: [
        'Un flujo simplificado reduce la fricción inicial: más usuarios entran al portal, conocen los detalles del concierto y los costos, y consideran usar sus puntos o completar la compra.',
        'La coherencia entre canales, de la interfaz a las redes y la atención a clientes, es vital para reforzar que el beneficio está activo y evitar confusiones que afecten la conversión.',
      ],
    },
  ],
  beforeAfter: { before: '25%', after: '57%', line: 'Primer login exitoso · después del login simplificado' },
}
