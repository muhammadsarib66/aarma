import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const createAccountApi = createAsyncThunk(
    "aarma/createAccount",
    async (userData , { dispatch }) => {
        console.log(userData)
      return await axios
        .post(`${baseUrl}users/request-account`, userData)
        .then((resp) => {
            console.log(resp.status)
            // if(resp.status === 400){
            //     toast.error("email already exist")
            //     alert('email already exist')
            // }
            // else{
                toast.success(resp.data.message)
            // }
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
    ReqAccData : ''
  };
  
  const RequestAccountSlicer = createSlice({
    name: "reqaccount",
    initialState,
    reducers: {
        setReqAccData : (state,action)=>{
            state.ReqAccData = action.payload
        }
    },
    extraReducers: (builder) => {
      builder.addCase(createAccountApi.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(createAccountApi.fulfilled, (state,action) => {
          state.isLoading = false;
          console.log('fulfilled',action.payload)
      });
      builder.addCase(createAccountApi.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    },
  });
  
    export const {setReqAccData} = RequestAccountSlicer.actions;
  export default RequestAccountSlicer.reducer;
  