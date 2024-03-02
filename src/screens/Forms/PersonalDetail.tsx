import CheckBox from "../../components/CheckBox";
import InputField from "../../components/InputField";
import { MyDropDown } from "../../components/MyDropDown";
import PrograssBar from "../../components/ProgressBar";
import "./FormsCss.css";
const PersonalDetail = () => {
  return (
    <section className=" flex min-h-screen pt-14 md:pt-20 ">
      <div className={`hidden md:block flex-1 Form1Div  `}>
        <div className="flex justify-center h-full  pt-28">
          <h1 className=" font-Inter font-bold text-4xl text-secondary">
            AARMA BUSINESS
          </h1>
        </div>
      </div>
      <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
        <div className=" px-8 md:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-2xl md:text-4xl ">
              Tell us about your business
            </h1>
            <p className="text-sm md:text-base text-justify">
              This information will be shown on the app so that customers can
              search and contact you in case they have any questions.
            </p>
          </div>
          <div className=" my-4 flex flex-col gap-1">
            <InputField
              placeholder="Business Name"
              // placeholder=" Your Business Name"
            />
            <InputField
              // label="Business Name"placeholder
              placeholder="Business Type"
            />
            <span className="grid grid-cols-7 gap-4 ">
              <div className="col-span-4">
                <MyDropDown
                  title="Business Category"
                  arrVale={["Retail", "Wholesale", "Manufacturing"]}
                  onSelect={(item: never) => console.log(item)}
                />
              </div>
              <div className="col-span-3">
                <InputField
                  placeholder="Branches"
                  // placeholder="Enter your business name"
                />
              </div>
            </span>
            <InputField placeholder="Mobile Number" />
            <InputField placeholder="Business Phone Number" />
          </div>
          <div>
            <CheckBox style="text-onPrimary" label="I agree to the terms and conditions" />
          </div>
        </div>
        <div>
          <PrograssBar navigateTo="/contactdetail" />
        </div>
      </div>
    </section>
  );
};

export default PersonalDetail;
