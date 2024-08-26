/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./Slicer";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginAccApi } from "./LoginSlicer";

export const VerifyOtpApi = createAsyncThunk("aarma/Otp", async (otpData: any, { dispatch }) => {
  try {
    const response = await axios.post(`${baseUrl}users/verify-otp`, otpData);

    if (response.status === 200 && response.data?.success) {
      const userCred = localStorage.getItem('authUser');
      if (userCred) {
        const parsedUserCred = JSON.parse(userCred);
        dispatch(LoginAccApi(parsedUserCred));
      }
      toast.success("User registered successfully");
      return response.data;
    } else {
      // Handle unexpected status codes that are not explicitly covered
      toast.error("An unexpected error occurred. Please try again.");
      return Promise.reject(new Error("Unexpected response status."));
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      toast.error("Invalid OTP. Please try again.");
    } else {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    }
    console.error("Error:", error);
    return Promise.reject(error);
  }
});
const initialState = {
    isError : false , 
    isLoading : false ,
}

export const VerifyOtpSlicer = createSlice({
    name: "verifyOtp",
    initialState, 
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(VerifyOtpApi.pending , (state)=>{
            state.isLoading = true;
        });
        builder.addCase(VerifyOtpApi.fulfilled , (state , action)=>{
            state.isLoading = false;
            console.log(action.payload ,'verifyOtp')
        });
        builder.addCase(VerifyOtpApi.rejected , (state)=>{
            state.isLoading = false;
            state.isError = true;
        });
    }
})

export default VerifyOtpSlicer.reducer