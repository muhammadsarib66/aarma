/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";

export const ProfileUploadCoverApi: any = createAsyncThunk(
  "aarma/ProfileUploadCover",
  async (upCover: any, {dispatch}) => {
    console.log(upCover);

    return await axios
      .post(`${baseUrl}event-managers/upload-cover`, upCover,config)
      .then((resp) => {
        toast.success(resp?.data?.message);
        console.log(resp.data);
        dispatch(GetMyProfile())
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
  coverModal :false
  //   UserData: "",
};
const ProfileUploadCoverSlicer = createSlice({
  name: "ProfileUploadCover",
  initialState,
  reducers: {
    setCoverModal : (state,action)=>{
        state.coverModal = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileUploadCoverApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileUploadCoverApi.fulfilled, (state) => {
      state.isLoading = false;

      // console.log(e.getItem("token"));
    });
    builder.addCase(ProfileUploadCoverApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {setCoverModal} = ProfileUploadCoverSlicer.actions;
export default ProfileUploadCoverSlicer.reducer;
