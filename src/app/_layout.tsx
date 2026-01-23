import { useAppSelector } from "@/hooks";
import { reactQueryPersistor } from "@/utils/storages/reactQueryPersistor";
import { store } from "@/utils/store";
import { hydrateState } from "@/utils/store/middlewares/persistenceMiddleware";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import * as Font from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
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

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        if (Platform.OS === "android") {
          await Font.loadAsync({
            ...MaterialIcons.font,
            ...MaterialCommunityIcons.font,
            // add other font
          });
        }
      } catch (error) {
        console.error("Font loading error:", error);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      await hydrateState(store);
      setIsReady(true);
    };

    initializeApp();
  }, []);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: reactQueryPersistor }}
    >
      <Provider store={store}>
        <StackRootLayout />
      </Provider>
    </PersistQueryClientProvider>
  );
};

export default RootLayout;
