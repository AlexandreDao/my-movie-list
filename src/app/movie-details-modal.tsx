import AddToListButton from "@/components/AddToListButton";
import CircleGrade from "@/components/CircleGrade";
import DownArrowButton from "@/components/DownArrowButton";
import { useAppSelector, useGetMovieDetails } from "@/hooks";
import { isAxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEvent,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const useIsTruncated = (maxLines: number) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [measured, setMeasured] = useState(false);

  const onTextLayout = (e: TextLayoutEvent) => {
    if (measured) return;
    setIsTruncated(e.nativeEvent.lines.length > maxLines);
    setMeasured(true);
  };

  return { isTruncated, onTextLayout };
};

const MovieDetailsModal: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const accountId = useAppSelector((state) => state.user.accountId);
  const router = useRouter();
  const {
    data: movieDetails,
    error: detailsError,
    isPending,
    isError: isDetailsError,
  } = useGetMovieDetails(id);
  const [isOverviewFull, setIsOverviewFull] = useState(false);
  const { isTruncated, onTextLayout } = useIsTruncated(4);
  const backdropPath = movieDetails
    ? `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_BACKDROP_SIZE}${movieDetails?.backdropPath}`
    : "";

  //TO DO change the date to a prettier format

  useEffect(() => {
    if (isDetailsError && isAxiosError(detailsError)) {
      Alert.alert(
        "Problem occurred when fetching movie details",
        detailsError.response?.data?.status_message || "Unknown error",
      );
      router.back();
    }
  }, [isDetailsError, detailsError, router]);

  return (
    <SafeAreaView style={styles.modal}>
      {isPending || isDetailsError ? (
        <ActivityIndicator color={"#ffffffaa"} size={100} />
      ) : (
        <View style={styles.mainContainer}>
          <View>
            <View style={styles.topContainer}>
              <Image
                src={backdropPath}
                height={250}
                width={400}
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
            <Text
              style={[styles.overview, { position: "absolute", opacity: 0 }]}
              onTextLayout={onTextLayout}
            >
              {movieDetails?.overview}
            </Text>
            <Text
              numberOfLines={isOverviewFull ? 0 : 4}
              style={styles.overview}
            >
              {movieDetails?.overview}
            </Text>
            {isTruncated && (
              <Pressable onPress={() => setIsOverviewFull(!isOverviewFull)}>
                <Text style={styles.showText}>
                  {isOverviewFull ? "Show less" : "Show more"}
                </Text>
              </Pressable>
            )}
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
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    lineHeight: 20,
    marginTop: 10,
    fontSize: 16,
  },
  text: {
    color: "white",
  },
  showText: {
    color: "#646ae0",
    textDecorationLine: "underline",
    fontSize: 20,
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
