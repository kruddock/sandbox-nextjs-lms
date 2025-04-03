'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { findAll, store, update, remove } from '../db'
import { courseSchema } from '../schema'
import {
  canCreateCourses,
  canDeleteCourses,
  canUpdateCourses
} from '../permissions'
import { getCurrentUser } from '@/services/clerk'
import { getCourseGlobalTag } from '@/features/courses/cache'
import { getUserCourseAccessGlobalTag } from '@/features/courses/cache'
import { getCourseSectionGlobalTag } from '@/features/courses/cache'
import { getLessonGlobalTag } from '@/features/courses/cache'

const validate = (data: InferInput<typeof courseSchema>) =>
  v.safeParse(courseSchema, data)

export const getCourses = async () => {
  'use cache'

  cacheTag(
    getCourseGlobalTag(),
    getUserCourseAccessGlobalTag(),
    getCourseSectionGlobalTag(),
    getLessonGlobalTag()
  )

  const courses = await findAll()

  return courses
}

export const addCourse = async (data: InferInput<typeof courseSchema>) => {
  const { success, output } = validate(data)

  if (!success || !canCreateCourses(await getCurrentUser())) {
    return { error: true, message: 'There was an error creating your course' }
  }

  const course = await store(output)

  return {
    error: false,
    message: 'Successfully updated your course',
    entityId: course.id
  }
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
