import { configureStore } from "@reduxjs/toolkit";
import callReducer from "../features/callSlice";
import appReducer from "../features/appSlice";
import filterSlice from "../features/filterSlice";
export const store = configureStore({
  reducer: {
    calls: callReducer,
    app: appReducer,
    Filter: filterSlice,
  },
});
