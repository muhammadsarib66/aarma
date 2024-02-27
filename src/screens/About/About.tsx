// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import StepContent from "@mui/material/StepContent";
// import Typography from "@mui/material/Typography";
import img1 from "../../assets/images/bodyImg1.png";
import img2 from "../../assets/images/bodyImg2.png";
import img3 from "../../assets/images/bodyImg3.png";

const steps = [
  {
    image: img1,
    label:
      "Discover Excellence: Connecting with New Customers at AARMABUSINESS",
    description: `Welcome to AARMABUSINESS, where our commitment to excellence is more than a philosophy – it's the driving force behind every interaction and service we provide. As a forward-thinking business, we understand the importance of forging strong connections with new customer..`,
  },
  {
    image: img2,
    label: "Crafting Unforgettable Moments: Your Premier Event Service Provide",
    description: `Welcome to an extraordinary realm of event experiences at Your Premier Event Service Provider. We are more than just curators of occasions; we are architects of unforgettable moments. Our mission is to transform your vision into reality, crafting events that linger in the hearts and memories of every attendee. `,
  },
  {
    image: img3,
    label:
      "Unparalleled Service, Unforgettable Events: “AARMA BUSINESS” Leading the Way",
    description: `Leading the way in event services, AARMA BUSINESS stands as a beacon of innovation and reliability. Our team of dedicated professionals brings together a wealth of expertise, creativity, and a passion for creating exceptional experiences. From corporate gatherings to private celebrations, AARMA BUSINESS is synonymous with meticulous planning, flawless execution, and a personalized touch that elevates every event to a new level of distinction`,
  },
  
];

const About = () => {
  return (
    <section className="relative -top-28">
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-onPrimary md:max-w-[749px]">
          Your Business, Our Priority Join us for Exceptional Service
        </h2>
      </div>
      <div className=" flex gap-8 justify-start">
        <div className="hidden md:flex flex-col gap-4 ">
          {steps.map((item, index) => (
            <img
              key={index}
              className="my-2 h-52 min-w-[320px] object-cover  "
              src={item.image}
              alt=""
            />
          ))}
        </div>
        <ol className="  relative min-h-fit  flex flex-col gap-3 md:gap-8 max-w-[600px]  border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
          {steps.map((item, index) => (
            <li key={index} className=" flex flex-col gap-4  ms-6">
              <span className="absolute flex  items-center justify-center w-2 h-2 bg-green-200 rounded-full -start-1 ring-2 ring-white dark:ring-gray-300 "></span>
              <h3 className=" text-onPrimary text-xl font-medium leading-tight">
                {item.label}
              </h3>https://mui.com/material-ui/react-paper/
              <img
              key={index}
              className="md:hidden my-2 h-52 md:max-w-[320px] object-contain  "
              src={item.image}
              alt=""
            />
              <p className=" mb-4 text-onPrimary text-sm tracking-wider md:leading-7">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default About;
