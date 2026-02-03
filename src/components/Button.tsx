import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { FC } from "react";
import {
  OpaqueColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  icon?: IconProps<keyof typeof MaterialCommunityIcons.glyphMap>["name"];
  iconSize?: number;
  onPress?: () => void;
  color?: string | OpaqueColorValue;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  icon,
  iconSize = 30,
  onPress,
  color = "white",
  text = "Click me",
  style,
  textStyle,
  pressedStyle,
  disabled,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) {
          return [styles.button, styles.pressedButton, style, pressedStyle];
        }
        return [styles.button, style];
      }}
      disabled={disabled}
    >
      {icon && (
        <MaterialCommunityIcons name={icon} size={iconSize} color={color} />
      )}
      <Text style={[styles.text, { color: color }, textStyle]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#1119B4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 20,
    paddingHorizontal: 12,
  },
  pressedButton: {
    backgroundColor: "#4a4fb3",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    textAlign: "center",
  },
});

export default Button;
