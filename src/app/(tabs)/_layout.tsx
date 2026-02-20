import CustomBottomTabBar from "@/components/CustomBottomTabBar";
import CustomHeader from "@/components/CustomHeader";
import CustomTabBackground from "@/components/CustomTabBackground";
import { CustomTabButton } from "@/components/CustomTabButton";
import CustomTabIndicator from "@/components/CustomTabIndicator";
import { useAppDispatch, useAppSelector, useGetAccountDetails } from "@/hooks";
import { NavigationProvider } from "@/utils/contexts/NavigationContext";
import { setUserId } from "@/utils/store/reducers/userReducer";
import { isAxiosError } from "axios";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { FC, useEffect } from "react";
import { Alert } from "react-native";

export const TabLayout: FC = () => {
  const dispatch = useAppDispatch();
  const accountId = useAppSelector((state) => state.user.accountId);
  const {
    data: accountDetails,
    error,
    isError,
  } = useGetAccountDetails(accountId);

  useEffect(() => {
    if (accountId === "" && accountDetails && !isError) {
      dispatch(setUserId({ accountId: accountDetails.id.toString() }));
    }
    if (isError) {
      if (isAxiosError(error)) {
        Alert.alert(
          "Account details fetch error",
          error.response?.data?.status_message || "Unknown error",
        );
      } else {
        Alert.alert("Account details fetch error");
      }
    }
  }, [accountDetails, accountId, isError, error, dispatch]);

  return (
    <NavigationProvider>
      <Tabs>
        <CustomHeader />
        <TabSlot />
        <TabList asChild>
          <CustomBottomTabBar>
            <CustomTabIndicator />
            <TabTrigger name="index" href="/" asChild>
              <CustomTabButton icon="home">Home</CustomTabButton>
            </TabTrigger>
            <TabTrigger name="my-movies" href="/(tabs)/my-movies" asChild>
              <CustomTabButton icon="local-movies">My movie</CustomTabButton>
            </TabTrigger>
          </CustomBottomTabBar>
        </TabList>
        <CustomTabBackground />
      </Tabs>
    </NavigationProvider>
  );
};

export default TabLayout;
