import Button from "@/components/Button";
import Hyperlink from "@/components/Hyperlink";
import Input from "@/components/Input";
import { useAppDispatch, useSignIn, useTheme } from "@/hooks";
import SecureStore from "@/utils/storages/SecureStorage";
import { signIn } from "@/utils/store/reducers/userReducer";
import { Credentials } from "@/utils/types/formType";
import { isAxiosError } from "axios";
import { FC, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
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
  const { colors } = useTheme();

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
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.backgroundSecondary },
      ]}
    >
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
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Log in
            </Text>
            <Controller
              control={control}
              name="username"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Input
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
                <Input
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  ref={passwordInputRef}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  returnKeyType="send"
                  isPassword
                />
              )}
            />
            <Hyperlink
              url={`${process.env.EXPO_PUBLIC_TMDB_WEB_URL}reset-password`}
              displayedText="Reset password"
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              text="Log in"
              style={styles.button}
              isLoading={isPending}
            />
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
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  button: {
    height: 48,
    borderRadius: 8,
    width: "100%",
    marginVertical: 12,
  },
  buttonText: {
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
