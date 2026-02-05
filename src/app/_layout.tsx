import { AsyncSkia } from "@/components/AsyncSkia";
import { useAppSelector, useTheme } from "@/hooks";
import { reactQueryPersistor } from "@/utils/storages/reactQueryPersistor";
import { store } from "@/utils/store";
import { hydrateState } from "@/utils/store/middlewares/persistenceMiddleware";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

const StackRootLayout = () => {
  const username = useAppSelector((state) => state.user.username);
  const isLoggedIn = !!username;
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="map" />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="index" />
        </Stack.Protected>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name="movie-details-modal"
            options={{
              presentation: "formSheet",
              sheetAllowedDetents: [1],
              sheetInitialDetentIndex: 0,
              sheetCornerRadius: 24,
              contentStyle: {
                backgroundColor: colors.backgroundPrimary,
              },
            }}
          />
        </Stack.Protected>
      </Stack>
    </GestureHandlerRootView>
  );
};

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS === "android") {
          await Font.loadAsync({
            ...MaterialIcons.font,
            ...MaterialCommunityIcons.font,
          });
        }
        await hydrateState(store);
      } catch (error) {
        console.warn("Loading error:", error);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <KeyboardProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: reactQueryPersistor }}
      >
        <Provider store={store}>
          <View style={StyleSheet.absoluteFill}>
            <Suspense fallback={<ActivityIndicator />}>
              <AsyncSkia />
            </Suspense>
          </View>
          <StackRootLayout />
        </Provider>
      </PersistQueryClientProvider>
    </KeyboardProvider>
  );
};

export default RootLayout;
