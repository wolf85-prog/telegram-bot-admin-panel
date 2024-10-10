import { React, useEffect, useState } from 'react'

import {
    CButton,
  } from '@coreui/react'

import './Calendar.css'

import { useUsersContext } from "../../chat-app-new/context/usersContext";

export default function Calendar() {
    //const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays, DAYS_OF_THE_WEEK } = useUsersContext();
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [currentDays, setCurrentDays] = useState([]);
    const [showButtonAdd, setShowButtonAdd] = useState([])

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getDay()-1;
        console.log(weekdayOfFirstDay)
        
        let arr = []
        for (let day = 0; day < 42; day++) {
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

    const overDay = (index) => {
        let arr = []
        arr[index] = true
        setShowButtonAdd(arr)
    }

    const outDay = (index) => {
        let arr = []
        arr[index] = false
        setShowButtonAdd(arr)
    }

    
  return (
    <div className='frame'>
        <div className='calendar-header'>
            <CButton onClick={() => setDate(new Date(year, month - 1, day))} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-14px', left: '11px'}}>
                -</span>
              </CButton>
            <div>
                {MONTHS[month]} {year}
            </div>
            <CButton onClick={() => setDate(new Date(year, month + 1, day))} className='uley_add_user uley_select_reset' style={{marginLeft: '0px', padding: '18px'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-13px', left: '6px'}}>
                +</span>
            </CButton>
            {/* <div onClick={() => setDate(new Date(year, month + 1, day))}>Next</div> */}
        </div>
        
        <div className='body'>
            {DAYS_OF_THE_WEEK.map(d => (
                <div className='day-header' key={d}>
                    <strong>{d}</strong>
                </div>
            ))}
            {
                currentDays.map((day, index) => {
                    return (
                        <div key={index} className="day" onMouseOver={()=>overDay(index)} onMouseOut={()=>outDay(index)}>
                            <p className='date-day'>{String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}</p>
                            <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
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