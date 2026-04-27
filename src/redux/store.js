import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";
import franchiseReducer from "./franchiseSlice";
import userReducer from "./userSlice";
import roleReducer from "./roleSlice";
import permissionReducer from "./permissionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    franchise: franchiseReducer,
    users: userReducer,
    roles: roleReducer,
    permissions: permissionReducer,
  },
});
