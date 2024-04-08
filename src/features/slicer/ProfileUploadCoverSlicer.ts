import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";

export const ProfileUploadCoverApi: any = createAsyncThunk(
  "aarma/ProfileUploadCover",
  async (upCover: any, {dispatch}) => {
    console.log(upCover);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}event-managers/upload-cover`, upCover, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    builder.addCase(ProfileUploadCoverApi.fulfilled, (state, action) => {
      state.isLoading = false;

      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(ProfileUploadCoverApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {setCoverModal} = ProfileUploadCoverSlicer.actions;
export default ProfileUploadCoverSlicer.reducer;
