import { useState } from "react";
import InputField from "./InputField";
import { MyDropDown } from "./MyDropDown";
import PrmaryBtn from "./PrmaryBtn";
import VerfyMailModel from "./VerifyMailModel";
import { useDispatch } from "react-redux";
import { setIsModalOpen, setSignUpForm } from "../features/slicer/Slicer";
import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    city: "",
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };
  const handleBusinessTypeSelect = (item: string) => {
    setFormData({
      ...formData,
      businessType: item,
    });
    console.log(item);
  };

  const handleCitySelect = (item: any) => {
    console.log(item);
    setFormData({
      ...formData,
      city: item,
    });
  };

  const HandeSubmit = (e: any) => {
    e.preventDefault();
    console.log("form");
    console.log("Form Data:", formData);
    // navigate('/personaldetail')
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.businessType &&
      formData.city
    ) {
      dispatch(setSignUpForm(formData));
      dispatch(setIsModalOpen())
    }
    else{
      toast.error("Please Fill All feilds")
    }
  };

  return (
    <section className="relative -top-52 md:-top-44  py-10 px-7 bg-secondary  rounded-3xl max-w-[400px] min-h-fit ">
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
            Name="email"
            onChange={(e: any) => handleInput(e)}
            value={formData.email}
            type="email"
            placeholder="Enter Your Business Email *"
          />
          <MyDropDown
            onSelect={handleBusinessTypeSelect}
            title="Business Type *"
            arrVale={[
              "Hair Saloon",
              "Hall Managment",
              "Boutique",
              "Barbar Shop",
            ]}
          />
          <InputField
            Name="phone"
            onChange={(e: any) => handleInput(e)}
            value={formData.phone}
            type="number"
            placeholder="Mobile Phone  *"
          />
          <MyDropDown
            onSelect={handleCitySelect}
            title="Select Your City *"
            arrVale={["Hyderabad", "Karachi", "Lahore", "Islamabad"]}
          />
          <PrmaryBtn
            // onClick={handleGetStarted}
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
            Sign In
          </span>
        </p>
      </div>
      <VerfyMailModel />
    </section>
  );
};

export default SignUp;
