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
    // {
    //   name: 'relatedScenes',
    //   type: 'join',
    //   collection: 'scenes',
    //   on: 'movies',
    // },
    {
      name: 'scenes',
      type: 'array',
      fields: [
        {
          name: 'sceneStarts',
          label: 'Scene Starts',
          type: 'text',
        },
        {
          name: 'sceneEnds',
          label: 'Scene Ends',
          type: 'text',
        },
        {
          name: 'sceneImage',
          label: 'Scene Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
