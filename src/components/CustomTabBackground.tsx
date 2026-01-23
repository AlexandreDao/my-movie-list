import { useBottomTabBarTotalHeight } from "@/hooks";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

const CustomTabBackground: FC = () => {
  const tabBarHeight = useBottomTabBarTotalHeight();

  return (
    <LinearGradient
      colors={["transparent", "rgba(0, 0, 0, 0.7)", "black"]}
      locations={[0, 0.6, 1]}
      start={{ x: 0.5, y: 0 }}
      style={[
        styles.background,
        {
          height: tabBarHeight,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default CustomTabBackground;
