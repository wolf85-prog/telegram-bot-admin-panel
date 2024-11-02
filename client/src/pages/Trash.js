import React, { Suspense, useState, useEffect } from 'react'
import { CContainer, CSpinner, CCard, CCardBody, CTable, CTableDataCell, CTableRow, CTableHeaderCell, CTableBody, CTableHead } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useUsersContext } from "../chat-app-new/context/usersContext";

import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from "react-datepicker";
import Dropdown from 'react-bootstrap/Dropdown';
import InputMask from 'react-input-mask';

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown4 from 'src/components/Dropdown4/Dropdown4';
import MyDropdown5 from 'src/components/Dropdown5/Dropdown5';
import MyDropdown6 from 'src/components/Dropdown6/Dropdown6';

import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'
import threeDots from 'src/assets/images/three-dots.svg'

import btnBlue from 'src/assets/images/button_blue.png'
import btnRed from 'src/assets/images/button_red.png'
import btnGreen from 'src/assets/images/button_green.jpg'
import btnYellow from 'src/assets/images/button_yellow.jpg'

import statusData from 'src/data/statusData';
import cities from 'src/data/cities';
import specifikaData from 'src/data/specifikaData';
import vids from 'src/data/vids';
import comtegs from 'src/data/comtegs';
import specOnlyData2 from 'src/data/specOnlyData2';

import { getProjectsDel, getProjectId, editProject } from '../http/projectAPI'
import Filters from 'src/components/table/Filters'

