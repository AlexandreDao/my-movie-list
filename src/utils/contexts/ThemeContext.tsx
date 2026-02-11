import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Canvas,
  Circle,
  dist,
  Image,
  ImageShader,
  makeImageFromView,
  mix,
  SkImage,
  vec,
} from "@shopify/react-native-skia";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  Appearance,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export type ColorScheme = "light" | "dark";

type ThemeContextType = {
  colorScheme: ColorScheme;
  setColorScheme: (
    colorScheme: ColorScheme,
    x: number,
    y: number,
    animated?: boolean,
  ) => void;
};

const COLOR_SCHEME_DEFAULT_VALUE: ColorScheme =
  Appearance.getColorScheme() ?? "light";

const THEME_CONTEXT_DEFAULT_VALUE: ThemeContextType = {
  colorScheme: COLOR_SCHEME_DEFAULT_VALUE,
  setColorScheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(
  THEME_CONTEXT_DEFAULT_VALUE,
);

const nextFrame = () => new Promise((res) => requestAnimationFrame(res));

const { width, height } = Dimensions.get("screen");

const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

const CORNERS = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];
// TODO: fix bottom sheet borderRadius when changing theme
const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    COLOR_SCHEME_DEFAULT_VALUE,
  );
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const transition = useSharedValue(0);
  const ref = useRef<View>(null);
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  const [overlay1, setOverlay1] = useState<SkImage | null>(null);
  const [overlay2, setOverlay2] = useState<SkImage | null>(null);
  const isAnimating = useRef(false);
  const statusBarChanged = useSharedValue(false);

  const changeStatusBar = () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    Appearance.setColorScheme(newColorScheme);
    StatusBar.setBarStyle(`${newColorScheme}-content`, true);
  };

  useAnimatedReaction(
    () => {
      const currentRadius = circle.value.r * transition.value;
      return currentRadius >= circle.value.y - ANDROID_STATUS_BAR_HEIGHT;
    },
    (shouldChange, previous) => {
      if (shouldChange && !previous && !statusBarChanged.value) {
        statusBarChanged.value = true;
        scheduleOnRN(changeStatusBar);
      }
    },
  );

  const setAnimatedColorScheme = useCallback(
    async (
      newColorScheme: ColorScheme,
      x: number,
      y: number,
      animated = true,
    ) => {
      if (!isAnimating.current && !animated) {
        const statusBarColorScheme =
          newColorScheme === "dark" ? "light-content" : "dark-content";
        setColorScheme(newColorScheme);
        Appearance.setColorScheme(newColorScheme);
        StatusBar.setBarStyle(statusBarColorScheme, false);
        return;
      }
      if (isAnimating.current) {
        return;
      }
      const cleanup = () => {
        setOverlay1(null);
        setOverlay2(null);
        isAnimating.current = false;
      };
      isAnimating.current = true;
      // Wait for pressed state
      await nextFrame();
      await nextFrame();
      const oldViewSnapshot = await makeImageFromView(ref);
      setOverlay1(oldViewSnapshot);
      const r = Math.max(...CORNERS.map((corner) => dist(corner, { x, y })));

      circle.value = { x, y, r };
      transition.value = 0;
      await nextFrame();
      await nextFrame();
      setColorScheme(newColorScheme);
      await AsyncStorage.setItem("colorScheme", newColorScheme);
      await nextFrame();
      await nextFrame();
      const newViewSnapshot = await makeImageFromView(ref);
      setOverlay2(newViewSnapshot);
      await nextFrame();
      transition.value = withTiming(
        1,
        { duration: 600 },
        (finished, current) => {
          if (finished) {
            scheduleOnRN(cleanup);
            statusBarChanged.value = false;
          }
        },
      );
    },
    [circle, transition, statusBarChanged],
  );

  return (
    <View style={styles.flex}>
      <View ref={ref} style={styles.flex} collapsable={false}>
        <ThemeContext.Provider
          value={{
            colorScheme,
            setColorScheme: setAnimatedColorScheme,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </View>
      {overlay1 && (
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Canvas style={styles.flex} pointerEvents="none">
            <Image image={overlay1} x={0} y={0} width={width} height={height} />
            {overlay2 && (
              <Circle c={circle} r={r}>
                <ImageShader
                  image={overlay2}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                  fit="cover"
                />
              </Circle>
            )}
          </Canvas>
        </View>
      )}
    </View>
  );
};

ThemeContext.displayName = "ThemeContext";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export { ThemeContext, ThemeProvider };
