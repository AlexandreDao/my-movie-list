import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

type NavigationStateType = {
  bottomTabBarTotalHeight: number;
  bottomTabBarHeight: number;
  headerHeight: number;
  title: string;
  focusPosition: [number, number];
};

const NAVIGAITION_STATE_DEFAULT_VALUE: NavigationStateType = {
  bottomTabBarTotalHeight: 0,
  bottomTabBarHeight: 0,
  headerHeight: 72,
  title: "",
  focusPosition: [0, 0],
};

type NavigationContextType = {
  navigationState: NavigationStateType;
  setNavigationState: Dispatch<SetStateAction<NavigationStateType>>;
};

const NAVIGAITION_CONTEXT_DEFAULT_VALUE: NavigationContextType = {
  navigationState: NAVIGAITION_STATE_DEFAULT_VALUE,
  setNavigationState: () => {},
};

const NavigationContext = createContext<NavigationContextType>(
  NAVIGAITION_CONTEXT_DEFAULT_VALUE,
);

const NavigationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [navigationState, setNavigationState] = useState<NavigationStateType>(
    NAVIGAITION_STATE_DEFAULT_VALUE,
  );
  return (
    <NavigationContext.Provider value={{ navigationState, setNavigationState }}>
      {children}
    </NavigationContext.Provider>
  );
};

NavigationContext.displayName = "CustomNavigationContext";

export { NavigationContext, NavigationProvider };
