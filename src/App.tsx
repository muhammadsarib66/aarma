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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Dashboard/Dashboard";
import { useEffect, useState } from "react";
function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token]);
  return (
    <>
      
      <Router>
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
            )
          }
          {token && (
            <>
            <Route exact path="/*" element={<Dashboard />} />
            </>
          )}

          </>
        </Routes>
      </Router>
      
    </>
  );
}

export default App;

{/* <Route path="/personaldetail" element={<PersonalDetail/>} />
<Route path="/contactdetail" element={<ContactDetail/>} />
<Route path="/businessdetail" element={<BusinessDetail/>} />
<Route path="/packages" element={<Packages/>} />
<Route path="/uploadimage" element={<UpoadImages />} />
*/}