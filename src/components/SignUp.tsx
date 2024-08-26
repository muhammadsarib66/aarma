/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import VerfyMailModel from "./VerifyMailModel";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createAccountApi } from "../features/slicer/RequestAccountSlicer";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

const SignUp = () => {
  const { isLoading } = useSelector((state: any) => state.RequestAccountSlicer);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "firstName must be minimum 3")
      .max(20, "firstName must not be more than 2 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "lastName must be minimum 2")
      .max(20, "lastName must not be more than 20 characters")
      .required("Last Name is required"),
    fullname: Yup.string()
      .min(3, "fullName must be minimum 6")
      .max(20, "fullName must not be more than 20 characters")
      .required("Full Name is required"),
    phoneNumber: Yup.string()
      .min(11, "phone Number must be minimum 11")
      .max(15, "phone Number must not be more than 15 characters")
      .required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(14, "Password must not exceed 14 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setSubmitting(true);
      // Perform form submission logic here
      // console.log(values);
      localStorage.setItem("formData", JSON.stringify(values));
      setFormData(values)
      dispatch(createAccountApi(values) as  any ); // Add type assertion to dispatch function call
      resetForm(); // Fix: Pass formData as an argument to createAccountApi
      // Set submitting to false after successful submission
      setSubmitting(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="relative -top-52 md:-top-52  py-10 px-7 bg-onSecondary  rounded-3xl max-w-[400px] min-h-fit ">
      <div>
        <h2 className=" text-onPrimary font-semibold text-xl">
          Let’s start! It should only take a few minutes.
        </h2>
      </div>
      <form onSubmit={formik.handleSubmit} className="my-4 flex flex-col">
        <div>
          {/* <label htmlFor="firstName">firstName</label> */}
          <input
            placeholder="Business Owner First Name *"
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error text-red-500 text-sm">{formik.errors.firstName}</div>
          )}
        </div>
        <div>
          {/* <label htmlFor="lastName">lastName</label> */}
          <input
            placeholder="Business Owner Last Name *"
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error text-red-500 text-sm">{formik.errors.lastName}</div>
          )}
        </div>
        <div>
          {/* <label htmlFor="fullName">fullName</label> */}
          <input
            placeholder="Business Owner Full Name *"
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="text"
            id="fullname"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.fullname && formik.errors.fullname && (
            <div className="error text-red-500 text-sm">{formik.errors.fullname}</div>
          )}
        </div>

        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            placeholder="Enter Your Business Email *"
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error text-red-500 text-sm">{formik.errors.email}</div>
          )}
        </div>
        <div>
          {/* <label htmlFor="email">Email</label> */}
          <input
            placeholder="Enter Your Phone Number *"
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="error text-red-500 text-sm">
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <div>
          {/* <label htmlFor="password">Password</label> */}
          <input
            className="placeholder-red bg-secondary h-12 w-full px-2 my-2 rounded-md"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your Password *"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error text-red-500 text-sm" >{formik.errors.password}</div>
          )}
        </div>
        <div>
          <button
            className={`h-12 w-full flex rounded-lg justify-center items-center bg-[#F33434]    text-secondary`}
            type="submit"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="">
        <p className="text-onPrimary text-sm">
          I already have an account{" "}
          <span className="underline font-semibold text-primary cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
      {isLoading && <Loader />}
      <VerfyMailModel formData={formData} />
    </section>
  );
};

export default SignUp;
