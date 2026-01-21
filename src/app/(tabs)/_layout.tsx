import CustomHeader from "@/components/CustomHeader";
import CustomTabBackground from "@/components/CustomTabBackground";
import { CustomTabButton } from "@/components/CustomTabButton";
import {
  NavigationContext,
  NavigationProvider,
} from "@/utils/contexts/NavigationContext";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const MeasureCustomBottomTab: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<View>(null);
  const { setNavigationState } = useContext(NavigationContext);

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setNavigationState((prev) => ({
        ...prev,
        bottomTabBarTotalHeight: height + 32,
        bottomTabBarHeight: height,
      }));
    });
  }, []);

  return (
    <View ref={ref} style={styles.tabList}>
      {children}
    </View>
  );
};

const FocusBackground = () => {
  const { navigationState } = useContext(NavigationContext);
  const prevPosition = useRef([0, 0]);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (
      prevPosition.current[0] !== 0 &&
      prevPosition.current[0] !== navigationState.focusPosition[0]
    ) {
      translateX.value +=
        navigationState.focusPosition[0] - prevPosition.current[0];
    }
    prevPosition.current = navigationState.focusPosition;
  }, [navigationState.focusPosition]);

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
        {
          position: "absolute",
          width: 120,
          backgroundColor: "grey",
          height: navigationState.bottomTabBarHeight - 4,
          left: 2,
          top: 2,
          borderRadius: 32,
        },
        animatedStyle,
      ]}
    />
  );
};

//TODO:
// animate tab switching
// add pressed effect on tab button
export const TabLayout: FC = () => {
  return (
    <NavigationProvider>
      <Tabs>
        <CustomHeader />
        <TabSlot />
        <TabList asChild>
          <MeasureCustomBottomTab>
            <FocusBackground />
            <TabTrigger name="index" href="/" asChild>
              <CustomTabButton icon="home">Home</CustomTabButton>
            </TabTrigger>
            <TabTrigger name="my-movie" href="/my-movie" asChild>
              <CustomTabButton icon="local-movies">My movie</CustomTabButton>
            </TabTrigger>
          </MeasureCustomBottomTab>
        </TabList>
        <CustomTabBackground />
      </Tabs>
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  tabList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 32,
    borderRadius: 24,
    padding: 2,
    paddingLeft: 10,
    backgroundColor: "black",
    zIndex: 1,
    flexDirection: "row",
  },
});

export default TabLayout;
