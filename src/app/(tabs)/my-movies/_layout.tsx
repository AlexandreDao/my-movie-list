import { useTheme } from "@/hooks";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

function MyMoviesLayout() {
  const { colors } = useTheme();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
        },
        tabBarIndicatorStyle: { backgroundColor: colors.buttonPrimary },
        tabBarLabelStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.idleTextTabBar,
      }}
    >
      <MaterialTopTabs.Screen name="index" options={{ title: "Favorites" }} />
      <MaterialTopTabs.Screen
        name="watchlist"
        options={{ title: "Watchlist" }}
      />
    </MaterialTopTabs>
  );
}

export default MyMoviesLayout;
