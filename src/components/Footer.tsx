import Apple from "../assets/images/appleLogo.png";
import Google from "../assets/images/playStoreLogo.png";

const Footer = () => {
  return (
    <footer className="text-onPrimary bg-secondary shadow-lg shadow-black gap-4  grid grid-cols-1 md:grid-cols-4 px-12 md:px-32 pt-20 pb-32">
      <div className="col-span-1">
        <h2 className="font-Inter text-2xl font-bold ">AARMA BUSINESS</h2>
      </div>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 col-span-2 ">
        {/* <div className="  "> */}

        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Company</h3>
          <p className="text-sm">Contact Us</p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Services</h3>
          <p className="text-sm">Photographer</p>
          <p className="text-sm">Catering</p>
          <p className="text-sm">Salon </p>
        </div>
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Lawful</h3>
          <p className="text-sm">Term & Conditions</p>
          <p className="text-sm">Privacy</p>
        </div>
        {/* </div> */}
      </div>
      <div className="col-span-1 grid gap-4">
        <div className="text-3xl flex gap-4 ">
          <span>
            <i className="fa-brands fa-facebook"></i>
          </span>
          <span>
            <i className="fa-brands fa-twitter"></i>
          </span>
          <span>
            <i className="fa-brands fa-linkedin"></i>
          </span>
        </div>
        <div>
          <span className="flex flex-col md:flex-row gap-4 justify-center">
            <img className="cursor-pointer w-32" src={Apple} alt="" />
            <img className="cursor-pointer w-32" src={Google} alt="" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
