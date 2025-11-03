import { Genre, GenreSchema } from "./Genre";

export class Genres {
  private items: Genre[] = [];

  constructor(genres: GenreSchema[]) {
    this.items = genres.map(genre => new Genre(genre));
  }

  getItems(): Genre[] {
    return this.items;
  }

  count(): number {
    return this.items.length;
  }
}
