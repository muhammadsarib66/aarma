/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl, config } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";
import { GetPortfolioAPi } from "./GetPorfolioSlicer";

export const AddPortfolioApi: any = createAsyncThunk(
  "aarma/AddPortfolioApi",
  async (portfolio: any, { dispatch }) => {

    return await axios
      .post(`${baseUrl}portfolio/add-portfolio`, portfolio,config)
      .then((resp) => {
        toast.success(resp?.data?.message);
        dispatch(GetMyProfile());
        dispatch(GetPortfolioAPi());

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
  modalOpen : false , 
};
const AddPortfolioSlicer = createSlice({
  name: "addPortFolio",
  initialState,
  reducers: {
    modalPortfolio : (state)=>{
        state.modalOpen = true
    },
    modalPortfolioClose : (state)=>{
      state.modalOpen = false
  }
  },

  extraReducers: (builder) => {
    builder.addCase(AddPortfolioApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddPortfolioApi.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(AddPortfolioApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const {modalPortfolio,modalPortfolioClose} = AddPortfolioSlicer.actions;
export default AddPortfolioSlicer.reducer;
