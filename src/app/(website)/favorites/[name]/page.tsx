// import { fetchMoviesByIds } from '@/actions/tmdb'
import { fetchAllMovies, fetchMoviesByIds } from '@/app/actions/tmdb'
import Container from '@/components/ui/container'
import { FocusCards } from '@/components/ui/focus-cards'
import { imageBaseUrl } from '@/constants'
import { fetchFavorites, fetchMovies, fetchTopTen } from '@/lib/queries'
// import { getFavorites } from '@/lib/schemas/movies'
import { FavoriteMovie } from '@/types'
import Image from 'next/image'

type Props = {
  params: Promise<{ name: string }>
}

export default async function Page(props: Props) {
  const { name } = await props.params
  const allMovies = await fetchAllMovies()
  const cmsFavorites = await fetchFavorites()

  const favorites = cmsFavorites.docs
  const movies = allMovies.results

  const userFavorites = favorites.find(
    (favorite) => favorite?.name?.toLowerCase() === name.toLowerCase(),
  )
  const topTen = userFavorites?.topTen

  // const { name, id } = favorites[0]

  // Find the favorite list matching the name parameter

  console.log(topTen)

  if (!userFavorites) {
    // Handle case when user's favorites are not found
    throw new Error('Favorites not found for this user')
  }

  // Filter movies from the database that match the user's favorite movie IDs

  // const topTenMovies = favorites.docs[0].cancey

  // Filter favorites to match the favorites

  // console.log(userFavorites)

  return (
    <>
      {/* Hero Favorite */}
      <section className="relative h-[600px] w-full 3xl:h-[700px]">
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

        {/* <div className="absolute inset-0 z-[1]">
          <Image
            src={`${imageBaseUrl}${topTenMovies[0].backdrop_path}`}
            alt={topTenMovies[0].title || topTenMovies[0].original_title || ''}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div> */}

        <Container className="relative z-[2] flex h-full flex-col justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-white md:text-8xl">
              <span className="capitalize">{name}&apos;s</span> Favorites
            </h1>
          </div>
        </Container>
      </section>

      {/* <section className="relative z-[4] -mt-[100px]">
        <Container className="grid grid-cols-5 gap-4">
          <FocusCards cards={topTenMovies?.movies} />
        </Container>
      </section> */}

      <section className="mt-10">
        <Container className="flex flex-col gap-4">
          Hello
          {/* <FavoriteRow title="Comedy" movies={topComedies} />
          <FavoriteRow title="Action" movies={topActions} />
          <FavoriteRow title="Drama" movies={topDramas} />
          <FavoriteRow title="Documentary" movies={topDocumentaries} />
          <FavoriteRow title="Wars" movies={topWars} />
          <FavoriteRow title="Martial Arts" movies={topMartialArts} />
          <FavoriteRow title="Christmas" movies={topChristmas} />
          <FavoriteRow title="Horror" movies={topHorrors} />
          <FavoriteRow title="Thriller" movies={topThrillers} />
          <FavoriteRow title="Hood Classics" movies={topHood} />
          <FavoriteRow title="Mobb Hits" movies={topMobb} />
          <FavoriteRow title="Sci-Fi" movies={topSciFi} />
          <FavoriteRow title="Best of the 80s" movies={top80s} />
          <FavoriteRow title="Post Apocalyptic" movies={topPostApocalyptic} /> */}
        </Container>
      </section>
    </>
  )
}
