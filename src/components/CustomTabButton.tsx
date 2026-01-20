import { MaterialIcons } from "@expo/vector-icons";
import { TabTriggerSlotProps } from "expo-router/ui";
import * as React from "react";
import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface CustomTabButtonProps
  extends React.PropsWithChildren, TabTriggerSlotProps {
  icon: keyof typeof MaterialIcons.glyphMap;
}

export const CustomTabButton = forwardRef<View, CustomTabButtonProps>(
  ({ isFocused, icon, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        {...props}
        style={[styles.button, isFocused && styles.focusedButton]}
      >
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
  },
);

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
