// import FavoriteScenes from "@/app/movies/_components/FavoriteScenes";
import { fetchMoviesByIds } from '@/app/actions/tmdb'

import { fetchMovies, fetchScenes } from '@/lib/queries'

import { Suspense } from 'react'
import { MovieDetail } from '../_components/MovieDetail'
import FavoriteScenes from '../_components/FavoriteScenes'

type Props = {
  params: Promise<{ movieId: string }>
}

export default async function MovieDetailsPage(props: Props) {
  const { movieId } = await props.params

  const [tmdbMovieDetails, cmsMovies, movieScenes] = await Promise.all([
    fetchMoviesByIds([movieId]),
    fetchMovies(),
    fetchScenes(),
  ])

  const tmdbMovie = tmdbMovieDetails[0]
  const movie = cmsMovies.docs.find((movie) => movie.movieId === movieId)
  const scenes = movieScenes.docs

  return (
    <>
      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <MovieDetail movie={movie} details={tmdbMovie} />
      </Suspense>

      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <FavoriteScenes scenes={scenes} />
      </Suspense>

      {/* {movie?.quotes?.length > 0 && (
        <Suspense>
          <FavoriteQuotes movie={movie} />
        </Suspense>
      )} */}
    </>
  )
}
