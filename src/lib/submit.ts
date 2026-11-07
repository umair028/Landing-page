export type LeadKind = 'contact' | 'brief'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

/** Simulated network latency used when no endpoint is configured. */
const MOCK_LATENCY_MS = 900

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Posts a lead to `VITE_FORM_ENDPOINT` as JSON.
 *
 * When the endpoint isn't set (local development) the payload is logged and the
 * promise resolves after a short delay, so the form UI can still be exercised.
 *
 * @throws {Error} When the endpoint responds with a non-2xx status.
 */
export async function submitLead(kind: LeadKind, data: Record<string, unknown>): Promise<void> {
  if (!FORM_ENDPOINT) {
    if (import.meta.env.DEV) console.info(`[submitLead] No endpoint configured, "${kind}" payload:`, data)
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
    return
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ kind, ...data }),
  })

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}`)
  }
}

/** Lightweight client-side email check. The server should still validate. */
export function isEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim())
}
