import AddToListButton from "@/components/AddToListButton";
import CircleGrade from "@/components/CircleGrade";
import CollapsableOverview from "@/components/CollapsableOverview";
import DownArrowButton from "@/components/DownArrowButton";
import {
  useAppDispatch,
  useAppSelector,
  useGetAccountDetails,
  useGetMovieDetails,
} from "@/hooks";
import { setUserId } from "@/utils/store/reducers/userReducer";
import { isAxiosError } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FC, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailsModal: FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.accountId);
  const {
    data: accountDetails,
    isError: isAccountError,
    error: accountError,
  } = useGetAccountDetails(accountId);
  const router = useRouter();
  const {
    data: movieDetails,
    error: detailsError,
    isPending,
    isError: isDetailsError,
  } = useGetMovieDetails(id);
  const backdropPath = movieDetails
    ? `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}${process.env.EXPO_PUBLIC_TMDB_BACKDROP_SIZE}${movieDetails?.backdropPath}`
    : "";

  //TO DO change the date to a prettier format

  useEffect(() => {
    if (accountId === "" && accountDetails && !isAccountError) {
      dispatch(setUserId({ accountId: accountDetails.id.toString() }));
    }
    if (isAccountError) {
      if (isAxiosError(accountError)) {
        Alert.alert(
          "Account details fetch accountError",
          accountError.response?.data?.status_message || "Unknown error",
        );
      } else {
        Alert.alert("Account details fetch error");
      }
    }
  }, [accountDetails, accountId, isAccountError, accountError, dispatch]);

  useEffect(() => {
    if (isDetailsError) {
      if (isAxiosError(detailsError)) {
        Alert.alert(
          "Problem occurred when fetching movie details",
          detailsError.response?.data?.status_message || "Unknown error",
        );
      } else {
        Alert.alert("An unexpected error occurred");
      }
      if (router.canGoBack()) router.back();
    }
  }, [isDetailsError, detailsError, router]);

  if (isPending || isDetailsError) {
    return (
      <SafeAreaView style={styles.modal}>
        <ActivityIndicator color={"#ffffffaa"} size={100} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.modal}>
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image
            src={backdropPath}
            height={250}
            width={400}
            resizeMode={"contain"}
          />
          <DownArrowButton
            onPress={() => {
              if (router.canGoBack()) router.back();
            }}
            style={styles.downArrow}
          />
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
          <CollapsableOverview text={movieDetails?.overview} />
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
