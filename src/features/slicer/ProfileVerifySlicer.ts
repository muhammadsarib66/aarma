/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";

export const ProfileVerificationApi: any = createAsyncThunk(
  "aarma/ProfileVerificationApi",
  async (infoData: any, { dispatch }) => {
    console.log(infoData);

    return await axios
      .post(`${baseUrl}event-managers/submit-profile`, infoData, config)
      .then((resp) => {
        dispatch(GetMyProfile())
        toast.success(resp?.data?.message);
        console.log(resp.data);

        return resp.data;
      })
      .catch((err) => {
        toast.error("Error while uploading Docs");
        console.log(err.data);
        return err.message;
      });
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  docModal: false,
  //   UserData: "",
};
const ProfileVerifySlicer = createSlice({
  name: "ProfileVerificationApi",
  initialState,
  reducers: {
    setVerifyModal  : (state,action)=>{
        state.docModal = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileVerificationApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileVerificationApi.fulfilled, (state) => {
      state.isLoading = false;

    });
    builder.addCase(ProfileVerificationApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {setVerifyModal} = ProfileVerifySlicer.actions;
export default ProfileVerifySlicer.reducer;
