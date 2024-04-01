import { Link, useNavigate } from "react-router-dom";
import PrmaryBtn from "./PrmaryBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("/home");
  const { UserData } = useSelector((state: any) => state.LoginSlicer);
  const isAuthenticated = UserData?.email;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    console.log("logout");
    localStorage.removeItem("ArmaCredienials");
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
  };

  const NavTabs = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "Contact Us",
      link: "/contactus",
    },
    // {
    //   title: "My Business",
    //   link: "/dashboard",
    //   icon: "fa-solid fa-store",
    // },
  ];
  const NavTabs2 = [
    {
      title: "Dashboard",
      link: "/Dashboard",
    },
    {
      title: "Bookings",
      link: "/Bookings",
    },
    {
      title: "Analytics",
      link: "/Analytics",
    },
    // {
    //   title: "My Business",
    //   link: "/dashboard",
    //   icon: "fa-solid fa-store",
    // },
  ];
  const handleOpenNav = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  return (
    <>
      <section className="hidden  fixed md:flex justify-between items-center bg-primary px-4 md:px-20 h-16 md:h-20 w-full z-20 ">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer font-Inter font-bold uppercase text-xl md:text-2xl  text-secondary"
        >
          aarma business
        </h1>
        <div className="flex gap-8  text-primary bg-onSecondary  px-4  lg:px-16  py-2 rounded-full">
          {!isAuthenticated ? (
            <>
              {NavTabs?.map((tab, ind) => (
                <p key={ind} onClick={() => setActiveTab(tab.link)}>
                  <Link
                    className={`${
                      activeTab == tab.link
                        ? "border-b-2 border-primary duration-300 transition text-black"
                        : ""
                    }`}
                    to={tab.link}
                  >
                    {tab.title}

                    {/* {tab?.icon && <i className={`pl-2 ${tab?.icon}`}></i>} */}
                  </Link>
                </p>
              ))}
            </>
          ) : (
            <>
              {NavTabs2?.map((tab, ind) => (
                <p key={ind} onClick={() => setActiveTab(tab.link)}>
                  <Link
                    className={`${
                      activeTab == tab.link
                        ? "border-b-2 border-primary duration-300 transition text-black"
                        : ""
                    }`}
                    to={tab.link}
                  >
                    {tab.title}

                    {/* {tab?.icon && <i className={`pl-2 ${tab?.icon}`}></i>} */}
                  </Link>
                </p>
              ))}
            </>
          )}
        </div>
        <div>
          {!isAuthenticated ? (
            <Link to="/login">
              <PrmaryBtn
                btnText="Login"
                style="bg-secondary text-primary py-1 px-4 rounded-full"
              />
            </Link>
          ) : (
            <div>
              <Avatar
                onClick={handleClick}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose2}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </section>
      <section className="md:hidden fixed flex justify-between items-center bg-primary px-4 md:px-20 h-16 md:h-20 w-full z-20 ">
        <h1
          onClick={() => navigate("/")}
          className="cursor-pointer font-Inter font-bold uppercase text-xl md:text-2xl  text-secondary"
        >
          aarma business
        </h1>
        <div className="cursor-pointer z-40 " onClick={handleOpenNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        <div
          className={` ${
            isOpen ? "top-16 duration-500" : "top-[-1000%] duration-1000"
          } flex  px-4 flex-col  items-start justify-center  md:hidden  bg-onSecondary  left-0    min-h-52 w-[100%]  absolute `}
        >
          <ul className="space-y-2">
            {NavTabs.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setActiveTab(item.link);
                  }}
                  className={` ${
                    activeTab == item.link ? "text-primary " : ""
                  }nav-links`}
                >
                  <Link to={item.link}>
                    {item.title}
                    {/* {item.icon && <i className={`pl-2 ${item.icon}`}></i>} */}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="   pt-4   ">
            <Link to="/login">
              <PrmaryBtn
                style="text-sm  bg-primary text-secondary p-2 rounded-md uppercase"
                btnText="Login "
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
