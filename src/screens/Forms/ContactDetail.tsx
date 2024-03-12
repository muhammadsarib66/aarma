import InputField from "../../components/InputField";
import PrograssBar from "../../components/ProgressBar";
import "./FormsCss.css";
const ContactDetail = () => {
  return (
    <section className=" flex min-h-screen pt-14 md:pt-20 ">
      <div className={`hidden md:block flex-1 Form2Div  `}>
        <div className="flex justify-center h-full  pt-28">
          <h1 className=" font-Inter font-bold text-4xl text-secondary">
            AARMA BUSINESS
          </h1>
        </div>
      </div>
      <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
        <div className="  my-4 px-8 md:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-xl md:text-3xl ">
              Contact Details
            </h1>
          </div>
          <div className=" my-4 flex flex-col gap-1">
            <InputField type="file" placeholder="Upload Your Logo" label="upload Your logo" />
            <InputField placeholder="Your Brand Name*" />
            <InputField placeholder="Contact Number*" />
            <InputField placeholder="Contact Number Secondary" />

            <InputField placeholder="Booking Email*" />
            <InputField placeholder="Website Link*" />
            <InputField placeholder="City*" />
            <InputField placeholder="Office Address*" />
            <InputField placeholder="Business Phone Number" />
            <InputField placeholder="Link Your Social media " />
          </div>
        </div>
        <div>
          <PrograssBar navigateTo="/businessdetail"/>
        </div>
      </div>
    </section>
  );
};

export default ContactDetail;
