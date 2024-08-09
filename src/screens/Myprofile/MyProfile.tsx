/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import PorfolioAcordion from "../../components/PorfolioAcordion";
import Loader from "../../components/Loader";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import ProfileVeriModal from "../../components/ProfileVeriModal";

const MyProfile = () => {
  const { ProfileData ,ProfileCompletnes } = useSelector((state: any) => state.GetMyProfileSlicer);
  const { isLoading } = useSelector((state: any) => state.GetMyProfileSlicer);
  // console.log(ProfileData);
  const circumference = 2 * Math.PI * 120;
  const cover2 = baseUrl + ProfileData?.coverPhoto;
  return (
    <div className=" container mx-auto w-full bg-gray-300">
      <div className=" relative h-60 md:h-72  ">
        <img
          src={cover2}
          alt="coverPicture"
          className="object-cover  h-60 md:h-72  w-full "
        />
        <span className=" bg-white relative  inline-block rounded-full w-24 h-24  md:w-52 md:h-52 top-[-60px]  md:top-[-110px] left-8 md:left-20">
          <img
            src={baseUrl + ProfileData?.profile}
            alt="profile"
            className="object-cover rounded-full border-4  border-white shadow-lg w-24 h-24 md:w-52 md:h-52"
          />
          <UploadProfileModel profileImg={true} />
          
        </span>
        <UploadCoverModal coverImg={true} />
      </div>
      <div className="pt-24 px-8 ">
        <h1 className="text-2xl font-bold  text-onPrimary py-4">
          Welcome <span className="text-primary">{ProfileData?.fullname} </span>{" "}
        </h1>
        <section className=" ">
          <div className="grid md:grid-cols-2 gap-4">
          <div className="col-span-1  p-4 rounded-xl flex flex-col gap-3 bg-onSecondary max-h-80 overflow-y-scroll">
            <h2 className="font-bold text-onPrimary text-lg uppercase">Profile Detail</h2>
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
                  <p key={ind} className="text-sm px-2 bg-primary text-secondary rounded-lg  ">
                    {item?.label}
                  </p>
                ))}
              </span>
            </span>
            
          </div>
          <div className="col-span-1   rounded-xl flex flex-col p-4 gap-2 justify-center items-center bg-onSecondary     ">
            <svg className="transform rotate-0 w-72 h-72">
  <defs>
    <pattern
      id="image-fill"
      patternUnits="userSpaceOnUse"
      width="290"
      height="290"
    >
      <image
        href={baseUrl+ProfileData?.profile }
        x="0"
        y="0"
        width="100%"
        height="100%"
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
      circumference - (Number(ProfileCompletnes) / 100) * circumference
    }
    className="text-blue-500"
  />
</svg>
           
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
          </div>
                <div className="grid md:grid-cols-2 gap-4">
                <div className="px-3 my-10 py-4 flex bg-onSecondary flex-col gap-4   ">
          <h1 className="flex text-2xl font-semibold  text-onPrimary ">
            Documents
            <ProfileVeriModal icon={true} />
          </h1>
          {ProfileData?.id_card ? (
            <div className="grid grid-cols-1 md:grid-cols-1  place-content-center place-items-center gap-4">
              <img
                className="w-full h-72 border p-1 bg-secondary rounded-lg object-cover"
                src={baseUrl + ProfileData?.id_card}
              />
              <img
                className="w-full h-72 border p-1 bg-secondary rounded-lg object-cover"
                src={baseUrl + ProfileData?.verif_document}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-72 bg-secondary rounded-lg">
              <p className="text-2xl text-onPrimary">No Document Uploaded</p>
            </div>
          )}
        </div>
        <div>
        <PorfolioAcordion />

        </div>
                </div>
        </section>
        
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default MyProfile;
