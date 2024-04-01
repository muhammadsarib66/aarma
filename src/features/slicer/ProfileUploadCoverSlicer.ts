import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const ProfileUploadCoverApi: any = createAsyncThunk(
  "aarma/ProfileUploadCover",
  async (upCover: any) => {
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
const ProfileUploadCoverSlicer = createSlice({
  name: "ProfileUploadCover",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
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

// export const {setReqAccData} = LoginSlicer.actions;
export default ProfileUploadCoverSlicer.reducer;
