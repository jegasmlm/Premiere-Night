import { ImageBackground, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Movie } from "../../data/Movie";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/AppNavigator";
import Card from "./Card";
import Badge from "./Badge";
import Icon from "./Icon";
import { useAppContext } from "../../contexts/AppContext";

export type FilmCardProps = {
  movie: Movie;
  showWatchlistButton?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function FilmCard({ movie, showWatchlistButton = false, style }: FilmCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { watchlist, removeFromWatchlist } = useAppContext();

  const handleWatchlistPress = useCallback(() => {
    if (watchlist.getItems().some(item => item.id === movie.id)) {
      removeFromWatchlist(movie);
    }
  }, [watchlist, removeFromWatchlist, movie]);

  const handlePress = useCallback(() => {
    navigation.navigate("Film", { movieId: movie.getId() });
  }, [navigation, movie]);

  return (
    <TouchableOpacity style={{...styles.container, ...style}} onPress={handlePress}>
      <Card style={cardStyles.card}>
        <ImageBackground
          source={{ uri: movie.getPosterUrl() }}
          style={cardStyles.image}
          imageStyle={cardStyles.imageRadius}
        >
          <View style={overlayStyles.overlay} />
          {showWatchlistButton && (
            <View style={styles.watchlistButton}>
            <TouchableOpacity onPress={handleWatchlistPress}>
                <Text style={styles.watchlistButtonText}>Remove from watchlist</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={contentStyles.content}>
            <Text style={styles.title} numberOfLines={2}>
              {movie.getTitle()}
            </Text>
            <View style={metaStyles.row}>
              <Text style={styles.releaseDate}>{movie.getReleaseDate()}</Text>
              <Badge>
                <View style={styles.badge}>
                  <Icon name="star" width={16} height={16} fill={styles.badgeIcon.color} />
                  <Text style={styles.badgeText}>{movie.getVoteAverage()}</Text>
                </View>
              </Badge>
            </View>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watchlistButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  watchlistButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  releaseDate: {
    fontSize: 14,
    color: "#e5e5e5",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 14,
    color: "black",
  },
  badgeIcon: {
    width: 16,
    height: 16,
    color: "black",
  },
});

const cardStyles = StyleSheet.create({
  card: {
    height: 140,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageRadius: {
    borderRadius: 16,
  },
});

const overlayStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
});

const contentStyles = StyleSheet.create({
  content: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    gap: 6,
  },
});

const metaStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

