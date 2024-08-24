/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
import { Button, Tooltip } from "@material-tailwind/react";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { AddPlannerApi } from "../../features/slicer/AddPlannerSlicer";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";

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
      <div>
        <Tooltip placement="bottom" content="Add Planner">
          <div
            onClick={handleOpen}
            className="cursor-pointer w-16 h-16 bg-black rounded-full text-white flex items-center justify-center text-2xl fixed bottom-12 right-12"
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
            <InputField
              value={planner.description}
              Name="description"
              onChange={handleChange}
              label="Plan Title"
              placeholder="Enter Plan Description"
            />
            <InputField
              type="number"
              value={planner.estCost}
              Name="estCost"
              onChange={handleChange}
              label="Plan Budget"
              placeholder="Enter Budget"
            />
            <InputField
              value={planner.deadline}
              Name="deadline"
              onChange={handleChange}
              type="date"
              label="Plan Deadline"
              placeholder="Enter Deadline"
            />
            <Button placeholder={"Add Planner"} onClick={handleAddPlanner}>
              {" "}
              Add Planner
            </Button>
          </Box>
        </Modal>
      </div>
      {isLoading && <Loader />}
      <ToastContainer />
    </>
  );
}
