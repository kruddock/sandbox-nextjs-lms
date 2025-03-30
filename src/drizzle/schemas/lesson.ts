// import { relations } from 'drizzle-orm'
import { mysqlTable, int, text, mysqlEnum } from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
// import { CourseProductTable } from './courseProduct'

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

  createdAt,
  updatedAt
})

// export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
//     section: one(CourseSectionTable, {
//       fields: [LessonTable.sectionId],
//       references: [CourseSectionTable.id],
//     }),
//     userLessonsComplete: many(UserLessonCompleteTable),
//   }))
