import { FC } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { Pressable } from "react-native-gesture-handler";

type AddToListButtonProps = {
  type: string;
  movieId: number | undefined;
  style?: ViewStyle;
};

const AddToListButton: FC<AddToListButtonProps> = ({
  type,
  movieId,
  style,
}) => {
  return (
    <Pressable style={[styles.mainContainer, style]}>
      <Text style={styles.text}>{type}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: 170,
    height: 60,
    backgroundColor: "#1119B4",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddToListButton;
