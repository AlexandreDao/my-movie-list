import Button from "@/components/Button";
import { useAppDispatch, useSignOut, useTheme } from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import SecureStore from "@/utils/storages/SecureStorage";
import { setTheme } from "@/utils/store/reducers/themeReducer";
import { signOut } from "@/utils/store/reducers/userReducer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { colors, isDarkMode } = useTheme();
  const { mutate } = useSignOut();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        styles.root,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
    >
      <View
        style={[
          styles.handle,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundPrimary,
          },
        ]}
      >
        {isDarkMode ? (
          <Button
            variant="tertiary"
            text="Light mode"
            iconName="sunny-outline"
            icon={Ionicons}
            style={styles.button}
            onPress={() => dispatch(setTheme({ isDarkMode: false }))}
          />
        ) : (
          <Button
            variant="tertiary"
            text="Dark mode"
            iconName="moon-outline"
            icon={Ionicons}
            style={styles.button}
            onPress={() => dispatch(setTheme({ isDarkMode: true }))}
          />
        )}
        <Button
          variant="tertiary"
          text="Log out"
          iconName="exit-to-app"
          icon={MaterialCommunityIcons}
          style={styles.button}
          onPress={() => {
            dispatch(signOut());
            SecureStore.deleteItemAsync("sessionId");
            mutate(undefined, {
              onError: (error) => {
                if (isAxiosError(error)) {
                  Alert.alert(
                    "Sign Out Error",
                    error.response?.data?.status_message || "Unknown error",
                  );
                } else {
                  Alert.alert("Sign Out Error", "An unexpected error occurred");
                }
              },
            });
            // TODO: flicker when loging out
            // router.replace("/");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: SPACING.vertical.sm,
    paddingBottom: SPACING.vertical.xxl,
    rowGap: SPACING.vertical.md,
  },
  handle: {
    width: "25%",
    height: 4,
    borderRadius: 4,
    alignSelf: "center",
  },
  container: {
    marginHorizontal: SPACING.horizontal.md,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    justifyContent: "flex-start",
  },
});

export default Settings;
