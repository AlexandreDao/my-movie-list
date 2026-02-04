import AddToListButton from "@/components/AddToListButton";
import Button from "@/components/Button";
import CircleGrade from "@/components/CircleGrade";
import CollapsableOverview from "@/components/CollapsableOverview";
import DownArrowButton from "@/components/DownArrowButton";
import {
  useAppDispatch,
  useAppSelector,
  useGetAccountDetails,
  useGetMovieDetails,
  withOpacity,
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
  const colors = useAppSelector((state) => state.theme.colors);
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
        <ActivityIndicator color={colors.loader} size={100} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.modal}>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
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
            colors={[
              withOpacity(colors.backgroundPrimary, 0),
              colors.backgroundPrimary,
            ]}
            style={styles.transparentGradient}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text
            numberOfLines={2}
            style={[styles.title, { color: colors.textPrimary }]}
          >
            {movieDetails?.title}
          </Text>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            {movieDetails?.releaseDate}
          </Text>
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
          <Button
            style={styles.screeningBtn}
            text="Screening around you"
            icon="map-marker-outline"
            onPress={() =>
              router.push({
                pathname: "/map",
                params: { title: movieDetails?.title },
              })
            }
            disabled={!movieDetails?.title}
          />
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
  },
  topContainer: {
    flexDirection: "row",
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
    fontWeight: "bold",
    fontSize: 30,
  },
  text: {},
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
  screeningBtn: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default MovieDetailsModal;
