import { createEnv } from '@t3-oss/env-nextjs'
import * as v from 'valibot'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: v.pipe(v.string(), v.minLength(1)),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: v.pipe(v.string(), v.minLength(1)),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: v.pipe(v.string(), v.minLength(1))
    // NEXT_PUBLIC_VARIABLE_NAME: v.pipe(v.string(), v.minLength(1))
  },
  runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL
    // NEXT_PUBLIC_VARIABLE_NAME: process.env.NEXT_PUBLIC_VARIABLE_NAME
  }
})
