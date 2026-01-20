import { CustomTabButton } from "@/components/CustomTabButton";
import { useAppDispatch, useSignOut } from "@/hooks";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isAxiosError } from "axios";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";

const LogoutButton = () => {
  const { mutate } = useSignOut();
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={{ padding: 12 }}
      onPress={() => {
        mutate(undefined, {
          onSuccess: () => {
            dispatch(signOut());
            SecureStore.deleteItemAsync("sessionId");
          },
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
      <MaterialCommunityIcons name="exit-to-app" size={24} color="black" />
    </TouchableOpacity>
  );
};

//TODO: put back logout button + adjust icon size same as tab icon
// use ref for login to switch field
// blur under tab and animate tab switching
// add pressed effect on tab button
// adjust tab bar space from bottom
export const TabLayout = () => {
  return (
    <Tabs asChild>
      <TabSlot />
      <TabList style={styles.tabList}>
        <TabTrigger name="index" href="/" asChild>
          <CustomTabButton icon="home">Home</CustomTabButton>
        </TabTrigger>
        <TabTrigger name="my-movie" href="/my-movie" asChild>
          <CustomTabButton icon="local-movies">My movie</CustomTabButton>
        </TabTrigger>
      </TabList>
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.1), 'black"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0.5 }}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 24 + 10 + 18 + 4 + 8 + 6,
        }}
      ></LinearGradient>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="systemMaterialDark"
        intensity={100}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 24 + 10 + 18 + 4 + 8 + 6,
        }}
      ></BlurView>
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 24,
    borderRadius: 24,
    padding: 2,
    paddingLeft: 10,
    backgroundColor: "black",
    zIndex: 10,
  },
});

export default TabLayout;
