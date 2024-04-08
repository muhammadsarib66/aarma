import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./Slicer";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginAccApi } from "./LoginSlicer";

export const VerifyOtpApi = createAsyncThunk("aarma/Otp" , async (otpData ,{dispatch})=>{
    
    console.log(otpData)
    return await axios
      .post(`${baseUrl}users/verify-otp`, otpData)
      .then((resp) => {
        
          const userCred = localStorage.getItem('authUser')
          const  parseUsercred = JSON.parse(userCred)
          console.log(parseUsercred)
          dispatch(LoginAccApi(parseUsercred))
          resp.status === 200 &&   toast.success("user Registered")
          console.log(resp.data)
        return resp.data;
      })
      .catch((err) => {
        toast.error(err.data.message)
          console.log(err)
        return err.message;
      });
})
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