import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import RequestAccountSlicer from "../slicer/RequestAccountSlicer";
import VerifyOtpSlicer from "../slicer/VerifyOtpSlicer";
import LoginSlicer from "../slicer/LoginSlicer";
import ProfileUploadProfileApi from "../slicer/ProfileUploadProfileApi";
import ProfileUploadCover from "../slicer/ProfileUploadCover";
// import { ProfileVerificationApi } from "../slicer/ProfileVerification";
import GetMyProfile from "../slicer/GetMyProfile";
export const store = configureStore({
  reducer: {
    Slicer,
    RequestAccountSlicer,
    VerifyOtpSlicer,
    LoginSlicer,
    ProfileUploadProfileApi,
    ProfileUploadCover,
    // ProfileVerificationApi,
    GetMyProfile,
  },
});
