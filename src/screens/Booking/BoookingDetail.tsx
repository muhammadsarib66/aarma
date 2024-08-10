/* eslint-disable @typescript-eslint/no-explicit-any */
import EventInfo from "./EventInfo";
import Planner from "./Planner";
import { useState } from "react";
import Activity from "./Activity";
import {
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
 

const BoookingDetail = () => {
  const [activeTab, setActiveTab] = useState("eventinfo");
const [activeTabTitle, setActiveTabTitle] = useState("event Info");
  const HeadTabs = [
    { title: "event Info", link: "eventinfo" },
    { title: "Planner", link: "planner" },
    { title: "Activity", link: "activity" },
  ];

  const handleTabs = (link: any,title:any) => {
    setActiveTab(link);
    setActiveTabTitle(title)
  };
  return (
    <>
      <section className="h-fit   mt-20  w-full p-4">
      <Tabs 
      value={activeTabTitle === activeTab ? activeTabTitle : "outlined"}
      // value={activeTabTitle ?? "event info"}
      
      >
      <TabsHeader 
       placeholder=""
       onPointerEnterCapture={() => {}}
       onPointerLeaveCapture={() => {}}
       className="h-16">
        {HeadTabs.map(({ title, link }) => (
          <Tab
          placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
            key={title}
            onClick={() => handleTabs(link, title)}
            value={link}
            className="capitalize"
          >

            {title}
          </Tab>
          
        ))}
      </TabsHeader>
        <div>
          {(activeTab === "eventinfo" && <EventInfo />) ||
            (activeTab === "planner" && <Planner />) ||
            (activeTab === "activity" && <Activity />)} 
        </div>
      </Tabs>
      </section>
    </>
  );
};

export default BoookingDetail;
