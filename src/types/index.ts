export type SimpleImage = {
  url: string
  alt: string
  width: number
  height: number
}

export type Quote = {
  text?: string
  characterName?: string
  imgUrl?: SimpleImage
}

export type FavoriteMovie = {
  movies_id: {
    movieId: string
  }
}

export type UserFavorites = {
  name: string
  top5: FavoriteMovie[]
}

export type Scene = {
  title: string
  sceneStarts?: string
  sceneEnds?: string
  sceneImage?: SimpleImage
}

export type SeenBy = {
  name: string
}

export type Movie = {
  id: number
  title?: string
  name?: string
  bannerAlt: SimpleImage
  seenBy?: SeenBy[]
  original_title?: string
  homepage?: string | null
  release_date?: string
  backdrop_path: string
  overview: string
  poster_path: string
  media_type?: string
  vote_count: number
  belongs_to_collection: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  credits: {
    cast: Array<{
      name: string
      profile_path: string
      original_name: string
      character: string
    }>
  }
  videos: {
    results: Array<{
      type: string
      name: string
      key: string
      published_at: string
      site: string
    }>
  }
  similar?: {
    results: Array<{
      id: number
      poster_path: string
      backdrop_path: string
      title: string
      name: string
      original_title: string
      vote_average: number
      vote_count: number
    }>
  }
  production_companies: Array<{
    logo_path: string
    name: string
    origin_country: string
  }>
  quotes?: Quote[]
}

export type MovieInfo = {
  id: number
  backdrop_path: string
  belongs_to_collection: {
    backdrop_path: string
    id: number
    name: string
    poster_path: string
  }
  budget: number
  homepage: string
  original_title: string
  title?: string
  poster_path: string
  overview: string
  genres: Array<{ id: number; name: string }>
  release_date?: string
  vote_average: number
  vote_count: number

  runtime?: number
  revenue: number
  tagline?: string
  popularity: number
}

export type TMDBResponse = Movie & {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type SearchResult = {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv'
  release_date?: string
  first_air_date?: string
  poster_path?: string | null
  backdrop_path?: string | null
  vote_average?: number
}

export class TMDBError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = 'TMDBError'
  }
}

export type TvShow = {
  id: number
  has_seen_show?: string[]
  name?: string
  original_name?: string
  overview?: string
  tagline?: string
  homepage?: string | null
  first_air_date?: string
  vote_average?: number | null
  vote_count?: number
  bannerAlt: SimpleImage
  poster_path?: string | null
  backdrop_path?: string | null
  number_of_episodes?: number
  number_of_seasons?: number
}
