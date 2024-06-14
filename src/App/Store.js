import { configureStore } from "@reduxjs/toolkit";
import UserDetailSlice from "../Features/UserDetailSlice";

export const Store = configureStore({
  reducer: {
    app: UserDetailSlice,
  },
});
