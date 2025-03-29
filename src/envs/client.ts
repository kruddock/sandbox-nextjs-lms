import { createEnv } from '@t3-oss/env-nextjs'
// import * as v from 'valibot'

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_VARIABLE_NAME: v.pipe(v.string(), v.minLength(1))
  },
  runtimeEnv: {
    // NEXT_PUBLIC_VARIABLE_NAME: process.env.NEXT_PUBLIC_VARIABLE_NAME
  }
})
