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

import { getAllPretendent, getWorkers, getWorkersNotion100, getWorkersNotion, getWorkerNotionId } from './../http/workerAPI'


//Workers.js
const Workers = () => {

  //const { pretendents } = useUsersContext();
  //const { projects } = useUsersContext();
  const { setCountPretendent, pretendents } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [spec, setSpec] = useState([]); 

  const [pending, setPending] = useState(true);  

  const [loading, setLoading]= useState(true);

  const [visibleA, setVisibleA] = useState(false)

  const [showTable, setShowTable] = useState([])

  const [text, setText]= useState("");

  

  //поиск
  useEffect(() => {
		const filteredData = pretendents.filter(user=> (user.workerFamily+user.workerName)?.toLowerCase().includes(text.toLowerCase()));
    setSpec(filteredData);      
  }, [text]);

  //
  const handleClick = (ind) => {
    console.log(ind, showTable[ind])

    setShowTable(prevShownTable => ({
        ...prevShownTable,
        [ind]: !prevShownTable[ind]
      }));
  }

  //get Contacts
  useEffect(() => {

    const fetchData = async() => {
      console.log("workers-pretendent: ", pretendents)
      setSpec(pretendents); 
      setLoading(false)
    }

    fetchData()
  }, [pretendents])

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
                                      <CTableHeaderCell className="text-center" style={{width: '110px'}}>Дата</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Проект</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '150px'}}>ФИО</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '160px'}}>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '120px'}}>U.L.E.Y</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{minWidth: '120px'}}>Комментарий</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '180px'}}>Телефон</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                    {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.date}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.project}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{color: item.dateborn >= 2005 ? 'red' : ''}}>
                                            {item.workerFamily + " " + item.workerName}
                                        </CTableDataCell>
                                        <CTableDataCell style={{fontSize: '13px', textAlign: 'left', color: item.accept && "red"}}>
                                          <div onClick={()=>handleClick(index)} style={{cursor: 'pointer'}}>Посмотреть</div>
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
                                        <CTableDataCell className="text-center" style={{color: item.accept && "red"}}>
                                          {item.rang}
                                        </CTableDataCell>
                                        <CTableDataCell style={{color: item.dateborn >= 2005 ? 'red' : '', fontSize: '13px', textAlign: 'left'}}>
                                          {item.comment}
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
