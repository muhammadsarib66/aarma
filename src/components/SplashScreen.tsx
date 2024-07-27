/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
import { useSelector ,useDispatch} from "react-redux";
import { modalPortfolio } from "../features/slicer/AddPortfolioSlicer";
import { Divider } from "@mui/material";
import { setProfileModal } from "../features/slicer/ProfileUploadSlicer";
import { setProfileInfoModal } from "../features/slicer/ProfileInfoSlicer";
import { setCoverModal } from "../features/slicer/ProfileUploadCoverSlicer";
import { setVerifyModal } from "../features/slicer/ProfileVerifySlicer";
 
export function SplashScreen() {
  const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  const dispatch = useDispatch();
    // console.log(ProfileData?.portfolio)
  const [open, setOpen] = React.useState(true);
  
  const handleOpen1 = () => {
    if (!ProfileData?.bio) {
      // toast.error('Please complete Profile info');
      dispatch(setProfileInfoModal(true));
    }
    if (!ProfileData?.profile) {
      // toast.error('no profile picture attached');
      dispatch(setProfileModal(true));
    }
    if (!ProfileData?.coverPhoto) {
      // toast.error('no cover photo attached');
      dispatch(setCoverModal(true))
    }
    if (!ProfileData?.id_card) {
      // toast.error('no documents attached');
      dispatch(setVerifyModal(true))
    }
    if (!(ProfileData?.portfolio?.length && ProfileData?.portfolio.length > 0)) {
      // toast.error('no portfolio added');

      dispatch(modalPortfolio());
    }
    setOpen(false);
    // ProfileData?.portfolio.length > 0 ? '' : setOpen(false);
  };
    const handleClose = () => {
      setOpen(false);
    }
  return (
    <>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" outline-none border-blue-500 rounded-lg  ">
          <h3  className="text-2xl pb-4 font-semibold text-onPrimary" >
          Alert Complete Your Profile 
          </h3>
          <Divider/>
          <p  className="p-4">
          Please Complete all steps to complete Your profile Information. Or you can skip and do it later.
          </p>
          <Divider/>

    <div className="flex justify-end py-2 ">

          <Button
          color="error"
            // variant="text"
            // color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button sx={{bgcolor: '#4CAF50'}}  variant="contained"  onClick={handleOpen1}>
            <span>continue</span>
          </Button>
          </div>

        </Box>
      </Modal>
    
    </>
  );
}