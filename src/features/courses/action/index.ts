'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { redirect } from 'next/navigation'
import { store, update, remove } from '../db'
import { courseSchema } from '../schema'
import {
  canCreateCourses,
  canDeleteCourses,
  canUpdateCourses
} from '../permissions'
import { getCurrentUser } from '@/services/clerk'

const validate = (data: InferInput<typeof courseSchema>) =>
  v.safeParse(courseSchema, data)

export const addCourse = async (data: InferInput<typeof courseSchema>) => {
  const { success, output } = validate(data)

  if (!success || !canCreateCourses(await getCurrentUser())) {
    return { error: true, message: 'There was an error creating your course' }
  }

  const course = await store(output)

  redirect(`/admin/courses/${course.id}/edit`)
}

export const updateCourse = async (
  id: string,
  data: InferInput<typeof courseSchema>
) => {
  const { success, output } = validate(data)

  if (!success || !canUpdateCourses(await getCurrentUser())) {
    return { error: true, message: 'There was an error updating your course' }
  }

  await update(id, output)

  return { error: false, message: 'Successfully updated your course' }
}

export const deleteCourse = async (id: string) => {
  if (!canDeleteCourses(await getCurrentUser())) {
    return { error: true, message: 'Error deleting your course' }
  }

  await remove(id)

  return { error: false, message: 'Successfully deleted your course' }
}
