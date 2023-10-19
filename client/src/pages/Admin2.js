import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {CChart} from '@coreui/react-chartjs'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CCardTitle,
  CCardText,
  CButtonGroup,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTabContent,
  CTabPane,
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

import { useUsersContext } from "../chat-app-new/context/usersContext";
import { getAllMessages } from '../http/chatAPI.js'

import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import WidgetsDropdown2 from '../views/widgets/WidgetsDropdown2'

import Sound from "./../assets/images/spec/1_sound.svg";
import Riggers from "./../assets/images/spec/2_riggers.svg";
import Production from "./../assets/images/spec/3_production.svg";
import StageGround from "./../assets/images/spec/4_stage_ground.svg";
import Video from "./../assets/images/spec/5_video.svg";
import Light from "./../assets/images/spec/6_light.svg";
import Stagehands from "./../assets/images/spec/7_stagehands.svg";

import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { cilArrowBottom, cilOptions } from '@coreui/icons'

const Admin2 = () => {

  const { users: clients } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const { projects: projs } = useUsersContext();
  const { companys: comps } = useUsersContext();

  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]);
  const [newClients, setNewClients]= useState([]);
  const [oldClients, setOldClients]= useState([]);
  const [loading, setLoading]= useState(true);

  const [showRenthub, setShowRenthub]= useState(true);
  const [showWorkhub, setShowWorkhub]= useState(false);

  const [activeKey, setActiveKey] = useState(1)
  const [showWidget1, setShowWidget1] = useState(true)
  const [showWidget2, setShowWidget2] = useState(false)

  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
  const host = process.env.REACT_APP_API_URL
  

  //get Contacts
  useEffect(() => {
    const arrClients = []

    const fetchData = async() => {

      //let companys = await getCompanys()
      console.log("companys (admin): ", comps)
      console.log("clients (admin): ", clients)
      console.log("managers (admin): ", zakazchiki)

      let messages = await getAllMessages()
      console.log("messages: ", messages)

      clients.map((client, index) => {
        
        const managers = [...zakazchiki];
        let userIndex = zakazchiki.findIndex((manager) => manager.tgID === client.chatId);  
        const userObject = managers[userIndex];

        let userObject2 = comps.find((company) => company.managers.find(man => man.id ===  userObject?.id)) //company.managers.map((manager) => manager.id === userObject?.id));  

        const companyName = userObject2?.title
        const companyCity = userObject2?.city ? userObject2?.city : ''

        const lastDate = client.date.split('T')
        const d = new Date(lastDate[0]);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const newDateActivity = `${day}.${month}.${year}`

        const newClientName = client.name.includes("|") ? client.name.split(" | ")[1] : client.name

        const allMessages = messages.length //всего сообщений
        const fromAdmin = messages.filter(el => el.senderId === chatAdminId);
        const messagesUsers = messages.filter(el => el.senderId === client.chatId);

        const arr = clients.filter(el => el.message === '');
        setNewClients(arr)

        const arr2 = clients.filter(el => el.message !== '');
        setOldClients(arr2)
        
        const newObj = {
          avatar: client.avatar,
          user: {
            name: newClientName,
            new: true,
            registered: '01.01.2023',
          },
          TG_ID: client.chatId,
          city: companyCity,
          company: companyName ? companyName : '',
          phone: userObject?.phone,
          usage: {
            value: Math.round(messagesUsers.length * 100 / (allMessages - fromAdmin.length)), 
            period: '01.04.2023 - ' + newDateActivity,
            color: 'success',
          },
          activity: newDateActivity,
        }

        arrClients.push(newObj)
      })

      const filteredClients = [...arrClients].filter((el) => el.TG_ID !== chatAdminId); //без админского пользователя  
      const clientSort = [...filteredClients].sort((a, b) => {       
				return b.usage.value-a.usage.value  //сортировка по убывающей активности  
			}) 
      console.log('userbots: ', clientSort)  
      setContacts(clientSort)  
      
      setTimeout(() => {
        setLoading(false)
      }, "6000")
    }
    
    fetchData();
    
  }, [clients]);
