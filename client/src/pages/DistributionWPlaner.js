import React, { Suspense, useState, useEffect, useRef } from 'react'
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
  CToast,
  CToastBody,
  CToaster,
  CToastClose
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { $host } from '../http/index';
import { useUsersContext } from "./../chat-app-new/context/usersContext";

import { 
  getProjectId, 
  newPlan, 
  getPlan, 
  newDistributionW, 
  getDistributionsW, 
  getDistributionsWPlan, 
  delDistributionWPlan,
  newPretendent,
  getWorkerId,
  editDistributionW,
} from 'src/http/adminAPI';

const DistributionWPlaner = () => {
  const location = useLocation()
  //const [distributionsWork, setDistributionsWork]= useState([]);
  const { addNewDistrib, setDistributionsWork } = useUsersContext();

  const token = process.env.REACT_APP_TELEGRAM_API_TOKEN_WORK
	const host = process.env.REACT_APP_API_URL
  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

  const projectId= location.state?.project
  const textDistr= location.state?.text
  const catDistr= location.state?.category
  const countReceiver= location.state?.count
  const dateDistrib = location.state?.date
  const imageDistrib = location.state?.image
  const showEditButtonAdd = location.state?.showbuttons
  const textButton = location.state?.textbutton
  const selected = location.state?.selected


  console.log("catDistr: ", catDistr)
  console.log("countReceiver: ", countReceiver)
  console.log("dateDistrib: ", dateDistrib)
  console.log("imageDistrib: ", imageDistrib)
  console.log("selected: ", selected)
  

  const [countCol, setCountCol] = useState(6)
  const [countCol2, setCountCol2] = useState(6)
  const [countCol3, setCountCol3] = useState(6)

  const [countCol4, setCountCol4] = useState(6)
  const [countCol5, setCountCol5] = useState(6)
  const [countCol6, setCountCol6] = useState(6)

  const [timeold1, setTimeold1] = useState([false, false, false, false, false, false, false])
  const [timeold2, setTimeold2] = useState([false, false, false, false, false, false, false])
  const [timeold3, setTimeold3] = useState([false, false, false, false, false, false, false])

  const [timeold21, setTimeold21] = useState([false, false, false, false, false, false, false])
  const [timeold22, setTimeold22] = useState([false, false, false, false, false, false, false])
  const [timeold23, setTimeold23] = useState([false, false, false, false, false, false, false])

  const d = new Date();
  const month = String(d.getMonth()+1).padStart(2, "0");
	const day = String(d.getDate()).padStart(2, "0");
  const date_str = `${day}.${month}`;
  
  d.setDate(d.getDate() + 1);
  const month2 = String(d.getMonth()+1).padStart(2, "0");
	const day2 = String(d.getDate()).padStart(2, "0");
  const date_str2 = `${day2}.${month2}`;

  const year = d.getFullYear();


  const [dates, setDates] = useState([
    {date: date_str, time: '06:00', proj: '', save: false, go: false},
    {date: date_str, time: '07:00', proj: '', save: false, go: false},
    {date: date_str, time: '08:00', proj: '', save: false, go: false},
    {date: date_str, time: '09:00', proj: '', save: false, go: false},
    {date: date_str, time: '10:00', proj: '', save: false, go: false},
    {date: date_str, time: '11:00', proj: '', save: false, go: false},
  ])


  const [dates1, setDates1] = useState([
    {date: date_str, time: '12:00', proj: '', save: false, go: false},
    {date: date_str, time: '13:00', proj: '', save: false, go: false},
    {date: date_str, time: '14:00', proj: '', save: false, go: false},
    {date: date_str, time: '15:00', proj: '', save: false, go: false},
    {date: date_str, time: '16:00', proj: '', save: false, go: false},
    {date: date_str, time: '17:00', proj: '', save: false, go: false},
  ])

  const [dates11, setDates11] = useState([
    {date: date_str, time: '18:00', proj: '', save: false, go: false},
    {date: date_str, time: '19:00', proj: '', save: false, go: false},
    {date: date_str, time: '20:00', proj: '', save: false, go: false},
    {date: date_str, time: '21:00', proj: '', save: false, go: false},
    {date: date_str, time: '22:00', proj: '', save: false, go: false},
    {date: date_str, time: '23:00', proj: '', save: false, go: false},
  ])

//----------------------------------------------------------
const [dates2, setDates2] = useState([
  {date: date_str2, time: '06:00', proj: '', save: false, go: false},
  {date: date_str2, time: '07:00', proj: '', save: false, go: false},
  {date: date_str2, time: '08:00', proj: '', save: false, go: false},
  {date: date_str2, time: '09:00', proj: '', save: false, go: false},
  {date: date_str2, time: '10:00', proj: '', save: false, go: false},
  {date: date_str2, time: '11:00', proj: '', save: false, go: false},
])


const [dates22, setDates22] = useState([
  {date: date_str2, time: '12:00', proj: '', save: false, go: false},
  {date: date_str2, time: '13:00', proj: '', save: false, go: false},
  {date: date_str2, time: '14:00', proj: '', save: false, go: false},
  {date: date_str2, time: '15:00', proj: '', save: false, go: false},
  {date: date_str2, time: '16:00', proj: '', save: false, go: false},
  {date: date_str2, time: '17:00', proj: '', save: false, go: false},
])

const [dates222, setDates222] = useState([
  {date: date_str2, time: '18:00', proj: '', save: false, go: false},
  {date: date_str2, time: '19:00', proj: '', save: false, go: false},
  {date: date_str2, time: '20:00', proj: '', save: false, go: false},
  {date: date_str2, time: '21:00', proj: '', save: false, go: false},
  {date: date_str2, time: '22:00', proj: '', save: false, go: false},
  {date: date_str2, time: '23:00', proj: '', save: false, go: false},
])

//----------------------------------------------------------

  const [projectName, setProjectName] = useState('')
  const [projectView, setProjectView] = useState(false)
  const [value1, setValue1] = useState([false, false, false, false, false, false, false])
  const [value2, setValue2] = useState([false, false, false, false, false, false, false])
  const [value3, setValue3] = useState([false, false, false, false, false, false, false])

  //date2
  const [value21, setValue21] = useState([false, false, false, false, false, false, false])
  const [value22, setValue22] = useState([false, false, false, false, false, false, false])
  const [value23, setValue23] = useState([false, false, false, false, false, false, false])

  const [showLoader, setShowLoader] = useState(true)

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  let arr = []

  const navigate = useNavigate();
  const backPage = () => {
       navigate('/distributionw');
  } 

  useEffect(() => {
    const fetchData = async () => {
      let project = await getProjectId(projectId);
      console.log('Текущий проект: ', project.properties.Name.title[0]?.plain_text)
      setShowLoader(false)
      setProjectName(project.properties.Name.title[0]?.plain_text)

    }
      fetchData();
  },[])


  useEffect(() => {
    const fetchData = async () => {
      let plan = await getPlan(new Date().toLocaleDateString());
      console.log("plan: ", plan)

      let plan2 = await getPlan(`${day2}.${month2}.${year}`);
      console.log("plan2: ", plan2)
      
      //const d = new Date() //Текущая дата и время
      const chas = d.getHours();
      const min = String(d.getMinutes()).padStart(2, "0");
      console.log("time: " + chas + ":" + min)

      //открываем план
      if (plan !== null) {
        const planTimes = JSON.parse(plan.times)

        const ind1 = planTimes.findIndex(date => date.time === '12:00')
        const ind2 = planTimes.findIndex(date => date.time === '18:00')

        const times = planTimes.slice(0, ind1);
        const times2 = planTimes.slice(ind1, ind2);
        const times3 = planTimes.slice(ind2, planTimes.length); 

        times.map((time, index)=> {
          if (time.save) {
            value1[index] = true
            setValue1(value1)
          }
        })

        times2.map((time, index)=> {
          if (time.save) {
            value2[index] = true
            setValue2(value2)
          }
        })

        times3.map((time, index)=> {
          if (time.save) {
            value3[index] = true
            setValue3(value3)
          }
        })

        setDates(times)
        setDates1(times2)
        setDates11(times3)

        setCountCol(ind1)
        setCountCol2(ind2 - ind1)
        setCountCol3(planTimes.length - ind2) 
      }

      //2-й день
      if (plan2 !== null) {
        const planTimes2 = JSON.parse(plan2.times)

        const ind1 = planTimes2.findIndex(date => date.time === '12:00')
        const ind2 = planTimes2.findIndex(date => date.time === '18:00')

        const times = planTimes2.slice(0, ind1);
        const times2 = planTimes2.slice(ind1, ind2);
        const times3 = planTimes2.slice(ind2, planTimes2.length); 

        times.map((time, index)=> {
          if (time.save) {
            value21[index] = true
            setValue21(value21)
          }
        })

        times2.map((time, index)=> {
          if (time.save) {
            value22[index] = true
            setValue22(value22)
          }
        })

        times3.map((time, index)=> {
          if (time.save) {
            value23[index] = true
            setValue23(value23)
          }
        })

        setDates2(times)
        setDates22(times2)
        setDates222(times3)

        setCountCol4(ind1)
        setCountCol5(ind2 - ind1)
        setCountCol6(planTimes2.length - ind2) 

      }        

      //блокируем прошедшее время
      dates.map((time, index)=> {
        console.log("time: ", chas)
        if (time.time.split(":")[0] <= chas) {
          timeold1[index] = true
          setTimeold1(timeold1)
        }
      })

      dates1.map((time, index)=> {
        if (time.time.split(":")[0] <= chas ) {
          timeold2[index] = true
          setTimeold2(timeold2)
        }
      })

      dates11.map((time, index)=> {
        if (time.time.split(":")[0] <= chas) {
          timeold3[index] = true
          setTimeold3(timeold3)
        }
      })
        
    }
      fetchData();
  },[])

//поставить галочку Статус
  const changeStatus = (ind, tab) => {
    if (tab === 1) {
      if (dates[ind].save === true) {
        console.log('true')
        value1[ind] = false
        dates[ind].save = false
        dates[ind].proj = ''
      } else {
        console.log('false')
        value1[ind] = true
        dates[ind].proj = projectName //location.state.project
        dates[ind].save = true
      }

      //console.log('true')

      setDates(dates)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value2[ind]) {
        value2[ind] = false
        dates1[ind].proj = ''
        dates1[ind].save = false
      } else {
        value2[ind] = true
        dates1[ind].proj = projectName //location.state.project
        dates1[ind].save = true
      } 

      setDates1(dates1)
      setValue2(value2)
    }

    if (tab === 3) {
      if (value3[ind]) {
        value3[ind] = false
        dates11[ind].proj = ''
        dates11[ind].save = false
      } else {
        value3[ind] = true
        dates11[ind].proj = projectName //location.state.project
        dates11[ind].save = true
      } 

      setDates11(dates11)
      setValue3(value3)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }


  const changeStatus2 = (ind, tab) => {
    if (tab === 1) {
      if (dates2[ind].save === true) {
        value21[ind] = false
        dates2[ind].save = false
        dates2[ind].proj = ''
      } else {
        value21[ind] = true
        dates2[ind].proj = projectName //location.state.project
        dates2[ind].save = true
      }

      setDates2(dates2)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates22[ind].proj = ''
        dates22[ind].save = false
      } else {
        value22[ind] = true
        dates22[ind].proj = projectName //location.state.project
        dates22[ind].save = true
      } 

      setDates22(dates22)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates222[ind].proj = ''
        dates222[ind].save = false
      } else {
        value23[ind] = true
        dates222[ind].proj = projectName //location.state.project
        dates222[ind].save = true
      } 

      setDates222(dates222)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  // ---------------------------------------------------------------------

  {/* Показать Добавление времени */}
  const clickShowEditTime = (t, ind, tab) => {

    if (t === '06:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates[ind+1].time === '07:00') {
          setCountCol(countCol+1) //для высоту ячейки с датой
          arr = dates.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '06:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)

          //изменить чек
          arr.map((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)

        } else {
          if (dates[ind+1].proj === ''){
            setCountCol(countCol-1)
            arr = dates.slice(0); 
            arr.splice(ind+1, 1);
            setDates(arr)

            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)           
          }        
        }
      }
    }

    if (t === '07:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (tab === 1) {
          //обработка нажатия вкл/выкл
          if (dates[ind+1].time === '08:00') {
            setCountCol(countCol+1) //для высоту ячейки с датой
            arr = dates.slice(0); //копируем массив dates
            const newObj = {
              date: date_str,
              time: '07:30',
              proj: '',
              save: false
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)
                    
          } else {
            if (dates[ind+1].proj === ''){
              setCountCol(countCol-1)
              arr = dates.slice(0); 
              arr.splice(ind+1, 1);
              setDates(arr)
  
              //изменить чек
              arr.map((item, index)=> {
                value1[index] = item.save
              })
              setValue1(value1)           
            }        
          }
        }
      }
    }


    if (t === '08:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (tab === 1) {
          //обработка нажатия вкл/выкл
          if (dates[ind+1].time === '09:00') {
            setCountCol(countCol+1) //для высоту ячейки с датой
            arr = dates.slice(0); //копируем массив dates
            const newObj = {
              date: date_str,
              time: '08:30',
              proj: '',
              save: false
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)
                    
          } else {
            if (dates[ind+1].proj === ''){
              setCountCol(countCol-1)
              arr = dates.slice(0); 
              arr.splice(ind+1, 1);
              setDates(arr)
  
              //изменить чек
              arr.map((item, index)=> {
                value1[index] = item.save
              })
              setValue1(value1)           
            }        
          }
        }
      }
    }

    if (t === '09:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (tab === 1) {
          //обработка нажатия вкл/выкл
          if (dates[ind+1].time === '10:00') {
            setCountCol(countCol+1) //для высоту ячейки с датой
            arr = dates.slice(0); //копируем массив dates
            const newObj = {
              date: date_str,
              time: '09:30',
              proj: '',
              save: false
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)
                    
          } else {
            if (dates[ind+1].proj === ''){
              setCountCol(countCol-1)
              arr = dates.slice(0); 
              arr.splice(ind+1, 1);
              setDates(arr)
  
              //изменить чек
              arr.map((item, index)=> {
                value1[index] = item.save
              })
              setValue1(value1)           
            }        
          }
        }
      }
    }

    if (t === '10:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (tab === 1) {
          //обработка нажатия вкл/выкл
          if (dates[ind+1].time === '11:00') {
            setCountCol(countCol+1) //для высоту ячейки с датой
            arr = dates.slice(0); //копируем массив dates
            const newObj = {
              date: date_str,
              time: '10:30',
              proj: '',
              save: false
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)
                    
          } else {
            if (dates[ind+1].proj === ''){
              setCountCol(countCol-1)
              arr = dates.slice(0); 
              arr.splice(ind+1, 1);
              setDates(arr)
  
              //изменить чек
              arr.map((item, index)=> {
                value1[index] = item.save
              })
              setValue1(value1)           
            }        
          }
        }
      }
    }

    if (t === '11:00')  {
      if (tab === 1) {
        //обработка нажатия вкл/выкл
          if (dates[ind+1]?.time !== '11:30') {
            setCountCol(countCol+1) //для высоту ячейки с датой
            arr = dates.slice(0); //копируем массив dates
            console.log(arr)
            const newObj = {
              date: date_str,
              time: '11:30',
              proj: '',
              save: false
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)          
          } 
          
          if (dates[ind+1]?.time === '11:30') {
            if (dates[ind+1].proj === ''){
              setCountCol(countCol-1)
              arr = dates.slice(0); 
              arr.splice(ind+1, 1);
              setDates(arr)
    
              //изменить чек
              arr.map((item, index)=> {
                value1[index] = item.save
              })
              setValue1(value1)           
            }        
          }
      }
    }

    //12:00 - 17:00

    if (t === '12:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1].time === '13:00') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '12:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)

        } else {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)

            //изменить чек
            arr.map((item, index)=> {
              value2[index] = item.save
            })
            setValue2(value2)           
          }        
        }
      }
    }

    if (t === '13:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1].time === '14:00') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '13:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)

        } else {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)

            //изменить чек
            arr.map((item, index)=> {
              value1[index] = item.save
            })
            setValue1(value1)           
          }        
        }
      }
    }

    if (t === '14:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1].time === '15:00') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '14:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)

        } else {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)

            //изменить чек
            arr.map((item, index)=> {
              value2[index] = item.save
            })
            setValue2(value2)           
          }        
        }
      }
    }

    if (t === '15:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1].time === '16:00') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '15:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)

        } else {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)

            //изменить чек
            arr.map((item, index)=> {
              value2[index] = item.save
            })
            setValue2(value2)           
          }        
        }
      }
    }

    if (t === '16:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1].time === '17:00') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '16:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)

        } else {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)

            //изменить чек
            arr.map((item, index)=> {
              value2[index] = item.save
            })
            setValue2(value2)           
          }        
        }
      }
    }

    if (t === '17:00')  {
      if (tab === 2) {
        //обработка нажатия вкл/выкл
        if (dates1[ind+1]?.time !== '17:30') {
          setCountCol2(countCol2+1) //для высоту ячейки с датой
          arr = dates1.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str,
            time: '17:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.map((item, index)=> {
            value2[index] = item.save
          })
          setValue2(value2)          
        } 
        
        if (dates1[ind+1]?.time === '17:30') {
          if (dates1[ind+1].proj === ''){
            setCountCol2(countCol2-1)
            arr = dates1.slice(0); 
            arr.splice(ind+1, 1);
            setDates1(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value2[index] = item.save
            })
            setValue2(value2)           
          }        
        }
      }
    }

