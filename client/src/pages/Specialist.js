import React, { Suspense, useEffect, useState } from 'react'
import { AppSidebar, AppFooter, AppHeader, AppRightbar } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux'
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

import { getWorkers } from './../http/specAPI'


//Workers.js
const Specialist = () => {

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [spec, setSpec] = useState([]); 

  //поиск
  // useEffect(() => {
	// 	const filteredData = pretendents.filter(user=> (user.project + user.workerFamily + user.workerName)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setSpec(text === '' ? pretendents : filteredData) 
  // }, [text]);


  //-----------------------------------------------------------------------------------------
  //			get specialist
  //-----------------------------------------------------------------------------------------
  useEffect(() => {
    const arrWorkers = []

    const fetchData = async () => {

      let workers = await getWorkers()
      console.log("specialist: ", workers)

      workers.map(async (worker, i) => {

        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        const newWorker = {
          name: worker.name,
          telegram: worker.chatId, 
          phone: worker.phone, 
          city: worker.city, 
          // worklist: worklist, 
          // rang: worker.rang, 
          // comment: worker.comment, 
          // phone: worker.phone, 
          // accept: worker.accept,
        }
        arrWorkers.push(newWorker)

        setSpec(arrWorkers) 
      })  

      setLoading(false)
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
                    <h2>Специалисты</h2>
                    
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
                                      <CTableHeaderCell className="text-center" style={{width: '370px'}}>Name</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '200px'}}>Telegram</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '300px'}}>Phone</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '360px'}}>Specialization</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Phone 2</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Город</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Skill</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Промокод ID</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Ранг</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Merch</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Company</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Комментарии</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Accept_confidential</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Accept_oferta</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Checking_account</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Date</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Email</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Mailing_address</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Рейтинг</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>ИНН</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Passport</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Age</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>КомТег</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>КомТег 2</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Профиль</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Договор</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Самозанятость</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Паспорт скан</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Комментарии 2</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                  {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })} className="text-center" style={{cursor: 'pointer'}}>
                                          {item.name}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          {item.telegram}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          {item.phone}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">

                                        </CTableDataCell>
                                        <CTableDataCell>
                                          {item.city}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">

                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          
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
      <AppRightbar />
    </div>
  )
}

export default Specialist
