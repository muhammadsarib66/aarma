import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const ProfileUploadProfileApi: any = createAsyncThunk(
  "aarma/ProfileUploadProfileApi",
  async (infoData: any) => {
    console.log(infoData);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}event-managers/upload-profile`, infoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp?.data?.message);
        console.log(resp.data);

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
  //   UserData: "",
};
const ProfileInfoSlicer = createSlice({
  name: "AddInfo",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileUploadProfileApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileUploadProfileApi.fulfilled, (state, action) => {
      state.isLoading = false;

      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(ProfileUploadProfileApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default ProfileInfoSlicer.reducer;
