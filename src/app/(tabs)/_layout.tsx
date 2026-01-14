import { Tabs } from "expo-router";

export const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="my-movie" options={{ title: "My Movie" }} />
    </Tabs>
  );
};

export default TabLayout;
