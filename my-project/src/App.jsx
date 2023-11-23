import React, { useState } from 'react';
import { medicineData } from './varible';
import dayjs from 'dayjs';
import _ from 'lodash';
import { FaSun, FaMoon, FaCoffee } from 'react-icons/fa';

function App() {
  const sameDateData = _.groupBy(medicineData, 'created_at');
  const items = Object.entries(sameDateData);
  const [details, setDetails] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  let data = "";

  if (details) {
    const sameTime = _.groupBy(details, 'slot_time');
    data = Object.entries(sameTime);
  }
  
  // console.log(data)
  return (
    <>
      <div className='flex justify-between flex-wrap'>
        {items.map(([date, itemsArray]) => {
          const formattedDate = dayjs(date).format('DD');
          const dayOfWeek = dayjs(date).locale('en').format('ddd');

          return (
            <div key={formattedDate} className={`m-2 border-2 h-24 w-20 max-w-xs overflow-wrap rounded-md cursor-pointer p-2 ${selectedDate === formattedDate ? 'bg-blue-300' : ''}`}
              onClick={() => {setDetails(itemsArray) ;setSelectedDate(formattedDate)}}>
              <p>{formattedDate}</p>
              <p>{dayOfWeek}</p>

            </div>
          );
        })}
      </div>

      {data &&
        <div>
          <div>
            {data.map(([slotTime, slotItems]) => (
              <div key={slotTime} className='flex justify-between border-2 border-blue-500 m-2 p-2'>
                <div>
                  {
                    slotItems.map((item) =>
                      <div key={item.id} >
                        <p >{item.medicine_name}</p>
                      </div>
                    )
                  }
                </div>
                <p className='text-2xl font-bold'> {slotTime}</p>
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}

export default App;



