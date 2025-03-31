import { UserRole } from '@/drizzle/schema'
import { getUserIdTag } from '@/features/users/cache'
import { findById } from '@/features/users/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { cacheTag } from 'next/dist/server/use-cache/cache-tag'

const client = await clerkClient()

export const getCurrentUser = async ({ allData = false } = {}) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  return {
    clerkUserId: userId,
    userId: sessionClaims?.dbId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.dbId != null
        ? await getUser(sessionClaims.dbId)
        : undefined,
    redirectToSignIn
  }
}

export const syncClerkUserMetadata = (user: {
  id: string
  clerkUserId: string
  role: UserRole
}) => {
  return client.users.updateUserMetadata(user.clerkUserId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role
    }
  })
}

const getUser = async (id: string) => {
  'use cache'
  cacheTag(getUserIdTag(id))

  return findById(id)
}
