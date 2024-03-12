import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import PrmaryBtn from "./PrmaryBtn";
import { useNavigate } from "react-router-dom";
import { setSaveNext, setValPrev } from "../features/slicer/Slicer";
import { useSelector, useDispatch } from "react-redux";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", marginBottom: 2, alignItems: "center" }}>
      
      <Box sx={{ 
    width: '100%', 
    mr: 1, 
    color: 'red', 
    backgroundColor: 'red',
    '& .MuiLinearProgress-root': { backgroundColor: '#DEDDDD !important'},
    '& .css-5xe99f-MuiLinearProgress-bar1': { backgroundColor: '#FF725E !important'} 
}}>
  <LinearProgress  variant="determinate" {...props} />
</Box>
    </Box>
  );
}

export default function PrograssBar({navigateTo}:any) {
  

  const {Incprogress ,testValue } = useSelector((state :any)=> state.Slicer)
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const HandleNext = () => {


    dispatch(setSaveNext(16.6))
    navigate(`${navigateTo}`)
  };

  const HandleBack = () => {
    dispatch(setSaveNext(-16.6))
  dispatch(setValPrev(1))
    navigate(-1)
  }

  return (
    <Box  sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={Incprogress} sx={{ color: "red" }} />
      <div className="w-full flex justify-between items-center px-8" > 

      <Box>
        <p className="text-sm text-onPrimary">{testValue} out of 6 steps </p></Box>
        <span className="flex gap-2 md:gap-4">

      {Incprogress > 16.6 && (
      <PrmaryBtn  onClick={HandleBack} style=" bg-placeHolder  flex rounded-full w-fit justify-center text-sm md:text-base items-center  text-secondary  p-1 md:px-3 md:py-2 bg-onSecondary"  btnText='Back' />
      )}
      <PrmaryBtn  onClick={HandleNext} style=" bg-primary flex rounded-full w-fit justify-center items-center text-sm md:text-base text-secondary   p-1 md:px-3 md:py-2"  btnText='Save & Continue' />
        </span>
        </div>
    </Box>
  );
}
