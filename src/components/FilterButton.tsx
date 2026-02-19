import { useBottomTabBarTotalHeight, useTheme } from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

type FilterButtonProps = {
  onPress: () => void;
  shouldShowBadge?: boolean;
};

const FilterButton: FC<FilterButtonProps> = ({ onPress, shouldShowBadge }) => {
  const bottomTabBarHeight = useBottomTabBarTotalHeight();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.fab,
        {
          bottom: bottomTabBarHeight + 12,
        },
      ]}
    >
      <IconButton
        style={[
          styles.btn,
          {
            backgroundColor: colors.buttonSecondary,
          },
        ]}
        size={35}
        icon={MaterialCommunityIcons}
        name="filter-variant"
        color={colors.buttonSecondaryText}
        onPress={onPress}
      />
      {shouldShowBadge && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.badge,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: SPACING.horizontal.lg,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default FilterButton;
