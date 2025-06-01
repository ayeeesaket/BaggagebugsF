import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import facilityIdReducer from "./features/facilityIdSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    facilityId: facilityIdReducer,
  },
});
