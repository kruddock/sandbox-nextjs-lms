import { getGlobalTag, getIdTag, getUserTag } from '@/lib/cache'
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
