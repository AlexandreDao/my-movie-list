//import { DummyData } from "@/../DummyData";
import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieDisplay from "@/components/MovieDisplay";
import useGetPopMovies from "@/hooks/services/useGetPopMovies";
import useSearchMovies from "@/hooks/services/useSearchMovies";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

const Home = () => {
  const hearderHeight = useHeaderHeight();
  const { data: moviesData } = useGetPopMovies();
  //const moviesToDisplay = useRef<MovieDataEntryMapped[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { data: moviesToDisplay } = useSearchMovies(query);

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
        data={query ? moviesToDisplay : moviesData}
        renderItem={({ item }) => (
          <MovieDisplay data={item} style={{ marginVertical: 10 }} />
        )}
        keyExtractor={(entry) => entry.id.toString()}
      />
      <FloatingSearchBar
        containerStyle={styles.searchBar}
        searchString={searchInput}
        onSubmit={() => setQuery(searchInput)}
        onChangeText={(newText) => {
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
