/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BookingInfoApi } from "../../features/slicer/BookingInfoSlicer";
import Header from "../../components/Header";

export default function Bookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { BookingsData } = useSelector((state: any) => state.GetBookingSlicer);
  const [statusTab, setStatusTab] = useState<any>("active");
  const [search, setSearch] = useState<any>("");
  const [filterData, setFilterData] = useState<any>([]);

  console.log(BookingsData);
  const HeadingTabs = [
    "Sr No",
    "Event Title",
    "Client Name",
    "client Email",
    "Total Guests",
    "Event Start ",
    "Event End ",
    "Status",
  ];
  const FilterTab = [
    {
      value: "active",
      title: "Active",
    },
    {
      value: "cancelled",
      title: "Cancelled",
    },
    {
      value: "completed",
      title: "Completed",
    },
  ];

  const handleNavigateItem = (item: any) => {
    console.log(item);
    dispatch(BookingInfoApi(item?._id));
    localStorage.setItem("BookingInfoId", JSON.stringify(item?.id));
    navigate(`/bookingsdetail`);
  };

  useEffect(() => {
    let relevantData = [];
    // Determine which array to filter based on statusTab
    if (statusTab === "active") {
      relevantData = BookingsData?.active || [];
    } else if (statusTab === "cancelled") {
      relevantData = BookingsData?.cancelled || [];
    } else if (statusTab === "completed") {
      relevantData = BookingsData?.completed || [];
    }

    // If no specific statusTab is selected, combine all arrays
    const filteredData = relevantData;

    // Update the state with the filtered data
    setFilterData(filteredData);
  }, [statusTab, BookingsData]);

  // Effect for filtering by search
  useEffect(() => {
    let relevantData = [];

    // Determine which array to filter based on statusTab
    if (statusTab === "active") {
      relevantData = BookingsData?.active || [];
    } else if (statusTab === "cancelled") {
      relevantData = BookingsData?.cancelled || [];
    } else if (statusTab === "completed") {
      relevantData = BookingsData?.completed || [];
    }

    if (search.length > 0) {
      // Filter by search term
      const filteredData = relevantData.filter((data: any) => {
        return data?.eventTitle?.toLowerCase()?.includes(search.toLowerCase());
      });
      setFilterData(filteredData);
    } else {
      // If search is cleared, reset filtered data based on statusTab
      // const filteredData = relevantData;

      // // Sort the data by createdAt if needed
      // filteredData?.sort(
      //   (a: any, b: any) =>
      //     new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
      // );

      // setFilterData(filteredData);
    }
  }, [search, BookingsData, statusTab]);

  return (
    <Card
      className=" w-full"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <Header
        heading={"Booking List"}
        headingDetail="See information about Bookings"
        statusTabs={FilterTab}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        StatusTabVal={statusTab}
      />

      <CardBody
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className=" h-[70vh]  overflow-scroll px-0"
      >
        <table className="mt-4 w-full min-w-max table-auto text-center mx-auto  ">
          <thead>
            <tr className="text-center">
              {HeadingTabs?.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    placeholder=""
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {filterData?.map((item: any, index: any) => {
              const isLast = index === filterData?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <>
                  <tr
                    className="text-center cursor-grab"
                    onClick={() => handleNavigateItem(item)}
                    key={item?._id}
                  >
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {index + 1}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.eventTitle}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.client?.fullname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.client?.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item?.totalGuests}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.eventStartDate).format("MMM Do YY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        placeholder=""
                        onPointerEnterCapture={() => {}}
                        onPointerLeaveCapture={() => {}}
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(item?.eventEndDate).format("MMM Do YY")}
                      </Typography>
                    </td>
                    <td className={`${classes} flex justify-center`}>
                      <Chip
                        variant="ghost"
                        size="sm"
                        className="w-fit px-4 mx-auto"
                        value={item?.booking_statuscode}
                        color={
                          item?.booking_statuscode === "ACTIVE"
                            ? "green"
                            : item?.booking_statuscode === "COMPLETED"
                            ? "blue"
                            : item?.booking_statuscode === "REJECTED"
                            ? "red"
                            : undefined
                        }
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );

}
