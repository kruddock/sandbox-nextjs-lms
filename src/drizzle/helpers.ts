import { v4 as uuidv4 } from 'uuid'
import { timestamp, varchar } from 'drizzle-orm/mysql-core'

export const id = varchar({ length: 128 })
  .$defaultFn(() => uuidv4())
  .primaryKey()

export const createdAt = timestamp().notNull().defaultNow()

export const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())
