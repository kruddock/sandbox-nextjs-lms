import { relations } from 'drizzle-orm'
import { mysqlTable, int, text, mysqlEnum } from 'drizzle-orm/mysql-core'
import { id, uuid, createdAt, updatedAt } from '../helpers'
import { CourseSectionTable } from './courseSection'
import { UserLessonCompleteTable } from './userLessonComplete'

export const lessonStatuses = ['public', 'private', 'preview'] as const
export type LessonStatus = (typeof lessonStatuses)[number]
export const lessonStatusEnum = mysqlEnum('lesson_status', lessonStatuses)

export const LessonTable = mysqlTable('lessons', {
  id,
  name: text().notNull(),
  description: text(),
  youtubeVideoId: text().notNull(),
  order: int().notNull(),
  status: lessonStatusEnum.notNull().default('private'),
  sectionId: uuid
    .notNull()
    .references(() => CourseSectionTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt
})

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id]
  }),
  userLessonsComplete: many(UserLessonCompleteTable)
}))
