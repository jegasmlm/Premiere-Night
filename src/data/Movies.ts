import { Movie, MovieSchema } from "./Movie";

export class Movies {
  private items: Movie[] = [];

  constructor(movies: MovieSchema[]) {
    this.items = movies.map(movie => new Movie(movie));
  }

  getItems(): Movie[] {
    return this.items;
  }

  count(): number {
    return this.items.length;
  }

  filter(predicate: (movie: Movie) => boolean): Movies {
    return new Movies(this.items.filter(predicate));
  }

  sort(comparator: (a: Movie, b: Movie) => number): Movies {
    return new Movies(this.items.sort(comparator));
  }

  filterByTitle(title: string): Movies {
    return this.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
  }

  sortByReleaseDate(): Movies {
    return this.sort((a, b) => new Date(b.getReleaseDate()).getTime() - new Date(a.getReleaseDate()).getTime());
  }

  sortByVoteAverage(): Movies {
    return this.sort((a, b) => b.getVoteAverage() - a.getVoteAverage());
  }

  filterByGenreId(genreId: string): Movies {
    return this.filter(movie => movie.getGenres().includes(genreId));
  }
}