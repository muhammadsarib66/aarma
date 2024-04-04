import { useState } from "react";
import InputField from "./InputField";
import PrmaryBtn from "./PrmaryBtn";
import VerfyMailModel from "./VerifyMailModel";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../features/slicer/Slicer";
import { toast } from "react-toastify";
import {
  createAccountApi,
  setReqAccData,
} from "../features/slicer/RequestAccountSlicer";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { isLoading } = useSelector((state: any) => state.RequestAccountSlicer);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    fullname: "",
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // const handleBusinessTypeSelect = (item: string) => {
  //   setFormData({
  //     ...formData,
  //     businessType: item,
  //   });
  //   console.log(item);
  // };

  // const handleCitySelect = (item: any) => {
  //   console.log(item);
  //   setFormData({
  //     ...formData,
  //     city: item,
  //   });
  // };

  const HandeSubmit = (e: any) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phoneNumber &&
      formData.password
    ) {
      localStorage.setItem("formData", JSON.stringify(formData));
      dispatch(createAccountApi(formData)); // Fix: Pass formData as an argument to createAccountApi
      setTimeout(() => {
        if (!isLoading) dispatch(setIsModalOpen());
      }, 3000);
    } else {
      toast.error("Please Fill All feilds");
    }
  };

  return (
    <section className="relative -top-52 md:-top-52  py-10 px-7 bg-onSecondary  rounded-3xl max-w-[400px] min-h-fit ">
      <div>
        <h2 className=" text-onPrimary font-semibold text-xl">
          Let’s start! It should only take a few minutes.
        </h2>
      </div>
      <form onSubmit={HandeSubmit}>
        <div className="my-4 flex flex-col ">
          <InputField
            onChange={(e: any) => handleInput(e)}
            value={formData.firstName}
            type="text"
            Name="firstName"
            placeholder="Business Owner First Name *"
          />
          <InputField
            Name="lastName"
            onChange={(e: any) => handleInput(e)}
            value={formData.lastName}
            type="text"
            placeholder="Business Owner Last Name *"
          />
          <InputField
            Name="fullname"
            onChange={(e: any) => handleInput(e)}
            value={formData.fullname}
            type="text"
            placeholder="Business Owner Full Name *"
          />
          <InputField
            Name="email"
            onChange={(e: any) => handleInput(e)}
            value={formData.email}
            type="email"
            placeholder="Enter Your Business Email *"
          />

          <InputField
            Name="phoneNumber"
            onChange={(e: any) => handleInput(e)}
            value={formData.phoneNumber}
            type="number"
            placeholder="Mobile Phone  *"
          />
          <InputField
            Name="password"
            onChange={(e: any) => handleInput(e)}
            value={formData.password}
            type="text"
            placeholder="Enter Your Password *"
          />

          <PrmaryBtn
            btnText="Get Started"
            type="submit"
            style="h-12 flex rounded-lg justify-center items-center bg-[#F33434]   text-secondary"
          />
        </div>
      </form>
      <div className="">
        <p className="text-onPrimary text-sm">
          I already have an account{" "}
          <span className="underline font-semibold text-primary cursor-pointer">
            <Link to={"/login"}>

            Login
            </Link>
          </span>
        </p>
      </div>
      {isLoading && <Loader />}
      <VerfyMailModel />
    </section>
  );
};

export default SignUp;
