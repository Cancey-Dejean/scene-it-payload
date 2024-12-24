import { fetchMoviesByIds } from '@/app/actions/tmdb'
import { fetchMovies } from '@/lib/queries'
import { Suspense } from 'react'
import { MovieDetail } from '../_components/MovieDetail'
// import FavoriteScenes from '../_components/FavoriteScenes'

type Props = {
  params: Promise<{ movieId: string }>
}

export default async function MovieDetailsPage(props: Props) {
  const { movieId } = await props.params

  const [tmdbMovieDetails, cmsMovies] = await Promise.all([
    fetchMoviesByIds([movieId]),
    fetchMovies(),
  ])

  const tmdbMovie = tmdbMovieDetails[0]
  const movie = cmsMovies.docs.find((movie) => movie.movieId === movieId)

  return (
    <>
      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <MovieDetail movie={movie} details={tmdbMovie} />
      </Suspense>

      <Suspense>{/* <FavoriteScenes /> */}</Suspense>

      {/* {movie?.quotes?.length > 0 && (
        <Suspense>
          <FavoriteQuotes movie={movie} />
        </Suspense>
      )} */}
    </>
  )
}
