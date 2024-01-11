/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly VITE_APP_BASE_API_URL: string;
  readonly VITE_APP_GTAG_ID: string;
  readonly VITE_APP_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
