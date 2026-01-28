import AddToListButton from "@/components/AddToListButton";
import CircleGrade from "@/components/CircleGrade";
import { useGetMovieStatus } from "@/hooks";
import { MovieDataEntryMapped } from "@/utils/types/tmdbMappedTypes";
import { isAxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

type MovieDetailsSheetProps = {
  data: MovieDataEntryMapped | null;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
};

const MovieDetailsSheet: FC<MovieDetailsSheetProps> = ({
  data,
  isVisible,
  setIsVisible,
}) => {
  const backdropPath = data
    ? `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_BACKDROP_SIZE}${data?.backdropPath}`
    : "";
  const {
    data: movieStatus,
    error: statusError,
    isError: isStatusError,
  } = useGetMovieStatus(data?.id);

  if (isStatusError && isAxiosError(statusError))
    console.log(statusError.message);

  return (
    <Modal
      style={{ width: "100%", margin: 0 }}
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection="down"
      useNativeDriver
      useNativeDriverForBackdrop
      //backgroundStyle={styles.sheetBackGround}
    >
      <View style={styles.mainContainer}>
        <View>
          <Image
            src={backdropPath}
            height={215}
            width={380}
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
      </View>
    </Modal>
  );
};

MovieDetailsSheet.displayName = "MovieDetailsSheet";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#282828",
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
