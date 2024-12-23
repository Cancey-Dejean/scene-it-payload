import { anyone } from '@/lib/access/anyone'
import { isAdminFieldLevel } from '@/lib/access/isAdmin'

import type { CollectionConfig } from 'payload'

export const Movies: CollectionConfig = {
  slug: 'movies',
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
      name: 'movieId',
      label: 'Movie ID',
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
    {
      name: 'relatedScenes',
      type: 'join',
      collection: 'scenes',
      on: 'movies',
    },
  ],
}
