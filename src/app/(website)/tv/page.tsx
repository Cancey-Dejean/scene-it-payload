import { fetchTvShowsByIds } from '@/app/actions/tmdb'
import HeroBannerTv from '@/components/Heroes/HeroBannerTv'
import { fetchTvShows } from '@/lib/queries'
import TvShowList from './_components/TvShowList'
import Container from '@/components/ui/container'
import AddContent from '@/components/ui/add-content'

export default async function TV() {
  const tvShows = await fetchTvShows()

  const allShows = await fetchTvShowsByIds(
    tvShows.docs.map((tvShow: { showId?: string | null }) => String(tvShow.showId)),
  )

  return (
    <>
      {tvShows.totalDocs > 0 ? (
        <>
          <HeroBannerTv tv={allShows} />
          <div className="mt-4 text-center text-lg text-white">
            Total: (<strong>{tvShows.totalDocs}</strong>)
          </div>

          <section className="bg-black py-40">
            <Container>
              <TvShowList tvShows={allShows} />

              {tvShows.totalDocs === 0 && (
                <p className="text-center text-lg text-gray-400">No movies found</p>
              )}
            </Container>
          </section>
        </>
      ) : (
        <AddContent title='Add a TV show to the "tvShows" collection in the admin panel.' />
      )}
    </>
  )
}
