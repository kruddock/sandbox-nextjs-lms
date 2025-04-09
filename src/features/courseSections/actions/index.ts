'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { sectionSchema } from '../schema'
import {
  changeSectionOrders,
  getNextOrderIndex,
  remove,
  store,
  update
} from '../db'
import {
  canCreateCourseSections,
  canDeleteCourseSections,
  canUpdateCourseSections
} from '../permissions'
import { getCurrentUser } from '@/services/clerk'

const validate = (data: InferInput<typeof sectionSchema>) =>
  v.safeParse(sectionSchema, data)

export const addSection = async (
  courseId: string,
  data: InferInput<typeof sectionSchema>
) => {
  const { success, output } = validate(data)

  if (!success || !canCreateCourseSections(await getCurrentUser())) {
    return { error: true, message: 'There was an error creating your section' }
  }

  const order = await getNextOrderIndex(courseId)

  await store({ ...output, courseId, order })

  return { error: false, message: 'Successfully created your section' }
}

export const updateSection = async (
  id: string,
  data: InferInput<typeof sectionSchema>
) => {
  const { success, output } = validate(data)

  if (!success || !canUpdateCourseSections(await getCurrentUser())) {
    return { error: true, message: 'There was an error updating your section' }
  }

  await update(id, output)

  return { error: false, message: 'Successfully updated your section' }
}

export const deleteSection = async (id: string) => {
  if (!canDeleteCourseSections(await getCurrentUser())) {
    return { error: true, message: 'Error deleting your section' }
  }

  await remove(id)

  return { error: false, message: 'Successfully deleted your section' }
}

export const updateSectionOrders = async (sectionIds: string[]) => {
  if (
    sectionIds.length === 0 ||
    !canUpdateCourseSections(await getCurrentUser())
  ) {
    return { error: true, message: 'Error reordering your sections' }
  }

  await changeSectionOrders(sectionIds)

  return { error: false, message: 'Successfully reordered your sections' }
}
