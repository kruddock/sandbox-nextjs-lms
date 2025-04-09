import { eq, desc, inArray } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { CourseSectionTable } from '@/drizzle/schema'
import { revalidateCourseSectionCache } from '../cache'

type CourseSectionInsert = typeof CourseSectionTable.$inferInsert
type CourseSectionUpdate = Partial<CourseSectionInsert>

export const findById = async (id: string) => {
  const [course] = await db
    .select()
    .from(CourseSectionTable)
    .where(eq(CourseSectionTable.id, id))

  if (course == null) throw new Error('Failed to find course')

  return course
}

export const store = async (payload: CourseSectionInsert) => {
  const [{ id }] = await db
    .insert(CourseSectionTable)
    .values(payload)
    .$returningId()

  if (id == null) {
    throw new Error('Failed to create section')
  }

  const newCourseSection = await findById(id)

  revalidateCourseSectionCache({
    courseId: newCourseSection.courseId,
    id: newCourseSection.id
  })

  return newCourseSection
}

export const update = async (id: string, payload: CourseSectionUpdate) => {
  await db
    .update(CourseSectionTable)
    .set(payload)
    .where(eq(CourseSectionTable.id, id))

  const updatedSection = await findById(id)

  revalidateCourseSectionCache({
    courseId: updatedSection.courseId,
    id: updatedSection.id
  })

  return updatedSection
}

export const remove = async (id: string) => {
  const deletedSection = await findById(id)

  await db.delete(CourseSectionTable).where(eq(CourseSectionTable.id, id))

  revalidateCourseSectionCache({
    courseId: deletedSection.courseId,
    id: deletedSection.id
  })

  return deletedSection
}

export const getNextOrderIndex = async (courseId: string) => {
  const [section] = await db
    .select({ order: CourseSectionTable.order })
    .from(CourseSectionTable)
    .where(eq(CourseSectionTable.courseId, courseId))
    .orderBy(desc(CourseSectionTable.order))

  return section ? section.order + 1 : 0
}

export const changeSectionOrders = async (sectionIds: string[]) => {
  await Promise.all(
    sectionIds.map((id, index) =>
      db
        .update(CourseSectionTable)
        .set({ order: index })
        .where(eq(CourseSectionTable.id, id))
    )
  )

  const sections = await db
    .select({
      id: CourseSectionTable.id,
      courseId: CourseSectionTable.courseId
    })
    .from(CourseSectionTable)
    .where(inArray(CourseSectionTable.id, sectionIds))

  sections.flat().forEach(({ id, courseId }) => {
    revalidateCourseSectionCache({
      courseId,
      id
    })
  })
}
