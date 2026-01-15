import { SignInPayload } from "@/utils/types/storePayloadTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
};

const INITIAL_STATE: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    signIn: (state, action: PayloadAction<SignInPayload>) => {
      state.username = action.payload.username;
    },
    signOut: (state) => {
      state.username = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
