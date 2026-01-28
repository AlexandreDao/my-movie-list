import AddToListButton from "@/components/AddToListButton";
import CircleGrade from "@/components/CircleGrade";
import DownArrowButton from "@/components/DownArrowButton";
import { useAppSelector, useGetMovieDetails } from "@/hooks";
import { isAxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailsModal: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const accountId = useAppSelector((state) => state.user.accountId);
  const router = useRouter();
  const {
    data: movieDetails,
    error: statusError,
    isError: isStatusError,
  } = useGetMovieDetails(id);
  const backdropPath = movieDetails
    ? `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_BACKDROP_SIZE}${movieDetails?.backdropPath}`
    : "";

  if (isStatusError && isAxiosError(statusError))
    console.log(statusError.message);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <View style={styles.topContainer}>
          <Image
            src={backdropPath}
            height={215}
            width={380}
            resizeMode={"contain"}
          />
          <DownArrowButton
            onPress={() => router.back()}
            style={styles.downArrow}
          />
        </View>
        <LinearGradient
          colors={["transparent", "#282828"]}
          style={styles.transparentGradient}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {movieDetails?.title}
        </Text>
        <Text style={styles.text}>{movieDetails?.releaseDate}</Text>
        <Text numberOfLines={4} style={styles.overview}>
          {movieDetails?.overview}
        </Text>
        <View style={styles.bottomDetails}>
          <CircleGrade grade={movieDetails?.voteAverage} />
          <View style={styles.buttonContainer}>
            <AddToListButton
              movieId={movieDetails?.id}
              accountId={accountId}
              type="watchlist"
              isAdded={movieDetails?.accountStates?.watchlist}
            />
            <AddToListButton
              movieId={movieDetails?.id}
              accountId={accountId}
              type="favorite"
              isAdded={movieDetails?.accountStates?.favorite}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#282828",
  },
  topContainer: {
    flexDirection: "row",
  },
  sheetBackGround: {
    backgroundColor: "#282828",
  },
  detailsContainer: {
    //backgroundColor: "blue",
    width: "88%",
  },
  bottomDetails: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonContainer: {
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
  },
  overview: {
    color: "white",
    paddingTop: 10,
    fontSize: 16,
  },
  text: {
    color: "white",
  },
  downArrow: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 20,
    right: 20,
  },
  transparentGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});

export default MovieDetailsModal;
