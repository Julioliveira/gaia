declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test'
    DATABASE_URL: string
    AUTH_API_URL: string
    MEDICAL_RECORD_API_URL: string
    PORT: string
  }
}
