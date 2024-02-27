
import test1 from '../../assets/images/Group 3.png'
import test2 from '../../assets/images/Group 4.png'
import test3 from '../../assets/images/Group 5.png'
import Clients from './Clients';



const Testimonial = () => {
    const test = [{
        image : test1 ,
        title : "The Customers Orders",
        detail: 'The customer places an order through the AARMA app.'
    },
    {
        image : test2 ,
        title : "The Customers Orders",
        detail: 'The customer places an order through the AARMA app.'
    },
    {
        image : test3 ,
        title : "The Customers Orders",
        detail: 'The customer places an order through the AARMA app.'
    }]
  return (
    <>
    <section className=' md:px-32 px-8 py-32'>
      <h2 className='text-2xl md:text-3xl font-semibold text-onPrimary md:max-w-[828px] leading-10'>AARMA Paves the Way for New Ventures and Opportunities
      Testimonial
      </h2>

      <div className='flex flex-col md:flex-row gap-8  justify-around items-center pt-20'>
        {
            test.map((item,ind)=>(
                <div key={ind} className='w-72  md:w-80 flex flex-col gap-5'>   
                <div className='w-80 h-72 shadow-xl hover:scale-105 duration-300 '>

                    <img src={item.image} alt="img" className='' />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h3 className='font-semibold text-lg'>
                            {item.title}
                        </h3>
                        <p className='text-sm text-placeHolder md:max-w-[300px]'>
                            {item.detail}
                        </p>
                        </div>
                    </div>
            ))
        }
      </div>
    </section>
    <Clients/>
    </>
  );
};

export default Testimonial;
