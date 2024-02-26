import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  CContainer, 
  CSpinner, 
  CButton, 
  CTable, 
  CTableRow, 
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastClose,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import deleteIcon from 'src/assets/images/delete.png'
import editIcon from 'src/assets/images/pencil.png'
import { useUsersContext } from "../chat-app-new/context/usersContext";
import { delDistributionW, getPlan, newPlan } from 'src/http/adminAPI';

import MyModal from "../components/MyModal/MyModal";
import Close from "../assets/images/close.svg"

const DistributionW = () => {
  const { distributionsWork: messages, addNewDistrib, workers } = useUsersContext();
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [userReceivers, setUserReceivers]= useState([]);
  const [users, setUsers]= useState([]);
  const [loading, setLoading]= useState(true);
  const [proj, setProj] = useState('');
  const [seconds, setSeconds] = useState(1);

  const [visibleModal, setVisibleModal] = useState(false);

  const [text, setText]= useState("");

  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Рассылка успешно удалена!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  //get Distribution
  useEffect(() => {
    const fetchData = async () => {

      const arrDitributions = []
      messages.map((distrib, index) => {
        const d = new Date(distrib.datestart);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year}`
        const newTimeMessage = `${chas}:${minut}`

        let space = /,/gi;

        const newDistribution = {
          id: distrib.id,
          text: distrib.text,
          image: distrib.image !=='' ? distrib.image : '',
          project: distrib.project,
          projectId: distrib.projectId ? distrib.projectId : '',
          receivers: distrib.receivers.replace(space, '<br/>'), //strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          categories: distrib.receivers,
          count: distrib.count,
          datestart: newDateMessage,
          timestart: newTimeMessage,
          status: distrib.delivered ? "отправлено" : "запланировано",
          uuid: distrib.uuid,
          success: distrib.success,
          report: distrib.report,
				}
        arrDitributions.push(newDistribution)
      })

      //console.log("arrDitributions: ", arrDitributions)

      setDistributionsWork(arrDitributions) 
      setLoading(false)
    }

    fetchData();
    
  },[messages])

  //обновление списка рассылок
  useEffect(() => {
    const timer = setInterval(() => {
      //setSeconds(seconds => seconds + 5);
      addNewDistrib(true)
    }, 10000);
    
    // очистка интервала
    return () => clearInterval(timer);
  });

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    addToast(exampleToast) //ваша рассылка удалена
    
    setDistributionsWork(distributionsWork.filter(p => p.id !== desk.id))
    
    //удаление сообщения в базе данных
    await delDistributionW(desk.id)  

    //удаление проекта из планировщика
    //обновить план в БД
    let plan = await getPlan(desk.datestart);
    const newArray = JSON.parse(plan.times)

    let dateIndex = newArray.findIndex((i) => i.time === desk.timestart)
    const datesCopy = JSON.parse(JSON.stringify(newArray));
    const dateObject = datesCopy[dateIndex];
    datesCopy[dateIndex] = { ...dateObject, ['proj']: '', ['save']: false};
    let planer_str = JSON.stringify(datesCopy)

    const newObj = {
      "datestart": desk.datestart,
      "times": planer_str
    }

    await newPlan(newObj)
  }

  const showReceivers = (users) => {
    console.log(workers)

    setVisibleModal(true)
    let count = 0
    let count2 = 0
    let arrReceiver = []
    JSON.parse(users).map((item, index)=> {
      if (item.status === 200) {
        count++
      } else {
        count2++
      }
      const worker = workers.find((i)=> i.chatId === item.user)
      const obj = {
        user: item.user,
        status: item.status,
        userfamily: worker.userfamily,
        username: worker.username,
        categories: worker.worklist,
      }
      arrReceiver.push(obj)
    })
    setCount(count)
    setCount2(count2)
    setUserReceivers(arrReceiver)
    setUsers(arrReceiver)
    //console.log(JSON.stringify(users))
  }


  //поиск
  useEffect(() => {
    console.log("users: ", users)
		const filteredData = users.filter(user=> (user.userfamily+user.username+user.user)?.toLowerCase().includes(text.toLowerCase()));
    setUserReceivers(filteredData);      
  }, [text, users]);


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <>
                    <h2>Рассылки</h2>
                      <Link to={'/distributionw_add'}><CButton color="primary" size="lg" >Новая рассылка</CButton></Link>
                      <CToaster ref={toaster} push={toast} placement="top-end" /> 
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>Рассылки для специалистов</CCardHeader>
                            <CCardBody>
                              <br /> 

                            {loading ? 
                                  
                              <CSpinner/> :

                              <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className='table-dark'>
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Название проекта</CTableHeaderCell>
                                    {/* <CTableHeaderCell className="text-center">Картинка</CTableHeaderCell> */}
                                    <CTableHeaderCell className="text-center">Категория</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center">Получатели</CTableHeaderCell>    
                                    <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Управление</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {distributionsWork.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index} style={{height: '130px'}}>
                                      {/* <CTableDataCell>
                                        <div>{index+1}</div>
                                      </CTableDataCell> */}
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>{item.datestart}</div>
                                      </CTableDataCell>  
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>{item.timestart}</div>
                                      </CTableDataCell>  
                                      <CTableDataCell className="text-center">
                                        <div>{item.project}</div>
                                      </CTableDataCell>    
                                      {/* <CTableDataCell className="text-center">
                                        {item.image.endsWith('.pdf') ?
                                        <iframe src={item.image} height="120px" width="200px" title="myFramePdf"/>
                                        : <div>{item.image ? <a href={item.image} target='_blank' rel="noreferrer"><img src={item.image} alt='' width={230} height={120} style={{objectFit: 'contain'}}></img></a> : ''}</div>
                                        }
                                      </CTableDataCell> */}
                                      <CTableDataCell className="text-center">
                                        <div dangerouslySetInnerHTML={{__html: item.receivers}} />
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center" onClick={()=>showReceivers(item.report)} style={{cursor: 'pointer'}}>
                                        {
                                          item.status === 'запланировано' ? 
                                          <div style={{color: '#3887cd'}}>{item.count}</div>
                                          :<div>{item.count} | {item.success ? item.success : "0"}</div>
                                        }
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {
                                          item.status === 'запланировано' ? 
                                          <div style={{color: '#3887cd'}}>{item.status}</div>
                                          :<div style={{color: '#f5f114'}}>{item.status}</div>
                                        }
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {/* <Link to={'/distributionw_planer'} state={{ project: proj}}>
                                          <CButton color="light" style={{marginRight: '10px'}}>
                                            <img src={editIcon} alt='' width='10px' />
                                          </CButton>
                                        </Link> */}

                                        {item.projectId ? 
                                          <Link to={'/distributionw_add'} state={{ project: item.projectId, id: item.id, category: item.categories, img: item.image, date: item.datestart, uuid: item.uuid}}><CButton color="light" style={{marginRight: '10px'}}><img src={editIcon} alt='' width='10px' /></CButton></Link>
                                          :<Link to={''} state={{ project: `${proj}`, }}><CButton color="light" style={{marginRight: '10px'}}><img src={editIcon} alt='' width='10px' /></CButton></Link>
                                        }
                                        
                                        <CButton color="light" onClick={() => removeDescription(item)}>
                                          <img src={deleteIcon} alt='' width='10px' />
                                        </CButton>

                                      </CTableDataCell>
                                    </CTableRow>
                                  ))}
                                </CTableBody>
                              </CTable>
                            }                              
                            </CCardBody>
                          </CCard>

                                        <MyModal alignment="center" visible={visibleModal} onClose={() => setVisibleModal(false)}>
                                          {/* <CModalHeader>
                                            <CModalTitle>Получатели рассылки</CModalTitle>
                                          </CModalHeader> */}
                                          <div style={{paddingTop: '25px'}}>
                                            <CRow className="mb-3" >
                                              <CCol sm={9} >
                                                <h3>Получатели</h3>
                                              </CCol>
                                              <CCol sm={3} >
                                                <CFormInput placeholder="Поиск..." onChange={(e)=>setText(e.target.value)} aria-label="spec"/>
                                              </CCol>
                                            </CRow>
                                          </div>
                                          
                                          <img onClick={()=>setVisibleModal(false)} src={Close} alt='' style={{position: 'absolute', right: '20px', top: '20px', width: '15px'}}/>
                                          <CCardBody>
                                            <CTable align="middle" className="mb-0" responsive style={{color: '#ffffff'}}>
                                              <CTableHead className='table-dark'>
                                                <CTableRow>
                                                  <CTableHeaderCell scope="col">№</CTableHeaderCell>
                                                  <CTableHeaderCell scope="col"style={{width: '100px'}}>TelegramID</CTableHeaderCell>
                                                  <CTableHeaderCell scope="col" >ФИО</CTableHeaderCell>
                                                  <CTableHeaderCell scope="col" style={{width: '180px'}}>Специальность</CTableHeaderCell>
                                                  <CTableHeaderCell scope="col" style={{width: '130px'}} className='text-center'>Статус</CTableHeaderCell>
                                                </CTableRow>
                                              </CTableHead>
                                              <CTableBody>
                                              {userReceivers.map((item, index) => (
                                                <CTableRow key={index+1}>
                                                  <CTableHeaderCell scope="row">{index < 9 ? '0'+(index+1) : index+1}</CTableHeaderCell>
                                                  <CTableDataCell>{item.user}</CTableDataCell>
                                                  <CTableDataCell>{item.userfamily} {item.username}</CTableDataCell>
                                                  <CTableDataCell style={{fontSize: '11px'}}>
                                                    {/* {JSON.parse(item.categories).map(it=>"- "+it.spec).join('\n')} */}
                                                    <table>
                                                      {item.categories !== '' ? (JSON.parse(item.categories)).map((spec, index)=>( 
                                                          <tr key={index}>
                                                            <td>{spec.spec !== '' ? "- " + spec.spec : ''}</td>
                                                          </tr>          
                                                      )) : ""}
                                                    </table>
                                                  </CTableDataCell>
                                                  <CTableDataCell className='text-center' style={{color: item.status === 200 ? '#7070e7' : 'red'}}>{item.status === 200 ? "Получено" : "Не получено"}</CTableDataCell>
                                                </CTableRow> 
                                              ))
                                              }   
                                              </CTableBody>
                                            </CTable>
                                            <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Получено: {count}</span> <span>Не получено: {count2}</span></p>  
                                          </CCardBody>
                                          {/* <CModalFooter>
                                            <CButton color="primary" onClick={() => setVisibleModal(false)}>ОК</CButton>
                                          </CModalFooter> */}
                                          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <CButton color="primary" onClick={()=>setVisibleModal(false)}>ОК</CButton>
                                          </div>
                                          
                                        </MyModal>
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

export default DistributionW
