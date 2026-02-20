import FilterButton from "@/components/FilterButton";
import MovieList from "@/components/MovieList";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetWatchlist,
  useTheme,
} from "@/hooks";
import { filterMyMovieData } from "@/utils/functions/filterMyMovieData";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Watchlist = () => {
  const accountId = useAppSelector((state) => state.user.accountId);
  const {
    data: watchlistData,
    refetch: refetchWatchlist,
    isPending: isPendingWatchlist,
    fetchNextPage: fetchNextWatchlist,
  } = useGetWatchlist(accountId);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const { colors } = useTheme();
  const router = useRouter();
  const filter = useAppSelector((state) => state.filter);
  const filteredData = filterMyMovieData([...watchlistData], filter);

  const isFilterActive = !!(
    filter.sort.length ||
    filter.genreFilter.length ||
    filter.dateFilter
  );

  return (
    <View style={[styles.root, { backgroundColor: colors.backgroundPrimary }]}>
      <Animated.View
        style={styles.mainContainer}
        entering={FadeIn.duration(400)}
      >
        <MovieList
          data={watchlistData}
          onRefresh={refetchWatchlist}
          refreshing={isPendingWatchlist}
          fetchNextPage={fetchNextWatchlist}
          contentContainerStyle={{ paddingBottom: bottomTabBarHeight + 60 }}
          ListEmptyComponent={
            <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>
              {"Nothing here for now.\nTry adding movies to your watchlist!"}
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
  emptyListText: {
    alignSelf: "center",
    textAlign: "center",
    position: "absolute",
    marginBottom: 100,
  },
});

export default Watchlist;
