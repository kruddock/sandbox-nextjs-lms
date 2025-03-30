import { relations } from 'drizzle-orm'
import {
  mysqlTable,
  int,
  varchar,
  json,
  timestamp
} from 'drizzle-orm/mysql-core'
import { id, uuid, createdAt, updatedAt } from '../helpers'
import { UserTable } from './user'
import { ProductTable } from './product'

type ProductDetails = { name: string; description: string; imageUrl: string }

export const PurchaseTable = mysqlTable('purchases', {
  id,
  pricePaidInCents: int().notNull(),
  productDetails: json().notNull().$type<ProductDetails>(),
  userId: uuid
    .notNull()
    .references(() => UserTable.id, { onDelete: 'restrict' }),
  productId: uuid
    .notNull()
    .references(() => ProductTable.id, { onDelete: 'restrict' }),
  stripeSessionId: varchar({ length: 128 }).notNull().unique(),
  refundedAt: timestamp(),
  createdAt,
  updatedAt
})

export const PurchaseRelationships = relations(PurchaseTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [PurchaseTable.userId],
    references: [UserTable.id]
  }),
  product: one(ProductTable, {
    fields: [PurchaseTable.productId],
    references: [ProductTable.id]
  })
}))
