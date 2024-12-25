import React, { Suspense, useState, useEffect, useRef } from 'react'
import { useSocketContext } from "./../chat-app-new/context/socketContext";
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
  CFormInput,
  CCollapse,
  CTooltip,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import deleteIcon from 'src/assets/images/delete.png'
import editIcon from 'src/assets/images/pencil.png'
import copyIcon from 'src/assets/images/copy.png'
import { useUsersContext } from "../chat-app-new/context/usersContext";
import { delDistributionW, getDistributionsCountW, getPlan, newPlan, getDistributionsWPlan, getDistributionsW} from 'src/http/adminAPI';

import MyModal from "../components/MyModal/MyModal";
import Close from "../assets/images/close.svg"
import arrowDown from '../assets/images/arrowDown.svg'

const DistributionW = () => {
  const socket = useSocketContext();
  const { workersAll, distributionsWork, setDistributionsWork } = useUsersContext();
  //const [distributionsWork, setDistributionsWork]= useState([]);
  const [userReceivers, setUserReceivers]= useState([]);
  const [users, setUsers]= useState([]);
  const [loading, setLoading]= useState(true);
  const [proj, setProj] = useState('');
  const [seconds, setSeconds] = useState(1);

  const [visibleModal, setVisibleModal] = useState(false);

  const [text, setText]= useState("");

  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const [countDistrib, setCountDistrib] = useState(20)

  const [showTable, setShowTable] = useState([])

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
      let response = await getDistributionsCountW(20, distributionsWork.length);
      let response2 = await getDistributionsWPlan();
      //console.log("response2: ", response2)

      //сортировка
      const messageSort = [...response].sort((a, b) => {       
        var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
        return dateB-dateA  //сортировка по убывающей дате  
      })

      const messageSort2 = [...response2].sort((a, b) => {       
        var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
        return dateA-dateB  //сортировка по возрастающей дате  
      })
      //console.log("messageSort2: ", messageSort2)
      //console.log("messageSort: ", messageSort)

      let all = [...messageSort2, ...messageSort]
      //console.log("all: ", all)
      const arrDitributions = []
      all.map((distrib, index) => {
          const d = new Date(distrib.datestart);
          const year = d.getFullYear();
          const month = String(d.getMonth()+1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          const chas = d.getHours();
          const minut = String(d.getMinutes()).padStart(2, "0");
          const newDateMessage = `${day}.${month}.${year}`
          const newTimeMessage = `${chas}:${minut}`

          let space = /,/gi;

          let deliv = distrib.delivered
          //console.log("deliv: ", distrib.delivered)

          const newDistribution = {
            id: distrib.id,
            text: distrib.text,
            image: distrib.image !=='' ? distrib.image : '',
            project: distrib.project,
            projectId: distrib.projectId ? distrib.projectId : '',
            receivers: distrib.receivers.replace(space, '<br/>'), //strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
            categories: distrib.receivers,
            count: distrib.count,
            date: newDateMessage,
            timestart: newTimeMessage,
            datestart: distrib.datestart,
            status: deliv ? "отправлено" : "запланировано",
            uuid: distrib.uuid,
            success: distrib.success,
            report: distrib.report,
            delivered: deliv,
            users: distrib.users,
            button: distrib.button,
            stavka: distrib.stavka,
            editButton: distrib.editButton,
            target: distrib.target,
          }
          arrDitributions.push(newDistribution)
      })

      //console.log("arrDitributions: ", arrDitributions)
      setDistributionsWork(arrDitributions)
      setLoading(false)
    }

    fetchData();
    
  },[])


  //получить рассылку
	const fetchDistribution = async () => {
		console.log("Обновление списка рассылок...")
		let response = await getDistributionsCountW(20, distributionsWork.length);
		let response2 = await getDistributionsWPlan();

		//сортировка
		const messageSort = [...response].sort((a, b) => {       
			var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		const messageSort2 = [...response2].sort((a, b) => {       
			var dateA = new Date(a.datestart), dateB = new Date(b.datestart) 
			return dateA-dateB  //сортировка по убывающей дате  
		})

		let all = [...messageSort2, ...messageSort]

    const arrDitributions = []
    all.map((distrib, index) => {
        const d = new Date(distrib.datestart);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year}`
        const newTimeMessage = `${chas}:${minut}`

        let space = /,/gi;

        let deliv = distrib.delivered
        //console.log("deliv: ", distrib.delivered)

        const newDistribution = {
          id: distrib.id,
          text: distrib.text,
          image: distrib.image !=='' ? distrib.image : '',
          project: distrib.project,
          projectId: distrib.projectId ? distrib.projectId : '',
          receivers: distrib.receivers.replace(space, '<br/>'), //strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          categories: distrib.receivers,
          count: distrib.count,
          date: newDateMessage,
          timestart: newTimeMessage,
          datestart: distrib.datestart,
          status: deliv ? "отправлено" : "запланировано",
          uuid: distrib.uuid,
          success: distrib.success,
          report: distrib.report,
          delivered: deliv,
          users: distrib.users,
          button: distrib.button,
          stavka: distrib.stavka,
          editButton: distrib.editButton,
          target: distrib.target,
				}
        arrDitributions.push(newDistribution)
    })

		setDistributionsWork(arrDitributions)
	}

  useEffect(() => {
		socket.on("getDistrib", fetchDistribution);	
	}, [socket]);


  //обновление списка рассылок
  useEffect(() => {
    const timer = setInterval(() => {
      socket.emit("sendDistrib", { 
        task: true,
      })
    }, 5000);
    
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
    let plan = await getPlan(desk.date);
    const newArray = JSON.parse(plan.times)

    let dateIndex = newArray.findIndex((i) => i.time === desk.timestart)
    const datesCopy = JSON.parse(JSON.stringify(newArray));
    const dateObject = datesCopy[dateIndex];
    datesCopy[dateIndex] = { ...dateObject, ['proj']: '', ['save']: false};
    let planer_str = JSON.stringify(datesCopy)

    const newObj = {
      "datestart": desk.date,
      "times": planer_str
    }

    await newPlan(newObj)
  }

  const showReceivers = (users) => {
    //console.log(workersAll)

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
      const worker = workersAll.find((i)=> i.chatId === item.user)
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
    if (users.length > 0) {
      const filteredData = users.filter(user=> (user.userfamily+user.username+user.user)?.toLowerCase().includes(text.toLowerCase()));
      setUserReceivers(filteredData);
    }
		      
  }, [text, users]);


  const handleClick = (ind) => {
    console.log(ind, showTable[ind])

    setShowTable(prevShownTable => ({
        ...prevShownTable,
        [ind]: !prevShownTable[ind]
      }));
  }

  const clickNext = async() => {

    //1 все рассылки
		//let response = await getDistributionsCountW(100, distributionsWork.length);
    //console.log("distrib size: ", response.length)

    setCountDistrib(100)

    //fetchDistribution(100)

    //const arrayDistrib = []
		
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
                    {/* <h2>Рассылки</h2> */}
                      <Link to={'/distributionw_add'}><CButton color="primary" size="lg" >Новая рассылка</CButton></Link>
                      <CToaster ref={toaster} push={toast} placement="top-end" /> 
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardBody>

                              {loading ? 
                                    
                                <CSpinner/> :

                                <CTable align="middle" className="mb-0 border" hover responsive>
                                  <CTableHead className='table-light'>
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
                                      <CTableRow v-for="item in tableItems" key={index} >
                                        {/* <CTableDataCell>
                                          <div>{index+1}</div>
                                        </CTableDataCell> */}
                                        <CTableDataCell className="text-center" style={{width: '50px'}}>
                                          <div>{item.date}</div>
                                        </CTableDataCell>  
                                        <CTableDataCell className="text-center" style={{width: '50px'}}>
                                          <div>{item.timestart}</div>
                                        </CTableDataCell>  
                                        <CTableDataCell className="text-center">
                                          <CTooltip
                                            content={item.projectId}
                                            placement="top"
                                          >
                                            <div>{item.project}</div>
                                          </CTooltip>
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
                                            :<div>{item.status}</div>
                                          }
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          {/* <Link to={'/distributionw_planer'} state={{ project: proj}}>
                                            <CButton color="light" style={{marginRight: '10px'}}>
                                              <img src={editIcon} alt='' width='10px' />
                                            </CButton>
                                          </Link> */}

                                          {item.projectId ?   
                                            <Link to={'/distributionw_edit'} state={{editD: true, delivered: item.delivered, project: item.projectId, id: item.id, category: item.categories, users: item.users, text: item.text, img: item.image, date: item.datestart, uuid: item.uuid, button: item.button, editButton: item.editButton, stavka: item.stavka, target: item.target}}><CButton color="light" style={{marginRight: '10px', borderColor: 'transparent', background: '#2b3338',}}><img src={item.delivered ? copyIcon : editIcon} alt='' width='10px' /></CButton></Link>
                                            :<Link to={''} state={{ project: `${proj}`, }}><CButton color="light" style={{borderColor: 'transparent', background: '#2b3338', marginRight: '10px'}}><img src={item.delivered ? copyIcon : editIcon} alt='' width='10px' /></CButton></Link>
                                          }
                                          
                                          <CButton color="light" style={{borderColor: 'transparent', background: '#2b3338'}} onClick={() => removeDescription(item)}>
                                            <img src={deleteIcon} alt='' width='10px' />
                                          </CButton>

                                        </CTableDataCell>
                                      </CTableRow>
                                    ))}
                                  </CTableBody>
                                </CTable>
                              } 

                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{width: '50px', marginTop: '15px', cursor: 'pointer'}}></img>
                              </div>                             
                            </CCardBody>
                          </CCard>

                          <MyModal alignment="center" visible={visibleModal} setVisible={setVisibleModal} onClose={() => setVisibleModal(false)}>
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

                                          {/* Рассылка: 800 | Доставлен: 600 | Не доставлено: 200  */}
                                          <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Рассылка: {count+count2}</span> <span>Доставлено: {count}</span> <span> Не доставлено: {count2}</span></p>  

                                            <div className="scroll-table">
                                              <CTable align="middle" className="mb-0" responsive style={{color: '#ffffff'}}>
                                                <CTableHead className='table-dark'>
                                                  <CTableRow>
                                                    <CTableHeaderCell scope="col" style={{width: '45px'}}>№</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col"style={{width: '110px'}}>TelegramID</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{width: '170px'}}>ФИО</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{width: '180px'}}>Специальность</CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" style={{width: '100px'}}>Статус</CTableHeaderCell>
                                                  </CTableRow>
                                                </CTableHead>
                                              </CTable>	
                                              <div className="scroll-table-body" style={{height: '300px', overflowX: 'auto'}}>
                                                <CTable>
                                                  <CTableBody style={{height: '300px', overflowX: 'auto'}}>
                                                  {userReceivers.map((item, index) => (
                                                    <CTableRow key={index+1}>
                                                      <CTableHeaderCell style={{width: '45px'}} scope="row">{index < 9 ? '0'+(index+1) : index+1}</CTableHeaderCell>
                                                      <CTableDataCell style={{width: '110px'}}>{item.user}</CTableDataCell>
                                                      <CTableDataCell style={{width: '170px'}}>{item.userfamily} {item.username}</CTableDataCell>
                                                      <CTableDataCell style={{fontSize: '11px', width: '180px'}}>
                                                        {/* {JSON.parse(item.categories).map(it=>"- "+it.spec).join('\n')} */}
                                                        
                                                        <div onClick={()=>handleClick(index)} style={{cursor: 'pointer', paddingLeft: '35px'}}>{!showTable[index] ? 'Посмотреть' : <br/>}</div>
                                                        <CCollapse visible={showTable[index]}>
                                                          <table>
                                                            <tbody>
                                                              {item.categories !== '' ? (JSON.parse(item.categories)).map((spec, index)=>( 
                                                                  <tr key={index}>
                                                                    <td>{spec.spec !== '' ? "- " + spec.spec : ''}</td>
                                                                  </tr>          
                                                              )) : ""}
                                                            </tbody> 
                                                          </table>
                                                        </CCollapse>
                                                      </CTableDataCell>
                                                      <CTableDataCell className='text-center' style={{width: '100px', color: item.status === 200 ? '#7070e7' : 'red'}}>{item.status === 200 ? "Получено" : "Не получено"}</CTableDataCell>
                                                    </CTableRow> 
                                                  ))
                                                  }   
                                                  </CTableBody>
                                                </CTable>
                                              </div>	
                                            </div>

                                            {/* <p style={{display: 'flex', justifyContent: 'space-between'}}><span>Получено: {count}</span> <span>Не получено: {count2}</span></p>   */}
                                          </CCardBody> 
                                          
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
