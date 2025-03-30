type CACHE_TAG = 'products'

export const getGlobalTag = (tag: CACHE_TAG) => `global:${tag}` as const

export const getIdTag = (tag: CACHE_TAG, id: string) =>
  `id:${id}-${tag}` as const

// export const getUserTag = (tag: CACHE_TAG, userId: string) => `user:${userId}-${tag}` as const

// export const getCourseTag = (tag: CACHE_TAG, courseId: string) => `course:${courseId}-${tag}` as const

// export function getGlobalTag(tag: CACHE_TAG) {
//   return `global:${tag}` as const
// }

// export function getIdTag(tag: CACHE_TAG, id: string) {
//   return `id:${id}-${tag}` as const
// }

// export function getUserTag(tag: CACHE_TAG, userId: string) {
//   return `user:${userId}-${tag}` as const
// }

// export function getCourseTag(tag: CACHE_TAG, courseId: string) {
//   return `course:${courseId}-${tag}` as const
// }
