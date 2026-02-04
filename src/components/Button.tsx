import { useAppSelector } from "@/hooks";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { FC } from "react";
import {
  ActivityIndicator,
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
  isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({
  icon,
  iconSize = 30,
  onPress,
  color,
  text = "Click me",
  style,
  textStyle,
  pressedStyle,
  disabled,
  isLoading,
}) => {
  const colors = useAppSelector((state) => state.theme.colors);
  const textColor = color ?? colors.buttonPrimaryText;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => {
        if (pressed) {
          return [
            styles.button,
            { backgroundColor: colors.buttonPrimaryHighlight },
            style,
            pressedStyle,
          ];
        }
        return [
          styles.button,
          { backgroundColor: colors.buttonPrimary },
          style,
        ];
      }}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.loader} />
      ) : (
        <>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={iconSize}
              color={textColor}
            />
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
