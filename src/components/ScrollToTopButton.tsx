import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

type ScrollToTopButtonProps = {
  onPress: () => void;
  isVisible: boolean;
  style?: ViewStyle;
};

const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  onPress,
  isVisible,
  style,
}) => {
  return (
    isVisible && (
      <Animated.View
        style={style}
        entering={FadeInUp.duration(500)}
        exiting={FadeOutUp.duration(500)}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.colorHi : styles.color,
          ]}
          disabled={!isVisible}
          onPress={onPress}
        >
          <MaterialIcons name={"arrow-upward"} size={30} color="black" />
          <Text style={styles.text}>{"Go back to the Top"}</Text>
        </Pressable>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  color: {
    backgroundColor: "white",
  },
  colorHi: {
    backgroundColor: "#ffffffd4",
  },
  text: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
});

export default ScrollToTopButton;
