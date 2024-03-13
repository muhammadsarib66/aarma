import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setIsModelClose } from "../features/slicer/Slicer";
import PrmaryBtn from "./PrmaryBtn";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const VerifyMailModel = () => {
  const navigate = useNavigate()
  const { isModalOpen, SignUpData } = useSelector((state: any) => state.Slicer);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setIsModelClose());
  const handleNextPage = ()=>{

    console.log('working')
    navigate('/personaldetail')
    handleClose();
  }

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-3xl w-fit  md:w-[600px] ">
          <div
            className={`flex flex-col justify-center gap-4 items-center md:py-5 md:px-20`}
          >
            <h2 className="text-lg md:text-3xl font-Inter font-bold text-onPrimary">
              Verify Your Email
            </h2>
            <div className="MadalMailIcon md:h-28 h-20 md:w-28 w-20 flex pt-3 md:pt-5 justify-center">
              <i className="fa-solid fa-envelope text-4xl md:text-[50px] text-primary "></i>
            </div>
            <div>
              <p className="md:text-justify text-xs  w-fit max-w-[337px]">
                To verify your account, click the link we sent a link
              to <span className="underline font-bold">{SignUpData && SignUpData.email } </span>. If you can’t see it, check your spam folder
                </p>
            </div>
            <div>
              <PrmaryBtn onClick={handleNextPage} btnText="Continue" style="h-8 md:h-12   w-full px-4 md:px-0 md:min-w-[337px] bg-primary rounded-lg flex justify-center items-center text-secondary" />
            </div>
            <p className=" text-xs md:text-xs w-fit max-w-[337px]">
            Didn't receive it yet?<span className="text-blue-800 cursor-pointer"> Resend </span> or <span className="text-blue-800 cursor-pointer"> Change </span> the e-mail
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default VerifyMailModel;
