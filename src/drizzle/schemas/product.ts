import { relations } from 'drizzle-orm'
import { mysqlTable, int, text, mysqlEnum } from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
import { CourseProductTable } from './courseProduct'

export const productStatuses = ['public', 'private'] as const
export type ProductStatus = (typeof productStatuses)[number]
export const productStatusEnum = mysqlEnum('product_status', productStatuses)

export const ProductTable = mysqlTable('products', {
  id,
  description: text().notNull(),
  imageUrl: text().notNull(),
  priceInDollars: int().notNull(),
  status: productStatusEnum.notNull().default('private'),
  createdAt,
  updatedAt
})

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable)
}))
