import { eq, desc, inArray } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { CourseSectionTable, LessonTable } from '@/drizzle/schema'
import { revalidateLessonCache } from '@/features/lessons/cache'

type LessonInsert = typeof LessonTable.$inferInsert
type LessonUpdate = Partial<LessonInsert>

export const store = async (payload: LessonInsert) => {
  const [newLesson, courseId] = await db.transaction(async (tx) => {
    // const [[{ id }], [section]] = await Promise.all([
    //   db.insert(LessonTable).values(payload).$returningId(),
    //   db
    //     .select()
    //     .from(CourseSectionTable)
    //     .where(eq(CourseSectionTable.id, payload.sectionId))
    // ])

    const [{ id }] = await tx.insert(LessonTable).values(payload).$returningId()

    const [newLesson] = await tx
      .select()
      .from(LessonTable)
      .where(eq(LessonTable.id, id))

    if (!newLesson) {
      tx.rollback()

      return [undefined, '']
    }

    const [section] = await tx
      .select()
      .from(CourseSectionTable)
      .where(eq(CourseSectionTable.id, payload.sectionId))

    if (!section) {
      tx.rollback()

      return [undefined, '']
    }

    return [newLesson, section.courseId]
  })

  if (!newLesson) {
    throw new Error('Failed to create lesson')
  }

  revalidateLessonCache({ id: newLesson.id, courseId })

  return newLesson
}

export const update = async (id: string, payload: LessonUpdate) => {
  const [updatedLesson, courseId] = await db.transaction(async (tx) => {
    const [currentLesson] = await tx
      .select()
      .from(LessonTable)
      .where(eq(LessonTable.id, id))

    if (
      payload.sectionId != null &&
      currentLesson?.sectionId !== payload.sectionId &&
      payload.order == null
    ) {
      payload.order = await getNextOrderIndex(payload.sectionId)
    }

    await tx.update(LessonTable).set(payload).where(eq(LessonTable.id, id))

    const [updatedLesson] = await tx
      .select()
      .from(LessonTable)
      .where(eq(LessonTable.id, id))

    if (!updatedLesson) {
      tx.rollback()

      return [undefined, '']
    }

    const [section] = await tx
      .select()
      .from(CourseSectionTable)
      .where(eq(CourseSectionTable.id, updatedLesson.sectionId))

    if (!section) {
      tx.rollback()

      return [undefined, '']
    }

    return [updatedLesson, section.courseId]
  })

  if (!updatedLesson) {
    throw new Error('Failed to update lesson')
  }

  revalidateLessonCache({ id: updatedLesson.id, courseId })

  return updatedLesson
}

export const remove = async (id: string) => {
  const [deletedLesson, courseId] = await db.transaction(async (tx) => {
    const [deletedLesson] = await tx
      .select()
      .from(LessonTable)
      .where(eq(LessonTable.id, id))

    if (!deletedLesson) {
      return [undefined, '']
    }

    await tx.delete(LessonTable).where(eq(LessonTable.id, id))

    const [section] = await tx
      .select()
      .from(CourseSectionTable)
      .where(eq(CourseSectionTable.id, deletedLesson.sectionId))

    if (!section) {
      tx.rollback()

      return [undefined, '']
    }

    return [deletedLesson, section.courseId]
  })

  if (!deletedLesson) {
    throw new Error('Failed to delete lesson')
  }

  revalidateLessonCache({ id: deletedLesson.id, courseId })

  return deletedLesson
}

export const getNextOrderIndex = async (sectionId: string) => {
  const [lesson] = await db
    .select({ order: LessonTable.order })
    .from(LessonTable)
    .where(eq(LessonTable.sectionId, sectionId))
    .orderBy(desc(LessonTable.order))

  return lesson ? lesson.order + 1 : 0
}

export const updateLessonOrder = async (lessonIds: string[]) => {
  const [lessons, courseId] = await db.transaction(async (tx) => {
    await Promise.all(
      lessonIds.map((id, index) =>
        db
          .update(LessonTable)
          .set({ order: index })
          .where(eq(LessonTable.id, id))
      )
    )

    const lessons = await tx
      .select({
        id: LessonTable.id,
        sectionId: LessonTable.sectionId
      })
      .from(LessonTable)
      .where(inArray(LessonTable.id, lessonIds))

    const [firstLesson] = lessons

    const sectionId = firstLesson?.sectionId

    if (!sectionId) {
      tx.rollback()

      return [[], '']
    }

    const [section] = await tx
      .select({
        courseId: CourseSectionTable.courseId
      })
      .from(CourseSectionTable)
      .where(eq(CourseSectionTable.id, sectionId))

    if (!section) {
      tx.rollback()

      return [[], '']
    }

    return [lessons, section.courseId]
  })

  lessons.flat().forEach(({ id }) => {
    revalidateLessonCache({
      courseId,
      id
    })
  })
}
