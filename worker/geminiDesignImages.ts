/**
 * Product previews via Gemini native image generation (generateContent).
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 */
const GEMINI_GENERATE = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

const IMAGE_MODEL_CANDIDATES = [
  'gemini-2.5-flash-image',
  'gemini-3.1-flash-image-preview',
  'gemini-3-pro-image-preview',
] as const

const MAX_CITY_LEN = 32
const MAX_PROMPT_CHARS = 1200
const BETWEEN_IMAGE_MS = 450

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
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
    ? ` Small tagline: "${input.tagline.slice(0, 24)}".`
    : ' No extra tagline.'

  const prompt = `${input.variationHint} One photorealistic product photo. ${garment} in ${input.baseColorLabel} (${input.fitLabel} fit). Chest print: strikethrough text "${input.usLine}", large bold text "${input.homeLine}".${tag} Studio lighting, neutral backdrop, no people, no faces, product only.`

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
    promptFeedback?: { blockReason?: string }
    candidates?: Array<{
      content?: { parts?: Array<Record<string, unknown>> }
      finishReason?: string
    }>
  }

  for (const c of root.candidates ?? []) {
    const parts = c.content?.parts
    if (!Array.isArray(parts)) continue
    for (const part of parts) {
      if (!part || typeof part !== 'object') continue
      const inline = (part.inlineData ?? part.inline_data) as
        | { mimeType?: string; mime_type?: string; data?: string }
        | undefined
      if (inline?.data && typeof inline.data === 'string') {
        const mime = inline.mimeType || inline.mime_type || 'image/png'
        return `data:${mime};base64,${inline.data}`
      }
    }
  }
  return null
}

function blockHint(raw: unknown): string | null {
  const r = raw as {
    promptFeedback?: { blockReason?: string }
    candidates?: Array<{ finishReason?: string }>
  }
  const br = r.promptFeedback?.blockReason
  if (br) return `Blocked: ${br}`
  const fr = r.candidates?.[0]?.finishReason
  if (fr && fr !== 'STOP') return `Finish: ${fr}`
  return null
}

type GenAttempt = Record<string, unknown> | null

function generationAttempts(): GenAttempt[] {
  return [
    {
      responseModalities: ['TEXT', 'IMAGE'],
      imageConfig: { aspectRatio: '3:4' },
    },
    {
      responseModalities: ['TEXT', 'IMAGE'],
    },
    {
      responseModalities: ['IMAGE'],
    },
    null,
  ]
}

async function generateOneImage(
  apiKey: string,
  model: string,
  prompt: string
): Promise<{ ok: true; dataUrl: string } | { ok: false; status: number; raw: unknown }> {
  const url = GEMINI_GENERATE(model)

  for (const genCfg of generationAttempts()) {
    const body: Record<string, unknown> = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    }
    if (genCfg !== null) {
      body.generationConfig = genCfg
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

    if (res.status === 429) {
      await sleep(2000)
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
      continue
    }

    const dataUrl = extractFirstImageDataUrl(raw)
    if (dataUrl) {
      return { ok: true, dataUrl }
    }

    const hint = blockHint(raw)
    if (hint) {
      return { ok: false, status: 422, raw: { error: { message: hint } } }
    }
  }

  return { ok: false, status: 502, raw: { error: { message: 'No image in response after retries' } } }
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
          'GEMINI_API_KEY is not set. Add to .dev.vars locally or wrangler secret put GEMINI_API_KEY.',
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
    'Image 1 of 3: straight-on studio shot.',
    'Image 2 of 3: three-quarter view, same graphic.',
    'Image 3 of 3: softer light, same design.',
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
      if (i > 0) await sleep(BETWEEN_IMAGE_MS)

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
        'No image model worked. Enable Gemini image models on your API key or check billing/quota.',
      code: 'GEMINI_IMAGE_ERROR',
    },
    502
  )
}
