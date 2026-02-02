import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type DownArrowButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

const DownArrowButton: FC<DownArrowButtonProps> = ({ onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.containerHi, style] : [styles.container, style]
      }
    >
      <MaterialIcons name="keyboard-arrow-down" size={35} color={"white"} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    backgroundColor: "#282828",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHi: {
    width: 45,
    height: 45,
    backgroundColor: "#5d5a5a",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DownArrowButton;
