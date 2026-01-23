import React, { FC } from "react";
import { Linking, StyleSheet, Pressable, Text } from "react-native";

type HyperlinkProps = {
  url: string;
  displayedText: string;
};

const Hyperlink: FC<HyperlinkProps> = ({ url, displayedText }) => {
  return (
    <Pressable
      hitSlop={10}
      pressRetentionOffset={20}
      onPress={() => Linking.openURL(url)}
      android_ripple={{ color: "rgba(255, 255, 255, 0.6)" }}
    >
      <Text style={styles.hyperlink}>{displayedText}</Text>
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
