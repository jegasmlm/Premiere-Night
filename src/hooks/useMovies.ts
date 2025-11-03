import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "../logic/movies";
import { useApiRequest } from "./useApiRequest";

export function usePopularMovies() {
  return useApiRequest(() => getPopularMovies(), "Failed to load popular movies", []);
}

export function useNowPlayingMovies() {
  return useApiRequest(() => getNowPlayingMovies(), "Failed to load now playing movies", []);
}

export function useUpcomingMovies() {
  return useApiRequest(() => getUpcomingMovies(), "Failed to load upcoming movies", []);
}

export function useTopRatedMovies() {
  return useApiRequest(() => getTopRatedMovies(), "Failed to load top rated movies", []);
}