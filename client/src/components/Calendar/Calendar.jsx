import { React, useEffect, useState } from 'react'

import {
    CButton,
  } from '@coreui/react'

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
    const [currentDays, setCurrentDays] = useState([]);

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getDay();
        
        let arr = []
        for (let day = 0; day < 35; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
    
        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === date.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === date.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }
    
        arr.push(calendarDay);
        setCurrentDays(arr)
        //console.log(currentDays)
        }
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
            {
                currentDays.map((day, index) => {
                    return (
                        <div key={index} className="day">
                            <p className='date-day'>{String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}</p>
                            <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: 'block', height: '26px', width: '26px'}}>
                                <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                +</span>
                            </CButton>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}