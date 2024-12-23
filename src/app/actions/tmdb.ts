'use server'

import { SearchResult, TMDBResponse } from '@/types'

const TMDB_API_KEY = process.env.TMDB_API_KEY!
const BASE_URL = 'https://api.themoviedb.org/3'

export async function searchTMDB(query: string): Promise<SearchResult[]> {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB')
  }

  const data = await response.json()
  return data.results.filter(
    (item: SearchResult) => item.media_type === 'movie' || item.media_type === 'tv',
  )
}

export async function fetchTopRatedMovies(page: number = 1): Promise<TMDBResponse> {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch top rated movies')
  }

  return res.json()
}

export async function fetchAllMovies(page: number = 1): Promise<TMDBResponse> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch movies')
  }

  return res.json()
}

export async function fetchById(
  id: string,
  mediaType: 'movie' | 'tv' | 'person',
): Promise<TMDBResponse> {
  const res = await fetch(
    `${BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,similar`,
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch ${mediaType} details for ID: ${id}`)
  }

  return res.json()
}

export async function fetchMoviesByIds(movieIds: string[] | number[]): Promise<TMDBResponse[]> {
  // Convert all IDs to strings for consistency
  const ids = movieIds.map((id) => id.toString())

  // Fetch all movies in parallel
  const moviePromises = ids.map((id) =>
    fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(`Failed to fetch movie with ID: ${id}`)
          return null
        }
        return res.json()
      })
      .catch((error) => {
        console.error(`Error fetching movie ${id}:`, error)
        return null
      }),
  )

  const movies = await Promise.all(moviePromises)
  // Filter out any null responses
  return movies.filter((movie) => movie !== null)
}

export async function fetchTrendingMovies(): Promise<TMDBResponse> {
  const res = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch trending content')
  }

  return res.json()
}

export async function fetchMovieDetails(id: string): Promise<TMDBResponse> {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

export async function fetchAllTvShows(page: number = 1): Promise<TMDBResponse> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`,
    { next: { revalidate: 3600 } },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch TV shows')
  }

  return res.json()
}

export async function fetchTrendingTvShows(): Promise<TMDBResponse> {
  const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${TMDB_API_KEY}&language=en-US`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch trending TV shows')
  }

  return res.json()
}

export async function fetchTvShowsByIds(tvShowIds: string[] | number[]): Promise<TMDBResponse[]> {
  // Convert all IDs to strings for consistency
  const ids = tvShowIds.map((id) => id.toString())

  // Fetch all TV shows in parallel
  const tvShowPromises = ids.map((id) =>
    fetch(`${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
      next: { revalidate: 3600 },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(`Failed to fetch TV show with ID: ${id}`)
          return null
        }
        return res.json()
      })
      .catch((error) => {
        console.error(`Error fetching TV show ${id}:`, error)
        return null
      }),
  )

  const tvShows = await Promise.all(tvShowPromises)
  // Filter out any null responses
  return tvShows.filter((show) => show !== null)
}

export async function fetchTvShowDetails(id: string): Promise<TMDBResponse> {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return res.json()
}

export async function fetchMediaByIds(items: Array<{ id: string; type: 'movie' | 'tv' }>) {
  const results = await Promise.all(
    items.map(async ({ id, type }) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}`,
      )
      return response.json()
    }),
  )
  return results
}
