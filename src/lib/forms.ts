/**
 * Shared form submission helpers.
 *
 * Both the newsletter signup and the contact form follow the same pattern:
 *   1. If a real backend endpoint is configured via Vite env vars, POST the
 *      payload as JSON and surface success/failure to the caller.
 *   2. Otherwise, fall back to opening a prefilled `mailto:` draft so the
 *      visitor's intent isn't silently dropped on the floor.
 *
 * The mailto fallback is opt-out by design — until the studio wires up a real
 * forms backend (Formspree, Resend, a Netlify form, a custom Worker, etc.)
 * mailto is the only way to actually deliver the message.
 *
 * Configure via `.env` / `.env.local`:
 *   - VITE_CONTACT_EMAIL          (string)  default: hello@archstudio.com
 *   - VITE_NEWSLETTER_ENDPOINT    (string)  POST URL; if unset → mailto
 *   - VITE_CONTACT_FORM_ENDPOINT  (string)  POST URL; if unset → mailto
 *
 * See `.env.example` at the repo root for the canonical list.
 */

const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as
  | string
  | undefined;
const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as
  | string
  | undefined;
const CONTACT_EMAIL =
  (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ||
  "hello@archstudio.com";

export const HAS_NEWSLETTER_ENDPOINT = Boolean(NEWSLETTER_ENDPOINT);
export const HAS_CONTACT_ENDPOINT = Boolean(CONTACT_FORM_ENDPOINT);
export const CONTACT_EMAIL_ADDRESS = CONTACT_EMAIL;

export type SubmissionMode = "endpoint" | "mailto";

export type SubmissionResult =
  | { ok: true; mode: SubmissionMode }
  | { ok: false; error: string };

export interface NewsletterPayload {
  email: string;
  /** Page or component that originated the signup, e.g. "/blog" or "footer". */
  source?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Optional context, e.g. "project-inquiry: minimal-residence". */
  source?: string;
}

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const openMailto = (subject: string, body: string): void => {
  // Build the mailto URL on a single line — newlines in the href confuse
  // some clients. Body uses %0A for line breaks per RFC 2368.
  const url =
    `mailto:${CONTACT_EMAIL}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
  // `window.location.href` is more reliable than `<a>.click()` here because
  // it survives popup blockers and works inside event handlers.
  window.location.href = url;
};

export async function subscribeNewsletter(
  payload: NewsletterPayload
): Promise<SubmissionResult> {
  const email = payload.email.trim();
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (NEWSLETTER_ENDPOINT) {
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: payload.source ?? "" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { ok: true, mode: "endpoint" };
    } catch (err) {
      console.error("Newsletter signup failed", err);
      return {
        ok: false,
        error:
          "We couldn't sign you up right now. Please try again or email us directly.",
      };
    }
  }

  const subject = "Newsletter signup";
  const body = [
    `Please add this email to the ARCH STUDIO newsletter:`,
    ``,
    `Email: ${email}`,
    payload.source ? `Source: ${payload.source}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  openMailto(subject, body);
  return { ok: true, mode: "mailto" };
}

export async function sendContactMessage(
  payload: ContactPayload
): Promise<SubmissionResult> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const subject = (payload.subject ?? "").trim() || "Project inquiry";
  const message = payload.message.trim();

  if (!name) {
    return { ok: false, error: "Please tell us your name." };
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return {
      ok: false,
      error: "Please share a few sentences about your project.",
    };
  }

  if (CONTACT_FORM_ENDPOINT) {
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          source: payload.source ?? "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return { ok: true, mode: "endpoint" };
    } catch (err) {
      console.error("Contact form submission failed", err);
      return {
        ok: false,
        error:
          "We couldn't send your message right now. Please try again or email us directly.",
      };
    }
  }

  const body = [
    `From: ${name} <${email}>`,
    payload.source ? `Source: ${payload.source}` : null,
    ``,
    message,
  ]
    .filter(Boolean)
    .join("\n");

  openMailto(subject, body);
  return { ok: true, mode: "mailto" };
}
