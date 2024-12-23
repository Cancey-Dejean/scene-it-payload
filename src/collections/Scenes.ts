import { isAdminFieldLevel } from '@/lib/access/isAdmin'

import type { CollectionConfig } from 'payload'

export const Scenes: CollectionConfig = {
  slug: 'scenes',
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
    {
      name: 'movies',
      type: 'relationship',
      relationTo: 'movies',
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
    },
  ],
}
