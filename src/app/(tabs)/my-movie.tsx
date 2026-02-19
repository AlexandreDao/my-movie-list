import Button from "@/components/Button";
import FilterButton from "@/components/FilterButton";
import MovieList from "@/components/MovieList";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetFavorites,
  useGetWatchlist,
  useTheme,
} from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import { filterMyMovieData } from "@/utils/functions/filterMyMovieData";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const MyMovie = () => {
  const accountId = useAppSelector((state) => state.user.accountId);
  const {
    data: favoritesData,
    refetch: refetchFavorites,
    isPending: isPendingFavorites,
    fetchNextPage: fetchNextFavorites,
  } = useGetFavorites(accountId);
  const {
    data: watchlistData,
    refetch: refetchWatchlist,
    isPending: isPendingWatchlist,
    fetchNextPage: fetchNextWatchlist,
  } = useGetWatchlist(accountId);
  const [isFavoritesDisplay, setIsFavoritesDisplay] = useState(true);

  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const { colors } = useTheme();
  const router = useRouter();
  const filter = useAppSelector((state) => state.filter);
  const displayedData = isFavoritesDisplay ? favoritesData : watchlistData;
  const filteredData = filterMyMovieData([...displayedData], filter);

  const isFilterActive = !!(
    filter.sort.length ||
    filter.genreFilter.length ||
    filter.dateFilter
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.backgroundPrimary }]}>
      <View style={styles.buttonContainer}>
        <Button
          style={[
            styles.button,
            isFavoritesDisplay
              ? {}
              : { backgroundColor: colors.buttonPrimaryDisabled },
          ]}
          pressedStyle={{ backgroundColor: colors.buttonPrimaryHighlight }}
          onPress={() => setIsFavoritesDisplay(true)}
          text={"Favorites"}
        />
        <Button
          style={[
            styles.button,
            isFavoritesDisplay
              ? { backgroundColor: colors.buttonPrimaryDisabled }
              : {},
          ]}
          pressedStyle={{ backgroundColor: colors.buttonPrimaryHighlight }}
          onPress={() => setIsFavoritesDisplay(false)}
          text={"Watchlist"}
        />
      </View>
      <Animated.View
        style={styles.mainContainer}
        entering={FadeIn.duration(400)}
      >
        <MovieList
          data={filteredData}
          onRefresh={isFavoritesDisplay ? refetchFavorites : refetchWatchlist}
          refreshing={
            isFavoritesDisplay ? isPendingFavorites : isPendingWatchlist
          }
          fetchNextPage={
            isFavoritesDisplay ? fetchNextFavorites : fetchNextWatchlist
          }
          contentContainerStyle={{ paddingBottom: bottomTabBarHeight + 60 }}
          ListEmptyComponent={
            <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>
              {"Nothing here for now.\nTry adding movies to your favorites!"}
            </Text>
          }
        />
      </Animated.View>
      <FilterButton
        shouldShowBadge={isFilterActive}
        onPress={() => router.push("/my-movie-filter")}
      />
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
  buttonContainer: {
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: SPACING.vertical.md,
  },
  button: {
    width: 140,
    height: 50,
  },
  emptyListText: {
    textAlign: "center",
    position: "absolute",
    marginBottom: 100,
  },
});

export default MyMovie;
