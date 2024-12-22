import { fetchMoviesByIds } from "@/actions/tmdb";
import Container from "@/components/ui/container";
import HeroBanner from "@/components/ui/Heroes/HeroBanner";
import MovieList from "@/app/movies/_components/MovieList";
import {
  fetchMoviesForPagination,
  getTotalMovieCount,
} from "@/lib/schemas/movies";

import React, { Suspense } from "react";

import PaginationComponent from "@/components/ui/MainPagination";

export const revalidate = 0;

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const LIMIT = 21;
  const currentPage = Number(params?.page) || 1;
  const movies = await fetchMoviesForPagination({
    limit: String(LIMIT),
    page: String(currentPage),
  });

  const totalMovies = await getTotalMovieCount();

  const allMovies = await fetchMoviesByIds(
    movies.map((movie: { movieId?: string | null }) => String(movie.movieId)),
  );

  return (
    <>
      <Suspense>
        <HeroBanner movie={allMovies} />
        <div className="mt-4 text-center text-lg text-white">
          Total: (<strong>{totalMovies}</strong>)
        </div>
      </Suspense>

      <Suspense>
        <section className="bg-black py-40">
          <Container>
            <MovieList movies={allMovies} />

            {movies.length === 0 && (
              <p className="text-center text-lg text-gray-400">
                No movies found
              </p>
            )}

            <div className="mt-8">
              <PaginationComponent
                limit={LIMIT}
                currentPage={currentPage}
                total={Number(totalMovies)}
              />
            </div>
          </Container>
        </section>
      </Suspense>
    </>
  );
}
