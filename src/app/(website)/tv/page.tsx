// import { fetchTvShowsByIds } from "@/actions/tmdb";

import { Suspense } from 'react'
import { fetchTvShowsByIds } from '@/app/actions/tmdb'
import HeroBannerTv from '@/components/Heroes/HeroBannerTv'
import { fetchTvShows } from '@/lib/queries'
import TvShowList from './_components/TvShowList'
import Container from '@/components/ui/container'

export default async function TV() {
  const tvShows = await fetchTvShows()

  const allShows = await fetchTvShowsByIds(
    tvShows.docs.map((tvShow: { showId?: string | null }) => String(tvShow.showId)),
  )

  console.log(allShows)

  return (
    <>
      <Suspense>
        <HeroBannerTv tv={allShows} />
      </Suspense>

      <Suspense>
        <section className="bg-black py-40">
          <Container>
            <TvShowList tvShows={allShows} />

            {tvShows.totalDocs === 0 && (
              <p className="text-center text-lg text-gray-400">No movies found</p>
            )}
          </Container>
        </section>
      </Suspense>
    </>
  )
}
