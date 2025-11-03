import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movies } from "../data/Movies";

export async function saveWatchlist(watchlist: Movies) {
  return AsyncStorage.setItem('watchlist', JSON.stringify(watchlist.getItems()));
}

export async function getWatchlist() {
  const json = await AsyncStorage.getItem('watchlist');
  if (json) {
    return new Movies(JSON.parse(json));
  }
  return new Movies([]);
}