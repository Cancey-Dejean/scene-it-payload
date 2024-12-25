import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user && 'role' in req.user ? Boolean(req.user.role?.includes('admin')) : false
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return user && 'role' in user ? Boolean(user.role?.includes('admin')) : false
}

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, User> = ({
  req: { user },
  doc,
}) => {
  // If no user is logged in, deny access
  if (!user) return false

  // If user is admin, allow access
  if ('role' in user && user.role?.includes('admin')) return true

  // If user is accessing their own record, allow access
  return user.id === doc?.id
}
