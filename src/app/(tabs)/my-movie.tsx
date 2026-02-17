import IconButton from "@/components/IconButton";
import { useBottomTabBarTotalHeight, useTheme } from "@/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const MyMovie = () => {
  const { colors } = useTheme();
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <IconButton
        style={[
          styles.fab,
          {
            backgroundColor: colors.buttonSecondary,
            bottom: bottomTabBarHeight + 12,
          },
        ]}
        size={35}
        icon={MaterialCommunityIcons}
        name="filter-variant"
        color={colors.buttonSecondaryText}
        onPress={() => router.push("/my-movie-filter")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 55,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: "5%",
  },
});

export default MyMovie;
