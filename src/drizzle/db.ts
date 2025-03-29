import { drizzle } from 'drizzle-orm/mysql2'
import { env } from '@/envs/server'

export const db = drizzle(env.DB_URI)
