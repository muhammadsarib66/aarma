/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const LoginAccApi: any = createAsyncThunk(
  "aarma/loginacc",
  async (loginCredential: any, ) => {
    console.log(loginCredential, "===> ogin")
    try {
      const response = await axios.post(`${baseUrl}users/eventmanager-login`, loginCredential);
      
      if (response.status === 200) {
        toast.success("Login Successful");       
        console.log(response.data) 
        window.location.reload();
        return response.data;
      } else {
        toast.error("User not found");
        return Promise.reject("User not found");
      }
    } catch (error) {
      console.log(error)
      toast.error("An error occurred while logging in");
      return Promise.reject(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  UserData: "",
};
const LoginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(LoginAccApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAccApi.fulfilled, (state, action) => {
      state.isLoading = false;

      const { data, token } = action.payload;
      state.UserData = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
    });
    builder.addCase(LoginAccApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default LoginSlicer.reducer;
