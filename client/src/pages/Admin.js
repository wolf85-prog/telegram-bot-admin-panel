import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
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
  cilPeople, cilX,
} from '@coreui/icons'

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

import avatar2 from 'src/assets/images/avatars/blank-avatar.png'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { getAllMessages } from './../http/chatAPI.js'

import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import WidgetsDropdown2 from '../views/widgets/WidgetsDropdown2'

import InputMask from 'react-input-mask';

import Chart from './../components/Chart'

const Admin = () => {

  const { users: clients } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const { projects: projs } = useUsersContext();
  const { companys: comps } = useUsersContext();
  const { userWorkers: specusers } = useUsersContext();
  const { workers } = useUsersContext();

  const [contacts, setContacts]= useState([]);
  const [projects, setProjects]= useState([]);
  const [newClients, setNewClients]= useState([]);
  const [oldClients, setOldClients]= useState([]);
  const [loading, setLoading]= useState(true);
  const [loading2, setLoading2]= useState(true);

  const [showRenthub, setShowRenthub]= useState(false);
  const [showWorkhub, setShowWorkhub]= useState(true);

  const [activeKey, setActiveKey] = useState(2)
  const [showWidget1, setShowWidget1] = useState(false)
  const [showWidget2, setShowWidget2] = useState(true)

  const [showCharts, setShowCharts]= useState(false);
  const [showCharts2, setShowCharts2]= useState(false);
  const [showCharts3, setShowCharts3]= useState(false);
  const [showCharts4, setShowCharts4]= useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const [tabhub, setTabhub]= useState('');
  const [showCategory, setShowCategory] = useState(false)
  const [showSound, setShowSound] = useState(false)

  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
  const host = process.env.REACT_APP_API_URL
  
  //set tab
  useEffect(() => {
    setTabhub('Workhub')
  })

  useEffect(() => {
    // повторить с интервалом 2 секунды
    setTimeout(function run() {
      showSound ? setShowSound(false) : setShowSound(true)
    }, 3000);
  })

  //get Contacts
  useEffect(() => {
    const arrClients = []

    const fetchData = async() => {

      //let companys = await getCompanys()
      // console.log("companys (admin): ", comps)
      // console.log("clients (admin): ", clients)
      // console.log("managers (admin): ", zakazchiki)

      console.log("workers (admin): ", workers)
      //console.log("workersbot (admin): ", specusers.find((user) => user.chatId === '805436270').username)
      setLoading2(false)

      let messages = await getAllMessages()
      //console.log("messages: ", messages)

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
    
  }, [clients, workers]);
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
      setTabhub('Workhub')
    }
    if (hub === 'Renthub') { 
      setShowWorkhub(false)
      setShowRenthub(true)
      setActiveKey(1)
      setShowWidget1(true)
      setShowWidget2(false)
      setTabhub('Renthub')
    }
  }

  const showBlock = (ind) => {
    switch (ind) {
      case 1:{
        setShowCharts(true)
        setShowCharts2(false)
        setShowCharts3(false)
        setShowCharts4(false)

        setShowCategory(true) //показать категорию

        break;
      }
      case 2:{
        setShowCharts(false)
        setShowCharts2(true)
        setShowCharts3(false)
        setShowCharts4(false)
        break;
      }
      case 3:{
        setShowCharts(false)
        setShowCharts2(false)
        setShowCharts3(true)
        setShowCharts4(false)
        break;
      }
      case 4:{
        setShowCharts(false)
        setShowCharts2(false)
        setShowCharts3(false)
        setShowCharts4(true)
        break;
      }
    }
  }


  const data = [
    { name: '0:00', value: 40 },
    { name: '01:00', value: 35 },
    { name: '02:00', value: 4 },
    { name: '03:00', value: 28 },
    { name: '04:00', value: 15 },
  ];


  useEffect(() => {
    // повторить с интервалом 2 секунды
    //let timerId = setInterval(() => showSound ? setShowSound(false) : setShowSound(true), 3000);

    // while(true) {
    //   setTimeout(()=> {
    //     showSound ? setShowSound(false) : setShowSound(true)
    //   }, 2000)
    // } 
    // var i = 0;
    // while (i < 100) {
    //   (function(i) {
    //     setTimeout(function() {
    //       showSound ? setShowSound(false) : setShowSound(true)
    //     }, 10000 * i)
    //   })(i++)
    // }

    //var i = 0;
    // store the interval id to clear in future
    // var intr = setInterval(function() {
    //   showSound ? setShowSound(false) : setShowSound(true)
    //   // clear the interval if `i` reached 100
    //   if (++i == 100) clearInterval(intr);
    // }, 10000)
  })

  const hideCharts = () => {
    setShowCharts(false)
    setShowCategory(false)
  }
  
  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader tabs={tabhub}/>
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
              <Suspense fallback={<CSpinner color="primary" />}>

                <>
                {showWidget2 
                ?<WidgetsDropdown2
                  users={workers.length}
                  newUsers={0} 
                  activeUsers={0} 
                  delUsers={0}
                  soundUsers={1}
                  lightUsers={1}
                  videoUsers={1}
                  stagehandsUsers={1}
                  riggerUsers={2}
                  stagegroundUsers={2}
                  productionUsers={2}
                  trucksUsers={2}
                  showCategory={showCategory}
                  showSound={showSound}
                />
                :<WidgetsDropdown
                  users={clients.length-1} 
                  projects={projects.length} 
                  companys={comps.length} 
                />}

