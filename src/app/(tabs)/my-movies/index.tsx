import FilterButton from "@/components/FilterButton";
import MovieList from "@/components/MovieList";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetFavorites,
  useTheme,
} from "@/hooks";
import { filterMyMovieData } from "@/utils/functions/filterMyMovieData";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Favorites: FC = () => {
  const accountId = useAppSelector((state) => state.user.accountId);
  const {
    data: favoritesData,
    refetch: refetchFavorites,
    isPending: isPendingFavorites,
    fetchNextPage: fetchNextFavorites,
  } = useGetFavorites(accountId);
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const { colors } = useTheme();
  const router = useRouter();
  const filter = useAppSelector((state) => state.filter);
  const filteredData = filterMyMovieData([...favoritesData], filter);

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
          data={filteredData}
          onRefresh={refetchFavorites}
          refreshing={isPendingFavorites}
          fetchNextPage={fetchNextFavorites}
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
  emptyListText: {
    alignSelf: "center",
    textAlign: "center",
    position: "absolute",
    marginBottom: 100,
  },
});

export default Favorites;
