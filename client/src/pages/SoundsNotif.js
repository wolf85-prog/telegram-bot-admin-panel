import React, { Suspense, useEffect, useState, useContext } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { delSoundNotif, getSoundNotif, startSoundNotif } from './../http/adminAPI.js'

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

  const { soundsNotif } = useUsersContext();

  const [soundNotif, setSoundNotif] = useState([]); 
  const [activeKey, setActiveKey] = useState(2)
  const [tabhub, setTabhub]= useState('');
  const [showStatic, setShowStatic]= useState(true);
  const [showProcess, setShowProcess]= useState(false);

  const [playProcess, setPlayProcess]= useState(false);
  const [stopProcess, setStopProcess]= useState(true);

  const [playProcess2, setPlayProcess2]= useState(false);
  const [stopProcess2, setStopProcess2]= useState(true);

  const [showInterval, setShowInterval]= useState(false);
  const [showTime, setShowTime]= useState(false);

  const [showInterval2, setShowInterval2]= useState(false);
  const [showTime2, setShowTime2]= useState(false);

  const [valueInterval, setValueInterval] = useState(1)
  const [valueTime, setValueTime] = useState('S')

  const [valueInterval2, setValueInterval2] = useState(1)
  const [valueTime2, setValueTime2] = useState('S')

  //const [arrM, setArrM] = useState([])
  //const [arrS, setArrS] = useState([])

  const [arrInt, setArrInt] = useState([])
  const [arrInt2, setArrInt2] = useState([])

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
    {label: 11, value: 11,},
    {label: 12, value: 12,},
    {label: 13, value: 13,},
    {label: 14, value: 14,},
    {label: 15, value: 15,},
    {label: 16, value: 16,},
    {label: 17, value: 17,},
    {label: 18, value: 18,},
    {label: 19, value: 19,},
    {label: 20, value: 20,},
    {label: 21, value: 21,},
    {label: 22, value: 22,},
    {label: 23, value: 23,},
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
    {label: 11, value: 11,},
    {label: 12, value: 12,},
    {label: 13, value: 13,},
    {label: 14, value: 14,},
    {label: 15, value: 15,},
    {label: 16, value: 16,},
    {label: 17, value: 17,},
    {label: 18, value: 18,},
    {label: 19, value: 19,},
    {label: 20, value: 20,},
    {label: 21, value: 21,},
    {label: 22, value: 22,},
    {label: 23, value: 23,},
    {label: 24, value: 24,},
    {label: 25, value: 25,},
    {label: 26, value: 26,},
    {label: 27, value: 27,},
    {label: 28, value: 28,},
    {label: 29, value: 29,},
    {label: 30, value: 30,},
    {label: 31, value: 31,},
    {label: 32, value: 32,},
    {label: 33, value: 33,},
    {label: 34, value: 34,},
    {label: 35, value: 35,},
    {label: 36, value: 36,},
    {label: 37, value: 37,},
    {label: 38, value: 38,},
    {label: 39, value: 39,},
    {label: 40, value: 40,},
    {label: 41, value: 41,},
    {label: 42, value: 42,},
    {label: 43, value: 43,},
    {label: 44, value: 44,},
    {label: 45, value: 45,},
    {label: 46, value: 46,},
    {label: 47, value: 47,},
    {label: 48, value: 48,},
    {label: 49, value: 49,},
    {label: 50, value: 50,},
    {label: 51, value: 51,},
    {label: 52, value: 52,},
    {label: 53, value: 53,},
    {label: 54, value: 54,},
    {label: 55, value: 55,},
    {label: 56, value: 56,},
    {label: 57, value: 57,},
    {label: 58, value: 58,},
    {label: 59, value: 59,},
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

  const clickPlay = () => {
    setPlayProcess(!playProcess)
    setStopProcess(!stopProcess)
  }

  const clickPlay2 = () => {
    setPlayProcess2(!playProcess2)
    setStopProcess2(!stopProcess2)
  }

  const clickRec = (ind) => {
    if (ind === 1) {
      setShowInterval(!showInterval)
      setShowTime(!showTime)
    } 
    else if (ind === 2) {
      setShowInterval2(!showInterval2)
      setShowTime2(!showTime2)
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
                        <CCol md={6}><iframe width="600" height="600" src="https://proj.uley.team:8000/status" title="description"></iframe></CCol>
                        <CCol md={6}><iframe width="600" height="600" src="https://proj.uley.team:8001/status" title="description"></iframe></CCol>
                      </CRow>
                      <hr></hr>
                      <br/>
                      <CRow>
                        <CCol md={6}><iframe width="600" height="600" src="https://proj.uley.team:8080/status" title="description"></iframe></CCol>
                        <CCol md={6}><iframe width="600" height="600" src="https://proj.uley.team:5000/status" title="description"></iframe></CCol>
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
                          {/* {soundNotif.map((item, index) => ( */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>1</CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval ? valueInterval : <CFormSelect 
                                              aria-label="Default select example"
                                              style={{marginTop: '10px'}}
                                              onChange={(e)=>changeInterval(e, 1)}
                                              value={valueInterval}
                                              options={arrInt}
                                            />}
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime ? valueTime : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{marginTop: '10px'}}
                                    onChange={(e)=>changeTime(e, 1)}
                                    value={valueTime}
                                    options={[
                                      {
                                        label: 'S',
                                        value: 'S',
                                      },
                                      {
                                        label: 'M',
                                        value: 'M',
                                      },
                                      {
                                        label: 'H',
                                        value: 'H',
                                      },       
                                    ]}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Запрос №1</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Бот заказчиков</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}><img src={status1Icon} alt='' width='25px' /></CTableDataCell>
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
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>2</CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showInterval2 ? valueInterval2 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{marginTop: '10px'}}
                                    onChange={(e)=>changeInterval(e, 2)}
                                    value={valueInterval2}
                                    options={arrInt2}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                {!showTime2 ? valueTime2 : 
                                  <CFormSelect 
                                    aria-label="Default select example"
                                    style={{marginTop: '10px'}}
                                    onChange={(e)=>changeTime(e, 2)}
                                    value={valueTime2}
                                    options={[
                                      {
                                        label: 'S',
                                        value: 'S',
                                      },
                                      {
                                        label: 'M',
                                        value: 'M',
                                      },
                                      {
                                        label: 'H',
                                        value: 'H',
                                      },       
                                    ]}
                                  />
                                }
                              </CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Запрос №2</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Бот специалистов</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}><img src={status2Icon} alt='' width='25px' /></CTableDataCell>
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
                          {/* ))
                          }  */}
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
