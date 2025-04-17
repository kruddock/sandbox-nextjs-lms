'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { getCurrentUser } from '@/services/clerk'
import {
  canCreateLessons,
  canUpdateLessons,
  canDeleteLessons
} from '@/features/lessons/permissions'
import { lessonSchema } from '@/features/lessons/schema'
import {
  store,
  update,
  remove,
  getNextOrderIndex,
  updateLessonOrder
} from '@/features/lessons/db'

const validate = (data: InferInput<typeof lessonSchema>) =>
  v.safeParse(lessonSchema, data)

export const addLesson = async (data: InferInput<typeof lessonSchema>) => {
  const { success, output } = validate(data)

  if (!success || !canCreateLessons(await getCurrentUser())) {
    return { error: true, message: 'There was an error creating your lesson' }
  }

  const order = await getNextOrderIndex(data.sectionId)

  await store({ ...output, order })

  return { error: false, message: 'Successfully created your lesson' }
}

export const updateLesson = async (
  id: string,
  data: InferInput<typeof lessonSchema>
) => {
  const { success, output } = validate(data)

  if (!success || !canUpdateLessons(await getCurrentUser())) {
    return { error: true, message: 'There was an error updating your lesson' }
  }

  await update(id, output)

  return { error: false, message: 'Successfully updated your lesson' }
}

export const deleteLesson = async (id: string) => {
  if (!canDeleteLessons(await getCurrentUser())) {
    return { error: true, message: 'Error deleting your lesson' }
  }

  await remove(id)

  return { error: false, message: 'Successfully deleted your lesson' }
}

export const reorderLessons = async (lessonIds: string[]) => {
  if (lessonIds.length === 0 || !canUpdateLessons(await getCurrentUser())) {
    return { error: true, message: 'Error reordering your lessons' }
  }

  await updateLessonOrder(lessonIds)

  return { error: false, message: 'Successfully reordered your sections' }
}