//---------------18:00 - 23:00----------------------

    if (t === '18:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1].time === '19:00') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '18:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)

        } else {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)

            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }
    
    if (t === '19:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1].time === '20:00') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '19:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)

        } else {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)

            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }
    
    if (t === '20:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1].time === '21:00') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '20:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)

        } else {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)

            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }
    
    if (t === '21:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1].time === '22:00') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '21:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)

        } else {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)

            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }
    
    if (t === '22:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1].time === '23:00') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          const newObj = {
            date: date_str,
            time: '22:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)

        } else {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)

            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }
    
    if (t === '23:00')  {
      if (tab === 3) {
        //обработка нажатия вкл/выкл
        if (dates11[ind+1]?.time !== '23:30') {
          setCountCol3(countCol3+1) //для высоту ячейки с датой
          arr = dates11.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str,
            time: '23:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.map((item, index)=> {
            value3[index] = item.save
          })
          setValue3(value3)          
        } 
        
        if (dates11[ind+1]?.time === '23:30') {
          if (dates11[ind+1].proj === ''){
            setCountCol3(countCol3-1)
            arr = dates11.slice(0); 
            arr.splice(ind+1, 1);
            setDates11(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }

  }

//-----------------table 2-----------------------------------------------------------------------------
const clickShowEditTime2 = (t, ind, tab) => {

  if (t === '06:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (dates2[ind+1].time === '07:00') {
        setCountCol4(countCol4+1) //для высоту ячейки с датой
        arr = dates2.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '06:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.map((item, index)=> {
          value21[index] = item.save
        })
        setValue21(value21)

      } else {
        if (dates2[ind+1].proj === ''){
          setCountCol4(countCol4-1)
          arr = dates2.slice(0); 
          arr.splice(ind+1, 1);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value21[index] = item.save
          })
          setValue21(value21)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates2[ind+1].time === '08:00') {
          setCountCol4(countCol4+1) //для высоту ячейки с датой
          arr = dates2.slice(0); //копируем массив dates
          const newObj = {
            date: date_str2,
            time: '07:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value21[index] = item.save
          })
          setValue21(value21)
                  
        } else {
          if (dates2[ind+1].proj === ''){
            setCountCol4(countCol4-1)
            arr = dates2.slice(0); 
            arr.splice(ind+1, 1);
            setDates2(arr)

            //изменить чек
            arr.map((item, index)=> {
              value21[index] = item.save
            })
            setValue21(value21)           
          }        
        }
      }
    }
  }


  if (t === '08:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates2[ind+1].time === '09:00') {
          setCountCol4(countCol4+1) //для высоту ячейки с датой
          arr = dates2.slice(0); //копируем массив dates
          const newObj = {
            date: date_str2,
            time: '08:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value21[index] = item.save
          })
          setValue21(value21)                 
        } else {
          if (dates2[ind+1].proj === ''){
            setCountCol4(countCol4-1)
            arr = dates2.slice(0); 
            arr.splice(ind+1, 1);
            setDates2(arr)

            //изменить чек
            arr.map((item, index)=> {
              value21[index] = item.save
            })
            setValue21(value21)           
          }        
        }
      }
    }
  }

  if (t === '09:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates2[ind+1].time === '10:00') {
          setCountCol4(countCol4+1) //для высоту ячейки с датой
          arr = dates2.slice(0); //копируем массив dates
          const newObj = {
            date: date_str2,
            time: '09:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)
                  
        } else {
          if (dates2[ind+1].proj === ''){
            setCountCol4(countCol4-1)
            arr = dates2.slice(0); 
            arr.splice(ind+1, 1);
            setDates2(arr)

            //изменить чек
            arr.map((item, index)=> {
              value21[index] = item.save
            })
            setValue21(value21)           
          }        
        }
      }
    }
  }

  if (t === '10:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates2[ind+1].time === '11:00') {
          setCountCol4(countCol4+1) //для высоту ячейки с датой
          arr = dates2.slice(0); //копируем массив dates
          const newObj = {
            date: date_str2,
            time: '10:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value21[index] = item.save
          })
          setValue21(value21)                 
        } else {
          if (dates2[ind+1].proj === ''){
            setCountCol4(countCol4-1)
            arr = dates2.slice(0); 
            arr.splice(ind+1, 1);
            setDates2(arr)

            //изменить чек
            arr.map((item, index)=> {
              value21[index] = item.save
            })
            setValue21(value21)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates2[ind+1]?.time !== '11:30') {
          setCountCol4(countCol4+1) //для высоту ячейки с датой
          arr = dates2.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str2,
            time: '11:30',
            proj: '',
            save: false
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.map((item, index)=> {
            value21[index] = item.save
          })
          setValue21(value21)          
        } 
        
        if (dates2[ind+1]?.time === '11:30') {
          if (dates2[ind+1].proj === ''){
            setCountCol4(countCol4-1)
            arr = dates2.slice(0); 
            arr.splice(ind+1, 1);
            setDates2(arr)
  
            //изменить чек
            arr.map((item, index)=> {
              value21[index] = item.save
            })
            setValue21(value21)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1].time === '13:00') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '12:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

  if (t === '13:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1].time === '14:00') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '13:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

  if (t === '14:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1].time === '15:00') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '14:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

  if (t === '15:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1].time === '16:00') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '15:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

  if (t === '16:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1].time === '17:00') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '16:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

  if (t === '17:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates22[ind+1]?.time !== '17:30') {
        setCountCol5(countCol5+1) //для высоту ячейки с датой
        arr = dates22.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str2,
          time: '17:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.map((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)          
      } 
      
      if (dates22[ind+1]?.time === '17:30') {
        if (dates22[ind+1].proj === ''){
          setCountCol5(countCol5-1)
          arr = dates22.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.map((item, index)=> {
            value22[index] = item.save
          })
          setValue22(value22)           
        }        
      }
    }
  }

//---------------18:00 - 23:00----------------------

  if (t === '18:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1].time === '19:00') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '18:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)

      } else {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1].time === '20:00') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '19:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)

      } else {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1].time === '21:00') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '20:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)

      } else {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1].time === '22:00') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '21:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)

      } else {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1].time === '23:00') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        const newObj = {
          date: date_str2,
          time: '22:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)

      } else {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates222[ind+1]?.time !== '23:30') {
        setCountCol6(countCol6+1) //для высоту ячейки с датой
        arr = dates222.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str2,
          time: '23:30',
          proj: '',
          save: false
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.map((item, index)=> {
          value23[index] = item.save
        })
        setValue23(value23)          
      } 
      
      if (dates222[ind+1]?.time === '23:30') {
        if (dates222[ind+1].proj === ''){
          setCountCol6(countCol6-1)
          arr = dates222.slice(0); 
          arr.splice(ind+1, 1);
          setDates222(arr)

          //изменить чек
          arr.map((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}


  const exampleToast = (
    <CToast autohide={false} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Планирование успешно сохранено!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const savePlan = async() => {
    addToast(exampleToast) //ваш план сохранен

    console.log("категории: ", catDistr)
    console.log("текст: ", textDistr)
    console.log("постер: ", imageDistrib)
    console.log("получатели: ", selected)

    const d_str = new Date()
    const d_str2 = new Date() 
    d_str2.setDate(d_str2.getDate() + 1)

    //удалить предыдущие записи запланированных рассылок
    const obj = {
      id: projectId, 
      date: d_str
    }
    console.log("obj: ", obj)
    await delDistributionWPlan(obj)

    const newArray = [].concat(dates, dates1, dates11);
    const planer_str = JSON.stringify(newArray)

    const newArray2 = [].concat(dates2, dates22, dates222);
    const planer_str2 = JSON.stringify(newArray2)

    //1-й день
    const newObj = {
      "datestart": d_str.toLocaleDateString(),
      "times": planer_str
    }
    await newPlan(newObj);

    //2-й день
    const newObj2 = {
      "datestart": d_str2.toLocaleDateString(),
      "times": planer_str2
    }
    await newPlan(newObj2);

    let str_cats = catDistr.map(item => item).join(',')
    console.log("Plan Category: ", str_cats)

    const d = new Date();
    const year = d.getFullYear();

    //массив дат 1-го дня
    newArray.forEach(async (item)=> {
      if (item.save === true && item.proj === projectName && item.go === false) {
        console.log("Дата старта: ", `${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`)
        
        //новая рассылка
        const message = {
          //name: 'Рассылка', 
          text: textDistr, 
          image: imageDistrib ? imageDistrib : '', 
          project: `${item.date} | ${projectName}`, 
          projectId: projectId, 
          receivers: str_cats, 
          datestart: Date.parse(`${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`), 
          delivered: 'false',  
          count: countReceiver,
          date: `${day}.${month}.${year}`,    
        }
        //сохранение рассылки в базе данных
        const dataDistrib = await newDistributionW(message) 

        const d1 = Date.parse(`${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`);
        const d2 = new Date().getTime() //- 10800000
        //console.log()
        
        const date1 = new Date(d1)
        const dateNow = new Date(d2)
        console.log("date1: ", date1)
        console.log("dateNow: ", dateNow)
        
        const milliseconds = Math.floor((date1 - dateNow));       
        console.log("milliseconds: ", milliseconds)

        if (milliseconds > 0) {
          //запланировать отправку рассылок
          setTimeout(() => {
            selected.map(async (user, index) => {
              console.log("Пользователю ID: " + user + " сообщение " + textDistr + " отправлено! Кнопка " + textButton + " отправлена!")
      
              //let client = clients.filter((client) => client.chatId === user)[0];
      
              //получить id специалиста по его telegramId
              const worker = await getWorkerId(user)
              
              //новый претендент
              const pretendent = {
                projectId: projectId, 
                workerId: worker.data, 
                receiverId: user,        
              }
              const pretendentId = await newPretendent(pretendent)
              
              //Передаем данные боту
              const keyboard = JSON.stringify({
                inline_keyboard: [
                    [
                        {"text": textButton, callback_data:'/report'},
                    ],
                ]
              });
      
              const keyboard2 = JSON.stringify({
                inline_keyboard: [
                    [
                        {"text": 'Принять', callback_data:'/accept ' + pretendentId.id},
                        {"text": 'Отклонить', callback_data:'/cancel'},
                    ],
                ]
              });
      
              //отправить в телеграмм
              let sendToTelegram
              if (textDistr !== '') {
                const url_send_msg = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${user}&parse_mode=html&text=${textDistr.replace(/\n/g, '%0A')}`
                //console.log("url_send_msg: ", url_send_msg)
                
                //sendToTelegram = await $host.get(url_send_msg);

                // const objDelivered = {
                //   delivered: true
                // }

                ////обновить рассылке статус отправки
                //await editDistributionW(objDelivered, dataDistrib.id)
              }  
      
              const url_send_photo = `https://api.telegram.org/bot${token}/sendPhoto?chat_id=${user}&reply_markup=${showEditButtonAdd ? keyboard : keyboard2}`
              //console.log("url_send_photo: ", url_send_photo)
              
              let sendPhotoToTelegram
              // if (file) {
              //   const form = new FormData();
              //   form.append("photo", file);
      
              //   sendPhotoToTelegram = await $host.post(url_send_photo, form);
              //   console.log('sendPhotoToTelegram: ', sendPhotoToTelegram)
              // }

              //обновить список рассылок
              addNewDistrib(true)
            }) 
          }, milliseconds);
        }
      }    
    })

    //массив дат 2-го дня
    newArray2.forEach(async (item)=> {
      if (item.save === true && item.proj === projectName && item.go === false) {
        //новая рассылка
        const message = {
          //name: 'Рассылка', 
          text: textDistr, 
          image: imageDistrib ? imageDistrib : '', 
          project: `${item.date} | ${projectName}`, 
          projectId: projectId, 
          receivers: str_cats, 
          datestart: Date.parse(`${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`), 
          delivered: 'false',  
          count: countReceiver,
          date: `${day2}.${month2}.${year}`,    
        }
        //сохранение рассылки в базе данных
        const dataDistrib2 = await newDistributionW(message)
      }
    })

    //обновить список рассылок
    addNewDistrib(true)


    setTimeout(() => backPage(), 1000);
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

                            <p style={{color: '#fff'}}>Текущий проект: &laquo;{projectName}&raquo;</p>
                            {
                              showLoader ? <div style={{textAlign:'center'}}><CSpinner/></div>
                              :
                              <>
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
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value1[index]}
                                              onChange={()=>changeStatus(index, 1)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold1[index])  ? '' : 'disabled'}
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
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value2[index]}
                                              onChange={()=>changeStatus(index, 2)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold2[index])  ? '' : 'disabled'}
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
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value3[index]}
                                              onChange={()=>changeStatus(index, 3)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold3[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>

<br/>


                              <CRow>
{/* -----------------------------06:00----------------------------------------------------------------------------------- */}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol4}px`}} >
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
                                              <div onClick={()=>clickShowEditTime2(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus2(index, 1)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol5}px`}} >
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
                                    {dates22.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime2(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus2(index, 2)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol6}px`}} >
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
                                    {dates222.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime2(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus2(index, 3)}
                                              disabled={((projectName === item.proj || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
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
                                {/* <CButton onClick={() => addToast(exampleToast)}>Send a toast</CButton> */}
                                <CToaster ref={toaster} push={toast} placement="top-end" />  
                              </div>
                            </div>
                             </>  
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
