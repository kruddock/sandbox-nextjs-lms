import { ProductTable, UserRole } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const canAddProducts = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const canUpdateProducts = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const canDeleteProducts = ({ role }: { role: UserRole | undefined }) =>
  role === 'admin'

export const wherePublicProducts = eq(ProductTable.status, 'public')
