import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, Calendar, Film } from "lucide-react";
import { imageBaseUrl } from "@/constants";
import Container from "@/components/ui/container";
import { Movie } from "@/types";

type MovieDetailProps = {
  movie: Movie;
  details: {
    backdrop_path: string;
    belongs_to_collection: {
      backdrop_path: string;
      id: number;
      name: string;
      poster_path: string;
    };
    budget: number;
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    original_title: string;
    title?: string;
    popularity: number;
    poster_path: string;
    overview: string;
    name?: string;
    first_air_date?: string;
    vote_average: number;
    vote_count: number;
    release_date?: string;
    runtime?: number;
    tagline?: string;
  };
};

export function MovieDetail({ details, movie }: MovieDetailProps) {
  const title = movie.title || movie.original_title || "";
  const releaseDate = details.release_date;
  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Release date unknown";

  const duration =
    details.runtime &&
    `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`;
  // console.log(movie.has_seen_movie);

  return (
    <section className="relative h-[600px] w-full">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        {movie.banner_alt ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${movie.banner_alt?.filename_disk}`}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <Image
            src={`${imageBaseUrl}${details.backdrop_path}`}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-end pb-10">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
          {title}
        </h1>
        {details.tagline && (
          <p className="mb-4 text-xl text-gray-300">{details.tagline}</p>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {details.genres.map((genre) => (
            <Badge key={genre.id} variant="secondary">
              {genre.name}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500" />
            <span>{Math.round(details.vote_average * 10) / 10}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Film className="size-5" />
            <span className="capitalize">movie</span>
          </div>
        </div>

        <div className="mt-4 max-w-4xl">
          <p className="text-lg text-gray-300">{details.overview}</p>
        </div>

        <div>
          {movie.has_seen_movie && (
            <div className="text-white">
              <h3 className="mb-4 mt-6 text-lg font-bold text-green-500">
                Seen by:
              </h3>
              <div className="flex gap-4">
                {movie.has_seen_movie.map((person: string) => (
                  <p
                    className="flex size-10 items-center justify-center rounded-full border"
                    key={person}
                  >
                    {person.charAt(0).toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
