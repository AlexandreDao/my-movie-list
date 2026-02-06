import { useTheme } from "@/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type DownArrowButtonProps = {
  onPress: () => void;
  style?: ViewStyle;
};

const DownArrowButton: FC<DownArrowButtonProps> = ({ onPress, style }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [
              styles.containerHi,
              style,
              { backgroundColor: colors.buttonTertiaryHighlight },
            ]
          : [
              styles.container,
              style,
              { backgroundColor: colors.buttonTertiary },
            ]
      }
    >
      <MaterialIcons
        name="keyboard-arrow-down"
        size={35}
        color={colors.buttonTertiaryText}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHi: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DownArrowButton;
