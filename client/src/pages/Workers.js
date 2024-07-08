import React, { Suspense, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCollapse,
  CButton, 
  CTooltip,
} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import arrowDown from '../assets/images/arrowDown.svg'

import { getAllPretendent, getAllPretendentCount, getWorkers, getWorkersNotion100, getWorkersNotion, getWorkerNotionId} from './../http/workerAPI'

import {getProjects, newCountMessagePretendent} from './../http/adminAPI'


//Workers.js
const Workers = () => {

  const { setCountPretendent, pretendents, setPretendents } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [spec, setSpec] = useState([]); 

  const [pending, setPending] = useState(true);  

  const [loading, setLoading]= useState(true);

  const [showTable, setShowTable] = useState([])
  const [showComment, setShowComment] = useState([])

  const [text, setText]= useState("");

  const [countWorker, setCountWorker] = useState(0);  
  const [countWorkerNew, setCountWorkerNew] = useState(0); 

  const [loadingCount, setLoadingCount] = useState(false); 

  //поиск
  // useEffect(() => {
	// 	const filteredData = pretendents.filter(user=> (user.project + user.workerFamily + user.workerName)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setSpec(text === '' ? pretendents : filteredData) 
  // }, [text]);



  //-----------------------------------------------------------------------------------------
  //			get pretendents
  //-----------------------------------------------------------------------------------------
  useEffect(() => {
    const arrWorkers = []

    setCountPretendent(0)
    //await newCountMessagePretendent(0)

    const fetchData = async () => {

      let res = await getAllPretendentCount(20, countWorker) //getAllPretendent();
      //console.log("pretendents workers: ", res)

      setCountWorker(countWorker+20)

      let workers = await getWorkers()
      //console.log("workers context: ", workers)

      let projects = await getProjects();
      //console.log("projects workers: ", projects)

      res.map(async (worker, i) => {

        let userObject = projects.find((proj) => proj.id === worker.projectId);  
        const projectName = userObject?.title

        let workerObject = workers.find((item) => item.chatId === worker.receiverId);  
        const workerName = workerObject?.userfamily + " "+ workerObject?.username

        const worklist = workerObject?.worklist ? JSON.parse(workerObject?.worklist) : ''
        const rang = workerObject?.rank ? workerObject?.rank : ''
        const comment = workerObject?.comment ? workerObject?.comment : ''
        const phone = workerObject?.phone

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

      
        //worklist
        const newWorker = {
          workerId: worker.workerId,
          date: newDate, 
          projectId: worker.projectId,
          project: projectName,
          workerFamily: workerObject?.userfamily,
          workerName: workerObject?.username,
          worklist: worklist, 
          rang: rang, 
          comment: comment, 
          phone: phone, 
          accept: worker.accept,
        }
        arrWorkers.push(newWorker)

        setSpec(arrWorkers) 
        setPretendents(arrWorkers)
      })  
      setLoading(false)
      setLoadingCount(false)
    }

    fetchData();
    
  },[countWorkerNew])

  //Посмотреть
  const handleClick = (ind) => {
    console.log(ind, showTable[ind])

    setShowTable(prevShownTable => ({
        ...prevShownTable,
        [ind]: !prevShownTable[ind]
      }));
  }

  const handleClickCom = (ind) => {

    setShowComment(prevShownComment => ({
        ...prevShownComment,
        [ind]: !prevShownComment[ind]
      }));
  }

  const clickNext = async() => {
    setLoadingCount(true)
    //1 все рассылки
		let response = await getAllPretendentCount(20, countWorker) //getAllPretendent();
    console.log("pretendent size: ", response.length)   

    setCountWorkerNew(countWorker+20)

    console.log("Всего сейчас: ", response.length)
			
    // setPretendents(response)	
    // console.log("Ещё: ", response.length)
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Претенденты</h2> */}
                    
                    <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." onChange={(e)=>setText(e.target.value)} aria-label="spec"/>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <CCardBody>
                              {loading ? 
                                      
                                <CSpinner/> :

                                <CTable align="middle" className="mb-0 border" hover responsive>
                                  <CTableHead className='table-light'>
                                    <CTableRow>
                                      <CTableHeaderCell className="text-center" style={{width: '200px'}}>Дата</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '320px'}}>Проект</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '370px'}}>ФИО</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>U.L.E.Y</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" >Комментарий</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Телефон</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                    {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.date}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          <CTooltip
                                              content={item.projectId}
                                              placement="top"
                                            >
                                              <div>{item.project}</div>
                                          </CTooltip>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.dateborn >= 2005 || item.accept ? 'red' : ''}}>
                                          <CTooltip
                                            content={item.workerId}
                                            placement="top"
                                          > 
                                            <div>{item.workerFamily + " " + item.workerName}</div>
                                          </CTooltip>
                                        </CTableDataCell>
                                        <CTableDataCell style={{fontSize: '13px', textAlign: 'left'}}>
                                          <div onClick={()=>handleClick(index)} style={{cursor: 'pointer'}}>{!showTable[index] ? 'Посмотреть' : <br/>}</div>
                                          <CCollapse visible={showTable[index]}>
                                            <table>
                                              {item.worklist ? 
                                              (item.worklist).map((spec, index)=>( 
                                                  <tr key={index}>
                                                    <td>- {spec.spec}</td>
                                                  </tr>          
                                              ))
                                              :""
                                              }
                                            </table>
                                          </CCollapse>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && 'red'}}>
                                          {item.rang}
                                        </CTableDataCell>
                                        <CTableDataCell style={{fontSize: '13px', textAlign: 'left'}}>
                                          <div onClick={()=>handleClickCom(index)} style={{cursor: 'pointer'}}>{!showComment[index] ? (item.comment ? 'Посмотреть' : '') : <br/>}</div>
                                          <CCollapse visible={showComment[index]}>
                                            {item.comment ? item.comment : <></>}
                                          </CCollapse>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          <div>{item.phone}</div>
                                        </CTableDataCell>
                                      </CTableRow>
                                      ))
                                    }
                                </CTableBody>                   
                                </CTable>
                              }
                              {loadingCount ? <CSpinner/> : "" }
                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{width: '50px', marginTop: '15px', cursor: 'pointer'}}></img>
                              </div> 
                            </CCardBody>
                          </CCard>
                        </CCol>
                    </CRow>
                  </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Workers
