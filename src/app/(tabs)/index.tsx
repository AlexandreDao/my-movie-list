import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieDisplay from "@/components/MovieDisplay";
import {
  useBottomTabBarTotalHeight,
  useGetPopMovies,
  useSearchMovies,
} from "@/hooks";
import { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const {
    data: moviesData,
    error: getPopError,
    isError: isGetPopError,
  } = useGetPopMovies();
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const {
    data: moviesToDisplay,
    error: searchError,
    isError: isSearchError,
  } = useSearchMovies(query);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();

  useEffect(() => {
    if (isGetPopError || isSearchError) {
      if (isAxiosError(getPopError)) {
        Alert.alert(
          "Could not Fetch movies: Popular",
          getPopError.response?.data?.status_message || "Unknown error",
        );
      } else if (isAxiosError(searchError)) {
        Alert.alert(
          "Could not Fetch movies: Search",
          searchError.response?.data?.status_message || "Unknown error",
        );
      } else {
        Alert.alert("Could not Fetch movies", "An unexpected error occurred");
      }
    }
  }, [getPopError, searchError, isGetPopError, isSearchError]);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.listStyle}
        contentContainerStyle={{
          paddingBottom: bottomTabBarHeight + 50,
        }}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        data={query ? moviesToDisplay : moviesData}
        ListEmptyComponent={null}
        renderItem={({ item }) => (
          <MovieDisplay data={item} style={{ marginVertical: 10 }} />
        )}
        keyExtractor={(entry) => entry.id.toString()}
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
  listStyle: {
    width: "100%",
  },
  columnWrapperStyle: {
    justifyContent: "space-evenly",
  },
  text: {
    color: "white",
  },
  emptyListText: {
    position: "absolute",
    color: "white",
  },
});

export default Home;
