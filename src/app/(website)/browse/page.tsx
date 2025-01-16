'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import SearchResults from './_components/SearchResults'
import SearchBar from './_components/SearchBar'
import { SearchResult, TMDBError } from '@/types'

import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Container from '@/components/ui/container'
import { searchTMDB } from '@/app/actions/tmdb'
import { Spinner } from '@/components/ui/icons'
import CreateMovie from './_components/CreateMovie'
import CreateTvShow from './_components/CreateTvShow'

export default function BrowsePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const searchResults = await searchTMDB(query)
      setResults(searchResults)
    } catch (error) {
      let message = 'Failed to search movies and TV shows'

      if (error instanceof TMDBError) {
        if (error.message.includes('API key')) {
          message = 'TMDB API key is not configured. Please check your environment variables.'
        } else {
          message = error.message
        }
      }

      toast.error('Error', {
        description: message,
      })

      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-40">
      <Container>
        <Card className="mx-auto mb-8 max-w-3xl">
          <CardHeader>
            <CardTitle>Search Movies & TV Shows</CardTitle>
            <CardDescription>
              Search for any movie or TV show using The Movie Database (TMDB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : results.length > 0 ? (
          <SearchResults results={results} />
        ) : query && !isLoading ? (
          <div className="text-center text-muted-foreground">No results found</div>
        ) : null}
      </Container>

      <Container className="text-white ">
        <div className="mx-auto mb-8 max-w-3xl">
          <Tabs defaultValue="movie" className="min-w-[400px] ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="movie">Create Movie</TabsTrigger>
              <TabsTrigger value="tv">Create TV Show</TabsTrigger>
            </TabsList>
            <TabsContent value="movie">
              <Card className="p-6">
                <h1 className="mb-4 text-4xl font-bold">Add a Movie</h1>
                <CreateMovie />
              </Card>
            </TabsContent>
            <TabsContent value="tv">
              <Card className="p-6">
                <h2 className="mb-4 text-4xl font-bold">Add a TV Show</h2>
                <CreateTvShow />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Container>
    </section>
  )
}
