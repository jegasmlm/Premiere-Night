import { getGenres } from "../logic/genres";
import { useApiRequest } from "./useApiRequest";

export function useGenres() {
  return useApiRequest(() => getGenres(), "Failed to load genres", []);
}