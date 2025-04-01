import { eq } from 'drizzle-orm'
import { db } from '@/drizzle/db'
import { UserTable } from '@/drizzle/schema'
import { revalidateUserCache } from '../cache'

type UserInsert = typeof UserTable.$inferInsert
type UserUpdate = Partial<UserInsert>

export const findById = async (id: string) => {
  const [user] = await db.select().from(UserTable).where(eq(UserTable.id, id))

  if (user == null) throw new Error('Failed to find user')

  return user
}

export const findByClerkUserId = async (clerkUserId: string) => {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.clerkUserId, clerkUserId))

  if (user == null) throw new Error('Failed to find user')

  return user
}

export const store = async (payload: UserInsert) => {
  const [{ id }] = await db
    .insert(UserTable)
    .values(payload)
    .onDuplicateKeyUpdate({ set: payload })
    .$returningId()

  if (id == null) {
    throw new Error('Failed to create user')
  }

  const newUser = await findById(id)

  revalidateUserCache(newUser.id)

  return newUser
}

export const update = async (
  { clerkUserId }: { clerkUserId: string },
  payload: UserUpdate
) => {
  await db
    .update(UserTable)
    .set(payload)
    .where(eq(UserTable.clerkUserId, clerkUserId))

  const updatedUser = await findByClerkUserId(clerkUserId)

  revalidateUserCache(updatedUser.id)

  return updatedUser
}

export const remove = async ({ clerkUserId }: { clerkUserId: string }) => {
  const deletedUser = await findByClerkUserId(clerkUserId)

  await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
      email: 'redacted@deleted.com',
      name: 'Deleted User',
      clerkUserId: 'deleted',
      imageUrl: null
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))

  revalidateUserCache(deletedUser.id)

  return deletedUser
}
