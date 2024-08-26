/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setIsModelClose } from "../features/slicer/Slicer";
import { useEffect, useState } from "react";
import { createAccountApi } from "../features/slicer/RequestAccountSlicer";
import Loader from "./Loader";
import { VerifyOtpApi } from "../features/slicer/VerifyOtpSlicer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const VerifyMailModel = ({ formData }: any) => {
  const { isModalOpen } = useSelector((state: any) => state.Slicer);
  const { ReqAccData, isLoader } = useSelector(
    (state: any) => state.RequestAccountSlicer
  );

  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [verifyData, setVerifyData] = useState(ReqAccData);
  // console.log(ReqAccData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const handleClose = () => dispatch(setIsModelClose());

  const handleOTPChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input: string = e.target.value;
    // Ensure input is a number
    if (!isNaN(Number(input)) && input !== "") {
      const newOTP: string[] = [...otp];
      newOTP[index] = input;
      setOTP(newOTP);
      // Auto focus to next OTP input field or previous if deleting
      if (index < 5) {
        document.getElementById(`otp${index + 1}`)?.focus();
      } else {
        // Concatenate the OTP digits into a single string
        const otpString: string = newOTP.join("");
        // Use otpString for further processing
        console.log("OTP: ", otpString);
        setVerifyData({
          otp: otpString,
          isEventManager: true,
        });
      }
    }
  };
  const handleConfirmOTP = () => {
    if (otp.join("").length < 6) {
      toast.error("Please Enter 6 digit OTP");
    } else {
      const dataString = localStorage.getItem("formData");
      const data = JSON.parse(dataString as string);

      const Obj = {
        ...data,
        ...verifyData,
      };
      dispatch(VerifyOtpApi(Obj) as any);

      setOTP(["", "", "", "", "", ""]);
    }
  };
  const ResendEmail = () => {
    // console.log(formData);
    dispatch(createAccountApi(formData) as any);
  };

  useEffect(() => {
    if (token) {
      navigate("/Dashboard");
    }
  }, [token]);
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* <div className="w-screen left-0  absolute top-0 bg-red-500 "> */}
          {isLoader && <Loader />}
          {/* </div> */}
          <Box sx={style} className="rounded-3xl w-fit  md:w-[600px] ">
            <div
              className={`flex flex-col justify-center gap-4 items-center md:py-5 md:px-20`}
            >
              <h2 className="text-lg md:text-3xl font-Inter font-bold text-onPrimary">
                Verify Your Email
              </h2>

              <div className="flex gap-1 md:gap-3">
                {/* OTP input fields */}
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp${index}`}
                    type="text"
                    maxLength={1}
                    className="w-8 h-10 focus:ring-1 ring-blue-700 text-center md:w-12 md:h-16 bg-onSecondary rounded-lg"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e)}
                  />
                ))}
              </div>

              <div>
                <p className="md:text-justify text-xs  w-fit max-w-[337px]">
                  To verify your account, check your email at{" "}
                  <span className="underline font-bold">
                    {ReqAccData && ReqAccData.email}{" "}
                  </span>
                  . we send a OTP. If you can’t see it, check your spam folder
                </p>
              </div>
              <div>
                <button
                  onClick={handleConfirmOTP}
                  className={`h-8 md:h-12    w-full px-4 md:px-0 md:min-w-[337px]
                 bg-primary rounded-lg flex justify-center items-center text-secondary`}
                >
                  Confirm OTP
                </button>
              </div>
              <p className=" text-xs md:text-xs w-fit max-w-[337px]">
                Didn't receive it yet?
                <span
                  onClick={ResendEmail}
                  className="text-blue-800 cursor-pointer"
                >
                  {" "}
                  Resend{" "}
                </span>{" "}
                the OTP to email
              </p>
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
};

export default VerifyMailModel;
