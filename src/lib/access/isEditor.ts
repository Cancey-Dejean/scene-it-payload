import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const isEditor: Access = ({ req }) => {
  return req.user && 'role' in req.user ? Boolean(req.user.role?.includes('editor')) : false
}

export const isEditorFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return user && 'role' in user ? Boolean(user.role?.includes('editor')) : false
}
