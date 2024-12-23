import { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req }) => {
  const user = req.user

  // Type guard to check if user has a role
  if (user && 'role' in user && user.role?.includes('admin')) {
    return true
  }

  // Need to be logged in
  if (user) {
    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false
}
