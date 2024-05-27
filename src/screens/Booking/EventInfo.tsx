/* eslint-disable @typescript-eslint/no-explicit-any */

import img from "../../assets/images/contactus.png";
import { Card, CardBody, Typography } from "@material-tailwind/react";

import { CardHeader } from "@material-tailwind/react";

import { Divider } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EventInfo = () => {
  const { BookingInfo } = useSelector(
    (state: any) => state.BookingInfoSlicer
  );
  console.log(BookingInfo.data);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    setUserData(BookingInfo?.data);
  }, [BookingInfo]);
  return (
    <div className="flex flex-col gap-4 shadow-lg ">
      <div className="  rounded-lg  text-onPrimary h-fit shadow-xl p-4">
        {userData && userData.eventTitle ? (
          <>
            <div className="flex justify-between w-full mb-2 p-4">
              <h2 className="capitalize text-onPrimary text-2xl font-semibold">
                {" "}
                information about the event
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

            <div className="flex justify-center gap-4 p-4   ">
              <Card placeholder="" className=" w-96 ">
                <CardBody placeholder="">
                  <Typography
                    placeholder=""
                    variant="h4"
                    color="blue-gray"
                    className="capitalize mb-2"
                  >
                    {userData?.eventTitle}
                  </Typography>
                  <Divider className="" />

                  <Typography
                    placeholder=""
                    className="font-semibold text-gray-700 mt-2"
                  >
                    Number of Guest
                  </Typography>
                  <Typography
                    className="text-blue-300 font-semibold"
                    placeholder=""
                  >
                    {userData?.totalGuests}
                  </Typography>
                  <Typography
                    placeholder=""
                    className="font-semibold text-gray-700"
                  >
                    Service Descrption
                  </Typography>
                  <Typography placeholder="">
                    {userData?.serviceDescription}
                  </Typography>
                  <Typography
                    placeholder=""
                    className="font-semibold text-gray-700"
                  >
                    Event Date
                  </Typography>
                  <Typography placeholder="">
                    <i className="pr-2 fa-solid fa-calendar-days"></i>
                    {moment(userData?.offer?.eventStartDate).format(
                      "MMM Do YY"
                    )}{" "}
                    -{" "}
                    {moment(
                      userData?.offer?.eventTimeFrame?.eventEndDate
                    ).format("MMM Do YY")}
                  </Typography>
                </CardBody>
              </Card>

              <Card placeholder="" className="w-96">
                <CardHeader placeholder="" floated={false} className="h-40">
                  <img
                    src={img}
                    className="w-full h-full object-cover object-top"
                    alt="profile-picture"
                  />
                </CardHeader>
                <CardBody placeholder="" className="text-center">
                  <Typography
                    placeholder=""
                    variant="h4"
                    color="blue-gray"
                    className="mb-2"
                  >
                    {userData?.client?.fullname}
                  </Typography>
                  <Typography
                    placeholder=""
                    color="blue-gray"
                    className="font-medium"
                    textGradient
                  >
                    Email will be here
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </>
        ) : (
          <h1 className="text-2xl  text-center "> No Data Found</h1>
        )}
      </div>
      <div className=" border-2 rounded-lg w-full h-[10rem]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14415.487767295399!2d68.36970025!3d25.40909681402817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1714992311770!5m2!1sen!2s"
          className="border-0 w-full h-full"
          allowFullScreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default EventInfo;
