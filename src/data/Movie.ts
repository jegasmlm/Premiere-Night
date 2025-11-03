import { GenreSchema } from "./Genre";

export interface MovieSchema {
  id: string;
  adult: boolean;
  backdrop_path: string;
  genres?: GenreSchema[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export interface Movie extends MovieSchema {};

export class Movie implements MovieSchema {
  constructor(json?: MovieSchema) {
    if (json) {
      Object.assign(this, json);
    }
  }

  getId(): string {
    return this.id;
  }

  getPosterUrl(): string {
    return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
  }

  getReleaseDate(): string {
    return this.release_date;
  }

  getVoteAverage(): number {
    return Math.round(this.vote_average);
  }

  getOverview(): string {
    return this.overview;
  }

  getTitle(): string {
    return this.title;
  }

  getGenres(): string {
    if (!this.genres) {
      return 'Unknown';
    }

    return this.genres.map(genre => genre.name).join(", ");
  }

  isAdult(): boolean {
    return this.adult;
  }

  isVideo(): boolean {
    return this.video;
  }

  getBackdropUrl(): string {
    return `https://image.tmdb.org/t/p/w500${this.backdrop_path}`;
  }

  getOriginalLanguage(): string {
    return this.original_language;
  }

  getOriginalTitle(): string {
    return this.original_title;
  }
  
  getPopularity(): number {
    return this.popularity;
  }

  getVoteCount(): number {
    return this.vote_count;
  }
}