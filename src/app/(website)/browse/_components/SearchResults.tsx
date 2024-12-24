import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { imageBaseUrl } from '@/constants'
import { SearchResult } from '@/types'
import { CopyIcon, Film, Tv } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface SearchResultsProps {
  results: SearchResult[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return <div className="text-center text-muted-foreground">No results found</div>
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {results.map((result) => (
        <Card key={result.id} className="relative">
          <CardContent className="flex items-center gap-3 p-4">
            {result.poster_path ? (
              <Image
                src={`${imageBaseUrl}${result.poster_path}`}
                alt={result.title || ''}
                width={50}
                height={50}
                className="rounded-md"
              />
            ) : (
              <Image
                src="https://dummyimage.com/50x75"
                alt={result.title || ''}
                width={50}
                height={75}
                className="rounded-md"
              />
            )}

            <div className="flex-1">
              <div>
                <h2 className="flex gap-1 font-bold">
                  {result.title || result.name}

                  {result.first_air_date && (
                    <div className="font-normal">
                      <span className="sr-only">First Aired</span>
                      <span>({new Date(result.first_air_date).getFullYear()})</span>
                    </div>
                  )}

                  {result.release_date && (
                    <div className="font-normal">
                      <span className="sr-only">First Aired</span>
                      <span>({new Date(result.release_date).getFullYear()})</span>
                    </div>
                  )}
                </h2>
              </div>
              <div className="flex flex-col gap-1">
                <p className="flex text-sm text-muted-foreground">ID: {result.id}</p>

                <p>
                  {result.media_type === 'movie' ? (
                    <Film className="size-4" />
                  ) : (
                    <Tv className="size-4" />
                  )}
                </p>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(result.id.toString())
                    toast.success(
                      <div className="flex flex-col gap-1  ">
                        <span className="font-medium">Copied!</span>
                        <span className="text-sm text-white">
                          ID for <strong>{result.title || result.name}</strong> has been copied to
                          your clipboard
                        </span>
                      </div>,
                    )
                  }}
                  className="absolute bottom-0 right-0 flex size-8 items-center justify-center ring-offset-background transition-all duration-200 ease-in-out hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:text-white/20 border-l border-l-white/20 border-t border-t-white/20 rounded-b-none rounded-r-none"
                >
                  <CopyIcon className="size-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
