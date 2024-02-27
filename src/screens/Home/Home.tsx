import SignUp from "../../components/SignUp";
import SubDetail from "../../components/SubDetail";
import About from "../About/About";

import Hero from "../Hero/Hero";
import Testimonial from "../Testimonial/Testimonial";

// import About from "../About/About";
const Home = () => {
  return (
    <>
      <Hero />
    <div className="relative px-8 md:px-40  bg-gradient-to-r from-[#FF8989] to-[#f4dada] ">
      <SignUp />
      <About />
    </div>
    <SubDetail />
    <Testimonial/>

    </>
  );
};

export default Home;
