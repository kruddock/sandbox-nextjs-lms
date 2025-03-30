import { relations } from 'drizzle-orm'
import { mysqlTable, int, text, mysqlEnum } from 'drizzle-orm/mysql-core'
import { id, uuid, createdAt, updatedAt } from '../helpers'
import { CourseTable } from './course'
import { LessonTable } from './lesson'

export const courseSectionStatuses = ['public', 'private'] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = mysqlEnum(
  'course_section_status',
  courseSectionStatuses
)

export const CourseSectionTable = mysqlTable('course_sections', {
  id,
  name: text().notNull(),
  status: courseSectionStatusEnum.notNull().default('private'),
  order: int().notNull(),
  courseId: uuid
    .notNull()
    .references(() => CourseTable.id, { onDelete: 'cascade' }),
  createdAt,
  updatedAt
})

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ many, one }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id]
    }),
    lessons: many(LessonTable)
  })
)
