import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { ProfileUploadProfileApi } from "../features/slicer/ProfileUploadSlicer";
import Loader from "./Loader";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadProfileModel() {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state:any)=> state.ProfileUploadSlicer)
    const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);

    const [open, setOpen] = useState(false);
  const [selectedProfileImg, setSelectedProfileImg] = useState("");
  const fileInputRefProfile = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

    dispatch(ProfileUploadProfileApi(formData))
    setSelectedProfileImg("");
    // handleClose();
  };
  return (
    <div>
       <span className="flex gap-3">
      <i className={`fa-solid ${ ProfileData?.profile && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-green-500" : "text-gray-300"} text-2xl fa-circle-check`}></i>
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid ${open?"fa-chevron-up" :"fa-chevron-down"}`}></i>
      
        </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
        {isLoading && <Loader />}
        <Box sx={style}>
          <div className="  flex  justify-center flex-col items-center">
            <div
              onClick={handleProfile}
              className="  cursor-pointer w  flex flex-col justify-center items-center bg-slate-300 h-36 w-36 rounded-full"
            >
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
                  className=" max-h-36 w-36  object-cover object-fit rounded-full"
                />
              ) : (
                <span className="w-60 flex flex-col items-center gap-4 ">
                  <i className="fa-solid fa-user text-5xl text-secondary"></i>
                </span>
              )}
            </div>
            <p className="text-xl font-semibold  opacity-10">Add Profile</p>
          </div>
          <span className="flex justify-center">
            <Button variant="contained" onClick={handleAddProfile}>
              upload Profile picture
            </Button>
          </span>
        </Box>
      </>

      </Modal>
    </div>
  );
}
