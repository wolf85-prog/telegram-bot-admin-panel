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

const SoundsNotif = () => {  

  const { soundsNotif } = useUsersContext();

  const [soundNotif, setSoundNotif] = useState([]); 
  const [activeKey, setActiveKey] = useState(2)
  const [tabhub, setTabhub]= useState('');
  const [showStatic, setShowStatic]= useState(true);
  const [showProcess, setShowProcess]= useState(false);

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
                              <CTableHeaderCell scope="col">№</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Название запроса</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Состояние</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Кол-во</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Время</CTableHeaderCell>
                              <CTableHeaderCell scope="col">Ед. изм.</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                          {/* {soundNotif.map((item, index) => ( */}
                            <CTableRow>
                              <CTableHeaderCell scope="row">1</CTableHeaderCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                              <CTableHeaderCell scope="row">2</CTableHeaderCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
                              <CTableDataCell>-</CTableDataCell>
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
