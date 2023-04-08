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
import avatar2 from 'src/assets/images/avatars/2.jpg'
import deleteIcon from 'src/assets/images/delete.png'
import pencilIcon from 'src/assets/images/pencil.png'
import { getDistributions } from 'src/http/adminAPI';

const Distribution = () => {
  const [distributions, setDistributions]= useState([]);

  const tableDistribution = [
    {
      name: 'название',
      text: 'текст рассылки',
      image: 'https://',
      button: 'текст кнопки',
      receivers: '[]',
      datestart: '01.01.2023',
      delivered: 'доставлено',
    }
  ]

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
        const newDistribution = {
					name: distrib.name,
          text: distrib.text,
          image: distrib.image,
          button: distrib.button,
          receivers: strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          datestart: distrib.createdAt,
          status: distrib.delivered ? "отправлено" : "не отправлено",
				}
        console.log(index)
        arrDitributions.push(newDistribution)
      })

      //console.log("arr: ", arrDitributions)

      setDistributions(arrDitributions) 
    }

    fetchData();
    
  },[])

  const handleAddButton = () => {

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
                      <Link to={'/distribution_add'}><CButton color="primary" size="lg" onClick={handleAddButton}>Новая рассылка</CButton></Link>
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
                                    <CTableHeaderCell>ID</CTableHeaderCell>
                                    <CTableHeaderCell>Название</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Текст</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Картинка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Кнопка</CTableHeaderCell>
                                    <CTableHeaderCell>Получатели</CTableHeaderCell>
                                    <CTableHeaderCell>Дата отправки</CTableHeaderCell>
                                    <CTableHeaderCell>Статус</CTableHeaderCell>
                                    <CTableHeaderCell>Управление</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {distributions.map((item, index) => (
                                    <CTableRow v-for="item in tableItems" key={index}>
                                      <CTableDataCell>
                                        <div>{index+1}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.name}</div>
                                        {/* <div className="small text-medium-emphasis">
                                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                          {item.user.registered}
                                        </div> */}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.text}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.image}</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div>{item.button}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.receivers}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.datestart}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <div>{item.status}</div>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        <CButton color="light">
                                          <img src={pencilIcon} alt='' width='15px'/>
                                        </CButton>
                                        &nbsp;
                                        <CButton color="light">
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
