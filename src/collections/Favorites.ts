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
    {
      name: 'comedy',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'action',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'drama',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'documentary',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'war',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'martialArts',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'christmas',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'horror',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'thriller',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'hoodClassics',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'mobb',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'sciFi',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'western',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'eighties',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
    {
      name: 'postApocalyptic',
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      maxRows: 10,
    },
  ],
}
