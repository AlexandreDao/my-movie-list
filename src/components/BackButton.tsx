import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, PressableProps } from "react-native";

const BackButton: FC<PressableProps> = (props) => {
  const router = useRouter();

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
        style={{ position: "absolute" }}
        name="arrow-back"
        size={30}
        color="white"
      />
      <MaterialIcons name="arrow-back" size={24} color="black" />
    </Pressable>
  );
};

export default BackButton;
