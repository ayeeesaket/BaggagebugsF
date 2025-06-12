import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import facilityIdReducer from "./features/facilityIdSlice";
import partnerReducer from "./features/partnerSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    facilityId: facilityIdReducer,
    partner: partnerReducer,
  },
});
