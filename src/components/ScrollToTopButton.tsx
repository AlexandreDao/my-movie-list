import { useTheme } from "@/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

type ScrollToTopButtonProps = {
  onPress: () => void;
  isVisible: boolean;
  style?: ViewStyle;
};

const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  onPress,
  isVisible,
  style,
}) => {
  const { colors } = useTheme();

  return (
    isVisible && (
      <Animated.View
        style={style}
        entering={FadeInDown.duration(500)}
        exiting={FadeOutDown.duration(500)}
      >
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed
              ? { backgroundColor: colors.buttonSecondaryHighlight }
              : { backgroundColor: colors.buttonSecondary },
          ]}
          disabled={!isVisible}
          onPress={onPress}
        >
          <MaterialIcons
            name={"arrow-upward"}
            size={30}
            color={colors.buttonSecondaryText}
          />
        </Pressable>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    alignSelf: "center",
  },
});

export default ScrollToTopButton;
