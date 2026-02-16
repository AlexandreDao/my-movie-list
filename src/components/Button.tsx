import { useTheme } from "@/hooks";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { ComponentType } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  OpaqueColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type IconComponent<Glyphs extends string> = ComponentType<IconProps<Glyphs>>;

type ButtonProps<Glyphs extends string> = {
  icon?: IconComponent<Glyphs>;
  iconSize?: number;
  iconName?: Glyphs;
  onPress?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  color?: string | OpaqueColorValue;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  isPressed?: boolean;
};

const Button = <Glyphs extends string = string>({
  icon: Icon,
  iconName,
  iconSize = 30,
  onPress,
  color,
  text = "Click me",
  style,
  textStyle,
  pressedStyle,
  disabled,
  isLoading,
  onPressOut,
  variant = "primary",
  isPressed,
}: ButtonProps<Glyphs>) => {
  const { colors } = useTheme();
  const backgroundColor = {
    primary: colors.buttonPrimary,
    secondary: colors.buttonSecondary,
    tertiary: colors.buttonTertiary,
  };
  const highlightColor = {
    primary: colors.buttonPrimaryHighlight,
    secondary: colors.buttonSecondaryHighlight,
    tertiary: colors.buttonTertiaryHighlight,
  };
  const defaultTextColor = {
    primary: colors.buttonPrimaryText,
    secondary: colors.buttonSecondaryText,
    tertiary: colors.buttonTertiaryText,
  };
  const textColor = color ?? defaultTextColor[variant];

  return (
    <Pressable
      onPress={onPress}
      onPressOut={onPressOut}
      style={({ pressed }) => {
        if (pressed || isPressed) {
          return [
            styles.button,
            { backgroundColor: highlightColor[variant] },
            style,
            pressedStyle,
          ];
        }
        return [
          styles.button,
          { backgroundColor: backgroundColor[variant] },
          style,
        ];
      }}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.loader} />
      ) : (
        <>
          {iconName && Icon && (
            <Icon name={iconName} size={iconSize} color={textColor} />
          )}
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {text}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    columnGap: 20,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    textAlign: "center",
  },
});

export default Button;
