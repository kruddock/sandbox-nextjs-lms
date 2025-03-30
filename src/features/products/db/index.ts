import { CourseProductTable, ProductTable } from '@/drizzle/schema'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { revalidateProductCache } from '../cache'

type ProductInsert = typeof ProductTable.$inferInsert & { courseIds: string[] }
type ProductUpdate = Partial<typeof ProductTable.$inferInsert> & {
  courseIds: string[]
}

export const storeProduct = async (payload: ProductInsert) => {
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

  revalidateProductCache(newId)

  return newId
}

export const updateProduct = async (id: string, payload: ProductUpdate) => {
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

  revalidateProductCache(id)

  return id
}

export const deleteProduct = async (id: string) => {
  await db.delete(ProductTable).where(eq(ProductTable.id, id))

  revalidateProductCache(id)

  return id
}
