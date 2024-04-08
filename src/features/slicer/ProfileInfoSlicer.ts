// event-managers/complete-profile-info
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";

export const ProfileInfoApi: any = createAsyncThunk(
  "aarma/ProfileinfoApi",
  async (infoData: any , {dispatch}) => {
    console.log(infoData);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}event-managers/complete-profile-info`, infoData, {
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
  profileInfoModal:false
  //   UserData: "",
};
const ProfileInfoSlicer = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {
    setProfileInfoModal : (state , action)=>{
      state.profileInfoModal = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(ProfileInfoApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(ProfileInfoApi.fulfilled, (state, action) => {
      state.isLoading = false;
        console.log(action.payloed , 'submited')
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(ProfileInfoApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {setProfileInfoModal} = ProfileInfoSlicer.actions;
export default ProfileInfoSlicer.reducer;
