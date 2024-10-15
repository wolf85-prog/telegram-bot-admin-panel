import { React, useEffect, useState, useRef } from 'react'

import {
    CButton,
  } from '@coreui/react'

import './Calendar.css'
import Select from 'react-select'

import { useUsersContext } from "../../chat-app-new/context/usersContext";

export default function Calendar({openProject, setHeight, showSidebar, setShowSidebar, setShowProject, setShowCalendar, setShowCalendar2}) {
    //const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays, DAYS_OF_THE_WEEK } = useUsersContext();
    // const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
    //const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
    const [currentDays, setCurrentDays] = useState([]);
    const [showButtonAdd, setShowButtonAdd] = useState([])

    const [project, setProject] = useState([])
    const [project2, setProject2] = useState([])
    const [showProject2, setShowProject2] = useState([])

    const ref = useRef(null)

    useEffect(() => {
        console.log(ref.current.clientHeight)
        setHeight(ref.current.clientHeight + 93)
    })

    useEffect(() => {
        setDay(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        //setStartDay(getStartDayOfMonth(date));

        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getUTCDay();
        
        let arr = []
        let countDay = 35
        if (weekdayOfFirstDay > 5 ) {
            countDay = 42
        } else {
            countDay = 35
        }
        for (let day = 0; day < countDay; day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
                console.log("0")
            } else if (day === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
                console.log("1")
            } else {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
                console.log("2")
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
//----------------------------------------------------------------------
    // function getStartDayOfMonth(date) {
    //     return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // }

    // function isLeapYear(year) {
    //     return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    // }

    //const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

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

    const nextMonth = () => {
        setDate(new Date(year, month + 1, day))
    }

    const prevMonth = () => {
        setDate(new Date(year, month - 1, day))
    }


    const changeMonth = (selectedOption) => {
        console.log(manthList.findIndex(el => el.value === selectedOption.value)); 
        let index = manthList.findIndex(el => el.value === selectedOption.value)
        setDate(new Date(year, index, day))
    }

    const addNewProject = (item) => {
        let arr = [...project]
        arr[item] = true
        setProject(arr)
        //setShowButtonAdd[item](false)
    }
    

    const addNewProject2 = (item) => {
        let arr = [...project]
        arr[item] = true
        setProject2(arr)
        
        let arr2 = [...showProject2]
        arr2[item] = true
        setShowProject2(arr2)
    }

    

    
  return (
    <div className='frame'  ref={ref}>
        <div className='calendar-header'>
            <CButton onClick={prevMonth} className='uley_add_user uley_select_reset' style={{marginRight: '10px', padding: '18px', marginLeft: '0'}}>
                <span style={{fontSize: '36px', color: '#2d2e38', position: 'absolute', top: '-14px', left: '11px'}}>
                -</span>
              </CButton>
            {/* <div>
                
                {MONTHS[month]}
            </div> */}
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
        
        <div className='body-table'>
            {DAYS_OF_THE_WEEK.map(d => (
                <div className='day-header' key={d}>
                    <strong>{d}</strong>
                </div>
            ))}
            {
                currentDays.map((day, index) => {
                    return (
                        <div key={index} className='day' style={{marginBottom: showProject2[index] ? '120px' : '20px'}} onMouseOver={()=>overDay(index)} onMouseOut={()=>outDay(index)}>
                            <p className='date-day' style={{color: project[index] ? '#1555f5' : ''}}>{String(day.number).padStart(2, "0") + '.'+ String(day.month+1).padStart(2, "0")}</p>
                            <CButton onClick={()=>addNewProject(index)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                +</span>
                            </CButton>

                            {project[index] ? 
                                <div className='viewProject' onClick={()=>openProject(index)}>
                                    <CButton onClick={()=>addNewProject2(index)} className='uley_add_user uley_select_reset joinBtn' style={{position: 'absolute', top: '-55px', height: '26px', width: '26px'}}>
                                        <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-9px', left: '4px'}}>
                                        +</span>
                                    </CButton>
                                    <p style={{fontSize: '16px', marginBottom: '3px'}}>Проект</p>
                                    {/* <p style={{fontSize: '14px', marginBottom: '3px', color: '#777777'}}>Компания</p> */}
                                    <p className='viewStatus'>Новый</p>

                                    <p className='time-project' style={{color: project[index] ? '#1555f5' : ''}}>09:00</p>
                                </div>
                             : <></>
                            }

                            {project2[index] ? 
                                <div className='viewProject' style={{position: 'absolute', top: '108px'}}>
                                    <CButton onClick={()=>addNewProject2(index)} className='uley_add_user uley_select_reset joinBtn' style={{position: 'absolute', top: '-55px', height: '26px', width: '26px'}}>
                                        <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-9px', left: '4px'}}>
                                        +</span>
                                    </CButton>
                                    <p style={{fontSize: '16px', marginBottom: '3px'}}>Проект</p>
                                    {/* <p style={{fontSize: '14px', marginBottom: '3px', color: '#777777'}}>Компания</p> */}
                                    <p className='viewStatus'>Новый</p>

                                    <p className='time-project' style={{color: project[index] ? '#1555f5' : ''}}>09:00</p>
                                </div>
                             : <></>
                            }
                        </div>
                    )
                })
            }
        </div>

        <div onClick={()=>setShowSidebar(true)} style={{cursor: 'pointer', position: 'absolute', top: '50%', right: '2px'}}>
            <div style={{borderTop: '1px solid #f3f3f3', width: '5px'}}></div>
            <div style={{borderTop: '1px solid #f3f3f3', width: '5px', marginTop: '15px'}}></div>
            <div style={{borderTop: '1px solid #f3f3f3', width: '5px', marginTop: '15px'}}></div>
            <div style={{borderTop: '1px solid #f3f3f3', width: '5px', marginTop: '15px'}}></div>
            <div style={{borderTop: '1px solid #f3f3f3', width: '5px', marginTop: '15px'}}></div>
            <div style={{borderLeft: '1px solid #f3f3f3', height: '65px', marginTop: '-65px'}}></div>
        </div>
        {/* <p onClick={()=>setShowSidebar(true)} style={{cursor: 'pointer', position: 'absolute', top: '50%', right: '2px'}}>
            E
        </p> */}
    </div>
  );
}