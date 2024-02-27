import InputField from "./InputField";
import { MyDropDown } from "./MyDropDown";
import PrmaryBtn from "./PrmaryBtn";

interface SignUp {}

const SignUp = () => {
  const handleBusinessTypeSelect = (item: any) => {
    console.log(item);
  };
  const handleCitySelect = (item: any) => {
    console.log(item);
  };

  return (
    <section className="relative -top-52 md:-top-44  py-10 px-7 bg-secondary  rounded-3xl max-w-[400px] min-h-fit ">
      <div>
        <h2 className=" text-onPrimary font-semibold text-xl">
          Let’s start! It should only take a few minutes.
        </h2>
      </div>
      <div className="my-4 flex flex-col ">
        <InputField
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value}
          type="text"
          placeholder="Business Owner First Name *"
        />
        <InputField type="text" placeholder="Business Owner Last Name *" />
        <InputField type="email" placeholder="Enter Your Business Email *" />
        <MyDropDown
          onSelect={handleBusinessTypeSelect}
          title="Business Type *"
          arrVale={["option1", "this is Your Option", "option 3", "option 4"]}
        />
        <InputField type="text" placeholder="Mobile Phone  *" />
        <MyDropDown
          onSelect={handleCitySelect}
          title="Select Your City *"
          arrVale={["Hyderabad", "Karachi", "Lahore", "Islamabad"]}
        />
        <PrmaryBtn
          btnText="Get Started"
          style="h-12 flex justify-center items-center bg-[#F33434]   text-secondary"
        />
      </div>
      <div className="">
        <p className="text-onPrimary text-sm">
          I already have an account{" "}
          <span className="underline font-semibold text-primary cursor-pointer">
            Sign In
          </span>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
