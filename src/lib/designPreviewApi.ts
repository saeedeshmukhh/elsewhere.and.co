import type { DesignLayoutResult } from './designAi'
import type { GarmentType } from '../components/design/GarmentPreview'
import { offlineDesignPreviewDataUrls } from './offlineDesignPreview'

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

export type PreviewMode = 'gemini' | 'offline'

export interface DesignPreviewResult {
  images: string[]
  mode: PreviewMode
  /** Shown when using offline previews or after an API error */
  hint?: string
}

const OFFLINE_HINT =
  'AI previews need the Worker running and GEMINI_API_KEY (local: .dev.vars; production: wrangler secret). These panels are layout mockups.'

function offlineResult(
  payload: DesignPreviewPayload,
  textOnDark: boolean,
  hint?: string
): DesignPreviewResult {
  return {
    images: offlineDesignPreviewDataUrls(
      payload.layout,
      payload.garment,
      payload.baseColorHex,
      textOnDark
    ),
    mode: 'offline',
    hint: hint ?? OFFLINE_HINT,
  }
}

/**
 * Calls Worker → Gemini when available; otherwise SVG layout previews (always usable).
 */
export async function requestDesignPreviewImages(
  payload: DesignPreviewPayload,
  options?: { textOnDark?: boolean }
): Promise<DesignPreviewResult> {
  const textOnDark = options?.textOnDark ?? true

  try {
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

    if (res.ok && Array.isArray(data.images) && data.images.length > 0) {
      return { images: data.images.slice(0, 3), mode: 'gemini' }
    }

    const errMsg = data.error || `HTTP ${res.status}`

    if (res.status === 503 && data.code === 'GEMINI_MISSING') {
      return offlineResult(payload, textOnDark, `${OFFLINE_HINT} (${errMsg})`)
    }

    return offlineResult(
      payload,
      textOnDark,
      `Gemini did not return images: ${errMsg}. Showing layout mockups.`
    )
  } catch {
    return offlineResult(
      payload,
      textOnDark,
      `${OFFLINE_HINT} Network error — is npm run dev:worker running?`
    )
  }
}
