import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("logout");
    localStorage.removeItem("ArmaCredienials");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };
  return (
    <section className="pt-20">
      Dashboard
      <Button onClick={handleLogout} variant="contained">
        logout
      </Button>
    </section>
  );
};

export default Dashboard;