{/* <Chart data={data} width={600} height={300} />,  */}

{/* График Сутки */}
 {showCharts ?  <CWidgetStatsA
                  className="mb-4 box"
                  color="primary"
                  value={<></>}
                  title=""
                  action={<><CIcon icon={cilX} onClick={hideCharts} className="text-high-emphasis-inverse" /></>}
                  chart={
                    // <CChartLine
                    //   className="mt-3 mx-3"
                    //   style={{ height: '550px' }}
                    //   data={{
                    //     labels: Array(24).fill().map((e, i) => `${i}:00`),
                    //     datasets: [
                    //       {
                    //         label: 'My First dataset',
                    //         backgroundColor: 'transparent',
                    //         borderColor: 'rgba(255,255,255,.55)',
                    //         pointBackgroundColor: getStyle('--cui-primary'),
                    //         data: [65, 59, 84, 84, 51, 55, 40],
                    //       },
                    //       {
                    //         label: "My Second dataset",
                    //         backgroundColor: "rgba(151, 187, 205, 0.2)",
                    //         borderColor: "rgba(255, 0, 0)",
                    //         pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    //         pointBorderColor: "#fff",
                    //         data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                    //       },
                    //     ],
                    //   }}
                    //   options={{
                    //     plugins: {
                    //       legend: {
                    //         display: false,
                    //       },
                    //     },
                    //     maintainAspectRatio: false,
                    //     scales: {
                    //       x: {
                    //         grid: {
                    //           display: false,
                    //           drawBorder: true,
                    //         },
                    //         ticks: {
                    //           display: true,
                    //         },
                    //       },
                    //       y: {
                    //         min: 10,
                    //         max: 99,
                    //         display: false,
                    //         grid: {
                    //           display: false,
                    //         },
                    //         ticks: {
                    //           display: false,
                    //         },
                    //       },
                    //     },
                    //     elements: {
                    //       line: {
                    //         borderWidth: 1,
                    //         tension: 0.4,
                    //       },
                    //       point: {
                    //         radius: 4,
                    //         hitRadius: 10,
                    //         hoverRadius: 4,
                    //       },
                    //     },
                    //   }}
                    // />             
                    <Chart data={data} width={900} height={550} />
                  }
                />
: ""
}

{/* График Неделя */}
{showCharts2 ?  <CWidgetStatsA
                  className="mb-4 box"
                  color="primary"
                  value={<></>}
                  title=""
                  action={<></>}
                  chart={
                    <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '550px' }}
                    data={{
                      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: getStyle('--cui-primary'),
                          data: [65, 59, 84, 84, 51, 55, 40],
                        },
                        {
                          label: "My Second dataset",
                          backgroundColor: "rgba(151, 187, 205, 0.2)",
                          borderColor: "rgba(255, 0, 0)",
                          pointBackgroundColor: "rgba(151, 187, 205, 1)",
                          pointBorderColor: "#fff",
                          data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
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
                            drawBorder: true,
                          },
                          ticks: {
                            display: true,
                          },
                        },
                        y: {
                          min: 10,
                          max: 99,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
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
: ""
}

