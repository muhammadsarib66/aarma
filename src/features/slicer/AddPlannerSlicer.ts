/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, socket, token } from "./Slicer";
import { toast } from "react-toastify";
import { BookingInfoApi } from "./BookingInfoSlicer";

export const AddPlannerApi: any = createAsyncThunk(
  "aarma/AddPlanner",
  async (Planner: any, { dispatch }) => {
    const {bookingId} = Planner
    return await axios
      .post(`${baseUrl}bookings/add-planner-points`, Planner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp?.data?.message);
  socket.emit("booking-update-by-manager",{bookingId:Planner?.bookingId, message:" plan Created." } )

        dispatch(BookingInfoApi(bookingId));

        return resp.data;
      })
      .catch((err) => {
        toast.error(err.data.message);
        console.log(err.data);
        return err.message;
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};
const AddPlannerSlicer = createSlice({
  name: "AddPlanner",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(AddPlannerApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddPlannerApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddPlannerApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default AddPlannerSlicer.reducer;
