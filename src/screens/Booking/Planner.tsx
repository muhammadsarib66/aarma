/* eslint-disable @typescript-eslint/no-explicit-any */

import PlannerModal from "./PlannerModal";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DeletePlannerModal from "../../components/DeletePlannerModal";
import Loader from "../../components/Loader";
import {  Card } from "@material-tailwind/react";
import CompleteReqModal from "./CompleteReqModal";
import { baseUrl } from "../../features/slicer/Slicer";
import { io } from "socket.io-client";
import { BookingInfoApi } from "../../features/slicer/BookingInfoSlicer";
import { toast } from "react-toastify";
import notisound from "../../audio/notificationsound.mp3";
import ProgressBar2 from "../../components/ProgressBar2";

// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const TABLE_HEAD = [
  "Sr.No",
  "Plan Title",
  "Deadline",
  "Status",
  " Budget",
  "Action",
];

const Planner = () => {
   const socket = useMemo(() => io(baseUrl), []);
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [plannerId, setPlannerId] = useState(null);

  const { BookingInfo, isLoading } = useSelector(
    (state: any) => state.BookingInfoSlicer
  );
  const [Planner, setPlanner] = useState<any>(null);

  const handleDelPlanner = (id: any) => {
    setOpen(true);
    setPlannerId(id);
    console.log(id);


  };

  const closeDelPlaModal = () => {
    setOpen(false);
  };

  console.log(BookingInfo);
  useEffect(() => {
    setPlanner(BookingInfo?.data?.plannerPoints);
  }, [BookingInfo]);
  useEffect(() => {
    const handleUpdateActivity = (data: any) => {
      const audio = new Audio(notisound);
      dispatch(BookingInfoApi(data?.data?._id));
      setPlanner(data?.data?.planner);
      audio.play();
      toast.success(data?.message);
    };

    socket.on("booking-updated-by-client", handleUpdateActivity);
    return () => {
      socket.off("booking-updated-by-client", handleUpdateActivity);
    };
  }, [Planner,BookingInfo]);
  return (
    <section className="  ">
      <div className=" h-[60vh] flex flex-col gap-4  overflow-hidden my-4 px-5 mx-8">
        
        <div className="flex justify-between items-center w-full">
          <h1
            className={`${
              BookingInfo?.bookingProgress == "100.00" ? "text-xl" : "text-3xl"
            } capitalize text-gray-800 font-bold p-4`}
          >
            Planner for hosting event Title
          </h1>

          <div>
            {BookingInfo?.bookingProgress == "100.00" ? (
              <div className="flex gap-2 px-2 items-center ">
                <p className="text-primary text-2xl capitalize  text-center font-bold">
                  
                  Seems you have completed All your activity{" "}
                </p>
              
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-fit py-2  flex  gap-2">
        <PlannerModal />
          
            {BookingInfo?.data?.booking_statuscode !== "COMPLETED" &&
            <CompleteReqModal />
          }
          </div>

        </div>
          <div className="w-full">

          <ProgressBar2   bgColor="bg-primary" textColor="text-white" progress={Math.floor(BookingInfo?.bookingProgress)} />
            <p className="w-full text-sm font-semibold text-gray-700 text-end pr-2">{BookingInfo?.bookingProgress ? Math.floor(BookingInfo?.bookingProgress)+"%" :'refresh to check'  } </p>
          </div>
        <Card
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className="h-[50vh]  w-full overflow-auto border-2 p-4 shadow-lg"
          >
          <table className=" font-Poppins w-full table-auto text-center mx-auto  ">

            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                 <th
                 key={head}
                 className=" capitalize text-sm bg-[#F1F4F9] text-gray-800 p-4"
               >
                      {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Planner &&
                Planner?.map((item: any, index: any) => (
                  <tr key={item?._id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">
                        {item?.description}
                      </p>
                    </td>
                    <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">
                        {moment(item?.deadline).format("MMM Do YY")}
                      </p>
                    </td>
                    <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">
                        <i
                          className={`fa-solid ${
                            item?.isFinished
                              ? "text-green-500"
                              : "text-gray-300"
                          }  fa-circle-check`}
                        ></i>
                      </p>
                    </td>
                    <td className="p-4">
                    <p className="font-semibold text-gray-700 text-sm">
                        {item?.estCost}
                      </p>
                    </td>
                    <td className="p-4">
                      {(item?.isFinished == true && (
                        <i className="text-gray-500 fa-regular fa-trash-can"></i>
                      )) || (
                        <i
                          onClick={() => handleDelPlanner(item?._id)}
                          className=" cursor-pointer fa-regular fa-trash-alt text-red-500"
                        ></i>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
       
        <DeletePlannerModal
          id={plannerId}
          open={open}
          closeModel={closeDelPlaModal}
        />
      </div>
      {isLoading && <Loader />}
    </section>
  );
};

export default Planner;
