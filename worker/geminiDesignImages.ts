/**
 * Product preview images via Gemini native image generation (Nano Banana family).
 * Imagen `:predict` requires a paid plan; this path uses generateContent instead.
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 */
const GEMINI_GENERATE = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

/** Try in order — first available on your key wins per request batch */
const IMAGE_MODEL_CANDIDATES = [
  'gemini-2.5-flash-image',
  'gemini-3.1-flash-image-preview',
] as const

const MAX_CITY_LEN = 32
const MAX_PROMPT_CHARS = 1200

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function sanitizeLine(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s
    .replace(/[\u0000-\u001f<>]/g, '')
    .trim()
    .slice(0, max)
}

function buildPrompt(input: {
  garment: string
  baseColorLabel: string
  fitLabel: string
  usLine: string
  homeLine: string
  tagline: string
  variationHint: string
}): string {
  const garment =
    input.garment === 't-shirt'
      ? 'plain short-sleeve t-shirt'
      : 'pullover hoodie without zipper'
  const tag = input.tagline
    ? ` Small tagline below main text: "${input.tagline.slice(0, 24)}".`
    : ' No extra tagline.'

  const prompt = `${input.variationHint} Single square-ready product image. ${garment} in solid ${input.baseColorLabel} (${input.fitLabel} fit). Front/chest area: premium minimal streetwear graphic — smaller line with strikethrough: "${input.usLine}", large bold condensed sans-serif: "${input.homeLine}".${tag} Studio lighting, neutral backdrop, no people, no faces, no hands, ghost mannequin or flat catalog style, photorealistic.`

  return prompt.slice(0, MAX_PROMPT_CHARS)
}

function parseApiError(raw: unknown): string {
  const r = raw as {
    error?: { message?: string; status?: string }
    message?: string
  }
  return r?.error?.message || r?.message || ''
}

function extractFirstImageDataUrl(data: unknown): string | null {
  const root = data as {
    candidates?: Array<{
      content?: { parts?: Array<Record<string, unknown>> }
    }>
  }
  const parts = root.candidates?.[0]?.content?.parts
  if (!Array.isArray(parts)) return null
  for (const part of parts) {
    const inline = (part.inlineData ?? part.inline_data) as
      | { mimeType?: string; mime_type?: string; data?: string }
      | undefined
    if (inline?.data && typeof inline.data === 'string') {
      const mime = inline.mimeType || inline.mime_type || 'image/png'
      return `data:${mime};base64,${inline.data}`
    }
  }
  return null
}

async function generateOneImage(
  apiKey: string,
  model: string,
  prompt: string
): Promise<{ ok: true; dataUrl: string } | { ok: false; status: number; raw: unknown }> {
  const url = GEMINI_GENERATE(model)
  const body: Record<string, unknown> = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: {
        aspectRatio: '3:4',
      },
    },
  }

  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey.trim(),
    },
    body: JSON.stringify(body),
  })

  let raw = await res.json().catch(() => ({}))

  // Some keys/models reject imageConfig — retry without it
  if (!res.ok && parseApiError(raw).toLowerCase().includes('imageconfig')) {
    delete (body.generationConfig as Record<string, unknown>).imageConfig
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey.trim(),
      },
      body: JSON.stringify(body),
    })
    raw = await res.json().catch(() => ({}))
  }

  if (!res.ok) {
    return { ok: false, status: res.status, raw }
  }

  const dataUrl = extractFirstImageDataUrl(raw)
  if (!dataUrl) {
    return { ok: false, status: 502, raw }
  }
  return { ok: true, dataUrl }
}

function isModelNotFound(status: number, raw: unknown): boolean {
  const msg = parseApiError(raw).toLowerCase()
  return status === 404 || msg.includes('not found') || msg.includes('unknown model')
}

export async function handleDesignPreviewImages(
  request: Request,
  apiKey: string | undefined
): Promise<Response> {
  if (!apiKey?.trim()) {
    return json(
      {
        error:
          'GEMINI_API_KEY is not set on the Worker. Use: wrangler secret put GEMINI_API_KEY (production) or .dev.vars for local dev.',
        code: 'GEMINI_MISSING',
      },
      503
    )
  }

  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  if (!body || typeof body !== 'object') {
    return json({ error: 'Expected JSON body' }, 400)
  }

  const b = body as Record<string, unknown>
  const garment = b.garment === 't-shirt' ? 't-shirt' : 'hoodie'
  const baseColorLabel = sanitizeLine(b.baseColorLabel, 24) || 'black'
  const fitLabel = sanitizeLine(b.fitLabel, 20) || 'relaxed'

  const layout = b.layout && typeof b.layout === 'object' ? (b.layout as Record<string, unknown>) : {}
  const usLine = sanitizeLine(layout.usLine ?? b.usCity, MAX_CITY_LEN) || 'YOUR CITY'
  const homeLine = sanitizeLine(layout.homeLine ?? b.homeCity, MAX_CITY_LEN) || 'HOME'
  const showTagline = b.showTagline === true
  const tagline = showTagline
    ? sanitizeLine(layout.tagline, 28) || 'ROOTS REMAIN!'
    : ''

  const variationHints = [
    'Image 1 of 3: straight-on studio product shot, centered.',
    'Image 2 of 3: slight three-quarter view, same chest graphic.',
    'Image 3 of 3: softer diffuse lighting, same design and colors.',
  ]

  const prompts = variationHints.map((hint) =>
    buildPrompt({
      garment,
      baseColorLabel,
      fitLabel,
      usLine,
      homeLine,
      tagline,
      variationHint: hint,
    })
  )

  let lastError = ''

  for (const model of IMAGE_MODEL_CANDIDATES) {
    const images: string[] = []
    let modelFailed = false

    for (let i = 0; i < prompts.length; i++) {
      const result = await generateOneImage(apiKey, model, prompts[i]!)

      if (!result.ok) {
        lastError = parseApiError(result.raw) || `Request failed (${result.status})`

        if (isModelNotFound(result.status, result.raw)) {
          modelFailed = true
          break
        }

        if (images.length > 0) {
          return json({ images })
        }

        return json(
          {
            error: lastError,
            code: 'GEMINI_IMAGE_ERROR',
            status: result.status,
          },
          502
        )
      }

      images.push(result.dataUrl)
    }

    if (!modelFailed && images.length === 3) {
      return json({ images })
    }

    if (modelFailed) {
      continue
    }

    if (images.length > 0) {
      return json({ images })
    }
  }

  return json(
    {
      error:
        lastError ||
        'Could not generate images. Check your API key, model access, and quotas.',
      code: 'GEMINI_IMAGE_ERROR',
    },
    502
  )
}
