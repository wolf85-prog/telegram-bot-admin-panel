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

  const [showRec, setShowRec]= useState(false);

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

  const clickRec = () => {
    setShowRec(true)
  }

  const clickSaveReq = () => {
    setShowRec(false)
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
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>20</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>S</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Запрос №1</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Бот заказчиков</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}><img src={status1Icon} alt='' width='25px' /></CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickRec}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!stopProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={stopProcess ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay}>
                                  <img src={playProcess ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                              </CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row" className="text-center" style={{verticalAlign: 'middle'}}>2</CTableHeaderCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>30</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>M</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Запрос №2</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>Бот специалистов</CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}><img src={status2Icon} alt='' width='25px' /></CTableDataCell>
                              <CTableDataCell className="text-center" style={{verticalAlign: 'middle', padding: '0 2px 0 2px'}}>
                                <CButton color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickRec}>
                                  <img src={recIcon} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!stopProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={stopProcess2 ? stopIcon : stopIcon2} alt='' width='25px' />
                                </CButton>
                                <CButton disabled={!playProcess2} color="light" style={{borderColor: 'transparent', background: 'transparent'}} onClick={clickPlay2}>
                                  <img src={playProcess2 ? playIcon : playIcon2} alt='' width='25px' />
                                </CButton> 
                              </CTableDataCell>
                            </CTableRow>
                          {/* ))
                          }  */}
                          </CTableBody>
                        </CTable>
                    </CCardBody>
                  </CCard>

                  <MyModalSmall alignment="center" visible={showRec} setVisible={setShowRec} onClose={() => setShowRec(false)} style={{height: '50px'}}>
                                          <CCardBody>
                                            <div className="scroll-table">
                                              <CTable align="middle" className="mb-0" responsive style={{color: '#ffffff'}}>
                                                <CTableHead className='table-dark'>
                                                  <CTableRow>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '50px'}}>№</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Интервал</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Время</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Запрос</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '150px'}}>Ресурс</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className="text-center" style={{width: '90px'}}>Статус</CTableHeaderCell>   
                                                  </CTableRow>
                                                </CTableHead>
                                              </CTable>	
                                              <div className="scroll-table-body" >
                                                <CTable>
                                                  <CTableBody>
                                                    <CTableRow>
                                                      <CTableHeaderCell className="text-center" scope="row" style={{width: '50px'}}>1</CTableHeaderCell>
                                                      <CTableDataCell className="text-center" style={{width: '150px'}}>
                                                        <CFormInput type="email" id="exampleFormControlInput1" placeholder="0"/>
                                                      </CTableDataCell>
                                                      <CTableDataCell className="text-center" style={{width: '90px'}}>S</CTableDataCell>
                                                      <CTableDataCell className="text-center" style={{width: '150px'}}>Запрос</CTableDataCell>
                                                      <CTableDataCell className="text-center" style={{width: '150px'}}>Бот заказчиков</CTableDataCell>
                                                      <CTableDataCell className="text-center" style={{width: '90px'}}><img src={status2Icon} alt='' width='25px' /></CTableDataCell>
                                                    </CTableRow>   
                                                  </CTableBody>
                                                </CTable>
                                              </div>	
                                            </div>
                                            <CRow>
                                              <CCol></CCol>
                                              <CCol style={{textAlign: 'end'}}><CButton color="success" size="lg" onClick={clickSaveReq}>Сохранить</CButton></CCol>
                                            </CRow>
                                            
                                          </CCardBody> 
                                          
                          </MyModalSmall>  
                  
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default SoundsNotif
