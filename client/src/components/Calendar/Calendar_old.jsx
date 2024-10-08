import { React, useEffect, useState } from 'react'

import './Calendar.css'


export default function Calendar() {
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const MONTHS = ['Январь', 'Февраль', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));
    }, [date]);

    function getStartDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  return (
    <div className='frame'>
        {/* <div className='calendar-header'>
            <div onClick={() => setDate(new Date(year, month - 1, day))}>Prev</div>
            <div>
                {MONTHS[month]} {year}
            </div>
            <div onClick={() => setDate(new Date(year, month + 1, day))}>Next</div>
        </div> */}
        
        <div className='body'>
            {DAYS_OF_THE_WEEK.map(d => (
                <div className='day-header' key={d}>
                    <strong>{d}</strong>
                </div>
            ))}
            {Array(days[month] + (startDay - 1))
                .fill(null)
                .map((_, index) => {
                const d = index - (startDay - 2);
                return (
                    <div
                        className='day'
                        key={index}
                        // isToday={d === today.getDate()}
                        // isSelected={d === day}
                        onClick={() => setDate(new Date(year, month, d))}
                        >
                        {d > 0 ? d : ''}
                    </div>
                );
            })}
        </div>
    </div>
  );
}