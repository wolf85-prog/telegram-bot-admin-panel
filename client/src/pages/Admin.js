import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
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
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilCloudDownload,
  cilPeople,
  cilPencil,
  cilX,
} from '@coreui/icons'

import avatar2 from 'src/assets/images/avatars/blank-avatar.png'
import deleteIcon from 'src/assets/images/delete.png'
import pencilIcon from 'src/assets/images/pencil.png'
import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { getProjects, getManagers, getCompanyId } from './../http/adminAPI.js'

import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import Loader from 'src/chat-app-new/components/Loader'

// if (!user._id) {
//   return <Navigate to="/register" />;
// }

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const progressExample = [
  { title: 'Визиты', value: '29.703 Users', percent: 40, color: 'success' },
  { title: 'Уникальные', value: '24.093 Users', percent: 20, color: 'info' },
  { title: 'Просмотры', value: '78.706 Views', percent: 60, color: 'warning' },
  { title: 'Новые пользователи', value: '22.123 Users', percent: 80, color: 'danger' },
  { title: 'Отказы', value: 'Average Rate', percent: 40.15, color: 'primary' },
]

const Admin = () => {

  const { users: clients } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]);
  const [managers, setManagers]= useState([]);
  const [loading, setLoading]= useState(true);

  const host = process.env.REACT_APP_API_URL
  const hostAdmin = process.env.REACT_APP_ADMIN_API_URL

  //get Contacts
  useEffect(() => {
    const arrClients = []

    const fetchData = () => {
      clients.map(async(client, index) => {
        const managers = [...zakazchiki];
        let userIndex = zakazchiki.findIndex((manager) => manager.tgID === client.chatId);  
        const userObject = managers[userIndex];
        //console.log(userObject?.id)

        const companyName = await getCompanyId(userObject?.id)
        console.log(companyName)
        console.log(index)

        let strCompanys = ''
        companyName.map((company)=>{
          strCompanys = company.company + ' '
        })

        const lastDate = client.date.split('T')
        const d = new Date(lastDate[0]);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");

				const newDateActivity = `${day}.${month}.${year}`
        
        const newObj = {
          avatar: client.avatar,
          user: {
            name: client.name,
            new: true,
            registered: '01.01.2023',
          },
          TG_ID: client.chatId,
          comment: userObject?.comment,
          company: { name: strCompanys, icon: cibCcMastercard },
          phone: userObject?.phone,
          usage: {
            value: 10,
            period: '01.01.2023 - 10.01.2023',
            color: 'success',
          },
          activity: newDateActivity,
        }
        arrClients.push(newObj)
      })
      console.log('userbots: ', arrClients)
      
      setContacts(arrClients)  
      
      setTimeout(() => {
        setLoading(false)
      }, "13000")
    }
    
    fetchData();
    
  }, [clients]);

  //get Projects
  useEffect(() => {
    const arrProjects = []

    const fetchData = async () => {
			let response = await getProjects();
      response.map(async (project) => {
        const newProject = {
					id: project.id,
					name: project.title,
					start: project.time_start,
          created: project.time_created,
          teh: project.teh,
          manager: project.manager,
          company: project.company,
				}
        arrProjects.push(newProject)
      })

      setProjects(arrProjects) 
    }

    fetchData();
    
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
                <WidgetsDropdown users={clients.length} projects={projects.length} />

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Пользователи бота</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-info py-1 px-3">
                                  <div className="text-medium-emphasis small">Новые клиенты</div>
                                  <div className="fs-5 fw-semibold">9,123</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Постоянные клиенты</div>
                                  <div className="fs-5 fw-semibold">22,643</div>
                                </div>
                              </CCol>
                            </CRow>
                          </CCol>

                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Просмотры</div>
                                  <div className="fs-5 fw-semibold">78,623</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Другое</div>
                                  <div className="fs-5 fw-semibold">49,123</div>
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
                              <CTableHeaderCell className="text-center">
                                <CIcon icon={cilPeople} />
                              </CTableHeaderCell>
                              <CTableHeaderCell>Пользователь</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">TG ID</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Организация</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Телефон</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Комментарий</CTableHeaderCell>
                              <CTableHeaderCell>Использование</CTableHeaderCell>
                              <CTableHeaderCell>Активность</CTableHeaderCell>
                              {/* <CTableHeaderCell>Управление</CTableHeaderCell> */}
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {contacts.map((item, index) => (
                              <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                    <CAvatar size="md" src={avatar2} alt='' />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.user.name}</div>
                                  <div className="small text-medium-emphasis">
                                    {/* <span>{item.user.new ? 'Новый' : 'Recurring'}</span> | Регистрация:{' '}
                                    {item.user.registered} */}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.TG_ID}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  {item.company.name ? <div>{item.company.name}</div> : ''}
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.phone}</div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <div>{item.comment}</div>
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

export default Admin
