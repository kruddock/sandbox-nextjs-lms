// import { relations } from 'drizzle-orm'
import {
  mysqlTable,
  text,
  varchar,
  timestamp,
  mysqlEnum
} from 'drizzle-orm/mysql-core'
import { id, createdAt, updatedAt } from '../helpers'
// import { CourseProductTable } from './courseProduct'

export const userRoles = ['user', 'admin'] as const
export type UserRole = (typeof userRoles)[number]
export const userRoleEnum = mysqlEnum('user_role', userRoles)

export const UserTable = mysqlTable('users', {
  id,
  clerkUserId: varchar({ length: 128 }).notNull().unique(),
  email: text().notNull(),
  name: text().notNull(),
  role: userRoleEnum.notNull().default('user'),
  imageUrl: text(),
  deletedAt: timestamp(),
  createdAt,
  updatedAt
})

// export const UserRelationships = relations(UserTable, ({ many }) => ({
//     userCourseAccesses: many(UserCourseAccessTable),
//   }))
