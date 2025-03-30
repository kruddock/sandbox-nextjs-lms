import { v4 as uuidv4 } from 'uuid'
import { int, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const uuid = varchar({ length: 128 }).$defaultFn(() => uuidv4())

// export const id = int().autoincrement().notNull()

export const id = uuid.primaryKey()

export const createdAt = timestamp().notNull().defaultNow()

export const updatedAt = timestamp()
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())
