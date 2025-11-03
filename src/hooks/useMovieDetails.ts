import { getMovieDetails } from "../logic/movies";
import { useApiRequest } from "./useApiRequest";

export function useMovieDetails(movieId: string) {
  return useApiRequest(() => getMovieDetails(movieId), "Failed to load movie details", [movieId]);
}