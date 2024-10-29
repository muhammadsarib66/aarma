/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
import { Button, Textarea } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import {  toast } from "react-toastify";
import { CompleteReqApi } from "../../features/slicer/CompleteReqSlicer";

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

export default function CompleteReqModal() {
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const { isLoading } = useSelector((state: any) => state.CompleteReqSlicer);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState<any>(false);
  const handleOpen = () => setIsOpen(true);

  const handleSendComReq = () => {
    const Obj = {
      bookingId: BookingInfo?.data?._id,
      message,
    };
    if (message === "") {
      toast.error("Please write Message first");
    } else {
      dispatch(CompleteReqApi(Obj));
      if (!isLoading) {
        handleClose();
        setMessage("");
      }
    }
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div>
        <Button placeholder={''} onClick={handleOpen} 
            className=" cursor-pointer w-fit h-9 px-8 py-2  bg-primary rounded-full text-white flex items-center gap-2 font-semibold  "
>        
          Complete Request
        </Button>

        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className=" w-[500px] flex flex-col gap-4" sx={style}>
            <div className="flex justify-between">
              <h1 className="text-2xl text-gray-800 font-semibold">
                Sending Completion Request{" "}
              </h1>
              {/* <span>
                {" "}
                <i
                  className="text-2xl fa-solid fa-times cursor-pointer"
                  onClick={handleClose}
                ></i>
              </span> */}
            </div>
            <p> Enter Message</p>
            <Textarea
              value={message}
              onChange={(e: any) => setMessage(e.target.value)}
              label="Activity Message"
              className=""
            />
            <span className="flex w-full gap-2">
            <Button className="bg-[#EDEDED] text-gray-700 w-full "   placeholder={''} onClick={handleClose}>
              Cancel
              </Button> 
            <Button className="bg-primary w-full"  placeholder={''} onClick={handleSendComReq}>
              Complete
            </Button>
          </span>
           
          </Box>
        </Modal>
      </div>
      {isLoading && <Loader />}
    </>
  );
}
