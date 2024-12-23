import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user && 'role' in req.user ? Boolean(req.user.role?.includes('admin')) : false
}

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return user && 'role' in user ? Boolean(user.role?.includes('admin')) : false
}
