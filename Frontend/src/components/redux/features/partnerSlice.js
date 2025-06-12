import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPartner: false,
};

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    setIsPartner: (state, action) => {
      state.isPartner = !state.isPartner;
      console.log("partner state changed (from redux):", state.isPartner);
    },
  },
});

export const { setIsPartner } = partnerSlice.actions;
export default partnerSlice.reducer;