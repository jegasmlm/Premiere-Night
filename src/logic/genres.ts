import { Genres } from "../data/Genres";
import { API_KEY, BASE_URL } from "../resources/constants";

export async function getGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Genres(data.genres);
}