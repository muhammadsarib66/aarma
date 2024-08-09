/* eslint-disable @typescript-eslint/no-explicit-any */

import img from "../../assets/images/contactus.png";
import { Card, CardBody } from "@material-tailwind/react";
import { Divider } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventInfo = () => {
  const { BookingInfo } = useSelector((state: any) => state.BookingInfoSlicer);
  console.log(BookingInfo.data);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(BookingInfo?.data);
  }, [BookingInfo]);
  return (
    <div className="grid grid-cols-2 mt-4 shadow-lg ">
      <div className="  rounded-lg  text-onPrimary bg-onSecondary h-screen shadow-xl p-4">
        {userData && userData.eventTitle && (
          <>
            <div className="flex justify-between w-full mb-2 p-4">
              <h2 className="capitalize text-onPrimary text-2xl font-semibold">
                {" "}
                {userData?.eventTitle}
              </h2>
              <div>
                <p className="font-bold">
                  Offer Ends in{" "}
                  <span className="bg-gray-200 rounded-md p-1">
                    <i className="pr-2 fa-regular fa-clock"></i>2 days
                  </span>
                </p>
              </div>
            </div>

            <Divider />
            <div className="flex flex-col items-center justify-center p-4 w-full ">
              <img src={img} className="rounded-full object-cover w-44 h-44" />
              <p className="font-semibold">{userData?.client?.fullname}</p>
              <p className="font-thin text-gray-600 text-xs">
                {userData?.client?.email}
              </p>
            </div>
            <div className="flex justify-center gap-4 p-4   ">
              <Card placeholder="" className=" w-96 ">
                <CardBody placeholder="">
                  <p className="capitalize text-2xl font-bold text-primary mb-2">
                    {userData?.eventTitle}
                  </p>
                  <Divider className="" />

                  <p className="font-semibold text-gray-700 mt-2">
                    Number of Guest
                  </p>
                  <p className="text-blue-300 font-semibold">
                    {userData?.totalGuests}
                  </p>
                  <p className="font-semibold text-gray-700">
                    Service Descrption
                  </p>
                  <p>{userData?.serviceDescription}</p>
                  <p className="font-semibold text-gray-700">Event Date</p>
                  <p>
                    <i className="pr-2 fa-solid fa-calendar-days"></i>
                    {moment(userData?.offer?.eventStartDate).format(
                      "MMM Do YY"
                    )}{" "}
                    -{" "}
                    {moment(
                      userData?.offer?.eventTimeFrame?.eventEndDate
                    ).format("MMM Do YY")}
                  </p>
                </CardBody>
              </Card>
            </div>
          </>
        )}
      </div>
      <div className=" border-2 rounded-lg w-full h-screen">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14415.487767295399!2d68.36970025!3d25.40909681402817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1714992311770!5m2!1sen!2s"
          className="border-0 w-full h-full"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default EventInfo;
