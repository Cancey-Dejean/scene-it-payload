// import FavoriteScenes from "@/app/movies/_components/FavoriteScenes";
import { fetchMoviesByIds } from '@/app/actions/tmdb'

import { fetchMovies } from '@/lib/queries'
// import FavoriteQuotes from "@/app/movies/_components/Quotes";
// import { getMovies } from "@/lib/schemas/movies";
import { Suspense } from 'react'
import { MovieDetail } from '../_components/MovieDetail'

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

  // console.log(movie);

  return (
    <>
      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <MovieDetail movie={movie} details={tmdbMovie} />
      </Suspense>

      <Suspense>{/* <FavoriteScenes movie={movie} /> */}</Suspense>

      {/* {movie?.quotes?.length > 0 && (
        <Suspense>
          <FavoriteQuotes movie={movie} />
        </Suspense>
      )} */}
    </>
  )
}
