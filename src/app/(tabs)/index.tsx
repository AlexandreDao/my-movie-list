import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieList from "@/components/MovieList";
import MovieSkeletonLoader from "@/components/MovieSkeletonLoader";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetPopMovies,
  useSearchMovies,
} from "@/hooks";
import { isAxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Home: FC = () => {
  const {
    data: moviesData,
    error: getPopError,
    isError: isGetPopError,
    isLoading,
  } = useGetPopMovies();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const {
    data: moviesToDisplay,
    error: searchError,
    isError: isSearchError,
  } = useSearchMovies(query);

  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const [canDisplayMovies, setCanDisplayMovies] = useState(false);
  const timeoutRef = React.useRef<number | null>(null);
  const colors = useAppSelector((state) => state.theme.colors);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCanDisplayMovies(true);
    }, 1200);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isGetPopError || isSearchError) {
      if (isAxiosError(getPopError)) {
        Alert.alert(
          "Could not fetch movies: Popular",
          getPopError.response?.data?.status_message || "Unknown error",
        );
      } else if (isAxiosError(searchError)) {
        Alert.alert(
          "Could not fetch movies: Search",
          searchError.response?.data?.status_message || "Unknown error",
        );
      } else {
        Alert.alert("Could not fetch movies", "An unexpected error occurred");
      }
    }
  }, [getPopError, searchError, isGetPopError, isSearchError]);

  return (
    <View style={[styles.root, { backgroundColor: colors.backgroundPrimary }]}>
      {isLoading || !canDisplayMovies ? (
        <MovieSkeletonLoader />
      ) : (
        <Animated.View
          style={styles.mainContainer}
          entering={FadeIn.duration(400)}
        >
          <MovieList
            data={query ? moviesToDisplay : moviesData}
            contentStyle={{ paddingBottom: bottomTabBarHeight + 60 }}
          />
          {searchInput && moviesToDisplay?.length === 0 && (
            <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>
              {"No movies correspond to this search"}
            </Text>
          )}
          <FloatingSearchBar
            containerStyle={[
              styles.searchBar,
              {
                bottom: bottomTabBarHeight + 12,
              },
            ]}
            searchString={searchInput}
            onSubmit={() => setQuery(searchInput)}
            onChangeText={(newText) => {
              if (newText.length === 0) setQuery("");
              setSearchInput(newText);
            }}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    position: "absolute",
    marginRight: "5%",
  },
  emptyListText: {
    position: "absolute",
  },
});

export default Home;
