import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'; //
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetBookingApi } from '../../features/slicer/GetBookingSlicer';

const localizer = momentLocalizer(moment)

const index = () => {
    const dispatch = useDispatch();
    const { BookingsData } = useSelector((state: any) => state.GetBookingSlicer);
    
    useEffect(() => {
      dispatch(GetBookingApi());
    }, [dispatch]);
  
    const activeBooking = BookingsData?.active || [];
  
    const EventListing = (activeBooking || []).map((item: any, index:any) => ({
      title: item?.eventTitle,
      start: new Date(item?.eventStartDate),
      end: new Date(item?.eventEndDate),
      color : index % 2 === 0 ? 'green' : 'red'
    }));
  

    const eventStyleGetter = (event:any) => {
      const backgroundColor = event.color;
      return {
        style: {
          backgroundColor,
          color: 'white',
          borderRadius: '5px',
          padding: '5px',
        },
      };
    };
    
  const tooltipAccessor = (event:any) => {
    return `${event.title}\nLocation: ${event.location}\nDescription: ${event.description}\nhelllo world`;
  };

  return (
    <div className='container mx-auto'>
      <h1 className=' mt-4 mb-8 text-3xl text-primary font-bold underline mx-auto w-fit'>
         Events Detail 
      </h1>
    <div >
    <Calendar
      localizer={localizer}
      events={EventListing}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
      eventPropGetter={eventStyleGetter} // styling 
      tooltipAccessor={tooltipAccessor}  // Added tooltip accessor here

   />


  </div>
  </div>
 
  )
}

export default index

