/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import ActivityModal from "./ActivityModal";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { baseUrl, socket } from "../../features/slicer/Slicer";
import { Chip, Progress } from "@material-tailwind/react";
import DeleteActivityModal from "./DeleteActivityModal";
import { Card, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import notisound from "../../audio/notificationsound.mp3";
import { BookingInfoApi } from "../../features/slicer/BookingInfoSlicer";
const TABLE_HEAD = [
  "Sr.No",
  "Activity Title",
  "Status",
  "Remarks",
  " Cost",
  "Budget Attched",
  "Action",
];

const Activity = () => {
  const dispatch = useDispatch();
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const { isLoading } = useSelector((state: any) => state.UpdateActivitySlicer);
  const [activity, setActivity] = useState<any>(null);
  const [ActivityId, setActivityId] = useState(null);
  const [open, setOpen] = useState(false);

  console.log(BookingInfo);

  const handleActivity = (id: any) => {
    setOpen(true);
    setActivityId(id);
    console.log(id);
  };
  useEffect(() => {
    setActivity(BookingInfo?.data?.activity);
  }, [BookingInfo]);

  useEffect(() => {
    const handleUpdateActivity = (data: any) => {
      const audio = new Audio(notisound);
      dispatch(BookingInfoApi(data?.data?._id));
      setActivity(data?.data?.activity);
      audio.play();
      toast.success(data?.message);
    };

    socket.on("booking-updated-by-client", handleUpdateActivity);
    return () => {
      socket.off("booking-updated-by-client", handleUpdateActivity);
    };
  }, [activity,BookingInfo]);
  return (
    <section className="mx-2 border-2 p-2">
      <div className=" h-[60vh] overflow-y-auto my-4 px-5 mx-8">
        <div className="flex justify-between items-center w-full">
          <h1
            className={`${
              BookingInfo?.bookingProgress == "100.00" ? "text-xl" : "text-2xl"
            } capitalize font-bold p-4`}
          >
            Update Activity Section
          </h1>
          <div>
            {BookingInfo.data && BookingInfo?.bookingProgress == "100.00" ? (
              <p className="text-green-800 text-2xl text-center font-bold">
                {" "}
                Seems you have completed All you activity{" "}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-fit ">
            <h1 className="font-semibold  text-gray-800">
              {BookingInfo?.bookingProgress &&
                Math.round(BookingInfo?.bookingProgress)}
              % completed
            </h1>
            <Progress
              placeholder={""}
              className="w-[300px]"
              color="blue"
              value={BookingInfo?.bookingProgress}
              size="lg"
            />
          </div>
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
              {activity &&
                activity.map((item: any, index: any) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
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
                    <td className="p-4 ">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.message}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Chip
                        variant="ghost"
                        color={
                          (item?.status_code === "PENDING" && "gray") ||
                          (item?.status_code === "ACCEPTED" && "green") ||
                          (item?.status_code === "REJECTED" && "red") ||
                          undefined
                        }
                        size="sm"
                        value={item?.status}
                      ></Chip>
                    </td>
                    <td className="p-4">
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.remarks_by_client}
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
                        {item?.cost}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <a href={baseUrl + item?.file} target="_blank">
                        <i className="cursor-pointer text-blue-500 text-2xl on fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                    <td className="p-4">
                      {(item?.status_code == "ACCEPTED" && (
                        <i className="text-gray-500 fa-regular fa-trash-can"></i>
                      )) ||
                        (item?.status_code == "REJECTED" && (
                          <i className="text-gray-500 fa-regular fa-trash-can"></i>
                        )) || (
                          <i
                            onClick={() => handleActivity(item?._id)}
                            className=" cursor-pointer fa-regular fa-trash-alt text-red-500"
                          ></i>
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Card>
        {BookingInfo?.data?.booking_statuscode == "COMPLETED" && (
          <div className="p-4">
            <h1 className="font-semibold underline-offset-8 underline text-2xl capitalize ">
              Completion Message{" "}
            </h1>
            <div>
              {BookingInfo &&
                BookingInfo?.data?.completionRequests?.map(
                  (item: any, ind: any) => {
                    return (
                      <div className="flex justify-between pt-4 pr-6 gap-2 ">
                        <p
                          key={ind}
                          className="w-[500px] text-gray-700 font-semibold"
                        >
                          {item.message}
                        </p>
                        <Chip
                          variant="ghost"
                          color={
                            item?.response === "Accepted"
                              ? "green"
                              : item?.response === "Cancelled"
                              ? "red"
                              : item?.response === "Pending"
                              ? "gray"
                              : undefined
                          }
                          size="sm"
                          value={item?.response}
                        />
                      </div>
                    );
                  }
                )}
            </div>
          </div>
        )}
      </div>
      <ActivityModal />
      <DeleteActivityModal
        id={ActivityId}
        open={open}
        closeModel={() => setOpen(false)}
      />
      {isLoading && <Loader />}
    </section>
  );
};

export default Activity;
