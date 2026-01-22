import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FC, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type FloatingSearchBarProps = {
  containerStyle?: ViewStyle;
  searchString: string;
  onSubmit: () => void;
} & TextInputProps;

const FloatingSearchBar: FC<FloatingSearchBarProps> = ({
  containerStyle,
  searchString,
  onSubmit,
  ...textInputProps
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const inputRef = useRef<TextInput>(null);
  const { width: screenWidth } = useWindowDimensions();

  const forceFocus = () => {
    inputRef.current?.focus();
  };

  const animatedWidth = useAnimatedStyle(() => {
    const widthTarget = isCollapsed ? screenWidth * 0.15 : screenWidth * 0.9;

    return {
      width: withTiming(
        widthTarget,
        {
          duration: 450,
          easing: Easing.inOut(Easing.circle),
          reduceMotion: ReduceMotion.System,
        },
        (finished) => {
          if (finished && widthTarget === screenWidth * 0.9) {
            scheduleOnRN(forceFocus);
          }
        },
      ),
    };
  });

  return (
    <Animated.View style={[styles.searchBar, containerStyle, animatedWidth]}>
      <Pressable
        onPress={() => setIsCollapsed(!isCollapsed)}
        style={[styles.buttonStyle, { width: screenWidth * 0.15 }]}
      >
        <FontAwesome name="search" size={28} />
      </Pressable>
      {isCollapsed ? null : (
        <TextInput
          style={styles.inputStyle}
          value={searchString}
          ref={inputRef}
          placeholder={"search a movie name:"}
          onBlur={() => setIsCollapsed(searchString.length === 0)}
          onSubmitEditing={() => {
            setIsCollapsed(searchString.length === 0);
            onSubmit();
          }}
          {...textInputProps}
        />
      )}
    </Animated.View>
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
