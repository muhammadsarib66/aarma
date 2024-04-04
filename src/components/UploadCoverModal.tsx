import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ProfileUploadCoverApi } from "../features/slicer/ProfileUploadCoverSlicer";
import { Tooltip } from "@material-tailwind/react";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function UploadCoverModal({coverImg}:any) {
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state:any)=> state.ProfileUploadCoverSlicer)
    const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);
  
    const [open, setOpen] = useState(false);
  const [selectedCoverImg, setSelectedCoverImg] = useState('');
  const fileInputRefCover = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
    console.log(selectedCoverImg);
    if(!selectedCoverImg){
        toast.error('Please select a file')
    }

    dispatch(ProfileUploadCoverApi(formData))
    setSelectedCoverImg("");
    // handleClose();
  };
  return (
    <div>
      {coverImg ? (
        <Tooltip  placement="bottom" content="Upload Cover Picture">

      <span onClick={handleOpen} className="cursor-pointer absolute top-44  md:top-56 right-6 md:right-14 w-12 h-12 flex items-center justify-center rounded-full bg-opacity-50 bg-black">
                <i className="fa-solid fa-camera text-2xl text-white"></i>
              </span>
              </Tooltip>

              )

      :(
      <span className="flex gap-3">
      <i className={`fa-solid ${ ProfileData?.coverPhoto && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-green-500" : "text-gray-300"} text-2xl fa-circle-check`}></i>
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid ${open?"fa-chevron-up" :"fa-chevron-down"}`}></i>
      
        </span>
              )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><>
        {isLoading && <Loader />}
        <Box sx={style}>
          <div className="  flex  pb-4 justify-center flex-col items-center">
          <div onClick={handleCover} className="mt-10 cursor-pointer  flex flex-col justify-around items-center bg-onSecondary h-40 rounded-md">
                  <input
              type="file"
              accept="image/*"
              ref={fileInputRefCover}
              onChange={handleFileChangeCover}
              className="hidden"
            />
            {selectedCoverImg ? <img
              src={URL.createObjectURL(new Blob([selectedCoverImg]))}
              className=" max-h-36 w-full  object-cover object-fit rounded-md"
            />
            :<span className="w-60 flex flex-col items-center gap-4 ">
              <p className="text-2xl font-semibold  opacity-10">
            ADD Cover Photo
              </p>
            </span>}
                  </div>
          </div>
          <span className="flex justify-center">
            <Button variant="contained" onClick={handleAddCover}>
              upload Cover picture
            </Button>
          </span>
        </Box>
      </>

      </Modal>
    </div>
  );
}
