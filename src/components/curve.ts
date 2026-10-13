import type { CurveVisual, TiersVisual } from '../types'

// Curva de retención ilustrativa: escalones de abandono, umbral de rentabilidad y niveles debajo.
const x = (t: number) => 40 + t * 46
const MAX_X = 575

export function renderCurve(v: CurveVisual) {
  const levels = [110, 165, 190]
  let y = 40
  let d = `M${x(0)},${y}`
  const marks: string[] = []
  v.drops.forEach((drop, i) => {
    const y2 = levels[i] ?? y + 30
    d += ` H${x(drop.at)} V${y2}`
    marks.push(`<circle cx="${x(drop.at)}" cy="${y}" r="4" /><text x="${x(drop.at) + 10}" y="${(y + y2) / 2 + 4}">${drop.label}</text>`)
    y = y2
  })
  d += ` L${x(11.5)},${y + 12}`
  const area = `${d} V200 H${x(0)} Z`
  const tx = x(v.threshold.at)
  const ticks = Array.from({ length: 11 }, (_, i) => `<text class="tick" x="${x(i + 1)}" y="220">${i + 1}</text>`).join('')
  const bands = (v.bands ?? []).map((b, i) => {
    const x1 = x(b.from - 0.5) + 1, x2 = Math.min(x(b.to + 0.5), MAX_X) - 1
    return `<rect class="band b${i}" x="${x1}" y="236" width="${x2 - x1}" height="22" /><text class="band-t b${i}" x="${(x1 + x2) / 2}" y="251">${b.name}</text>`
  }).join('')
  return `
    <svg class="v-curve-svg" viewBox="0 0 600 270" role="img" aria-label="${v.caption}">
      <line class="axis" x1="${x(0)}" y1="200" x2="${MAX_X}" y2="200" />
      <path class="area" d="${area}" />
      <line class="threshold" x1="${tx}" y1="18" x2="${tx}" y2="200" />
      <text class="threshold-t" x="${tx + 8}" y="26">${v.threshold.label}</text>
      <path class="line" d="${d}" pathLength="1" />
      ${marks.join('')}
      ${ticks}
      <text class="tick axis-t" x="${MAX_X}" y="200" dy="-8">Transacciones →</text>
      ${bands}
    </svg>`
}

export function renderTiers(v: TiersVisual) {
  return `
    <ol class="v-tiers">${v.items.map((t, i) => `
      <li class="tier t${i}" style="--i:${i}">
        <span class="tier-name">${t.name}</span>
        <span class="tier-range">${t.range}</span>
        <b>${t.reward}</b>
        <span class="tier-note">${t.note}</span>
      </li>`).join('')}
    </ol>`
}
