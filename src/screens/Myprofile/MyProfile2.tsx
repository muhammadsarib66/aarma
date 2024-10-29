import { useSelector } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import PorfolioAcordion from "../../components/PorfolioAcordion";
import Loader from "../../components/Loader";
import UploadProfileModel from "../../components/UploadProfileModel";
import UploadCoverModal from "../../components/UploadCoverModal";
import { Chip } from "@material-tailwind/react";
import DocumentScreen from "../../components/DocumentScreen";


const MyProfile2 = () => {
    const { ProfileData  } = useSelector((state: any) => state.GetMyProfileSlicer);
  const { isLoading } = useSelector((state: any) => state.GetMyProfileSlicer);
  const { isLoading: isLoading2 , } = useSelector((state: any) => state.ProfileVerifySlicer);

  // console.log(ProfileData);
  // const circumference = 2 * Math.PI * 120;
  const cover2 = baseUrl + ProfileData?.coverPhoto;
  console.log(cover2, 'soooo')
  return (
    <section className="container mx-auto  font-Poppins grid grid-cols-1 md:grid-cols-2 gap-10 md:px-10 py-8  ">
        <div className="border-2  w-full max-h-screen overflow-y-auto rounded-lg shadow-md  ">
    
    <div>
    <div className=" rounded relative h-60 md:h-72  ">
        <img
          src={cover2}
          alt="coverPicture"
          className="object-cover  rounded-t-lg h-48   w-full "
        />
        <div className="flex justify-center">

        <span className=" bg-white relative  inline-block rounded-full w-24 h-24  md:w-40 md:h-40 top-[-60px]  md:top-[-90px] ">
          <img
            src={baseUrl + ProfileData?.profile}
            alt="profile"
            className="object-cover rounded-full border-4  border-white shadow-lg w-24 h-24 md:w-40 md:h-40"
            />
          <UploadProfileModel profileImg={true} />
          
        </span>
            </div>
        <UploadCoverModal coverImg={true} />
      </div>
    </div>
    <div className="grid grid-cols-2 px-8 border-b-2 pb-8">
            <div>
                <h1 className="font-semibold text-2xl capitalize">
                {ProfileData?.fullname}
                </h1>
            </div>
            <div className="font-semibold flex flex-col items-end gap-3 text-sm text-gray-700 ">
            <span className="flex  items-center gap-4 text-left w-full">
              <i className="fa-solid fa-envelope text-xl"></i>
              <p> {ProfileData?.email}</p>
            </span>
            <span className="flex  items-center gap-4  text-left w-full">
              <i className="fa-solid fa-phone text-xl"></i>
              <p> {ProfileData?.phone}</p>
            </span>
            </div>
            
      
    </div>
    <div className=" px-8 flex flex-col gap-4  py-8">
        <div className="flex overflow-y-auto overflow-x-hidden py-2 max-h-14 gap-4   ">
        <p className="font-semibold ">Tags: </p>
        <p className="w-full border-b-2 " > {ProfileData?.tagline}</p>
              </div>
              <div className="flex flex-col  overflow-y-auto overflow-x-hidden py-2 max-h-22 gap-4   ">
        
        <p className="font-semibold text-lg">Categories  </p>
        <div className="flex gap-2 ">
        {ProfileData?.categories?.map((item: any, ind: any) => (
        <Chip
        key={ind}
        variant="ghost"
        color="green"
        size="sm"
        value={item?.label}
        icon={
          <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
        }
      />
    ))}

              </div>
              </div>
                <div className="flex  flex-col bg-gray-50 rounded-lg  min-h-32 overflow-y-auto   p-4 gap-2">
              <p className="font-semibold text-lg"> Bio</p>
              <p className="text-justify"> {ProfileData?.bio} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe hic natus officia minus molestiae, delectus est ullam, dicta incidunt numquam blanditiis consectetur quisquam nostrum expedita aliquam deserunt. Quisquam, suscipit laboriosam veniam, ducimus vel natus tenetur, asperiores impedit reprehenderit voluptate nihil?</p>
                    </div>
            </div>
        </div>


        <div className=" max-h-screen w-full flex flex-col gap-6 overflow-y-auto  p-4">
            
            <div className="rounded-xl shadow-md"> 
        <PorfolioAcordion />

            </div>
            <div  className="rounded-xl shadow-md"> 
            <DocumentScreen />

        </div>
        </div>
        {isLoading && <Loader />}
        {isLoading2 && <Loader />}
        </section>
  )
}

export default MyProfile2