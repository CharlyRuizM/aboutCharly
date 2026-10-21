import type { CaseStory, ReelImage, ShotImage } from '../../types'

const P = 'cases/banamex-design-system/'
const img = (name: string, width: number, height: number, alt: string, caption = ''): ShotImage => ({ src: `${P}${name}.webp`, width, height, alt, caption })
const reelImg = (m: ShotImage, kind: ReelImage['kind']): ReelImage => ({ src: m.src, width: m.width, height: m.height, alt: m.alt, kind })

const LOGIN_NEW = img('ba-login-despues', 1280, 892, 'Conciertos Privados con la nueva marca Banamex: acceso con número de tarjeta.')
const LOGIN_OLD = img('ba-login-antes', 1280, 892, 'Conciertos Privados con la marca anterior de Citibanamex: acceso con número de tarjeta.')
const VARIANTS = [
  img('variante-1', 742, 924, 'Variante de la tarjeta de concierto: activa, con botón Buscar boletos.'),
  img('variante-2', 742, 904, 'Variante de la tarjeta de concierto: hover, en azul.'),
  img('variante-3', 742, 864, 'Variante de la tarjeta de concierto: activa, con botón.'),
  img('variante-4', 742, 840, 'Variante de la tarjeta de concierto: hover, sin botón.'),
  img('variante-5', 742, 824, 'Variante de la tarjeta de concierto: evento pasado, en rosa.'),
  img('variante-6', 742, 768, 'Variante de la tarjeta de concierto: evento pasado, compacta.'),
]

