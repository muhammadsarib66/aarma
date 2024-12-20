/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config, token } from "./Slicer";
import { GetBookingApi } from "./GetBookingSlicer";

export const CancelBookingApi: any = createAsyncThunk(
  "aarma/Cancelbooking",
  async (Id: any, { rejectWithValue, dispatch }) => {
    console.log(Id)
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post(
        `${baseUrl}bookings/cancel-booking`,
        { bookingId: Id },
        config
      );
      toast.success( response.data?.message ??  "Booking deleted successfully");

      dispatch(GetBookingApi());
      return response.data.data;
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error("Failed to delete Booking");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An error occurred while processing your request");
      }
      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};

const CancelBookingSlicer = createSlice({
  name: "Cancelbooking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CancelBookingApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(CancelBookingApi.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(CancelBookingApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default CancelBookingSlicer.reducer;
