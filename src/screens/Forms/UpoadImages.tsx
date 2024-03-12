import { useRef, useState } from "react";
import PrmaryBtn from "../../components/PrmaryBtn";
import imgUpl from "../../assets/images/uploaImg.png";
import PrograssBar from "../../components/ProgressBar";
const UpoadImages = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const files: any = Array.from(event.target.files);
    setSelectedImages(files);
  };

  return (
    <section className=" flex min-h-screen pt-14 md:pt-20 ">
      <div className={`hidden md:block flex-1 uploadImgFormDiv  `}>
        <div className="flex justify-center h-full  pt-28">
          <h1 className=" font-Inter font-bold text-4xl text-secondary">
            AARMA BUSINESS
          </h1>
        </div>
      </div>
      <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
        <div className=" px-8 my-4  lg:px-24 ">
          <div className=" max-w-[530px] flex flex-col gap-4">
            <h1 className="text-onPrimary font-bold text-xl md:text-3xl ">
              Images
            </h1>
            <p className="text-sm md:text-base text-justify md:max-w-[300px]">
              Upload Images. You can upload up to 5 images.
            </p>
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
                <img src={imgUpl} alt="up img" className=" min-w-20 h-20 cursor-pointer" />
              <p  className="text-sm text-center">
                Click to ADD multiple Images here and see below uploaded once
              </p>
              </span>
              <PrmaryBtn
                btnText="Choose File"
                onClick={handleClick}
                style="bg-primary py-2 border flex items-center justify-center text-onSecondary  text-sm w-fit md:text-base   px-3 rounded-full"
              />
          </div>
          {
            selectedImages.length>0 &&
          
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
        }
        </div>
        <div className="mt-4">
          <PrograssBar navigateTo='/' />
        </div>
      </div>
    </section>
  );
};

export default UpoadImages;
