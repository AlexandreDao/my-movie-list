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
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
  },
});

export default PasswordInput;
