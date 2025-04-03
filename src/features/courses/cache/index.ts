import { getGlobalTag, getIdTag, getUserTag, getCourseTag } from '@/lib/cache'
import { revalidateTag } from 'next/cache'

export const getCourseGlobalTag = () => getGlobalTag('courses')

export const getCourseIdTag = (id: string) => getIdTag('courses', id)

export const revalidateCourseCache = (id: string) => {
  revalidateTag(getCourseGlobalTag())
  revalidateTag(getCourseIdTag(id))
}

export const getUserCourseAccessGlobalTag = () =>
  getGlobalTag('userCourseAccess')

export const getUserCourseAccessIdTag = ({
  courseId,
  userId
}: {
  courseId: string
  userId: string
}) => getIdTag('userCourseAccess', `course:${courseId}-user:${userId}`)

export const getUserCourseAccessUserTag = (userId: string) =>
  getUserTag('userCourseAccess', userId)

export const revalidateUserCourseAccessCache = ({
  courseId,
  userId
}: {
  courseId: string
  userId: string
}) => {
  revalidateTag(getUserCourseAccessGlobalTag())
  revalidateTag(getUserCourseAccessIdTag({ courseId, userId }))
  revalidateTag(getUserCourseAccessUserTag(userId))
}

export const getCourseSectionGlobalTag = () => getGlobalTag('courseSections')

export const getCourseSectionIdTag = (id: string) =>
  getIdTag('courseSections', id)

export const getCourseSectionCourseTag = (courseId: string) =>
  getCourseTag('courseSections', courseId)

export const revalidateCourseSectionCache = ({
  id,
  courseId
}: {
  id: string
  courseId: string
}) => {
  revalidateTag(getCourseSectionGlobalTag())
  revalidateTag(getCourseSectionIdTag(id))
  revalidateTag(getCourseSectionCourseTag(courseId))
}

export const getLessonGlobalTag = () => getGlobalTag('lessons')

export const getLessonIdTag = (id: string) => getIdTag('lessons', id)

export const getLessonCourseTag = (courseId: string) =>
  getCourseTag('lessons', courseId)

export const revalidateLessonCache = ({
  id,
  courseId
}: {
  id: string
  courseId: string
}) => {
  revalidateTag(getLessonGlobalTag())
  revalidateTag(getLessonIdTag(id))
  revalidateTag(getLessonCourseTag(courseId))
}
