import CustomTabBackground from "@/components/CustomTabBackground";
import { CustomTabButton } from "@/components/CustomTabButton";
import { useAppDispatch, useHeaderTitle, useSignOut } from "@/hooks";
import {
  NavigationContext,
  NavigationProvider,
} from "@/utils/contexts/NavigationContext";
import SecureStore from "@/utils/storages/SecureStorage";
import { signOut } from "@/utils/store/reducers/userReducer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { isAxiosError } from "axios";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import {
  FC,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

const MeasureCustomBottomTab: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<View>(null);
  const { setNavigationState } = useContext(NavigationContext);

  useLayoutEffect(() => {
    ref.current?.measure((x, y, width, height, pageX, pageY) => {
      setNavigationState((prev) => ({
        ...prev,
        bottomTabBarHeight: height + 32,
      }));
    });
  }, []);

  return (
    <View ref={ref} style={styles.tabList}>
      {children}
    </View>
  );
};

const CustomHeader = (props) => {
  // TODO: get header title
  const title = useHeaderTitle();
  return (
    <View style={{ height: 52 }}>
      <Text>{title}</Text>
    </View>
  );
};

//TODO: put back logout button + adjust icon size same as tab icon
// animate tab switching
// add pressed effect on tab button
export const TabLayout: FC = () => {
  return (
    <NavigationProvider>
      <Tabs>
        <CustomHeader />
        <TabSlot />
        <TabList asChild>
          <MeasureCustomBottomTab>
            <TabTrigger name="index" href="/" asChild>
              <CustomTabButton icon="home">Home</CustomTabButton>
            </TabTrigger>
            <TabTrigger name="my-movie" href="/my-movie" asChild>
              <CustomTabButton icon="local-movies">My movie</CustomTabButton>
            </TabTrigger>
          </MeasureCustomBottomTab>
        </TabList>
        <CustomTabBackground />
      </Tabs>
    </NavigationProvider>
  );
};

const styles = StyleSheet.create({
  tabList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 32,
    borderRadius: 24,
    padding: 2,
    paddingLeft: 10,
    backgroundColor: "black",
    zIndex: 10,
    flexDirection: "row",
  },
});

export default TabLayout;
