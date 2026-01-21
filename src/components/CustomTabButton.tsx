import { NavigationContext } from "@/utils/contexts/NavigationContext";
import { MaterialIcons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import { FC, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CustomTabButtonProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  children: string;
} & TabTriggerSlotProps;

export const CustomTabButton: FC<CustomTabButtonProps> = ({
  isFocused,
  icon,
  children,
  ...props
}) => {
  const { setNavigationState } = useContext(NavigationContext);
  const ref = useRef<View>(null);

  useEffect(() => {
    if (isFocused) {
      setNavigationState((prev) => ({
        ...prev,
        title: children,
      }));
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    if (isFocused) {
      ref.current?.measure((x, y, width, height, pageX, pageY) => {
        setNavigationState((prev) => ({
          ...prev,
          focusPosition: [x, y],
        }));
      });
    }
  }, [isFocused]);

  return (
    <Pressable {...props} ref={ref} style={[styles.button]}>
      <MaterialIcons
        name={icon}
        size={18}
        color={isFocused ? "#fff" : "grey"}
      />
      <Text style={[styles.text, isFocused && styles.focusedText]}>
        {children}
      </Text>
    </Pressable>
  );
};

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
  button: {
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    paddingVertical: 4,
    marginLeft: -8,
  },
  focusedButton: {
    backgroundColor: "grey",
  },
  focusedText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },
  text: {
    color: "grey",
    fontSize: 10,
    fontWeight: "500",
  },
});
