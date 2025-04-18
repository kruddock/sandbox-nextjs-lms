import { createEnv } from '@t3-oss/env-nextjs'
import * as v from 'valibot'

export const env = createEnv({
  server: {
    DB_URI: v.pipe(v.string(), v.minLength(1)),
    CLERK_SECRET_KEY: v.pipe(v.string(), v.minLength(1)),
    CLERK_WEBHOOK_SECRET: v.pipe(v.string(), v.minLength(1))
  },
  experimental__runtimeEnv: process.env
})