{/* График Месяц */}
{showCharts3 ?  <CWidgetStatsA
                  className="mb-4 box"
                  color="primary"
                  value={<></>}
                  title=""
                  action={<></>}
                  chart={
                    <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '550px' }}
                    data={{
                      labels: Array(30).fill().map((e, i) => i + 1),
                      datasets: [
                        {
                          label: 'My First dataset',
                          backgroundColor: 'transparent',
                          borderColor: 'rgba(255,255,255,.55)',
                          pointBackgroundColor: getStyle('--cui-primary'),
                          data: [65, 59, 84, 84, 51, 55, 40],
                        },
                        {
                          label: "My Second dataset",
                          backgroundColor: "transparent",
                          borderColor: "rgba(255, 0, 0)",
                          pointBackgroundColor: "rgba(151, 187, 205, 1)",
                          pointBorderColor: "#fff",
                          data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
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
                            drawBorder: true,
                          },
                          ticks: {
                            display: true,
                          },
                        },
                        y: {
                          min: 10,
                          max: 99,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
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
: ""
}

{/* График Год */}
{showCharts4 ?  <CWidgetStatsA
                  className="mb-4 box"
                  color="primary"
                  value={<></>}
                  title=""
                  action={<></>}
                  chart={
                    <CChartLine
                    className="mt-3 mx-3"
                    style={{ height: '550px' }}
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
                            drawBorder: true,
                          },
                          ticks: {
                            display: true,
                          },
                        },
                        y: {
                          min: 10,
                          max: 99,
                          display: false,
                          grid: {
                            display: false,
                          },
                          ticks: {
                            display: false,
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
: ""
}


                {/* Вкладки */}
                <CNav variant="tabs" className='dark-theme'>
                      <CNavItem>
                        <CNavLink 
                          style={{background: activeKey !== 2 ? '#08080869' : '', cursor: 'pointer'}} 
                          onClick={() => openHub('Workhub')} 
                          active={activeKey === 2}>
                            Workhub
                        </CNavLink>
                      </CNavItem>
                      <CNavItem>
                        <CNavLink 
                          style={{background: activeKey !== 1 ? '#08080869' : '', cursor: 'pointer'}} 
                          onClick={() => openHub('Renthub')} 
                          active={activeKey === 1}>
                            Renthub
                        </CNavLink>
                      </CNavItem>
                </CNav>
                
                <CCard className='rounded-bottom' style={{borderRadius: '0px', borderColor: '#131c21', borderTopRightRadius: '0.375rem'}}>
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
                            {/* <CRow>
                              <CCol xs={12} md={6} xl={6}>
                                <CRow>
                                  <CCol sm={6}>
                                    <div style={{
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'flex-start',   
                                      }}>
                                      <div className="border-start border-start-4 border-start-info"> 
                                        <img src={Sound} alt='' style={{marginTop: '7px', paddingBottom: '12px', marginLeft: '15px'}} />
                                      </div>
                                      <div className='py-1 px-3 mb-3' style={{textAlign: 'right'}}>
                                        <div className="text-medium-emphasis small">Звук</div>
                                        <div className="fs-5 fw-semibold">0</div>
                                      </div> 
                                    </div>   
                                  </CCol>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Свет</div>
                                        <div className="fs-5 fw-semibold">0</div>
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
                                        <div className="fs-5 fw-semibold">0</div>
                                      </div>
                                      <img src={Video} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                  <CCol sm={6}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3"> 
                                        <div className="text-medium-emphasis small">Хелперы</div>
                                        <div className="fs-5 fw-semibold">0</div>
                                      </div>
                                      <img src={Stagehands} alt='' style={{marginBottom: '15px'}} />
                                    </div>   
                                  </CCol>
                                </CRow>

                                <div className="mb-5"></div>

                              </CCol>
                            </CRow> */}

                            <CRow>
                              <CCol md={6} style={{textAlign: 'center'}}>
                                <CButton color="dark" onClick={()=>showBlock(1)} style={{marginRight: '20px', width: '120px'}}>Сутки</CButton>
                                <CButton color="dark" onClick={()=>showBlock(2)} style={{marginRight: '20px', width: '120px'}}>Неделя</CButton>
                                <CButton color="dark" onClick={()=>showBlock(3)} style={{marginRight: '20px', width: '120px'}}>Месяц</CButton>
                                <CButton color="dark" onClick={()=>showBlock(4)} style={{marginRight: '20px', width: '120px'}}>Год</CButton>
                              </CCol>
                              <CCol md={6} style={{textAlign: 'center', display: 'flex'}}>
                                <InputMask mask="99.99.9999">
                                  {(inputProps) => <CFormInput 
                                                    {...inputProps} 
                                                    placeholder="01.01.2022" 
                                                    disableUnderline
                                                    aria-label="sm input example"
                                                    style={{marginLeft: '10px'}}
                                                  />}
                                </InputMask>

                                <InputMask mask="99.99.9999">
                                  {(inputProps) => <CFormInput 
                                                    {...inputProps} 
                                                    placeholder="31.12.2022" 
                                                    disableUnderline
                                                    aria-label="sm input example"
                                                    style={{marginLeft: '10px'}}
                                                  />}
                                </InputMask>                             
                                            
                                <CButton color="dark" onClick={showBlock} style={{marginLeft: '10px'}}>Применить</CButton>
                              </CCol>
                              
                            </CRow>
                            
                            <br/>
                            
                            <CRow>
                              <CCol style={{textAlign: 'center'}}>
                              {loading2 ? 
                                      
                                <CSpinner/> :

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
                                  {workers.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                      <CTableDataCell className="text-center">
                                        {/* {item.date.split('T')[0]} */}
                                        {item.createDate.split('T')[0].split('-')[2]+ "."+ item.createDate.split('T')[0].split('-')[1] + "." +item.createDate.split('T')[0].split('-')[0]}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {/* {item.date.split('T')[1]} */}
                                        {item.createDate.split('T')[1].split('Z')[0].slice(0, 5)}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                          {item.userfamily +" "+ item.username}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {item.city}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <table>
                                          {(JSON.parse(item.worklist)).map((spec, index)=>( 
                                              <tr key={index}>
                                                <td >{spec.spec}</td>
                                              </tr>          
                                          ))}
                                        </table>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {item.dateborn.includes('-') ? item.dateborn.split('-')[0] : item.dateborn}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.phone}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {/* <div>{specusers.find((user) => user.chatId === item.chatId).username}</div> */}
                                      </CTableDataCell> 
                                    </CTableRow>
                                  ))}
                                </CTableBody>
                              </CTable>
                            }
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

export default Admin
