import React, { Suspense, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const { distributionsWork: messages } = useUsersContext();
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [loading, setLoading]= useState(true);

  const [showEditTime, setShowEditTime] = useState(false)
  const [time, setTime] = useState('06:00')

  const [countCol, setCountCol] = useState(7)
  const [countCol2, setCountCol2] = useState(7)

  //table1
  const [countClick11, setCountClick11] = useState(0)
  const [countClick21, setCountClick21] = useState(0)
  const [countClick31, setCountClick31] = useState(0)
  const [countClick41, setCountClick41] = useState(0)
  const [countClick51, setCountClick51] = useState(0)
  const [countClick61, setCountClick61] = useState(0)
  const [countClick71, setCountClick71] = useState(0)

  //table2
  const [countClick12, setCountClick12] = useState(0)
  const [countClick22, setCountClick22] = useState(0)
  const [countClick32, setCountClick32] = useState(0)
  const [countClick42, setCountClick42] = useState(0)
  const [countClick52, setCountClick52] = useState(0)
  const [countClick62, setCountClick62] = useState(0)
  const [countClick72, setCountClick72] = useState(0)

  const d = new Date();
  const month = String(d.getMonth()+1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
  const date_str = `${day}.${month}`;
  
  d.setDate(d.getDate() + 1);
  const month2 = String(d.getMonth()+1).padStart(2, "0");
	const day2 = String(d.getDate()).padStart(2, "0");
  const date_str2 = `${day2}.${month2}`;


  const [dates, setDates] = useState([
    {date: date_str, time: '06:00', proj: '', save: false},
    {date: date_str, time: '07:00', proj: '', save: false},
    {date: date_str, time: '08:00', proj: 'Проект 3', save: true},
    {date: date_str, time: '09:00', proj: '', save: false},
    {date: date_str, time: '10:00', proj: '', save: false},
    {date: date_str, time: '11:00', proj: '', save: false},
    {date: date_str, time: '12:00', proj: '', save: false}
  ])

  const [dates2, setDates2] = useState([
    {date: date_str2, time: '06:00', proj: '', save: false},
    {date: date_str2, time: '07:00', proj: '', save: false},
    {date: date_str2, time: '08:00', proj: '', save: false},
    {date: date_str2, time: '09:00', proj: '', save: false},
    {date: date_str2, time: '10:00', proj: '', save: false},
    {date: date_str2, time: '11:00', proj: '', save: false},
    {date: date_str2, time: '12:00', proj: '', save: false}
  ])


  const [projectView, setProjectView] = useState(false)
  const [value1, setValue1] = useState([false, false, false, false, false, false, false])

  let arr = []
  let arr2 = []

  let value = [false, false, false, false, false, false, false]

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

//поставить галочку Статус
  const changeStatus = (ind) => {
    if (value1[ind]) {
      value1[ind] = false
      dates[ind].proj = ''
    } else {
      value1[ind] = true
      dates[ind].proj = location.state.project
    } 

    setValue1(value1)

    projectView ? setProjectView(false) : setProjectView(true)
  }

  // ---------------------------------------------------------------------

  {/* Показать Добавление времени */}
  const clickShowEditTime = (t, ind, tab) => {

    if (t === '06:00')  {
      if (tab === 1) {
        setCountClick11(countClick11+1)
        if (countClick11 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '06:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick12(countClick12+1)
        if (countClick12 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '06:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }

    }

    // if (t === '06:30')  {
    //   showEditTime ? setShowEditTime(false) : setShowEditTime(true) 
    // }

    if (t === '07:00')  {
      if (tab === 1) {
        setCountClick21(countClick21+1)
        if (countClick21 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '07:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick22(countClick22+1)
        if (countClick22 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '07:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
    }


    if (t === '08:00')  {
      if (tab === 1) {
        setCountClick31(countClick31+1)
        if (countClick31 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '08:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick32(countClick32+1)
        if (countClick32 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '08:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
    }

    if (t === '09:00')  {
      if (tab === 1) {
        setCountClick41(countClick41+1)
        if (countClick41 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '09:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick42(countClick42+1)
        if (countClick42 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '09:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
    }

    if (t === '10:00')  {
      if (tab === 1) {
        setCountClick51(countClick51+1)
        if (countClick51 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '10:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick52(countClick52+1)
        if (countClick52 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '10:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
    }

    if (t === '11:00')  {
      if (tab === 1) {
        setCountClick61(countClick61+1)
        if (countClick61 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '11:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick62(countClick62+1)
        if (countClick62 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '11:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
    }

    if (t === '12:00')  {
      if (tab === 1) {
        setCountClick71(countClick71+1)
        if (countClick71 < 1) {
          setCountCol(countCol+1)
          arr = dates.slice(0);
          const newObj = {
                date: date_str,
                time: '12:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)
        }
      }

      if (tab === 2) {
        setCountClick72(countClick72+1)
        if (countClick72 < 1) {
          setCountCol2(countCol2+1)
          arr2 = dates2.slice(0);
          const newObj = {
                date: date_str2,
                time: '12:30',
                proj: ''
              }
          arr2.splice(ind+1, 0, newObj);
          setDates2(arr2)
        }
      }
      
    }


    
    //   showEditTime ? setShowEditTime (false) : setShowEditTime (true)  
  
  }


  const changeTimePlus = () => {
    if (time === '06:00') setTime('06:10')
    if (time === '06:10') setTime('06:20')
    if (time === '06:20') setTime('06:30')
    if (time === '06:30') setTime('06:40')
    if (time === '06:40') setTime('06:50')
  }

  const changeTimeMinus = () => {
    if (time === '06:10') setTime('06:00')
    if (time === '06:20') setTime('06:10')
    if (time === '06:30') setTime('06:20')
    if (time === '06:40') setTime('06:30')
    if (time === '06:50') setTime('06:40')
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
                      <CRow>
                        <CCol xs>
                          <CCard className="mb-4">
                            <CCardHeader>График рассылок</CCardHeader>
                            <CCardBody>
                            <br /> 
                            {loading ? 
                                  
                              <CSpinner/> :

                              <CRow>
                                <CCol xs>
                                    
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol}px`}} >
                                          <div>{date_str}</div> 
                                        </CTableDataCell>
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>

                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        {/* <CTableHeaderCell className="text-center">Дата</CTableHeaderCell> */}
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 1)} >{item.time}</div>
                                              {/* <div style={{display: showEditTime ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                                <div onClick={changeTimePlus}>
                                                  &#9650;
                                                </div>
                                                <div onClick={changeTimeMinus}>          	
                                                  &#9660;
                                                </div>
                                              </div>    */}
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '400px'}}>
                                            <div style={{display: item.proj ? "block": "none"}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value1[index]}
                                              onChange={()=>changeStatus(index)}
                                              disabled={item.save ? 'disabled': ''}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
{/* ---------------------------------------------------------------------------------------------------------------- */}
                                <CCol xs>
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol2}px`}} >
                                          <div>{date_str2}</div> 
                                        </CTableDataCell>
                                      </CTableRow>
                                    </CTableBody>
                                  </CTable>

                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        {/* <CTableHeaderCell className="text-center">Дата</CTableHeaderCell> */}
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates2.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '400px'}}>
                                            <div>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
                            }   

                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                              <div style={{marginRight: '16px'}}><Link to={'/distributionw_add'}><CButton color="secondary" style={{width: '130px'}}>Назад</CButton></Link></div>
                              <div><CButton color="primary"  onClick={()=>{}} style={{width: '130px'}}>Сохранить</CButton>  </div>
                            </div>
                                                       
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
