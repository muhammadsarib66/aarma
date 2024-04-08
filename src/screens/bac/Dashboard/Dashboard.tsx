/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileInfoModal from "./ProfileInfoModal";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatApi } from "../../features/slicer/CategorySlicer";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import { GetMyProfile } from "../../features/slicer/GetMyProfileSlicer";
import ProfileVeriModal from "../../components/ProfileVeriModal";
import { Avatar } from "@mui/material";
import { baseUrl } from "../../features/slicer/Slicer";
import AddPortfolioModal from "../../components/AddPortfolioModal";
import Footer from "../../components/Footer";
import { GetPortfolioAPi } from "../../features/slicer/GetPorfolioSlicer";
import Navbar from "../../components/Navbar";

const   Dashboard = () => {
  const dispatch = useDispatch();
  const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  const [value, setValue] = useState(50); // Initial value for the range slider

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const { fullname } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
    dispatch(getAllCatApi());
    dispatch(GetMyProfile());
    dispatch(GetPortfolioAPi())

  }, [dispatch]);

  return (
    <>
    <Navbar />
    <div className="">
      <div className="py-32 grid grid-cols-1  md:grid-cols-4 gap-4 px-2 ">
        <div className="border rounded-md">
          <div className="border-2 m-6 rounded-xl p-2">
            <div className="flex items-center  gap-5">
              <Avatar alt="user" src={baseUrl + ProfileData?.profile} />
              <p className="font-semibold">{fullname}</p>
              <div></div>
            </div>
            <p> profile Complete </p>
            <div className="w-full max-w-md mx-auto mt-8">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="w-full"
              />
              <div className="text-center mt-4">{value}</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 rounded-md border p-4 ...">
          <h1 className=" font-bold text-2xl py-4 text-onPrimary">
            Welcome <span className="text-primary">{fullname} </span> <br />
            please Complete Your Profile
          </h1>
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8">
              <h2 className="text-xl font-semibold ">
                {" "}
                Profile Info fill out Basic profile Info{" "}
              </h2>
              <ProfileInfoModal />
            </div>
          </div>
          {/* ///// for Profile Picture  */}
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8">
              <h2 className="text-xl font-semibold ">
                {" "}
                Profile Picture Upload{" "}
              </h2>
              <UploadProfileModel profileImg={false} />
            </div>
          </div>
          {/* //// for Cover Photo */}
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8">
              <h2 className="text-xl font-semibold "> Cover Photo Upload </h2>
              <UploadCoverModal />
            </div>
          </div>
          {/* // submit profile Verficiation  */}
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8">
              <h2 className="text-xl font-semibold ">
                {" "}
                Submit Profile <br />
                Submit for Verification{" "}
              </h2>
              <ProfileVeriModal />
            </div>
          </div>
          {/* // Add  Portfolio   */}
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8">
              <h2 className="text-xl font-semibold ">
                {" "}
                Add PortFolio
                <br />
                Add Your Multiple Portfolios{" "}
              </h2>
              <AddPortfolioModal />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
      <ToastContainer />
      </>
 
  );
};

export default Dashboard;
