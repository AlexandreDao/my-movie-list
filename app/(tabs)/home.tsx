import { DummyData } from "@/DummyData";
import FloatingSearchBar from "@/src/components/FloatingSearchBar";
import MovieDisplay from "@/src/components/MovieDisplay";
import { MovieDataEntry } from "@/src/utils/types";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

const home = () => {
  const hearderHeight = useHeaderHeight();
  const moviesData: MovieDataEntry[] = DummyData.results;
  const moviesToDisplay = useRef<MovieDataEntry[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const filterMovies = (filter: string) => {
    if (filter === "") {
      moviesToDisplay.current = [];
    }
    moviesToDisplay.current = moviesData.filter((entry: MovieDataEntry) => {
      return (entry.title.normalize().toLowerCase().includes(filter.normalize().toLowerCase()));
    });
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={hearderHeight} behavior={Platform.OS === 'ios' ? "padding" : "height"} style={styles.mainContainer}>
      <FlatList
        style={{width: "100%"}}
        numColumns={2}
        columnWrapperStyle={{justifyContent: "space-evenly"}}
        data={searchInput ? moviesToDisplay.current : moviesData}
        renderItem={({item}) => 
          <MovieDisplay data={item} style={{marginVertical: 10}}/>
        }
        keyExtractor={entry => entry.id.toString()}
      />
      <FloatingSearchBar 
        containerStyle={styles.searchBar}
        searchString={searchInput}
        onChangeText={newText => { 
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
    position: 'absolute',
    bottom: 24,
    marginRight: "5%",
  },
  text: {
    color: "white",
  },
});

export default home;
