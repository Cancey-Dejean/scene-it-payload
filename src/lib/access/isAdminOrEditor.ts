import { Access } from 'payload'

export const isAdminOrEditor: Access = ({ req }) => {
  const user = req.user

  // Check if user has 'admin' or 'editor' role
  if (user && 'role' in user) {
    const userRole = user.role?.toLowerCase()
    return userRole === 'admin' || userRole === 'editor'
  }

  // Disallow all others
  return false
}
