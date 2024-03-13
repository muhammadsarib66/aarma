import React, { useRef, useState } from "react";
import imgUpl from "../../assets/images/uploaImg.png";
import InputField from "../../components/InputField";
import TextArea from "../../components/TextArea";
import "./FormsCss.css";
import PrmaryBtn from "../../components/PrmaryBtn";
const PersonalDetail = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCoverImg, setSelectedCoverImg] = useState('');
  const [selectedProfileImg, setSelectedProfileImg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefCover = useRef<HTMLInputElement>(null);
  const fileInputRefProfile = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
 // cover Images 
  const handleCover = () => {
    if (fileInputRefCover.current) {
      fileInputRefCover.current.click();
    }
  };
  const handleFileChangeCover = (event: any) => {
    const files: any = event.target.files;
    setSelectedCoverImg(files[0]); // only want to select one file
};
// cover Images end
 // Profile Images 
  const handleProfile = () => {
    if (fileInputRefProfile.current) {
      fileInputRefProfile.current.click();
    }
  };
  const handleFileChangeProfile = (event: any) => {
    const files: any = event.target.files;
    setSelectedProfileImg(files[0]); // only want to select one file
};
// Profile Images end 
  const handleFileChange = (event: any) => {
    const files: any = Array.from(event.target.files);
    setSelectedImages(files);
  };

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
        <div className=" my-4 px-8 md:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-2xl md:text-4xl ">
              Tell us about your business
            </h1>
            <p className="text-sm md:text-base text-justify">
              This information will be shown on the app so that customers can
              search and contact you in case they have any questions.
            </p>
            <p className="font-bold text-onPrimary">Personal Detail</p>
          </div>
          <div  className="">
                  <div onClick={handleCover} className="mt-10 cursor-pointer  flex flex-col justify-around items-center bg-onSecondary h-40 rounded-md">
                  <input
              type="file"
              accept="image/*"
              ref={fileInputRefCover}
              onChange={handleFileChangeCover}
              className="hidden"
            />
            {selectedCoverImg ? <img
              src={URL.createObjectURL(new Blob([selectedProfileImg]))}
              className=" max-h-36 w-full  object-cover object-fit rounded-md"
            />
            :<span className="w-60 flex flex-col items-center gap-4 ">
              <p className="text-2xl font-semibold  opacity-10">
            ADD Cover Photo
              </p>
            </span>}
                  </div>
                      <div className=" mt-[-40px] flex  justify-center flex-col items-center">

                  <div onClick={handleProfile} className="  cursor-pointer w  flex flex-col justify-center items-center bg-slate-300 h-36 w-36 rounded-full">
                  <input
              type="file"
              accept="image/*"
              ref={fileInputRefProfile}
              onChange={handleFileChangeProfile}
              className="hidden"
            />
            {selectedProfileImg ? <img
              src={URL.createObjectURL(new Blob([selectedProfileImg]))}
              className=" max-h-36 w-36  object-cover object-fit rounded-full"
            />
            :<span className="w-60 flex flex-col items-center gap-4 ">
              <i className="fa-solid fa-user text-5xl text-secondary"></i>
            </span>}
                  </div>
                  <p className="text-xl font-semibold  opacity-10">
            Add Profile
              </p>
                  </div>

          </div>
          <div className=" my-4 flex flex-col gap-1">
            <InputField placeholder="Location*" />
            <InputField
              // label="Business Name"placeholder
              placeholder="ID Card No*"
            />
            <TextArea />
          </div>
          <div className="mt-10  flex flex-col justify-around items-center bg-onSecondary h-72 rounded-md">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="w-60 flex flex-col items-center gap-4 ">
              <img
                src={imgUpl}
                alt="up img"
                className=" min-w-20 h-20 cursor-pointer"
              />
              <p className="text-sm text-center">
                Click to ADD multiple Images here and see below uploaded once
              </p>
            </span>
            <PrmaryBtn
              btnText="Choose File"
              onClick={handleClick}
              style="bg-primary py-2 border flex items-center justify-center text-onSecondary  text-sm w-fit md:text-base   px-3 rounded-full"
            />
          </div>
          {selectedImages.length > 0 && (
            <div className="grid gap-3 grid-cols-4 py-2 px-1 place-content-center items-center place-items-center bg-onSecondary mt-4 rounded-md">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className=" w-20 h-20 object-cover object-center rounded-md"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonalDetail;
