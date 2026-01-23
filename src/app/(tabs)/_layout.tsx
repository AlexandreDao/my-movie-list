import CustomBottomTabBar from "@/components/CustomBottomTabBar";
import CustomHeader from "@/components/CustomHeader";
import CustomTabBackground from "@/components/CustomTabBackground";
import { CustomTabButton } from "@/components/CustomTabButton";
import CustomTabIndicator from "@/components/CustomTabIndicator";
import { NavigationProvider } from "@/utils/contexts/NavigationContext";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { FC } from "react";

//TODO:
// add pressed effect on tab button
export const TabLayout: FC = () => {
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
