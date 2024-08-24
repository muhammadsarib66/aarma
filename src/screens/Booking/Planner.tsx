/* eslint-disable @typescript-eslint/no-explicit-any */

import PlannerModal from "./PlannerModal";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import DeletePlannerModal from "../../components/DeletePlannerModal";
import Loader from "../../components/Loader";
import {  Card, Progress, Typography } from "@material-tailwind/react";
import CompleteReqModal from "./CompleteReqModal";
import { baseUrl } from "../../features/slicer/Slicer";
import { io } from "socket.io-client";
import { BookingInfoApi } from "../../features/slicer/BookingInfoSlicer";
import { toast } from "react-toastify";
import notisound from "../../audio/notificationsound.mp3";

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
    <section className="mx-2 border-2 p-2">
      <div className=" h-[60vh] overflow-hidden my-4 px-5 mx-8">
        <div className="flex justify-between items-center w-full">
          <h1
            className={`${
              BookingInfo?.bookingProgress == "100.00" ? "text-xl" : "text-2xl"
            } capitalize font-bold p-4`}
          >
            Planner for hosting event Title
          </h1>

          <div>
            {BookingInfo?.bookingProgress == "100.00" ? (
              <div className="flex gap-2 px-2 items-center ">
                <p className="text-green-800 text-2xl text-center font-bold">
                  
                  Seems you have completed All you activity{" "}
                </p>
              
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-fit py-2 flex flex-col gap-4">
            {BookingInfo?.data?.booking_statuscode !== "COMPLETED" &&
            <CompleteReqModal />
          }
                  <div>

            <h1 className="font-semibold  text-gray-800">
              {Math.round(BookingInfo?.bookingProgress)}% completed
            </h1>
            <Progress
            placeholder={''}
              className="w-[300px]"
              color="blue"
              value={BookingInfo?.bookingProgress}
              size="lg"
            />
                  </div>

          </div>

          {/* <Progress  className='  w-[300px]' color='blue'   label={BookingInfo?.bookingProgress} value={BookingInfo?.bookingProgress}  /> */}
        </div>
        <Card
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className="h-[50vh]  w-full overflow-scroll"
          >
            <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                      color="blue-gray"
                      className="font-bold leading-none opacity-90"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Planner &&
                Planner?.map((item: any, index: any) => (
                  <tr key={item?._id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.description}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.deadline).format("MMM Do YY")}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        <i
                          className={`fa-solid ${
                            item?.isFinished
                              ? "text-green-500"
                              : "text-gray-300"
                          }  fa-circle-check`}
                        ></i>
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.estCost}
                      </Typography>
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
        {/* <div className="flex flex-col gap-3">
          {Planner &&
            Planner.map((item: any, index: any) => (
              <div
                key={item?._id}
                className="rounded-md  flex justify-between p-4 border-2 border-gray-400 my-2"
              >
                <div className="flex gap-2 ">
                  <p className="font-semibold pt-1"> {index + 1}.</p>
                  <div>
                    <h1 className="font-semibold text-xl">
                      {item?.description}
                    </h1>
                    <p>
                      {" "}
                      Deadline:{" "}
                      <span>{moment(item?.deadline).format("MMM Do YY")}</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-end">
                  <p className="">
                    Budget:{" "}
                    <span className="font-semibold">{item?.estCost} </span>
                  </p>
                  <div className="flex items-center gap-4">
                  <i className={`fa-solid ${ item?.isFinished  ?"text-green-500" : "text-gray-300"}  fa-circle-check`}></i>
                 
                  <i
                    onClick={()=>handleDelPlanner(item?._id)}
                    className="float-end cursor-pointer fa-regular fa-trash-alt text-red-500"
                  ></i>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
        <PlannerModal />
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
