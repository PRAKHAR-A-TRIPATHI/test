import React, { useState } from 'react';
import { medicineData } from './varible';
import dayjs from 'dayjs';
import _ from 'lodash';
import { FaSun, FaMoon, FaCloudSun } from 'react-icons/fa';

function icons(slotTime) {
  const hour = slotTime.charAt(1);
  const time = slotTime.split(" ")

  if (time[1] === "am") {
    if (hour >= 6 && hour < 12) {
      return <FaSun />;
    }
  }
  if (time[1] === "pm") {
    if (hour >= 6 && hour < 12) {
      return <FaMoon />;
    } else {
      return <FaCloudSun />
    }
  }

}

function App() {
  const sameDateData = _.groupBy(medicineData, 'created_at');
  const items = Object.entries(sameDateData);
  const todayDate = dayjs().format('DD-MM-YYYY');

  const todayItem = items.find(([date, itemsArray]) => {
    if (dayjs(date).format('DD-MM-YYYY') === todayDate) {
      return itemsArray;
    }
  });
  const [details, setDetails] = useState(todayItem && todayItem[1]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("DD"));


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
          const valid = dayjs().isBefore(dayjs(date).format('YYYY-MM-DD'))
          return (
            <div key={formattedDate} className={`m-2 border-2 h-24 w-20 max-w-xs overflow-wrap rounded-md cursor-pointer p-2 ${selectedDate === formattedDate ? 'bg-blue-300' : ''}`}
              onClick={() => { setDetails(itemsArray); setSelectedDate(formattedDate) }}>
              <p>{formattedDate}</p>
              <p>{dayOfWeek}</p>
              {
                !valid && <p className='h-2 w-2 bg-red-600 rounded-xl'></p>
              }
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
                <p className='text-2xl font-bold'>{icons(slotTime)} {slotTime}</p>
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}

export default App;



