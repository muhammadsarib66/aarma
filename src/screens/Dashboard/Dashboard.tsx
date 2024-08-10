/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileInfoModal from "./ProfileInfoModal";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import ProfileVeriModal from "../../components/ProfileVeriModal";
import AddPortfolioModal from "../../components/AddPortfolioModal";
import Loader from "../../components/Loader";
import { SplashScreen } from "../../components/SplashScreen";
import { useSelector } from "react-redux";
import { Progress } from "@material-tailwind/react";
import logo from "../../assets/images/Hero.png";
import { baseUrl } from "../../features/slicer/Slicer";

const Dashboard = () => {
  const { ProfileData, ProfileCompletnes, isLoading } = useSelector(
    (state: any) => state.GetMyProfileSlicer
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
    <div className=" container flex flex-col  gap-4 w-full mx-auto bg-[#FFFFFF]">
      <div className="grid grid-cols-1 md:grid-cols-12  pt-4 px-2 rounded-lg bg-onSecondary">
        <div className="col-span-3 flex  p-4 gap-4 flex-col justify-center">
          <h2 className="text-2xl font-bold">Dashbaord</h2>
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
                <i className=" text-primary text-4xl fa-brands fa-slack"></i>
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
        <div className="bg-primary text-white p-4 rounded-xl">
          <p className="text-2xl font-Inter font-semibold mb-4 ">
            {" "}
            Profile Completion
          </p>
          <Progress
            className="h-6"
            color="cyan"
            value={ProfileCompletnes}
            label="Completed"
            placeholder={""}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4">
        <div className=" bg-onSecondary justify-center items-center flex flex-col gap-4 col-span-1 h-full ">
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
              strokeWidth="25"
              fill="url(#image-fill)"
              className="text-blue-500"
            />
            <circle
              cx="145"
              cy="145"
              r="120"
              stroke="#FF725E"
              strokeWidth="25"
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
        <div className="col-span-3 rounded-md shadow-md p-4 bg-white">
          <h1 className=" font-bold text-2xl py-4 text-onPrimary">
            Complete Your Profile
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
              <h2 className=" text-lg md:text-xl font-semibold ">
                {" "}
                Profile Picture Upload{" "}
              </h2>
              <UploadProfileModel profileImg={false} />
            </div>
          </div>
          {/* //// for Cover Photo */}
          <div className="flex flex-col  py-2 gap-4 ">
            <div className="border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-2 md:px-8">
              <h2 className=" text-lg md:text-xl font-semibold ">
                {" "}
                Cover Photo Upload{" "}
              </h2>
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
      </div>

      <div className="">
        {isLoading ? (
          <Loader />
        ) : (ProfileData &&
            (!ProfileData?.portfolio || ProfileData?.portfolio.length === 0)) ||
          !ProfileData?.profile ||
          !ProfileData?.coverPhoto ||
          !ProfileData?.bio ? (
          <SplashScreen />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
