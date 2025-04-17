import { UserRole, LessonTable } from '@/drizzle/schema'
import { eq, or } from 'drizzle-orm'

export const canCreateLessons = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const canUpdateLessons = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const canDeleteLessons = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const wherePublicLessons = or(
  eq(LessonTable.status, 'public'),
  eq(LessonTable.status, 'preview')
)
