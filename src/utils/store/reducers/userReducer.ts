import { GetIdPayload, SignInPayload } from "@/utils/types/storePayloadTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
  accountId: string;
};

const INITIAL_STATE: UserState = {
  username: "",
  accountId: "",
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
    getUserId: (state, action: PayloadAction<GetIdPayload>) => {
      state.accountId = action.payload.accountId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, signOut, getUserId } = userSlice.actions;

export default userSlice.reducer;
