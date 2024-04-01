import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const getAllCatApi = createAsyncThunk(
  "aarma/getCategory",
  async ( ) => {
    return await axios
      .get(`${baseUrl}categories/categories`)
      .then((resp) => {
        console.log(resp.data.data);
        // toast.success(resp.data.message);
        return resp.data.data;
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
    // setCategoryData: (state, action) => {
    //   state.categoryData = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCatApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCatApi.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryData = action.payload
      console.log("fulfilled", action.payload);
    });
    builder.addCase(getAllCatApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const { setCategoryData } = CategorySlicer.actions;
export default CategorySlicer.reducer;
