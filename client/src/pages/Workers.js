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
} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { 
  getWorkerId, 
  getProjects3, 
  newPretendent 
} from './../http/adminAPI';
import { getAllPretendent, getWorkers, getWorkersNotion, getWorkerNotionId } from './../http/workerAPI'


//Workers.js
const Workers = () => {

  //const { pretendents } = useUsersContext();
  //const { projects } = useUsersContext();
  const { setCountPretendent } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [spec, setSpec] = useState([]); 
  const [pending, setPending] = useState(true);  

  const [loading, setLoading]= useState(true);

  const [visibleA, setVisibleA] = useState(false)

  //get pretendents
  useEffect(() => {
    const arrWorkers = []
    let specStr
    let specArr

    setCountPretendent(0)

    const fetchData = async () => {

      let pretendents = await getAllPretendent();
      console.log("pretendents: ", pretendents)

      let workers = await getWorkers()
      console.log("workers: ", workers)

      let workersN = await getWorkersNotion()
      console.log("workersN: ", workersN)

      let projects = await getProjects3();
      console.log("projects: ", projects)

      setProjects(projects) 

      pretendents.map(async (worker, i) => {

        let userObject = projects.find((proj) => proj.id === worker.projectId);  
        const projectName = userObject?.name

        let userObject2 = workers.find((item) => item.chatId === worker.receiverId);  
        const workerName = userObject2?.userfamily + " "+ userObject2?.username

        let userObject3 = workersN.find((item) => item.tgId === worker.receiverId);  
        const worklist = userObject3?.spec
        const rang = "" //userObject3?.spec
        const comment = "" //userObject3?.spec
        const phone = userObject3?.phone

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        //worklist
        //setTimeout(async()=> {
          //const workNotions = await getWorkerNotionId(worker.receiverId)
      

        //setTimeout(()=> {
          const newWorker = {
            date: newDate, //newDate,
            project: projectName,
            worker: workerName, 
            worklist: worklist, //workNotions[0].spec,
            rang: rang, //workNotions[0]?.rank,
            comment: comment, //workNotions[0]?.comment,
            phone: phone, //workNotions[0]?.phone,

          }
          arrWorkers.push(newWorker)

          setSpec(arrWorkers) 

          setLoading(false)
        //}, 2500 * ++i)
        
      })  
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
                    <h2>Претенденты</h2>
                    
                    <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." aria-label="City"/>
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
                                      <CTableHeaderCell className="text-center" style={{width: '110px'}}>Дата</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Проект</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '150px'}}>ФИО</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '140px'}}>U.L.E.Y</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{minWidth: '120px'}}>Комментарий</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>Телефон</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                    {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center">
                                          {item.date}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          {item.project}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.dateborn >= 2005 ? 'red' : ''}}>
                                            {item.worker}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          <div onClick={() => setVisibleA(!visibleA)}>Посмотреть</div>
                                          <CCollapse visible={visibleA}>
                                            <table>
                                              {item.worklist ? 
                                              (item.worklist).map((spec, index)=>( 
                                                  <tr key={index}>
                                                    <td >{spec.name}</td>
                                                  </tr>          
                                              ))
                                              :""
                                              }
                                            </table>
                                          </CCollapse>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          {item.rang}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.dateborn >= 2005 ? 'red' : ''}}>
                                          {item.comment}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          <div>{item.phone}</div>
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
