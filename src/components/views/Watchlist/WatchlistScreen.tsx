import { StyleSheet } from "react-native";
import { useAppContext } from "../../../contexts/AppContext";
import Text from "../../elements/Text";
import Layout from "../../elements/Layout";
import FilmCards from "../../elements/FilmCards";
import Input from "../../elements/Input";
import { useMemo, useState } from "react";

export default function WatchlistScreen() {
  const { watchlist } = useAppContext();


  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = useMemo(
    () => watchlist.filterByTitle(searchQuery),
    [watchlist, searchQuery],
  );

  if (watchlist.count() === 0) {
    return (
      <Layout flexDirection="column" gap={8} justifyContent="center" alignItems="center" flex={1}>
        <Text type="subdued">No movies in watchlist</Text>
      </Layout>
    );
  }

  return (
    <Layout flexDirection="column" gap={8} flex={1}>
      <Input
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon="search"
        style={styles.input}
      />
      <FilmCards movies={filteredMovies} showWatchlistButton={true} style={styles.filmCards} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  filmCards: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginHorizontal: 10,
  },
});