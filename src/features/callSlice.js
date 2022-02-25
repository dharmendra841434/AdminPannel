import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { callsAPI } from "../api/callsAPI";
// async thunk request to get calls list
export const callsDataRequest = createAsyncThunk(
  "calls/callsDataRequest",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const data = await callsAPI.getCallsList();
      dispatch(getList(data));
    } catch (error) {
      if (error.message) {
        return rejectWithValue({ hasError: error.message });
      }
    }
  }
);
export const callsDataWithParamsRequest = createAsyncThunk(
  "calls/callsDataRequest",
  async (details, { dispatch, rejectWithValue }) => {
    try {
      const data = await callsAPI.getCallsListWithParams(details);
      dispatch(getList(data));
    } catch (error) {
      if (error.message) {
        return rejectWithValue({ hasError: error.message });
      }
    }
  }
);
// async thunk request to get single call

export const singleCall = createAsyncThunk(
  "calls/singleCall",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { recordId, partnerId } = id;
      const data = await callsAPI.getSingleCall(recordId, partnerId);
      // console.log(encodeURIComponent(data));
      // const src = window.URL.createObjectURL(data);
      // console.log(`src`, src);
      // const blob = new Blob([data], { type: "audio/wav" });
      // const url = window.URL.createObjectURL(blob);
      // console.log(url);
      // const buffer = new ArrayBuffer(data);
      // console.log(buffer, "buffer");

      // const audioObj = new Audio(data);
      // console.log(audioObj);
      // console.log(typeof data, "dattt type");
      dispatch(streamResponse(data));
      // if (!data) {
      //   return;
      // }

      // fileToDataUri(data).then((dataUri) => {
      //   dispatch(streamResponse(dataUri));
      // });
    } catch (error) {
      if (error.message) {
        return rejectWithValue({ hasError: error.message });
      }
    }
  }
);

const initialState = {
  calls: [],
  hasError: "",
  message: "",
  currentPage: 1,
  postPerPage: 10,
  stream: "",
};

const callSlice = createSlice({
  name: "calls",
  initialState,
  reducers: {
    getList: (state, action) => {
      state.calls = action.payload;
    },
    showMessage: (state, action) => {
      state.message = action.payload;
    },
    streamResponse: (state, action) => {
      console.log(`action.payload`, action.payload);
      state.stream = action.payload;
    },
    setPostNumber: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getList, showMessage, streamResponse, setPostNumber } =
  callSlice.actions;
export default callSlice.reducer;
