import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = !state.isLoggedIn; // Toggle login state
      console.log("Login state changed (from redux):", state.isLoggedIn);
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
