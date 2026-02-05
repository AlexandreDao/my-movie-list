import { useTheme } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, PressableProps } from "react-native";

const BackButton: FC<PressableProps> = (props) => {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => {
        if (router.canGoBack()) {
          router.back();
        }
      }}
      hitSlop={24}
      {...props}
    >
      <MaterialIcons
        name="arrow-back"
        size={24}
        color={colors.buttonTertiary}
      />
    </Pressable>
  );
};

export default BackButton;
