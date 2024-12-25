import { getPayload } from 'payload'
import config from '@payload-config'

export async function fetchMovies() {
  const payload = await getPayload({ config })
  return await payload.find({
    collection: 'movies',
    depth: 2,
  })
}

export async function fetchFavorites() {
  const payload = await getPayload({ config })
  return await payload.find({
    collection: 'favorites',
    depth: 2,
  })
}

// export async function fetchScenes() {
//   const payload = await getPayload({ config })
//   return await payload.find({
//     collection: 'scenes',
//     depth: 2,
//   })
// }

export async function fetchTvShows() {
  const payload = await getPayload({ config })
  return await payload.find({
    collection: 'tvShows',
  })
}

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
