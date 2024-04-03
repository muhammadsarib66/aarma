/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import PorfolioAcordion from "../../components/PorfolioAcordion";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

const MyProfile = () => {
  const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  const { PortfolioData } = useSelector((state: any) => state.GetPorfolioSlicer);
  const { isLoading } = useSelector((state: any) => state.DeletePortfolio);
  console.log(ProfileData);
  return (
    <>
    <section className="py-32  grid border-2 gap-4 px-8 grid-cols-1 md:grid-cols-2">
        {
            isLoading && <Loader />
        }
      <div className="col-span-1  p-4 ">
        <div className="  rounded-md ">
          <div className="relative">
            <img
              src={baseUrl + ProfileData?.coverPhoto}
              alt="cover"
              className=" shadow-md object-cover object-top  w-full h-44 rounded-lg"
            />
            <span className="absolute top-32 left-0">
              <img
                src={baseUrl + ProfileData?.profile}
                alt="profile"
                className="rounded-full w-32 h-32"
              />
            </span>
          </div>
        </div>
        <div className="mt-20">
          <h1 className="text-2xl font-bold py-4 text-onPrimary">
            Welcome{" "}
            <span className="text-primary">{ProfileData?.fullname} </span>{" "}
            <br />
          </h1>
          <div>
            <h2 className="font-bold text-onPrimary text-xl">Profile Detail</h2>
            <div className="rounded-md flex flex-col gap-3 p-4 my-2 bg-onSecondary ">
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
          </div>
        </div>
      </div>
      <div className="col-span-1  p-4 ">
        <div className="bg-onSecondary rounded-lg flex flex-col pt-8 items-center  h-44  ">
          <h2 className="font-bold text-onPrimary text-2xl">
            Profile Completion
          </h2>
          <div>
            <div className="relative">
              <div className="rounded-full h-20 w-20 flex items-center justify-center bg-blue-200">
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <svg viewBox="0 0 36 36" className="w-full h-full">
                    <circle
                      className="text-red-600"
                      cx="18"
                      cy="18"
                      r="15.91549430918954"
                      strokeWidth="3"
                      fill="transparent"
                    />
                    <circle
                      className="text-primary"
                      cx="18"
                      cy="18"
                      r="15.91549430918954"
                      strokeWidth="3"
                      fill="transparent"
                      strokeDasharray={`20, 100`}
                    />
                  </svg>
                </div>
                <div className="z-10 text-primary text-xl font-bold">20%</div>
              </div>
            </div>
          </div>
        </div>
              <PorfolioAcordion/>
      </div>
    
    </section>

<Footer />
</>
  );
};

export default MyProfile;
