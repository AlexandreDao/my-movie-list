import { useAppDispatch } from "@/hooks";
import useSignOut from "@/hooks/services/useSignOut";
import { signOut } from "@/utils/store/reducers/userReducer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isAxiosError } from "axios";
import { Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, TouchableOpacity } from "react-native";

const LogoutButton = () => {
  const { mutateAsync } = useSignOut();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={{ padding: 12 }}
      onPress={() => {
        mutateAsync()
          .then(() => {
            dispatch(signOut());
            SecureStore.deleteItemAsync("sessionId");
          })
          .catch((error) => {
            if (isAxiosError(error)) {
              Alert.alert(
                "Sign Out Error",
                error.response?.data?.status_message || "Unknown error",
              );
            } else {
              Alert.alert("Sign Out Error", "An unexpected error occurred");
            }
          });
      }}
    >
      <MaterialCommunityIcons name="exit-to-app" size={24} color="black" />
    </TouchableOpacity>
  );
};
export const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Home", headerRight: () => <LogoutButton /> }}
      />
      <Tabs.Screen name="my-movie" options={{ title: "My Movie" }} />
    </Tabs>
  );
};

export default TabLayout;
