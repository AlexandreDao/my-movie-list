import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export type Position = {
  x: number;
  y: number;
};

type NavigationStateType = {
  bottomTabBarTotalHeight: number;
  bottomTabBarHeight: number;
  headerHeight: number;
  title: string;
  focusPosition: Position;
};

const NAVIGATION_STATE_DEFAULT_VALUE: NavigationStateType = {
  bottomTabBarTotalHeight: 76,
  bottomTabBarHeight: 44,
  headerHeight: 72,
  title: "Home",
  focusPosition: { x: 2, y: 2 },
};

type NavigationContextType = {
  navigationState: NavigationStateType;
  setNavigationState: Dispatch<SetStateAction<NavigationStateType>>;
};

const NAVIGATION_CONTEXT_DEFAULT_VALUE: NavigationContextType = {
  navigationState: NAVIGATION_STATE_DEFAULT_VALUE,
  setNavigationState: () => {},
};

const NavigationContext = createContext<NavigationContextType>(
  NAVIGATION_CONTEXT_DEFAULT_VALUE,
);

const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [navigationState, setNavigationState] = useState<NavigationStateType>(
    NAVIGATION_STATE_DEFAULT_VALUE,
  );

  return (
    <NavigationContext.Provider value={{ navigationState, setNavigationState }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationContext.displayName = "CustomNavigationContext";

export { NavigationContext, NavigationProvider };
