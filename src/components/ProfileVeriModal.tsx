/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ProfileVerificationApi, setVerifyModal } from "../features/slicer/ProfileVerifySlicer";
import { Button, Tooltip } from "@material-tailwind/react";
import { modalPortfolioClose } from "../features/slicer/AddPortfolioSlicer";
import { setProfileInfoModal } from "../features/slicer/ProfileInfoSlicer";
import { setProfileModal } from "../features/slicer/ProfileUploadSlicer";
import { setCoverModal } from "../features/slicer/ProfileUploadCoverSlicer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function ProfileVeriModal({icon}:any) {
  const dispatch = useDispatch();
  // const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);
  const { isLoading ,docModal } = useSelector((state: any) => state.ProfileVerifySlicer);

  const [selectedIdCardImg, setSelectedIdCardImg] = useState("");
  const [selectedDocImg, setSelectedDocImg] = useState("");
  const fileInputRefId = useRef<HTMLInputElement>(null);
  const fileInputRefDoc = useRef<HTMLInputElement>(null);
  const handleOpen = () => dispatch(setVerifyModal(true));
  const handleClose = () =>{
     dispatch(setVerifyModal(false))
     dispatch(modalPortfolioClose())
    dispatch(setProfileInfoModal(false))
    dispatch(setProfileModal(false))
    dispatch(setCoverModal(false))
    dispatch(modalPortfolioClose())
    };
  // Profile Images
  const handleIDCard = () => {
    if (fileInputRefId.current) {
      fileInputRefId.current.click();
    }
  };
  const handleFileChangeIdCard = (event: any) => {
    const files: any = event.target.files;
    setSelectedIdCardImg(files[0]); // only want to select one file
  };
  const handleDocImg = () => {
    if (fileInputRefDoc.current) {
      fileInputRefDoc.current.click();
    }
  };
  const handleFileChangeDocImg = (event: any) => {
    const files: any = event.target.files;
    setSelectedDocImg(files[0]); // only want to select one file
  };
  const handleAddDocs = () => {
    if (!selectedIdCardImg || !selectedDocImg) toast.error("Please select a file");
    
    else{const formData = new FormData();
    formData.append("idCard", selectedIdCardImg);
    formData.append("verifDocument", selectedDocImg);
    console.log(selectedIdCardImg);
    console.log(selectedDocImg);

    dispatch(ProfileVerificationApi(formData));
    setSelectedIdCardImg("");
    setSelectedDocImg("");
    handleClose();
    }
  };
  return (
    <div>
      {icon ?    (
        <Tooltip content="Re-submit Doc">

<i  onClick={handleOpen} className="cursor-pointer pl-2 text-green-500 fa-solid fa-file-pen"></i>
</Tooltip>):
(
      <span className="flex gap-3">
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid fa-chevron-right`}></i>
      
        </span>
 )
}
 <Modal
        open={docModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {isLoading && <Loader />}
          <Box className="w-[300px]  md:w-[500px] flex flex-col gap-4" sx={style}>
          <span>
              {/* <i
                className="fa-solid fa-times text-2xl absolute top-0 right-0 p-2  cursor-pointer "
                onClick={handleClose}
              ></i> */}
            </span>
            <div className="flex flex-col gap-2">
          <h1 className="text-2xl text-gray-800 font-semibold">

                {" "}
                Adding a Verification Documents
              </h1>
              <p className="text-xs">
                {" "}
                Click the boxes to add your ID Card & Document image to upload{" "}
              </p>
            </div>
            <div className="  flex  flex-col md:flex-row pb-4 justify-center w-full md:gap-3 items-center">
              <div
                onClick={handleIDCard}
                className="mt-3 md:mt-10 cursor-pointer h-40 w-full flex flex-col justify-around items-center bg-onSecondary rounded-md"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefId}
                  onChange={handleFileChangeIdCard}
                  className="hidden"
                />
                {selectedIdCardImg ? (
                  <img
                    src={URL.createObjectURL(new Blob([selectedIdCardImg]))}
                    className=" h-40 max-h-40 w-full   object-cover object-fit rounded-md"
                  />
                ) : (
                  <span className="w-full flex flex-col items-center gap-4 ">
            <i className="p-4 fa-solid fa-user text-[5rem] text-secondary"></i>
          </span>
                )}
              </div>
              <div
                onClick={handleDocImg}
                className=" mt-3 md:mt-10 cursor-pointer  h-40 w-full flex flex-col justify-around items-center bg-onSecondary  rounded-md"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRefDoc}
                  onChange={handleFileChangeDocImg}
                  className="hidden"
                />
                {selectedDocImg ? (
                  <img
                    src={URL.createObjectURL(new Blob([selectedDocImg]))}
                    className=" h-40 max-h-40 w-full  object-cover object-fit rounded-md"
                  />
                ) : (
                  <span className="w-full flex flex-col items-center gap-4 ">
                <i className="p-4 fa-solid fa-file text-[5rem] text-secondary"></i>
              </span>
                )}
              </div>
            </div>
            
            <span className="flex w-full gap-2">
            <Button className="bg-[#EDEDED] text-gray-700 w-full "   placeholder={''} onClick={handleClose}>
              Cancel
              </Button> 
            <Button className="bg-primary w-full"  placeholder={''} onClick={handleAddDocs}>
              Save
            </Button>
          </span>
          </Box>
        </>
      </Modal>
    </div>
  );
}
