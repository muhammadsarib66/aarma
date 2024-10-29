/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AddPlannerApi } from "../../features/slicer/AddPlannerSlicer";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import CInput from "../../components/CustomInput/CInput";

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

export default function PlannerModal() {
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const { isLoading } = useSelector((state: any) => state.AddPlannerSlicer);
  const dispatch = useDispatch();
  const [planner, setPlanner] = useState({
    description: "",
    estCost: "",
    deadline: "",
  });
  const [isOpen, setIsOpen] = useState<any>(false);
  const handleOpen = () => setIsOpen(true);

  const handleChange = (e: any) => {
    setPlanner({ ...planner, [e.target.name]: e.target.value });
  };
  const handleAddPlanner = () => {
    const Planner = {
      bookingId: BookingInfo?.data?._id,
      points: [planner],
    };
    if (
      planner.description === "" ||
      planner.estCost === "" ||
      planner.deadline === ""
    ) {
      toast.error("Please fill all fields");
    } else {
      dispatch(AddPlannerApi(Planner));

      if (!isLoading) {
        handleClose();
        setPlanner({ description: "", estCost: "", deadline: "" });
      }
    }
    console.log("add planner", Planner);
  };
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="font-Poppins">
        <Button
          placeholder={""}
          onClick={handleOpen}
          className="cursor-pointer w-fit px-8 py-2 h-9  bg-primary rounded-full text-white flex items-center gap-2 font-semibold  "
        >
          <i className="font-semibold fa-solid fa-plus"></i>
          Create
        </Button>

        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className=" w-[500px] flex flex-col gap-4" sx={style}>
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold">Plan Creator </h1>
              <span>
                {" "}
                <i
                  className="text-2xl fa-solid fa-times cursor-pointer"
                  onClick={handleClose}
                ></i>
              </span>
            </div>
            <CInput
              type={"text"}
              minDate={false}
              value={planner.description}
              name="description"
              onChange={handleChange}
              placeholder="Enter Plan Description"
            />
            <CInput
              type={"number"}
              minDate={false}
              value={planner.estCost}
              name="estCost"
              onChange={handleChange}
              placeholder="Enter Budget"
            />
            <CInput
              type="date"
              minDate={true}
              value={planner.deadline}
              onChange={handleChange}
              name="deadline"
              placeholder="Enter Deadline"
            />


<span className="flex w-full gap-2">
            <Button className="bg-[#EDEDED] text-gray-700 w-full "   placeholder={''} onClick={handleClose}>
              Cancel
              </Button> 
            <Button className="bg-primary w-full"  placeholder={''} onClick={handleAddPlanner}>
              Add Planner
            </Button>
          </span>
            
          </Box>
        </Modal>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}
