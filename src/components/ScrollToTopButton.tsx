import { useTheme } from "@/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

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
        entering={FadeInUp.duration(500)}
        exiting={FadeOutUp.duration(500)}
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
          <Text style={[styles.text, { color: colors.buttonSecondaryText }]}>
            {"Go back to the Top"}
          </Text>
        </Pressable>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    alignSelf: "center",
  },
});

export default ScrollToTopButton;
