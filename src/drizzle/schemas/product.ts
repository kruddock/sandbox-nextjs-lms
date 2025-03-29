import { relations } from 'drizzle-orm'
import {
  mysqlTable,
  primaryKey,
  int,
  text,
  mysqlEnum
} from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
import { CourseProductTable } from './courseProduct'

export const productStatuses = ['public', 'private'] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = mysqlEnum('product_status', productStatuses)

export const ProductTable = mysqlTable(
  'products',
  {
    id,
    description: text().notNull(),
    imageUrl: text().notNull(),
    priceInDollars: int().notNull(),
    status: productStatusEnum.notNull().default('private'),
    createdAt,
    updatedAt
  },
  (table) => [primaryKey({ columns: [table.id], name: 'products_id' })]
)

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable)
}))
