import Ionicons from "@expo/vector-icons/Ionicons";
import { FC } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type AddToListButtonProps = {
  type: "Watchlist" | "Favorites";
  movieId: number | undefined;
  isAdded: boolean | undefined;
  style?: ViewStyle;
};

const AddToListButton: FC<AddToListButtonProps> = ({
  type,
  isAdded,
  movieId,
  style,
}) => {
  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.containerHi : styles.container)}
      onPress={() => console.log("test!!!")}
    >
      <Ionicons
        name={isAdded ? "remove-circle-outline" : "add-circle-outline"}
        size={24}
        color="white"
      />
      <Text style={styles.text}>{type}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#1119B4",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  containerHi: {
    width: 170,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#4a4fb3",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddToListButton;
