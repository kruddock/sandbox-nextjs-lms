import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { CourseProductTable, ProductTable } from '@/drizzle/schema'
import { revalidateProductCache } from '../cache'

type ProductInsert = typeof ProductTable.$inferInsert & { courseIds: string[] }
type ProductUpdate = Partial<typeof ProductTable.$inferInsert> & {
  courseIds: string[]
}

export const findById = async (id: string) => {
  const [product] = await db
    .select()
    .from(ProductTable)
    .where(eq(ProductTable.id, id))

  if (product == null) throw new Error('Failed to find product')

  return product
}

export const store = async (payload: ProductInsert) => {
  const newId = await db.transaction(async (tx) => {
    const { courseIds, ...data } = payload

    const [{ id }] = await tx.insert(ProductTable).values(data).$returningId()

    if (id == null) {
      tx.rollback()
      throw new Error('Failed to create product')
    }

    await tx.insert(CourseProductTable).values(
      courseIds.map((courseId) => ({
        productId: id,
        courseId
      }))
    )

    return id
  })

  const newProduct = await findById(newId)

  revalidateProductCache(newProduct.id)

  return newProduct
}

export const update = async (id: string, payload: ProductUpdate) => {
  await db.transaction(async (tx) => {
    const { courseIds, ...data } = payload

    await tx.update(ProductTable).set(data).where(eq(ProductTable.id, id))

    await tx
      .delete(CourseProductTable)
      .where(eq(CourseProductTable.productId, id))

    await tx.insert(CourseProductTable).values(
      courseIds.map((courseId) => ({
        productId: id,
        courseId
      }))
    )
  })

  const updatedProduct = await findById(id)

  revalidateProductCache(updatedProduct.id)

  return updatedProduct
}

export const remove = async (id: string) => {
  const deletedProduct = await findById(id)

  await db.delete(ProductTable).where(eq(ProductTable.id, id))

  revalidateProductCache(deletedProduct.id)

  return deletedProduct
}
