import Navbar from "./components/Navbar"
import BusinessDetail from "./screens/Forms/BusinessDetail";
import ContactDetail from "./screens/Forms/ContactDetail";
import PersonalDetail from "./screens/Forms/PersonalDetail";
import Home from "./screens/Home/Home"
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
      <Route path="/*" element={<Home />} />  
      <Route path="/personaldetail" element={<PersonalDetail/>} />
      <Route path="/contactdetail" element={<ContactDetail/>} />
      <Route path="/businessdetail" element={<BusinessDetail/>} />
       </Routes>
    </Router>
    </>

  )
}

export default App
