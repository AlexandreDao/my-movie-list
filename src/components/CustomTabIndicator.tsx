import { useBottomTabBarHeight, useNavigationFocusPosition } from "@/hooks";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const CustomTabIndicator = () => {
  const focusPosition = useNavigationFocusPosition();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const prevPosition = useRef({ x: 2, y: 2 });
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (prevPosition.current.x !== focusPosition.x) {
      translateX.value += focusPosition.x - prevPosition.current.x;
    }
    prevPosition.current = focusPosition;
  }, [focusPosition]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translateX.value, {
            duration: 300,
            easing: Easing.inOut(Easing.circle),
            reduceMotion: ReduceMotion.System,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.view,
        {
          height: bottomTabBarHeight - 4,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    width: 120,
    backgroundColor: "grey",
    left: 2,
    top: 2,
    borderRadius: 32,
  },
});

export default CustomTabIndicator;
