import Footer from "../../components/Footer";
import SignUp from "../../components/SignUp";
import SubDetail from "../../components/SubDetail";
import About from "../About/About";
import FAQ from "../FAQ/FAQ";
import Hero from "../Hero/Hero";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="relative px-8 md:px-40  bg-gradient-to-r from-[#FF8989] to-[#f4dada] ">
        <SignUp />
        <About />
      </div>
      <SubDetail />
      <Testimonial />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;
