import { useTheme } from "@/hooks";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import React, { ComponentType } from "react";
import { Pressable, PressableProps } from "react-native";

type IconComponent<Glyphs extends string> = ComponentType<IconProps<Glyphs>>;

type IconButtonProps<Glyphs extends string> = {
  icon: IconComponent<Glyphs>;
  name: Glyphs;
  size?: number;
  color?: string;
} & PressableProps;

const IconButton = <Glyphs extends string>({
  icon: Icon,
  color,
  size,
  name,
  ...props
}: IconButtonProps<Glyphs>) => {
  const { colors } = useTheme();

  return (
    <Pressable hitSlop={12} {...props}>
      <Icon
        name={name}
        size={size ?? 18}
        color={color ?? colors.buttonPrimaryText}
      />
    </Pressable>
  );
};

export default IconButton;
