import { useTheme } from "@/hooks";
import React from "react";
import { StyleSheet, View } from "react-native";

const BottomSheetHandle = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.handle,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  handle: {
    width: "25%",
    height: 4,
    borderRadius: 4,
    alignSelf: "center",
  },
});

export default BottomSheetHandle;
