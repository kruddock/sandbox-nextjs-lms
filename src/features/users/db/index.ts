import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { UserTable } from '@/drizzle/schema'
// import { revalidateUserCache } from '../cache'

type UserInsert = typeof UserTable.$inferInsert
type UserUpdate = Partial<UserInsert>

export const storeUser = async (payload: UserInsert) => {
  //   try {
  //     const [{ id }] = await db
  //       .insert(UserTable)
  //       .values(payload)
  //       .onDuplicateKeyUpdate({ set: payload })
  //       .$returningId()

  //     revalidateUserCache(id)
  //   } catch {
  //     throw new Error('Failed to create user')
  //   }

  const [{ id }] = await db
    .insert(UserTable)
    .values(payload)
    .onDuplicateKeyUpdate({ set: payload })
    .$returningId()

  if (id == null) {
    throw new Error('Failed to create user')
  }

  const [newUser] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, id))

  if (newUser == null) throw new Error('Failed to find user')

  //   revalidateUserCache(id)

  return newUser
}

export const updateUser = async (
  { clerkUserId }: { clerkUserId: string },
  payload: UserUpdate
) => {
  const res = await db
    .update(UserTable)
    .set(payload)
    .where(eq(UserTable.clerkUserId, clerkUserId))

  console.log(res)

  //   const [updatedUser] = await db
  //     .select()
  //     .from(UserTable)
  //     .where(eq(UserTable.clerkUserId, clerkUserId))

  //   if (updatedUser == null) throw new Error('Failed to update user')

  //   revalidateUserCache(updatedUser.id)

  //   return updatedUser
}

export const deleteUser = async ({ clerkUserId }: { clerkUserId: string }) => {
  const res = await db
    .update(UserTable)
    .set({
      deletedAt: new Date(),
      email: 'redacted@deleted.com',
      name: 'Deleted User',
      clerkUserId: 'deleted',
      imageUrl: null
    })
    .where(eq(UserTable.clerkUserId, clerkUserId))

  console.log(res)

  //   const [updatedUser] = await db
  //     .select()
  //     .from(UserTable)
  //     .where(eq(UserTable.clerkUserId, clerkUserId))

  //   if (updatedUser == null) throw new Error('Failed to update user')

  //   revalidateUserCache(updatedUser.id)

  //   return updatedUser
}
