import { DummyData } from "@/DummyData";
import MovieDisplay from "@/src/components/MovieDisplay";
import { MovieDataEntry } from "@/src/utils/types";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const home = () => {
  const moviesData: MovieDataEntry[] = DummyData.results;

  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={{width: "100%"}}
        contentContainerStyle={{alignItems: "center"}}
        data={moviesData}
        renderItem={({item}) => 
          <MovieDisplay data={item} style={{marginVertical: 10}}/>
        }
        keyExtractor={entry => entry.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#383838",
  },
  text: {
    color: "white",
  },
});

export default home;
