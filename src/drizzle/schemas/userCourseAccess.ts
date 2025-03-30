import { relations } from 'drizzle-orm'
import { mysqlTable, varchar, primaryKey } from 'drizzle-orm/mysql-core'
import { createdAt, updatedAt } from '../helpers'
import { UserTable } from './user'
import { CourseTable } from './course'

export const UserCourseAccessTable = mysqlTable(
  'user_course_access',
  {
    userId: varchar({ length: 128 })
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    courseId: varchar({ length: 128 })
      .notNull()
      .references(() => CourseTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
  },
  (table) => [primaryKey({ columns: [table.userId, table.courseId] })]
)

export const UserCourseAccessRelationships = relations(
  UserCourseAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserCourseAccessTable.userId],
      references: [UserTable.id]
    }),
    course: one(CourseTable, {
      fields: [UserCourseAccessTable.courseId],
      references: [CourseTable.id]
    })
  })
)
