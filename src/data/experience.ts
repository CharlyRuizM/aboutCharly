// Experiencia profesional, basada en el CV de Carlos (10/2026).
export type Job = { company: string; role: string; period: string; summary?: string; highlights?: string[] }

export const experienceIntro = 'Me he especializado en adquisición, activación, lanzamiento de nuevos productos y programas de lealtad, sobre todo en fintech y servicios financieros.'

export const jobs: Job[] = [
  {
    company: 'Propaga',
    role: 'Product Manager',
    period: '11/2025 – 09/2026',
    summary: 'Fintech B2B2C de crédito para tenderos y tienditas en México.',
    highlights: [
      'Primera app móvil: el celular como identidad única y compras con varios distribuidores.',
      'Crédito en efectivo, de un MVP en WhatsApp a una solicitud de 1.5 minutos.',
      'Portal de pagos self-service: −30% de carga operativa.',
      'Primera medición de producto con Mixpanel: −40% en tiempo de registro.',
      'Adquisición y activación: +80% de usuarios en un mes y 70% de activación a la semana 3.',
      'Primer programa de lealtad y exploración de evaluación crediticia asistida por IA.',
    ],
  },
  {
    company: 'Fidelity Marketing',
    role: 'UX Engineer Sr',
    period: '07/2023 – 11/2025',
    summary: 'Programas de lealtad y recompensas para Santander, Banamex, American Express y Coca-Cola.',
    highlights: [
      'Experiencias digitales de productos, servicios y conciertos en alianza con Ticketmaster.',
      'Research de usuarios y análisis de datos transaccionales con BI para encontrar oportunidades.',
      'Iniciativas de producto desde la oportunidad hasta el prototipo, la validación y la implementación.',
    ],
  },
  {
    company: 'Wakkamole',
    role: 'UX/UI Designer',
    period: '01/2021 – 07/2023',
    summary: 'Más de 20 productos digitales para 10+ marcas como LEGO, Juguetrón, José Cuervo y Punta del Cielo.',
    highlights: [
      'Rediseño de la experiencia de compra: −30% de abandono de carrito y −35% de tiempo de compra.',
      'Introduje los design sprints en el equipo y desarrollé la primera PWA in house.',
    ],
  },
  { company: 'Independiente', role: 'Performance Marketing & UI/UX Consultant', period: '01/2020 – 01/2021' },
  { company: 'Albur BTL Agency', role: 'Digital Marketing', period: '05/2019 – 10/2019' },
]

export const skills = ['Product Strategy', 'Product Discovery', 'PRDs', 'Roadmapping', 'Product Analytics', 'Experimentation', 'User Research', 'Acquisition & Activation', 'Loyalty', 'AI Products', 'Cross-functional Leadership']
export const tools = ['Figma', 'Mixpanel', 'Claude', 'Preset', 'Notion', 'Miro', 'GitHub', 'Looker Studio']
export const education = 'Ingeniería en Tecnología Interactiva en Animación Digital · 2019'