const Trash = () => {
  const { companysAll, managersAll, workersAll } = useUsersContext();

  const [projects, setProjects] = useState([])
  const [showProject, setShowProject] = useState(false)

  const [id, setId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('00:00')
  const [city, setCity] = useState('');
  const [statusProject, setStatusProject] = useState({name: '', color: ''});
  const [specifikaProject, setSpecifikaProject] = useState({name: '', color: ''});
  const [vidProject, setVidProject] = useState({name: '', color: ''});
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companysData, setCompanysData] = useState([]);

  const [managerName, setManagerName] = useState('');
  const [managerName2, setManagerName2] = useState('');

  const [managersData, setManagersData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [specialistName, setSpecialistName] = useState('');


  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');

  const [teh1, setTeh1] = useState('');
  const [teh2, setTeh2] = useState('');
  const [teh3, setTeh3] = useState('');
  const [teh4, setTeh4] = useState('');
  const [teh5, setTeh5] = useState('');
  const [teh6, setTeh6] = useState('');
  const [teh7, setTeh7] = useState('');
  const [teh8, setTeh8] = useState('');
  const [tehText, setTehText] = useState('');
  const [address, setAddress] = useState('');
  const [geo, setGeo] = useState('');
  const [comment, setComment] = useState('');

  const [playPoster, setPlayPoster] = useState(false)

  const [height, setHeight] = useState(600)

  useEffect(()=> {
    //1
    const fetchData = async() => {
      const projs = await getProjectsDel()
      console.log("projsDel: ", projs)

      // const sortProj = [...projs].sort((a, b) => {  
      //   if (a.dateStart < b.dateStart)
      //     return -1;
      //   if (a.dateStart > b.dateStart)
      //       return 1;
      //   return 0;
      // })

      setProjects(projs)
    }

    fetchData()
    
}, [])

const openProject = async(id) => {

  console.log("id: ", id)

  const resProj = await getProjectId(id)
  console.log("resProj: ", resProj)

  setShowProject(true)

  setStatusProject({name: resProj.status, color: statusData.find((stat)=> stat.label === resProj.status)?.color})
  setSpecifikaProject({name: resProj.specifika, color: specifikaData.find((stat)=> stat.label === resProj.specifika)?.color})

  setId(id)
  setProjectName(resProj.name)
  setStartDate(resProj ? resProj.dateStart : new Date().toISOString())
  setEndDate(resProj.dateEnd)
  //setStartTime(timeStart) 
  //setEndTime(end?.split('T')[1]?.slice(0, 5))

  const compTitle = companysAll.find(item=> item.id.toString() === resProj.companyId)
  setCompanyName(compTitle?.title)

  const managerFio = managersAll.find(item=> item.id.toString() === resProj.managerId)
  setManagerName(managerFio?.fio)

  const managerFio2 = managersAll.find(item=> item.id.toString() === resProj.managerId2)
  setManagerName2(managerFio2?.fio)

  setCity(resProj.city)
  setComment(resProj.comment) 

  setTehText(resProj.teh)
  setTeh1(resProj.teh1)
  setTeh2(resProj.teh2)
  setTeh3(resProj.teh3)
  setTeh4(resProj.teh4)
  setTeh5(resProj.teh5)
  setTeh6(resProj.teh6)
  setTeh7(resProj.teh7)
  setTeh8(resProj.teh8)

  // setStavka({label: "№1", name: "№1"})
  // setShowMainTable(true)
  // setShowPretendentTable(true)

  setTimeout(()=> {
    setHeight(509)
  }, 200)
  
}

const recoveryProject = async() => {
  const data = {
    deleted: null
  }
  //сохранить изменения в базе
  const resSave = await editProject(data, id)

  setProjects([...projects].filter(item=>item.id !== id))

  setShowProject(false)
}


const closeProfile = () => {
  setShowProject(false)
}

const onChangeCompany = (e) => {
  setCompanyName(e.target.value)     
}

const onChangeManager = (e, index) => {
  console.log(e.target.value, index)  
}

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Корзина</h2> */}
                    <CCard className="mb-4">
                      <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                        Всего: {projects.length}
                      </p>
                      <CCardBody style={{padding: '12px'}}>
                        {!showProject ? <Filters /> : '' }
                        {!showProject ? <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1300px', borderRadius: '5px' }}>
                          <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '30px'}}>№</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '30px'}}>Дата</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{width: '30px'}}>ID</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '250px'}}>Проект</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>Город</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специфика</CTableHeaderCell>                      
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>      
                                <CTableBody> 
                                { projects.map((item, index)=> (
                                    <CTableRow key={item.id} v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                      <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                        {index+1}                        
                                      </CTableDataCell> 
                                      <CTableDataCell className="text-center" style={{position: 'relative', width: '100px'}}>
                                        {new Date(item.dateStart)?.toLocaleString().split(',')[0]}                        
                                      </CTableDataCell> 
                                      <CTableDataCell className="text-center">
                                        {item.id} 
                                      </CTableDataCell>
                                      <CTableDataCell onClick={()=>openProject(item.id)} className="text-center" style={{cursor: 'pointer'}}>
                                        {item.name && item.name.length > 25 ? item.name.substr(0, 25) + '...' : item.name}   
                                      </CTableDataCell>     
                                      <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                       {item.city}
                                      </CTableDataCell>
                                      <CTableDataCell className="text-center widthSpace">
                                        {item.specifika}
                                      </CTableDataCell>   
                                      <CTableDataCell className="text-center">
                                        {item.comment && item.comment.length > 25 ? item.comment.substr(0, 25) + '...' : item.comment}
                                      </CTableDataCell>            
                                    </CTableRow>
                                  ))
                                } 
                                </CTableBody>                   
                        </CTable> 
                        :
                                    <div style={{position: 'relative', height: '494px', display: 'flex', flexDirection: 'row', marginTop: '35px'}}>
                                              <div style={{position: 'absolute', top: '-34px', left: '0px'}}>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" name="projectId" id="projectId" value={id} style={{width: '120px', marginRight: '25px'}}/>
                                                </div>
                                              </div>
                                              
                                              <div style={{position: 'absolute', top: '-25px', right: '4px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'flex-end', width: '-webkit-fill-available'}}>   
                                                <div style={{display: 'flex'}}>
                                                  <img src={Disketa} onClick={recoveryProject} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={zamok}  style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Disketa} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Close} onClick={closeProfile} style={{ cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                                </div>
                                              </div>
                                          {/* 1 */}                               
                                          <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginTop: '8px', marginRight: '40px'}}>
                                            
                                              <label className='title-label'></label>
                                              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
                                                <div className="text-field">
                                                  {/*<input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg" id="dateReg" style={{width: '120px'}}/>*/}
                                                  <DatePicker
                                                    className="uley-datepicker-control text-center text-field__input"
                                                    style={{ height: '40px', width: '120px'}}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    selectsStart
                                                    //startDate={startDate}
                                                    dateFormat="dd.MM.yyyy"
                                                  />
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={false} className="text-field__input" type="text" value={startTime} onChange={(e)=>setStartTime(e.target.value)} name="dateReg2" id="dateReg2" style={{width: '90px',}}/>
                                                </div>
                                              </div>

                                              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
                                                <div className="text-field">
                                                  {/* <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg3" id="dateReg3" style={{width: '120px'}}/> */}
                                                  <DatePicker
                                                    className="uley-datepicker-control text-center text-field__input"
                                                    style={{ height: '40px', width: '120px'}}
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    selectsStart
                                                    //endDate={endDate}
                                                    dateFormat="dd.MM.yyyy"
                                                  />
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={false} className="text-field__input" type="text" value={endTime} onChange={(e)=>setEndTime(e.target.value)} name="dateReg4" id="dateReg4" style={{width: '90px'}}/>
                                                </div>
                                              </div>

                                              <label className='title-label'>Статус</label>
                                              <div className="text-field">
                                                <MyDropdown4
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={statusData}
                                                  selected={statusProject}
                                                  setSelected={setStatusProject}
                                                  // onChange={addCity}
                                                />
                                                {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                                              </div>

                                              
                                              <label className='title-label'>Специфика</label>
                                              <div className="text-field">
                                                <MyDropdown4
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={specifikaData}
                                                  selected={specifikaProject}
                                                  setSelected={setSpecifikaProject}
                                                  placeholder='Выбери специфику'
                                                  // onChange={addCity}
                                                />
                                                {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                                              </div>

                                              <label className='title-label'>Комментарии</label>
                                              <div className="text-field" style={{marginBottom: '0px'}}>
                                                <textarea 
                                                  className="text-field__input" 
                                                  type="text" 
                                                  name="comment" 
                                                  id="comment"
                                                  style={{resize: 'none', width: '230px', height: '80px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginRight: '40px'}}
                                                  value={comment}
                                                  onChange={(e)=>setComment(e.target.value)}
                                                />
                                              </div> 
                                        </div>

                                        {/* 2 */}   
                                        <div style={{textAlign: 'center', marginTop: '10px', width: '320px', marginRight: '40px'}}>
                                          <label className='title-label'>Проект</label>
                                          <div className="text-field">
                                            <input disabled={false} className="text-field__input" type="text" name="projectName" id="projectName" value={projectName} onChange={(e)=>setProjectName(e.target.value)} style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Компания</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                    width: '100%',
                                                    border: 'none',
                                                    height: '40px',
                                                    padding: '5px 4px',
                                                    fontFamily: 'inherit',
                                                    fontSize: '14px',
                                                    fontWeight: '700',
                                                    lineHeight: '1.5',
                                                    textAlign: 'center',
                                                    color: '#ffffff',
                                                    backgroundColor: 'transparent',
                                                  }
                                              }}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={companysData}
                                              style={{width: '100%', padding: '0'}}
                                              onInputChange={(e)=>onChangeCompany(e)}
                                              //onInputChange={(e)=>console.log(e.target.value)}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onChange={(event, newValue) => {
                                                  if (newValue && newValue.length) {
                                                      
                                                      const comp = companysAll.find(item=> item.title === newValue)
                                                      console.log("comp: ", comp)
                                                      if (comp) {
                                                        setCompanyName(comp.title)
                                                        setCompany(comp.id)
                                                        setPhone()
                                                        // setInn(comp.inn) 
                                                        // setSklad(comp.sklad)
                                                        // setOffice(comp.office)
                                                      }
                                                  }  
                                              }}
                                              value={companyName}
                                              inputValue={companyName}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <input 
                                                      className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder=''
                                                  />
                                              </div>
                                              )}
                                            />
                                          </div>

                                          <label className='title-label'>Город</label>
                                          <div className="text-field">
                                            <MyDropdown
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={cities}
                                                  selected={city}
                                                  setSelected={setCity}
                                                  // onChange={addCity}
                                                />
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                          </div>

                                          <label className='title-label'>Локация</label>
                                          <div className="text-field">
                                            <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/>
                                          </div>

                                          <label className='title-label'>Адрес</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input" 
                                              type="text" 
                                              name="comment" 
                                              id="comment"
                                              style={{resize: 'none', width: '320px', height: '80px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                            />
                                          </div> 
                                        </div>

                                        {/* 3 */}   
                                        <div style={{textAlign: 'center', marginTop: '10px', width: '320px', marginRight: '40px'}}>
                                          <label className='title-label'>Менеджер</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '700',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                  }
                                              }}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={managersData}
                                              style={{width: '100%', padding: '0'}}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>onChangeManager(e)}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  const comp = managersAll.find(item=> item.fio === newValue)
                                                  console.log("comp: ", comp)
                                                  if (comp) {
                                                    setPhone(comp.phone)
                                                    setManagerName(comp.fio)
                                                  }
                                                } 
                                              }}
                                              value={managerName} 
                                              inputValue={managerName}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <input 
                                                      className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder='ФИО'
                                                  />
                                              </div>
                                              )}
                                            />
                                          </div>

                                          <label className='title-label'>Старший</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '700',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                  }
                                              }}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={managersData}
                                              style={{width: '100%', padding: '0'}}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>onChangeManager(e)}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  const comp = managersAll.find(item=> item.fio === newValue)
                                                  console.log("comp: ", comp)
                                                  if (comp) {
                                                    setPhone2(comp.phone)
                                                    setManagerName2(comp.fio)
                                                  }
                                                }  
                                              }}
                                              value={managerName2} 
                                              inputValue={managerName2}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <input 
                                                      className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder='ФИО'
                                                  />
                                              </div>
                                              )}
                                            />
                                          </div>

                                          <label className='title-label'>Техническое Задание</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input" 
                                              type="text" 
                                              name="comment" 
                                              id="comment"
                                              value={tehText}
                                              onChange={(e)=>setTehText(e.target.value)}
                                              style={{resize: 'none', width: '320px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                                            />
                                          </div> 

                                          <label className='title-label' style={{marginTop: '44px', position: 'absolute', top: '300px', right: '240px'}}>Техническое Задание</label>

                                          <div  style={{display: 'flex', flexDirection: 'row', marginTop: '45px'}}>
                                            <div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh1" id="teh1" value={teh1} onChange={(e)=>setTeh1(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh2" id="teh2" value={teh2} onChange={(e)=>setTeh2(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh3" id="teh3" value={teh3} onChange={(e)=>setTeh3(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh4" id="teh4" value={teh4} onChange={(e)=>setTeh4(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* 4 */}   
                                        <div style={{textAlign: 'center', marginTop: '10px', width: '230px',marginRight: '10px'}}>
                                          <label className='title-label'>Телефон</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                                            <InputMask
                                                className="text-field__input" 
                                                style={{width: '230px', marginRight: '10px'}}
                                                type="text" 
                                                name="phone" 
                                                id="phone"
                                                mask="+7 (999) 999-99-99"
                                                disabled={true}
                                                maskChar=""
                                                // onChange={(e) => setPhone(e.target.value)} 
                                                value={phone}
                                                placeholder=''
                                            >
                                            </InputMask>
                                          </div>

                                          <label className='title-label'> </label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                                            <InputMask
                                                className="text-field__input" 
                                                style={{width: '230px', marginRight: '10px'}}
                                                type="text" 
                                                name="phone2" 
                                                id="phone2"
                                                mask="+7 (999) 999-99-99"
                                                disabled={true}
                                                maskChar=""
                                                // onChange={(e) => setPhone2(e.target.value)} 
                                                value={phone2}
                                                placeholder=''
                                            >
                                            </InputMask>
                                          </div>

                                          <div style={{textAlign: 'left', display: 'flex', flexDirection: 'column', marginTop: '33px'}}>
                                            <label className='title-label' style={{marginTop: '15px'}}>Предварительная смета</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Финальная смета</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Постер</label>
                                          </div>

                                          <div style={{marginTop: '52px', marginLeft: '-40px'}}>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh5" id="teh5" value={teh5} onChange={(e)=>setTeh5(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh6" id="teh6" value={teh6} onChange={(e)=>setTeh6(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh7" id="teh7" value={teh7} onChange={(e)=>setTeh7(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh8" id="teh8" value={teh8} onChange={(e)=>setTeh8(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                          </div>
                                        </div>

                                        {/* 5 */}   
                                        <div style={{textAlign: 'center', marginTop: '10px'}}>
                                          {/* <label className='title-label'> </label> */}
                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '24px'}}>
                                            <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          {/* <label className='title-label'> </label> */}
                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '44px'}}>
                                            <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px', marginTop: '40px'}}>
                                            🟥
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px'}}>
                                            <img src={btnRed} alt='' width={25} style={{marginBottom: '7px'}}/>
                                          </div>

                                          <div onClick={()=>setPlayPoster(!playPoster)} className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px', color: 'blue'}}>
                                            {playPoster ? <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/> : <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>}
                                          </div>
                                        </div>
                                        

                                    </div>
                        }  
                      </CCardBody>
                    </CCard>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Trash
