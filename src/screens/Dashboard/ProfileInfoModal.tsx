/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { ProfileInfoApi, setProfileInfoModal } from "../../features/slicer/ProfileInfoSlicer";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setProfileModal } from "../../features/slicer/ProfileUploadSlicer";
import { modalPortfolioClose } from "../../features/slicer/AddPortfolioSlicer";
import { setVerifyModal } from "../../features/slicer/ProfileVerifySlicer";
import { setCoverModal } from "../../features/slicer/ProfileUploadCoverSlicer";
import { Button } from "@material-tailwind/react";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ProfileInfoModal() {
  const dispatch = useDispatch()
  const { categoryData } = useSelector((state: any) => state.CategorySlicer);
  const {isLoading} = useSelector((state:any)=> state.ProfileInfoSlicer);
  const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);
  const {profileInfoModal} = useSelector((state:any)=> state.ProfileInfoSlicer);
  console.log( ProfileData)
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [bio , setBio] = useState('')
  const [tagline , setTagline] = useState('')
  
  const handleOpen = () => dispatch(setProfileInfoModal(true));
  const handleClose = () => {
    dispatch(setCoverModal(false))
    dispatch(setVerifyModal(false))
    dispatch(modalPortfolioClose())
   dispatch(setProfileInfoModal(false))
   dispatch(setProfileModal(false))
  };
  
  const handleChange = (option:any) => {
    // Check if the option is already selected
    const isSelected = selectedOptions.includes(option._id);

    if (isSelected) {
      // If selected, remove its ID from the selected options
      setSelectedOptions((prevOptions:any) =>
        prevOptions.filter((id:any) => id !== option._id)
      );
    } else {
      // If not selected, add its ID to the selected options
      setSelectedOptions((prevOptions:any) => [...prevOptions, option._id]);
    }
  };
  const handlBioChange = (e: any) => {
    setBio(e.target.value)
  };
  const handleTagChange = (e: any) => {
    setTagline(e.target.value)
  };
  //   console.log(selectedOptions)
  const addProfileInfo = () => {
    if(!bio || !tagline || selectedOptions.length === 0){
      toast.error('Please fill all the fields')
    }
    else{

    
    console.log(selectedOptions);
    const Obj = {
         bio,
         tagline,
        categories: selectedOptions,
        };
        console.log(Obj)      
        dispatch(ProfileInfoApi(Obj))
        
    setBio('')
    setTagline('')
    setSelectedOptions([])
    handleClose();
  }
    }
  

  return (
    <div>
      <span className="flex gap-3">
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid fa-chevron-right`}></i>
      {/* <i
        
        
        className="text-blue-600 cursor-pointer text-2xl fa-solid fa-pencil"
        ></i> */}
        </span>

      <Modal
        open={profileInfoModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
        {isLoading && <Loader/>}
        <Box className=" w-[300px]  md:w-[500px] flex flex-col gap-4" sx={style}>
        <span>
            <i className="fa-solid fa-times text-2xl absolute top-0 right-0 p-2  cursor-pointer " onClick={handleClose}></i>
          </span>
          <h1 className="text-2xl font-bold text-onPrimary pb-2">
            Complete Your Bio
          </h1>
          <div>
            <label className="   text-onPrimary font-semibold"> Add Bio</label>
            <textarea
            value={bio}
              onChange={handlBioChange}
              className="mt-2 bg-onSecondary w-full rounded-lg p-3"
              placeholder="Add Your Bio"
            />
          </div>
          <div>
            <label
              
              className="text-onPrimary font-semibold"
            >
              {" "}
              Add tagline
            </label>

            <InputField onChange={handleTagChange} value={tagline} placeholder="add your Tagline" />
          </div>

          <div className="z-20 h-40 my-3 overflow-y-scroll">
            <h2 className="text-xl font-semibold text-onPrimary pb-2 ">
              Select Categories
            </h2>
            {categoryData &&  categoryData?.map((option:any) => (
              <div className=" flex items-center gap-3 py-1 " key={option._id}>
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  id={option._id}
                  checked={selectedOptions.includes(option._id )}
                  onChange={() => handleChange(option)}
                />
                <label htmlFor={option._id}>{option.label}</label>
              </div>
            ))}
          </div>
          <span className="flex w-full  gap-2">
            <Button className="w-full bg-[#EDEDED] text-gray-700" onClick={handleClose}  placeholder={''}>
              Cancel
              </Button> 
            <Button   placeholder={''}  className="w-full bg-primary" onClick={addProfileInfo}>
              Save
            </Button>
          </span>     
         
        </Box>
        </>

      </Modal>
    </div>
  );
}
