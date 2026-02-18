import { useTheme } from "@/hooks";
import { TYPOGRAPHY } from "@/utils/constants/typography";
import React, { FC } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type TextButtonProps = {
  text: string;
  onPress?: () => void;
};
// TODO: merge with main
const TextButton: FC<TextButtonProps> = ({ text, onPress }) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) {
          return { backgroundColor: colors.buttonSecondaryHighlight };
        }
        return {};
      }}
    >
      <Text
        style={[
          TYPOGRAPHY.textButton,
          styles.text,
          { color: colors.textPrimary },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    textTransform: "uppercase",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});

export default TextButton;
