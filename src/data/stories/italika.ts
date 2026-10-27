import type { CaseStory, ReelImage, ShotImage } from '../../types'

const P = 'cases/italika/'
const img = (name: string, width: number, height: number, alt: string, caption = ''): ShotImage => ({ src: `${P}${name}.webp`, width, height, alt, caption })
const reelImg = (m: ShotImage, kind: ReelImage['kind']): ReelImage => ({ src: m.src, width: m.width, height: m.height, alt: m.alt, kind })

const INICIO = img('panel-inicio', 1600, 1025, 'Inicio del back office del taller con servicios del día, sellos de la semana, seguimientos vencidos y el último reporte de Italika. Datos simulados.')
const TARJETA = img('tarjeta-progreso', 780, 1688, 'Tarjeta web del cliente con la marca Italika: 3 de 4 sellos y el servicio gratis como siguiente premio. Datos simulados.')
const PREMIO = img('tarjeta-premio', 780, 1688, 'Tarjeta web del cliente con 4 de 4 sellos y el premio listo para canjear. Datos simulados.')

// Proyecto propio de Carlos (repo membership-mvp). Cifras del repo: commits, migraciones, funciones y pruebas.
// Sin nombre del taller ni número de talleres (NDA). Capturas generadas con datos simulados del propio proyecto.
export const italika: CaseStory = {
  tagline: 'Un programa de lealtad <em>que vive en WhatsApp.</em>',
  brand: { name: 'Italika', logo: `${P}italika-white.webp`, theme: 'italika' },
  meta: [
    { label: 'Rol', value: 'Producto e ingeniería · proyecto propio' },
    { label: 'Cliente', value: 'Centro de servicio autorizado Italika' },
    { label: 'Stack', value: 'TypeScript · Supabase · Kapso · Google Vision' },
    { label: 'Estado', value: 'En lanzamiento · 2026' },
  ],
  reel: [
    {
      label: 'Contexto',
      text: 'Cada taller autorizado recibe de Italika una base de clientes que había que contactar a mano.',
      visual: { type: 'metric', items: [{ label: 'Clientes por taller', before: '', after: '≈3,800' }] },
    },
    {
      label: 'Back office',
      text: 'El reporte semanal de Italika se vuelve una cola de seguimientos priorizada.',
      visual: { type: 'screens', images: [reelImg(INICIO, 'desktop')] },
    },
    {
      label: 'Lealtad',
      text: 'El cliente manda la foto de su ticket por WhatsApp y suma su sello: 4 servicios, el 5º gratis.',
      visual: { type: 'screens', images: [reelImg(TARJETA, 'phone')] },
    },
  ],
  sections: [
    {
      id: 'contexto',
      label: 'Contexto',
      heading: 'Una garantía <em>que obliga a volver.</em>',
      body: [
        'Para conservar la garantía, Italika pide que cada moto haga sus servicios en un taller autorizado. Cada semana, Italika le comparte al taller un reporte con compradores nuevos y servicios realizados: una base de <b>cerca de 3,800 clientes por taller</b>.',
        'El reto era doble: que los compradores nuevos llegaran a su primer servicio y que los clientes existentes siguieran regresando.',
      ],
      visuals: [{ type: 'metrics', items: [
        { label: 'Clientes por taller', before: '', after: '≈3,800' },
        { label: 'Reporte de Italika', before: '', after: 'Semanal' },
      ] }],
    },
    {
      id: 'en-sitio',
      label: 'En sitio',
      heading: 'Primero, ver <em>cómo trabajaban.</em>',
      body: [
        'Fui al taller a ver cómo contactaban a sus clientes. Todo era manual: revisar el reporte, buscar el teléfono y escribir o llamar cliente por cliente para recordarle su servicio. Con miles de registros, el seguimiento dependía del tiempo libre del personal.',
        'La decisión clave fue no pedirle a nadie instalar algo nuevo: el cliente ya vive en WhatsApp, y el personal también.',
      ],
      options: [
        { name: 'App propia para clientes', verdict: 'Descartada', reason: 'El perfil del cliente no está acostumbrado a descargar apps ni a usar Wallet.' },
        { name: 'Bandeja de mensajes propia', verdict: 'Descartada', reason: 'Duplicaba la herramienta que el personal ya usa todos los días.' },
        { name: 'WhatsApp Business en coexistencia + back office', verdict: 'Elegida', reason: 'El personal sigue contestando desde su app y el sistema automatiza lo repetitivo.' },
        { name: 'Apple y Google Wallet', verdict: 'Roadmap', reason: 'Suma, pero no bloquea el lanzamiento: la tarjeta también se abre desde WhatsApp.' },
      ],
    },
    {
      id: 'back-office',
      label: 'Back office',
      heading: 'Del reporte de Italika <em>a una cola de seguimientos.</em>',
      body: [
        'Construí un back office para el personal. Importa el reporte de Italika, valida cada columna, normaliza teléfonos y agrupa las motos de un mismo cliente. Los folios conectan un reporte con el siguiente, así que cuando llega el de la semana nadie se duplica.',
        'Con eso, el inicio del día muestra quién está vencido, a quién le toca hoy y a quién todavía no se ha contactado.',
      ],
      visuals: [
        { type: 'steps', steps: ['Reporte semanal de Italika', 'Validación, teléfonos y agrupación por cliente', 'Cola de seguimientos: vencidos, hoy y esta semana'] },
        { type: 'shot', ...INICIO, caption: 'Inicio del taller · datos simulados' },
        { type: 'shot', src: `${P}panel-seguimientos.webp`, width: 1600, height: 1025, alt: 'Cola de seguimientos con contadores de vencidos, hoy, esta semana y próximos, y acciones para llamar o escribir por WhatsApp. Datos simulados.', caption: 'Seguimientos priorizados por fecha · datos simulados' },
      ],
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      heading: 'El ticket <em>es el comprobante.</em>',
      body: [
        'Para sumar un sello, el cliente solo manda la foto de su ticket de servicio al WhatsApp del taller. El sistema la lee con <b>OCR de Google Vision</b>, reconoce el formato del ticket, identifica la moto por su número de serie y al cliente por su teléfono, y registra servicio y sello en una sola transacción. La respuesta llega con el saldo real.',
        'Lo más difícil fue la conexión con WhatsApp. Usé <b>Kapso</b> como capa sobre la API de WhatsApp para recibir mensajes y fotos con webhooks firmados, respetar la ventana de 24 horas y separar un canal de pruebas, con números permitidos, del canal real del taller.',
      ],
      visuals: [
        { type: 'chat', caption: 'Simulación de la conversación · datos ficticios', business: 'Centro de servicio', logo: `${P}italika-white.webp`, messages: [
          { from: 'customer', ticket: { title: 'CENTRO DE SERVICIO', lines: ['Folio 10247', 'Italika FT150', 'VIN …T9000001', 'SERVICIO 1,000 KM', 'Próximo: 27/01/2027 · 6,000 km'] }, text: 'Hola, les mando mi ticket' },
          { from: 'business', text: 'Recibimos tu ticket. Lo estamos revisando…' },
          { from: 'business', text: 'Listo, Ana. Registramos el servicio de 1,000 km de tu Italika FT150. Sumaste 1 sello: llevas 3 de 4.' },
          { from: 'business', text: 'Tu próximo servicio: 27 ene 2027 o 6,000 km, lo que ocurra primero.' },
          { from: 'business', link: { title: 'Tu tarjeta · Italika', text: 'Te falta 1 sello para tu servicio gratis' } },
        ] },
        { type: 'steps', steps: ['Foto del ticket en WhatsApp', 'Kapso envía un webhook firmado', 'Google Vision lee el ticket', 'Se identifica moto (VIN) y cliente (teléfono)', 'Servicio y sello en una sola transacción', 'Respuesta con el saldo real'] },
        { type: 'shot', src: `${P}panel-tickets.webp`, width: 1600, height: 956, alt: 'Pantalla para registrar un servicio con la foto del ticket y revisar las fotos recibidas por WhatsApp. Datos simulados.', caption: 'Los tickets dudosos pasan a revisión del personal · datos simulados' },
      ],
    },
    {
      id: 'lealtad',
      label: 'Lealtad',
      heading: '4 servicios, <em>el 5º gratis.</em>',
      body: [
        'El programa es configurable por taller; el del lanzamiento da un servicio gratis después de cuatro. Cada cliente tiene una tarjeta web con la marca Italika que se abre desde un enlace en WhatsApp, sin descargar nada: muestra sus sellos, su premio y su próximo servicio. Su QR lo identifica en el taller para canjear.',
      ],
      visuals: [{ type: 'gallery', caption: 'Tarjeta del cliente · datos simulados', images: [
        { ...TARJETA, caption: 'Te falta 1 sello' },
        { ...PREMIO, caption: 'Premio listo' },
      ] }],
    },
    {
      id: 'construccion',
      label: 'Cómo lo construí',
      heading: 'De la visita <em>al lanzamiento.</em>',
      body: [
        'Lo construí solo, de punta a punta: del levantamiento en el taller al código listo para producción, apoyándome en <b>Codex</b> y <b>Claude</b> para avanzar rápido sin perder el control. Cada cambio de base de datos es una migración, cada regla tiene pruebas y cada operación es idempotente: un reintento o una foto repetida nunca suma un sello de más.',
        'Hoy está en lanzamiento, con la base de cada taller cargada y lista para activarse. Lo siguiente: recordatorios automáticos por fecha de servicio y la tarjeta en Apple y Google Wallet.',
      ],
      visuals: [{ type: 'metrics', items: [
        { label: 'Días de construcción', before: '', after: '11' },
        { label: 'Migraciones de base de datos', before: '', after: '30' },
        { label: 'Funciones en servidor', before: '', after: '5' },
        { label: 'Pruebas automáticas', before: '', after: '+200' },
      ] }],
      after: ['<small>Proyecto propio. Italika es marca de su titular y se usa con su permiso. Las capturas y la conversación usan datos simulados; no se muestran datos de clientes reales.</small>'],
    },
  ],
}
