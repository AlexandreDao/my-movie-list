import { useAppSelector } from "@/hooks";
import React, { FC } from "react";
import { Linking, Pressable, StyleSheet, Text } from "react-native";

type HyperlinkProps = {
  url: string;
  displayedText: string;
};

const Hyperlink: FC<HyperlinkProps> = ({ url, displayedText }) => {
  const colors = useAppSelector((state) => state.theme.colors);
  return (
    <Pressable
      hitSlop={10}
      pressRetentionOffset={20}
      onPress={() => Linking.openURL(url)}
    >
      <Text style={[styles.hyperlink, { color: colors.hyperlink }]}>
        {displayedText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  hyperlink: {
    fontWeight: "500",
    textDecorationLine: "underline",
    paddingLeft: 4,
  },
});

export default Hyperlink;
