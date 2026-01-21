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
  useLayoutEffect,
  useRef,
} from "react";
import { StyleSheet, View } from "react-native";

const MeasureCustomBottomTab: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<View>(null);
  const { setNavigationState } = useContext(NavigationContext);

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setNavigationState((prev) => ({
        ...prev,
        bottomTabBarHeight: height + 32,
      }));
    });
  }, []);

  return (
    <View ref={ref} style={styles.tabList}>
      {children}
    </View>
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
    zIndex: 10,
    flexDirection: "row",
  },
});

export default TabLayout;
