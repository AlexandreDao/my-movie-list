import { useAddToMainList } from "@/hooks";
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
  const isDisabled = accountId === "";

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

  return (
    <Pressable
      style={({ pressed }) => {
        if (isDisabled) return [styles.container, styles.colorDisable];
        return [styles.container, pressed ? styles.colorHi : styles.color];
      }}
      onPress={onPress}
      disabled={isDisabled}
    >
      {isPending ? (
        <ActivityIndicator color={"#ffffffc0"} />
      ) : (
        <View style={styles.insideContainer}>
          <MaterialCommunityIcons
            name={toAdd ? addIcon : remIcon}
            size={30}
            color="white"
          />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{toAdd ? "Add to" : "Remove from"}</Text>
            <Text style={[styles.text, { textTransform: "capitalize" }]}>
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
  color: {
    backgroundColor: "#1119B4",
  },
  colorHi: {
    backgroundColor: "#4a4fb3",
  },
  colorDisable: {
    backgroundColor: "#757575",
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
    color: "white",
    alignSelf: "center",
  },
});

export default AddToListButton;
