/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ProfileUploadProfileApi, setProfileModal } from "../features/slicer/ProfileUploadSlicer";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { Tooltip } from "@material-tailwind/react";
import { setCoverModal } from "../features/slicer/ProfileUploadCoverSlicer";
import { setVerifyModal } from "../features/slicer/ProfileVerifySlicer";
import { modalPortfolioClose } from "../features/slicer/AddPortfolioSlicer";
import { setProfileInfoModal } from "../features/slicer/ProfileInfoSlicer";

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

export default function UploadProfileModel({profileImg}: any) {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state:any)=> state.ProfileUploadSlicer)
    const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);
    const { profilemodal } = useSelector((state: any) => state.ProfileUploadSlicer);

  const [selectedProfileImg, setSelectedProfileImg] = useState("");

  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  const handleOpen = () => dispatch(setProfileModal(true));
  const handleClose = () => {
    dispatch(setCoverModal(false))
    dispatch(setVerifyModal(false))
    dispatch(modalPortfolioClose())
   dispatch(setProfileInfoModal(false))
   dispatch(setProfileModal(false))
  };
  // Profile Images
  const handleProfile = () => {
    if (fileInputRefProfile.current) {
      fileInputRefProfile.current.click();
    }
  };
  const handleFileChangeProfile = (event: any) => {
    const files: any = event.target.files;
    setSelectedProfileImg(files[0]); // only want to select one file
  };
  const handleAddProfile = () => {
    
    const formData = new FormData();
    formData.append('profile', selectedProfileImg);
    console.log(selectedProfileImg);
    if(!selectedProfileImg){
        toast.error('Please select a file')
    }
    else{

      dispatch(ProfileUploadProfileApi(formData))
      setSelectedProfileImg("");
      handleClose();
    }
    // handleClose();
  };
  return (
    <div>
      {profileImg ?
    (
      <Tooltip content="Add Profile" placement="bottom">

      <span onClick={handleOpen} className="cursor-pointer absolute  top-12  md:top-36  left-16 md:left-40 w-12 h-12 flex items-center justify-center rounded-full bg-opacity-50 bg-black">
                <i className="fa-solid fa-camera text-lg md:text-2xl text-white"></i>
              </span>
      </Tooltip>
              )
    :
    (

    
       <span className="flex gap-3">
      <i className={`fa-solid ${ ProfileData?.profile && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-green-500" : "text-gray-300"} text-2xl fa-circle-check`}></i>
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid ${profilemodal?"fa-chevron-up" :"fa-chevron-down"}`}></i>
      
        </span>
        )  }
      <Modal
        open={profilemodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
        {isLoading && <Loader />}
        <Box className=" w-[300px]  md:w-[500px] flex flex-col gap-4"  sx={style}>
          <span>
            <i className="fa-solid fa-times text-2xl absolute top-0 right-0 p-2  cursor-pointer " onClick={handleClose}></i>
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold"> Adding a new profile picture</h1>
            <p className="text-sm"> Click the box to add your image to upload </p>
          </div>
          <div onClick={handleProfile} className="  flex cursor-pointer bg-onSecondary justify-center mt-3  flex-col items-center">
           
              <input
                type="file"
                accept="image/*"
                ref={fileInputRefProfile}
                onChange={handleFileChangeProfile}
                className="hidden"
              />
              {selectedProfileImg ? (
                <img
                  src={URL.createObjectURL(new Blob([selectedProfileImg]))}
                  className=" h-44 w-full object-cover object-center    "
                />
              ) : (
                <span className="w-60 flex flex-col items-center gap-4 ">
                  <i className="p-4 fa-solid fa-user text-[8rem] text-secondary"></i>
                </span>
              )}
            
            {/* <p className="text-xl font-semibold  opacity-10">Add Profile</p> */}
          </div>
          <span className="flex justify-end gap-2">
            <Button onClick={handleClose}>
              Cancel
              </Button> 
            <Button variant="contained" onClick={handleAddProfile}>
              Save
            </Button>
          </span>
        </Box>
      </>

      </Modal>
    </div>
  );
}
