import { useHeaderHeight } from "@/hooks";
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
  const inputRef = useRef<TextInput>(null);
  const { width: screenWidth } = useWindowDimensions();
  const fullBarWidth = screenWidth * 0.9;
  const buttonWidth = 55;
  //const buttonWidth = screenWidth * 0.15;
  const headerHeight = useHeaderHeight();

  const forceFocus = () => {
    inputRef.current?.focus();
  };

  const animatedWidth = useAnimatedStyle(() => {
    const widthTarget = isCollapsed ? buttonWidth : fullBarWidth;

    return {
      width: withTiming(
        widthTarget,
        {
          duration: 450,
          easing: Easing.inOut(Easing.circle),
          reduceMotion: ReduceMotion.System,
        },
        (finished) => {
          if (finished && widthTarget === fullBarWidth) {
            scheduleOnRN(forceFocus);
          }
        },
      ),
    };
  });

  return (
    <AnimatedKeyboardStickyView
      offset={{ opened: headerHeight }}
      style={[styles.searchBar, containerStyle, animatedWidth]}
    >
      <Pressable
        onPress={() => setIsCollapsed(!isCollapsed)}
        style={[styles.buttonStyle, { width: buttonWidth }]}
      >
        <MaterialIcons name="search" size={35} />
      </Pressable>
      {isCollapsed ? null : (
        <TextInput
          style={styles.inputStyle}
          value={searchString}
          ref={inputRef}
          placeholder={"search a movie name:"}
          onBlur={() => setIsCollapsed(searchString.length === 0)}
          autoCapitalize="none"
          onSubmitEditing={() => {
            setIsCollapsed(searchString.length === 0);
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
    backgroundColor: "white",
    height: 50,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  buttonStyle: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    width: "80%",
  },
});

export default FloatingSearchBar;
