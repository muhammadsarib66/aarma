/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileInfoModal from "./ProfileInfoModal";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import ProfileVeriModal from "../../components/ProfileVeriModal";
import AddPortfolioModal from "../../components/AddPortfolioModal";
import Loader from "../../components/Loader";
import { SplashScreen } from "../../components/SplashScreen";
import { useSelector } from "react-redux";
import logo from "../../assets/images/Hero.png";
import { baseUrl } from "../../features/slicer/Slicer";
import ProgressBar2 from "../../components/ProgressBar2";
import EvenLogo from "./../../assets/images/eventLogo.svg"

const Dashboard = () => {
  const { ProfileData, ProfileCompletnes, isLoading } = useSelector(
    (state: any) => state.GetMyProfileSlicer
  );
  const { isLoading: ProfileInfoLoader } = useSelector(
    (state: any) => state.ProfileInfoSlicer
  );
  const { isLoading: ProfileUploadLoader } = useSelector(
    (state: any) => state.ProfileUploadSlicer
  );
  const { isLoading: AddPortfolioLoader } = useSelector(
    (state: any) => state.AddPortfolioSlicer
  );
  const { isLoading: ProfileUploadCoverLoader } = useSelector(
    (state: any) => state.ProfileUploadCoverSlicer
  );
  const { isLoading: ProfileVerifyLoader } = useSelector(
    (state: any) => state.ProfileVerifySlicer
  );
  const { BookingsData } = useSelector((state: any) => state.GetBookingSlicer);
// console.log(BookingsData)

const BookingsTab =[ {
  bookings: BookingsData?.active?.length,
  title : "Active"
},{
  bookings: BookingsData?.completed?.length,
  title : "Completed"
},{
  bookings: BookingsData?.cancelled?.length,
  title : "Cancelled"
}]
  const { fullname } = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const circumference = 2 * Math.PI * 120;

  return (
    <div className="font-Poppins container mx-auto flex flex-col  gap-12 w-full  bg-[#FFFFFF]">
      <div className="grid grid-cols-1 md:grid-cols-12  pt-4 px-2 rounded-lg bg-onSecondary">
        <div className="col-span-3 flex  p-4 gap-4 flex-col justify-center">
          <h2 className="text-3xl text-gray-800 font-semibold">Dashbaord</h2>
          <span className="  tracking-wider  ">
            <i className="fa-solid fa-calendar-days pr-5"></i>
            {new Date().toLocaleDateString()}
          </span>
        </div>

        <div className="grid  grid-cols-1  md:grid-cols-3 overflow-x-scroll gap-4  col-span-9 border ">
          {BookingsTab.map((item, ind) => (
            <div
              key={ind}
              className="rounded-lg py-3 bg-white flex justify-around items-center "
            >
              <div>
                <p>
                  {item?.title + " " + "Bookings"}
                  
                </p>
                <p> {item?.bookings}</p>
              </div>
              <div>
                <img src={EvenLogo} alt="logo" className="w-12 h-12" />
                {/* <i className=" text-primary text-4xl fa-brands fa-slack"></i> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col  gap-8">
        <p className="text-3xl font-semibold">
          Welcome <span className="text-primary capitalize">{fullname} </span>{" "}
          <br />
        </p>
        <div className="bg-primary text-white p-4 rounded-full flex flex-col  justify-center items-center">
          <p className="w-[90%] text-2xl font-Inter font-semibold mb-4 text-start ">
            {" "}
            Profile Completion
          </p>
          <div className="w-[90%] ">

      <ProgressBar2 progress={ProfileCompletnes} />
          </div>

        </div>
        
      </div>
      <div className="flex  w-full h-full">
        <div className=" bg-[#EEEEEE]  w-[30%] justify-center items-center flex flex-col gap-4  h-[90vh] overflow-y-hidden ">
          <svg className="transform rotate-0 w-72 h-72">
            <defs>
              <pattern
                id="image-fill"
                patternUnits="userSpaceOnUse"
                width="290"
                height="290"
              >
                <image
                  href={baseUrl + ProfileData?.profile || logo}
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                  }}
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="#FF725E"
              strokeWidth="8"
              fill="url(#image-fill)"
              className="text-blue-500"
            />
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="#FF725E"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={
                circumference -
                (Number(ProfileCompletnes) / 100) * circumference
              }
              className="text-blue-500"
            />
          </svg>
          <div className="text-primary font-semibold">
            <p>
              {ProfileCompletnes === 100
                ? `${ProfileCompletnes}%  Profile Completed`
                : "Complete Your Profile to get more opportunities"}
            </p>
          </div>
        </div>
        <div className="w-[70%] rounded-r-md shadow-lg p-4 bg-white text-gray-700 h-[90vh] overflow-y-hidden">
          <h1 className=" font-semibold text-3xl px-8 py-4 text-onPrimary">
            Complete Your Profile
          </h1>
          <div className="flex flex-col   py-2 gap-4 ">
            <div className="  h-20 flex border-b-2 border-gray-300 items-center  justify-between px-2 md:px-8 ">
                <div className="flex gap-3">

      <i className={`fa-solid ${ProfileData?.categories?.length>0 && ProfileData?.tagline && ProfileData?.bio && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-primary" : "text-gray-300"} text-2xl fa-circle-check`}></i>
              
              <h2 className=" text-lg md:text-xl font-semibold ">
                {" "}
                Profile Info fill out Basic profile Info{" "}
              </h2>
                </div>
              <ProfileInfoModal />
            </div>
          </div>
          {/* ///// for Profile Picture  */}
          <div className="flex flex-col  py-2 gap-4 ">
          <div className="  h-20 flex border-b-2 border-gray-300 items-center  justify-between px-2 md:px-8 ">

            <div className="flex gap-3">
            <i className={`fa-solid ${ ProfileData?.profile && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-primary" : "text-gray-300"} text-2xl fa-circle-check`}></i>

              <h2 className=" text-lg md:text-xl font-semibold ">
                Profile Picture Upload{" "}
              </h2>
            </div>
              <UploadProfileModel profileImg={false} />
            </div>
          </div>
          {/* //// for Cover Photo */}
          <div className="flex flex-col  py-2 gap-4 ">
          <div className="  h-20 flex border-b-2 border-gray-300 items-center  justify-between px-2 md:px-8 ">
          <div className="flex gap-3">
          <i className={`fa-solid ${ ProfileData?.coverPhoto && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-primary" : "text-gray-300"} text-2xl fa-circle-check`}></i>

              <h2 className=" text-lg md:text-xl font-semibold ">
                {" "}
                Cover Photo Upload{" "}
              </h2>
            </div>
              <UploadCoverModal />
            </div>
          </div>
          {/* // submit profile Verficiation  */}
          <div className="flex flex-col  py-2 gap-4 ">
          <div className="  h-20 flex border-b-2 border-gray-300 items-center  justify-between px-2 md:px-8 ">
          <div className="flex gap-3">
      <i className={`fa-solid ${ ProfileData?.verif_document && ProfileData?.id_card && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-primary" : "text-gray-300"} text-2xl fa-circle-check`}></i>
            
              <h2 className=" text-lg md:text-xl font-semibold ">
                Submit Profile <br />
                Submit for Verification{" "}
              </h2>
            </div>
              <ProfileVeriModal />
            </div>
          </div>
          {/* // Add  Portfolio   */}
          <div className="flex flex-col  py-2 gap-4 ">
          <div className="  h-20 flex border-b-2 border-gray-300 items-center  justify-between px-2 md:px-8 ">
          <div className="flex gap-3">
          
          <i
          className={`fa-solid ${
            ProfileData?.portfolio?.length > 0 &&
            ProfileData?.email &&
            ProfileData?.firstName &&
            ProfileData?.lastName
              ? "text-primary"
              : "text-gray-300"
          } text-2xl fa-circle-check`}
        ></i>
              <h2 className=" text-lg md:text-xl font-semibold ">
                {" "}
                Add PortFolio
                <br />
                Add Your Multiple Portfolios{" "}
              </h2>
            </div>
              <AddPortfolioModal />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {
         (ProfileData &&
            (!ProfileData?.portfolio || ProfileData?.portfolio.length === 0)) ||
          !ProfileData?.profile ||
          !ProfileData?.coverPhoto ||
          !ProfileData?.bio ? (
          <SplashScreen />
        ) : null}
      </div>
      { isLoading && <Loader />}
      { ProfileInfoLoader && <Loader />}
      { ProfileUploadLoader && <Loader />}
      { AddPortfolioLoader && <Loader />}
      { ProfileUploadCoverLoader && <Loader />}
      { ProfileVerifyLoader && <Loader />}
    </div>
  );
};

export default Dashboard;
