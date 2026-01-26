import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ExpoSecureStore from "expo-secure-store";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const SecureStore = {
  getItemAsync: (key: string): Promise<string | null> => {
    return isWeb
      ? AsyncStorage.getItem(key)
      : ExpoSecureStore.getItemAsync(key);
  },
  setItemAsync: (key: string, value: string): Promise<void> => {
    return isWeb
      ? AsyncStorage.setItem(key, value)
      : ExpoSecureStore.setItemAsync(key, value);
  },
  deleteItemAsync: (key: string): Promise<void> => {
    return isWeb
      ? AsyncStorage.removeItem(key)
      : ExpoSecureStore.deleteItemAsync(key);
  },
};

export default SecureStore;
