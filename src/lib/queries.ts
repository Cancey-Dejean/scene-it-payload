import { getPayload } from 'payload'
import config from '@payload-config'

// export const queryPostBySlug = async (slug: string) => {
//   const payload = await getPayload({ config });

//   const posts = await payload.find({
//     collection: "posts",
//     limit: 1,
//     where: {
//       slug: {
//         equals: slug,
//       },
//     },
//     select: {
//       id: true,
//       createdBy: true,
//       _status: true,
//       layout: true,
//       createdAt: true,
//       updatedAt: true,
//       body: true,
//       slug: true,
//       meta: true,
//       title: true,
//       featuredImage: true,
//     },
//     populate: {
//       users: {
//         name: true,
//       },
//     },
//   });

//   return posts.docs?.[0] || null;
// });

export async function fetchMoviesForPagination({ limit, page }: { limit: string; page: string }) {
  const payload = await getPayload({ config })

  return await payload.find({
    collection: 'movies',
    limit: parseInt(limit),
    page: parseInt(page),
    sort: ['-date_created'],
  })
}

export async function getTotalMovieCount() {
  const payload = await getPayload({ config })
  return await payload.find({
    collection: 'movies',
  })
}
