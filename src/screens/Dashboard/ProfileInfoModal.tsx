import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProfileInfoModal() {
  const { categoryData } = useSelector((state: any) => state.CategorySlicer);
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [bio , setBio] = useState('')
  const [tagline , setTagline] = useState('')
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (option:any) => {
    // Check if the option is already selected
    const isSelected = selectedOptions.includes(option._id);

    if (isSelected) {
      // If selected, remove its ID from the selected options
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((id) => id !== option._id)
      );
    } else {
      // If not selected, add its ID to the selected options
      setSelectedOptions((prevOptions) => [...prevOptions, option._id]);
    }
  };
  const handlBioChange = (e) => {
    setBio(e.target.value)
  };
  const handleTagChange = (e) => {
    setTagline(e.target.value)
  };
  //   console.log(selectedOptions)
  const addProfileInfo = () => {
    console.log(selectedOptions);
    const Obj = {
         bio,
         tagline,
        categories: selectedOptions,
        };
    console.log(Obj)      
    
    setBio('')
    setTagline('')
    setSelectedOptions([])
    }
  

  return (
    <div>
      <i
        onClick={handleOpen}
        className="text-blue-600 cursor-pointer text-2xl fa-solid fa-pencil"
      ></i>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-2xl font-bold text-onPrimary pb-2">
            Complete Your Bio
          </h1>
          <div>
            <label className="text-onPrimary font-semibold"> Add Bio</label>
            <textarea
            value={bio}
              onChange={handlBioChange}
              className="bg-onSecondary w-full rounded-lg p-3"
              placeholder="Add Your Bio"
            />
          </div>
          <div>
            <label
              
              className="text-onPrimary font-semibold"
            >
              {" "}
              Add tagline
            </label>

            <InputField onChange={handleTagChange} value={tagline} placeholder="add your Tagline" />
          </div>

          <div className="z-20 h-40 my-3 overflow-y-scroll">
            <h2 className="text-xl font-semibold text-onPrimary pb-2 ">
              Select Categories
            </h2>
            {categoryData.map((option) => (
              <div className=" flex gap-3 py-1 " key={option._id}>
                <input
                  type="checkbox"
                  id={option._id}
                  checked={selectedOptions.includes(option._id )}
                  onChange={() => handleChange(option)}
                />
                <label htmlFor={option._id}>{option.label}</label>
              </div>
            ))}
          </div>
          <div className="flex   justify-center ">
            <Button variant="contained" onClick={addProfileInfo}>
              Add Profile Info
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
