'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { redirect } from 'next/navigation'
import { store, update, remove } from '../db'
import { productSchema } from '../schema'

const validate = (data: InferInput<typeof productSchema>) =>
  v.safeParse(productSchema, data)

export const addProduct = async (data: InferInput<typeof productSchema>) => {
  const { success, output } = validate(data)

  if (!success) {
    return { error: true, message: 'There was an error creating your product' }
  }

  await store(output)

  redirect('/admin/products')
}

export const updateProduct = async (
  id: string,
  data: InferInput<typeof productSchema>
) => {
  //   const { success, output } = v.safeParse(productSchema, data)
  const { success, output } = validate(data)

  if (!success) {
    return { error: true, message: 'There was an error updating your product' }
  }

  await update(id, output)

  redirect('/admin/products')
}

export const deleteProduct = async (id: string) => {
  await remove(id)

  return { error: false, message: 'Successfully deleted your product' }
}
