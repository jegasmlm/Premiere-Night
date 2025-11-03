import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useMovieDetails } from "../../../hooks/useMovieDetails";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/AppNavigator";
import Loading from "../../elements/Loading";
import { useAppContext } from "../../../contexts/AppContext";
import Icon from "../../elements/Icon";
import Layout from "../../elements/Layout";
import Badge from "../../elements/Badge";
import Text from "../../elements/Text";
import { useCallback, useMemo } from "react";


export default function FilmScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "Film">>();

  const { movieId } = route.params;

  const { addToWatchlist, removeFromWatchlist, watchlist } = useAppContext();

  const { loading, data: movie } = useMovieDetails(movieId);

  const isInWatchlist = useMemo(() => watchlist.getItems().some(item => item.id === movieId), [watchlist, movieId]);

  const handleAddToWatchlist = useCallback(() => {
    if (!movie) return;

    if (isInWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  }, [addToWatchlist, removeFromWatchlist, isInWatchlist, movie]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return (
      <Layout
        flexDirection="column"
        gap={8}
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Text type="subdued">The movie you are looking for does not exist.</Text>
      </Layout>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: movie?.getBackdropUrl() || movie?.getPosterUrl() }}
        style={styles.banner}
        imageStyle={styles.bannerImage}
      >
        <View style={styles.bannerOverlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie?.getTitle()}</Text>
        </View>
      </ImageBackground>

      <Layout
        flexDirection="column"
        gap={8}
        justifyContent="space-between"
        alignItems="flex-start"
        flex={1}
        padding={16}
      >
        <Layout
          flexDirection="row"
          gap={4}
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
          flex={1}
        >
          <TouchableOpacity onPress={handleAddToWatchlist}>
            <Layout flexDirection="row" gap={4} alignItems="center">
              <Text style={styles.watchText}>{isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
        <Layout
          flexDirection="row"
          gap={4}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flex={1}
        >
          <Text style={styles.release}>{movie?.getReleaseDate()}</Text>
          <Badge>
            <Layout
              flexDirection="row"
              gap={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Icon
                name="star"
                width={16}
                height={16}
                fill={styles.badgeText.color}
              />
              <Text style={styles.badgeText}>{movie?.getVoteAverage()}</Text>
            </Layout>
          </Badge>
        </Layout>

        <Text style={styles.overview}>{movie?.getOverview()}</Text>
        <Text style={styles.genres}>{movie?.getGenres()}</Text>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  banner: {
    width: "100%",
    height: 260,
  },
  bannerImage: {
    resizeMode: "cover",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  titleContainer: {
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },
  release: {
    color: "#b5b5b5",
    fontSize: 14,
  },
  watchText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#111",
    fontWeight: "700",
  },
  badgeIcon: {
    width: 16,
    height: 16,
    color: "#111",
  },
  overview: {
    color: "#e5e5e5",
    lineHeight: 20,
    marginTop: 8,
  },
  genres: {
    color: "#9ca3af",
    marginTop: 6,
  },
});