import { UserRole, CourseSectionTable } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const canCreateCourseSections = ({
  role
}: {
  role: UserRole | undefined
}) => role === 'admin'

export const canUpdateCourseSections = ({
  role
}: {
  role: UserRole | undefined
}) => role === 'admin'

export const canDeleteCourseSections = ({
  role
}: {
  role: UserRole | undefined
}) => role === 'admin'

export const wherePublicCourseSections = eq(CourseSectionTable.status, 'public')
