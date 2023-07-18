import React, { Suspense, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { delDistribution, getProjectId, newPlan, getPlan } from 'src/http/adminAPI';

const DistributionWPlaner = () => {
  const location = useLocation()
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [loading, setLoading]= useState(true);

  const projectId= location.state.project

  const [showEditTime, setShowEditTime] = useState(false)
  const [time, setTime] = useState('06:00')

  const [countCol, setCountCol] = useState(6)
  const [countCol2, setCountCol2] = useState(6)
  const [countCol3, setCountCol3] = useState(6)

  //table1
  const [countClick11, setCountClick11] = useState(0)
  const [countClick21, setCountClick21] = useState(0)
  const [countClick31, setCountClick31] = useState(0)
  const [countClick41, setCountClick41] = useState(0)
  const [countClick51, setCountClick51] = useState(0)
  const [countClick61, setCountClick61] = useState(0)

  //table2
  const [countClick12, setCountClick12] = useState(0)
  const [countClick22, setCountClick22] = useState(0)
  const [countClick32, setCountClick32] = useState(0)
  const [countClick42, setCountClick42] = useState(0)
  const [countClick52, setCountClick52] = useState(0)
  const [countClick62, setCountClick62] = useState(0)

  //table3
  const [countClick13, setCountClick13] = useState(0)
  const [countClick23, setCountClick23] = useState(0)
  const [countClick33, setCountClick33] = useState(0)
  const [countClick43, setCountClick43] = useState(0)
  const [countClick53, setCountClick53] = useState(0)
  const [countClick63, setCountClick63] = useState(0)

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
    {date: date_str, time: '08:00', proj: '', save: false},
    {date: date_str, time: '09:00', proj: '', save: false},
    {date: date_str, time: '10:00', proj: '', save: false},
    {date: date_str, time: '11:00', proj: '', save: false},
  ])


  const [dates1, setDates1] = useState([
    {date: date_str, time: '12:00', proj: '', save: false},
    {date: date_str, time: '13:00', proj: '', save: false},
    {date: date_str, time: '14:00', proj: '', save: false},
    {date: date_str, time: '15:00', proj: '', save: false},
    {date: date_str, time: '16:00', proj: '', save: false},
    {date: date_str, time: '17:00', proj: '', save: false},
  ])

  const [dates11, setDates11] = useState([
    {date: date_str, time: '18:00', proj: '', save: false},
    {date: date_str, time: '19:00', proj: '', save: false},
    {date: date_str, time: '20:00', proj: '', save: false},
    {date: date_str, time: '21:00', proj: '', save: false},
    {date: date_str, time: '22:00', proj: '', save: false},
    {date: date_str, time: '23:00', proj: '', save: false},
  ])

//----------------------------------------------------------

  const [dates2, setDates2] = useState([
    {date: date_str2, time: '06:00', proj: '', save: false},
    {date: date_str2, time: '07:00', proj: '', save: false},
    {date: date_str2, time: '08:00', proj: '', save: false},
    {date: date_str2, time: '09:00', proj: '', save: false},
    {date: date_str2, time: '10:00', proj: '', save: false},
    {date: date_str2, time: '11:00', proj: '', save: false},
    {date: date_str2, time: '12:00', proj: '', save: false}
  ])

  const [projectName, setProjectName] = useState('')
  const [projectView, setProjectView] = useState(false)
  const [value1, setValue1] = useState([false, false, false, false, false, false, false])
  const [value2, setValue2] = useState([false, false, false, false, false, false, false])
  const [value3, setValue3] = useState([false, false, false, false, false, false, false])

  let arr = []
  let arr2 = []

  useEffect(() => {
    const fetchData = async () => {
      let project = await getProjectId(projectId);
 
      setProjectName(project.properties.Name.title[0]?.plain_text)
    }
      fetchData();
  })

  useEffect(() => {
    const fetchData = async () => {
      let plan = await getPlan('18.07.2023');
      console.log("plan: ", JSON.parse(plan.times))
 
      //setProjectName(project.properties.Name.title[0]?.plain_text)
    }
      fetchData();
  })

  {/* Удаление рассылки */}
  const removeDescription = async(desk) => {
    setDistributionsWork(distributionsWork.filter(p => p.id !== desk.id))
    //удаление сообщения в базе данных
    await delDistribution(desk.id)
  }

