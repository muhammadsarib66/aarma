/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";


export const ProfileUploadProfileApi: any = createAsyncThunk(
  "aarma/ProfileUploadProfileApi",
  async (profile: any , {dispatch}) => {
    console.log(profile);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}event-managers/upload-profile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp?.data?.message);
        dispatch(GetMyProfile())
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
  profilemodal : false,  
  //   UserData: "",
};
const ProfileUploadSlicer = createSlice({
  name: "uploadProfile",
  initialState,
  reducers: {
    setProfileModal  : (state,action)=>{
        state.profilemodal = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileUploadProfileApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileUploadProfileApi.fulfilled, (state) => {
      state.isLoading = false;

      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(ProfileUploadProfileApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {setProfileModal} = ProfileUploadSlicer.actions;
export default ProfileUploadSlicer.reducer;
