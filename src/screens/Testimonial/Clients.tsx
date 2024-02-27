import PrmaryBtn from "../../components/PrmaryBtn"


const Clients = () => {
  return (
    <section className="bg-secMain  px-8 md:px-32 py-16 text-secondary flex flex-col items-center justify-center text-center gap-12">
        <h2 className="text-3xl font-semibold max-w-[800px]">
        9 out of 10 clients endorse selecting AARMA for 

Business
        </h2>
        <div className=" ">

        <PrmaryBtn btnText="Get Started" style="bg-white text-primary flex justify-center font-semibold w-40 py-3 px-4" />
        </div>
    </section>
  )
}

export default Clients