import IconButton from "@/components/IconButton";
import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { PressableProps } from "react-native";

const BackButton: FC<PressableProps> = (props) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <IconButton
      icon={MaterialIcons}
      name="arrow-back"
      size={24}
      color={colors.buttonPrimaryText}
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
      hitSlop={24}
      {...props}
    />
  );
};

export default BackButton;
