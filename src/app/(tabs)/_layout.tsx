import CustomBottomTabBar from "@/components/CustomBottomTabBar";
import CustomHeader from "@/components/CustomHeader";
import CustomTabBackground from "@/components/CustomTabBackground";
import { CustomTabButton } from "@/components/CustomTabButton";
import CustomTabIndicator from "@/components/CustomTabIndicator";
import { useAppDispatch, useAppSelector, useGetAccountDetails } from "@/hooks";
import { NavigationProvider } from "@/utils/contexts/NavigationContext";
import { getUserId } from "@/utils/store/reducers/userReducer";
import { isAxiosError } from "axios";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { FC, useEffect } from "react";

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
      dispatch(getUserId({ accountId: accountDetails.id.toString() }));
    }
    if (isError) {
      console.log("Error happened while fetching Account Details");
      if (isAxiosError(error)) {
        console.log(error.response?.data?.status_message);
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
            <TabTrigger name="my-movie" href="/my-movie" asChild>
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
