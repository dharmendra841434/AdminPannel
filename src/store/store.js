import { configureStore } from "@reduxjs/toolkit";
import callReducer from "../features/callSlice";
import appReducer from "../features/appSlice";
export const store = configureStore({
  reducer: {
    calls: callReducer,
    app: appReducer,
  },
});
