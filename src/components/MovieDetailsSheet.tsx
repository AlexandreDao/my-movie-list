import AddToListButton from "@/components/AddToListButton";
import CircleGrade from "@/components/CircleGrade";
import { useGetMovieStatus } from "@/hooks";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { isAxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { forwardRef, useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type MovieDetailsSheetProps = {
  data: MovieDataEntryMapped | null;
};

const MovieDetailsSheet = forwardRef<BottomSheet, MovieDetailsSheetProps>(
  ({ data }, ref) => {
    const backdropPath = data
      ? `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_BACKDROP_SIZE}${data?.backdropPath}`
      : "";
    const snapPoints = useMemo(() => ["100%", "50%"], []);
    const {
      data: movieStatus,
      error: statusError,
      isError: isStatusError,
    } = useGetMovieStatus(data?.id);

    if (isStatusError && isAxiosError(statusError))
      console.log(statusError.message);

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={styles.sheetBackGround}
      >
        <BottomSheetScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.mainContainer}
        >
          <View>
            <Image
              src={backdropPath}
              height={220}
              width={400}
              resizeMode={"contain"}
            />
            <LinearGradient
              colors={["transparent", "#282828"]}
              style={styles.transparentGradient}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {data?.title}
            </Text>
            <Text style={styles.text}>{data?.releaseDate}</Text>
            <Text numberOfLines={4} style={styles.overview}>
              {data?.overview}
            </Text>
            <View style={styles.bottomDetails}>
              <CircleGrade grade={data?.voteAverage} />
              <View style={styles.buttonContainer}>
                <AddToListButton
                  movieId={data?.id}
                  type="Watchlist"
                  isAdded={movieStatus?.watchlist}
                />
                <AddToListButton
                  movieId={data?.id}
                  type="Favorites"
                  isAdded={movieStatus?.favorite}
                />
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

MovieDetailsSheet.displayName = "MovieDetailsSheet";

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    paddingBottom: 20,
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
  transparentGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
});

export default MovieDetailsSheet;
