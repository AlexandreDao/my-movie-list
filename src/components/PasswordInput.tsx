import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const PasswordInput: FC<TextInputProps> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={secureTextEntry}
        {...props}
      />
      <Pressable
        style={styles.icon}
        hitSlop={12}
        onPress={() => setSecureTextEntry((prev) => !prev)}
      >
        <MaterialCommunityIcons
          name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
          size={24}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
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

export default PasswordInput;
