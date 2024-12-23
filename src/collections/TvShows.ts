import { isAdminFieldLevel } from '@/lib/access/isAdmin'

import type { CollectionConfig } from 'payload'

export const TvShows: CollectionConfig = {
  slug: 'tvShows',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'showId',
      label: 'Show ID',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'seenBy',
      label: 'Has Seen Movie?',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'bannerAlt',
      label: 'Alternate Banner',
      type: 'upload',
      relationTo: 'media',
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
}
