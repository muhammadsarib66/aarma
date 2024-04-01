import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const createAccountApi = createAsyncThunk(
  "aarma/getCategory",
  async (userData, { dispatch }) => {
    return await axios
      .get(`${baseUrl}categories/categories`)
      .then((resp) => {
        console.log(resp.status);
        // if(resp.status === 400){
        //     toast.error("email already exist")
        //     alert('email already exist')
        // }
        // else{
        toast.success(resp.data.message);
        // }
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
  categoryData: "",
};

const CategorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryData: (state, action) => {
      state.categoryData = action.payload;
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

export const { setCategoryData } = CategorySlicer.actions;
export default CategorySlicer.reducer;
