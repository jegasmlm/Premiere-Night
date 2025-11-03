import { Movie } from "../data/Movie";
import { Movies } from "../data/Movies";
import { API_KEY, BASE_URL } from "../resources/constants";

export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Movies(data.results);
}

export async function getNowPlayingMovies() {
  const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return new Movies(data.results);
}

export async function getUpcomingMovies() {
  const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'accept': 'application/json'
    }
  });
  const data = await response.json();
  return new Movies(data.results);
}

export async function getTopRatedMovies() {
  const response = await fetch(`${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`, {
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