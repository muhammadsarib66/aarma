/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config, socket, token } from "./Slicer";
import { BookingInfoApi } from "./BookingInfoSlicer";


export const DeleteActivityApi: any = createAsyncThunk(
  "aarma/DeleteActivity",
  async (Obj : any, { rejectWithValue ,dispatch  }) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post(
        `${baseUrl}bookings/delete-activity`,
        {  activityId: Obj?.id },
        config
      );
      toast.success("Activity point deleted successfully");
      dispatch(BookingInfoApi(Obj?.BookingID));
  socket.emit("booking-update-by-manager",{bookingId:Obj?.BookingID, message:" activity Deleted." } )

      console.log(response)
      return response.data.data;
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error("Failed to delete Activity point");
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

const DeleteActivitySlicer = createSlice({
  name: "DeleteActivity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeleteActivityApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(DeleteActivityApi.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(DeleteActivityApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {  } = BookingInfoSlicer.actions;
export default DeleteActivitySlicer.reducer;
