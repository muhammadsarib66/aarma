/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
import Home from "./screens/Home/Home";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login/Login";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllCatApi } from "./features/slicer/CategorySlicer";
import { GetMyProfile } from "./features/slicer/GetMyProfileSlicer";
import Dashboard2 from "./screens/Dashboard2/Dashboard2";
import { ToastContainer, toast } from "react-toastify";
import notisound from "./audio/notificationsound.mp3"
// import notification from './audio/notification.mp3'
import {  io } from "socket.io-client";
import { baseUrl } from "./features/slicer/Slicer";
import CustomToast from "./components/CustomToast";
// import 'rsuite/dist/rsuite.min.css';
function App() {
  const dispatch = useDispatch();
  const socket = useMemo(() => io(baseUrl), []);
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  // const { UserData } = useSelector((state: any) => state.LoginSlicer);
  // const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        
        dispatch<any>(getAllCatApi());
        dispatch(GetMyProfile());
        // navigate("/Dashboard");
      } catch (error: any) {
        toast.error("Error parsing saved credentials:", error.message);
      }

      socket.emit("join", userData?._id);
    }
  }, []);

  
  useEffect(() => {
    const playNotificationSound = () => {
      const audio = new Audio(notisound);
      audio.play();
    };
  
    const handleNewMessage = (data: any) => {
      if(data?.sender?._id === userData?._id) return;
      const profile = data?.sender?.profile
        ? baseUrl+data?.sender?.profile
        : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
  
      
      toast.success(
        <CustomToast messageContent={data.messageContent} senderImage={profile} senderName={data.sender.fullname} />,

        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
      playNotificationSound();
    };
  
    socket.on("message-detected", handleNewMessage);
  
    return () => {
      socket.off("message-detected", handleNewMessage);
    };
  }, []);
  
  return (
    <>
      {!token && (
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            {!token && (
              <>

                <Route path="/*" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
          </Routes>
        </>
      )}
      {token && (
        <>
          <Dashboard2 />
        </>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
