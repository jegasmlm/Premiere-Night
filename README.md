# Premiere Night

Create a cross-platform “Premiere Night” app that helps curators surface the right films
for Mytheresa’s private screening events. The experience should focus on cinematic
discovery and a simple watchlist.

# Architecture

### Tech Stack

- **React Native (TypeScript)**: Cross‑platform mobile UI
- **React Navigation (Native Stack)**: Screen routing and navigation
- **React Hooks & Context**: Local and app‑level state management
- **Fetch API**: Networking
- **StyleSheet**: Styling primitives

### Project Structure

```text
src/
  components/
    elements/         # Reusable UI building blocks (e.g., Card, FilmCard, FilmCards, Input, Layout)
    views/            # Screen components (e.g., Home, Film)
    navigators/       # Navigation stack configuration
  hooks/              # Data-fetching and utility hooks (e.g., useMovies, useApiRequest)
  logic/              # API layer: fetches and transforms server responses
  data/               # Domain models (e.g., Movie, Movies, Genres)
  resources/          # Constants/config (e.g., BASE_URL, API_KEY)
  contexts/           # App-wide context providers
  types/              # TypeScript ambient/type declarations
```

### How API Calls Work

- **Hooks trigger requests**: Screens call hooks like `usePopularMovies`, `useNowPlayingMovies`, which delegate to a generic `useApiRequest` hook.
- **Request orchestration**: `useApiRequest` manages `loading` and `data` state, and shows platform-appropriate errors (Toast/Alert). Dependencies control when requests re-run.
- **API layer**: Functions in `src/logic` (e.g., `getPopularMovies`, `getMovieDetails`, `getGenres`) build URLs from `BASE_URL` and send requests with `Authorization: Bearer ${API_KEY}` headers.
- **Model mapping**: Raw responses are mapped into domain models (`Movies`, `Movie`, `Genres`) before being returned to the UI.
- **Consumption**: Components render lists/cards based on hook outputs and loading states.

Note: The API key and base URL are defined in `src/resources/constants.ts`.

# Limitations
 
 - Environment variables are not used for the API token or base URL; both live in `src/resources/constants.ts`.
 - Some text styles are component-specific and not centralized/reused.


# Test App

Open the hosted demo on Appetize: [PremiereNight on Appetize](https://appetize.io/app/b_jfqu23trlurylol54nsnng5rne).

# Run the app

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Install dependencies

```sh
# Using npm
npm install

# OR using Yarn
yarn install
```

## Step 2: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
