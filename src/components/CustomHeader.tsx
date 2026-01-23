import { useAppDispatch, useHeaderTitle, useSignOut } from "@/hooks";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LogoutButton = () => {
  const { mutate } = useSignOut();
  const dispatch = useAppDispatch();

  return (
    <Pressable
      hitSlop={12}
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
      }}
    >
      <MaterialCommunityIcons name="exit-to-app" size={18} color="white" />
    </Pressable>
  );
};

const CustomHeader = () => {
  const title = useHeaderTitle();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>{title}</Text>
      <LogoutButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});

export default CustomHeader;
