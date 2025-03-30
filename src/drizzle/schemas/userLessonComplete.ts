import { relations } from 'drizzle-orm'
import { mysqlTable, varchar, primaryKey } from 'drizzle-orm/mysql-core'
import { createdAt, updatedAt } from '../helpers'
import { UserTable } from './user'
import { LessonTable } from './lesson'

export const UserLessonCompleteTable = mysqlTable(
  'user_lesson_complete',
  {
    userId: varchar({ length: 128 })
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    lessonId: varchar({ length: 128 })
      .notNull()
      .references(() => LessonTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt
  },
  (table) => [primaryKey({ columns: [table.userId, table.lessonId] })]
)

export const UserLessonCompleteRelationships = relations(
  UserLessonCompleteTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserLessonCompleteTable.userId],
      references: [UserTable.id]
    }),
    lesson: one(LessonTable, {
      fields: [UserLessonCompleteTable.lessonId],
      references: [LessonTable.id]
    })
  })
)
