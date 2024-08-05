/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/slicer/Slicer";
import { GetMyProfile } from "../features/slicer/GetMyProfileSlicer";
import { GetPortfolioAPi } from "../features/slicer/GetPorfolioSlicer";
import { Box, Button, Divider, Modal } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import AddPortfolioModal from "./AddPortfolioModal";
import { getAllCatApi } from "../features/slicer/CategorySlicer";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { DeletePortfolioAPi } from "../features/slicer/DeletePortfolio";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
//   width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};


export default function PorfolioAcordion  () {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [deleteItem, setDeleteItem] = useState('' as any)
  const [porfolioItem, setPorfolioItem] = useState<any>('');
  
  const handleClose = () => setOpen(false);
  const handleOpen = (item: SetStateAction<string>) =>{
    setOpen(true);
    setPorfolioItem(item)

  }
  const handleClose1 = () =>{
    setOpen1(false);
  
  }
  const dispatch = useDispatch();
  const { PortfolioData } = useSelector(
    (state: any) => state.GetPorfolioSlicer
  );
  
  const handleDeletePortfolio = (id: any) => {
    setDeleteItem(id)
    setOpen1(true);
    
  };
  const handleDeleteItem = () =>{
    dispatch(DeletePortfolioAPi(deleteItem));
    setOpen1(false);
    
    // setDeleteModal(true)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getAllCatApi() as any); // Add 'as any' to fix the type error
    dispatch(GetMyProfile());
    dispatch(GetPortfolioAPi());
  }, [dispatch]);

  return (
    <div className="px-3 my-10 py-4 bg-onSecondary">
      <div className="flex gap-4 items-center  pb-4 ">
        <h1 className="text-2xl capitalize font-semibold  text-onPrimary ">
          Portfolios{" "}
          {PortfolioData?.length > 0 ? `(${PortfolioData?.length})` : ""}
        </h1>
        <AddPortfolioModal icon={true}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4  place-items-center md:place-items-start ">
      {PortfolioData &&   PortfolioData?.map((item: any , ind : any) => (
  <div  className="group object-center flex flex-col gap-2" key={ind}>
    {item?.photos && item?.photos.length > 0 && (
      <div  onClick={()=>handleOpen(item)}  className="relative group">
        <img
          src={baseUrl + item?.photos[0]}
          className="w-64 sm:w-56 h-48 object-cover border-2 border-gray-300 rounded-xl"
          alt="portfolio image"
        />
        <div className="hidden absolute top-0 group-hover:flex justify-center items-center left-0 w-full h-full bg-opacity-50 bg-black rounded-xl">
          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevent propagation to the parent
              handleDeletePortfolio(item?._id);
            }}
            className="border-green-500 border-2 rounded-full w-12 h-12 flex cursor-pointer items-center justify-center"
          >
            <i className="text-green-500 fa-solid fa-trash text-xl"></i>
          </div>
        </div>
      </div>
    )}
    <p  className="group-hover:underline capitalize text-green-600 font-semibold">
      {item?.title}
    </p>
  </div>
)) }
     </div>
     {
      PortfolioData && PortfolioData.length === 0 &&
    <div className="flex justify-center items-center h-72 bg-secondary rounded-lg">
    <p className="text-2xl text-onPrimary">No Portfolio Added</p>
    </div>
  }
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {/* {isLoading && <Loader />} */}
          <Box sx={style} className="flex flex-col gap-12 h-[90%]  overflow-y-scroll w-[300px]  md:w-[700px]" >
            <div className="flex  justify-between text-2xl font-semibold capitalize">

            <h1> {porfolioItem?.title}</h1>
            <span>
            <i onClick={handleClose} className="cursor-pointer fa-solid fa-xmark"></i>
            </span>
            </div>
            {/* <div className="h-96"> */}

            <Carousel 
              autoplay={true}

              className="rounded-xl border  min-h-[400px]"
              prevArrow={({ handlePrev }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handlePrev}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                  placeholder=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8  text-green-500 "

                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                  variant="text"
                  color="white"
                  size="lg"
                  onClick={handleNext}
                  className="!absolute top-2/4 !right-4 -translate-y-2/4"
                  placeholder=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8  text-green-500 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </IconButton>
              )}  placeholder=''            >
              {
                porfolioItem?.photos?.map((photo: any, ind: any) => {
                  return (
                    <img
                      src={baseUrl + photo}
                      key={ind}
                      alt="portfolio"
                    
                      className="  w-full h-full object-cover "
                   
                    />
                  );
                })
              }
     
    </Carousel>
    {/* </div> */}
    <div className="py-10 flex flex-col gap-4" >
      <div>

      {
        porfolioItem?.total_guests && (
          <p className="text-lg font-semibold text-green-600">Total Guests : <span className="text-onPrimary"> { porfolioItem?.total_guests}</span></p>

        )
      }
      </div>
      <div >

      <p className="text-lg font-semibold text-green-600">Description</p>
      <p className="text-onPrimary">{porfolioItem?.description}</p>
      </div>

    </div>
          </Box>
        </>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=" outline-none border-blue-500 rounded-lg  ">
          <div className="flex   gap-8">

          <h3  className="text-xl pb-4 font-semibold text-onPrimary" >
           Do You want to Delete this Portfolio 
          </h3>
          <span>

          < WarningAmberIcon sx={{fontSize: '30px', color: 'red'}}/>
          </span>
          </div>
          <Divider/>
        

    <div className="flex justify-end gap-4 py-2 ">

          <Button
          color="error"
            // variant="text"
            // color="red"
            onClick={handleClose1}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button sx={{bgcolor: '#4CAF50'}}  variant="contained"  onClick={handleDeleteItem}>
            <span>Yes</span>
          </Button>
          </div>

        </Box>
      </Modal>
    </div>
  );
}
