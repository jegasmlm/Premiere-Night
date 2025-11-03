import { ScrollView, StyleSheet } from "react-native";
import { useAppContext } from "../../../contexts/AppContext";
import Loading from "../../elements/Loading";
import { useNowPlayingMovies, usePopularMovies, useTopRatedMovies, useUpcomingMovies } from "../../../hooks/useMovies";
import FilmCards from "../../elements/FilmCards";
import Layout from "../../elements/Layout";
import Input from "../../elements/Input";
import { useMemo, useState } from "react";

export default function HomeScreen() {
  const { initializing } = useAppContext();

  const { loading: popularLoading, data: popularMovies } = usePopularMovies();
  const { loading: nowPlayingLoading, data: nowPlayingMovies } = useNowPlayingMovies();
  const { loading: upcomingLoading, data: upcomingMovies } = useUpcomingMovies();
  const { loading: topRatedLoading, data: topRatedMovies } = useTopRatedMovies();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(
    () => ({
      popular: popularMovies?.filterByTitle(searchQuery),
      nowPlaying: nowPlayingMovies?.filterByTitle(searchQuery),
      upcoming: upcomingMovies?.filterByTitle(searchQuery),
      topRated: topRatedMovies?.filterByTitle(searchQuery),
    }),
    [popularMovies, nowPlayingMovies, upcomingMovies, topRatedMovies, searchQuery],
  );

  if (initializing || popularLoading || nowPlayingLoading || upcomingLoading || topRatedLoading) {
    return <Loading />;
  }

  return (
    <Layout flex={1} flexDirection="column" gap={8}>
      <Input
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon="search"
        style={styles.input}
      />
      <ScrollView style={styles.scrollView}>
        <Layout flexDirection="column" gap={32} style={styles.filmCardsContainer}>
          <FilmCards title="Now Playing Movies" movies={filteredMovies.nowPlaying} direction="horizontal" style={styles.filmCards} />
          <FilmCards title="Popular Movies" movies={filteredMovies.popular} direction="horizontal" style={styles.filmCards} />
          <FilmCards title="Upcoming Movies" movies={filteredMovies.upcoming} direction="horizontal" style={styles.filmCards} />
          <FilmCards title="Top Rated Movies" movies={filteredMovies.topRated} direction="horizontal" style={styles.filmCards} />
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  filmCardsContainer: {
    flex: 1,
    padding: 10,
  },
  filmCards: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  input: {
    marginHorizontal: 10,
  },
});