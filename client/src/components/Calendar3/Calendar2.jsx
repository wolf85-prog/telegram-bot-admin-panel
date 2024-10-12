import { React, useEffect, useState } from 'react'

import {
    CButton,
  } from '@coreui/react'

import './Calendar2.css'
import Select from 'react-select'

import { useUsersContext } from "../../chat-app-new/context/usersContext";

export default function Calendar2({showSidebar, setShowSidebar}) {
    //const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays, DAYS_OF_THE_WEEK } = useUsersContext();
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_OF_THE_WEEK = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const manthList = [
        { value: 'Январь', label: 'Январь' },
        { value: 'Февраль', label: 'Февраль' },
        { value: 'Март', label: 'Март' },
        { value: 'Апрель', label: 'Апрель' },
        { value: 'Май', label: 'Май' },
        { value: 'Июнь', label: 'Июнь' },
        { value: 'Июль', label: 'Июль' },
        { value: 'Август', label: 'Август' },
        { value: 'Сентябрь', label: 'Сентябрь' },
        { value: 'Октябрь', label: 'Октябрь' },
        { value: 'Ноябрь', label: 'Ноябрь' },
        { value: 'Декабрь', label: 'Декабрь' },
    ]
    // Will be implemented below
    const today = new Date();
    const [date, setDate] = useState(today);
    const [day, setDay] = useState(date.getDate());
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());
    const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [currentDays, setCurrentDays] = useState([]);
    const [showButtonAdd, setShowButtonAdd] = useState([])
    const [showButtonAdd2, setShowButtonAdd2] = useState([])
    const [showButtonAdd3, setShowButtonAdd3] = useState([])
    const [showButtonAdd4, setShowButtonAdd4] = useState([])
    const [showButtonAdd5, setShowButtonAdd5] = useState([])
    const [showButtonAdd6, setShowButtonAdd6] = useState([])
    const [showButtonAdd7, setShowButtonAdd7] = useState([])

    useEffect(() => {
        console.log(today)
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getUTCDay();
        
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

    const overDay = (index, td) => {
        let arr = []
        arr[index] = true
        if (td === 1) {
            setShowButtonAdd(arr)
        } else if (td === 2) {
            setShowButtonAdd2(arr) 
        } else if (td === 3) {
            setShowButtonAdd3(arr) 
        } else if (td === 4) {
            setShowButtonAdd4(arr) 
        } else if (td === 5) {
            setShowButtonAdd5(arr) 
        } else if (td === 6) {
            setShowButtonAdd6(arr) 
        } else if (td === 7) {
            setShowButtonAdd7(arr) 
        }
    }

    const outDay = (index, td) => {
        let arr = []
        arr[index] = false
        if (td === 1) {           
            setShowButtonAdd(arr)
        } else if (td === 2) {
            setShowButtonAdd2(arr) 
        } else if (td === 3) {
            setShowButtonAdd3(arr) 
        } else if (td === 4) {
            setShowButtonAdd4(arr) 
        } else if (td === 5) {
            setShowButtonAdd5(arr) 
        } else if (td === 6) {
            setShowButtonAdd6(arr) 
        } else if (td === 7) {
            setShowButtonAdd7(arr) 
        }
        
    }

    const nextMonth = () => {
        setDate(new Date(year, month + 1, day))
    }

    const prevMonth = () => {
        setDate(new Date(year, month - 1, day))
    }


    const changeMonth = (selectedOption) => {
        //console.log(manthList.findIndex(el => el.value === selectedOption.value)); 
        let index = manthList.findIndex(el => el.value === selectedOption.value)
        setDate(new Date(year, index, day))
    }

    
  return (
    <div className='frame'>
        <div className='calendar-header'>
            <CButton onClick={prevMonth} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-14px', left: '11px'}}>
                -</span>
              </CButton>
            <Select
                className="uley_react_select"
                options={manthList}
                //defaultValue={manthList[month]}
                value={manthList[month]}
                onChange={changeMonth}
                classNamePrefix="custom-select_3"
            />
            <CButton onClick={nextMonth} className='uley_add_user uley_select_reset' style={{marginLeft: '0px', padding: '18px'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-13px', left: '6px'}}>
                +</span>
            </CButton>
        </div>
        <table className='frame'>
            <tr>
                <th className='table-header'>1</th>
                <th className='table-header'>2</th>
                <th className='table-header'>3</th>
                <th className='table-header'>4</th>
                <th className='table-header'>5</th>
                <th className='table-header'>6</th>
                <th className='table-header'>7</th>
            </tr>
            {Array(days[month] + (startDay - 1)).fill(null).map((_, index) => {
                const d = index - (startDay - 2);
                if (index !== 0) {
                    return (
                        <><tr key={index}>
                            <td className='day2' onMouseOver={()=>overDay(index, 1)} onMouseOut={()=>outDay(index, 1)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 2)} onMouseOut={()=>outDay(index, 2)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd2[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 3)} onMouseOut={()=>outDay(index, 3)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd3[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 4)} onMouseOut={()=>outDay(index, 4)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd4[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 5)} onMouseOut={()=>outDay(index, 5)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd5[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 6)} onMouseOut={()=>outDay(index, 6)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd6[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 7)} onMouseOut={()=>outDay(index, 7)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd7[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                            </td>

                        </tr>
                        <tr style={{height: '20px'}}></tr>
                        </>
                    )
                }
            }) 
            }
            
        </table>
        <p onClick={()=>setShowSidebar(true)} style={{position: 'absolute', top: '50%', right: '2px'}}>^</p>
    </div>
  );
}