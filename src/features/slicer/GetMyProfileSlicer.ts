/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, config, token } from "./Slicer";

export const GetMyProfile: any = createAsyncThunk(
  "aarma/GetMyProfile",
  async (_, { rejectWithValue }) => {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.get(`${baseUrl}event-managers/me`, config);
      
      // console.log(response?.data, "===>")
      return response.data;
    } catch (error : any) {
      // Handle the error
      if (error.response) {
        // Request was made and server responded with status code that falls out of the range of 2xx
        toast.error("error while fetching userProfile");
        // console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server");
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error("An error occurred while processing your request");
        console.log("Error", error.message);
      }

      // Use rejectWithValue to propagate the error to the rejected action
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  ProfileData: [],
  ProfileCompletnes : ""
};

const GetMyProfileSlicer = createSlice({
  name: "GetMyProfile",
  initialState,
  reducers: {
    // Reducer logic here
  },
  extraReducers: (builder) => {
    builder.addCase(GetMyProfile.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(GetMyProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const { completenessPercentage  , data} = action.payload;
      state.ProfileData = data;
      state.ProfileCompletnes = completenessPercentage
    });
    builder.addCase(GetMyProfile.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default GetMyProfileSlicer.reducer;
