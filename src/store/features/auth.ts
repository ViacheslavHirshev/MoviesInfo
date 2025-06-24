import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  userToken: string | null;
  isLoggedIn: boolean;
}

const initialState: IAuthState = {
  userToken: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
