import { useAppSelector } from "@/hooks";
import {
  NavigationContext,
  Position,
} from "@/utils/contexts/NavigationContext";
import { MaterialIcons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import { FC, useContext, useEffect, useRef } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type CustomTabButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  children: string;
} & TabTriggerSlotProps;

export const CustomTabButton: FC<CustomTabButtonProps> = ({
  isFocused,
  icon,
  children,
  ...props
}) => {
  const { setNavigationState } = useContext(NavigationContext);
  const scale = useSharedValue(1);
  const layoutRef = useRef<Position>(null);
  const colors = useAppSelector((state) => state.theme.colors);

  const updatePosition = () => {
    if (isFocused && layoutRef.current) {
      setNavigationState((prev) => ({
        ...prev,
        focusPosition: layoutRef.current!,
      }));
    }
  };
  useEffect(() => {
    if (isFocused) {
      setNavigationState((prev) => ({
        ...prev,
        title: children,
      }));
    }
  }, [isFocused]);

  useEffect(() => {
    updatePosition();
  }, [isFocused]);

  const textColorStyle = {
    color: isFocused ? colors.textPrimary : colors.focusedTabBar,
  };

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      {...props}
      onLayout={(e) => {
        const { x, y } = e.nativeEvent.layout;

        if (layoutRef.current === null) {
          layoutRef.current = { x: Math.floor(x), y: Math.floor(y) };
        }
        updatePosition();
      }}
      onPressOut={() => {
        scale.value = withTiming(
          0.85,
          {
            duration: 300,
            easing: Easing.linear,
            reduceMotion: ReduceMotion.System,
          },
          (finished) => {
            if (finished) {
              scale.value = withTiming(1, {
                duration: 300,
                easing: Easing.elastic(2),
                reduceMotion: ReduceMotion.System,
              });
            }
          },
        );
      }}
      style={(state) => {
        return [
          styles.button,
          state.pressed && {
            backgroundColor: colors.pressedTabBar,
          },
        ];
      }}
    >
      <Animated.Text
        style={[animatedScaleStyle, styles.animatedColor, textColorStyle]}
      >
        <MaterialIcons name={icon} size={18} />
      </Animated.Text>
      <Animated.Text
        style={[styles.text, styles.animatedColor, textColorStyle]}
      >
        {children}
      </Animated.Text>
    </Pressable>
  );
};

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    paddingVertical: 4,
    marginLeft: -8,
  },
  text: {
    fontSize: 10,
    fontWeight: "500",
  },
  animatedColor: {
    transitionProperty: "color",
    transitionDuration: "500ms",
    transitionTimingFunction: "ease-in-out",
  },
});
