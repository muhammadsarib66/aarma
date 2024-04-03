/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { toast } from "react-toastify";
import InputField from "./InputField";
import { AddPortfolioApi } from "../features/slicer/AddPortfolioSlicer";
import PrmaryBtn from "./PrmaryBtn";

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

export default function AddPortfolioModal() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.AddPortfolioSlicer);
  const { ProfileData } = useSelector((state: any) => state.GetMyProfileSlicer);
  const [open, setOpen] = useState(false);
  const [portfolioData, setPorfolioData] = useState({
    title: "",
    description: "",
    total_guests: "",
  });
  const [selectedPortfolioImages, setSelectedPortfolioImages] = useState([]);
  const fileInputRefPortfolioImg = useRef<HTMLInputElement>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChangePortfolio = (event : any) => {
    const files = Array.from(event.target.files);
    setSelectedPortfolioImages((prevImages) => [...prevImages, ...files]);
  };

  const handleCover = () => {
    if (fileInputRefPortfolioImg.current) {
      fileInputRefPortfolioImg.current.click();
    }
  };

  const handleChange = (e: any) => {
    setPorfolioData({
      ...portfolioData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPortfolio = () => {
    if (
      !portfolioData.title ||
      !portfolioData.description ||
      !portfolioData.total_guests ||
      !selectedPortfolioImages
    ) {
      toast.error("Please fill all fields");
    } else {
      const formData = new FormData();
      formData.append("title", portfolioData.title);
      formData.append("description", portfolioData.description);
      formData.append("total_guests", portfolioData.total_guests);
      selectedPortfolioImages.forEach((image) => {
        formData.append(`portfolio`, image);
      });
      // formData.append("portfolio", selectedPortfolioImages);
      console.log(formData.get("portfolio0"));
      console.log(formData.get("portfolio1"));
      dispatch(AddPortfolioApi(formData));
      setSelectedPortfolioImages([]);
      setPorfolioData({
        title: "",
        description: "",
        total_guests: "",
      });
    }
  };
  return (
    <div>
      <span className="flex gap-3">
        <i
          className={`fa-solid ${
            ProfileData?.portfolio?.length > 0 &&
            ProfileData?.email &&
            ProfileData?.firstName &&
            ProfileData?.lastName
              ? "text-green-500"
              : "text-gray-300"
          } text-2xl fa-circle-check`}
        ></i>
        <i
          onClick={handleOpen}
          className={` cursor-pointer text-2xl fa-solid ${
            open ? "fa-chevron-up" : "fa-chevron-down"
          }`}
        ></i>
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {isLoading && <Loader />}
          <Box sx={style} className=" w-[300px]  md:w-[500px]">
            <div className="  flex  pb-4 justify-center flex-col ">
              <div>
                <h2 className="text-xl font-semibold capitalize text-onPrimary "> add portfolio detail</h2>
                <label>Title </label>
                <InputField
                  onChange={handleChange}
                  Name="title"
                  placeholder="Enter Title"
                  value={portfolioData?.title}
                />
              </div>
              <div>
                <label>Description </label>
                <InputField
                  onChange={handleChange}
                  Name="description"
                  placeholder="Enter your description"
                  value={portfolioData?.description}
                />
              </div>
              <div>
                <label>Total Guest </label>
                <InputField
                  type="number"
                  onChange={handleChange}
                  Name="total_guests"
                  placeholder="Enter total guest number"
                  value={portfolioData?.total_guests}
                />
              </div>

              <div className="flex gap-2 my-2 h-28 ">
                <div
                  className="bg-onSecondary rounded-lg justify-center  flex items-center p-1 flex-col w-42"
                  onClick={handleCover}
                >
                  <i className="  fa-solid fa-plus"></i>
                  <p className="text-sm text-center">upload Image</p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRefPortfolioImg}
                    onChange={handleFileChangePortfolio}
                    className="hidden"
                    multiple // Allow multiple file selection
                  />
                </div>

                {selectedPortfolioImages.length > 0 && (
                  <div className=" bg-onPrimary p-2 rounded-lg w-fit  h-22 overflow-x-scroll overflow-y-hidden flex gap-4">
                    {selectedPortfolioImages.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        className="h-20 w-20 object-cover  object-center rounded-md"
                        alt={`Portfolio Image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span className="flex justify-center">
              <PrmaryBtn
                style="h-12 flex rounded-lg justify-center items-center bg-[#F33434] px-2   text-secondary"
                onClick={handleAddPortfolio}
                btnText="Upload Portfolio"
              />
              {/* <Button variant="contained" onClick={handleAddPortfolio}>
                Upload Portfolio
              </Button> */}
            </span>
          </Box>
        </>
      </Modal>
    </div>
  );
}
