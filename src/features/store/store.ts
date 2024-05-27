import { configureStore } from "@reduxjs/toolkit";
import Slicer from "../slicer/Slicer";
import RequestAccountSlicer from "../slicer/RequestAccountSlicer";
import VerifyOtpSlicer from "../slicer/VerifyOtpSlicer";
import LoginSlicer from "../slicer/LoginSlicer"
import CategorySlicer from "../slicer/CategorySlicer";
import ProfileInfoSlicer from "../slicer/ProfileInfoSlicer";
import ProfileUploadSlicer from "../slicer/ProfileUploadSlicer";
import ProfileUploadCoverSlicer from "../slicer/ProfileUploadCoverSlicer";
import GetMyProfileSlicer from "../slicer/GetMyProfileSlicer";
import ProfileVerifySlicer from "../slicer/ProfileVerifySlicer";
import AddPortfolioSlicer from "../slicer/AddPortfolioSlicer"
import GetPorfolioSlicer from "../slicer/GetPorfolioSlicer";
import DeletePortfolio from "../slicer/DeletePortfolio";
import ChatSlicer from "../slicer/ChatSlicer";
import GetBookingSlicer from "../slicer/GetBookingSlicer";
import BookingInfoSlicer from "../slicer/BookingInfoSlicer"
import DeletePlannerSlicer from "../slicer/DeletePlannerSlicer"
import AddPlannerSlicer from "../slicer/AddPlannerSlicer";
import UpdateActivitySlicer from "../slicer/UpdateActivitySlicer";
import CompleteReqSlicer from "../slicer/CompleteReqSlicer"
export const store = configureStore({
  reducer: {
    Slicer,
    RequestAccountSlicer,
    VerifyOtpSlicer,
    LoginSlicer,
    CategorySlicer,
    ProfileInfoSlicer,
    ProfileUploadSlicer,
    ProfileUploadCoverSlicer,
    GetMyProfileSlicer,
    ProfileVerifySlicer,
    AddPortfolioSlicer,
    GetPorfolioSlicer,
    DeletePortfolio,
    ChatSlicer,
    GetBookingSlicer,
    BookingInfoSlicer,
    DeletePlannerSlicer,
    AddPlannerSlicer,
    UpdateActivitySlicer,
    CompleteReqSlicer
  },
});
