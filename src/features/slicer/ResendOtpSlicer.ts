/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";



export const ResendOtpApi = createAsyncThunk(
  "aarma/resendotp",
  async (email: any) => {
      console.log(email)
    try {
      const response = await axios.post(`${baseUrl}users/resend-otp`,{email:email});
      toast.success(response?.data?.message || "OTP send successfully"); // Refresh categories list after added
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
          console.log("Error 400: Bad Request", err.response.data);
        } 
        else if (err.response.status === 404) {
          toast.error(err.response.data.message ?? 'No Api Found');
          console.log("No Api Found ", err.response.data);
        }
        else {
          toast.error(`Error: ${err.response.data.message}`);
        }
      } else if (err.request) {
        toast.error("No response received from the server.");
        console.log(err.request);
      } else {
        toast.error("An error occurred while processing your request.");
        console.log("Error", err.message);
      }
      return err.message;
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  ReqAccData: "",
};

const ResendOtpSlicer = createSlice({
  name: "resendotp",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(ResendOtpApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ResendOtpApi.fulfilled, (state, action) => {
      state.isLoading = false;

      console.log("fulfilled", action.payload);
    });
    builder.addCase(ResendOtpApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default ResendOtpSlicer.reducer;
