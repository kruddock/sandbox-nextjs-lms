import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/drizzle/migrations',
  schema: './src/drizzle/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: 'mysql://root:secret@db/sample-db'
  }
})
