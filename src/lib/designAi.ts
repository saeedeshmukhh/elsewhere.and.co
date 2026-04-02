export interface DesignLayoutResult {
  usLine: string
  homeLine: string
  tagline: string
}

function cleanLine(s: string): string {
  return s.trim().replace(/\s+/g, ' ')
}

/** Pass `tagline: ''` to hide; omit third arg for default “Roots Remain!”. */
export function formatDesignLayout(
  usCity: string,
  homeCity: string,
  tagline?: string
): DesignLayoutResult {
  const us = cleanLine(usCity)
  const home = cleanLine(homeCity)
  const line = tagline === undefined ? 'Roots Remain!' : tagline.trim()
  return {
    usLine: us ? us.toUpperCase() : 'YOUR US CITY',
    homeLine: home ? home.toUpperCase() : 'YOUR HOME CITY',
    tagline: line,
  }
}
