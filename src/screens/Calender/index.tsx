import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Calendar, Badge, Whisper, Popover } from 'rsuite'; // Assuming you are using rsuite
import { GetBookingApi } from '../../features/slicer/GetBookingSlicer';

const index = () => {
const { BookingsData } = useSelector((state: RootState) => state.GetBookingSlicer);
const [data, setData] = useState(BookingsData);
const activeBooking =    data?.active[0] || {};

// Parse and format the start and end dates using Moment.js
const startDate = activeBooking?.eventStartDate ? moment(activeBooking?.eventStartDate).startOf('day') : moment().startOf('day');
const endDate = activeBooking?.eventEndDate ? moment(activeBooking?.eventEndDate).endOf('day') : moment().endOf('day');

  // Create a list of events based on the provided booking data
  const generateTodoList = (date) => {
    if (!BookingsData || !BookingsData.active || !BookingsData.active.length) return [];
  
    const todoList = [];
  
    BookingsData.active.forEach(booking => {
      const bookingStartDate = moment(booking.eventStartDate);
      const bookingEndDate = booking.eventEndDate ? moment(booking.eventEndDate) : null;
      
      // Check if the date is within the range of the booking
      if (bookingStartDate.isSame(date, 'day') || (bookingEndDate && bookingEndDate.isSame(date, 'day'))) {
        todoList.push({
          time: bookingStartDate.format('hh:mm a') + (bookingEndDate ? ' - ' + bookingEndDate.format('hh:mm a') : ''),
          title: booking.title || "Event ",
          bookingDetail: booking
        });
      }
    });
  
    return todoList;
  };

  // Function to determine if a date should be highlighted
const isHighlighted = (date: Date) => {
    return startDate && endDate && moment(date).isBetween(startDate, endDate, 'day', '[]');
};

  const renderCell = (date:any) => {
    const list = generateTodoList(date);
    const displayList = list.slice(0, 2);
    const moreCount = list.length - displayList.length;
    const moreItem = moreCount > 0 ? (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p className='' key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    ) : null;

    const cellClass = isHighlighted(date) ? 'calendar-cell-highlight' : '';

    if (list.length) {
      return (
        <div className={` calendar-cell ${cellClass}`}>
          <ul className='bg-red-200 calendar-todo-list'>
            {displayList.map((_:any, index:any) => (
              <li  key={index} className='bg-blue-50 flex flex-col'>
                <span>

                <Badge /> <b>event</b>
                </span>
                   <span className='text-sm font-semibold text-red-800 capitalize'>
                     {activeBooking?.eventTitle}
                    </span>
              </li>
            ))}
            {moreItem}
          </ul>
        </div>
      );
    }

    return null;
  };

  useEffect(()=>{
    GetBookingApi()
  },[])
  return (
    <Calendar
      bordered
      renderCell={renderCell}
      minDate={startDate.toDate()}
      maxDate={endDate.toDate()}
    />
  );
};

export default index;