//---------------------------------------------------------------------------------------------
//get Projects
  useEffect(() => {
    const arrProjects = []

    const fetchData = async () => {
			//let response = await getProjects();
      projs.map(async (project) => {
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
    
  },[projs])

  const openHub = (hub) => {
    console.log(hub)
    if (hub === 'Workhub') { 
      setShowWorkhub(true)
      setShowRenthub(false)
      setActiveKey(2)
      setShowWidget1(false)
      setShowWidget2(true)
    }
    if (hub === 'Renthub') { 
      setShowWorkhub(false)
      setShowRenthub(true)
      setActiveKey(1)
      setShowWidget1(true)
      setShowWidget2(false)
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

                <>
                {showWidget1 
                ?<WidgetsDropdown
                  users={clients.length-1} 
                  projects={projects.length} 
                  companys={comps.length} 
                />
                :<WidgetsDropdown2
                  users={clients.length-1} 
                  projects={projects.length} 
                  companys={comps.length} 
                />}
                
                {/* Вкладки */}
                <CNav variant="tabs" className='dark-theme'>
                      <CNavItem>
                        <CNavLink style={{background: activeKey !== 1 ? '#08080869' : ''}} onClick={() => openHub('Renthub')} active={activeKey === 1}>Renthub</CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink style={{background: activeKey !== 2 ? '#08080869' : ''}} onClick={() => openHub('Workhub')} active={activeKey === 2}>Workhub</CNavLink>
                      </CNavItem>
                </CNav>
                
                <CCard className='rounded-bottom' style={{borderRadius: '0px', borderTopRightRadius: '0.375rem'}}>
                  <CCardBody id="Renthub" style={{display: showRenthub ? 'block' : 'none'}}>
                    <CRow>
                      <CCol xs>
                        <CCard className="mb-4">
                          <CCardHeader style={{textAlign: 'left'}}>Пользователи бота ({clients.length - 1})</CCardHeader>
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
                                  </CTableRow>
                                ))}
                              </CTableBody>
                            </CTable>
                          }
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CCardBody>
{/*-------------------------------------------------------------------------------------------  */}
                  <CCardBody id="Workhub" style={{display: showWorkhub ? 'block' : 'none'}}>
                    <CRow>
                      <CCol xs>
                            <CRow>
                            <CWidgetStatsA
                              className="mb-4"
                              color="primary"
                              value={
                                <>
                                  
                                </>
                              }
                              title=""
                              action={
                                <CDropdown alignment="end">
                                  <CDropdownToggle color="transparent" caret={false} className="p-0">
                                    <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                                  </CDropdownToggle>
                                  <CDropdownMenu>
                                    <CDropdownItem>Посмотреть</CDropdownItem>
                                    <CDropdownItem>Обновить</CDropdownItem>
                                    <CDropdownItem disabled>Другое</CDropdownItem>
                                  </CDropdownMenu>
                                </CDropdown>
                              }
                              chart={
                                <CChartLine
                                  className="mt-3 mx-3"
                                  style={{ height: '500px' }}
                                  data={{
                                    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                                    datasets: [
                                      {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: getStyle('--cui-primary'),
                                        data: [65, 59, 84, 84, 51, 55, 40],
                                      },
                                    ],
                                  }}
                                  options={{
                                    plugins: {
                                      legend: {
                                        display: false,
                                      },
                                    },
                                    maintainAspectRatio: false,
                                    scales: {
                                      x: {
                                        grid: {
                                          display: false,
                                          drawBorder: false,
                                        },
                                        ticks: {
                                          display: true,
                                        },
                                      },
                                      y: {
                                        min: 10,
                                        max: 99,
                                        display: true,
                                        grid: {
                                          display: false,
                                        },
                                        ticks: {
                                          display: true,
                                        },
                                      },
                                    },
                                    elements: {
                                      line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                      },
                                      point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                      },
                                    },
                                  }}
                                />
                              }
                            />
                            </CRow>
                            <br/>
                            <CRow>
                              <CCol xs={12} md={6} xl={6}>
                                <CRow>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Звук</div>
                                        <div className="fs-5 fw-semibold">15</div>
                                      </div>
                                      <img src={Sound} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Свет</div>
                                        <div className="fs-5 fw-semibold">11</div>
                                      </div>
                                      <img src={Light} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                </CRow>
                              </CCol>

                              <CCol xs={12} md={6} xl={6}>
                                <CRow>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Видео</div>
                                        <div className="fs-5 fw-semibold">65</div>
                                      </div>
                                      <img src={Video} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Хелперы</div>
                                        <div className="fs-5 fw-semibold">23</div>
                                      </div>
                                      <img src={Stagehands} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                </CRow>

                                <div className="mb-5"></div>

                              </CCol>
                            </CRow>

                            <CRow>
                              <CCol md={6} style={{textAlign: 'center'}}>
                                <CButton color="primary" style={{marginRight: '10px', width: '120px'}}>Сутки</CButton>
                                <CButton color="secondary" style={{marginRight: '10px', width: '120px'}}>Неделя</CButton>
                                <CButton color="success" style={{marginRight: '10px', width: '120px'}}>Месяц</CButton>
                                <CButton color="danger" style={{marginRight: '10px', width: '120px'}}>Год</CButton>
                              </CCol>
                              <CCol md={6} style={{textAlign: 'center', display: 'flex'}}>
                                <CFormInput type="text" placeholder="01.01.2000" aria-label="sm input example" style={{marginLeft: '10px'}}/>                               
                                <CFormInput type="text" placeholder="01.01.2000" aria-label="sm input example"style={{marginLeft: '10px'}}/>             
                                <CButton color="dark" style={{marginLeft: '10px'}}>Применить</CButton>
                              </CCol>
                              
                            </CRow>
                            
                            <br/>
                            
                            <CRow>
                              <CCol>
                                <CTable align="middle" className="mb-0 border" hover responsive>
                                  <CTableHead className='table-light'>
                                    <CTableRow>
                                      <CTableHeaderCell className="text-center" style={{width: '90px'}}>Дата</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '70px'}}>Время</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>ФИО</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '150px'}}>Город</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '140px'}}>Дата рождения</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '150px'}}>Телефон</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '120px'}}>Ник</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                    <CTableRow v-for="item in tableItems">
                                      <CTableDataCell className="text-center">
                                        12.01.2000
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        12:00
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                          Иванов  Иван Иванович
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>Москва</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>Повар <br/>
                                          Плотник <br/>
                                          Охотник</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        12.03.1990
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>8 (900) 122-12-12</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>Ник</div>
                                      </CTableDataCell> 
                                    </CTableRow>

                                    <CTableRow v-for="item in tableItems">
                                      <CTableDataCell className="text-center">
                                        12.01.2000
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        12:00
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                          Иванов  Иван Иванович
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>Москва</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        -
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>12.03.1990</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>8 (900) 122-12-12</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>Ник</div>
                                      </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                              </CTable>
                              </CCol>
                            </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
                
                </>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Admin2
