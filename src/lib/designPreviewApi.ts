import type { DesignLayoutResult } from './designAi'
import type { GarmentType } from '../components/design/GarmentPreview'

export interface DesignPreviewPayload {
  garment: GarmentType
  baseColorLabel: string
  baseColorHex: string
  fitLabel: string
  usCity: string
  homeCity: string
  showTagline: boolean
  layout: DesignLayoutResult
}

/**
 * Calls the Cloudflare Worker → Gemini native image API (same AI Studio key; not Imagen).
 * Requires `npm run dev:worker` + `.dev.vars` locally, or deployed Worker + secret.
 */
export async function requestDesignPreviewImages(
  payload: DesignPreviewPayload
): Promise<string[]> {
  const res = await fetch('/api/design-preview-images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => ({}))) as {
    images?: string[]
    error?: string
    code?: string
  }

  if (!res.ok) {
    throw new Error(data.error || `Could not generate previews (${res.status})`)
  }

  if (!Array.isArray(data.images) || data.images.length === 0) {
    throw new Error(data.error || 'No images returned')
  }

  return data.images
}
