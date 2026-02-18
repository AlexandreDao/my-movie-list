import { useHeaderHeight, useTheme } from "@/hooks";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC, useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type FloatingSearchBarProps = {
  containerStyle?: StyleProp<ViewStyle>;
  searchString: string;
  onSubmit: () => void;
} & TextInputProps;

const AnimatedKeyboardStickyView =
  Animated.createAnimatedComponent(KeyboardStickyView);

const FloatingSearchBar: FC<FloatingSearchBarProps> = ({
  containerStyle,
  searchString,
  onSubmit,
  ...textInputProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const unCollapsing = useSharedValue(false);
  const inputRef = useRef<TextInput>(null);
  const { width: screenWidth } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const width = useSharedValue(55);
  const { colors } = useTheme();

  const forceFocus = () => {
    inputRef.current?.focus();
  };

  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withTiming(
        width.value,
        {
          duration: 450,
          easing: Easing.inOut(Easing.circle),
          reduceMotion: ReduceMotion.System,
        },
        (finished) => {
          if (finished && unCollapsing.value) {
            unCollapsing.value = false;
            scheduleOnRN(forceFocus);
          }
        },
      ),
    };
  });

  return (
    <AnimatedKeyboardStickyView
      offset={{ opened: headerHeight }}
      style={[
        styles.searchBar,
        { backgroundColor: colors.buttonSecondary },
        containerStyle,
        animatedWidth,
      ]}
    >
      <Pressable
        onPress={() => {
          if (isCollapsed) unCollapsing.value = true;
          if (isCollapsed) {
            width.value = screenWidth * 0.9;
          } else {
            width.value = 55;
          }
          setIsCollapsed(!isCollapsed);
        }}
        style={styles.buttonStyle}
      >
        <MaterialIcons
          name="search"
          size={35}
          color={colors.buttonSecondaryText}
        />
      </Pressable>
      {isCollapsed ? null : (
        <TextInput
          style={styles.inputStyle}
          value={searchString}
          ref={inputRef}
          placeholder={"search a movie name:"}
          onBlur={() => {
            if (searchString.length === 0) {
              setIsCollapsed(true);
              width.value = 55;
            }
          }}
          autoCapitalize="none"
          onSubmitEditing={() => {
            if (searchString.length === 0) {
              setIsCollapsed(true);
              width.value = 55;
            }
            onSubmit();
          }}
          {...textInputProps}
        />
      )}
    </AnimatedKeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 8,
    height: 50,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  buttonStyle: {
    borderRadius: 8,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    width: "80%",
  },
});

export default FloatingSearchBar;
