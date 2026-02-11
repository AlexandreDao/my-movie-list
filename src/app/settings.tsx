import Button from "@/components/Button";
import { useAppDispatch, useSignOut, useTheme } from "@/hooks";
import { SPACING } from "@/utils/constants/spacing";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";

const Settings = () => {
  const { colors, colorScheme, setColorScheme } = useTheme();
  const isDarkMode = colorScheme === "dark";
  const { mutate } = useSignOut();
  const dispatch = useAppDispatch();
  const [isPressed, setIsPressed] = useState(false);

  const singleTap = Gesture.Tap()
    .runOnJS(true)
    .maxDelay(600)
    .shouldCancelWhenOutside(true)
    .maxDistance(5)
    .onTouchesDown(() => {
      scheduleOnRN(() => setIsPressed(true));
    })
    .onTouchesUp(() => {
      scheduleOnRN(() => setIsPressed(false));
    })
    .onEnd((e) => {
      if (e.state === 5 && e.numberOfPointers === 1) {
        setColorScheme(isDarkMode ? "light" : "dark", e.absoluteX, e.absoluteY);
      }
    })
    .onFinalize(() => {
      scheduleOnRN(() => setIsPressed(false));
    });
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
        <GestureDetector gesture={singleTap}>
          <Button
            disabled
            isPressed={isPressed}
            variant="tertiary"
            text={isDarkMode ? "Light mode" : "Dark mode"}
            iconName={isDarkMode ? "sunny-outline" : "moon-outline"}
            icon={Ionicons}
            style={styles.button}
          />
        </GestureDetector>
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
