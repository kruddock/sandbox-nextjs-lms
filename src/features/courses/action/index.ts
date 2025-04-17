'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import {
  getCourseGlobalTag,
  getUserCourseAccessGlobalTag,
  getCourseIdTag
} from '@/features/courses/cache'
import {
  getCourseSectionCourseTag,
  getCourseSectionGlobalTag
} from '@/features/courseSections/cache'
import {
  getLessonGlobalTag,
  getLessonCourseTag
} from '@/features/lessons/cache'
import { getCurrentUser } from '@/services/clerk'
import {
  canCreateCourses,
  canDeleteCourses,
  canUpdateCourses
} from '@/features/courses/permissions'
import { courseSchema } from '@/features/courses/schema'
import {
  findAll,
  store,
  update,
  remove,
  findWithDetails
} from '@/features/courses/db'

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

export const getCourse = async (courseId: string) => {
  'use cache'

  cacheTag(
    getCourseIdTag(courseId),
    getCourseSectionCourseTag(courseId),
    getLessonCourseTag(courseId)
  )

  const course = await findWithDetails(courseId)

  return course
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

  return {
    error: false,
    message: 'Successfully updated your course',
    entityId: id
  }
}

export const deleteCourse = async (id: string) => {
  if (!canDeleteCourses(await getCurrentUser())) {
    return { error: true, message: 'Error deleting your course' }
  }

  await remove(id)

  return { error: false, message: 'Successfully deleted your course' }
}
