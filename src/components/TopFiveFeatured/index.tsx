import Link from 'next/link'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/container'
import { GlareCard } from '../ui/glare-card'

const topFiveMovies = [
  {
    name: 'Ronald',
    image: '/images/fav-bg-1.jpg',
  },
  {
    name: 'Erwin',
    image: '/images/fav-bg-2.jpg',
  },
  {
    name: 'Cancey',
    image: '/images/fav-bg-3.jpg',
  },
]

export function TopFiveFeatured({ className }: { className?: string }) {
  return (
    <section className={cn('relative', className)}>
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {topFiveMovies.map(({ name, image }, index) => (
            <div className="group relative" key={index}>
              <GlareCard className="relative flex flex-col items-center justify-center bg-black p-5 after:absolute after:inset-0 after:bg-black/40">
                <Image
                  className="absolute inset-0 h-full w-full object-cover"
                  src={image}
                  alt={name}
                  width={453}
                  height={559}
                />
                <h3 className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-monoton text-[20rem] text-white opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0">
                  {name.charAt(0)}
                </h3>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-5xl text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                  <p>{name}&apos;s</p>
                  <p className="font-monoton">Movies</p>
                </div>
              </GlareCard>
              <Link
                href={`favorites/${name.toLowerCase()}`}
                className="z-10 after:absolute after:inset-0"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
