'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  isLoading: boolean
}

export default function SearchBar({ query, onQueryChange, onSearch, isLoading }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter a title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          className="pl-9"
        />
      </div>
      <Button onClick={onSearch} disabled={isLoading} variant="secondary">
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </div>
  )
}
