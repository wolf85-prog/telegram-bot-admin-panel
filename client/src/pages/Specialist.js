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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
} from '@coreui/react'
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getWorkers } from './../http/specAPI'

import Close from "../assets/images/close.svg"

//Workers.js
const Specialist = () => {

  const dispatch = useDispatch()
  const rigthbarShow = useSelector((state) => state.rigthbarShow)

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [spec, setSpec] = useState([]); 
  const [visibleXL, setVisibleXL] = useState(false)
  const [modalWorker, setModalWorker] = useState({})

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
          phone2: worker.phone2,
          spec: worker.specialization,
          city: worker.city, 
          skill: worker.skill,
          promo: worker.promoId, 
          rank: worker.rank, 
          merch: worker.merch,  
          company: worker.company, 
          comteg: worker.comteg, 
          comteg2: worker.comteg2, 
          comment: worker.comment, 
          comment2: worker.comment2, 
          age: worker.age, 
          reyting: worker.reyting, 
          inn: worker.inn, 
          passport: worker.passport, 
          profile: worker.profile, 
          dogovor: worker.dogovor, 
          samozanjatost: worker.samozanjatost, 
          passportScan: worker.passportScan, 
          email: worker.email, 
        }
        arrWorkers.push(newWorker)

        setSpec(arrWorkers) 
      })  

      setLoading(false)
    }

    fetchData();
    
  },[])

  const clickFio = (worker)=> {
    //console.log(worker)
    setVisibleXL(true)
    setModalWorker(worker)
  }


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

                                <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                  <CTableHead className='table-light'>
                                    <CTableRow>
                                      <CTableHeaderCell className='widthSpace'>ФИО</CTableHeaderCell>  
                                      <CTableHeaderCell className='widthSpace'>Телеграм</CTableHeaderCell> 
                                      <CTableHeaderCell className='widthSpace'>Телефон</CTableHeaderCell> 
                                      <CTableHeaderCell className='widthSpace'>Специальность</CTableHeaderCell>  
                                      <CTableHeaderCell className='widthSpace'>Телефон №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Город</CTableHeaderCell>                         
                                      <CTableHeaderCell className='widthSpace'>Навык</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Промокод</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Проекты</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Мерч</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Прокатная компания</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комтег</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комтег №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комментарии</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Комментарии №2</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Год рождения</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Рейтинг</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>ИНН</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Паспорт</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Профиль</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Д</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>С</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Паспорт [скан]</CTableHeaderCell>
                                      <CTableHeaderCell className='widthSpace'>Почта</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>                                  
                                  {spec.map((item, index) => (
                                      <CTableRow v-for="item in tableItems" key={index}>
                                        <CTableDataCell onClick={()=>clickFio(item)} className="text-center widthSpace" style={{cursor: 'pointer'}}>
                                          {item.fio}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                          {item.telegram}
                                        </CTableDataCell>
                                         <CTableDataCell className="text-center widthSpace">
                                          {item.phone}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                         {item.spec}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.phone}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                          {item.city}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.skill}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.promo}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.rank}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.merch}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.company}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comteg}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comteg2}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comment}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.comment2}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.age}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.reyting}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.inn}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.passport}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.profile}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.dogovor}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.samozanjatost}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.passportScan}
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                        {item.email}
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

            <CModal
              size="lg"
              visible={visibleXL}
              onClose={() => setVisibleXL(false)}
              aria-labelledby="OptionalSizesExample1"
            >
              <CModalBody>
                  
                  <div>
                      <svg className="rounded me-2" width="214" height="214" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                        <rect width="214px" height="214px" fill="#007aff"></rect> 
                      </svg>
                      <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '5px', left: '255px'}}>
                        {modalWorker.fio}
                      </span>
                      <div style={{position: 'relative', height: '650px'}}>
                        <div style={{position: 'absolute', top: '50px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.city}
                          </span>    
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.age}
                          </span>
                        </div>

                        <div style={{position: 'absolute', top: '110px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                        
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '550px'}}>
                            {modalWorker.spec}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '170px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.phone}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.phone2}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '230px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.telegram}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.skill}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '290px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.promo}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.rank}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '350px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.merch}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.company}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '410px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.comteg}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.comteg2}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '470px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.comment}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.comment2}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '530px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.reyting}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.inn}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '590px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.passport}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.email}
                          </span>    
                        </div>

                        <div style={{position: 'absolute', top: '650px', left: '240px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '525px'}}>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.dogovor}
                          </span>
                          <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', border: '1px solid #535252', borderRadius: '7px', padding: '5px 10px', width: '255px'}}>
                            {modalWorker.samozanjatost}
                          </span>    
                        </div>
                      </div>
                      <img src={Close} onClick={()=>setVisibleXL(false)} style={{position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                  
                    </div>
              </CModalBody>
            </CModal>

        </div>
        <AppFooter />
      </div>
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Specialist
