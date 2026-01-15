import { useAppSelector } from "@/hooks";
import { reactQueryPersistor } from "@/utils/storages/reactQueryPersistor";
import { store } from "@/utils/store";
import { hydrateState } from "@/utils/store/middlewares/persistenceMiddleware";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
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
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      await hydrateState(store);
      setIsReady(true);
    };

    initializeApp();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: reactQueryPersistor }}
      >
        <StackRootLayout />
      </PersistQueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
