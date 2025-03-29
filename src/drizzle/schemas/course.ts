import { relations } from 'drizzle-orm'
import { mysqlTable, primaryKey, text } from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
import { CourseProductTable } from './courseProduct'

export const CourseTable = mysqlTable(
  'courses',
  {
    id,
    name: text().notNull(),
    createdAt,
    updatedAt
  },
  (table) => [primaryKey({ columns: [table.id], name: 'courses_id' })]
)

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable)
  // userCourseAccesses: many(UserCourseAccessTable),
  // courseSections: many(CourseSectionTable),
}))
