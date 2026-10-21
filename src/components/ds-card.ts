// Réplica en HTML/CSS del componente "Card Concert" del design system de Banamex.
// La forma de marca (pestaña arriba, recorte abajo) se arma con piezas: 2 bloques, 1 pestaña,
// 1 recorte y 4 esquinas cóncavas. Cada pieza lleva --dx/--dy para la animación de "armar".
// Datos ficticios: artista, fecha y puntos no corresponden a ningún evento real.

export type DsCardProps = {
  status?: 'active' | 'soldout' | 'past'
  size?: 'desk' | 'mobile'
  chip?: boolean
  points?: boolean
  artist?: string
  venue?: string
  day?: string
  month?: string
}

export function renderDsCard(p: DsCardProps = {}, opts: { assemble?: boolean } = {}) {
  const { status = 'active', size = 'desk', chip = true, points = true, artist = 'Los Bloques', venue = 'Auditorio Nacional', day = '11', month = 'Sept' } = p
  const piece = (cls: string, dx: number, dy: number, inner = '') => `<span class="dsc-p ${cls}" style="--dx:${dx}px;--dy:${dy}px">${inner}</span>`
  return `
    <div class="dsc" data-status="${status}" data-size="${size}" data-chip="${chip}" data-points="${points}"${opts.assemble ? ' data-assemble' : ''}>
      ${piece('dsc-media', 0, -28, '<span class="dsc-sold" aria-hidden="true">Agotados</span>')}
      ${piece('dsc-body', 0, 28, `
        <span class="dsc-date"><b data-prop="day">${day}</b><span><i data-prop="month">${month}</i><i>2026</i></span></span>
        <span class="dsc-venue" data-prop="venue">${venue}</span>
        <span class="dsc-artist" data-prop="artist">${artist}</span>
        <span class="dsc-price"><small>Desde</small>20,000 Puntos</span>`)}
      ${piece('dsc-tab', -22, -22, '<span class="dsc-chip"><span class="is-few">Quedan pocos boletos</span><span class="is-out">Agotado</span></span>')}
      ${piece('dsc-f dsc-f-tr', 14, -30)}
      ${piece('dsc-f dsc-f-tb', -30, 14)}
      ${piece('dsc-cut', 24, 24, '<span class="dsc-cta">Buscar boletos</span>')}
      ${piece('dsc-f dsc-f-cl', -14, 34)}
      ${piece('dsc-f dsc-f-ct', 34, -14)}
    </div>`
}
