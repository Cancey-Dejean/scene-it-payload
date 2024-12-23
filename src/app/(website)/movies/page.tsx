import Container from '@/components/ui/container'

// import { fetchMoviesForPagination, getTotalMovieCount } from '@/lib/schemas/movies'

import React, { Suspense } from 'react'

import MovieList from './_components/MovieList'
import { fetchMoviesByIds } from '@/app/actions/tmdb'
import HeroBanner from '@/components/Heroes/HeroBanner'
import PaginationComponent from '@/components/MainPagination'
import { fetchMoviesForPagination, getTotalMovieCount } from '@/lib/queries'

export const revalidate = 0

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const LIMIT = 21
  const currentPage = Number(params?.page) || 1

  const movies = await fetchMoviesForPagination({
    limit: String(LIMIT),
    page: String(currentPage),
  })

  const totalMovies = await getTotalMovieCount()

  const allMovies = await fetchMoviesByIds(
    movies.docs.map((movie: { movieId?: string | null }) => String(movie.movieId)),
  )

  console.log(totalMovies.totalDocs)

  return (
    <>
      <Suspense>
        <HeroBanner movie={allMovies} />
        <div className="mt-4 text-center text-lg text-white">
          Total: (<strong>{totalMovies.totalDocs}</strong>)
        </div>
      </Suspense>

      <section className="bg-black py-40">
        <Container>
          <MovieList movies={allMovies} />

          {movies.docs.length === 0 && (
            <p className="text-center text-lg text-gray-400">No movies found</p>
          )}

          {totalMovies.totalDocs > LIMIT && (
            <div className="mt-8">
              <PaginationComponent
                limit={LIMIT}
                currentPage={currentPage}
                total={Number(totalMovies.totalDocs)}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
