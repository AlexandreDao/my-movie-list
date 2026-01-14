import { reactQueryPersistor } from "@/utils/storages/reactQueryPersistor";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 2, // 2 hours
    },
  },
});

const RootLayout = () => {
  const isLoggedIn = true;
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: reactQueryPersistor }}
    >
      <Stack>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </PersistQueryClientProvider>
  );
};

export default RootLayout;
