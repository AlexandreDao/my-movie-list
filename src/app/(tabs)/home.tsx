import { DummyData } from "@/../DummyData";
import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieDisplay from "@/components/MovieDisplay";
import { MovieDataEntry } from "@/utils/types";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const Home = () => {
  const hearderHeight = useHeaderHeight();
  const moviesData: MovieDataEntry[] = DummyData.results;
  const moviesToDisplay = useRef<MovieDataEntry[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const filterMovies = (filter: string) => {
    if (filter === "") {
      moviesToDisplay.current = [];
    }
    moviesToDisplay.current = moviesData.filter((entry: MovieDataEntry) => {
      return entry.title
        .normalize()
        .toLowerCase()
        .includes(filter.normalize().toLowerCase());
    });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={hearderHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <FlatList
        style={styles.listStyle}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        data={searchInput ? moviesToDisplay.current : moviesData}
        renderItem={({ item }) => (
          <MovieDisplay data={item} style={{ marginVertical: 10 }} />
        )}
        keyExtractor={(entry) => entry.id.toString()}
      />
      <FloatingSearchBar
        containerStyle={styles.searchBar}
        searchString={searchInput}
        onChangeText={(newText) => {
          filterMovies(newText);
          setSearchInput(newText);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#282828",
  },
  searchBar: {
    position: "absolute",
    bottom: 24,
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
});

export default Home;
