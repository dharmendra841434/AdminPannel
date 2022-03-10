import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter: [],
  DefaultColumn: true,
  totalItems: 0,
  isOpen: false,
};

export const appSlice = createSlice({
  name: "Filter",
  initialState,
  reducers: {
    getArrayElements: (state, action) => {
      state.filter = action.payload;
    },
    setDefaultColumn: (state, action) => {
      state.DefaultColumn = action.payload;
    },
    CountItems: (state, action) => {
      state.totalItems = action.payload;
    },
    setisOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { getArrayElements, setDefaultColumn, CountItems, setisOpen } =
  appSlice.actions;

export default appSlice.reducer;
