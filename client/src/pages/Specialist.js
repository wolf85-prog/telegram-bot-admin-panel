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
  const rigthbarShow = useSelector((state) => state.rigthbarShow)

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
          fio: worker.fio,
          telegram: worker.chatId, 
          phone: worker.phone, 
          city: worker.city, 
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
                                      <CTableHeaderCell className="text-center" style={{width: '370px'}}>ФИО</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '200px'}}>Телеграм</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '300px'}}>Телефон</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '360px'}}>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Телефон №2</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Город</CTableHeaderCell>                         
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Навык</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Промокод</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Проекты</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Мерч</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Прокатные компании</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Комтеги</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Комментарии</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Год рождения</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>Рейтинг</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '100px'}}>ИНН</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Паспорт</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Профиль</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Договор</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Самозанятость</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Паспорт [скан]</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{width: '250px'}}>Почта</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                  {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell onClick={() => dispatch({ type: 'set', rigthbarShow: !rigthbarShow })} className="text-center" style={{cursor: 'pointer'}}>
                                          {item.fio}
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
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Specialist
