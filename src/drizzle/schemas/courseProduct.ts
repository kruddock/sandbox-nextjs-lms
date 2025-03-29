import { relations } from 'drizzle-orm'
import { mysqlTable, primaryKey, int } from 'drizzle-orm/mysql-core'
import { createdAt, updatedAt } from '../helpers'
import { CourseTable } from './course'
import { ProductTable } from './product'

export const CourseProductTable = mysqlTable(
  'course_products',
  {
    courseId: int()
      .notNull()
      .references(() => CourseTable.id, { onDelete: 'restrict' }),
    productId: int()
      .notNull()
      .references(() => ProductTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
  },
  (table) => [
    primaryKey({
      columns: [table.courseId, table.productId]
    })
  ]
)

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id]
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id]
    })
  })
)
