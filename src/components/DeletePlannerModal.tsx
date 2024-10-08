/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Divider } from "@mui/material";
import { DeletePlannerApi } from "../features/slicer/DeletePlannerSlicer";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  borderRadius: "4px",
};

const DeletePlannerModal = ({ id, open, closeModel }: any) => {
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const dispatch = useDispatch();
  const handleDeletePlanner = () => {
    const Obj = {
      id,
      BookingID: BookingInfo?.data?._id,
    };
    console.log("dlt planner id", id);
    dispatch(DeletePlannerApi(Obj));
    handleClose();
  };
  const handleClose = () => closeModel();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="p-4 flex flex-col justify-between gap-4 h-40 ">
          <p className="text-xl font-semibold text-onPrimary ">
            Do you want to delete this planner?
          </p>
          <Divider />
          <div className="flex gap-4 justify-end">
            <Button
              onClick={() => closeModel()}
              size="small"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeletePlanner}
              size="small"
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeletePlannerModal;