//поставить галочку Статус
  const changeStatus = (ind, tab) => {
    if (tab === 1) {
      if (value1[ind]) {
        value1[ind] = false
        dates[ind].proj = ''
      } else {
        value1[ind] = true
        dates[ind].proj = projectName //location.state.project
        dates[ind].save = true
      } 

      setValue1(value1)
    }

    if (tab === 2) {
      if (value2[ind]) {
        value2[ind] = false
        dates1[ind].proj = ''
      } else {
        value2[ind] = true
        dates1[ind].proj = projectName //location.state.project
        dates1[ind].save = true
      } 

      setValue2(value2)
    }

    if (tab === 3) {
      if (value3[ind]) {
        value3[ind] = false
        dates11[ind].proj = ''
      } else {
        value3[ind] = true
        dates11[ind].proj = projectName //location.state.project
        dates11[ind].save = true
      } 

      setValue3(value3)
    }
    

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
    }

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
    }

    //12:00 - 17:00

    if (t === '12:00')  {
      if (tab === 2) {
        setCountClick12(countClick12+1)
        if (countClick12 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '12:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

    if (t === '13:00')  {
      if (tab === 2) {
        setCountClick22(countClick22+1)
        if (countClick22 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '13:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

    if (t === '14:00')  {
      if (tab === 2) {
        setCountClick32(countClick32+1)
        if (countClick32 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '14:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

    if (t === '15:00')  {
      if (tab === 2) {
        setCountClick42(countClick42+1)
        if (countClick42 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '15:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

    if (t === '16:00')  {
      if (tab === 2) {
        setCountClick52(countClick52+1)
        if (countClick52 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '16:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

    if (t === '17:00')  {
      if (tab === 2) {
        setCountClick62(countClick62+1)
        if (countClick62 < 1) {
          setCountCol2(countCol2+1)
          arr = dates1.slice(0);
          const newObj = {
                date: date_str,
                time: '17:30',
                proj: ''
              }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)
        }
      }
    }

        //18:00 - 23:00

    if (t === '18:00')  {
          if (tab === 3) {
            setCountClick13(countClick13+1)
            if (countClick13 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '18:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }
    
    if (t === '19:00')  {
          if (tab === 3) {
            setCountClick23(countClick23+1)
            if (countClick23 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '19:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }
    
    if (t === '20:00')  {
          if (tab === 3) {
            setCountClick33(countClick33+1)
            if (countClick33 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '20:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }
    
    if (t === '21:00')  {
          if (tab === 3) {
            setCountClick43(countClick43+1)
            if (countClick43 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '21:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }
    
    if (t === '22:00')  {
          if (tab === 3) {
            setCountClick53(countClick53+1)
            if (countClick53 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '22:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }
    
    if (t === '23:00')  {
          if (tab === 3) {
            setCountClick63(countClick63+1)
            if (countClick63 < 1) {
              setCountCol3(countCol3+1)
              arr = dates11.slice(0);
              const newObj = {
                    date: date_str,
                    time: '23:30',
                    proj: ''
                  }
              arr.splice(ind+1, 0, newObj);
              setDates11(arr)
            }
          }
    }

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

  const savePlan = async() => {
    //console.log('save press')
    const planer = [...dates, ...dates1, ...dates11]
    const planer_str = JSON.stringify(planer) 
    //console.log("planer_str: ", planer_str)
    const d_str = new Date().toLocaleDateString()
    const newObj = {
      "datestart": d_str,
      "times": planer_str
    }
    await newPlan(newObj);
    backPage()
  }

  const navigate = useNavigate();
  const backPage = () => {
       navigate('/distributionw_add');
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

                              <CRow>
                              <CCol xs>                                   
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
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
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none"}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value1[index]}
                                              onChange={()=>changeStatus(index, 1)}
                                              disabled={item.save ? 'disabled': ''}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
{/* -----------------------------12:00----------------------------------------------------------------------------------- */}
                                <CCol xs>                                   
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol2}px`}} >
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
                                    {dates1.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 2)} >{item.time}</div>
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
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none"}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value2[index]}
                                              onChange={()=>changeStatus(index, 2)}
                                              disabled={item.save ? 'disabled': ''}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>

{/* ----------------------------18:00------------------------------------------------------------------------------------ */}
                                <CCol xs>
                                <div style={{float: "left", display: 'flex'}}>
                                  <CTable align="middle" className="mb-0 border" hover responsive bordered style={{float: 'left'}}>   
                                    <CTableHead className='table-dark' >
                                      <CTableRow>
                                        <CTableHeaderCell className="text-center" style={{width: '70px'}}>Дата</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                      <CTableRow v-for="item in tableItems">
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol3}px`}} >
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
                                    {dates11.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value3[index]}
                                              onChange={()=>changeStatus(index, 3)}
                                              disabled={item.save ? 'disabled': ''}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>

                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                              <div style={{marginRight: '16px'}}>
                                <Link to={'/distributionw_add'}>
                                  <CButton color="secondary" style={{width: '130px'}}>Назад</CButton>
                                </Link>
                              </div>
                              <div>
                                <CButton color="primary" onClick={savePlan} style={{width: '130px'}}>Сохранить</CButton>  
                              </div>
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
