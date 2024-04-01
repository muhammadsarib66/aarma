import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const LoginAccApi = createAsyncThunk(
    "aarma/loginacc",
    async (loginCredential , { dispatch }) => {
        console.log(loginCredential)
      return await axios
        .post(`${baseUrl}users/eventmanager-login`, loginCredential)
        .then((resp) => {
            toast.success("login Succesfull")
            console.log(resp.data)
          return resp.data;
        })
        .catch((err) => {
            toast.error(err.data.message)
            console.log(err.data)
          return err.message;
        });
    }
  );
  
  const initialState = {
    isLoading: false,
    isError: false,
    // ReqAccData : ''
  };
  
  const LoginSlicer = createSlice({
    name: "login",
    initialState,
    reducers: {
        // setReqAccData : (state,action)=>{
        //     state.ReqAccData = action.payload
        // }
    },
    extraReducers: (builder) => {
      builder.addCase(LoginAccApi.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(LoginAccApi.fulfilled, (state,action) => {
          state.isLoading = false;
          const {data , token} = action.payload
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(data))
            
          console.log('fulfilled',token)
      });
      builder.addCase(LoginAccApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    },
  });
  
    // export const {setReqAccData} = LoginSlicer.actions;
  export default LoginSlicer.reducer;
  