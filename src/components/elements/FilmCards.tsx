import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Movies } from "../../data/Movies";
import FilmCard from "./FilmCard";
import { Movie } from "../../data/Movie";
import { useCallback } from "react";
import AnimatedCard from "./AnimatedCard";
import Layout from "./Layout";
import Text from "./Text";

export type FilmCardsProps = {
  title?: string;
  movies?: Movies | null;
  showWatchlistButton?: boolean;
  direction?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
}

export default function FilmCards({ title, movies, showWatchlistButton = false, direction = "vertical", style }: FilmCardsProps) {
  const getSeparator = useCallback(() => {
    return <View style={direction === "horizontal" ? styles.hSeparator : styles.vSeparator} />;
  }, [direction]);

  return (
    <Layout flexDirection="column" gap={8} style={style}>
      {title && <Text style={styles.title}>{title}</Text>}
      {movies?.getItems().length === 0 ? (
        <Layout flexDirection="column" gap={8} justifyContent="center" alignItems="center" flex={1} style={styles.listContent}>
          <Text type="subdued">No movies found</Text>
        </Layout>
      ) : (
      <FlatList<Movie>
        data={movies?.getItems() ?? []}
        renderItem={({ item, index }) => (
          <AnimatedCard index={index}>
            <View style={direction === "horizontal" ? styles.horizontalItem : undefined}>
              <FilmCard movie={item} showWatchlistButton={showWatchlistButton} />
            </View>
          </AnimatedCard>
        )}
        horizontal={direction === "horizontal"}
        nestedScrollEnabled={direction === "horizontal"}
        ItemSeparatorComponent={getSeparator}
          keyExtractor={item => item.id}
          style={styles.listContent}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  vSeparator: {
    height: 10,
  },
  hSeparator: {
    width: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  listContent: {
    height: 140,
  },
  horizontalItem: {
    width: 220,
  },
});