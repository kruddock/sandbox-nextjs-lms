import { eq } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { CourseTable } from '@/drizzle/schema'
import { revalidateCourseCache } from '../cache'

type CourseInsert = typeof CourseTable.$inferInsert
type CourseUpdate = Partial<CourseInsert>

export const findById = async (id: string) => {
  const [course] = await db
    .select()
    .from(CourseTable)
    .where(eq(CourseTable.id, id))

  if (course == null) throw new Error('Failed to find course')

  return course
}

export const store = async (payload: CourseInsert) => {
  const [{ id }] = await db.insert(CourseTable).values(payload).$returningId()

  if (id == null) {
    throw new Error('Failed to create course')
  }

  const newCourse = await findById(id)

  revalidateCourseCache(newCourse.id)

  return newCourse
}

export const update = async (id: string, payload: CourseUpdate) => {
  await db.update(CourseTable).set(payload).where(eq(CourseTable.id, id))

  const updatedCourse = await findById(id)

  revalidateCourseCache(updatedCourse.id)

  return updatedCourse
}

export const remove = async (id: string) => {
  const deletedCourse = await findById(id)

  await db.delete(CourseTable).where(eq(CourseTable.id, id))

  revalidateCourseCache(deletedCourse.id)

  return deletedCourse
}
