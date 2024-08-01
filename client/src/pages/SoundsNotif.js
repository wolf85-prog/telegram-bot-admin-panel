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

import status1Icon from 'src/assets/images/status1.png'
import status2Icon from 'src/assets/images/status2.png'

const SoundsNotif = () => {  

  const { soundsNotif, sendNumberProcess } = useUsersContext();

  const [soundNotif, setSoundNotif] = useState([]); 
  const [activeKey, setActiveKey] = useState(2)
  const [tabhub, setTabhub]= useState('');
  const [showStatic, setShowStatic]= useState(true);
  const [showProcess, setShowProcess]= useState(false);
  const [showProcessInfo, setShowProcessInfo]= useState(false);

  const [playProcess, setPlayProcess]= useState(false);
  const [stopProcess, setStopProcess]= useState(true);

  const [playProcess2, setPlayProcess2]= useState(false);
  const [stopProcess2, setStopProcess2]= useState(true);

  const [showInterval, setShowInterval]= useState(false);
  const [showTime, setShowTime]= useState(false);
  const [showInterval2, setShowInterval2]= useState(false);
  const [showTime2, setShowTime2]= useState(false);
  const [showInterval3, setShowInterval3]= useState(false);
  const [showTime3, setShowTime3]= useState(false);
  const [showInterval4, setShowInterval4]= useState(false);
  const [showTime4, setShowTime4]= useState(false);

  const [valueInterval, setValueInterval] = useState(2)
  const [valueTime, setValueTime] = useState('S')
  const [valueInterval2, setValueInterval2] = useState(10)
  const [valueTime2, setValueTime2] = useState('S')
  const [valueInterval3, setValueInterval3] = useState(10)
  const [valueTime3, setValueTime3] = useState('S')
  const [valueInterval4, setValueInterval4] = useState(10)
  const [valueTime4, setValueTime4] = useState('S')

  //const [arrM, setArrM] = useState([])
  //const [arrS, setArrS] = useState([])

  const [arrInt, setArrInt] = useState([])
  const [arrInt2, setArrInt2] = useState([])
  const [arrInt3, setArrInt3] = useState([])
  const [arrInt4, setArrInt4] = useState([])

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

  //get Contacts
  useEffect(() => {

      setArrInt(arrH)
      setArrInt2(arrH)
  
      const fetchData = async() => {
        console.log("Открываю страницу Звуковые уведомления")
      }
      //fetchData();
      
  }, []);


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

  const clickPlay = async(ind) => {
    setPlayProcess(!playProcess)
    setStopProcess(!stopProcess)

    //нажата кнопка Стоп
    if (stopProcess) {
      console.log("stop")
      await getProcess(ind, false)
      await sendNumberProcess(ind, false)
    }

    //нажата кнопка Play
    if (playProcess) {
      console.log("play")
      await getProcess(ind, true)
      await sendNumberProcess(ind, false)
    }
  }

  const clickPlay2 = () => {
    setPlayProcess2(!playProcess2)
    setStopProcess2(!stopProcess2)
  }

  const clickRec = (ind) => {
    if (ind === 1) {
      setShowInterval(true)
      setShowTime(true)

      setTimeout(()=>{
        setShowInterval(false)
        setShowTime(false)
      }, 10000)
    } 
    else if (ind === 2) {
      setShowInterval2(true)
      setShowTime2(true)

      setTimeout(()=>{
        setShowInterval2(false)
        setShowTime2(false)
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
      setShowInterval2(false)
      setValueInterval2(val)
    }
    
  }

  const changeTime = (e, ind) => {
    const val = e.target.value
    console.log(val, ind)
    if (ind === 1) {
      setShowTime(false)
      setValueTime(val)

      if (val === 'M') {
        setArrInt(arrM)
      } else if (val === 'H') {
        setArrInt(arrH)
      } else if (val === 'S') {
        setArrInt(arrM)
      } 
    } 
    
    else if (ind === 2) {
      setShowTime2(false)
      setValueTime2(val)

      if (val === 'M') {
        setArrInt2(arrM)
      } else if (val === 'H') {
        setArrInt2(arrH)
      } else if (val === 'S') {
        setArrInt2(arrM)
      } 
    }
    
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
                          <iframe width="650" height="600" src="https://proj.uley.team:8000/status" title="description"></iframe></CCol>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}><iframe width="650" height="600" src="https://proj.uley.team:8001/status" title="description"></iframe></CCol>
                      </CRow>
                      <hr></hr>
                      <br/>
                      <CRow>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}><iframe width="650" height="600" src="https://proj.uley.team:8080/status" title="description"></iframe></CCol>
                        <CCol md={6} style={{overflow: 'auto', transform: 'scale(0.9)', transformOrigin: 'top left'}}><iframe width="650" height="600" src="https://proj.uley.team:5000/status" title="description"></iframe></CCol>
                      </CRow>
                      
                    </CCardBody>
                  

                    <CCardBody id="Process" style={{display: showProcess ? 'block' : 'none'}}>
                      <CCardTitle></CCardTitle> 
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '50px'}}>№</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Интервал</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Время</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center">Запрос</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Ресурс</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Статус</CTableHeaderCell>   
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '200px'}}>Управление</CTableHeaderCell>    
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {/* 1 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                1
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval ? valueInterval : <CFormSelect 
                                              aria-label="Default select example"
                                              style={{width: '63px', fontSize: '12px'}}
                                              onChange={(e)=>changeInterval(e, 1)}
                                              value={valueInterval}
                                              options={arrInt}
                                            />}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime ? valueTime : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 1)}
                                    value={valueTime}
                                    options={arrTime}
                                  />
                                }                                
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос названия и статуса проекта
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReports()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(1)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                            
                            {/* 2 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                2
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval ? valueInterval2 : <CFormSelect 
                                              aria-label="Default select example"
                                              style={{width: '63px', fontSize: '12px'}}
                                              onChange={(e)=>changeInterval(e, 1)}
                                              value={valueInterval2}
                                              options={arrInt}
                                            />}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime ? valueTime : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 1)}
                                    value={valueTime2}
                                    options={arrTime}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос дат проекта из основного состава
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReports()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(1)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>

                            {/* 3 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                3
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval3 ? valueInterval3 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeInterval(e, 2)}
                                    value={valueInterval3}
                                    options={arrInt3}
                                  />
                                }
                              </CTableDataCell>
                              
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime3 ? valueTime3 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 2)}
                                    value={valueTime3}
                                    options={arrTime}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос TelegramID менеджера проекта
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReports()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={stopProcess2 ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={playProcess2 ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(2)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>

                            
                            {/* 4 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                4
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval ? valueInterval : <CFormSelect 
                                              aria-label="Default select example"
                                              style={{width: '63px', fontSize: '12px'}}
                                              onChange={(e)=>changeInterval(e, 1)}
                                              value={valueInterval}
                                              options={arrInt}
                                            />}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime ? valueTime : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 1)}
                                    value={valueTime}
                                    options={arrTime}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос названия и статуса проекта
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReportsRestart()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(1)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                            
                            {/* 5 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                5
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval ? valueInterval2 : <CFormSelect 
                                              aria-label="Default select example"
                                              style={{width: '63px', fontSize: '12px'}}
                                              onChange={(e)=>changeInterval(e, 1)}
                                              value={valueInterval2}
                                              options={arrInt}
                                            />}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime ? valueTime : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 1)}
                                    value={valueTime2}
                                    options={arrTime}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос дат проекта из основного состава
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReportsRestart()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(1)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>

                            {/* 6 */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>
                                6
                              </CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval3 ? valueInterval3 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeInterval(e, 2)}
                                    value={valueInterval3}
                                    options={arrInt3}
                                  />
                                }
                              </CTableDataCell>
                              
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime3 ? valueTime3 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{width: '63px', fontSize: '12px'}}
                                    onChange={(e)=>changeTime(e, 2)}
                                    value={valueTime3}
                                    options={arrTime}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}} onClick={()=>setShowProcessInfo(!showProcessInfo)}>
                                Запрос TelegramID менеджера проекта
                                {showProcessInfo ? <><br/><span style={{fontSize: '12px'}}>ф-я getReportsRestart()</span></> : ''}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                Бот заказчиков
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <img src={status1Icon} alt='' width='25px' />
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                
                                <CButton disabled={!stopProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={stopProcess2 ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={playProcess2 ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={()=>clickRec(2)}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
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
