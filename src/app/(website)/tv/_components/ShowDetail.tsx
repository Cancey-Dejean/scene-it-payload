import Image from 'next/image'
import { Star, Calendar, Tv } from 'lucide-react'
import { imageBaseUrl } from '@/constants'
import Container from '@/components/ui/container'
import { TvShow } from '@/types'

type ShowDetailProps = {
  show: TvShow
  details: {
    backdrop_path: string
    homepage: string
    id: number
    popularity: number
    poster_path: string
    overview: string
    name?: string
    first_air_date?: string
    vote_average: number
    vote_count: number
    number_of_seasons?: number
  }
}

export function ShowDetail({ show }: ShowDetailProps) {
  const title = show.name || show.original_name || ''
  const releaseDate = show.first_air_date
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Release date unknown'

  return (
    <section className="relative h-[600px] w-full">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        {show.bannerAlt ? (
          <div>Banner Alternative for TV</div>
        ) : (
          // <Image
          //   src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${show.banner_alt?.filename_disk}`}
          //   alt={title}
          //   fill
          //   priority
          //   className="object-cover"
          //   sizes="100vw"
          // />
          <Image
            src={`${imageBaseUrl}${show.backdrop_path}`}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-end pb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">{title}</h1>

        {show.tagline && <p className="mb-4 text-xl text-gray-300">{show.tagline}</p>}

        <div className="flex flex-wrap justify-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            <span>{Math.round((show.vote_average ?? 0) * 10) / 10}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tv className="size-5" />
            <span className="capitalize">TV</span>
          </div>
        </div>

        <div className="mx-auto mt-4 max-w-3xl">
          <p className="text-lg text-gray-300">{show.overview}</p>
        </div>

        <div>
          {show.has_seen_show && (
            <div className="text-white">
              <h3 className="mb-4 mt-6 text-lg font-bold text-green-500">Seen by:</h3>
              <div className="flex gap-4">
                {show.has_seen_show.map((person: string) => (
                  <p
                    className="flex size-10 items-center justify-center rounded-full border"
                    key={person}
                  >
                    {person.charAt(0).toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
