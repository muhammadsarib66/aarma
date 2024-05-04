/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react';
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Bookings() {
  const { BookingsData } = useSelector((state: any) => state.GetBookingSlicer);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const HeadingTabs = [
    "Event Title",
    "Client Name",
    "client Email",
    "Total Guests",
    "Event Start ",
    "Event End ",
    // "Service Description",
    "Status",
    // "Action",
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
  const handleStatusChange = (status: any) => {
    setSelectedStatus(status);
  };
  let filteredBookings;
  if (selectedStatus === "active") {
    filteredBookings = BookingsData.active;
  } else if (selectedStatus === "cancelled") {
    filteredBookings = BookingsData.cancelled;
  } else if (selectedStatus === "completed") {
    filteredBookings = BookingsData.completed;
  } else {
    filteredBookings = [];
  }

  if (searchQuery) {
    filteredBookings = filteredBookings.filter((booking: any) => {
      const fullname = booking?.eventTitle || "";
      return fullname.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="py-10 px-4 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-3xl font-bold">Bookings</h1>
          <select
            className="w-40 h-8  border-2 rounded-md  "
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {FilterTab.map((item, index) => {
              let arrayLength = 0;
              if (BookingsData.hasOwnProperty(item.value)) {
                arrayLength = BookingsData[item.value].length; // Get the length of the array based on the option value
              }
              return (
                <option className=" flex" key={index} value={item.value}>
                  <span> {item.title} </span>
                  <span className=" ">({arrayLength})</span>
                </option>
              );
            })}
          </select>
        </div>

        <div className="w-full md:w-72">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Search"
            icon={<SearchIcon className="h-5 w-5" />}
            crossOrigin={undefined}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {HeadingTabs?.map((item, index) => (
                <th key={index} scope="col" className=" capitalize px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBookings &&
              filteredBookings?.map((item: any, index: any) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{item?.eventTitle}</td>
                  <td className="px-6 py-4">{item?.client?.fullname}</td>

                  <td className="px-6 py-4">{item?.client?.email}</td>

                  <td className="px-6 py-4">{item?.totalGuests}</td>
                  <td className="px-6 py-4">
                    {moment(item?.eventStartDate).format("MMM Do YY")}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item?.eventEndDate).format("MMM Do YY")}
                  </td>
                  {/* <td className="px-6 py-4">{item?.serviceDescription}</td> */}
                  <td className={`  px-6 py-4`}>
                    <span
                      className={` ${
                        item?.booking_statuscode === "ACTIVE" &&
                        "bg-green-400 text-white"
                      } p-1 rounded-md`}
                    >
                      {item?.booking_status}
                    </span>
                  </td>

                  {/* <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
