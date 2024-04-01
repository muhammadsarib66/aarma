import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileInfoModal from "./ProfileInfoModal";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("ArmaCredienials");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };
  const Tabs = [{
    title : "Profile Info fill out Basic profile Info"
},
{
    title:"Profile Picture Upload "
},
{
    title: "COver Photo Upload"
},
{

}]
  return (
    <div className="grid grid-cols-4 gap-4 px-2 ">
  
  <div className="border">

  </div>
  <div className="col-span-3 border p-4 ...">
  <h1 className=' font-bold text-2xl text-onPrimary'> 
            Welcom XYZ <br/>please Complete Your Profile
        </h1>
        <div className='flex flex-col  py-2 gap-4 ' >
            <div className='border rounded-lg h-20 flex items-center bg-onSecondary justify-between px-8' >
                <h2 className='text-xl font-semibold '> Profile Info fill out Basic profile Info </h2>
                <ProfileInfoModal />
            </div>
        </div>
  </div>

</div>
  );
};

export default Dashboard;
