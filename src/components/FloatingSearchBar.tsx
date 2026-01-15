import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, ViewStyle } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from "react-native-worklets";

type FloatingSearchBarProps = {
    containerStyle?: ViewStyle,
    searchString: string,
} & TextInputProps

const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({containerStyle, searchString, ...textInputProps}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const inputRef = useRef<TextInput>(null);

  const forceFocus = () => {
    inputRef.current?.focus();
  }

  const animatedWidth = useAnimatedStyle(() => {
    const widthTarget = isCollapsed ? 60 : 280;
  
    return {
      width: withTiming(widthTarget, {
        duration: 450,
        easing: Easing.inOut(Easing.circle),
        reduceMotion: ReduceMotion.System,
      }, (finished) => {
        if (finished && widthTarget === 280) {
          console.log("finished!!!, focus will be: " + (widthTarget === 280));
          scheduleOnRN(forceFocus);
        }
      })
    };
  });

  return (
    <Animated.View style={[styles.searchBar, containerStyle, animatedWidth]}>
      <TouchableOpacity
        onPress={() => setIsCollapsed(!isCollapsed)}
        style={styles.buttonStyle}
      >
        <Text>{"[...]"}</Text>
      </TouchableOpacity>
      {isCollapsed ? null : 
        <TextInput
          style={styles.inputStyle}
          value={searchString}
          ref={inputRef}
          onBlur={() => setIsCollapsed(searchString.length === 0)}
          onSubmitEditing={() => setIsCollapsed(searchString.length === 0)}
          {...textInputProps}
        />
      }
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 8,
    backgroundColor: "#BAD0FF",
    width: "80%",
    height: 50,
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  buttonStyle: {
    borderRadius: 8,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    width: "75%",
  },
});

export default FloatingSearchBar;