// import { fetchMoviesByIds } from '@/actions/tmdb'
import { fetchMoviesByIds } from '@/app/actions/tmdb'
import Container from '@/components/ui/container'
import { FocusCards } from '@/components/ui/focus-cards'
import { imageBaseUrl } from '@/constants'
import { fetchFavorites } from '@/lib/queries'
import Image from 'next/image'
import FavoriteRow from '../../movies/_components/FavoriteRow'

type Props = {
  params: Promise<{ name: string }>
}

export default async function Page(props: Props) {
  const { name } = await props.params
  const cmsFavorites = await fetchFavorites()

  const favorites = cmsFavorites.docs

  const userFavorites = favorites.find(
    (favorite) => favorite?.name?.toLowerCase() === name.toLowerCase(),
  )

  const topTenMovieIds = userFavorites?.topTen
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const comedyMovieIds = userFavorites?.comedy
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const actionMovieIds = userFavorites?.action
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const dramaMovieIds = userFavorites?.drama
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const documentaryMovieIds = userFavorites?.documentary
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const warMovieIds = userFavorites?.war
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const martialArtsMovieIds = userFavorites?.martialArts
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const christmasMovieIds = userFavorites?.christmas
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const horrorMovieIds = userFavorites?.horror
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const thrillerMovieIds = userFavorites?.thriller
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const hoodMovieIds = userFavorites?.hoodClassics
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const mobbMovieIds = userFavorites?.mobb
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const sciFiMovieIds = userFavorites?.sciFi
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const westernMovieIds = userFavorites?.western
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const eightiesMovieIds = userFavorites?.eighties
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const postApocalypticMovieIds = userFavorites?.postApocalyptic
    ?.map((movie) => (typeof movie === 'string' ? null : Number(movie.movieId)))
    .filter(Boolean)

  const [
    topTenMovies,
    comedyMovies,
    actionMovies,
    dramaMovies,
    documentaryMovies,
    warMovies,
    martialArtsMovies,
    christmasMovies,
    horrorMovies,
    thrillerMovies,
    hoodMovies,
    mobbMovies,
    sciFiMovies,
    westernMovies,
    eightiesMovies,
    postApocalypticMovies,
  ] = await Promise.all([
    fetchMoviesByIds((topTenMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((comedyMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((actionMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((dramaMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((documentaryMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((warMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((martialArtsMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((christmasMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((horrorMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((thrillerMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((hoodMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((mobbMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((sciFiMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((westernMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((eightiesMovieIds?.filter(Boolean) as number[]) || []),
    fetchMoviesByIds((postApocalypticMovieIds?.filter(Boolean) as number[]) || []),
  ])

  // Handle case when user's favorites are not found
  if (!userFavorites) {
    throw new Error('Favorites not found for this user')
  }

  return (
    <>
      {/* Hero Favorite */}
      <section className="relative h-[600px] w-full 3xl:h-[700px]">
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

        <div className="absolute inset-0 z-[1]">
          <Image
            src={`${imageBaseUrl}${topTenMovies[0].backdrop_path}`}
            alt={topTenMovies[0].title || topTenMovies[0].original_title || ''}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <Container className="relative z-[2] flex h-full flex-col justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-4xl font-bold text-white md:text-8xl">
              <span className="capitalize">{name}&apos;s</span> Favorites
            </h1>
          </div>
        </Container>
      </section>

      <section className="relative z-[4] -mt-[100px]">
        <Container className="grid grid-cols-5 gap-4">
          <FocusCards cards={topTenMovies} />
        </Container>
      </section>

      <section className="mt-10">
        <Container className="flex flex-col gap-4">
          <FavoriteRow title="Comedy" movies={comedyMovies} />
          <FavoriteRow title="Action" movies={actionMovies} />
          <FavoriteRow title="Drama" movies={dramaMovies} />
          <FavoriteRow title="Documentary" movies={documentaryMovies} />
          <FavoriteRow title="Wars" movies={warMovies} />
          <FavoriteRow title="Martial Arts" movies={martialArtsMovies} />
          <FavoriteRow title="Christmas" movies={christmasMovies} />
          <FavoriteRow title="Horror" movies={horrorMovies} />
          <FavoriteRow title="Thriller" movies={thrillerMovies} />
          <FavoriteRow title="Hood Classics" movies={hoodMovies} />
          <FavoriteRow title="Mobb Hits" movies={mobbMovies} />
          <FavoriteRow title="Sci-Fi" movies={sciFiMovies} />
          <FavoriteRow title="Western" movies={westernMovies} />
          <FavoriteRow title="Best of the 80s" movies={eightiesMovies} />
          <FavoriteRow title="Post Apocalyptic" movies={postApocalypticMovies} />
        </Container>
      </section>
    </>
  )
}
