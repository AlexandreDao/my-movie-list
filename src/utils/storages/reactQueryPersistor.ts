import AsyncStorage from "@react-native-async-storage/async-storage";
import { Persister } from "@tanstack/react-query-persist-client";

const REACT_QUERY_KEY = "REACT_QUERY_CACHE";

export const reactQueryPersistor: Persister = {
  persistClient: (client) => {
    return AsyncStorage.setItem(REACT_QUERY_KEY, JSON.stringify(client));
  },
  restoreClient: async () => {
    const cache = (await AsyncStorage.getItem(REACT_QUERY_KEY)) ?? "";

    return cache ? JSON.parse(cache) : undefined;
  },
  removeClient: () => {
    return AsyncStorage.removeItem(REACT_QUERY_KEY);
  },
};
