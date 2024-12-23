import { Suspense } from 'react'
import Form from 'next/form'
import Container from '@/components/ui/container'
import { Input } from '@/components/ui/input'

import { Search } from 'lucide-react'

// import { getTvShows } from '@/lib/schemas/shows'
import { imageBaseUrl } from '@/constants'

import { fetchMoviesByIds, fetchTvShowsByIds } from '@/app/actions/tmdb'
import ItemCard from '@/components/Cards/ItemCard'
import { Button } from '@/components/ui/button'
import { fetchMovies, fetchTvShows } from '@/lib/queries'

interface PageProps {
  searchParams: Promise<{ query?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { query } = await searchParams
  const [movies, shows] = await Promise.all([fetchMovies(), fetchTvShows()])

  // Filter movies based on search query
  const filteredMovies = query
    ? movies.docs.filter((movie) => {
        const movieTitle = movie.title?.toLowerCase() || ''
        const searchQuery = query.toLowerCase()
        return movieTitle.includes(searchQuery)
      })
    : []

  // Filter shows based on search query
  const filteredShows = query
    ? shows.docs.filter((show) => {
        const showTitle = show.title?.toLowerCase() || ''
        const searchQuery = query.toLowerCase()
        return showTitle.includes(searchQuery)
      })
    : []

  // Fetch results from TMDB
  const [movieResults, showResults] = query
    ? await Promise.all([
        fetchMoviesByIds(
          filteredMovies
            .filter((movie) => movie.movieId != null)
            .map((movie) => String(movie.movieId)),
        ),
        fetchTvShowsByIds(
          filteredShows.filter((show) => show.showId != null).map((show) => String(show.showId)),
        ),
      ])
    : [[], []]

  const totalResults = movieResults.length + showResults.length
  const combinedResults = [...movieResults, ...showResults]

  return (
    <section className="bg-black py-40">
      <Container>
        <div className="mb-8 flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white">Search</h1>

          {query && totalResults > 0 && (
            <p className="text-lg text-muted-foreground">
              {totalResults} {totalResults === 1 ? 'result' : 'results'} found
            </p>
          )}

          <Form action="/search" className="relative w-fit min-w-[300px]">
            <Input
              name="query"
              placeholder="Search..."
              defaultValue={query}
              className="max-w-md bg-gray-900 pr-9 text-white"
              type="search"
              required
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-1/2 z-10 flex w-6 -translate-y-1/2 items-center justify-end bg-transparent pr-3 hover:bg-transparent"
            >
              <Search className="size-4 text-white" />
              <span className="sr-only">Search</span>
            </Button>
          </Form>
        </div>

        {!query && <p className="mt-8 text-lg text-gray-400">Add Banner</p>}

        <Suspense>
          <div className="mt-8 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
            {combinedResults.map((result, index) => (
              <div key={index}>
                {result.title && (
                  <ItemCard
                    poster_path={`${imageBaseUrl}${result.poster_path}`}
                    title={result.title}
                    url={`/movies/${result.id}`}
                  />
                )}
                {result.name && (
                  <ItemCard
                    poster_path={`${imageBaseUrl}${result.poster_path}`}
                    title={result.name}
                    url={`/tv/${result.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        </Suspense>

        {query && totalResults === 0 && (
          <p className="text-lg text-gray-400">No results found for &quot;{query}&quot;</p>
        )}
      </Container>
    </section>
  )
}
