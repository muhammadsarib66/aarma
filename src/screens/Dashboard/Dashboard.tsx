/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileInfoModal from "./ProfileInfoModal";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import ProfileVeriModal from "../../components/ProfileVeriModal";
import AddPortfolioModal from "../../components/AddPortfolioModal";
import Loader from "../../components/Loader";
import { SplashScreen } from "../../components/SplashScreen";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { ProfileData ,isLoading} = useSelector((state: any) => state.GetMyProfileSlicer);

  const { fullname } = JSON.parse(localStorage.getItem("user") || "{}") || {};

  return (
    <>
      <div className=" rounded-md border p-4 bg-white">
        <h1 className=" font-bold text-2xl py-4 text-onPrimary">
          Welcome <span className="text-primary">{fullname} </span> <br />
          please Complete Your Profile
        </h1>
        <div className="flex flex-col  py-2 gap-4 ">
          <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8 ">
            <h2 className=" text-lg md:text-xl font-semibold ">
              {" "}
              Profile Info fill out Basic profile Info{" "}
            </h2>
            <ProfileInfoModal />
          </div>
        </div>
        {/* ///// for Profile Picture  */}
        <div className="flex flex-col  py-2 gap-4 ">
          <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8">
            <h2 className=" text-lg md:text-xl font-semibold "> Profile Picture Upload </h2>
            <UploadProfileModel profileImg={false} />
          </div>
        </div>
        {/* //// for Cover Photo */}
        <div className="flex flex-col  py-2 gap-4 ">
          <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8">
            <h2 className=" text-lg md:text-xl font-semibold "> Cover Photo Upload </h2>
            <UploadCoverModal />
          </div>
        </div>
        {/* // submit profile Verficiation  */}
        <div className="flex flex-col  py-2 gap-4 ">
          <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8">
            <h2 className=" text-lg md:text-xl font-semibold ">
              {" "}
              Submit Profile <br />
              Submit for Verification{" "}
            </h2>
            <ProfileVeriModal />
          </div>
        </div>
        {/* // Add  Portfolio   */}
        <div className="flex flex-col  py-2 gap-4 ">
          <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8">
            <h2 className=" text-lg md:text-xl font-semibold ">
              {" "}
              Add PortFolio
              <br />
              Add Your Multiple Portfolios{" "}
            </h2>
            <AddPortfolioModal />
          </div>
        </div>
      </div>
      <div>
      {
        isLoading ? <Loader />
        :
        (
          !ProfileData?.profile || !ProfileData?.coverPhoto || !ProfileData?.bio || 
    (ProfileData && (!ProfileData.portfolio || ProfileData.portfolio.length === 0)) ? 
    <SplashScreen /> :
    null
        )
      }
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Dashboard;
