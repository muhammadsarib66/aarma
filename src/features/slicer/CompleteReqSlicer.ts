/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { BookingInfoApi } from "./BookingInfoSlicer";

export const CompleteReqApi: any = createAsyncThunk(
  "aarma/CompleteReq",
  async (Obj: any, { dispatch }) => {
    const {bookingId} = Obj
    console.log(Obj)
    const token = localStorage.getItem("token");
    return await axios
      .post(`${baseUrl}bookings/send-completion-request`, Obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
            toast.success(response?.data?.message);
            dispatch(BookingInfoApi(bookingId));
            console.log(response.data);
            return response.data;
          } else {
            toast.error("not send reuquest");
            return Promise.reject("Failed to send request");
          }
      
      })
      .catch((err) => {
        toast.error(err.response.data.message)
    //   toast.error("");

        // toast.error(err.data.message);
        // console.log(err.data);
        return err.response.data.message;
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
};
const CompleteReqSlicer = createSlice({
  name: "CompleteReq",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder.addCase(CompleteReqApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CompleteReqApi.fulfilled, (state,action) => {
        
      state.isLoading = false;
        console.log('i am complete',action.payload)
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(CompleteReqApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {} = AddPortfolioSlicer.actions;
export default CompleteReqSlicer.reducer;
