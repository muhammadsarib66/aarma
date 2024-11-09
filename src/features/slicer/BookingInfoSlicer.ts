/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./Slicer";

export const BookingInfoApi: any = createAsyncThunk(
  "aarma/bookinInfo",
  async (id, { rejectWithValue }) => {
    // console.log(id);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`${baseUrl}bookings/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("myresponse", response?.data);
      
      return response.data;
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error("fetching booking info failed");
        console.log(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An error occurred while processing your request");
        console.log("Error", error.message);
      }

      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  BookingInfo: {},
  
};

const BookingInfoSlicer = createSlice({
  name: "BookingInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(BookingInfoApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(BookingInfoApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.BookingInfo = action.payload;
      
    });
    builder.addCase(BookingInfoApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {  } = BookingInfoSlicer.actions;
export default BookingInfoSlicer.reducer;
