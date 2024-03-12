import "../Forms/FormsCss.css";
import img1 from "../../assets/images/AbousImg.png";
import img2 from "../../assets/images/AboutusImg2.png";
import PrmaryBtn from "../../components/PrmaryBtn";
import Footer from "../../components/Footer";

const AboutUs = () => {
  return (
    <section className=" pt-14 md:pt-20">
      <div className="AboutUsPage h-[530px]">
        <h1 className="text-secondary text-4xl uppercase font-bold pl-14 md:pl-40 pt-32 md:pt-52">
          About Us
        </h1>
      </div>

      <div className="grid gap-8 md:gap-3 grid-cols-1 md:grid-cols-2  place-items-center bg-gradient-to-r from-[#E9F3F3] via-[#E0E6FF] to-[#F2F0FF] p-8 md:p-20">
        <div className="col-span-1 flex items-start justify-center flex-col gap-6">
          <h1 className="text-3xl  font-semibold text-onPrimary">
          <span className="text-[#8584a5]">Farewell </span>Anxietys , <br/>    Greetings  <span className="text-[#8584a5] ">Recollection</span>
          </h1>
          <p>
            In the quiet embrace of tranquility, Anxieties bid adieu,
            relinquishing their hold, As cherished memories weave their stories
            untold.
          </p>
          <PrmaryBtn
            btnText="Get Started"
            style="bg-transparent border-2 border-onPrimary w-fit text-onPrimary py-2 px-4 rounded-md mt-4"
          />
        </div>
        <div className="col-span-1">
          <img src={img1} alt="logo" />
        </div>
      </div>
      <div className="py-6 md:py-32 px-8 md:px-36  bg-onSecondary">
        <h2 className="text-2xl md:text-3xl text-center font-semibold text-onPrimary">
          Explore India's extensive array of wedding photographers, bridal
          makeup artisans, and venues to simplify and enhance your wedding
          experience.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 place-items-center p-8  md:p-20">
        <div className="flex flex-col gap-4 col-span-1">
          <h2 className="text-4xl font-bold text-center md:text-start text-placeHolder">
            Upgrade Your Business!
          </h2>
          <p className="max-w-[540px]">
            Present your business in a whole new light, Unleash its maximum
            potential with our platform, Start transforming possibilities into
            realities today.
          </p>
        </div>
        <div className="col-span-1">
          <img src={img2} alt="logo2" />
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default AboutUs;
