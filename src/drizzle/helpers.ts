import { int, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const id = int().autoincrement().notNull()

export const createdAt = timestamp().notNull().defaultNow()

export const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())
