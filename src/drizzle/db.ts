import { drizzle } from 'drizzle-orm/mysql2'

export const db = drizzle('mysql://root:secret@db/sample-db')
