import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
