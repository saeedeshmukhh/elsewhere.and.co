import type { DesignLayoutResult } from './designAi'
import type { GarmentType } from '../components/design/GarmentPreview'

function escXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Three layout mockups (SVG) when Gemini isn’t available — same typography logic as the live mockup. */
export function offlineDesignPreviewDataUrls(
  layout: DesignLayoutResult,
  garment: GarmentType,
  baseHex: string,
  textOnDark: boolean
): string[] {
  const fg = textOnDark ? '#f2efe8' : '#0a0a0a'
  const w = 420
  const h = garment === 'hoodie' ? 560 : 500
  const cx = w / 2
  const cy = h * 0.4

  const variants = [
    { label: 'Front', rot: 0 },
    { label: 'Angle', rot: -1.2 },
    { label: 'Soft', rot: 1 },
  ]

  return variants.map(({ rot }) => {
    const tagline = layout.tagline
      ? `<text x="${cx}" y="${cy + 52}" font-family="system-ui,Segoe UI,sans-serif" font-size="11" font-weight="700" letter-spacing="0.18em" fill="${fg}">${escXml(layout.tagline)}</text>`
      : ''

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${escXml(baseHex)}"/>
  <g transform="translate(${cx},${cy}) rotate(${rot})" text-anchor="middle">
    <text y="-42" font-family="system-ui,Segoe UI,sans-serif" font-size="12" font-weight="600" letter-spacing="0.28em" fill="${fg}" text-decoration="line-through">${escXml(layout.usLine)}</text>
    <text y="6" font-family="Impact,Arial Black,system-ui,sans-serif" font-size="${garment === 'hoodie' ? '34' : '32'}" font-weight="700" fill="${fg}">${escXml(layout.homeLine)}</text>
    ${tagline}
  </g>
  <text x="${w - 8}" y="${h - 8}" text-anchor="end" font-family="system-ui,sans-serif" font-size="8" fill="${fg}" opacity="0.35">Elsewhere — layout preview</text>
</svg>`
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  })
}
