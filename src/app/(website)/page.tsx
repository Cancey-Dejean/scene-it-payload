import { fetchTopRatedMovies, fetchTrendingMovies } from '@/app/actions/tmdb'
import HomeHero from '@/components/HomeHero'
import { TopFiveFeatured } from '@/components/TopFiveFeatured'
import Container from '@/components/ui/container'
import { Suspense } from 'react'
import { MovieRow } from './movies/_components/MovieRow'

export default async function Page() {
  const [
    trendingMovies,
    topRatedMovies,
    // movies
  ] = await Promise.all([fetchTrendingMovies(), fetchTopRatedMovies()])

  const randomIndex = Math.floor(Math.random() * topRatedMovies.results.length)
  const topRatedMovie = topRatedMovies.results[randomIndex]

  console.log(topRatedMovie)
  return (
    <>
      <Suspense>
        <HomeHero movie={topRatedMovie} />
      </Suspense>

      <Suspense>
        <section className="relative z-10 mt-[-130px]">
          <Container>
            <MovieRow movies={trendingMovies.results} title="Trending Now" />
          </Container>
        </section>
      </Suspense>

      <TopFiveFeatured className="py-28" />
    </>
  )
}
