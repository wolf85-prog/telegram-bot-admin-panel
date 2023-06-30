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

  const [showEditTime, setShowEditTime] = useState(false)

  const [showEditTime2, setShowEditTime2] = useState(false)
  const [showEditTime3, setShowEditTime3] = useState(false)
  const [showEditTime4, setShowEditTime4] = useState(false)
  const [showEditTime5, setShowEditTime5] = useState(false)
  const [showEditTime6, setShowEditTime6] = useState(false)
  const [showEditTime7, setShowEditTime7] = useState(false)

  const [time, setTime] = useState('06:00')
  const [time2, setTime2] = useState('07:00')
  const [time3, setTime3] = useState('08:00')
  const [time4, setTime4] = useState('09:00')
  const [time5, setTime5] = useState('10:00')
  const [time6, setTime6] = useState('11:00')
  const [time7, setTime7] = useState('12:00')

  const [dates, setDates] = useState([
    {date: '28.06', time: '06:00', proj: ''},
    {date: '28.06', time: '07:00', proj: ''},
    {date: '28.06', time: '08:00', proj: ''},
    {date: '28.06', time: '09:00', proj: ''},
    {date: '28.06', time: '10:00', proj: ''},
    {date: '28.06', time: '11:00', proj: ''},
    {date: '28.06', time: '12:00', proj: ''}
  ])

  const [countCol, setCountCol] = useState(7)
  const [countClick1, setCountClick1] = useState(0)
  const [countClick2, setCountClick2] = useState(0)
  const [countClick3, setCountClick3] = useState(0)
  const [countClick4, setCountClick4] = useState(0)
  const [countClick5, setCountClick5] = useState(0)
  const [countClick6, setCountClick6] = useState(0)
  const [countClick7, setCountClick7] = useState(0)

  const d = new Date();
  const month = String(d.getMonth()+1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
  const date_str = `${day}.${month}`;
  
  d.setDate(d.getDate() + 1);
  const month2 = String(d.getMonth()+1).padStart(2, "0");
	const day2 = String(d.getDate()).padStart(2, "0");
  const date_str2 = `${day2}.${month2}`;

  let arr = []


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


  {/* Показать Добавление времени */}
  const clickShowEditTime = (t, ind) => {
    console.log(t)

    if (t === '06:00')  {
      setCountClick1(countClick1+1)
      console.log("countClick1: ", countClick1+1)
      if (countClick1 < 1) {
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

    if (t === '06:30')  {
      showEditTime ? setShowEditTime(false) : setShowEditTime(true) 
    }

    if (t === '07:00')  {
      setCountClick2(countClick2+1)
      console.log("countClick2: ", countClick2+1)
      if (countClick2 < 1) {
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

    if (t === '08:00')  {
      setCountClick3(countClick3+1)
      //console.log("countClick2: ", countClick2+1)
      if (countClick3 < 1) {
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

    if (t === '09:00')  {
      setCountClick4(countClick4+1)
      //console.log("countClick2: ", countClick2+1)
      if (countClick4 < 1) {
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

    if (t === '10:00')  {
      setCountClick5(countClick5+1)
      //console.log("countClick2: ", countClick2+1)
      if (countClick5 < 1) {
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

    if (t === '11:00')  {
      setCountClick6(countClick6+1)
      //console.log("countClick2: ", countClick2+1)
      if (countClick6 < 1) {
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

    if (t === '12:00')  {
      setCountClick7(countClick7+1)
      //console.log("countClick2: ", countClick2+1)
      if (countClick7 < 1) {
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
                                          {/* <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div>{item.date}</div> 
                                          </CTableDataCell> */}     
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index)} >{item.time}</div>
                                              <div style={{display: showEditTime ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                                <div onClick={changeTimePlus}>
                                                  &#9650;
                                                </div>
                                                <div onClick={changeTimeMinus}>          	
                                                  &#9660;
                                                </div>
                                              </div>   
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '400px'}}>
                                            <div>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck id="flexCheckDefault"/>
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>

                                <CCol xs>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered>
                                  <CTableHead className='table-dark'>
                                    <CTableRow>
                                      {/* <CTableHeaderCell>№</CTableHeaderCell> */}
                                      <CTableHeaderCell className="text-center">Дата</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                      <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>
                                  <CTableBody>
                                      <CTableRow v-for="item in tableItems" >
                                        <CTableDataCell className="text-center" style={{width: '50px'}} rowSpan={9}>
                                          <div>{date_str2}</div>
                                        </CTableDataCell>      
                                        <CTableDataCell className="text-center" style={{width: '50px'}} >
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('06:00')} >{time}</div>
                                            <div style={{display: showEditTime[0] ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('07:00')} >{time2}</div>
                                            <div style={{display: showEditTime2 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('08:00')} >{time3}</div>
                                            <div style={{display: showEditTime3 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center">
                                          <div></div>
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center" style={{width: '50px'}}>
                                          <CFormCheck id="flexCheckDefault"/>
                                        </CTableDataCell>
                                      </CTableRow> 

                                      <CTableRow v-for="item in tableItems" >
                                        <CTableDataCell className="text-center" style={{width: '50px'}}>
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('09:00')} >{time4}</div>
                                            <div style={{display: showEditTime4 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('10:00')} >{time5}</div>
                                            <div style={{display: showEditTime5 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('11:00')} >{time6}</div>
                                            <div style={{display: showEditTime6 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
                                          <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div onClick={()=>clickShowEditTime('12:00')} >{time7}</div>
                                            <div style={{display: showEditTime7 ? "block" : "none", fontSize: '12px', paddingLeft: '8px'}}>
                                              <div onClick={changeTimePlus}>
                                                &#9650;
                                              </div>
                                              <div onClick={changeTimeMinus}>          	
                                                &#9660;
                                              </div>
                                            </div>   
                                          </div>
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
