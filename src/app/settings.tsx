import Button from "@/components/Button";
import ColorSchemeButton from "@/components/ColorSchemeButton";
import { useAppDispatch, useSignOut, useTheme } from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const { colors } = useTheme();
  const { mutate } = useSignOut();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView
      collapsable={false}
      style={[
        styles.root,
        {
          backgroundColor: colors.backgroundSecondary,
        },
      ]}
      edges={["bottom"]}
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
        <ColorSchemeButton />
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
