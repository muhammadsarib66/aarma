import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const ProfileVerificationApi: any = createAsyncThunk(
  "aarma/ProfileVerificationApi",
  async (infoData: any, { dispatch }) => {
    console.log(infoData);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}event-managers/submit-profile`, infoData, {
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
const ProfileVerificationSlicer = createSlice({
  name: "ProfileVerificationApi",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileVerificationApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileVerificationApi.fulfilled, (state) => {
      state.isLoading = false;

      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(ProfileVerificationApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default ProfileVerificationSlicer.reducer;
