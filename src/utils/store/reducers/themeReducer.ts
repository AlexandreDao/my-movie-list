import { SetThemePayload } from "@/utils/types/storePayloadTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

const systemColorScheme = Appearance.getColorScheme();

const palette = {
  white: "#FFFFFF",
  black: "#000000",
  lightBlack: "#282828",
  grey: "grey",
  lightGrey: "lightgrey",
  blue: "#2563eb",
  googleMapBlue: "#4285F4",
};

const lightTheme = {
  primaryBackgroundColor: palette.white,
  primaryTextColor: palette.black,
  mapMarkerColor: palette.googleMapBlue,
  actionButtonBackgroundColor: palette.blue,
  focusTabColor: palette.grey,
  pressInTabColor: palette.lightGrey,
};

type Theme = typeof lightTheme;

const darkTheme: Theme = {
  primaryBackgroundColor: palette.lightBlack,
  primaryTextColor: palette.white,
  mapMarkerColor: palette.googleMapBlue,
  actionButtonBackgroundColor: palette.blue,
  focusTabColor: palette.grey,
  pressInTabColor: palette.lightGrey,
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
      state.isDarkMode = action.payload.isDarkMode;
      state.colors = action.payload.isDarkMode ? darkTheme : lightTheme;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
