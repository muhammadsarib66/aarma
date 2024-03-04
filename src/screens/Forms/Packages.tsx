import { TextField } from "@mui/material";
import PrograssBar from "../../components/ProgressBar";
import "./FormsCss.css";
import TextArea from "../../components/TextArea";
import PrmaryBtn from "../../components/PrmaryBtn";
const Packages = () => {
  return (
    <section className=" flex min-h-screen pt-14 md:pt-20 ">
      <div className={`hidden md:block flex-1 PackageFormDiv  `}>
        <div className="flex justify-center h-full  pt-28">
          <h1 className=" font-Inter font-bold text-4xl text-secondary">
            AARMA BUSINESS
          </h1>
        </div>
      </div>
      <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
        <div className=" px-8 mb-8  lg:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-xl md:text-3xl ">
              Packages
            </h1>
            <p className="text-sm md:text-base text-justify md:max-w-[300px]">
              Enter packages you offer. You can enter upto 20 packages.
            </p>
          </div>
          <div className="px-2 mt-4 py-10  shadow-md shadow-gray-600 rounded-md  ">
            <div className="flex justify-around gap-8">
              <TextField label="Package Name" variant="standard" />
              <TextField label="Price" variant="standard" />
            </div>
            <div className="pt-5 ">
              <h3>Services</h3>
              <TextArea placeholder="Enter Services" />
            </div>
            <div className="mt-4 relative border-[1px] border-black">
              <div className="absolute -top-3  flex justify-center  left-[37%]  right-[37%] ">
                <PrmaryBtn
                  btnText="Create New Packages"
                  style="bg-onSecondary border flex items-center justify-center text-onPrimary  text-sm min-w-[180px] md:text-base  md:min-w-[250px] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <div className="mt-4">
          <PrograssBar />
        </div>
      </div>
    </section>
  );
};

export default Packages;
