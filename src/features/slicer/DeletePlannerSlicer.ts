/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config, socket, token } from "./Slicer";
import { BookingInfoApi } from "./BookingInfoSlicer";


export const DeletePlannerApi: any = createAsyncThunk(
  "aarma/DeletePlanner",
  async (Obj :any, { rejectWithValue ,dispatch  }) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.post(
        `${baseUrl}bookings/delete-planner-point`,
        { "plannerPointId": Obj?.id },
        config
      );
      toast.success("Planner point deleted successfully");
      socket.emit("booking-update-by-manager",{bookingId:Obj?.BookingID, message:" plan Deleted." } )
      
      dispatch(BookingInfoApi(Obj?.BookingID));
      return response.data.data;
    } catch (error: any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error("Failed to delete planner point");
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

const DeletePlannerSlicer = createSlice({
  name: "DeletePlanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(DeletePlannerApi.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(DeletePlannerApi.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(DeletePlannerApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {  } = BookingInfoSlicer.actions;
export default DeletePlannerSlicer.reducer;
