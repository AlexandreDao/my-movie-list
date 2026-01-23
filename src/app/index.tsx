import Hyperlink from "@/components/Hyperlink";
import PasswordInput from "@/components/PasswordInput";
import { useAppDispatch, useSignIn } from "@/hooks";
import SecureStore from "@/utils/storages/SecureStorage";
import { signIn } from "@/utils/store/reducers/userReducer";
import { Credentials } from "@/utils/types/formType";
import { isAxiosError } from "axios";
import { FC, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn: FC = () => {
  const { control, handleSubmit } = useForm<Credentials>({
    defaultValues: { username: "", password: "" },
  });
  const dispatch = useAppDispatch();
  const { mutate: signInMutation, isPending } = useSignIn();
  const passwordInputRef = useRef<TextInput>(null);

  const onSubmit = (data: Credentials) => {
    signInMutation(
      { username: data.username, password: data.password },
      {
        onSuccess: (response) => {
          dispatch(signIn({ username: data.username }));
          SecureStore.setItemAsync("sessionId", response.sessionId);
        },
        onError: (error) => {
          if (isAxiosError(error)) {
            Alert.alert(
              "Sign In Error",
              error.response?.data?.status_message || "Unknown error",
            );
          } else {
            Alert.alert("Sign In Error", "An unexpected error occurred");
          }
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable
          disabled={Platform.OS === "web"}
          style={styles.dismissKeyboardView}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Log in</Text>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  returnKeyType="next"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <PasswordInput
                  value={value}
                  onChangeText={onChange}
                  ref={passwordInputRef}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  returnKeyType="send"
                />
              )}
            />
            <Hyperlink
              url={`${process.env.EXPO_PUBLIC_TMDB_WEB_URL}reset-password`}
              displayedText="Reset password"
            />
            <Pressable
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </Pressable>
            <Hyperlink
              url={`${process.env.EXPO_PUBLIC_TMDB_WEB_URL}signup`}
              displayedText="Join us"
            />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 448,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    height: 48,
    backgroundColor: "#2563eb",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  hyperlink: {
    fontWeight: "500",
    textDecorationLine: "underline",
    paddingLeft: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  dismissKeyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
