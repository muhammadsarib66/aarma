/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ProfileUploadCoverApi, setCoverModal } from "../features/slicer/ProfileUploadCoverSlicer";
import { Button, Tooltip } from "@material-tailwind/react";
import { setVerifyModal } from "../features/slicer/ProfileVerifySlicer";
import { modalPortfolioClose } from "../features/slicer/AddPortfolioSlicer";
import { setProfileInfoModal } from "../features/slicer/ProfileInfoSlicer";
import { setProfileModal } from "../features/slicer/ProfileUploadSlicer";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius : '10px',
  p: 4,
};

export default function UploadCoverModal({coverImg}:any) {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state:any)=> state.ProfileUploadCoverSlicer)
    const {coverModal} = useSelector((state:any)=> state.ProfileUploadCoverSlicer);
    
    
  const [selectedCoverImg, setSelectedCoverImg] = useState('');
  const fileInputRefCover = useRef<HTMLInputElement>(null);
  const handleOpen = () => dispatch(setCoverModal(true));
  const handleClose = () =>  {
    setSelectedCoverImg("")
    dispatch(setCoverModal(false))
    dispatch(setVerifyModal(false))
    dispatch(modalPortfolioClose())
   dispatch(setProfileInfoModal(false))
   dispatch(setProfileModal(false))
   dispatch(setCoverModal(false))
   dispatch(modalPortfolioClose())
  };
  // Profile Images
  const handleCover = () => {
    if (fileInputRefCover.current) {
      fileInputRefCover.current.click();
    }
  };
  const handleFileChangeCover = (event: any) => {
    const files: any = event.target.files;
    setSelectedCoverImg(files[0]); // only want to select one file
};
  const handleAddCover = () => {
    const formData = new FormData();
    formData.append('cover', selectedCoverImg);
    // console.log(selectedCoverImg);
    if(!selectedCoverImg){
        toast.error('Please select a file')
    }

    dispatch(ProfileUploadCoverApi(formData))
    setSelectedCoverImg("");
    handleClose();
  };
  return (
    <div>
      {coverImg ? (
        <Tooltip  placement="bottom" content="Upload Cover Picture">

      <span onClick={handleOpen} className="cursor-pointer absolute top-44  md:top-[10.4rem] right-6 md:right-10 w-12 h-12 flex items-center justify-center rounded-full bg-opacity-50 bg-black">
                <i className="fa-solid fa-camera text-2xl text-white"></i>
              </span>
              </Tooltip>

              )

      :(
      <span className="flex gap-3">
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid fa-chevron-right`}></i>
      
        </span>
              )}

      <Modal
        open={coverModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
        {isLoading && <Loader />}
        <Box className=" w-[500px] flex flex-col gap-4" sx={style}>
        <span>
            {/* <i className="fa-solid fa-times text-2xl absolute top-0 right-0 p-2  cursor-pointer " onClick={handleClose}></i> */}
          </span>
          <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-gray-800 font-semibold">

               Adding a new Cover picture</h1>
            <p className="text-xs"> Click the box to add your Cover image to upload </p>
          </div>


          <div  onClick={handleCover}  className="  flex cursor-pointer bg-onSecondary justify-center mt-3  flex-col items-center">
                  <input
              type="file"
              accept="image/*"
              ref={fileInputRefCover}
              onChange={handleFileChangeCover}
              className="hidden"
            />
            {selectedCoverImg ? <img
              src={URL.createObjectURL(new Blob([selectedCoverImg]))}
              className=" h-44 w-full object-cover object-center"
            />
            : (<span className="w-60 flex flex-col items-center gap-4 ">
            <i className="p-4 fa-solid fa-user text-[8rem] text-secondary"></i>
          </span>)}
                  
          </div>
          <span className="flex w-full gap-2">
            <Button className="bg-[#EDEDED] text-gray-700 w-full "   placeholder={''} onClick={handleClose}>
              Cancel
              </Button> 
            <Button className="bg-primary w-full"  placeholder={''} onClick={handleAddCover}>
              Save
            </Button>
          </span>
           
        </Box>
      </>

      </Modal>
    </div>
  );
}
