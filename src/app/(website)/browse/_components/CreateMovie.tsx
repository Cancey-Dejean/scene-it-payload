'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

export default function CreateMovie() {
  const router = useRouter()
  const [movieId, setMovieId] = useState('')
  const [title, setTitle] = useState('')

  const handleAddMovie = async () => {
    console.log(movieId, title)

    const response = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify({ movieId, title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      router.push(`/movies`)
    } else {
      alert('Failed to add movie')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex flex-col gap-2 w-full">
        <Label>Movie ID</Label>
        <Input
          placeholder="ID..."
          value={movieId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMovieId(e.target.value)
          }}
          className="placeholder:text-white/50"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label>Title</Label>
        <Input
          placeholder="Title..."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
          className="placeholder:text-white/50"
        />
      </div>
      <Button onClick={handleAddMovie} variant="secondary">
        Add Movie
      </Button>
    </div>
  )
}
