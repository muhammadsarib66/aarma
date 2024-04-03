/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";
import { GetPortfolioAPi } from "./GetPorfolioSlicer";

export const AddPortfolioApi: any = createAsyncThunk(
  "aarma/AddPortfolioApi",
  async (portfolio: any, { dispatch }) => {
    console.log(portfolio);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}portfolio/add-portfolio`, portfolio, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp?.data?.message);
        dispatch(GetMyProfile());
        dispatch(GetPortfolioAPi());
        console.log(resp.data.data);

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
};
const AddPortfolioSlicer = createSlice({
  name: "addPortFolio",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(AddPortfolioApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddPortfolioApi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(AddPortfolioApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default AddPortfolioSlicer.reducer;
