import { Movie } from "../data/Movie";
import { Movies } from "../data/Movies";
import { API_KEY, BASE_URL } from "../resources/constants";

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Movies(data.results);
}

export async function getNowPlayingMovies() {
  const response = await fetch(`${BASE_URL}/movie/now_playing`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Movies(data.results);
}

export async function getUpcomingMovies() {
  const response = await fetch(`${BASE_URL}/movie/upcoming`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });
  const data = await response.json();
  return new Movies(data.results);
}

export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/movie/top_rated`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });
  const data = await response.json();
  return new Movies(data.results);
}

export async function getMovieDetails(movieId: string) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Movie(data);
}