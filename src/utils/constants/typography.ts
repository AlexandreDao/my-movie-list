import { StyleSheet } from "react-native";

export const FONT_SIZE = Object.freeze({
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  huge: 40,
});

export const FONT_WEIGHT = Object.freeze({
  regular: "400",
  medium: "500",
  bold: "700",
});

export const TYPOGRAPHY = StyleSheet.create({
  heading1: { fontSize: 32, fontWeight: "700" },
  heading2: { fontSize: 24, fontWeight: "700" },
  heading3: { fontSize: 20, fontWeight: "500" },
  body: { fontSize: 16, fontWeight: "400" },
  caption: { fontSize: 12, fontWeight: "400" },
  textButton: { fontSize: 16, fontWeight: "500" },
});
