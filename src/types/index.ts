// export type Genre = {
//   categories_id: {
//     title: string;
//     slug: string;
//   };
// };

// export type FavoriteScene = {
//   title: string;
//   description: string;
//   image: string;
//   scene_start: number;
//   scene_end: number;
//   scene_url: string;
// };

// export type Movie = {
//   id: number;
//   title: string;
//   description: string;
//   synopsis: string;
//   banner: { id: string; title: string; filename_disk: string };
//   slug: string;
//   genres: Genre[];
//   release_date: string;
//   trailer_url: string;
//   favorite_scenes: FavoriteScene[];
// };

export type ImageProps = {
  filename_disk?: string;
  title?: string;
  height?: number;
  width?: number;
};

export type Quote = {
  text?: string;
  characterName?: string;
  imgUrl?: ImageProps;
};

export type FavoriteMovie = {
  movies_id: {
    movieId: string;
  };
};

export type UserFavorites = {
  name: string;
  top5: FavoriteMovie[];
};

export type Movie = {
  id: number;
  title?: string;
  name?: string;
  banner_alt: ImageProps;
  has_seen_movie?: string[];
  original_title?: string;
  homepage?: string | null;
  release_date?: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  vote_count: number;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  credits: {
    cast: Array<{
      name: string;
      profile_path: string;
      original_name: string;
      character: string;
    }>;
  };
  videos: {
    results: Array<{
      type: string;
      name: string;
      key: string;
      published_at: string;
      site: string;
    }>;
  };
  similar?: {
    results: Array<{
      id: number;
      poster_path: string;
      backdrop_path: string;
      title: string;
      name: string;
      original_title: string;
      vote_average: number;
      vote_count: number;
    }>;
  };
  production_companies: Array<{
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  quotes?: Quote[];
  scenes?: Array<{
    title: string;
    scene_starts: string;
    scene_ends: string;
    scene_img?: ImageProps;
  }>;
};

export type MovieDetail = Movie & {
  genres: Array<{ id: number; name: string }>;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  runtime?: number;
  revenue: number;
  tagline?: string;
  popularity: number;
};

export type TMDBResponse = Movie & {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  // results: Movie[];
};

export type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
};

export class TMDBError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "TMDBError";
  }
}

export type TvShow = {
  id: number;
  has_seen_show?: string[];
  name?: string;
  original_name?: string;
  overview?: string;
  tagline?: string;
  homepage?: string | null;
  first_air_date?: string;
  vote_average?: number | null;
  vote_count?: number;
  banner_alt: ImageProps;
  poster_path?: string | null;
  backdrop_path?: string | null;
  number_of_episodes?: number;
  number_of_seasons?: number;
};
