import { useTheme } from "@/hooks";
import { FC, useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

type CircleGradeProps = {
  grade: number | undefined;
  strokeWidth: number;
  color: string;
  radius: number;
  duration?: number;
  style?: ViewStyle;
};

const CircleGrade: FC<CircleGradeProps> = ({
  grade,
  radius,
  strokeWidth,
  color,
  duration,
  style,
}) => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const invertedCompletion = (100 - (grade ? grade * 10 : 0)) / 100;
  const theta = useSharedValue(2 * Math.PI);
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);
  const textOpacity = useSharedValue(0);
  const { colors } = useTheme();

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: theta.value * innerRadius,
  }));

  const gradeTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  useEffect(() => {
    theta.value = withTiming(animateTo.value, { duration: duration ?? 1500 });
    textOpacity.value = withTiming(1, {
      duration: duration ? duration * 2 : 3000,
    });
  }, [textOpacity, theta, animateTo, duration]);

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: colors.grade },
        style,
        { width: radius * 2, height: radius * 2 },
      ]}
    >
      <Svg
        style={[StyleSheet.absoluteFill, { transform: [{ rotate: "-90deg" }] }]}
      >
        <AnimatedCircle
          cx={radius}
          cy={radius}
          animatedProps={animatedProps}
          r={innerRadius}
          fill={"transparent"}
          stroke={color}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth}
        />
      </Svg>
      <Animated.Text
        style={[styles.text, { color: colors.textPrimary }, gradeTextStyle]}
      >
        {grade?.toFixed(1)}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 40,
  },
});

export default CircleGrade;
