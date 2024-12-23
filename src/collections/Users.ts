import { isAdmin, isAdminFieldLevel } from '@/lib/access/isAdmin'
import { isAdminOrSelf } from '@/lib/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  access: {
    create: isAdmin,
    update: isAdminOrSelf,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      saveToJWT: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        // { label: "User", value: "user" },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      required: true,
      defaultValue: 'editor',
    },
  ],
}
