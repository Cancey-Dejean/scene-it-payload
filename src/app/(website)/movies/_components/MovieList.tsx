"use client";

import { Movie } from "@/types";
import Image from "next/image";
import { movieYearFormat } from "@/utils/movieYearFormat";
import { imageBaseUrl } from "@/constants";
import Link from "next/link";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div>
      {movies && movies?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-10 text-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
          {movies.map((movie, index) => (
            <li key={index}>
              <div className="group relative">
                <Image
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title ?? movie.original_title ?? ""}
                  width={180}
                  height={273}
                  className="mb-2 rounded-lg border border-white/10 transition-all duration-300 group-hover:scale-105"
                />
                <p className="font-semibold">{movie.title}</p>
                <p className="text-gray-400">
                  {movieYearFormat(movie.release_date ?? "")}
                </p>
                <Link
                  href={`/movies/${movie.id}`}
                  className="after:absolute after:inset-0"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-red-500">Movies coming soon.</h2>
      )}
    </div>
  );
}
