/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Endpoint that receives contact and brief submissions. See `.env.example`. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