// Textos basados en el brief de Carlos. Paleta y tipografía: del archivo de Variables de Figma.
// Capa semántica y modos: propuesta (no existía en el sistema original) y así se cuenta.
export const banamexDs: CaseStory = {
  tagline: 'Una marca que <em>no cabía en cajas.</em>',
  meta: [
    { label: 'Rol', value: 'UX Engineer Sr · Fidelity Marketing' },
    { label: 'Cliente', value: 'Banamex' },
    { label: 'Producto', value: 'Design system para programas de lealtad' },
    { label: 'Herramientas', value: 'Figma · Auto Layout · Variables' },
    { label: 'Año', value: '2025' },
  ],
  reel: [
    {
      label: 'Contexto',
      text: 'Banamex estrenó marca y sus programas digitales tenían que migrar a ella.',
      visual: { type: 'screens', images: [reelImg(LOGIN_OLD, 'desktop'), reelImg(LOGIN_NEW, 'desktop')] },
    },
    {
      label: 'Reto',
      text: 'La marca nueva estaba hecha de piezas que encajan como LEGO, no de cajas con padding.',
      visual: { type: 'screens', images: [reelImg(VARIANTS[0], 'screen')] },
    },
    {
      label: 'Sistema',
      text: 'Cada pieza se volvió un componente con reglas, variantes y properties.',
      visual: { type: 'screens', images: [reelImg(VARIANTS[1], 'screen'), reelImg(VARIANTS[4], 'screen')] },
    },
  ],
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Una marca nueva <em>en programas que ya existían.</em>',
      body: [
        'Banamex estrenó marca y había que llevarla a los programas digitales de lealtad que operábamos en Fidelity Marketing, empezando por <b>Conciertos Privados</b> y siguiendo con <b>Travel</b> y <b>Canje de premios</b>. Cada pantalla estaba hecha con la marca anterior, así que migrar una por una no iba a escalar: necesitábamos un <b>design system</b>.',
      ],
      visuals: [{
        type: 'swipe',
        caption: 'Desliza para comparar · Conciertos Privados',
        labels: ['Citibanamex', 'Banamex'],
        items: [
          { label: 'Acceso', before: `${P}ba-login-antes.webp`, after: `${P}ba-login-despues.webp`, width: 1280, height: 892, alt: 'Pantalla de acceso.' },
          { label: 'Error de tarjeta', before: `${P}ba-error-antes.webp`, after: `${P}ba-error-despues.webp`, width: 1280, height: 892, alt: 'Mensaje de tarjeta no participante.' },
          { label: 'Pago', before: `${P}ba-paso2-antes.webp`, after: `${P}ba-paso2-despues.webp`, width: 1280, height: 982, alt: 'Paso de compra de puntos con resumen de boletos. Los datos de tarjeta aparecen difuminados.' },
          { label: 'Canje', before: `${P}ba-canje-antes.webp`, after: `${P}ba-canje-despues.webp`, width: 1280, height: 1083, alt: 'Confirmación de canje. El folio y el código aparecen difuminados.' },
        ],
      }],
    },
    {
      id: 'reto',
      label: 'El reto',
      heading: 'A estos bloques <em>los bautizamos legos.</em>',
      body: [
        'Lo común es crear un design system desde cero sobre una retícula. Aquí era al revés: la marca venía hecha de bloques con pestañas y recortes que encajan como LEGO. Si los forzaba al modelo de caja, la marca se perdía; si los dejaba como ilustración, no se podían reutilizar ni construir en código.',
      ],
      visuals: [{ type: 'ds-assemble', caption: 'Una tarjeta, pieza por pieza: 2 bloques, 1 pestaña, 1 recorte y 4 esquinas cóncavas' }],
    },
    {
      id: 'solucion',
      label: 'La solución',
      heading: 'Cada pieza, <em>un componente con reglas.</em>',
      body: [
        'Diseñé pensando también en cómo se iba a construir. Con <b>Auto Layout</b> definí cómo crece cada pieza sin deformar su silueta, y con <b>variantes</b> y <b>component properties</b> cubrí estados, tamaños y contenido en un solo componente. La esquina cóncava se volvió su propia pieza de 16 px, reutilizable en todo el sistema.',
      ],
      visuals: [
        { type: 'ds-playground', caption: 'Pruébalo: réplica en HTML/CSS del componente, con datos ficticios' },
        { type: 'shot', src: `${P}figma-properties.webp`, width: 1176, height: 752, alt: 'El componente Card Concert en Figma con su panel de properties: Status, Size, Venue, Artist, fecha y tres booleanos.', caption: 'El componente en Figma · 9 properties' },
        { type: 'strip', caption: 'Component set · activo, hover y pasado', images: VARIANTS },
      ],
    },
    {
      id: 'tokens',
      label: 'Tokens',
      heading: 'De colores sueltos <em>a decisiones con nombre.</em>',
      body: [
        'El nuevo brand book traía una paleta enorme: primarios, secundarios, terciarios y superficies. ¿Muchos colores? <em>Love it.</em> ¿Usarlos todos en una pantalla de canje? Mejor no.',
        'El reto fue elegir los principales y darles jerarquía: cuál es la acción, cuál la superficie, cuál avisa que quedan pocos boletos y cuál marca un evento que ya pasó. Cada color quedó con un uso y un estado claros, como <b>Variables</b> en cuatro grupos, junto con una escala tipográfica responsive para desktop y mobile.',
      ],
      visuals: [
        { type: 'palette', caption: 'Variables de color del archivo original', groups: [
          { name: 'Antes · Citibanamex', colors: [
            { name: 'black', value: '#292c33' }, { name: 'gray 01', value: '#4d4d4e' }, { name: 'gray 02', value: '#949594' }, { name: 'gray 03', value: '#dbdbdb' }, { name: 'gray 04', value: '#f8f8f8' }, { name: 'error', value: '#b10005' }, { name: 'success', value: '#5fc500' },
          ] },
          { name: 'Después · Primary', colors: [
            { name: 'red', value: '#ff1b44' }, { name: 'dark blue', value: '#003746' }, { name: 'white', value: '#ffffff' },
          ] },
          { name: 'Secondary', colors: [
            { name: 'granate', value: '#601636' }, { name: 'violeta', value: '#eabcff' }, { name: 'crema', value: '#fde8e0' }, { name: 'naranja', value: '#fa8d5a' }, { name: 'azul grisáceo', value: '#dae9ee' }, { name: 'verde', value: '#2ddc8e' },
          ] },
          { name: 'Tertiary (selección)', colors: [
            { name: 'azul oscuro', value: '#001e22' }, { name: 'azul claro', value: '#005162' }, { name: 'granate claro', value: '#b77493' }, { name: 'naranja oscuro', value: '#ff5f00' }, { name: 'naranja claro', value: '#ffd6ba' }, { name: 'verde oscuro', value: '#00ad59' },
          ] },
          { name: 'Surface', colors: [
            { name: 'black', value: '#000000' }, { name: 'extra dark', value: '#999999' }, { name: 'dark', value: '#bebebd' }, { name: 'medium', value: '#d5d1ce' }, { name: 'light', value: '#efefed' }, { name: 'extra light', value: '#fafaf8' },
          ] },
        ] },
        { type: 'typescale', caption: 'Escala tipográfica · tamaño / interlineado en px. Se muestra con la tipografía del sitio; la de marca es propietaria.', rows: [
          { name: 'H1', family: 'Banamex Display', desk: '40 / 56', mobile: '32 / 38', size: 34 },
          { name: 'H2', family: 'Banamex Display', desk: '32 / 44', mobile: '24 / 29', size: 28 },
          { name: 'H3', family: 'Banamex Display', desk: '24 / 34', mobile: '20 / 24', size: 22 },
          { name: 'H4', family: 'Banamex Display', desk: '20 / 28', mobile: '18 / 22', size: 19 },
          { name: 'Body 1', family: 'Banamex Text', desk: '18 / 26', mobile: '18 / 22', size: 17 },
          { name: 'Body 2', family: 'Banamex Text', desk: '16 / 22', mobile: '16 / 20', size: 15 },
          { name: 'Body 3', family: 'Banamex Text', desk: '14 / 20', mobile: '14 / 20', size: 14 },
          { name: 'Caption 1', family: 'Banamex Micro', desk: '10 / 14', mobile: '10 / 12', size: 11 },
        ] },
      ],
    },
    {
      id: 'handoff',
      label: 'Handoff',
      heading: 'Diseñado para <em>construirse.</em>',
      body: [
        'En HTML todo es una caja rectangular que se apila en el flujo del documento. La marca no: tiene pestañas y recortes. Por eso la tarjeta se construye con <b>dos bloques en el flujo</b> y piezas encima con <b>position: absolute</b> que "muerden" la caja, y la esquina cóncava es una pieza de 16 px que en CSS es un degradado radial.',
        'Como UX Engineer, cada regla de Figma tenía su traducción: <b>Fill</b> y <b>Hug</b> en cada bloque, radios y espaciados con valor exacto. Así, desarrollo no tenía que adivinar, y el mismo componente funcionaba en desktop y en mobile.',
      ],
      visuals: [
        { type: 'ds-inspect', caption: 'Pruébalo: ve las cajas, quita el position: absolute o cambia el ancho. Pasa el cursor por el DOM para ver cada pieza.', pieces: [
          { target: '.dsc', tag: '<div class="card">', note: 'display: grid · contenedor' },
          { target: '.dsc-media', tag: '<div class="media">', note: 'flujo · fila 1 del grid' },
          { target: '.dsc-body', tag: '<div class="body">', note: 'flujo · fila 2 del grid' },
          { target: '.dsc-tab', tag: '<span class="tab">', note: 'absolute · top 0 · left 0 · Hug' },
          { target: '.dsc-f-tr, .dsc-f-tb', tag: '<span class="corner"> ×2', note: 'absolute · esquinas de 16 px' },
          { target: '.dsc-cut', tag: '<span class="cut">', note: 'absolute · right 0 · bottom 0' },
          { target: '.dsc-f-cl, .dsc-f-ct', tag: '<span class="corner"> ×2', note: 'absolute · esquinas del recorte' },
        ] },
        { type: 'shot', src: `${P}figma-autolayout.webp`, width: 1510, height: 350, alt: 'Auto Layout del bloque de precio y el botón en Figma: 161 Fill × 23 Hug.', caption: 'Fill × Hug en el recorte del botón' },
        { type: 'shot', src: `${P}figma-esquina.webp`, width: 1308, height: 374, alt: 'La esquina cóncava de 16 × 16 que une la etiqueta con la imagen, en Figma.', caption: 'La esquina de 16 × 16 como pieza propia' },
        { type: 'code', caption: 'La misma esquina, en CSS', code: `/* Esquina cóncava: la pieza de 16 × 16 de Figma */
.corner {
  width: var(--radius-notch);   /* 16px */
  height: var(--radius-notch);
  background: radial-gradient(
    circle at 100% 100%,
    transparent calc(var(--radius-notch) - .5px),
    var(--color-surface-page) var(--radius-notch)
  );
}` },
        { type: 'gallery', caption: 'Mobile · mismas piezas, otra escala', phones: true, images: [
          img('movil-acceso', 360, 1496, 'Conciertos Privados en móvil: acceso y cartelera.', 'Acceso'),
          img('movil-resumen', 360, 1898, 'Conciertos Privados en móvil: resumen de boletos y envío.', 'Resumen'),
          img('movil-detalle', 360, 3715, 'Conciertos Privados en móvil: detalle del concierto con mapa de zonas.', 'Detalle'),
        ] },
      ],
      after: ['<small>Trabajo realizado en Fidelity Marketing para Banamex. Las marcas pertenecen a sus dueños. Los datos de las demos son ficticios y la información sensible de las capturas está difuminada.</small>'],
    },
  ],
}
