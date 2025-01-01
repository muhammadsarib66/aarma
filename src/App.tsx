/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import CustomToast from "./components/CustomToast";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Dashboard2 from "./screens/Dashboard2/Dashboard2";

import { getAllCatApi } from "./features/slicer/CategorySlicer";
import { GetMyProfile } from "./features/slicer/GetMyProfileSlicer";
import { GetBookingApi } from "./features/slicer/GetBookingSlicer";
import { socket, baseUrl, token, userData } from "./features/slicer/Slicer";

import notisound from "./audio/notificationsound.mp3";

const App: React.FC = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      try {
        dispatch(getAllCatApi() as any);
        dispatch(GetMyProfile());
      } catch (error: any) {
        toast.error(`Error parsing saved credentials: ${error.message}`);
      }

      socket.emit("join", { userId: userData?._id, role: "event-manager" });
    }
  }, [dispatch, token, userData]);

  const playNotificationSound = () => {
    const audio = new Audio(notisound);
    audio.play();
  };
  useEffect(() => {

    const handleNewMessage = (data: any) => {
      console.log(data,'sssss')
      if (data?.sender?._id == userData?._id) return;

      const profile = data?.sender?.profile
        ? `${baseUrl}${data.sender.profile}`
        : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

      toast.success(
        <CustomToast
          messageContent={data.messageContent}
          senderImage={profile}
          senderName={data.sender.fullname}
        />,
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
      playNotificationSound();
    };

    socket.on("all-bookings-update", (data) => {
      console.log("Updated booking data:", data);
    });
    socket.on("message-detected", handleNewMessage);
    socket.on("booking-canceled", () => {
      dispatch(GetBookingApi());
      console.log("Booking canceled");
    });
    socket.on("booking-update", (data) => {
      console.log("Booking update:", data);
      dispatch(GetBookingApi());
    });
    socket.on("offer-updated", (data) => {
      console.log("Offer updated:", data);
    });

    return () => {
      socket.off("message-detected", handleNewMessage);
      socket.off("offer-updated", (data) => {
        console.log("Offer updated:", data);
      });
    };
  }, [dispatch, userData]);

  return (
    <>
      {!token ? (
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : (
        <Dashboard2 />
      )}
    </>
  );
};

export default App;