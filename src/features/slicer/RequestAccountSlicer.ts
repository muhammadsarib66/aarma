import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, setIsModalOpen } from "./Slicer";
import { toast } from "react-toastify";

interface UserData {
  email: string;
  password: string;
  // Add other properties if needed
}

export const createAccountApi = createAsyncThunk(
  "aarma/createAccount",
  async (userData :UserData, { dispatch }) => {
    console.log(userData);
    try {
      const response = await axios.post(
        `${baseUrl}users/request-account`,
        userData
      );

      if (response.status === 200) {
        const { email, password } = userData as unknown as { email: string, password: string };
        localStorage.setItem("authUser", JSON.stringify({ email, password }));
        dispatch(setIsModalOpen());
        toast.success(response.data.message);
        console.log(response.data);
        return response.data;
      } else {
        toast.error("User not found");
        return Promise.reject("User not found");
      }
    } catch (error) {
      toast.error(error.message);
      // toast.error("Ensure data is not in prev account");
      return Promise.reject(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  ReqAccData: "",
};

const RequestAccountSlicer = createSlice({
  name: "reqaccount",
  initialState,
  reducers: {
    setReqAccData: (state, action) => {
      state.ReqAccData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAccountApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createAccountApi.fulfilled, (state, action) => {
      state.isLoading = false;

      console.log("fulfilled", action.payload);
    });
    builder.addCase(createAccountApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { setReqAccData } = RequestAccountSlicer.actions;
export default RequestAccountSlicer.reducer;
