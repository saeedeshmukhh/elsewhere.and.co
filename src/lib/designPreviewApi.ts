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
  /** When set with base64 image, Worker uses drop reference + city-swap prompt for Gemini. */
  referenceId?: string
  referenceImageBase64?: string
  referenceImageMime?: string
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

/** Fetch a same-origin public asset and return raw base64 + MIME for the Worker. */
export async function loadPublicImageAsBase64(path: string): Promise<{
  data: string
  mime: string
}> {
  const res = await fetch(path)
  if (!res.ok) {
    throw new Error(`Could not load reference image (${res.status})`)
  }
  const blob = await res.blob()
  const mime = blob.type || 'image/png'
  const buf = await blob.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let binary = ''
  const chunk = 8192
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)))
  }
  return { data: btoa(binary), mime }
}

/**
 * Calls Worker → Gemini when available; otherwise SVG layout previews (always usable).
 * Reference-based payloads return empty `images` on failure (no mockups).
 */
export async function requestDesignPreviewImages(
  payload: DesignPreviewPayload,
  options?: { textOnDark?: boolean }
): Promise<DesignPreviewResult> {
  const textOnDark = options?.textOnDark ?? true
  const isReference = Boolean(payload.referenceId && payload.referenceImageBase64)

  const emptyFail = (): DesignPreviewResult => ({
    images: [],
    mode: 'offline',
  })

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
      const max =
        payload.referenceId && payload.referenceImageBase64 ? 1 : 3
      return { images: data.images.slice(0, max), mode: 'gemini' }
    }

    const errMsg = data.error || `HTTP ${res.status}`

    if (isReference) {
      return emptyFail()
    }

    if (res.status === 503 && data.code === 'GEMINI_MISSING') {
      return offlineResult(payload, textOnDark, `${OFFLINE_HINT} (${errMsg})`)
    }

    return offlineResult(
      payload,
      textOnDark,
      `Gemini did not return images: ${errMsg}. Showing layout mockups.`
    )
  } catch {
    if (isReference) {
      return emptyFail()
    }
    return offlineResult(
      payload,
      textOnDark,
      `${OFFLINE_HINT} Network error — is npm run dev:worker running?`
    )
  }
}
