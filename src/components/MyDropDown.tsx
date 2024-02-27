import { useState } from "react";

export const MyDropDown = ({title,arrVale , onSelect}:any) => {
  const [selectedValue, setSelectedValue] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  const isDropOpen = () => {
    setIsOpen(!isOpen);
  };

  const HandleSelectedValue = (item: any) => {
    return () => {
      setSelectedValue(item);
      onSelect(item)
      setIsOpen(false);
    };
  };
  return (
    <section className="relative">
      <div
        onClick={isDropOpen}
        className="cursor-pointer hover:bg-onSecondary text-placeHolder flex justify-between items-center bg-onSecondary h-12 w-full px-2 my-2 rounded-md"
      >
        {selectedValue}
        <span className=" duration-150">
          {isOpen ?
          <i className="pr-2 fa-solid fa-caret-up"></i>
          :
          <i className="pr-2 fa-solid fa-caret-down"></i>
        }
        </span>
      </div>
      <div className=" bg-red-700 ">
        <ul
          className={` duration-300 ${
            isOpen ? "scale-100" : "scale-0"
          } text-placeHolder absolute w-full overflow-y-auto h-40  z-10   rounded-md bg-onSecondary`}
        >
          {arrVale?.map((item:any,ind : any) => (
            <li key={ind}
              onClick={HandleSelectedValue(item)}
              className=" px-2 py-2 cursor-pointer hover:bg-[#E8F0FE] bg-secondary "
            >
               {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
