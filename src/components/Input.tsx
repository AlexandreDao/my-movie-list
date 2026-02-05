import { useTheme } from "@/hooks";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { forwardRef } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = {
  isPassword?: boolean;
} & TextInputProps;

const Input = forwardRef<TextInput, InputProps>(
  ({ isPassword, ...props }, ref) => {
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const { colors } = useTheme();

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.inputBackground,
            borderColor: colors.inputBorder,
          },
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.input, { color: colors.textPrimary }]}
          placeholderTextColor={colors.textPrimary}
          placeholder="Placeholder"
          secureTextEntry={isPassword && secureTextEntry}
          {...props}
        />
        {isPassword && (
          <Pressable
            style={styles.icon}
            hitSlop={12}
            onPress={() => setSecureTextEntry((prev) => !prev)}
          >
            <MaterialCommunityIcons
              name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={colors.textPrimary}
            />
          </Pressable>
        )}
      </View>
    );
  },
);

Input.displayName = "PasswordInput";

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 48,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});

export default Input;
