import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../views/Home/HomeScreen";
import FilmScreen from "../views/Film/FilmScreen";
import WatchlistScreen from "../views/Watchlist/WatchlistScreen";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "../elements/Icon";
import { useAppContext } from "../../contexts/AppContext";

export type RootStackParamList = {
  Home: undefined;
  Films: undefined;
  Film: { movieId: string };
  Watchlist: undefined;
};

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const { watchlist } = useAppContext();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            contentStyle: { backgroundColor: 'black' },
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({ 
              headerTitle: 'Premiere Night',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Watchlist')}
                  style={styles.headerRight}
                  accessibilityLabel="Open watchlist"
                >
                  <Icon name="starFill" width={22} height={22} fill="#f5c518" />
                  <Text style={styles.headerRightText}>
                    Watching ({watchlist.count()})
                  </Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Film"
            component={FilmScreen}
            options={{ headerTitle: 'Film' }}
          />
          <Stack.Screen
            name="Watchlist"
            component={WatchlistScreen}
            options={{ headerTitle: 'Watchlist' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerRightText: {
    fontSize: 16,
    color: "white",
  },
});