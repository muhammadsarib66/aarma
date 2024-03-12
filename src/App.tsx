import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./screens/About/AboutUs";
import ContactUs from "./screens/ContactUs";
import BusinessDetail from "./screens/Forms/BusinessDetail";
import ContactDetail from "./screens/Forms/ContactDetail";
import Packages from "./screens/Forms/Packages";
import PersonalDetail from "./screens/Forms/PersonalDetail";
import UpoadImages from "./screens/Forms/UpoadImages";
import Home from "./screens/Home/Home"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
    <Router>
    <Navbar/>
    <ScrollToTop />
      <Routes>
      <Route path="/*" element={<Home />} />  
      <Route path="/personaldetail" element={<PersonalDetail/>} />
      <Route path="/contactdetail" element={<ContactDetail/>} />
      <Route path="/businessdetail" element={<BusinessDetail/>} />
      <Route path="/packages" element={<Packages/>} />
      <Route path="/uploadimage" element={<UpoadImages />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/about" element={<AboutUs />} />

      
       </Routes>
    </Router>
    </>

  )
}

export default App
