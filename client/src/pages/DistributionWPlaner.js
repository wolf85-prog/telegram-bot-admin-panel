import React, { Suspense, useState, useEffect } from 'react'
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
  CFormCheck,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import deleteIcon from 'src/assets/images/delete.png'
import { useUsersContext } from "../chat-app-new/context/usersContext";
import { delDistribution } from 'src/http/adminAPI';

const DistributionWPlaner = () => {
  const { distributionsWork: messages } = useUsersContext();
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [loading, setLoading]= useState(true);

  //get Distribution
  useEffect(() => {
    const fetchData = async () => {
			//let response = await getDistributions();
      console.log("distributionsW: ", messages)

      let strReceivers = ''

      const arrDitributions = []
      messages.map((distrib, index) => {
        JSON.parse(distrib.receivers).map((receiver)=>{
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
          image: distrib.image.split('5000/')[1] !=='' ? distrib.image: '',
          button: distrib.button,
          receivers: strReceivers,//JSON.parse(distrib.receivers)[index-1].label,
          datestart: newDateMessage,
          status: distrib.delivered ? "отправлено" : "не отправлено",
				}
        //console.log(index)
        arrDitributions.push(newDistribution)
      })

      setDistributionsWork(arrDitributions) 
      setLoading(false)
    }

    fetchData();
    
  },[messages])

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    setDistributionsWork(distributionsWork.filter(p => p.id !== desk.id))
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
                    <h2>Планирование рассылок</h2>
                      <br />
                      <br />
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>График рассылок</CCardHeader>
                            <CCardBody>

                              <br /> 

                            {loading ? 
                                  
                              <CSpinner/> :

                              <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className='table-dark'>
                                  <CTableRow>
                                    {/* <CTableHeaderCell>№</CTableHeaderCell> */}
                                    <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center">Специалисты</CTableHeaderCell>   
                                    <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" rowSpan={7}>
                                        <div>28.06</div>
                                      </CTableDataCell>      
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>06:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow>  

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>07:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>08:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>09:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>10:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>11:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 

                                    <CTableRow v-for="item in tableItems" >
                                      <CTableDataCell className="text-center" style={{width: '50px'}}>
                                        <div>12:00</div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <div></div>
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center">
                                        <CFormCheck id="flexCheckDefault"/>
                                      </CTableDataCell>
                                    </CTableRow> 


                                </CTableBody>
                              </CTable>
                            }                              
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

export default DistributionWPlaner
