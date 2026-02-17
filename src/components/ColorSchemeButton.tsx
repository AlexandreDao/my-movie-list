import Button from "@/components/Button";
import { useTheme } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { scheduleOnRN } from "react-native-worklets";

const ColorSchemeButton: FC = () => {
  const { colorScheme, setColorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";
  const [isPressed, setIsPressed] = useState(false);

  const singleTap = Gesture.Tap()
    .runOnJS(true)
    .maxDelay(600)
    .shouldCancelWhenOutside(true)
    .maxDistance(20)
    .onTouchesDown(() => {
      scheduleOnRN(() => setIsPressed(true));
    })
    .onTouchesUp(() => {
      scheduleOnRN(() => setIsPressed(false));
    })
    .onEnd((e) => {
      if (e.state === 5 && e.numberOfPointers === 1) {
        setColorScheme(isDarkMode ? "light" : "dark", e.absoluteX, e.absoluteY);
      }
    })
    .onFinalize(() => {
      scheduleOnRN(() => setIsPressed(false));
    });

  return (
    <GestureDetector gesture={singleTap}>
      <Button
        disabled
        isPressed={isPressed}
        variant="tertiary"
        text={isDarkMode ? "Light mode" : "Dark mode"}
        iconName={isDarkMode ? "sunny-outline" : "moon-outline"}
        icon={Ionicons}
        style={styles.button}
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    justifyContent: "flex-start",
  },
});

export default ColorSchemeButton;
