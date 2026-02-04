import { useAddToMainList, useAppSelector } from "@/hooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isAxiosError } from "axios";
import { FC, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type AddToListButtonProps = {
  type: "watchlist" | "favorite";
  movieId: number | undefined;
  isAdded: boolean | undefined;
  accountId: string;
  style?: ViewStyle;
};

const AddToListButton: FC<AddToListButtonProps> = ({
  type,
  isAdded,
  accountId,
  movieId,
}) => {
  const { mutate: AddToListMutation, isPending } = useAddToMainList();
  const [toAdd, setToAdd] = useState(!isAdded);
  const addIcon = type === "watchlist" ? "eye-plus-outline" : "star-outline";
  const remIcon =
    type === "watchlist" ? "eye-remove-outline" : "star-off-outline";
  const colors = useAppSelector((state) => state.theme.colors);

  const onPress = () => {
    AddToListMutation(
      { list: type, accountId: accountId, movieId: movieId, add: toAdd },
      {
        onSuccess: () => {
          setToAdd(!toAdd);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            Alert.alert(
              `Add to ${type} Error`,
              error.response?.data?.status_message || "Unknown error",
            );
          } else {
            Alert.alert(`Add to ${type} Error`, "An unexpected error occurred");
          }
        },
      },
    );
  };

  if (accountId === "") {
    return (
      <View
        style={[styles.container, { backgroundColor: colors.buttonPrimary }]}
      >
        <Text style={styles.text}>{"Button is disabled"}</Text>
      </View>
    );
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [
              styles.containerHi,
              { backgroundColor: colors.buttonPrimaryHighlight },
            ]
          : [styles.container, { backgroundColor: colors.buttonPrimary }]
      }
      onPress={onPress}
    >
      {isPending ? (
        <ActivityIndicator color={colors.loader} />
      ) : (
        <View style={styles.insideContainer}>
          <MaterialCommunityIcons
            name={toAdd ? addIcon : remIcon}
            size={30}
            color={colors.textPrimary}
          />
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: colors.buttonPrimaryText }]}>
              {toAdd ? "Add to" : "Remove from"}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  textTransform: "capitalize",
                  color: colors.buttonPrimaryText,
                },
              ]}
            >
              {type}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
  },
  containerHi: {
    width: 170,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
  },
  insideContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  textContainer: {
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default AddToListButton;
