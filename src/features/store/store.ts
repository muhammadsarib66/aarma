import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import RequestAccountSlicer from "../slicer/RequestAccountSlicer";
import VerifyOtpSlicer from "../slicer/VerifyOtpSlicer";
import LoginSlicer from "../slicer/LoginSlicer"
export const store = configureStore({
  reducer: {
    Slicer,
    RequestAccountSlicer,
    VerifyOtpSlicer,
    LoginSlicer
   
  },
});
