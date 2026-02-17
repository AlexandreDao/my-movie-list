import { useTheme } from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import { TYPOGRAPHY } from "@/utils/constants/typography";
import React, { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ChipProps = {
  text: string;
  onPress?: () => void;
  isSelected?: boolean;
};

const Chip: FC<ChipProps> = ({ text, onPress, isSelected }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      hitSlop={4}
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) {
          return [
            styles.chip,
            {
              backgroundColor: colors.chipHighlight,
            },
          ];
        }
        return [
          styles.chip,
          {
            backgroundColor: isSelected
              ? colors.chipFocused
              : colors.chipBackground,
          },
        ];
      }}
    >
      <Text style={[TYPOGRAPHY.body, { color: colors.chipText }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: SPACING.vertical.xs,
    paddingHorizontal: SPACING.horizontal.sm,
    borderRadius: 16,
  },
});

export default Chip;
