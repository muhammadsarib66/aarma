/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import PorfolioAcordion from "../../components/PorfolioAcordion";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";
import UploadProfileModel from "../../components/UploadProfileModel";
import { ToastContainer } from "react-toastify";
import UploadCoverModal from "../../components/UploadCoverModal";
import { Tooltip } from "@material-tailwind/react";
import ProfileVeriModal from "../../components/ProfileVeriModal";

const MyProfile = () => {
  const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  const { isLoading } = useSelector((state: any) => state.DeletePortfolio);
  console.log(ProfileData);
  const cover2 = baseUrl + ProfileData?.coverPhoto;
  return (
    <div className="bg-onSecondary">
      <div className=" relative top-16  md:top-20  h-60 md:h-72  ">
        <img
          src={cover2}
          alt="coverPicture"
          className="object-cover h-60 md:h-72  w-full "
        />
        <span className=" bg-white relative  inline-block rounded-full w-32 h-32 md:w-52 md:h-52 top-[-60px]  md:top-[-110px] left-8 md:left-20">
          <img
            src={baseUrl + ProfileData?.profile}
            alt="profile"
            className="object-cover w-32 h-32 md:w-52 md:h-52"
          />
          <UploadProfileModel profileImg={true} />
        </span>
        <UploadCoverModal coverImg={true} />
      </div>
      <div className="pt-36 md:pt-48 px-8 ">
        <h1 className="text-2xl font-bold  text-onPrimary py-4">
          Welcome <span className="text-primary">{ProfileData?.fullname} </span>{" "}
        </h1>
        <section className=" grid  gap-4  grid-cols-1 md:grid-cols-2">
          {isLoading && <Loader />}

          <div className="col-span-1  p-4 rounded-lg flex flex-col gap-3 bg-secondary max-h-80 overflow-y-scroll">
            <h2 className="font-bold text-onPrimary text-xl">Profile Detail</h2>
            <span className="flex  items-center gap-2">
              <i className="fa-solid fa-envelope text-xl"></i>
              <p> {ProfileData?.email}</p>
            </span>
            <span className="flex  items-center gap-2">
              <i className="fa-solid fa-phone text-xl"></i>
              <p> {ProfileData?.phone}</p>
            </span>
            <span className="flex   items-center gap-2">
              <p className="font-bold"> Bio</p>
              <p className="text-justify"> {ProfileData?.bio}</p>
            </span>
            <span className="flex  items-center gap-2">
              <p className="font-bold"> Tagline :</p>
              <p> {ProfileData?.tagline}</p>
            </span>
            <span className="flex  items-center gap-2">
              <p className="font-bold"> Categories :</p>
              <span className="flex gap-2 ">
                {" "}
                {ProfileData?.categories?.map((item: any, ind: any) => (
                  <p key={ind} className="text-sm px-2 bg-primary rounded-lg  ">
                    {item?.label}
                  </p>
                ))}
              </span>
            </span>
          </div>
          <div className="col-span-1   rounded-lg flex flex-col p-4 gap-2 justify-center items-center bg-secondary     ">
            <h2 className="font-bold text-onPrimary text-xl">
              Profile Completion
            </h2>

            <div className="relative">
              <div className="rounded-full h-40 w-40 flex items-center justify-center bg-onSecondary">
                <div className="z-10 text-primary text-4xl font-bold">20%</div>
              </div>
            </div>
            <p className="font-semibold">
              Profile Status:
              <span
                className={`${
                  ProfileData?.profile_status_code === "IN_REVIEW"
                    ? "bg-red-400"
                    : "bg-green-400"
                } px-2 rounded-full text-white  ml-2`}
              >
                {" "}
                {ProfileData?.profile_staus}
              </span>
            </p>
          </div>
        </section>
        <div className="px-3 my-10 py-4 flex flex-col gap-4   ">

        <h1 className="flex text-2xl font-semibold  text-onPrimary ">
           Documents
             <ProfileVeriModal icon={true} />
        </h1> 
                <div className="grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-4">
                <img className="w-full h-80 border p-1 bg-secondary rounded-lg object-cover" src={baseUrl+ProfileData?.id_card} />
                <img className="w-full h-80 border p-1 bg-secondary rounded-lg object-cover" src={baseUrl+ProfileData?.verif_document} />
                  
                </div>
        </div>
        <PorfolioAcordion />
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default MyProfile;
