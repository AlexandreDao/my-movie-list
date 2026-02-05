import { useTheme } from "@/hooks";
import { NavigationContext } from "@/utils/contexts/NavigationContext";
import { FC, PropsWithChildren, useContext, useRef } from "react";
import { StyleSheet, View } from "react-native";

const CustomBottomTabBar: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<View>(null);
  const { setNavigationState } = useContext(NavigationContext);
  const isInitialized = useRef(false);
  const { colors } = useTheme();

  return (
    <View
      ref={ref}
      style={[styles.tabList, { backgroundColor: colors.tabBar }]}
      onLayout={(e) => {
        if (!isInitialized.current) {
          const { height } = e.nativeEvent.layout;

          setNavigationState((prev) => ({
            ...prev,
            bottomTabBarTotalHeight: Math.floor(height) + 32,
            bottomTabBarHeight: Math.floor(height),
          }));
          isInitialized.current = true;
        }
      }}
    >
      {children}
    </View>
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
    zIndex: 1,
    flexDirection: "row",
  },
});

export default CustomBottomTabBar;
