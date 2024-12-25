'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Movie } from '@/types'
import { imageBaseUrl } from '@/constants'
import Link from 'next/link'

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Movie
    index: number
    hovered: number | null
    setHovered: React.Dispatch<React.SetStateAction<number | null>>
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative h-[352px] w-full overflow-hidden rounded-lg  transition-all duration-300 ease-out dark:bg-neutral-900',
        hovered !== null && hovered !== index && 'scale-[0.98] blur-sm',
      )}
    >
      <Image
        src={`${imageBaseUrl}${card.poster_path}`}
        alt={card.title || ''}
        fill
        className="absolute inset-0 object-cover"
      />
      <div
        className={cn(
          'absolute inset-0 flex items-end bg-black/50 px-4 py-8 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-0',
        )}
      >
        <div className="bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
          {card.title}
        </div>
      </div>
      <Link href={`/movies/${card.id}`} className="after:absolute after:inset-0" />
    </div>
  ),
)

Card.displayName = 'Card'

export function FocusCards({ cards }: { cards: Movie[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  )
}
