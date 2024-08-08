import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  user: any;
}

const initialState: AuthState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: any }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user; // Correctly setting the user here
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null; // Resetting the user correctly here
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
