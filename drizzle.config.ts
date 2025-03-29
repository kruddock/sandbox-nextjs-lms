import { defineConfig } from 'drizzle-kit'
import { env } from '@/envs/server'

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: env.DB_URI
  }
})
