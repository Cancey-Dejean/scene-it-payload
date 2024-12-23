"use client";

import Image from "next/image";
import { TvShow } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { movieYearFormat } from "@/utils/movieYearFormat";
import { imageBaseUrl } from "@/constants";
import Link from "next/link";

export default function TvShowList({ tvShows }: { tvShows: TvShow[] }) {
  const showsShown = 14;
  const [loadMore, setLoadMore] = useState(showsShown);
  const showMoreShows = () => {
    setLoadMore(loadMore + showsShown);
  };

  // console.log(tvShows);
  return (
    <div>
      {tvShows && tvShows?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-10 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {tvShows.slice(0, loadMore).map((tvShow, index) => (
            <li key={index}>
              <div className="group relative">
                <Image
                  src={`${imageBaseUrl}${tvShow.poster_path}`}
                  alt={tvShow.name ?? tvShow.original_name ?? ""}
                  width={180}
                  height={273}
                  className="mb-2 rounded-lg border border-white/10 transition-all duration-300 group-hover:scale-105"
                />
                <div className="relative">
                  <p className="flex items-center gap-1 font-semibold">
                    {tvShow.name}
                  </p>
                </div>

                <p className="text-gray-400">
                  {movieYearFormat(tvShow.first_air_date ?? "")}
                </p>

                <Link
                  href={`/tv/${tvShow.id}`}
                  className="after:absolute after:inset-0"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-red-500">Movies coming soon.</h2>
      )}

      {tvShows && tvShows?.length > 0 && (
        <div className="mt-16 flex flex-col items-center text-center">
          {loadMore < tvShows?.length && (
            <Button onClick={showMoreShows} variant="secondary">
              Load More
            </Button>
          )}

          {loadMore < tvShows?.length && (
            <p className="mt-8 flex justify-center text-white">
              Showing {loadMore} of {tvShows?.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
