import { imageBaseUrl } from '@/constants'
import Image from 'next/image'
import React from 'react'
import Container from '@/components/ui/container'
import { Movie } from '@/types'

export default async function HeroBanner({ movie }: { movie: Movie[] }) {
  const randomIndex = Math.floor(Math.random() * movie.length)
  const recentlyAddedMovie = movie[randomIndex]

  return (
    <section className="relative h-[400px] w-full">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        <Image
          src={`${imageBaseUrl}${recentlyAddedMovie.backdrop_path}`}
          alt={recentlyAddedMovie.title || recentlyAddedMovie.original_title || ''}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-end">
        <h1 className="text-center text-4xl font-bold text-white md:text-7xl">Movies</h1>
      </Container>
    </section>
  )
}
