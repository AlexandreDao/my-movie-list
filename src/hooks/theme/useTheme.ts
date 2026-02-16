import { darkTheme, lightTheme } from "@/utils/constants/palette";
import { ThemeContext } from "@/utils/contexts/ThemeContext";
import { useContext, useMemo } from "react";

const useTheme = () => {
  const { colorScheme, setColorScheme } = useContext(ThemeContext);
  const returnValue = useMemo(
    () => ({
      setColorScheme,
      colorScheme,
      colors: colorScheme === "dark" ? darkTheme : lightTheme,
    }),
    [setColorScheme, colorScheme],
  );

  return returnValue;
};

export default useTheme;
