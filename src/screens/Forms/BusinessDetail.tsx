import { useState } from "react";
import InputField from "../../components/InputField";
import { MyDropDown } from "../../components/MyDropDown";
import PrograssBar from "../../components/ProgressBar";
import RadioButton from "../../components/RadioButton";
import TextArea from "../../components/TextArea";
import "./FormsCss.css";
const BusinessDetail = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [policy, setSelectedPolicyValue] = useState("");

  // Function to handle button click and store the value
  const handleStaffSelect = (event:any) => {
    setSelectedValue(event.target.value);
  };
  console.log(selectedValue, "check");
  const handlepolicySelect = (event:any) => {
    setSelectedPolicyValue(event.target.value);
  };
  console.log(policy, "check");

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
            <div className="grid grid-cols-2 gap-4">
              <RadioButton
                label="Male"
                value="male"
                name="gender"
                icon="fa-solid fa-person"
                style={"py-2 rounded-md  w-full"}
                checked={selectedValue === "male"}
                onChange={handleStaffSelect}
              />
              <RadioButton
                label="Female"
                value="female"
                name="gender"
                icon="fa-solid fa-person-dress"
                style={"py-2 rounded-md  w-full"}
                checked={selectedValue === "female"}
                onChange={handleStaffSelect}
              />

              {/* <RadioButton onClick={handleStaffSelect} value='male' icon='fa-solid fa-person' label="male" style={'py-2 rounded-md  w-full'} />
            <RadioButton onClick={handleStaffSelect} value='female' icon='fa-solid fa-person-dress' label="female" style={'py-2 rounded-md w-full'}/> */}
            </div>
            <InputField type="number" placeholder="Minimum Price*" />
            <TextArea />
            <h2 className="text-xl">Down Payment Type</h2>
            <MyDropDown
              title="Fixed payment"
              arrVale={["Fixed payment", "Inc By Year", "Inc By Month"]}
            />
            <InputField type="number" placeholder="Down Payment*" />
            <h2 className="text-xl">Cancellation Policy</h2>
            <div className="grid grid-cols-2">
              <RadioButton
                label="Redfundable"
                value="redfundable"
                name="ploicy"
                icon="fa-solid fa-circle"
                style={"py-2 rounded-full  w-full"}
                checked={policy === "redfundable"}
                onChange={handlepolicySelect}
              />
              <RadioButton
                label="Nonrefundable"
                value="nonrefundable"
                name="policy"
                icon="fa-solid fa-circle"
                style={"py-2 rounded-full  w-full"}
                checked={policy === "nonrefundable"}
                onChange={handlepolicySelect}
              />
            </div>
          </div>
        </div>
        <div>
          <PrograssBar navigateTo='/packages'/>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetail;
