import { anyone } from '@/lib/access/anyone'
import { isAdminFieldLevel } from '@/lib/access/isAdmin'

import type { CollectionConfig } from 'payload'

export const Favorites: CollectionConfig = {
  slug: 'favorites',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: isAdminFieldLevel,
    update: isAdminFieldLevel,
    delete: isAdminFieldLevel,
    read: anyone,
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'topTen',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
  ],
}
