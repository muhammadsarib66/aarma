/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MyProfile from "../Myprofile/MyProfile";
import Dashboard from "../Dashboard/Dashboard";
// import DoghnutChart from "../../components/DoghnutChart";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import { getAllCatApi } from "../../features/slicer/CategorySlicer";
import { GetMyProfile } from "../../features/slicer/GetMyProfileSlicer";
import { GetPortfolioAPi } from "../../features/slicer/GetPorfolioSlicer";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChatScreen from "../ChatScreen/ChatScreen";
import Bookings from "../Booking/Bookings";
import { GetBookingApi } from "../../features/slicer/GetBookingSlicer";
import BoookingDetail from "../Booking/BoookingDetail";
import Calender2 from "../Calender2";
import aarmaLogo from "../../assets/images/aarma.svg";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard2() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { ProfileData, ProfileCompletnes } = useSelector(
    (state: any) => state.GetMyProfileSlicer
  );
  console.log("=====>", ProfileCompletnes);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Calculate the circumference of the circle
  const NavTabs = [
    { title: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
    { title: "Profile", link: "/myprofile", icon: <PersonIcon /> },
    { title: "Bookings", link: "/bookings", icon: <CollectionsBookmarkIcon /> },
    { title: "Calender", link: "/calender", icon: <CalendarMonthIcon /> },
    { title: "Chat", link: "/chats", icon: <ChatIcon /> },
    { title: "Analytics", link: "/analytics", icon: <BarChartIcon /> },
  ];
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getAllCatApi() as any); // Add 'as any' to fix the type error
    dispatch(GetMyProfile());
    dispatch(GetPortfolioAPi());
    dispatch(GetBookingApi());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{ bgcolor: "#FF725E", color: "white" }}
          position="fixed"
          open={open}
        >
          <div className="  shadow-md z-40 flex justify-between pr-10">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                AARMA Event Portal
              </Typography>
            </Toolbar>
            <div className="flex items-center gap-4 font-semibold ">
              <Avatar
                className="cursor-pointer bg-white"
                alt="User"
                src={baseUrl + ProfileData?.profile}
              />
              <p> {ProfileData?.fullname}</p>
            </div>
          </div>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <div className="flex w-full justify-between ">
              <span className="text-lg font-semibold flex items-center gap-2">
                <img className="w-8 h-8" src={aarmaLogo} alt="logo" />
                AARMA
              </span>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
          </DrawerHeader>
          <Divider />

          <List>
            {NavTabs.map((item) => (
              <ListItem
                key={item?.title}
                disablePadding
                sx={{
                  display: "block",
                  background: `${
                    location.pathname === item.link ? "#FF725E" : ""
                  }`,
                  color: `${location.pathname === item.link ? "white" : ""}`,
                }}
              >
                {ProfileCompletnes < 100 && item.title !== "Dashboard" ? (
                  // Render a non-clickable ListItem if the condition is met
                  <ListItemButton
                    disabled
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item?.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                ) : (
                  // Render the Link normally if the condition is not met
                  <Link to={item.link}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item?.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            ))}
          </List>
          <Divider />

          <Divider />
          <div className="h-full flex items-end ">
            <ListItem
              onClick={() => {
                localStorage.removeItem("ArmaCredienials");
                localStorage.removeItem("token");
                window.location.reload();
                navigate("/login");
              }}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                {!open && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      pl: 2,
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                )}
                <ListItemText
                  className="text-center p-2 bg-[#FF725E] rounded-lg text-secondary"
                  primary={"Logout"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </div>
        </Drawer>

        <div
          className={`${
            location.pathname === "/chats"
              ? " w-screen h-fit  overflow-hidden "
              : "   p-3 flex flex-col  flex-grow gap-3"
          }`}
        >
          { location.pathname === "/chats" ? null : 
    <DrawerHeader />
          }
          <div className="w-full ">
              <Routes>
                <Route path="/*" element={<Dashboard />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/myprofile" element={<MyProfile />} />
                <Route path="/calender" element={<Calender2 />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/chats" element={<ChatScreen />} />
                <Route path="/bookingsdetail" element={<BoookingDetail />} />
              </Routes>         
          </div>
        </div>
      {/* <ToastContainer /> */}
        
      </Box>
    </>
  );
}


