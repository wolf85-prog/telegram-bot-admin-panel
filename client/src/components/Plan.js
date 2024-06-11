import React, {useState} from 'react';
// import cl from './Select.module.css'

import { 
    CTable, 
    CTableRow, 
    CTableHead,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CCol,
    CRow,
    CFormCheck,
  } from '@coreui/react'

const Plan = ({uuidDistrib, needDate}) => {

  let arr = []

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


    const d = new Date(needDate)
    const month = String(d.getMonth()+1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const date_str = `${day}.${month}`;
  
    const year = d.getFullYear();

    const [dates, setDates] = useState([
        {date: date_str, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
    ])

    const [dates1, setDates1] = useState([
        {date: date_str, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
    ])
    
    const [dates11, setDates11] = useState([
        {date: date_str, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
        {date: date_str, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
    ])

    const [projectName, setProjectName] = useState('')
    const [projectView, setProjectView] = useState(false)
    const [value1, setValue1] = useState([false, false, false, false, false, false, false])
    const [value2, setValue2] = useState([false, false, false, false, false, false, false])
    const [value3, setValue3] = useState([false, false, false, false, false, false, false])

    //поставить галочку Статус
  const changeStatus = (ind, tab) => {
    if (tab === 1) {
      if (dates[ind].save === true) {
        console.log('true')
        value1[ind] = false
        dates[ind].save = false
        dates[ind].proj = ''
        dates[ind].uuid = ''
      } else {
        console.log('false')
        value1[ind] = true
        dates[ind].proj = projectName //location.state.project
        dates[ind].uuid = uuidDistrib
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
        dates1[ind].uuid = ''
        dates1[ind].save = false
      } else {
        value2[ind] = true
        dates1[ind].proj = projectName //location.state.project
        dates1[ind].uuid = uuidDistrib
        dates1[ind].save = true
      } 

      setDates1(dates1)
      setValue2(value2)
    }

    if (tab === 3) {
      if (value3[ind]) {
        value3[ind] = false
        dates11[ind].proj = ''
        dates11[ind].uuid = ''
        dates11[ind].save = false
      } else {
        value3[ind] = true
        dates11[ind].proj = projectName //location.state.project
        dates11[ind].uuid = uuidDistrib
        dates11[ind].save = true
      } 

      setDates11(dates11)
      setValue3(value3)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

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
            uuid: '',
            save: false, 
            go: false, 
          }
          arr.splice(ind+1, 0, newObj);
          setDates(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
              uuid: '',
              save: false, 
              go: false, 
              
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
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
              arr.forEach((item, index)=> {
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
              uuid: '',
              save: false, 
              go: false, 
              
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
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
              arr.forEach((item, index)=> {
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
              uuid: '',
              save: false, 
              go: false, 
              
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
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
              arr.forEach((item, index)=> {
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
              uuid: '',
              save: false, 
              go: false, 
              
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
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
              arr.forEach((item, index)=> {
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
              uuid: '',
              save: false, 
              go: false, 
              
            }
            arr.splice(ind+1, 0, newObj);
            setDates(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
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
              arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates1(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates11(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
              value3[index] = item.save
            })
            setValue3(value3)           
          }        
        }
      }
    }

  }

    return (
      <>
        <br/>
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
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold1[index])  ? '' : 'disabled'}
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
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates1.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            {/* <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div> */}
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value2[index]}
                                              onChange={()=>changeStatus(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold2[index])  ? '' : 'disabled'}
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
                                        <CTableHeaderCell className="text-center">Время</CTableHeaderCell>
                                        <CTableHeaderCell className="text-center">Проект</CTableHeaderCell>   
                                        <CTableHeaderCell className="text-center">Статус</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                    {dates11.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>   
                                          <CTableDataCell className="text-center" style={{width: '50px'}} >
                                            {/* <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                              <div onClick={()=>clickShowEditTime(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div> */}
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value3[index]}
                                              onChange={()=>changeStatus(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold3[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                </div>                 
            </CCol>                        
        </CRow>
      </>
    );
};

export default Plan;