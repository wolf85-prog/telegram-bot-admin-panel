import { React, useEffect, useState, useRef  } from 'react'

import {
    CButton,
  } from '@coreui/react'

import './Calendar2.css'
import Select from 'react-select'

import { useUsersContext } from "../../chat-app-new/context/usersContext";
import { addProject } from '../../http/projectAPI'

export default function Calendar2({openProject, setHeight, showSidebar, setShowSidebar, setShowProject, setShowCalendar, setShowCalendar2}) {
    //const { MONTHS, date, setDate, day, setDay, month, setMonth, year, setYear, startDay, setStartDay, currentDays, DAYS_OF_THE_WEEK } = useUsersContext();
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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

    const [project, setProject] = useState([])
    const [project2, setProject2] = useState([])
    const [project3, setProject3] = useState([])
    const [project4, setProject4] = useState([])
    const [project5, setProject5] = useState([])
    const [project6, setProject6] = useState([])
    const [project7, setProject7] = useState([])

    const [projectName, setProjectName] = useState('')

    const ref = useRef(null)

    useEffect(() => {
        console.log(ref.current.clientHeight)
        setHeight(ref.current.clientHeight + 74)
    })

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
            if (!project[index]) {
                setShowButtonAdd(arr)
            }           
        } else if (td === 2) {
            if (!project2[index]) {
                setShowButtonAdd2(arr)
            } 
        } else if (td === 3) {
            if (!project3[index]) {
                setShowButtonAdd3(arr)
            } 
        } else if (td === 4) {
            if (!project4[index]) {
                setShowButtonAdd4(arr)
            } 
        } else if (td === 5) {
            if (!project5[index]) {
                setShowButtonAdd5(arr)
            }  
        } else if (td === 6) {
            if (!project6[index]) {
                setShowButtonAdd6(arr)
            }  
        } else if (td === 7) {
            if (!project7[index]) {
                setShowButtonAdd7(arr)
            }  
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


    const addNewProject = async(item, day) => {

        const projectTitle = 'Новый проект'

        const res = await addProject({
            name: projectTitle, 
            datestart: '', 
            dateend: '', 
            //crmID: '', 
            teh: '', 
            managerId: '', 
            companyId: '', 
            chatId: '', 
            spec: '', 
            geo: ''
        })

        console.log("res: ", res)

        setProjectName(projectTitle)

        if (day === 1) {
            let arr = [...project]
            arr[item] = true
            setProject(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd(arr2)
        } else 
        if (day === 2) {
            let arr = [...project2]
            arr[item] = true
            setProject2(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd2(arr2)
        } else 
        if (day === 3) {
            let arr = [...project3]
            arr[item] = true
            setProject3(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd3(arr2)
        } else 
        if (day === 4) {
            let arr = [...project4]
            arr[item] = true
            setProject4(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd4(arr2)
        } else 
        if (day === 5) {
            let arr = [...project5]
            arr[item] = true
            setProject5(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd5(arr2)
        } else 
        if (day === 6) {
            let arr = [...project6]
            arr[item] = true
            setProject6(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd6(arr2)
        } else 
        if (day === 7) {
            let arr = [...project7]
            arr[item] = true
            setProject7(arr)

            let arr2 = []
            arr2[item] = false
            setShowButtonAdd7(arr2)
        }
        
    }
    
  return (
    <div className='frame2' ref={ref}>
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
        <table className='frame2'>
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
                                <CButton onClick={()=>addNewProject(index, 1)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 1)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 2)} onMouseOut={()=>outDay(index, 2)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 2)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd2[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project2[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 2)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 3)} onMouseOut={()=>outDay(index, 3)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 3)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd3[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project3[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 3)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 4)} onMouseOut={()=>outDay(index, 4)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 4)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd4[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project4[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 4)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 5)} onMouseOut={()=>outDay(index, 5)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 5)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd5[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project5[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 5)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 6)} onMouseOut={()=>outDay(index, 6)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 6)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd6[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project6[index] ?
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 6)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
                            </td>
                            <td className='day2' onMouseOver={()=>overDay(index, 7)} onMouseOut={()=>outDay(index, 7)}>
                                <p className='date-day'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                <CButton onClick={()=>addNewProject(index, 7)} className='uley_add_user uley_select_reset joinBtn' style={{display: showButtonAdd7[index] ? 'block' : 'none', height: '26px', width: '26px'}}>
                                    <span style={{fontSize: '25px', color: '#2d2e38', position: 'absolute', top: '-10px', left: '4px'}}>
                                    +</span>
                                </CButton>
                                {project7[index] ? 
                                    <><p className='date-proj-day2'>{String(d).padStart(2, "0") + '.'+ String(month+1).padStart(2, "0")}</p>
                                    <div className='view-project' onClick={()=>openProject(index, 7)}>
                                        <p style={{fontSize: '16px', marginBottom: '3px'}}>{projectName}</p>   
                                        <p className='viewStatus'>Новый</p>

                                        <p className='time-project' style={{color: '#1555f5'}}>09:00</p>
                                    </div></>
                                    : <></>
                                }
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