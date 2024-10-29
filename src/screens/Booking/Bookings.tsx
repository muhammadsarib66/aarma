/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card, CardBody, Chip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BookingInfoApi } from "../../features/slicer/BookingInfoSlicer";
import Header from "../../components/Header";

export default function Bookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  BookingsData } = useSelector((state: any) => state.GetBookingSlicer);
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  const [statusTab, setStatusTab] = useState<any>("active");
  const [search, setSearch] = useState<any>("");
  const [filterData, setFilterData] = useState<any>([]);
  console.log(BookingInfo,"======='booking");
  const HeadingTabs = [
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
    console.log(item?._id);
    dispatch(BookingInfoApi(item?._id));
    localStorage.setItem("BookingInfoId", JSON.stringify(item?._id));
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
      setFilterData(relevantData);
    }
  }, [search, BookingsData, statusTab]);

  return (
    <section className=" container mx-auto  flex flex-col gap-8  ">
      <Header
        heading={"Event Portal / Bookings"}
        // headingDetail="See information about Bookings"
        statusTabs={FilterTab}
        setStatusTab={setStatusTab}
        setSearch={setSearch}
        StatusTabVal={statusTab}
      />
      <Card
        className=" w-full  bg-white px-8"
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <CardBody
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
          className=" min-h-[30vh]    overflow-auto px-0"
        >
          <table className=" font-Poppins w-full table-auto text-center mx-auto  ">
            <thead>
              <tr className="text-left ">
                {HeadingTabs?.map((head) => (
                  <th
                    key={head}
                    className=" capitalize text-sm bg-[#F1F4F9] text-gray-800 p-4"
                  >
                    {head}
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
                      className="text-left cursor-grab "
                      onClick={() => handleNavigateItem(item)}
                      key={item?._id}
                    >
                      <td className={classes}>
                        <p className="font-semibold text-gray-700 text-sm">
                          {item?.eventTitle}
                        </p>
                      </td>
                      <td className={classes}>
                      <p className="font-semibold text-gray-700 text-sm">
                          {item?.client?.fullname}
                        </p>
                      </td>
                      <td className={classes}>
                         <p className="font-semibold text-gray-700 text-sm">
                          
                          {item?.client?.email}
                        </p>
                      </td>
                      <td className={classes}>
                         <p className="font-semibold text-gray-700 text-sm">
                          
                          {item?.totalGuests}
                        </p>
                      </td>
                      <td className={classes}>
                         <p className="font-semibold text-gray-700 text-sm">
                          
                          {moment(item?.eventStartDate).format("MMM Do YY")}
                        </p>
                      </td>
                      <td className={classes}>
                         <p className="font-semibold text-gray-700 text-sm">
                          
                          {moment(item?.eventEndDate).format("MMM Do YY")}
                        </p>
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
    </section>
  );
}
