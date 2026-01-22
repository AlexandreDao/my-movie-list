import FloatingSearchBar from "@/components/FloatingSearchBar";
import MovieDetailsSheet from "@/components/MovieDetailsSheet";
import MovieDisplay from "@/components/MovieDisplay";
import { useGetPopMovies, useSearchMovies } from "@/hooks";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import BottomSheet from "@gorhom/bottom-sheet";
import { useHeaderHeight } from "@react-navigation/elements";
import { isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Home = () => {
  const hearderHeight = useHeaderHeight();
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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetDetails, setSheetDetails] = useState<MovieDataEntryMapped | null>(
    null,
  );

  const openSheet = (movieEntry: MovieDataEntryMapped) => {
    //console.log("opening...");
    //console.log(bottomSheetRef.current);
    setSheetDetails(movieEntry);
    bottomSheetRef.current?.expand();
  };

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

  //mainContainer View might need to be changed into a SafeAreaView, But it was causing problems so it will remain a View for now.
  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={hearderHeight}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          style={styles.listStyle}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          data={query ? moviesToDisplay : moviesData}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={null}
          renderItem={({ item }) => (
            <MovieDisplay
              data={item}
              onPress={() => openSheet(item)}
              style={{ marginVertical: 10 }}
            />
          )}
          keyExtractor={(entry) => entry.id.toString()}
        />
        {searchInput && moviesToDisplay?.length === 0 && (
          <Text style={styles.emptyListText}>
            {"No movies correspond to this search"}
          </Text>
        )}
        <FloatingSearchBar
          containerStyle={styles.searchBar}
          searchString={searchInput}
          onSubmit={() => setQuery(searchInput)}
          onChangeText={(newText) => {
            if (newText.length === 0) setQuery("");
            setSearchInput(newText);
          }}
        />
        {moviesData ? (
          <MovieDetailsSheet ref={bottomSheetRef} data={sheetDetails} />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#282828",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
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
  emptyListText: {
    position: "absolute",
    color: "white",
  },
});

export default Home;
