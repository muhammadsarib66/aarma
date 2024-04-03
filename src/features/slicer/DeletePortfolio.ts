/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";
import { GetMyProfile } from "./GetMyProfileSlicer";
import { GetPortfolioAPi } from "./GetPorfolioSlicer";

export const DeletePortfolioAPi: any = createAsyncThunk(
  "aarma/DeletePortfolioAPi",
  async (id: any, { dispatch }) => {
    console.log(id);
    const token = localStorage.getItem("token");

    return await axios
      .post(`${baseUrl}portfolio/delete-portfolio`, {portfolioId:id}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        toast.success(resp?.data?.message);
        dispatch(GetMyProfile());
        dispatch(GetPortfolioAPi())
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
const DeletePortfolio = createSlice({
  name: "delPortFolio",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(DeletePortfolioAPi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeletePortfolioAPi.fulfilled, (state) => {
      state.isLoading = false;
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(DeletePortfolioAPi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default DeletePortfolio.reducer;
