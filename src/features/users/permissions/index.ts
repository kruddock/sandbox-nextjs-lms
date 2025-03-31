import { UserRole } from "@/drizzle/schema"

export const canAccessAdminPages = ({ role }: { role: UserRole | undefined }) => role === "admin"