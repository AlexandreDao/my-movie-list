import MovieDisplay from "@/components/MovieDisplay";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { useRouter } from "expo-router";
import { FC, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import ScrollToTopButton from "./ScrollToTopButton";

type MovieListProps = Omit<
  FlatListProps<MovieDataEntryMapped>,
  "renderItem"
> & {
  data?: MovieDataEntryMapped[];
  fetchNextPage?: () => void;
  listStyle?: StyleProp<ViewStyle>;
};

const MovieList: FC<MovieListProps> = ({
  data,
  fetchNextPage,
  listStyle,
  ...rest
}) => {
  const router = useRouter();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const listRef = useRef<FlatList>(null);

  const openSheet = (movieEntry: MovieDataEntryMapped) => {
    router.navigate({
      pathname: "/movie-details-modal",
      params: { id: movieEntry?.id },
    });
  };

  return (
    <View style={listStyle ?? styles.listStyle}>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        data={data}
        renderItem={({ item }) => (
          <MovieDisplay data={item} onPress={() => openSheet(item)} />
        )}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={1.5}
        scrollEventThrottle={100}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y > 5000 && !isButtonVisible) {
            setIsButtonVisible(true);
          } else if (nativeEvent.contentOffset.y < 5000 && isButtonVisible) {
            setIsButtonVisible(false);
          }
        }}
        ref={listRef}
        keyExtractor={(entry, index) => entry.id.toString() + index}
        {...rest}
      />
      <ScrollToTopButton
        isVisible={isButtonVisible}
        onPress={() => {
          listRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }}
        style={styles.scrollButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    width: "100%",
  },
  scrollButton: {
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
  },
  columnWrapperStyle: {
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});

export default MovieList;
