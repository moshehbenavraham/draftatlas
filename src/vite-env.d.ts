/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * Optional public-facing email surfaced by the contact form's mailto
   * fallback and the studio's `mailto:` links. Defaults to
   * `hello@archstudio.com` when unset.
   */
  readonly VITE_CONTACT_EMAIL?: string;
  /**
   * Optional POST endpoint for newsletter signups. When unset the form
   * opens a prefilled mailto: draft instead.
   */
  readonly VITE_NEWSLETTER_ENDPOINT?: string;
  /**
   * Optional POST endpoint for contact form submissions. When unset the form
   * opens a prefilled mailto: draft instead.
   */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
