/* eslint-disable @typescript-eslint/no-explicit-any */
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../features/slicer/Slicer";
import axios from "axios";
import { toast } from "react-toastify";
import { GetMyProfile } from "../features/slicer/GetMyProfileSlicer";
import { GetPortfolioAPi } from "../features/slicer/GetPorfolioSlicer";
import { DeletePortfolioAPi } from "../features/slicer/DeletePortfolio";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import AddPortfolioModal from "./AddPortfolioModal";

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


export default function PorfolioAcordion() {
  const [open, setOpen] = useState(false);
  const [porfolioItem, setPorfolioItem] = useState('');
 
  const handleClose = () => setOpen(false);
  const handleOpen = (item) =>{
    setOpen(true);
    setPorfolioItem(item)

  }
  const dispatch = useDispatch();
  const { PortfolioData } = useSelector(
    (state: any) => state.GetPorfolioSlicer
  );
  console.log(PortfolioData);

  const handleDeletePortfolio = (id) => {
    console.log("delete", id);
    dispatch(DeletePortfolioAPi(id));
  };

  return (
    <div className="px-3 my-10 py-4 ">
      <div className="flex gap-4 items-center  pb-4 ">
        <h1 className="text-2xl capitalize font-semibold  text-onPrimary ">
          Portfolios{" "}
          {PortfolioData?.length > 0 ? `(${PortfolioData?.length})` : ""}
        </h1>
        <AddPortfolioModal icon={true}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 md:gap-4  place-items-center md:place-items-start ">
      {PortfolioData?.map((item: any) => (
  <div className="group object-center flex flex-col gap-2" key={item.id}>
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
    <p className="group-hover:underline capitalize text-green-600 font-semibold">
      {item?.title}
    </p>
  </div>
))}

      </div>

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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>
            )}
            >
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
      {/* <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mb-20">
        {PortfolioData?.map((item: any) => {
          return (
            <div className="">
              <Accordion defaultExpanded key={item?._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <h1 className="font-bold uppercase text-onPrimary text-xl">
                   title:  {item?.title}
                  </h1>
                </AccordionSummary>
                <AccordionDetails className="flex flex-col gap-4 h-56 overflow-y-scroll">
                  <div>
                    <span className="font-bold">No Of Guest : </span>
                    {item?.total_guests}
                  </div>
                  <div>

                  <span className="font-bold">Description : </span>
                  {item?.description}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eos sit sapiente. Magni in, vero temporibus eligendi illo laborum nostrum inventore! Aperiam facilis id molestiae totam reprehenderit expedita architecto veniam quam vel.
                  
                  </div>

                  <div>
                    <h1 className="font-bold text-xl mt-2">Portfolio Photos</h1>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {item?.photos?.map((photo: any, ind: any) => {
                      return (
                        <img
                          src={baseUrl + photo}
                          key={ind}
                          alt="portfolio"
                          className=" active:scale-[5] z-10 duration-300  w-40 h-40 object-cover object-center rounded-md"
                        />
                      );
                    })}
                  </div>
                </AccordionDetails>
                <AccordionActions>
                  <Button onClick={() => handleDeletePortfolio(item?._id)}>
                    Delete{" "}
                  </Button>
                </AccordionActions>
              </Accordion>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
