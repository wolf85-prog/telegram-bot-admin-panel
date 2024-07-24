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

    //get Contacts
    useEffect(() => {
      //const arrClients = []
  
      const fetchData = async() => {

        console.log("Открываю страницу Звуковые уведомления")

        let notifs = await getSoundNotif()
        console.log("notifs: ", notifs) 

        const sortedNotif = [...notifs].sort((a, b) => {       
					var dateA = a.date, dateB = b.date 
					return dateB-dateA  //сортировка по убывающей дате  
				})

        setSoundNotif(sortedNotif)  

      }
      
      //fetchData();
      
    }, []);

  const clickUpdate = async() => {
    console.log("Начинаю обновление уведомлений через бота заказчиков...")
    await startSoundNotif()
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
                    <CCol xs={6} className="align-self-center" style={{textAlign: 'end'}}><CButton onClick={clickUpdate} color="secondary" size="sm" >Обновить</CButton></CCol>
                  </CRow>
 
                  <CCard>
                    <CCardHeader>Производительность</CCardHeader>
                    <CCardBody>
                      {/* <CCardTitle>Special title treatment</CCardTitle> */}
                      {/* <CTable>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">№</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Дата</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Проект</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Оповещение</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Статус</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                        {soundNotif.map((item, index) => (
                          <CTableRow key={index}>
                            <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                            <CTableDataCell>{new Date(parseInt(item.date)).toLocaleDateString()} {new Date(parseInt(item.date)).toLocaleTimeString().split(':')[0]}:{new Date(parseInt(item.date)).toLocaleTimeString().split(':')[1]}</CTableDataCell>
                            <CTableDataCell>{item.name}</CTableDataCell>
                            <CTableDataCell>{item.text}</CTableDataCell>
                            <CTableDataCell>{item.delivered ? "Получено" : "Запланировано"}</CTableDataCell>
                          </CTableRow>
                         ))
                        } 
                        </CTableBody>
                      </CTable> */}

                    <CRow>
                      <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:8000/status" title="description"></iframe></CCol>
                      <CCol xs={6}><iframe width="600" height="600" src="https://proj.uley.team:8001/status" title="description"></iframe></CCol>
                    </CRow>
                      
                      
                    </CCardBody>
                  </CCard>
                  
                  {/* {soundsNotif.map((item, index) => (
                      <p key={index}>- {item}</p>
                    ))
                  } */}
                  
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default SoundsNotif
