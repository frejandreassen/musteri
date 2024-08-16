'use client'
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, subDays, addDays, addMonths, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function Calendar({ onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([])
  const [datesLoaded, setDatesLoaded] = useState(false)

  useEffect(() => {
    fetch('https://directus.andreassens.se/items/musteri_lediga_dagar?filter={"_and": [{"datum": {"_gte": "$NOW"}},{"bokad_appelmust_liter": {"_lt": 100}}]}')
        .then(response => response.json())
        .then(data => {
            setAvailableDates(data.data);
            setDatesLoaded(true);
        })
        .catch(error => {
            console.error("Error fetching available dates:", error);
        });
  }, []);

  useEffect(() => {
    
    const startOfThisMonth = startOfMonth(currentDate);
    const endOfThisMonth = endOfMonth(currentDate);

    let startDate = subDays(startOfThisMonth, getDay(startOfThisMonth) - 1); // Adjusts to the previous Sunday
    let endDate = addDays(endOfThisMonth, 7 - getDay(endOfThisMonth));
    let dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    const formattedDays = dateRange.map(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const isAvailable = availableDates.some(item => item.datum === formattedDate);
      const isHistory = formattedDate < format(new Date(), 'yyyy-MM-dd')
      return {
        date: formattedDate,
        isToday: formattedDate === format(new Date(), 'yyyy-MM-dd'),
        isHistory,
        isCurrentMonth: format(date, 'MM-yyyy') === format(currentDate, 'MM-yyyy'),
        isSelected: formattedDate === selectedDate,
        isAvailable: isAvailable
      }
    });
    
    setDays(formattedDays);
  }, [currentDate, selectedDate, availableDates]);

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };
  
  const handleDateClick = (date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
    setSelectedDate(date);
  };

  return (
    <>
    {!datesLoaded ? (
      <div className="my-32">
        <div className="spinner mx-auto"> </div>
        <div className="mx-auto text-center">Laddar lediga datum...</div>
      </div>
      ) : (<div>
        <div className="flex items-center text-gray-900 my-10">
          <button
            onClick={handlePreviousMonth}
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex-auto text-sm text-center font-semibold">{capitalizeFirstLetter(format(currentDate, 'MMMM yyyy',  {locale: sv}))}</div>
          <button
            onClick={handleNextMonth}
            type="button"
            className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 grid grid-cols-7 text-xs text-center leading-6 text-gray-500">
          <div>M</div>
          <div>T</div>
          <div>O</div>
          <div>T</div>
          <div>F</div>
          <div>L</div>
          <div>S</div>
        </div>
        <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
          {days.map((day, dayIdx) => (
            <button
              key={day.date}
              type="button"
              onClick={() => handleDateClick(day.date)} 
              disabled={!day.isAvailable}
              className={classNames(
                'py-1.5 hover:bg-gray-100 focus:z-10',
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                (day.isSelected || day.isToday) && 'font-semibold',
                day.isSelected && 'text-white',
                day.isCurrentMonth && 'text-gray-900',
                !day.isCurrentMonth && 'text-gray-400',
                day.isToday && !day.isSelected && 'font-bold',
                day.isAvailable && !day.isSelected && 'font-bold text-green-600 underline',
                dayIdx === 0 && 'rounded-tl-lg',
                dayIdx === 6 && 'rounded-tr-lg',
                dayIdx === days.length - 7 && 'rounded-bl-lg',
                dayIdx === days.length - 1 && 'rounded-br-lg'
              )}
            >
              <time
                dateTime={day.date}
                className={classNames(
                  'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  day.isSelected && day.isAvailable && 'bg-green-600',
                )}
              >
                {day.date.split('-').pop().replace(/^0/, '')}
              </time>
            </button>
          ))}
        </div>
        {(selectedDate) && <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <dt className="text-base font-medium">Valt datum</dt>
          <dd className="text-base font-medium text-gray-900">{format(new Date(selectedDate), 'dd MMM yyyy', {locale: sv})}</dd>
        </div>}
      </div>)}
    </>
  );
}

export default Calendar;
