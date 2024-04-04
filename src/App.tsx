import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
import Home from "./screens/Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import Analatics from "./screens/analatics/Analatics";
import Bookings from "./screens/Booking/Bookings";
import { useEffect } from "react";
import { LoginAccApi } from "./features/slicer/LoginSlicer";
import { getAllCatApi } from "./features/slicer/CategorySlicer";
import { GetMyProfile } from "./features/slicer/GetMyProfileSlicer";
import MyProfile from "./screens/Myprofile/MyProfile";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { UserData } = useSelector((state: any) => state.LoginSlicer);
  // const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  // console.log(ProfileData);
  // console.log(token);
  const isAuthenticated = UserData?.email;
  const token = localStorage.getItem("token");
  // console.log(isAuthenticated);

  const savedCredentials = localStorage.getItem("ArmaCredienials");

  useEffect(() => {
    // Check if there are saved credentials in local storage

    // console.log(savedCredentials);
    if (token) {
      // console.log(savedCredentials);
      try {
        // const parsedCredentials = JSON.parse(savedCredentials);
        // Automatically log in with saved credentials
        // dispatch(LoginAccApi(parsedCredentials));
        // Navigate to "/Operations2"
        dispatch(GetMyProfile())
        dispatch(getAllCatApi())
        navigate("/Dashboard");
      } catch (error: any) {
        console.error("Error parsing saved credentials:", error.message);
      }
      // if(isAuthenticated) return dispatch(GetMyProfile())
    }
  }, []);

  return (
    <>
      <>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <>
            {!token && (
              <>
                <Route path="/*" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
            {token && (
              <>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Analytics" element={<Analatics />} />
                <Route path="/Bookings" element={<Bookings />} />
                <Route path="/myprofile" element={<MyProfile />} />
              </>
            )}
          </>
        </Routes>
      </>
    </>
  );
}

export default App;

{
  /* <Route path="/personaldetail" element={<PersonalDetail/>} />
<Route path="/contactdetail" element={<ContactDetail/>} />
<Route path="/businessdetail" element={<BusinessDetail/>} />
<Route path="/packages" element={<Packages/>} />
<Route path="/uploadimage" element={<UpoadImages />} />
*/
}
