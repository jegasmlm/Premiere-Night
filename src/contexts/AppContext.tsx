import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Movie } from "../data/Movie";
import { Genres } from "../data/Genres";
import { Movies } from "../data/Movies";
import { useGenres } from "../hooks/useGenres";
import { getWatchlist, saveWatchlist } from "../logic/watchlist";

type AppContextType = {
  initializing: boolean;
  genres?: Genres;
  watchlist: Movies;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movie: Movie) => void;
}

const AppContext = createContext<AppContextType>({
  initializing: true,
  genres: new Genres([]),
  watchlist: new Movies([]),
  addToWatchlist: () => {},
  removeFromWatchlist: () => {},
});


export function AppProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movies>(new Movies([]));
  const { loading: genresLoading, data: genres } = useGenres();

  useEffect(() => {
    getWatchlist().then(setWatchlist);
  }, []);

  const addToWatchlist = useCallback((movie: Movie) => {
    const newWatchlist = new Movies([...watchlist.getItems(), movie]);
    setWatchlist(new Movies([...watchlist.getItems(), movie]));
    saveWatchlist(newWatchlist);
  }, [watchlist]);

  const removeFromWatchlist = useCallback((movie: Movie) => {
    const newWatchlist = new Movies(watchlist.getItems().filter(item => item.id !== movie.id));
    saveWatchlist(newWatchlist);
    setWatchlist(newWatchlist);
  }, [watchlist]);

  return (
    <AppContext.Provider value={{ initializing: genresLoading, genres, watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}