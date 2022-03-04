import { createSlice } from "@reduxjs/toolkit";
// app slice for loading state and user authentication flag
const initialState = {
  isLoading: false,
  isAuthenticated: false, //setIsAuth
  hasError: "",
  height: "",
  searchTerm: "",
  filter: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appLoading: (state) => {
      state.isLoading = true;
    },
    getArrayElements: (state, action) => {
      state.filter = action.payload;
    },
    getDivHeight: (state, action) => {
      state.height = action.payload + 410;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    loginComplete: (state) => {
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.hasError = "";
    },
  },
});
export const {
  loginComplete,
  setSearchTerm,
  getDivHeight,
  logoutUser,
  appLoading,
  getArrayElements,
} = appSlice.actions;

export default appSlice.reducer;
