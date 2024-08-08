/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
import Home from "./screens/Home/Home";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCatApi } from "./features/slicer/CategorySlicer";
import { GetMyProfile } from "./features/slicer/GetMyProfileSlicer";
import Dashboard2 from "./screens/Dashboard2/Dashboard2"
import { ToastContainer } from "react-toastify";
// import 'rsuite/dist/rsuite.min.css'; 
function App() {
  const dispatch = useDispatch();

  const { UserData } = useSelector((state: any) => state.LoginSlicer);
  console.log(UserData, "UserData")
  // const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (token) {
      try {
        // Automatically log in with saved credentials
        // dispatch(LoginAccApi(parsedCredentials));
        // dispatch(LoginAccApi(UserData))
        // Navigate to "/Operations2"
        dispatch<any>(getAllCatApi());
        dispatch(GetMyProfile());
        // navigate("/Dashboard");
      } catch (error: any) {
        console.error("Error parsing saved credentials:", error.message);
      }
    }
  }, []);

  return (
    <>
    
      {!token &&
      (
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
            {
              token && 
              <>
              <Dashboard2 />
              </>
            }

      
<ToastContainer />
    </>
  );
}

export default App;
