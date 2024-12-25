import { Field } from 'payload'

import { isAdminOrSelfFieldLevel } from '@/lib/access/isAdmin'

export const ErwinGroup: Field = {
  name: 'erwin',
  type: 'group',
  fields: [
    {
      name: 'movies',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
      access: {
        update: isAdminOrSelfFieldLevel,
      },
    },
  ],
}

export const CanceyGroup: Field = {
  name: 'cancey',
  type: 'group',
  fields: [
    {
      name: 'movies',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
      access: {
        update: isAdminOrSelfFieldLevel,
      },
    },
  ],
}

export const RonaldGroup: Field = {
  name: 'ronald',
  type: 'group',
  fields: [
    {
      name: 'movies',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
      access: {
        update: isAdminOrSelfFieldLevel,
      },
    },
  ],
}
