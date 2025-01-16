'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

export default function CreateTvShow() {
  const router = useRouter()
  const [showId, setShowId] = useState('')
  const [title, setTitle] = useState('')

  const handleAddTvShow = async () => {
    console.log(showId, title)

    const response = await fetch('/api/tvShows', {
      method: 'POST',
      body: JSON.stringify({ showId, title }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      router.push(`/tv`)
    } else {
      alert('Failed to add tv show')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-start ">
      <div className="flex flex-col gap-2 w-full">
        <Label>Show Title</Label>
        <Input
          placeholder="Title..."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
          className="placeholder:text-white/50"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label>Show ID</Label>
        <Input
          placeholder="ID..."
          value={showId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setShowId(e.target.value)
          }}
          className="placeholder:text-white/50"
        />
      </div>
      <Button onClick={handleAddTvShow} variant="secondary">
        Add Tv Show
      </Button>
    </div>
  )
}
