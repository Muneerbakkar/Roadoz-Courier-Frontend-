import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import franchiseReducer from "./franchiseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    franchise: franchiseReducer,
  },
});
