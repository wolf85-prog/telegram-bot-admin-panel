import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
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
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
} from '@coreui/icons'

import avatar2 from 'src/assets/images/avatars/blank-avatar.png'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { getAllMessages } from './../http/chatAPI.js'

import WidgetsDropdown from '../views/widgets/WidgetsDropdown2'

const Workhub = () => {

  const { users: clients } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const { projects: projs } = useUsersContext();
  const { companys: comps } = useUsersContext();

  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]);
  const [newClients, setNewClients]= useState([]);
  const [oldClients, setOldClients]= useState([]);
  const [loading, setLoading]= useState(true);

  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
  const host = process.env.REACT_APP_API_URL
  

  //get Contacts
  useEffect(() => {
    const arrClients = []
    
  }, []);
  
//---------------------------------------------------------------------------------------------
//get Projects
  useEffect(() => {
    const arrProjects = []  
    
  },[])

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>

                <>
                <WidgetsDropdown users={clients.length-1} projects={projects.length} companys={comps.length} />

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Пользователи бота ({clients.length - 1})</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-info py-1 px-3">
                                  <div className="text-medium-emphasis small">Новые клиенты</div>
                                  <div className="fs-5 fw-semibold">{newClients.length}</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Постоянные клиенты</div>
                                  <div className="fs-5 fw-semibold">{oldClients.length-1}</div>
                                </div>
                              </CCol>
                            </CRow>
                          </CCol>

                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Просмотры</div>
                                  <div className="fs-5 fw-semibold">-</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Другое</div>
                                  <div className="fs-5 fw-semibold">-</div>
                                </div>
                              </CCol>
                            </CRow>

                            <div className="mb-5"></div>

                          </CCol>
                        </CRow>

                      {loading ? 
                                  
                        <CSpinner/> :

                        <CTable align="middle" className="mb-0 border" hover responsive>
                          <CTableHead className='table-dark'>
                            <CTableRow>
                              <CTableHeaderCell style={{width: '30px'}}>№</CTableHeaderCell>
                              <CTableHeaderCell className="text-center" style={{width: '100px'}}>
                                <CIcon icon={cilPeople} />
                              </CTableHeaderCell>
                              <CTableHeaderCell style={{width: '160px'}}>Пользователь</CTableHeaderCell>                             
                              <CTableHeaderCell className="text-center" style={{width: '160px'}}>Организация</CTableHeaderCell>
                              <CTableHeaderCell className="text-center" style={{width: '160px'}}>Телефон</CTableHeaderCell>
                              <CTableHeaderCell className="text-center" style={{width: '80px'}}>Город</CTableHeaderCell>
                              <CTableHeaderCell className="text-center" style={{width: '100px'}}>TG ID</CTableHeaderCell>
                              <CTableHeaderCell style={{width: '100px'}}>Использование</CTableHeaderCell>
                              <CTableHeaderCell style={{width: '100px'}}>Активность</CTableHeaderCell>
                              {/* <CTableHeaderCell>Управление</CTableHeaderCell> */}
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {contacts.map((item, index) => (
                              <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                  {index+1}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                    <CAvatar size="md" src={item.avatar ? host + item.avatar : avatar2} alt='' />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.user.name}</div>
                                  <div className="small text-medium-emphasis">
                                    {/* <span>{item.user.new ? 'Новый' : 'Recurring'}</span> | Регистрация:{' '}
                                    {item.user.registered} */}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  {item.company ? <div>{item.company}</div> : ''}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.phone}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.city}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.TG_ID}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div className="clearfix">
                                    <div className="float-start">
                                      <strong>{item.usage.value}%</strong>
                                    </div>
                                    <div className="float-end">
                                      <small className="text-medium-emphasis">{item.usage.period}</small>
                                    </div>
                                  </div>
                                  <CProgress thin color={item.usage.color} value={item.usage.value} />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div className="small text-medium-emphasis">Последний вход</div>
                                  <strong>{item.activity}</strong>
                                </CTableDataCell>
                                {/* <CTableDataCell>
                                  <CButton color="light">
                                    <img src={pencilIcon} alt='' width='15px'/>
                                  </CButton>
                                  &nbsp;
                                  <CButton color="light">
                                    <img src={deleteIcon} alt='' width='10px' />
                                  </CButton>
                                </CTableDataCell> */}
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      }
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Workhub
