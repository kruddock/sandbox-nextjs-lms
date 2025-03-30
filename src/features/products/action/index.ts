'use server'

import * as v from 'valibot'
import type { InferInput } from 'valibot'
import { redirect } from 'next/navigation'
import { deleteProduct, storeProduct, updateProduct } from '../db'
import { productSchema } from '../schema'

const validate = (unsafeData: InferInput<typeof productSchema>) =>
  v.safeParse(productSchema, unsafeData)

export const add = async (unsafeData: InferInput<typeof productSchema>) => {
  //   const { success, output } = v.safeParse(productSchema, unsafeData)
  const { success, output } = validate(unsafeData)

  if (!success) {
    return { error: true, message: 'There was an error creating your product' }
  }

  await storeProduct(output)

  redirect('/admin/products')
}

export const update = async (
  id: string,
  unsafeData: InferInput<typeof productSchema>
) => {
  //   const { success, output } = v.safeParse(productSchema, unsafeData)
  const { success, output } = validate(unsafeData)

  if (!success) {
    return { error: true, message: 'There was an error updating your product' }
  }

  await updateProduct(id, output)

  redirect('/admin/products')
}

export const remove = async (id: string) => {
  await deleteProduct(id)

  return { error: false, message: 'Successfully deleted your product' }
}
