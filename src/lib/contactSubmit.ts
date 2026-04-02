export interface ContactInquiryPayload {
  name: string
  email: string
  message: string
  /** When present (e.g. Design Your Own), included in the email body. */
  designContext?: string
}

export async function submitContactInquiry(
  body: ContactInquiryPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
        designContext: body.designContext ?? '',
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    if (res.ok && data.ok === true) {
      return { ok: true }
    }
    return { ok: false, error: data.error || 'Could not send. Try again.' }
  } catch {
    return { ok: false, error: 'Network error. Try again.' }
  }
}
