/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
import { Button, Input, Textarea, Tooltip } from "@material-tailwind/react";
import InputField from "../../components/InputField";
import { Select, Option } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import { updateActivityApi } from "../../features/slicer/UpdateActivitySlicer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ActivityModal() {

  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const { isLoading } = useSelector((state: any) => state.UpdateActivitySlicer);
  const bookingId =  BookingInfo?.data?._id
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<any>(false);
  const Planner = BookingInfo?.data?.plannerPoints;
  const [plannerPoint, setSelectedPLanner] = useState("");
  const [message, setMessage] = useState("");
  const [cost, setCost] = useState("");
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const handleChangeFile = (e: any) => {
    const selectedFile = e.target.files[0];

    // Create a URL for the selected file
    const fileURL = URL.createObjectURL(selectedFile);
    setFileURL(fileURL);
    setFile(e.target.files[0]);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    if (message !== "" && cost !== "" && file !== "" && plannerPoint !== "") {
      const formData = new FormData();
      formData.append("plannerPoint", plannerPoint);
      formData.append("bookingId", BookingInfo?.data?._id);
      formData.append("message", message);
      formData.append("cost", cost);
      formData.append("file", file);
      dispatch(updateActivityApi({formData, bookingId}));

      console.log(message, cost, plannerPoint, BookingInfo?.data?._id);
      // toast.success("Activity Added Successfully");
      handleClose();
    } else {
      toast.error("please fill all fields");
    }
  };

  console.log(plannerPoint);
  return (
    <>
      <div>
        <Tooltip placement="bottom" content="update Activity">
          <div
            onClick={handleOpen}
            className="cursor-pointer w-16 h-16 bg-black rounded-full text-white flex items-center justify-center text-2xl fixed bottom-12 right-20"
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        </Tooltip>

        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className=" w-[500px] flex flex-col gap-4" sx={style}>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Activity </h1>
              <span> <i className="text-2xl cursor-pointer fa-solid fa-xmark " onClick={handleClose}></i>
               </span>
            </div>
            <Textarea  value={message}
              onChange={(e:any) => setMessage(e.target.value)}
              label="Activity Message"
              className=""
              />
            
            <InputField
              type="number"
              value={cost}
              onChange={(e:any) => setCost(e.target.value)}
              label="cost"
              placeholder="Enter Cost"
            />
            <div className="w-full ">
              <Select
                placeholder={''} // Add the missing placeholder property
                onChange={(e: any) => setSelectedPLanner(e)}
                label="Select Planner"
                className=" bg-onSecondary"
              >
                {Planner &&
                  Planner.map((item: any) => (
                    (item.isFinished !== true)? <Option value={item._id}>{item.description}</Option> :''

                    
                    // <Option value={item._id}>{item.description}</Option>
                  ))}
              </Select>
            </div>
            <Input required placeholder={""} type="file" accept=".pdf" onChange={handleChangeFile} crossOrigin="" />
          
            <div>
              {fileURL && (
                <div>
                  <iframe
                    src={fileURL}
                    width="300"
                    height="200"
                    title="PDF Preview"
                  ></iframe>
                </div>
              )}
            </div>
            <Button placeholder={"update Activity"} onClick={handleSubmit}>
              update Activity
            </Button>
          </Box>
        </Modal>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}
