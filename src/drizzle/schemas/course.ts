import { relations } from 'drizzle-orm'
import { mysqlTable, text } from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
import { CourseProductTable } from './courseProduct'
import { UserCourseAccessTable } from './userCourseAccess'
import { CourseSectionTable } from './courseSection'

export const CourseTable = mysqlTable('courses', {
  id,
  name: text().notNull(),
  description: text(),
  createdAt,
  updatedAt
})

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
  userCourseAccesses: many(UserCourseAccessTable),
  courseSections: many(CourseSectionTable)
}))
