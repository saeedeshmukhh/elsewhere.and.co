/** Contact + optional design context — delivered via FormSubmit (no extra API key). */

const DEFAULT_NOTIFY_EMAIL = 'saideshmukhh@gmail.com'

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  })
}

function sanitize(s: unknown, max: number): string {
  if (typeof s !== 'string') return ''
  return s.replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, max)
}

function validEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254
}

export interface WaitlistEnv {
  WAITLIST_TO_EMAIL?: string
}

export async function handleWaitlistInquiry(
  request: Request,
  env: WaitlistEnv
): Promise<Response> {
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
  const name = sanitize(b.name, 120)
  const email = sanitize(b.email, 254)
  const message = sanitize(b.message, 4000)
  const designContext = sanitize(b.designContext, 2000)

  if (name.length < 1) {
    return json({ error: 'Name is required' }, 400)
  }
  if (!validEmail(email)) {
    return json({ error: 'Valid email is required' }, 400)
  }
  if (message.length < 1) {
    return json({ error: 'Message is required' }, 400)
  }

  const to = env.WAITLIST_TO_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL

  const fullMessage = designContext.trim()
    ? [message, '', '---', `Design context:\n${designContext}`].join('\n')
    : message

  const subject =
    designContext.trim().length > 0
      ? 'Elsewhere — Design Your Own waitlist'
      : 'Elsewhere — Contact form'

  try {
    const fsRes = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: subject,
          name,
          email,
          message: [fullMessage].join('\n').slice(0, 12000),
          _replyto: email,
        }),
      }
    )

    const raw = await fsRes.text()
    if (!fsRes.ok) {
      return json(
        { error: 'Could not deliver message. Try again later.', detail: raw.slice(0, 200) },
        502
      )
    }

    let parsed: { success?: boolean } = {}
    try {
      parsed = JSON.parse(raw) as { success?: boolean }
    } catch {
      /** FormSubmit sometimes returns non-JSON */
    }
    if (parsed && 'success' in parsed && parsed.success === false) {
      return json({ error: 'Could not deliver message.' }, 502)
    }

    return json({ ok: true })
  } catch {
    return json({ error: 'Could not deliver message.' }, 502)
  }
}
