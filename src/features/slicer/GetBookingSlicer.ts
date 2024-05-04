/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "./Slicer";

export const GetBookingApi: any = createAsyncThunk(
  "aarma/GetBooking",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(
        `${baseUrl}bookings/event-manager-bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      console.log(response?.data?.data);
      return response.data.data;
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error(error.response.data.message);
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
  BookingsData: [],
};

const GetBookingSlicer = createSlice({
  name: "GetBooking",
  initialState,
  reducers: {
    // Reducer logic here
  },
  extraReducers: (builder) => {
    builder.addCase(GetBookingApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(GetBookingApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.BookingsData = action.payload;
      console.log(action.payload)
    });
    builder.addCase(GetBookingApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default GetBookingSlicer.reducer;
