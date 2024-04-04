import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "./Slicer";
import { toast } from "react-toastify";

export const LoginAccApi: any = createAsyncThunk(
  "aarma/loginacc",
  async (loginCredential: any, { dispatch }) => {
    try {
      const response = await axios.post(`${baseUrl}users/eventmanager-login`, loginCredential);
      
      if (response.status === 200) {
        toast.success("Login Successful");
        
        // if (response.data) {
        //   localStorage.setItem("ArmaCredienials", JSON.stringify(loginCredential));
        // }
        
        return response.data;
      } else {
        toast.error("User not found");
        return Promise.reject("User not found");
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
      return Promise.reject(error);
    }
  }
);

// export const LoginAccApi: any = createAsyncThunk(
//   "aarma/loginacc",
//   async (loginCredential: any, { dispatch }) => {
//     // console.log(loginCredential);
//     return await axios
//       .post(`${baseUrl}users/eventmanager-login`, loginCredential)
//       .then((resp) => {
//         toast.success("login Succesfull");
//         // console.log(resp.data);
//         if (resp.data) {
//           localStorage.setItem(
//             "ArmaCredienials",
//             JSON.stringify(loginCredential)
//           );
//         }
//         return resp.data;
//       })
//       .catch((err) => {
//         toast.error(err.data.message);
//         console.log(err.data);
//         return err.message;
//       });
//   }
// );

const initialState = {
  isLoading: false,
  isError: false,
  UserData: "",
};
const LoginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    // setReqAccData : (state,action)=>{
    //     state.ReqAccData = action.payload
    // }
  },

  extraReducers: (builder) => {
    builder.addCase(LoginAccApi.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAccApi.fulfilled, (state, action) => {
      state.isLoading = false;

      const { data, token } = action.payload;
      state.UserData = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data));
      // console.log(localStorage.getItem("token"));
    });
    builder.addCase(LoginAccApi.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// export const {setReqAccData} = LoginSlicer.actions;
export default LoginSlicer.reducer;
