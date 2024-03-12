import Footer from '../components/Footer'
import InputField from '../components/InputField'
import PrmaryBtn from '../components/PrmaryBtn'
import TextArea from '../components/TextArea'
import './Forms/FormsCss.css'
const ContactUs = () => {
  return (
    <>

    <section className=" flex min-h-screen pt-14 md:pt-20 ">
    <div className={`hidden md:block flex-1 ContactUsDiv  `}>
      <div className="flex justify-center h-full  pt-28">
        <h1 className=" font-Inter font-bold text-4xl text-secondary">
          AARMA BUSINESS
        </h1>
      </div>
    </div>
    <div className="flex-1 flex py-14 justify-between flex-col bg-secondary">
      <div className="  my-4 px-8 md:px-24 ">
        <div className=" max-w-[530px] flex flex-col gap-4">
          <h1 className="text-onPrimary font-bold text-xl md:text-3xl ">
            Contact Us
          </h1>
        </div>
        <div className=" my-4 flex flex-col gap-1">
          <InputField placeholder="Name*" />
          <InputField placeholder="Email*" />
        <TextArea />  
        <PrmaryBtn btnText="Send" style="bg-primary py-2 border flex items-center justify-center text-onSecondary  text-sm w-full md:text-base   px-3 rounded-full" />        
        </div>
      </div>
      
    </div>
  </section>
  <Footer/>
  </>
  )
}

export default ContactUs