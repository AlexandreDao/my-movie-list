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
      style={({ pressed }) => (pressed ? styles.containerHi : styles.container)}
      onPress={onPress}
    >
      {isPending ? (
        <ActivityIndicator color={"#ffffffc0"} />
      ) : (
        <View style={styles.insideContainer}>
          <MaterialCommunityIcons
            name={
              toAdd
                ? type === "watchlist"
                  ? "eye-plus-outline"
                  : "star-outline"
                : type === "watchlist"
                  ? "eye-remove-outline"
                  : "star-off-outline"
            }
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
    backgroundColor: "#1119B4",
    justifyContent: "center",
  },
  containerHi: {
    width: 170,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#4a4fb3",
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
    color: "white",
  },
});

export default AddToListButton;
