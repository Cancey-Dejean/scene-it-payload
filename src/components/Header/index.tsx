'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import Container from '@/components/ui/container'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full py-4 transition duration-500',
        isScrolled ? 'bg-black/80 backdrop-blur-sm' : '',
      )}
    >
      <Container className="flex items-center justify-between text-white">
        <div className="hidden space-x-4 md:flex">
          <Link
            href="/"
            className={`text-sm ${isActive('/') ? 'text-white' : 'text-gray-300 hover:text-white'}`}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={`text-sm ${
              isActive('/movies') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            Movies
          </Link>
          <Link
            href="/tv"
            className={`text-sm ${
              isActive('/tv') ? 'text-white' : 'text-gray-300 hover:text-white'
            }`}
          >
            TV Shows
          </Link>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 font-monoton text-2xl font-bold text-brand"
        >
          Scene
          <span className="text-white">it</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="icon" asChild>
            <Link href="/search">
              <SearchIcon className="size-4" />
            </Link>
          </Button>
          <Button asChild>
            <Link href="/browse">Finder</Link>
          </Button>
        </div>
      </Container>
    </header>
  )
}
