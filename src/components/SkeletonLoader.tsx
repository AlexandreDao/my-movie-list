import { Theme } from "@/utils/constants/palette";
import { LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import React, { FC, useEffect } from "react";
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type SkeletonLoaderProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  duration?: number;
  colors: Theme;
};

const SkeletonLoader: FC<SkeletonLoaderProps> = ({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  duration = 1000,
  colors,
}) => {
  const first = useSharedValue(-0.2);
  const second = useSharedValue(-0.1);
  const third = useSharedValue(0);

  const animatedProps = useDerivedValue(() => {
    return [first.value, second.value, third.value];
  });

  useEffect(() => {
    first.value = withRepeat(withTiming(1, { duration: duration }), -1);
    second.value = withRepeat(withTiming(1.1, { duration: duration }), -1);
    third.value = withRepeat(withTiming(1.2, { duration: duration }), -1);
  }, []);

  return (
    <Rect x={x} y={y} width={width} height={height}>
      <LinearGradient
        colors={[
          colors.skeletonLoader,
          colors.skeletonShimmer,
          colors.skeletonLoader,
        ]}
        start={vec(x, y)}
        end={vec(x + width, y + height)}
        positions={animatedProps}
      />
    </Rect>
  );
};

export default SkeletonLoader;
