import InputField from "../../components/InputField";
import { MyDropDown } from "../../components/MyDropDown";
import PrograssBar from "../../components/ProgressBar";
import TextArea from "../../components/TextArea";
import "./FormsCss.css";
const BusinessDetail = () => {
  return (
    <section className=" flex min-h-screen pt-14 md:pt-20 ">
      <div className={`hidden md:block flex-1 Form3Div  `}>
        <div className="flex justify-center h-full  pt-28">
          <h1 className=" font-Inter font-bold text-4xl text-secondary">
            AARMA BUSINESS
          </h1>
        </div>
      </div>
      <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
        <div className=" px-8 md:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-xl md:text-3xl ">
              Business Details
            </h1>
            <p className="text-sm md:text-base text-justify">
              Want to start your business with us? Enter your following info
              below
            </p>
          </div>
          <div className=" my-4 flex flex-col gap-1">
            <InputField placeholder="Your Brand Name*" />

            <h2 className="text-xl ">Staff</h2>
            <InputField type="number" placeholder="Minimum Price*" />
            <TextArea />
            <h2 className="text-xl">Down Payment Type</h2>
            <MyDropDown
              title="Fixed payment"
              arrVale={["Fixed payment", "Inc By Year", "Inc By Month"]}
            />
            <InputField type="number" placeholder="Down Payment*"/>
            <h2 className="text-xl">Cancellation Policy</h2>
            
          </div>
        </div>
        <div>
          <PrograssBar />
        </div>
      </div>
    </section>
  );
};

export default BusinessDetail;
