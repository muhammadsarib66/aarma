import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
// import BusinessDetail from "./screens/Forms/BusinessDetail";
// import ContactDetail from "./screens/Forms/ContactDetail";
// import Packages from "./screens/Forms/Packages";
// import PersonalDetail from "./screens/Forms/PersonalDetail";
// import UpoadImages from "./screens/Forms/UpoadImages";
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
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { UserData } = useSelector((state: any) => state.LoginSlicer);
  const { ProfileData } = useSelector((state: any) => state.GetMyProfile);
  console.log(ProfileData);
  // console.log(token);
  const isAuthenticated = UserData?.email;
  // console.log(isAuthenticated);

  const savedCredentials = localStorage.getItem("ArmaCredienials");

  useEffect(() => {
    // Check if there are saved credentials in local storage

    // console.log(savedCredentials);
    if (savedCredentials) {
      // console.log(savedCredentials);
      try {
        const parsedCredentials = JSON.parse(savedCredentials);
        // Automatically log in with saved credentials
        dispatch(LoginAccApi(parsedCredentials));
        // Navigate to "/Operations2"
        navigate("/Dashboard");
      } catch (error: any) {
        console.error("Error parsing saved credentials:", error.message);
      }
    }
  }, []);

  return (
    <>
      <>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <>
            {!isAuthenticated && (
              <>
                <Route path="/*" element={<Home />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
              </>
            )}
            {isAuthenticated && (
              <>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Analytics" element={<Analatics />} />
                <Route path="/Bookings" element={<Bookings />} />
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
