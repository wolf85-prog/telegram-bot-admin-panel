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
} from '@coreui/react'

// routes config
import routes from '../routes'

import stopIcon from 'src/assets/images/stop.png'
import stopIcon2 from 'src/assets/images/stop_press.png'
import playIcon from 'src/assets/images/play.png'
import playIcon2 from 'src/assets/images/play_press.png'

import status1Icon from 'src/assets/images/status1.png'
import status2Icon from 'src/assets/images/status2.png'

const SoundsNotif = () => {  

  const { soundsNotif } = useUsersContext();

  const [soundNotif, setSoundNotif] = useState([]); 
  const [activeKey, setActiveKey] = useState(2)
  const [tabhub, setTabhub]= useState('');
  const [showStatic, setShowStatic]= useState(true);
  const [showProcess, setShowProcess]= useState(false);

  const [playProcess, setPlayProcess]= useState(true);
  const [stopProcess, setStopProcess]= useState(false);

  const [playProcess2, setPlayProcess2]= useState(true);
  const [stopProcess2, setStopProcess2]= useState(false);

    //get Contacts
    useEffect(() => {
  
      const fetchData = async() => {

        console.log("Открываю страницу Звуковые уведомления")

      }
      
      fetchData();
      
    }, []);

  const clickUpdate = async() => {
    console.log("Начинаю обновление уведомлений через бота заказчиков...")
    await startSoundNotif()
  }

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
                        <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:8000/status" title="description"></iframe></CCol>
                        <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:8001/status" title="description"></iframe></CCol>
                      </CRow>
                      <hr></hr>
                      <br/>
                      <CRow>
                        <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:8080/status" title="description"></iframe></CCol>
                        <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:5000/status" title="description"></iframe></CCol>
                      </CRow>
                      
                    </CCardBody>
                  

                    <CCardBody id="Process" style={{display: showProcess ? 'block' : 'none'}}>
                      <CCardTitle></CCardTitle> 
                        <CTable>
                          <CTableHead>
                            <CTableRow>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '50px'}}>№</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Запрос</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Интервал</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Время</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center">Название запроса</CTableHeaderCell>
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Статус</CTableHeaderCell>   
                              <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Управление</CTableHeaderCell>    
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                          {/* {soundNotif.map((item, index) => ( */}
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>1</CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>10</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>20</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>S</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>Запрос №1</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}><img src={status1Icon} alt='' width='25px' /></CTableDataCell>
                              <CTableDataCell className="text-center">
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>2</CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>20</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>30</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>M</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>Запрос №2</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}><img src={status2Icon} alt='' width='25px' /></CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle'}}>
                                <CButton disabled={!playProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={playProcess2 ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!stopProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={stopProcess2 ? stopIcon : stopIcon2} alt='' width='25px' />
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
