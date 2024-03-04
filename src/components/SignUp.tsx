import InputField from "./InputField";
import { MyDropDown } from "./MyDropDown";
import PrmaryBtn from "./PrmaryBtn";
import { useNavigate } from "react-router-dom";

interface SignUp {}

const SignUp = () => {
  const navigate = useNavigate();
  const handleBusinessTypeSelect = (item: any) => {
    console.log(item);
  };
  const handleCitySelect = (item: any) => {
    console.log(item);
  };


const HandeSubmit = (e: any)=>{
  e.preventDefault()
  console.log('form')
  navigate('/personaldetail')
}

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
    </section>
  );
};

export default SignUp;
