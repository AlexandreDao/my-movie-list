import { useAppDispatch, useHeaderTitle, useSignOut } from "@/hooks";
import { NavigationContext } from "@/utils/contexts/NavigationContext";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { FC, useContext, useRef } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LogoutButton: FC = () => {
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

const CustomHeader: FC = () => {
  const title = useHeaderTitle();
  const isInitialized = useRef(false);
  const { setNavigationState } = useContext(NavigationContext);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        if (!isInitialized.current) {
          setNavigationState((prev) => ({
            ...prev,
            headerHeight: height,
          }));
          isInitialized.current = true;
        }
      }}
    >
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
