import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { ProfileVerificationApi } from "../features/slicer/ProfileVerifySlicer";
import { Tooltip } from "@material-tailwind/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function ProfileVeriModal({icon}:any) {
  const dispatch = useDispatch();
  const {ProfileData} = useSelector((state:any)=> state.GetMyProfileSlicer);

  const { isLoading } = useSelector((state: any) => state.ProfileVerifySlicer);
  const [open, setOpen] = useState(false);
  const [selectedIdCardImg, setSelectedIdCardImg] = useState("");
  const [selectedDocImg, setSelectedDocImg] = useState("");
  const fileInputRefId = useRef<HTMLInputElement>(null);
  const fileInputRefDoc = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handleAddCover = () => {
    const formData = new FormData();
    formData.append("idCard", selectedIdCardImg);
    formData.append("verifDocument", selectedDocImg);
    console.log(selectedIdCardImg);
    console.log(selectedDocImg);
    if (!selectedIdCardImg || !selectedDocImg) {
      toast.error("Please select a file");
    }

    dispatch(ProfileVerificationApi(formData));
    setSelectedIdCardImg("");
    setSelectedDocImg("");
      
  };
  return (
    <div>
      {icon ?    (<Tooltip content="Re-submit Doc">

<i  onClick={handleOpen} className="cursor-pointer pl-2 text-green-500 fa-solid fa-file-pen"></i>
</Tooltip>):
(
      <span className="flex gap-3">
      <i className={`fa-solid ${ ProfileData?.verif_document && ProfileData?.id_card && ProfileData?.email  && ProfileData?.firstName&& ProfileData?.lastName ?"text-green-500" : "text-gray-300"} text-2xl fa-circle-check`}></i>
      <i onClick={handleOpen} className={` cursor-pointer text-2xl fa-solid ${open?"fa-chevron-up" :"fa-chevron-down"}`}></i>
      
        </span>
 )
}
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {isLoading && <Loader />}
          <Box className="w-[300px]  md:w-[500px]" sx={style}>
            <h1 className="text-xl font-bold text-onPrimary">
              Attach Documents
            </h1>
            <div className="  flex  flex-col md:flex-row pb-4 justify-center  gap-3 items-center">
              <div
                onClick={handleIDCard}
                className="mt-10 cursor-pointer  flex flex-col justify-around items-center bg-onSecondary h-40 rounded-md"
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
                    className=" max-h-40 w-40   object-cover object-fit rounded-md"
                  />
                ) : (
                  <span className="w-60 flex flex-col items-center gap-4 ">
                    <p className="text-2xl font-semibold  opacity-10">
                      ID Card Front
                    </p>
                  </span>
                )}
              </div>
              <div
                onClick={handleDocImg}
                className="mt-10 cursor-pointer  flex flex-col justify-around items-center bg-onSecondary h-40 rounded-md"
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
                    className=" max-h-40 w-40  object-cover object-fit rounded-md"
                  />
                ) : (
                  <span className="w-60 flex flex-col items-center gap-4 ">
                    <p className="text-2xl font-semibold  opacity-10">
                      Doc Image
                    </p>
                  </span>
                )}
              </div>
            </div>
            <span className="flex justify-center">
              <Button variant="contained" onClick={handleAddCover}>
                upload Attached Documents
              </Button>
            </span>
          </Box>
        </>
      </Modal>
    </div>
  );
}
