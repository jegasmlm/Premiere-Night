export interface GenreSchema {
  id: string;
  name: string;
};

export interface Genre extends GenreSchema {};

export class Genre implements GenreSchema {
  constructor(json?: GenreSchema) {
    if (json) {
      Object.assign(this, json);
    }
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}