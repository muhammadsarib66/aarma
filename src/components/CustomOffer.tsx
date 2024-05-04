/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "../features/slicer/Slicer";
import { Button } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMemo, useState } from "react";
import { useFormik } from "formik";
import { io } from "socket.io-client";
import * as Yup from "yup";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "none",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface FormValues {
  eventTitle: string;
  totalGuests: string | number;
  eventStartDate: string | number;
  eventEndDate: string | number;
  expiryDate: string | number;
  budget: string | number;
  serviceDescription: string;
}

export default function CustomOffer({ senderId, clientId }: any) {
  const [isOpen, setIsOpen] = useState<any>(false);
  const [submitting, setSubmitting] = useState(false);
  const socket = useMemo(() => io(baseUrl), []);

  const validationSchema = Yup.object().shape({
    eventTitle: Yup.string()
      .min(6, "Event Name atleast 6 char long")
      .required("event name is required"),
    totalGuests: Yup.string()
      .min(2, "min guest 10")
      .required("Guest is required"),
    budget: Yup.string()
      .min(1, "min 1 char")
      .required("burdget price is required"),
    serviceDescription: Yup.string()
      .min(10, "min char 10")
      .required("Description is required"),
    eventStartDate: Yup.string().required("Event Date is required"),
    eventEndDate: Yup.string().required("Event End Date is required"),
    expiryDate: Yup.string().required("Expire Offer is required"),
  });
  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    try {
      setSubmitting(true);
      const CustOffer = {
        ...values,
        sender: senderId,
        senderType: "EventManager",
        eventManager: senderId,
        client: clientId,
        messageType: "offer",
      };
      //  console.log(CustOffer)
      socket.emit("sendCustomOffer", CustOffer);

      resetForm();
      handleClose();
      setSubmitting(false);
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
      toast.error("Error in form submission");
    }
  };

  const formik = useFormik({
    initialValues: {
      eventTitle: "",
      totalGuests: "",
      budget: "",
      serviceDescription: "",
      eventStartDate: "",
      eventEndDate: "",
      expiryDate: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <div
        onClick={handleOpen}
        className="rounded-full border-4 cursor-pointer w-8 h-8 flex items-center justify-center border-blue-200"
      >
        <i className="fa-solid fa-plus"></i>
      </div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            className="w-[300px]  h-[95vh] md:w-[700px] rounded-lg p-2 gap-2 overflow-y-scroll flex flex-col "
            sx={style}
          >
            <div className="flex justify-between  w-full">
              <h1 className="text-2xl font-semibold text-onPrimary">
                Custom Offer
              </h1>
              <div className=" text-2xl" onClick={handleClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>

            <p className="font-thin text-onPrimary">
              {" "}
              Please add Booking for custom offers.
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-2 ">
                <div>
                  <label htmlFor="Event Name" className="text-sm font-semibold">
                    Event Name
                  </label>
                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.eventTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="eventTitle"
                    // label="Event Name"
                    placeholder="Enter Event Name"
                  />
                  {formik.touched.eventTitle && formik.errors.eventTitle && (
                    <div className="error text-xs  text-red-600">
                      {formik.errors.eventTitle}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Num ofGuest"
                    className="text-sm font-semibold"
                  >
                    Number of Guests
                  </label>

                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.totalGuests}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="totalGuests"
                    type="number"
                    placeholder="Number Of Guests"
                  />
                  {formik.touched.totalGuests && formik.errors.totalGuests && (
                    <div className="error text-xs text-red-600">
                      {formik.errors.totalGuests}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Event Start Date"
                    className="text-sm font-semibold"
                  >
                    Event Start Date
                  </label>

                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.eventStartDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="eventStartDate"
                    type="date"
                    placeholder="Enter Event Date"
                  />
                  {formik.touched.eventStartDate &&
                    formik.errors.eventStartDate && (
                      <div className="error text-xs text-red-600">
                        {formik.errors.eventStartDate}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="Event End Date"
                    className="text-sm font-semibold"
                  >
                    Event End Date
                  </label>

                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.eventEndDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="eventEndDate"
                    type="date"
                    placeholder="Enter Event End Date"
                  />
                  {formik.touched.eventEndDate &&
                    formik.errors.eventEndDate && (
                      <div className="error text-xs text-red-600">
                        {formik.errors.eventEndDate}
                      </div>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="Offer Expires in"
                    className="text-sm font-semibold"
                  >
                    Offer Expires in
                  </label>

                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.expiryDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="expiryDate"
                    type="number"
                    placeholder="Enter Booking Date"
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <div className="error text-xs text-red-600">
                      {formik.errors.expiryDate}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Estimated Price"
                    className="text-sm font-semibold"
                  >
                    Estimated Price
                  </label>

                  <input
                    className=" bg-onSecondary h-12 w-full px-2  rounded-md"
                    value={formik.values.budget}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="budget"
                    type="number"
                    placeholder="Enter Budget Price"
                  />
                  {formik.touched.budget && formik.errors.budget && (
                    <div className="error text-xs text-red-600">
                      {formik.errors.budget}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Event Description"
                    className="text-sm font-semibold"
                  >
                    Event Description
                  </label>

                  <textarea
                    placeholder="enter event description"
                    className="h-28 bg-onSecondary rounded-md px-2 w-full border-none resize-none"
                    value={formik.values.serviceDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="serviceDescription"
                  />
                  {formik.touched.serviceDescription &&
                    formik.errors.serviceDescription && (
                      <div className="error text-xs text-red-600">
                        {formik.errors.serviceDescription}
                      </div>
                    )}
                </div>

                <button
                  className="active:bg-gray-700 w-full h-12 flex rounded-lg justify-center items-center bg-onPrimary   text-secondary"
                  disabled={submitting}
                  type="submit"
                >
                  Send Offer
                </button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  placeholder={undefined}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </>
      </Modal>
    </div>
  );
}
