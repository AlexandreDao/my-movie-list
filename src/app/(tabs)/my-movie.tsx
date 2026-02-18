import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import MovieList from "@/components/MovieList";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetFavorites,
  useGetWatchlist,
  useTheme,
} from "@/hooks";
import { SORT_ARRAY } from "@/utils/constants/sort";
import { SPACING } from "@/utils/constants/spacing";
import { FilterParam } from "@/utils/types/routeType";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAfter, isBefore, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  const params = useLocalSearchParams<FilterParam>();
  const displayedData = isFavoritesDisplay ? favoritesData : watchlistData;
  const filteredGenreData = params.filter
    ? displayedData?.filter((d) =>
        d.genreIds.some((item) => params.filter!.includes(item.toString())),
      )
    : displayedData;
  const filteredDateData = params.date
    ? displayedData?.filter((d) =>
        params.dateFilter === "before"
          ? isBefore(
              parse(d.releaseDate, "y-MM-dd", new Date()),
              new Date(params.date!),
            )
          : isAfter(
              parse(d.releaseDate, "y-MM-dd", new Date()),
              new Date(params.date!),
            ),
      )
    : filteredGenreData;
  const sortedData = params.sort
    ? displayedData?.sort((a, b) => {
        if (params.sort === SORT_ARRAY[0].id.toString()) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        }
        if (params.sort === SORT_ARRAY[1].id.toString()) {
          if (a.popularity < b.popularity) return 1;
          if (a.popularity > b.popularity) return -1;
          return 0;
        }
        if (params.sort === SORT_ARRAY[2].id.toString()) {
          if (a.voteAverage < b.voteAverage) return 1;
          if (a.voteAverage > b.voteAverage) return -1;
          return 0;
        }
        return 0;
      })
    : filteredDateData;

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
          data={sortedData}
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
      <IconButton
        style={[
          styles.fab,
          {
            backgroundColor: colors.buttonSecondary,
            bottom: bottomTabBarHeight + 12,
          },
        ]}
        size={35}
        icon={MaterialCommunityIcons}
        name="filter-variant"
        color={colors.buttonSecondaryText}
        onPress={() => router.push({ pathname: "/my-movie-filter", params })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 55,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "5%",
  },
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
