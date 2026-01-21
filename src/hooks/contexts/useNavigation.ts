import { NavigationContext } from "@/utils/contexts/NavigationContext";
import { useContext } from "react";

export const useBottomTabBarHeight = () => {
  const { navigationState } = useContext(NavigationContext);

  if (navigationState.bottomTabBarHeight === undefined) {
    throw new Error(
      "Couldn't find the bottom tab bar height. Are you inside a screen in Bottom Tab Navigator?",
    );
  }

  return navigationState.bottomTabBarHeight;
};

export const useHeaderHeight = () => {
  const { navigationState } = useContext(NavigationContext);

  if (navigationState.headerHeight === undefined) {
    throw new Error(
      "Couldn't find the header height. Are you inside a screen in Bottom Tab Navigator?",
    );
  }

  return navigationState.headerHeight;
};

export const useHeaderTitle = () => {
  const { navigationState } = useContext(NavigationContext);

  if (navigationState.title === undefined) {
    throw new Error(
      "Couldn't find the header title. Are you inside a screen in Bottom Tab Navigator?",
    );
  }

  return navigationState.title;
};
