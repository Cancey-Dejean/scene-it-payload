import { isAdmin } from '@/lib/access/isAdmin'
import { isAdminOrSelf } from '@/lib/access/isAdminOrSelf'
import type { CollectionConfig } from 'payload'

export const Editors: CollectionConfig = {
  slug: 'editors',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ],
}
