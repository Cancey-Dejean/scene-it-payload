import { Suspense } from 'react'
import { fetchTvShowsByIds } from '@/app/actions/tmdb'
import { fetchTvShows } from '@/lib/queries'
import { ShowDetail } from '../_components/ShowDetail'

type Props = {
  params: Promise<{ showId: string }>
}

export default async function MovieDetailsPage(props: Props) {
  const { showId } = await props.params

  const [tmdbShowDetails] = await Promise.all([fetchTvShowsByIds([showId]), fetchTvShows()])

  const tmdbShow = tmdbShowDetails[0]

  return (
    <>
      <Suspense>
        {/* @ts-expect-error TODO: fix this */}
        <ShowDetail show={tmdbShow} />
      </Suspense>
    </>
  )
}
