import { Movie } from '@/types'
import Container from '../ui/container'
import Image from 'next/image'
import { imageBaseUrl } from '@/constants'

export default function HomeHero({ movie }: { movie: Movie }) {
  const { title, original_title, overview, backdrop_path } = movie
  return (
    <section className="relative h-[700px] w-full 3xl:h-[800px]">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        <Image
          src={`${imageBaseUrl}${backdrop_path}`}
          alt={title || original_title || ''}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-center">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-bold text-white md:text-6xl">{title || original_title}</h1>
          <p className="text-lg text-white">{overview}</p>
        </div>
      </Container>
    </section>
  )
}
