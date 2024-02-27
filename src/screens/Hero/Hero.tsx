import "./Hero.css";

const Hero = () => {
  return (
    <section className="HeroDiv  h-screen">
      <div className="px-4 md:pl-40 flex flex-col h-full gap-4 justify-center">
        <h1 className="text-secondary font-semibold text-2xl md:text-4xl">
          Get start your <br />
          business with 100,000 <br /> of thinkings
        </h1>
        <p className="text-white max-w-[389px]">
          "Ready to elevate your business? Sign up now to access premium
          features and stay ahead in your industry".
        </p>
      </div>
    </section>
  );
};

export default Hero;
