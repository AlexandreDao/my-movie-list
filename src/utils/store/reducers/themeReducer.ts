import { SetThemePayload } from "@/utils/types/storePayloadTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance, Platform } from "react-native";

const systemColorScheme = Appearance.getColorScheme();

const palette = {
  black: {
    "50": "#f6f6f6",
    "100": "#e7e7e7",
    "200": "#d1d1d1",
    "300": "#b0b0b0",
    "400": "#888888",
    "500": "#6d6d6d",
    "600": "#5d5d5d",
    "700": "#4f4f4f",
    "800": "#30343b",
    "900": "#282828",
    "950": "#000000",
  },
  white: {
    "50": "#ffffff",
    "100": "#efefef",
    "200": "#dcdcdc",
    "300": "#bdbdbd",
    "400": "#989898",
    "500": "#7c7c7c",
    "600": "#656565",
    "700": "#525252",
    "800": "#464646",
    "900": "#3d3d3d",
    "950": "#292929",
  },
  blue: {
    "50": "#eff4ff",
    "100": "#dbe6fe",
    "200": "#bfd3fe",
    "300": "#93b4fd",
    "400": "#6090fa",
    "500": "#3b76f6",
    "600": "#2563eb",
    "700": "#1d58d8",
    "800": "#1e4baf",
    "900": "#1e408a",
    "950": "#172a54",
  },
  violet: {
    "50": "#fff4ff",
    "100": "#fde8ff",
    "200": "#fbd0fe",
    "300": "#fbabfc",
    "400": "#f979f8",
    "500": "#ef46ee",
    "600": "#d326ce",
    "700": "#af1ca8",
    "800": "#9c1b94",
    "900": "#751a6d",
    "950": "#4e0448",
  },
  red: {
    "50": "#fff0f0",
    "100": "#ffdddd",
    "200": "#ffc0c0",
    "300": "#ff9494",
    "400": "#ff5757",
    "500": "#ff2323",
    "600": "#ff0000",
    "700": "#d70000",
    "800": "#b10303",
    "900": "#920a0a",
    "950": "#500000",
  },
  googleMapBlueLight: "#4285F4",
  googleMapBlueDark: "#0c53ff",
};

const lightTheme = {
  backgroundPrimary: palette.black["900"],
  backgroundSecondary: palette.black["950"],
  textPrimary: palette.white["100"],
  mapMarker: palette.googleMapBlueLight,
  mapButton: palette.black["800"],
  buttonPrimary: palette.blue["500"],
  buttonPrimaryText: palette.white["50"],
  buttonPrimaryHighlight: palette.blue["300"],
  buttonPrimaryDisabled: palette.black["200"],
  buttonSecondary: palette.black["300"],
  buttonSecondaryText: palette.white["50"],
  buttonTertiary: palette.white["50"],
  buttonTertiaryText: palette.black["950"],
  buttonTertiaryHighlight: palette.white["500"],
  tabBar: palette.black["950"],
  tabBarGradient: palette.black["700"],
  focusedTabBar: palette.black["500"],
  pressedTabBar: palette.black["50"],
  loader: palette.white["50"],
  movieMarker: palette.red["700"],
  invariantWhite: palette.white["50"],
  grade: palette.violet["900"],
  hyperlink: palette.blue["400"],
  inputBackground: palette.black["950"],
  inputBorder: palette.black["950"],
};

type Theme = typeof lightTheme;

const darkTheme: Theme = {
  backgroundPrimary: palette.black["900"],
  backgroundSecondary: palette.black["950"],
  textPrimary: palette.white["100"],
  mapMarker: palette.googleMapBlueDark,
  mapButton: palette.black["800"],
  buttonPrimary: palette.blue["500"],
  buttonPrimaryText: palette.white["50"],
  buttonPrimaryHighlight: palette.blue["400"],
  buttonPrimaryDisabled: palette.black["200"],
  buttonSecondary: palette.white["50"],
  buttonSecondaryText: palette.black["950"],
  buttonTertiary: palette.white["50"],
  buttonTertiaryHighlight: palette.white["500"],
  buttonTertiaryText: palette.black["950"],
  tabBar: palette.black["950"],
  tabBarGradient: palette.black["700"],
  focusedTabBar: palette.white["700"],
  pressedTabBar: palette.white["300"],
  loader: palette.white["50"],
  movieMarker: palette.red["700"],
  invariantWhite: palette.white["50"],
  grade: palette.violet["900"],
  hyperlink: palette.blue["400"],
  inputBackground: palette.black["900"],
  inputBorder: palette.black["950"],
};

type ThemeState = {
  isDarkMode: boolean;
  colors: Theme;
};

const INITIAL_STATE: ThemeState = {
  isDarkMode: systemColorScheme === "dark" ? true : false,
  colors: systemColorScheme === "dark" ? darkTheme : lightTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: INITIAL_STATE,
  reducers: {
    setTheme: (state, action: PayloadAction<SetThemePayload>) => {
      const colorScheme = state.isDarkMode ? "dark" : "light";

      state.isDarkMode = action.payload.isDarkMode;
      state.colors = action.payload.isDarkMode ? darkTheme : lightTheme;
      if (Platform.OS === "web") {
        document.documentElement.style.colorScheme = colorScheme;
      } else {
        Appearance.setColorScheme(colorScheme);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
