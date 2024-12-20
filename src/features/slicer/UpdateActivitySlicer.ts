/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config, socket } from "./Slicer";
import { toast } from "react-toastify";
import { BookingInfoApi } from "./BookingInfoSlicer";

export const updateActivityApi: any = createAsyncThunk(
    "aarma/updateActivity",
    async (Activity: any, { dispatch }) => {
        const {formData , bookingId} = Activity
        // const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
        
    // const {bookingId} = Planner
    return await axios
      .post(`${baseUrl}bookings/add-activity`, formData, config)
      .then((resp) => {
        toast.success(resp?.data?.message);
        console.log(resp?.data)
        dispatch(BookingInfoApi(bookingId));
        socket.emit("booking-update-by-manager",{bookingId:bookingId, message:" activity Updated." } )

        return resp.data;
      })
      .catch((err) => {
          console.log(err.data);
        toast.error(err.data.message);
        return err.message;
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};
const UpdateActivitySlicer = createSlice({
  name: "updateActivity",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(updateActivityApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateActivityApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateActivityApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default UpdateActivitySlicer.reducer;
