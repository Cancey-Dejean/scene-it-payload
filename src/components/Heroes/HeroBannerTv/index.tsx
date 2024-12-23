import { imageBaseUrl } from '@/constants'
import Image from 'next/image'
import React from 'react'
import Container from '@/components/ui/container'
import { TvShow } from '@/types'

export default async function HeroBannerTv({ tv }: { tv: TvShow[] }) {
  const randomIndex = Math.floor(Math.random() * tv.length)
  const recentlyAddedTv = tv[randomIndex]

  return (
    <section className="relative h-[400px] w-full">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        <Image
          src={`${imageBaseUrl}${recentlyAddedTv.backdrop_path}`}
          alt={recentlyAddedTv.name || recentlyAddedTv.original_name || ''}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-end">
        <h1 className="text-center text-4xl font-bold text-white md:text-7xl">Tv Shows</h1>
      </Container>
    </section>
  )
}
