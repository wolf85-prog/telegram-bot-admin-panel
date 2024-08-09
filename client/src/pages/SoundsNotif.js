import React, { Suspense, useEffect, useState, useContext } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { delSoundNotif, getProcess, getSoundNotif, startSoundNotif } from './../http/adminAPI.js'

import {
  CContainer, 
  CSpinner,
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,
  CNav,
  CNavItem,
  CNavLink,
  CFormInput,
  CButton,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'

// routes config
import routes from '../routes'

import stopIcon from 'src/assets/images/stop.png'
import stopIcon2 from 'src/assets/images/stop_press.png'
import playIcon from 'src/assets/images/play.png'
import playIcon2 from 'src/assets/images/play_press.png'
import recIcon from 'src/assets/images/rec.png'
import recIcon2 from 'src/assets/images/rec_press.png'

import status1Icon from 'src/assets/images/status1.png'
import status2Icon from 'src/assets/images/status2.png'

const SoundsNotif = () => {  

  const { soundsNotif, 
    sendNumberProcess, 
    statusProcess, 
    statusProcess2, 
    statusProcess3, 
    statusProcess4, 
    statusProcess5, 
    statusProcess6,
    setStatusProcess, 
    setStatusProcess2, 
    setStatusProcess3, 
    setStatusProcess4, 
    setStatusProcess5, 
    setStatusProcess6,
    // intervalProcess,
    // intervalProcess2,
    // intervalProcess3,
    // intervalProcess4,
    // intervalProcess5,
    // setIntervalProcess,
    // setIntervalProcess2,
    // setIntervalProcess3,
    // setIntervalProcess4,
    // setIntervalProcess5,
    // timeProcess,
    // timeProcess2,
    // timeProcess3,
    // timeProcess4,
    // timeProcess5,
    // setTimeProcess,
    // setTimeProcess2,
    // setTimeProcess3,
    // setTimeProcess4,
    // setTimeProcess5
  } = useUsersContext();

  const [intervalProcess, setIntervalProcess] = useState('10') //бот заказчика
	const [intervalProcess2, setIntervalProcess2] = useState('10') // бот специалиста
	const [intervalProcess3, setIntervalProcess3] = useState('10') // бот специалиста
	const [intervalProcess4, setIntervalProcess4] = useState('4') // бот специалиста
	const [intervalProcess5, setIntervalProcess5] = useState('1') // бот рассылки
  const [intervalProcess6, setIntervalProcess6] = useState('2') // бот рассылки (планировщик)

	const [timeProcess, setTimeProcess] = useState('M')
	const [timeProcess2, setTimeProcess2] = useState('M')
	const [timeProcess3, setTimeProcess3] = useState('M')
	const [timeProcess4, setTimeProcess4] = useState('S')
	const [timeProcess5, setTimeProcess5] = useState('S')
  const [timeProcess6, setTimeProcess6] = useState('M')

  const [loadingIframe, setLoadingIframe] = useState(true);
  const [loadingIframe2, setLoadingIframe2] = useState(true);
  const [loadingIframe3, setLoadingIframe3] = useState(true);
  const [loadingIframe4, setLoadingIframe4] = useState(true);

  const [soundNotif, setSoundNotif] = useState([]); 
  const [activeKey, setActiveKey] = useState(2)
  const [tabhub, setTabhub]= useState('');
  const [showStatic, setShowStatic]= useState(true);
  const [showProcess, setShowProcess]= useState(false);
  
  const [showProcessInfo, setShowProcessInfo]= useState([]);

  const [loadStatus, setLoadStatus]= useState([]);
  const [playProcess, setPlayProcess]= useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]);
  const [stopProcess, setStopProcess]= useState([true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]);


  const [showInterval, setShowInterval]= useState([]);
  const [showTime, setShowTime]= useState([]);


  const [arrInt, setArrInt] = useState([])
  const [arrInt2, setArrInt2] = useState([])
  const [arrInt3, setArrInt3] = useState([])
  const [arrInt4, setArrInt4] = useState([])
  const [arrInt5, setArrInt5] = useState([])
  const [arrInt6, setArrInt6] = useState([])

  const [sortInterval, setSortInterval] = useState(false)
  const [sortTime, setSortTime] = useState(false)
  const [clickSort, setClickSort] = useState(false)

  const [processAll, setProcessAll] = useState([])

  const arrTime = [{label: 'S', value: 'S',},{label: 'M', value: 'M',},{label: 'H',value: 'H',},]

  const arrH = [
    {label: 1, value: 1,},
    {label: 2, value: 2,},
    {label: 3, value: 3,},
    {label: 4, value: 4,},
    {label: 5, value: 5,},
    {label: 6, value: 6,},
    {label: 7, value: 7,},
    {label: 8, value: 8,},
    {label: 9, value: 9,},
    {label: 10, value: 10,},
    {label: 12, value: 12,},
    {label: '--', value: 0, disabled: true,},
    {label: 24, value: 24,},
  ]

  const arrM = [
    {label: 1, value: 1,},
    {label: 2, value: 2,},
    {label: 3, value: 3,},
    {label: 4, value: 4,},
    {label: 5, value: 5,},
    {label: 6, value: 6,},
    {label: 7, value: 7,},
    {label: 8, value: 8,},
    {label: 9, value: 9,},
    {label: 10, value: 10,},
    {label: '--', value: 0, disabled: true,},
    {label: 20, value: 20,},
    {label: 30, value: 30,},
    {label: 40, value: 40,},
    {label: 50, value: 50,},
    {label: 60, value: 60,},
  ]

  const arr = [
    {
      interval: intervalProcess, 
      time: timeProcess, 
      process: 'Название и статус проекта',
      code: 'yellow', 
      dop: 'getReports()',
      resurs: 'Rent',
      status: statusProcess,
    }, 
    {
      interval: intervalProcess, 
      time: timeProcess, 
      process: 'Даты проекта из основного состава', 
      code: 'yellow', 
      dop: 'getReports()',
      resurs: 'Rent',  
      status: statusProcess,
    }, 
    {
      interval: intervalProcess, 
      time: timeProcess, 
      process: 'TelegramID менеджера проекта', 
      code: 'yellow', 
      dop: 'getReports()',
      resurs: 'Rent',
      status: statusProcess,
    },
    {
      interval: intervalProcess2, 
      time: timeProcess2, 
      process: 'Название и статус проекта', 
      code: 'purple', 
      dop: 'getReportsRestart()',
      resurs: 'Rent',
      status: statusProcess2,
    },
    {
      interval: intervalProcess2, 
      time: timeProcess2, 
      process: 'Даты проекта из основного состава', 
      code: 'purple', 
      dop: 'getReportsRestart()',
      resurs: 'Rent', 
      status: statusProcess2,
    },
    {
      interval: intervalProcess2,
      time: timeProcess2,  
      process: 'TelegramID менеджера проекта', 
      code: 'purple', 
      dop: 'getReportsRestart()',
      resurs: 'Rent',
      status: statusProcess2,
    },
    {
      interval: intervalProcess3,
      time: timeProcess3,  
      process: 'Все проекты', 
      code: 'blue', 
      dop: 'getProjects',
      resurs: 'Work',
      status: statusProcess3,
    },
    {
      interval: intervalProcess3,
      time: timeProcess3,  
      process: 'Все сметы', 
      code: 'blue', 
      dop: 'getSmetaAll',
      resurs: 'Work',
      status: statusProcess3,
    },
    {
      interval: intervalProcess3,
      time: timeProcess3,
      process: 'Название проекта',
      code: 'blue', 
      dop: 'Отказы | getProjectName',
      resurs: 'Work',
      status: statusProcess3,
    },
    {
      interval: intervalProcess3,
      time: timeProcess3,  
      process: 'Статус работы претендента', 
      code: 'blue', 
      dop: 'Отказы | getWorkerPretendent',
      resurs: 'Work',
      status: statusProcess3,
    },
    {
      interval: intervalProcess3,
      time: timeProcess3,
      process: 'ID специалиста в Notion',
      code: 'blue', 
      dop: 'getWorkerChatId',
      resurs: 'Work',
      status: statusProcess3,
    },
    {
      interval: intervalProcess4,
      time: timeProcess4,
      process: 'Название проекта',
      code: 'orange', 
      dop: 'Принять | getProjectName',
      resurs: 'Work',
      status: statusProcess4,
    },
    {
      interval: intervalProcess4,
      time: timeProcess4,
      process: 'Статус работы претендента',
      code: 'orange', 
      dop: 'Принять | getWorkerPretendent',
      resurs: 'Work',
      status: statusProcess4,
    },
    {
      interval: intervalProcess5,
      time: timeProcess5,
      process: 'Отправка рассылки',
      code: 'gray', 
      dop: 'sendDistribution',
      resurs: 'Mail',
      status: statusProcess5,
    },
    {
      interval: intervalProcess6,
      time: timeProcess6,
      process: 'Планировщик рассылки',
      code: 'green', 
      dop: 'сканирование плана рассылок',
      resurs: 'Mail',
      status: statusProcess6,
    }    
  ]

  useEffect(() => {
    const savedItem = localStorage.getItem("processAll");   

    // if (savedItem) {
    //   const parseItem = JSON.parse(savedItem);
    //   setProcessAll(parseItem)
    // } else {
      setProcessAll(arr)
    //}
    
  },[])

  useEffect(() => {

    setArrInt(arrH)
    setArrInt2(arrH)
    setArrInt3(arrH)
    setArrInt4(arrH)
    setArrInt5(arrH)
    setArrInt6(arrH)


    if (clickSort) {
      if (sortInterval) {
        const temp = [...processAll].sort((a,b)=> a.interval - b.interval)
        setProcessAll(temp)
      } else {
        const temp = [...processAll].sort((a,b)=> b.interval - a.interval)
        setProcessAll(temp)
      }
    } 

    //localStorage.setItem("processAll", JSON.stringify(arr));
    //console.log("playProcess: ", playProcess)
      
  }, [
    clickSort, 
    sortInterval, 
    // timeProcess,
    // timeProcess2,
    // timeProcess3,
    // timeProcess4,
    // timeProcess5,
    // intervalProcess,
    // intervalProcess2,
    // intervalProcess3,
    // intervalProcess4, 
    // intervalProcess5
  ]);


  const openHub = (hub) => {
    if (hub === 'Static') { 
      setShowStatic(true)
      setShowProcess(false)
      setActiveKey(2)
      setTabhub('Static')
    }
    if (hub === 'Process') { 
      setShowStatic(false)
      setShowProcess(true)
      setActiveKey(1)
      setTabhub('Process')
    }
  }

  const clickInfo = (ind, info) => {
    console.log(ind, showProcessInfo[ind])

    setShowProcessInfo(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

  }

  //остановить или запустить процесс
  const clickPlay = (ind) => {
    console.log("ind: ", ind)

    //setLoadStatus(true)
    setLoadStatus(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    setPlayProcess(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    setStopProcess(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    //setTimeout(()=>{setLoadStatus(false)}, 3000)
    

    if (ind === 0) {
      //нажата кнопка Стоп
      if (stopProcess[0]) {
        console.log("stop")
        //await getProcess(ind, false)
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[0]) {
        console.log("play")
        //await getProcess(ind, true)
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
    else if (ind === 1) {
      //нажата кнопка Стоп
      if (stopProcess[1]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[1]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
    else if (ind === 2) {
      //нажата кнопка Стоп
      if (stopProcess[2]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[2]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
        //setStatusProcess3(!statusProcess3)
      }
    }
    else if (ind === 3) {
      //нажата кнопка Стоп
      if (stopProcess[3]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[3]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
    else if (ind === 4) {
      //нажата кнопка Стоп
      if (stopProcess[4]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[4]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
    else if (ind === 5) {
      //нажата кнопка Стоп
      if (stopProcess[5]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[5]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
    else if (ind === 6) {
      //нажата кнопка Стоп
      if (stopProcess[6]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[6]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 7) {
      //нажата кнопка Стоп
      if (stopProcess[7]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[7]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 8) {
      //нажата кнопка Стоп
      if (stopProcess[8]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[8]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 9) {
      //нажата кнопка Стоп
      if (stopProcess[9]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[9]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 10) {
      //нажата кнопка Стоп
      if (stopProcess[10]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[10]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 11) {
      //нажата кнопка Стоп
      if (stopProcess[11]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[11]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }

    else if (ind === 12) {
      //нажата кнопка Стоп
      if (stopProcess[12]) {
        //console.log("stop")
        //sendNumberProcess(ind, false, intervalProcess, timeProcess)
        //setStatusProcess(false)
        fetchAllProcess(ind, false)
      }
      //нажата кнопка Play
      if (playProcess[12]) {
        //console.log("play")
        //sendNumberProcess(ind, true, intervalProcess, timeProcess)
        //setStatusProcess(true)
        fetchAllProcess(ind, true)
      }
    }
  }

  const fetchAllProcess = (ind, on) => {
    processAll[ind].status = on
    setProcessAll(processAll)
    localStorage.setItem("processAll", JSON.stringify(processAll));

    setTimeout(()=>setLoadStatus(false), 3000)
    
  }

  //начать изменения
  const clickRec = (ind) => {
    setShowInterval(prevShownTable => ({
      ...prevShownTable,
      [ind]: true
    }));

    setShowTime(prevShownTable => ({
      ...prevShownTable,
      [ind]: true
    }));

    //убрать редактирование
    setTimeout(()=> {
      setShowInterval(prevShownTable => ({
        ...prevShownTable,
        [ind]: false
      }));
  
      setShowTime(prevShownTable => ({
        ...prevShownTable,
        [ind]: false
      }));
    }, 8000)
  }

  //изменить интервал
  const changeInterval = (e, ind) => {
    const val = e.target.value   

    console.log("val: ", val)

    setShowInterval(prevShownTable => ({
      ...prevShownTable,
      [ind]: false
    }));

    // if (ind === 0) {
    //   //setIntervalProcess(val)
    // }
    // if (ind === 1) {
    //   setIntervalProcess(val)
    // }
    // else if (ind === 2) {
    //   setIntervalProcess(val)
    // }
    // else if (ind === 3) {
    //   setIntervalProcess2(val)
    // }
    // else if (ind === 4) {
    //   setIntervalProcess2(val)
    // }
    // else if (ind === 5) {
    //   processAll[ind].interval = val
    //   setProcessAll(processAll)
    //   localStorage.setItem("processAll", JSON.stringify(processAll));
    // }
    // else if (ind === 6) {
    //   setIntervalProcess3(val)
    // }
    // else if (ind === 7) {
    //   setIntervalProcess3(val)
    // }
    // else if (ind === 8) {
    //   setIntervalProcess3(val)
    // }
    // else if (ind === 9) {
    //   setIntervalProcess3(val)
    // }
    // else if (ind === 10) {
    //   setIntervalProcess3(val)
    // }
    // else if (ind === 11) {
    //   setIntervalProcess4(val)
    // }
    // else if (ind === 12) {
    //   setIntervalProcess5(val)
    // }

    processAll[ind].interval = val
    setProcessAll(processAll)
    localStorage.setItem("processAll", JSON.stringify(processAll));

    //отправить сокет
    sendNumberProcess(ind, true, val, 'S')
    
  }

  //изменить время
  const changeTime = (e, ind) => {
    const val = e.target.value
    console.log(val, ind)

    setShowTime(prevShownTable => ({
      ...prevShownTable,
      [ind]: false
    }));

    if (ind === 0) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess, val)
      setTimeProcess(val)

      if (val === 'M') {
        setArrInt(arrM)
      } else if (val === 'H') {
        setArrInt(arrH)
      } else if (val === 'S') {
        setArrInt(arrM)
      } 
    } 
    
    else if (ind === 1) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess, val)
      setTimeProcess(val)

      if (val === 'M') {
        setArrInt2(arrM)
      } else if (val === 'H') {
        setArrInt2(arrH)
      } else if (val === 'S') {
        setArrInt2(arrM)
      } 
    }

    else if (ind === 2) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess, val)
      setTimeProcess(val)

      if (val === 'M') {
        setArrInt3(arrM)
      } else if (val === 'H') {
        setArrInt3(arrH)
      } else if (val === 'S') {
        setArrInt3(arrM)
      } 
    }

    else if (ind === 3) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess2, val)
      setTimeProcess2(val)

      if (val === 'M') {
        setArrInt4(arrM)
      } else if (val === 'H') {
        setArrInt4(arrH)
      } else if (val === 'S') {
        setArrInt4(arrM)
      } 
    }

    else if (ind === 4) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess2, val)
      setTimeProcess2(val)

      if (val === 'M') {
        setArrInt5(arrM)
      } else if (val === 'H') {
        setArrInt5(arrH)
      } else if (val === 'S') {
        setArrInt5(arrM)
      } 
    }

    else if (ind === 5) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess2, val)
      setTimeProcess2(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 6) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess2, val)
      setTimeProcess3(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 7) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess3(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 8) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess3(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 9) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess3(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 10) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess3(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 11) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess4(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }

    else if (ind === 12) {
      //отправить сокет
      //sendNumberProcess(ind, true, intervalProcess3, val)
      setTimeProcess5(val)

      if (val === 'M') {
        setArrInt6(arrM)
      } else if (val === 'H') {
        setArrInt6(arrH)
      } else if (val === 'S') {
        setArrInt6(arrM)
      } 
    }
    
    
  }


  const sortInt = () => {
    setClickSort(true)
    //console.log(!sortInterval)
    setSortInterval(!sortInterval)
  }

  const sortT = () => {
    //setClickSort(true)
    setSortTime(!sortTime)
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>

                  <CRow className="justify-content-between">
                    <CCol xs={6}><h2>Мониторинг</h2></CCol>
                  </CRow>

                  <CRow className="mb-12">
                    {/* Вкладки */}
                    <CCol sm={6}>
                      {/* Renthub Workhub */} 
                      <CNav variant="tabs" className='dark-theme'>
                            <CNavItem>
                              <CNavLink 
                                style={{background: activeKey !== 2 ? '#08080869' : '', cursor: 'pointer'}} 
                                onClick={() => openHub('Static')} 
                                active={activeKey === 2}>
                                  Производительность
                              </CNavLink>
                            </CNavItem>
                            <CNavItem>
                              <CNavLink 
                                style={{background: activeKey !== 1 ? '#08080869' : '', cursor: 'pointer'}} 
                                onClick={() => openHub('Process')} 
                                active={activeKey === 1}>
                                  Процессы
                              </CNavLink>
                            </CNavItem>
                      </CNav>
                    </CCol>
                  </CRow>    
 
                  <CCard className='rounded-bottom' style={{borderRadius: '0px', borderColor: '#131c21', borderTopRightRadius: '0.375rem'}}>
                    <CCardBody id="Static" style={{display: showStatic ? 'block' : 'none'}}>

                      <CRow>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}>
                          {loadingIframe ? <p> Загрузка...</p> : null}
                          <iframe width="650" height="600" src="https://proj.uley.team:8000/status" title="description" onLoad={() => setLoadingIframe(false)} loading = "lazy"></iframe>
                        </CCol>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}>
                          {loadingIframe2 ? <p> Загрузка...</p> : null}
                          <iframe width="650" height="600" src="https://proj.uley.team:8001/status" title="description" onLoad={() => setLoadingIframe2(false)} loading = "lazy"></iframe>
                        </CCol>
                      </CRow>
                      <hr></hr>
                      <br/>
                      <CRow>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}>
                          {loadingIframe3 ? <p> Загрузка...</p> : null}
                          <iframe width="650" height="600" src="https://proj.uley.team:8080/status" title="description" onLoad={() => setLoadingIframe3(false)} loading = "lazy"></iframe>
                        </CCol>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}>
                          {loadingIframe4 ? <p> Загрузка...</p> : null}
                          <iframe width="650" height="600" src="https://proj.uley.team:5000/status" title="description" onLoad={() => setLoadingIframe4(false)} loading = "lazy"></iframe>
                        </CCol>
                      </CRow>
                      
                    </CCardBody>
                  

                    <CCardBody id="Process" style={{display: showProcess ? 'block' : 'none'}}>
                      <CCardTitle></CCardTitle> 
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '50px'}}>№</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '50px'}}>Код</CTableHeaderCell>
                              <CTableHeaderCell onClick={sortInt} scope="col" className="text-center" style={{width: '90px', cursor: 'pointer'}}>Интервал</CTableHeaderCell>
                              <CTableHeaderCell onClick={sortT} scope="col" className="text-center" style={{width: '90px', cursor: 'pointer'}}>Время</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center">Запрос</CTableHeaderCell>  
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Ресурс</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Статус</CTableHeaderCell>   
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '200px'}}>Управление</CTableHeaderCell>    
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {/* 1 */}
                            {processAll.map((item, index) => (
                              <CTableRow key={index}>
                                <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                  {index+1}
                                </CTableHeaderCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  <div style={{width: '15px', height: '15px', borderRadius: '2px', marginLeft: '25%', background: item.code}}></div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  {!showInterval[index] ? (item.interval && item.interval.length > 0 ? item.interval : <CSpinner size="sm" />) : 
                                              <CFormSelect 
                                                aria-label="Default select example"
                                                style={{width: '63px', fontSize: '12px'}}
                                                onChange={(e)=>changeInterval(e, index)}
                                                value={item.interval}
                                                options={arrInt}
                                              />}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  {!showTime[index] ? item.time : 
                                    <CFormSelect 
                                      aria-label="Default select example"
                                      style={{width: '63px', fontSize: '12px'}}
                                      onChange={(e)=>changeTime(e, index)}
                                      value={item.time}
                                      options={arrTime}
                                    />
                                  }                                
                                </CTableDataCell>
                                <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px', cursor: 'pointer'}} onClick={()=>clickInfo(index+1, item.info)}>
                                  {item.process}
                                  {showProcessInfo[index+1] ? <><br/><span style={{fontSize: '12px', color: '#8a93a2'}}>{item.dop}</span></> : ''}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  {item.resurs}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  {loadStatus[index] ? <CSpinner size="sm" /> : (item.status ? <img src={status1Icon} alt='' width='25px' /> : <img src={status2Icon} alt='' width='25px' />)
                                  }
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  
                                  <CButton disabled={!stopProcess[index] || !item.status} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickPlay(index)}>
                                    <img src={item.status ? stopIcon : stopIcon2} alt='' width='25px' />
                                  </CButton>
                                  <CButton disabled={item.status} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickPlay(index)}>
                                    <img src={playProcess[index] || !item.status ? playIcon : playIcon2} alt='' width='25px' />
                                  </CButton> 
                                  <CButton disabled={!item.status} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(index)}>
                                    <img src={item.status ? recIcon : recIcon2} alt='' width='25px' />
                                  </CButton>
                                </CTableDataCell>
                              </CTableRow>
                              ))
                            }


                          </CTableBody>
                        </CTable>
                    </CCardBody>
                  </CCard>
                  
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default SoundsNotif
