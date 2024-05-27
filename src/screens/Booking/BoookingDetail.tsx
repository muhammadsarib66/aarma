/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@material-tailwind/react";
import EventInfo from "./EventInfo";
import Planner from "./Planner";
import { useState } from "react";
import Activity from "./Activity";

const BoookingDetail = () => {
  const [activeTab, setActiveTab] = useState("eventinfo");

  const HeadTabs = [
    { title: "event Info", link: "eventinfo" },
    { title: "Planner", link: "planner" },
    { title: "Activity", link: "activity" },
    { title: "Group Chat", link: "groupchat" },
    { title: "Chat", link: "chat" },
  ];

  const handleTabs = (link: any) => {
    setActiveTab(link);
  };
  return (
    <>
      <section className="h-fit   mt-20  w-full p-4">
        <div className=" flex gap-1  my-3">
          {HeadTabs.map((item, index) => (
            <Button
              variant={item.link === activeTab ? "filled" : "outlined"}
              className="w-full col-span-2 h-16"
              key={index}
              onClick={() => handleTabs(item.link)}
              placeholder={undefined}
            >
              {item.title}
            </Button>
          ))}
        </div>
        <div>
          {(activeTab === "eventinfo" && <EventInfo />) ||
            (activeTab === "planner" && <Planner />) ||
            (activeTab === "activity" && <Activity />)} 
        </div>
      </section>
    </>
  );
};

export default BoookingDetail;
