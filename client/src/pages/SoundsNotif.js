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

import MyModalSmall from "../components/MyModalSmall/MyModalSmall";

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
    intervalProcess,
    intervalProcess2,
    intervalProcess3,
    setIntervalProcess,
    setIntervalProcess2,
    setIntervalProcess3,
    timeProcess,
    timeProcess2,
    timeProcess3,
    setTimeProcess,
    setTimeProcess2,
    setTimeProcess3 } = useUsersContext();

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


  const [playProcess, setPlayProcess]= useState([false, false, false, false, false, false, false, false, false]);
  const [stopProcess, setStopProcess]= useState([true, true, true, true, true, true, true, true, true, true]);


  const [showInterval, setShowInterval]= useState([false, false, false, false, false, false]);
  const [showTime, setShowTime]= useState([false, false, false, false, false, false]);

  // const [showInterval2, setShowInterval2]= useState(false);
  // const [showTime2, setShowTime2]= useState(false);
  // const [showInterval3, setShowInterval3]= useState(false);
  // const [showTime3, setShowTime3]= useState(false);
  // const [showInterval4, setShowInterval4]= useState(false);
  // const [showTime4, setShowTime4]= useState(false);
  // const [showInterval5, setShowInterval5]= useState(false);
  // const [showTime5, setShowTime5]= useState(false);
  // const [showInterval6, setShowInterval6]= useState(false);
  // const [showTime6, setShowTime6]= useState(false);

  const [valueInterval, setValueInterval] = useState([2, 2, 2, 2, 2, 2])
  const [valueTime, setValueTime] = useState(['S', 'S', 'S', 'S', 'S', 'S'])


  //const [arrM, setArrM] = useState([])
  //const [arrS, setArrS] = useState([])

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

  useEffect(() => {

    const fetchData = async() => {
      console.log("Открываю страницу Звуковые уведомления")
    }

    fetchData();

    setArrInt(arrH)
    setArrInt2(arrH)
    setArrInt3(arrH)
    setArrInt4(arrH)
    setArrInt5(arrH)
    setArrInt6(arrH)

    const arr = [
        {
          interval: intervalProcess, 
          time: valueTime[0], 
          process: 'Название и статус проекта', 
          dop: 'getReports()',
          resurs: 'Renthub',
          status: statusProcess,
          // play: playProcess,
          // stop: stopProcess,
          // info: showProcessInfo,
          // showInterval: showInterval,
          // showTime: showTime,
        }, 
        {
          interval: intervalProcess, 
          time: valueTime[1], 
          process: 'Даты проекта из основного состава', 
          dop: 'getReports()',
          resurs: 'Renthub',  
          status: statusProcess,
          // play: playProcess2,
          // stop: stopProcess2,
          // info: showProcessInfo2,
          // showInterval: showInterval2,
          // showTime: showTime2,
        }, 
        {
          interval: intervalProcess, 
          time: valueTime[2], 
          process: 'TelegramID менеджера проекта', 
          dop: 'getReports()',
          resurs: 'Renthub',
          status: statusProcess,
          // play: playProcess3,
          // stop: stopProcess3,
          // info: showProcessInfo3,
          // showInterval: showInterval3,
          // showTime: showTime3,
        },
        {
          interval: valueInterval[3], 
          time: valueTime[3], 
          process: 'Название и статус проекта', 
          dop: 'getReportsRestart()',
          resurs: 'Renthub',
          status: statusProcess2,
          // play: playProcess4,
          // stop: stopProcess4,
          // info: showProcessInfo4,
          // showInterval: showInterval4,
          // showTime: showTime4,
        },
        {
          interval: valueInterval[4], 
          time: valueTime[4], 
          process: 'Даты проекта из основного состава', 
          dop: 'getReportsRestart()',
          resurs: 'Renthub', 
          status: statusProcess2,
          // play: playProcess5,
          // stop: stopProcess5,
          // info: showProcessInfo5,
          // showInterval: showInterval5,
          // showTime: showTime5,
        },
        {
          interval: valueInterval[5],
          time: valueTime[5],  
          process: 'TelegramID менеджера проекта', 
          dop: 'getReportsRestart()',
          resurs: 'Renthub',
          status: statusProcess2,
          // play: playProcess6,
          // stop: stopProcess6,
          // info: showProcessInfo6,
          // showInterval: showInterval6,
          // showTime: showTime6,
        },
        {
          interval: 10,
          time: 'S',  
          process: 'Все проекты', 
          dop: 'getProjects',
          resurs: 'Workhub',
          status: statusProcess3,
          // play: playProcess6,
          // stop: stopProcess6,
          // info: showProcessInfo6,
          // showInterval: showInterval6,
          // showTime: showTime6,
        },
        {
          interval: 10,
          time: 'S',  
          process: 'Все сметы', 
          dop: 'getSmetaAll',
          resurs: 'Workhub',
          status: statusProcess3,
          // play: playProcess6,
          // stop: stopProcess6,
          // info: showProcessInfo6,
          // showInterval: showInterval6,
          // showTime: showTime6,
        },
        {
          interval: 10,
          time: 'S',  
          process: 'Статус работы претендента', 
          dop: 'getWorkerPretendent()',
          resurs: 'Workhub',
          status: statusProcess3,
          // play: playProcess6,
          // stop: stopProcess6,
          // info: showProcessInfo6,
          // showInterval: showInterval6,
          // showTime: showTime6,
        },
        {
          interval: 10,
          time: 'S',
          process: 'Название проекта',
          dop: 'getProjectName',
          resurs: 'Workhub',
          status: statusProcess3,
        }  
      ]

      //setProcessAll(arr)

    //console.log(arr)
    if (clickSort) {
      if (sortInterval) {
        arr.sort((a,b)=> a.interval - b.interval)
        setProcessAll(arr)
      } else {
        arr.sort((a,b)=> b.interval - a.interval)
        setProcessAll(arr)
      }
    } else {
      setProcessAll(arr)
    }
    
    console.log("playProcess: ", playProcess)
      
  }, [clickSort, sortInterval, statusProcess, statusProcess2, statusProcess3, playProcess]);


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

  const clickPlay = (ind) => {
    console.log("ind: ", ind)

    setPlayProcess(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    setStopProcess(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    if (ind === 0) {

      //нажата кнопка Стоп
      // if (stopProcess[1]) {
      //   console.log("stop")
      //   //await getProcess(ind, false)
      //   sendNumberProcess(ind, false)
      // }

      //нажата кнопка Play
      // if (playProcess[1]) {
      //   console.log("play")
      //   //await getProcess(ind, true)
      //   sendNumberProcess(ind, true)
      // }
    }
    else if (ind === 2) {

    }
    else if (ind === 3) {

    }
    else if (ind === 4) {

    }
    else if (ind === 5) {

    }
    else if (ind === 6) {

    }
    
  }

  const clickRec = (ind) => {
    setShowInterval(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    setShowTime(prevShownTable => ({
      ...prevShownTable,
      [ind]: !prevShownTable[ind]
    }));

    if (ind === 0) {
      // setShowInterval(true)
      // setShowTime(true)

      setTimeout(()=>{
        // setShowInterval(false)
        // setShowTime(false)
      }, 5000)
    } 
    else if (ind === 1) {
      // setShowInterval2(true)
      // setShowTime2(true)

      setTimeout(()=>{
        // setShowInterval2(false)
        // setShowTime2(false)
      }, 10000)
    } 
    else if (ind === 2) {
      // setShowInterval3(true)
      // setShowTime3(true)

      setTimeout(()=>{
        // setShowInterval3(false)
        // setShowTime3(false)
      }, 10000)
    } 
    else if (ind === 3) {
      // setShowInterval4(true)
      // setShowTime4(true)

      setTimeout(()=>{
        // setShowInterval4(false)
        // setShowTime4(false)
      }, 10000)
    } 
    else if (ind === 4) {
      // setShowInterval5(true)
      // setShowTime5(true)

      setTimeout(()=>{
        // setShowInterval5(false)
        // setShowTime5(false)
      }, 10000)
    } 
    else if (ind === 5) {
      // setShowInterval6(true)
      // setShowTime6(true)

      setTimeout(()=>{
        // setShowInterval6(false)
        // setShowTime6(false)
      }, 10000)
    } 
  }


  const changeInterval = (e, ind) => {
    const val = e.target.value

    

    if (ind === 1) {
      setShowInterval(false)
      setValueInterval(val)
    }
    else if (ind === 2) {
      // setShowInterval2(false)
      // setValueInterval2(val)
    }
    else if (ind === 3) {
      // setShowInterval3(false)
      // setValueInterval3(val)
    }
    else if (ind === 4) {
      // setShowInterval4(false)
      // setValueInterval4(val)
    }
    else if (ind === 5) {
      // setShowInterval5(false)
      // setValueInterval5(val)
    }
    else if (ind === 6) {
      // setShowInterval6(false)
      // setValueInterval6(val)
    }
    
  }

  const changeTime = (e, ind) => {
    const val = e.target.value
    console.log(val, ind)
    if (ind === 1) {
      // setShowTime(false)
      // setValueTime(val)

      if (val === 'M') {
        setArrInt(arrM)
      } else if (val === 'H') {
        setArrInt(arrH)
      } else if (val === 'S') {
        setArrInt(arrM)
      } 
    } 
    
    else if (ind === 2) {
      // setShowTime2(false)
      // setValueTime2(val)

      if (val === 'M') {
        setArrInt2(arrM)
      } else if (val === 'H') {
        setArrInt2(arrH)
      } else if (val === 'S') {
        setArrInt2(arrM)
      } 
    }

    else if (ind === 3) {
      // setShowTime3(false)
      // setValueTime3(val)

      if (val === 'M') {
        setArrInt3(arrM)
      } else if (val === 'H') {
        setArrInt3(arrH)
      } else if (val === 'S') {
        setArrInt3(arrM)
      } 
    }

    else if (ind === 4) {
      // setShowTime4(false)
      // setValueTime4(val)

      if (val === 'M') {
        setArrInt4(arrM)
      } else if (val === 'H') {
        setArrInt4(arrH)
      } else if (val === 'S') {
        setArrInt4(arrM)
      } 
    }

    else if (ind === 5) {
      // setShowTime5(false)
      // setValueTime5(val)

      if (val === 'M') {
        setArrInt5(arrM)
      } else if (val === 'H') {
        setArrInt5(arrH)
      } else if (val === 'S') {
        setArrInt5(arrM)
      } 
    }

    else if (ind === 6) {
      // setShowTime6(false)
      // setValueTime6(val)

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
                                  {!showInterval[index] ? (2<0 ? item.interval : <CSpinner size="sm" />) : 
                                              <CFormSelect 
                                                aria-label="Default select example"
                                                style={{width: '63px', fontSize: '12px'}}
                                                onChange={(e)=>changeInterval(e, 1)}
                                                value={valueInterval}
                                                options={arrInt}
                                              />}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  {!showTime[index] ? item.time : 
                                    <CFormSelect 
                                      aria-label="Default select example"
                                      style={{width: '63px', fontSize: '12px'}}
                                      onChange={(e)=>changeTime(e, index+1)}
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
                                  {item.status ? <img src={status1Icon} alt='' width='25px' /> : <img src={status2Icon} alt='' width='25px' />}
                                </CTableDataCell>
                                <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                  
                                  <CButton disabled={!stopProcess[index]} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickPlay(index)}>
                                    <img src={stopProcess[index] && 2<0 ? stopIcon : stopIcon2} alt='' width='25px' />
                                  </CButton>
                                  <CButton disabled={!playProcess[index]} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickPlay(index)}>
                                    <img src={playProcess[index] ? playIcon : playIcon2} alt='' width='25px' />
                                  </CButton> 
                                  <CButton disabled={2>0} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(index)}>
                                    <img src={2<0 ? recIcon : recIcon2} alt='' width='25px' />
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
