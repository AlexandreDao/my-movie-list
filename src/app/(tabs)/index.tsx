import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieList from "@/components/MovieList";
import {
  useBottomTabBarTotalHeight,
  useGetPopMovies,
  useSearchMovies,
} from "@/hooks";
import { isAxiosError } from "axios";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const Home: FC = () => {
  const {
    data: moviesData,
    fetchNextPage: fetchNextPopPage,
    hasNextPage: hasNextPopPage,
    isFetchingNextPage: isFetchingPop,
    error: getPopError,
    isError: isGetPopError,
    refetch: refetchPop,
    isPending: isPendingPop,
  } = useGetPopMovies();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const {
    data: moviesToDisplay,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingSearch,
    error: searchError,
    isError: isSearchError,
    refetch: refetchSearch,
    isPending: isPendingSearch,
  } = useSearchMovies(query);

  const bottomTabBarHeight = useBottomTabBarTotalHeight();

  const fetchNextPage = () => {
    if (query) {
      if (hasNextSearchPage && !isFetchingSearch) {
        fetchNextSearchPage();
      }
    } else if (hasNextPopPage && !isFetchingPop) {
      fetchNextPopPage();
    }
  };

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
    <View style={styles.mainContainer}>
      <MovieList
        data={query ? moviesToDisplay : moviesData}
        refresh={query ? refetchSearch : refetchPop}
        refreshing={query ? isPendingSearch : isPendingPop}
        fetchNextPage={fetchNextPage}
        contentStyle={{ paddingBottom: bottomTabBarHeight + 60 }}
      />
      {searchInput && moviesToDisplay?.length === 0 && (
        <Text style={styles.emptyListText}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    position: "absolute",
    marginRight: "5%",
  },
  text: {
    color: "white",
  },
  emptyListText: {
    position: "absolute",
    marginBottom: 100,
    color: "white",
  },
});

export default Home;
