import MovieDisplay from "@/components/MovieDisplay";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { useRouter } from "expo-router";
import { FC } from "react";
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native";

type MovieListProps = {
  data?: MovieDataEntryMapped[];
  listStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

const MovieList: FC<MovieListProps> = ({ data, listStyle, contentStyle }) => {
  const router = useRouter();

  const openSheet = (movieEntry: MovieDataEntryMapped) => {
    router.navigate({
      pathname: "/movie-details-modal",
      params: { id: movieEntry?.id },
    });
  };

  return (
    <FlatList
      style={styles.listStyle ?? listStyle}
      contentContainerStyle={contentStyle}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapperStyle}
      data={data}
      ListEmptyComponent={null}
      renderItem={({ item }) => (
        <MovieDisplay data={item} onPress={() => openSheet(item)} />
      )}
      keyExtractor={(entry) => entry.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: "100%",
  },
  columnWrapperStyle: {
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});

export default MovieList;
