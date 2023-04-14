import React, { Suspense, useState, useEffect } from 'react'
import { Navigate, Route, Routes, Link } from 'react-router-dom'
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
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilCloudDownload,
  cilPeople,
} from '@coreui/icons'
import DataTable from 'react-data-table-component';

import avatar2 from 'src/assets/images/avatars/2.jpg'
import deleteIcon from 'src/assets/images/delete.png'
import pencilIcon from 'src/assets/images/pencil.png'
import { getDistributions, delDistribution } from 'src/http/adminAPI';

const Distribution = () => {
  const [distributions, setDistributions]= useState([]);

  //get Projects
  useEffect(() => {
    const fetchData = async () => {
			let response = await getDistributions();
      //console.log("response: ", response)

      let strReceivers = ''

      const arrDitributions = []
      response.map((distrib, index) => {
        //console.log("receivers: ", JSON.parse(distrib.receivers))
        JSON.parse(distrib.receivers).map((receiver)=>{
          //console.log("label: ", receiver.label)
          strReceivers = receiver.label + ' '
        })

        const d = new Date(distrib.createdAt);
				const year = d.getFullYear();
				const month = String(d.getMonth()+1).padStart(2, "0");
				const day = String(d.getDate()).padStart(2, "0");
				const chas = d.getHours();
				const minut = String(d.getMinutes()).padStart(2, "0");
				const newDateMessage = `${day}.${month}.${year} ${chas}:${minut}`

        const newDistribution = {
          id: distrib.id,
					name: distrib.name,
          text: distrib.text,
          image: distrib.image,
          button: distrib.button,
          receivers: strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          datestart: newDateMessage,
          status: distrib.delivered ? "отправлено" : "не отправлено",
				}
        //console.log(index)
        arrDitributions.push(newDistribution)
      })

      //console.log("arr: ", arrDitributions)

      setDistributions(arrDitributions.reverse()) 
    }

    fetchData();
    
  },[])

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    setDistributions(distributions.filter(p => p.id !== desk.id))
    //удаление сообщения в базе данных
    await delDistribution(desk.id)
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
                    <h2>Рассылки</h2>
                      <Link to={'/distribution_add'}><CButton color="primary" size="lg" >Новая рассылка</CButton></Link>
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>Рассылки</CCardHeader>
                            <CCardBody>

                              <br />

                              <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className='table-dark'>
                                  <CTableRow>
                                    <CTableHeaderCell>№</CTableHeaderCell>
                                    {/* <CTableHeaderCell>Название</CTableHeaderCell> */}
                                    <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Текст</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Картинка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Кнопка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Получатели</CTableHeaderCell>   
                                    <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Управление</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {distributions.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                      <CTableDataCell>
                                        <div>{index+1}</div>
                                      </CTableDataCell>
                                      {/* <CTableDataCell>
                                        <div>{item.name}</div>
                                        <div className="small text-medium-emphasis">
                                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                          {item.user.registered}
                                        </div> 
                                      </CTableDataCell>*/}
                                      <CTableDataCell className="text-center">
                                        <div>{item.datestart}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.text}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div><img src={item.image} width={30} height={30}></img></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.button}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.receivers}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.status}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        {/* <CButton color="light">
                                          <img src={pencilIcon} alt='' width='15px'/>
                                        </CButton>
                                        &nbsp; */}
                                        <CButton color="light" onClick={() => removeDescription(item)}>
                                          <img src={deleteIcon} alt='' width='10px' />
                                        </CButton>
                                      </CTableDataCell>
                                    </CTableRow>
                                  ))}
                                </CTableBody>
                              </CTable>
                            </CCardBody>
                          </CCard>
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

export default Distribution
