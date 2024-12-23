import Image from "next/image";

import { Movie } from "@/types";
import { imageBaseUrl } from "@/constants";
import Container from "@/components/ui/container";

type HomeHeroProps = {
  movie: Movie;
};

export function HomeHero({ movie }: HomeHeroProps) {
  return (
    <section className="relative h-[700px] w-full 3xl:h-[800px]">
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40" />

      <div className="absolute inset-0 z-[1]">
        <Image
          src={`${imageBaseUrl}${movie.backdrop_path}`}
          alt={movie.title || movie.original_title || ""}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <Container className="relative z-[2] flex h-full flex-col justify-center">
        <div className="flex max-w-2xl flex-col gap-4">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            {movie.title || movie.original_title}
          </h1>
          <p className="text-lg text-white">{movie.overview}</p>
        </div>
      </Container>
    </section>
  );
}
