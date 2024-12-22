"use client";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Add this import
import { useCallback, useEffect, useState } from "react"; // Add this import
import { Movie } from "@/types";
import { imageBaseUrl } from "@/constants";
import Image from "next/image";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ movies, title }: MovieRowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
      <button
        className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 p-2 ${
          prevBtnDisabled ? "hidden" : "bg-black/50 hover:bg-black/75"
        }`}
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
      >
        <ChevronLeft className="size-6 text-white" />
      </button>

      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {movies?.map((movie) => (
            <div key={movie.id} className="embla__slide mr-4 flex-[0_0_200px]">
              <Image
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title || movie.original_title || ""}
                width={180}
                height={273}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 p-2 ${
          nextBtnDisabled ? "opacity-0" : "bg-black/50 hover:bg-black/75"
        }`}
        onClick={scrollNext}
        disabled={nextBtnDisabled}
      >
        <ChevronRight className="size-6 text-white" />
      </button>
    </div>
  );
}
