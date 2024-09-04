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

import { getAllPretendent, getAllPretendentCount, getWorkers, getWorkersNotion100, getWorkersNotion, getWorkerNotionId, getCanceled} from '../http/workerAPI'

import {getProjects, newCountMessagePretendent} from '../http/adminAPI'


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
  useEffect(() => {
    //let cancels = getCanceled();
		const filteredData = spec.filter(user=> (user.tgId + user.crmId)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    setSpec(text === '' ? spec : filteredData) 
  }, [text]);


  //-----------------------------------------------------------------------------------------
  //			get pretendents
  //-----------------------------------------------------------------------------------------
  useEffect(() => {
    const arrWorkers = []

    setCountPretendent(0)
    //await newCountMessagePretendent(0)

    const fetchData = async () => {

      let workers = await getWorkers()
      //console.log("workers context: ", workers)

      let projects = await getProjects();
      //console.log("projects: ", projects)

      let cancels = await getCanceled();
      //console.log("cancels: ", cancels)

      cancels.map(async (worker, i) => {
        console.log(worker)
        let userObject = projects.find((proj) => proj.id === worker.projectId);  
        const projectName = userObject?.title
        const crmId = userObject?.crmID

        let workerObject = workers.find((item) => item.chatId === worker.receiverId);  
        const workerName = workerObject?.userfamily + " "+ workerObject?.username

        const status = worker.cancel

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;



        const d3 = new Date(worker.updatedAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d4 = new Date(d3)

        const month2 = String(d4.getMonth()+1).padStart(2, "0");
        const day2 = String(d4.getDate()).padStart(2, "0");
        const chas2 = d4.getHours();
        const min2 = String(d4.getMinutes()).padStart(2, "0");
        const updateDate = `${day2}.${month2} ${chas2}:${min2}`;

        let startDate = ''
        if (worker.datestart) {
          const d5 = new Date(worker.datestart).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
          const d6 = new Date(d5)

          const month3 = String(d6.getMonth()+1).padStart(2, "0");
          const day3 = String(d6.getDate()).padStart(2, "0");
          const chas3 = d6.getHours();
          const min3 = String(d6.getMinutes()).padStart(2, "0");
          startDate = `${day3}.${month3} ${chas3}:${min3}`;
        }

        let endDate = ''
        if (worker.dateend) {
          const d7 = new Date(worker.dateend).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
          const d8 = new Date(d7)

          const month4 = String(d8.getMonth()+1).padStart(2, "0");
          const day4 = String(d8.getDate()).padStart(2, "0");
          const chas4 = d8.getHours();
          const min4 = String(d8.getMinutes()).padStart(2, "0");
          endDate = `${day4}.${month4} ${chas4}:${min4}`;
        }
        

      
        //worklist
        const newWorker = {
          id: worker.id,
          workerId: worker.workerId,
          date: newDate, 
          projectId: worker.projectId,
          project: projectName,
          crmId: crmId,
          workerFamily: workerObject?.userfamily,
          workerName: workerObject?.username,
          tgId: worker.receiverId, 
          status: status,  
          accept: worker.accept,
          updatedAt: updateDate,
          datestart: startDate,
          dateend: endDate,
        }
        arrWorkers.push(newWorker)

        setSpec(arrWorkers) 

      })  
      setLoading(false)
      //setLoadingCount(false)
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
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>№</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '200px'}}>Дата</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '320px'}}>Проект</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '320px'}}>CRM ID</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '370px'}}>ФИО</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>TelegramId</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Статус</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Обновлено</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Start</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>End</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                    {spec.length > 0 && spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center">
                                          {item.id}
                                        </CTableDataCell>
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
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          <div>{item.crmId}</div>
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
                                          {item.tgId}
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && 'red'}}>
                                          {item.status === true ? 'Отказано' : ''}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && 'red'}}>
                                          {item.updatedAt}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.datestart}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.dateend}
                                        </CTableDataCell>
                                      </CTableRow>
                                      ))
                                    }
                                </CTableBody>                   
                                </CTable>
                              }

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
