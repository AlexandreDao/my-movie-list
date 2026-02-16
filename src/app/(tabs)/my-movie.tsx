import Button from "@/components/Button";
import MovieList from "@/components/MovieList";
import {
  useAppSelector,
  useBottomTabBarTotalHeight,
  useGetFavorites,
  useGetWatchlist,
  useTheme,
} from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
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
          data={isFavoritesDisplay ? favoritesData : watchlistData}
          refresh={isFavoritesDisplay ? refetchFavorites : refetchWatchlist}
          refreshing={
            isFavoritesDisplay ? isPendingFavorites : isPendingWatchlist
          }
          fetchNextPage={
            isFavoritesDisplay ? fetchNextFavorites : fetchNextWatchlist
          }
          contentStyle={{ paddingBottom: bottomTabBarHeight + 60 }}
        />
        {favoritesData?.length === 0 && (
          <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>
            {"Nothing here for now.\nTry adding movies to your favorites!"}
          </Text>
        )}
      </Animated.View>
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
