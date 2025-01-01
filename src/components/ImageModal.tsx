/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsImageFilterOpen } from "../features/slicer/Slicer";
 
export function ImageModal({Image}:any) {
    const dispatch = useDispatch();
  const {ImageFilterOpen} =useSelector((state:any)=>state.Slicer)
 
  const handleOpen = () => dispatch(setIsImageFilterOpen(false));
 
  return (
    <>
    
      <Dialog
      placeholder={''}
      open={ImageFilterOpen} handler={handleOpen}>
        
          {Image &&
           
          <img src={Image} alt="image" className="w-full  h-full" />
          }

        
      </Dialog>
    </>
  );
}