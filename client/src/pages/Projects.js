import React, { Suspense, useState, useEffect, useRef } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardHeader,
  CCardTitle,
  CCardText,
  CCollapse,
  CFormCheck,
} from '@coreui/react'

import Icon from "./../chat-app-worker/components/Icon";
import InputMask from 'react-input-mask';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Autocomplete from '@mui/material/Autocomplete';

// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';

import DatePicker from "react-datepicker";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { useUsersContext } from "../chat-app-new/context/usersContext";

import { useTableData } from 'src/components/table/useTableData'
import TableHeader from 'src/components/table/TableHeader'
import Filters from 'src/components/table/Filters'
// import Calendar from 'src/components/Calendar/Calendar_old'
import Calendar from "src/components/Calendar/Calendar";
import Calendar2 from "src/components/Calendar3/Calendar2";

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

import { getProjects, deleteProject, editProject } from '../http/projectAPI'

const Projects = () => {
  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
  const { companysAll, managersAll, workersAll } = useUsersContext();

  const [yearAndMonth, setYearAndMonth] = useState([2024, 10]);

  const [showSidebar, setShowSidebar] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCalendar2, setShowCalendar2] = useState(true)
  const [showProject, setShowProject] = useState(false)

  const [height, setHeight] = useState(600)

  const [projects, setProjects] = useState([]);

  const [id, setId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [city, setCity] = useState('');
  const [statusProject, setStatusProject] = useState({name: '', color: ''});
  const [specifikaProject, setSpecifikaProject] = useState('');
  const [vidProject, setVidProject] = useState({name: '', color: ''});
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companysData, setCompanysData] = useState([]);

  const [managersData, setManagersData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [specialistName, setSpecialistName] = useState('');

  const [fio, setFio] = useState('');

  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');

  const [teh, setTeh] = useState('');
  const [teh2, setTeh2] = useState('');
  const [teh3, setTeh3] = useState('');
  const [teh4, setTeh4] = useState('');

  const [comteg, setComteg] = useState('');
  const [spec, setSpec] = useState('');
  const [stavka, setStavka] = useState('');
  const [statusPretendent, setStatusPretendent] = useState('');

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const [showMainTable, setShowMainTable] = useState(false)
  const [showPretendentTable, setShowPretendentTable] = useState(false)
  const [showDots, setShowDots] = useState(false)

  const [playPoster, setPlayPoster] = useState(false)

  const table = useReactTable({
    defaultColumn: {
      size: 200, //starting column size
      minSize: 40, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    data,
    columns,
    state: {
      columnFilters,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
          ),
        ),
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    // filterFns: {
    //   fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    // },

    getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
  })


  useEffect(()=> {
    //1
    let arrCompanys = []
    companysAll.map((item, index)=> {
      arrCompanys.push(item.title)
    })
    const sortedComp = [...arrCompanys].sort((a, b) => {       
      var cityA = a, cityB = b
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })

    setCompanysData(sortedComp)

    //2
    let arrManagers = []
    managersAll.map((item, index)=> {
      arrManagers.push(item.fio)
    })
    setManagersData(arrManagers)

    //3
    let arrWorkers = []
    //console.log("workersAll: ", workersAll)
    workersAll.map((item, index)=> {
      const obj = {
        label: item.userfamily + ' ' + item.username,
        value: index
      }
      arrWorkers.push(obj)
    })
    console.log("arrWorkers: ", arrWorkers)
    setWorkersData(arrWorkers)

    //4
    const fetchData = async() => {
      const projs = await getProjects()
      console.log("projs: ", projs)
      setProjects(projs)
    }

    fetchData()
    
}, [])

const savePorject = async(id) => {

  const saveData = {
    name: projectName,
  }
  console.log(saveData)

  //сохранить изменения в базе
  await editProject(saveData, id)

  setShowProject(false)
  setShowCalendar2(true)
  setShowMainTable(false)
  setShowPretendentTable(false)
}

  const closeProfile = () => {
    setShowProject(false)
    setShowCalendar2(true)
    setShowMainTable(false)
    setShowPretendentTable(false)
  }

  useEffect(()=> {
    console.log("height: ", height)
  }, [height])


  const openProject =(item, day, id, name) => {
    console.log("item: ", item, day)

    setShowProject(true)
    setShowCalendar(false)
    setShowCalendar2(false)

    setStatusProject({name: 'Новый', color: '#1E90FF'})

    setId(id)
    setProjectName(name)
    setStavka({label: "№1", name: "№1"})

    setHeight(509)

    setShowMainTable(true)
    setShowPretendentTable(true)
  }

  const onChangeCompany = (e) => {
    setCompanyName(e.target.value)     
  }

  const onChangeManager = (e, index) => {
    console.log(e.target.value, index)

    // setManagersObj((managersObj) => {                                           
    //   const usersCopy = JSON.parse(JSON.stringify(managersObj));			
    //   const userObject = JSON.parse(usersCopy[index]);
    //   usersCopy[index] = JSON.stringify({ ...userObject, fio: e.target.value});		
    //   //console.log(usersCopy) 
    //   return usersCopy;
    // });   
  }

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }

  //удаление специалиста
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    //удаление проекта из БД
    await deleteProject(id)

    //addToast(deleteToast) //ваши данные сохранены

    setProjects([...projects].filter(item=>item.id !== id))

    setShowProject(false)
    setShowCalendar(false)
    setShowCalendar2(true)
  }


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img 
      src={threeDots} 
      className='hidden-element' alt='' 
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      width={15} 
      style={{ cursor: 'pointer'}}
    >
        {children}
    </img>
	));

  CustomToggle.displayName = "Edit";
  

	const CustomMenu = React.forwardRef(
		({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
		  const [value, setValue] = useState('');
	  
		  return (
			<div
			  ref={ref}
			  style={{backgroundColor: '#20272b', left: '5px', borderRadius: '6px', padding: '0 0 0 0', fontSize: '14px', top: '-45px', minWidth:'50px'}}
			  className={className}
			  aria-labelledby={labeledBy}
			>
			  <ul className="list-unstyled" style={{marginBottom: '0', padding: '5px 10px'}}>
				{React.Children.toArray(children).filter(
				  (child) =>
					!value || child.props.children?.toLowerCase().startsWith(value),
				)}
			  </ul>
			</div>
		  );
		},
	);

  CustomMenu.displayName = "Edit";



  const changeWorker = async(e) => {
    //console.log(id)

    setSpecialistName(e.target.value)
  }



  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Проекты</h2> */}
                    <CRow className="mt-2">
                      <CCol xs>
                        <CCard className="mb-4">
                          {/* <CCardHeader>Сметы</CCardHeader> */}

                          <CCardBody style={{padding: '12px', height: `${height}px`}}>
                            {!showProject ? <Filters setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> : '' }
                            {
                              showCalendar ? 
                                // <Calendar openProject={openProject} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                <h2 style={{marginTop: '25%', textAlign: 'center'}}>Раздел находится в разработке</h2>
                                :
                                (showCalendar2 ?
                                  <Calendar2 openProject={openProject} projects={projects} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                  : 
                                  (showProject ? 
                                    <div style={{position: 'relative', height: '494px', display: 'flex', flexDirection: 'row', marginTop: '35px'}}>
                                              <div style={{position: 'absolute', top: '-34px', left: '0px'}}>
                                                <div className="text-field">
                                                  <input disabled={true} className="text-field__input" type="text" name="projectId" id="projectId" value={id} style={{width: '120px', marginRight: '25px'}}/>
                                                </div>
                                              </div>
                                              
                                              <div style={{position: 'absolute', top: '-25px', right: '4px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'flex-end', width: '-webkit-fill-available'}}>   
                                                <div style={{display: 'flex'}}>
                                                  <Icon id="delete" onClick={()=>clickDelete(id)} />
                                                  <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={zamok}  style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                                  <img src={Disketa} onClick={savePorject} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
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
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    dateFormat="dd.MM.yyyy"
                                                  />
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={false} className="text-field__input" type="text" value='00:00' name="dateReg2" id="dateReg2" style={{width: '90px',}}/>
                                                </div>
                                              </div>

                                              <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
                                                <div className="text-field">
                                                  {/* <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg3" id="dateReg3" style={{width: '120px'}}/> */}
                                                  <DatePicker
                                                    className="uley-datepicker-control text-center text-field__input"
                                                    style={{ height: '40px', width: '120px'}}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    selectsStart
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    dateFormat="dd.MM.yyyy"
                                                  />
                                                </div>
                                                <div className="text-field">
                                                  <input disabled={false} className="text-field__input" type="text" value='00:00' name="dateReg4" id="dateReg4" style={{width: '90px'}}/>
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
                                                  }
                                                } 
                                              }}
                                              //value={item ? JSON.parse(item).fio : ''} 
                                              //inputValue={item ? JSON.parse(item).fio : ''}
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
                                                  }
                                                }  
                                              }}
                                              //value={item ? JSON.parse(item).fio : ''} 
                                              //inputValue={item ? JSON.parse(item).fio : ''}
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
                                              style={{resize: 'none', width: '320px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                                            />
                                          </div> 

                                          <label className='title-label' style={{marginTop: '44px', position: 'absolute', top: '300px', right: '240px'}}>Техническое Задание</label>

                                          <div  style={{display: 'flex', flexDirection: 'row', marginTop: '45px'}}>
                                            <div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
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
                                                  <input disabled={false} className="text-field__input" type="text" name="teh" id="teh" onChange={(e)=>setTeh(e.target.value)} value={teh} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh2" id="teh2" onChange={(e)=>setTeh2(e.target.value)} value={teh2} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh3" id="teh3" onChange={(e)=>setTeh3(e.target.value)} value={teh3} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh4" id="teh4" onChange={(e)=>setTeh4(e.target.value)} value={teh4} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
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
                                  :'')
                                )
                              
                            }
                            {/* Сайдбар с комментариями */}
                            <div style={{
                                display: showSidebar ? 'block' : 'none',
                                position: 'absolute',
                                right: '0px',
                                top: '120px',
                                height: '580px',
                                background: '#10171a'
                              }}>

                              <div>
                                <img src={Close} onClick={()=>setShowSidebar(false)} style={{position: 'absolute', top: '15px', right: '15px'}}/>
                              </div>

                              <div style={{width: '20rem'}}>

                              </div>

                            </div>

                          </CCardBody>
                        </CCard>

                        
                        <CCard className="mb-4" style={{display: showMainTable ? 'block' : 'none'}}>
                          <CCardHeader onClick={() => setVisibleA(!visibleA)}>Специалисты</CCardHeader>
                          <CCollapse visible={visibleA}>
                            <CCardBody style={{padding: '12px'}}>
                              <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1592px', borderRadius: '5px' }}>
                                <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '61px'}}>
                                      <CFormCheck
                                        checked={table.getIsAllRowsSelected()}
                                        onChange={table.getToggleAllRowsSelectedHandler()}
                                        style={{backgroundColor: '#181924', border: '1px solid #121212'}}
                                      />
                                    </CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '160px'}}>Дата</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Вид работ</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>ФИО</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}></CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специальность</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '40px'}}>Ставка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>С</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>Д</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Комтег</CTableHeaderCell>                         
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '50px'}}>Мерч</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '50px'}}>Такси</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>                                  
                                  <CTableRow v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                      <div className="parent-element" style={{position: 'absolute', left: '3px', top: '6px'}}>
                                        <Dropdown>
                                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}> 
                                          <Dropdown.Item>Добавить</Dropdown.Item>
                                          <Dropdown.Item>Дублировать</Dropdown.Item>
                                          <Dropdown.Item>Разделитель</Dropdown.Item>
                                          <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>                                     
                                      <CFormCheck style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} />
                                      <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDateTimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                      </LocalizationProvider> */}
                                      01.01.2024 | 00:00
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={vids}
                                        selected={vidProject}
                                        setSelected={setVidProject}
                                        // onChange={addCity}
                                        placeholder='—'
                                      />
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      <MyDropdown6
                                        options={workersData}
                                        selected={specialistName}
                                        setSelected={setSpecialistName}
                                        placeholder=''
                                        style={{width: '370px'}}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                      <img src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <MyDropdown5
                                        options={specOnlyData2}
                                        selected={spec}
                                        setSelected={setSpec}
                                        style={{width: '400px'}}
                                        // onChange={addCity}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={[{label: "№1", name: '№1'}, {label: "№2", name: '№2'}, {label: "№3", name: '№3'}, {label: "№4", name: '№4'}, {label: "№5", name: '№5'}, {label: "№6", name: '№6'}, {label: "№7", value: '7'}, {label: "№8", value: '8'}]}
                                        selected={stavka}
                                        setSelected={setStavka}
                                        style={{width: '130px'}}
                                        // onChange={addCity}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={comtegs}
                                        selected={comteg}
                                        setSelected={setComteg}
                                        // onChange={addCity}
                                        style={{width: '300px'}}
                                      />
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      Тест
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      ✅
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      ✅
                                    </CTableDataCell>           
                                  </CTableRow>
                                  <CTableRow v-for="item in tableItems" style={{lineHeight: '14px', padding: '0px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                      <div className="parent-element" style={{position: 'absolute', left: '3px', top: '6px'}}>
                                        <Dropdown>
                                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}> 
                                          <Dropdown.Item>Добавить</Dropdown.Item>
                                          <Dropdown.Item>Дублировать</Dropdown.Item>
                                          <Dropdown.Item>Разделитель</Dropdown.Item>
                                          <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>                                     
                                      <CFormCheck style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} />
                                      <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      01.01.2024 | 00:00
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={vids}
                                        selected={vidProject}
                                        setSelected={setVidProject}
                                        // onChange={addCity}
                                        placeholder='—'
                                      />
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      <MyDropdown6
                                        options={workersData}
                                        selected={specialistName}
                                        setSelected={setSpecialistName}
                                        placeholder=''
                                        style={{width: '370px'}}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                      <img src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <MyDropdown5
                                        options={specOnlyData2}
                                        selected={spec}
                                        setSelected={setSpec}
                                        style={{width: '400px'}}
                                        // onChange={addCity}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={[{label: "№1", name: '№1'}, {label: "№2", name: '№2'}, {label: "№3", name: '№3'}, {label: "№4", name: '№4'}, {label: "№5", name: '№5'}, {label: "№6", name: '№6'}, {label: "№7", value: '7'}, {label: "№8", value: '8'}]}
                                        selected={stavka}
                                        setSelected={setStavka}
                                        style={{width: '130px'}}
                                        // onChange={addCity}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={comtegs}
                                        selected={comteg}
                                        setSelected={setComteg}
                                        // onChange={addCity}
                                        style={{width: '300px'}}
                                      />
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      Тест
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      ✅
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      ✅
                                    </CTableDataCell>           
                                  </CTableRow>
                                </CTableBody>                   
                              </CTable>
                            </CCardBody>
                          </CCollapse>
                        </CCard>

                        <CCard className="mb-4" style={{display: showPretendentTable ? 'block' : 'none'}}>
                          <CCardHeader onClick={() => setVisibleB(!visibleB)}>Претенденты</CCardHeader>
                          <CCollapse visible={visibleB}>
                            <CCardBody style={{padding: '12px'}}>
                            <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1471px', borderRadius: '5px' }}>
                                <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '61px'}}>
                                      <CFormCheck
                                        checked={table.getIsAllRowsSelected()}
                                        onChange={table.getToggleAllRowsSelectedHandler()}
                                        style={{backgroundColor: '#181924', border: '1px solid #121212'}}
                                      />
                                    </CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '160px'}}>Дата</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '150px'}}>Статус</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>ФИО</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}></CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специальность</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '40px'}}>Проекты</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Комтег</CTableHeaderCell>                      
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>С</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}>Д</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>                                  
                                  <CTableRow v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                      <div className="parent-element" style={{position: 'absolute', left: '2px', top: '6px'}}>
                                        <Dropdown>
                                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}> 
                                          <Dropdown.Item>Добавить</Dropdown.Item>
                                          <Dropdown.Item>Дублировать</Dropdown.Item>
                                          <Dropdown.Item>Разделитель</Dropdown.Item>
                                          <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>                                     
                                      <CFormCheck style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} />
                                      <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      01.01.2024 | 00:00
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={[{label: "В Проект", name: 'В Проект'}, {label: "Отказано", name: 'Отказано'}, {label: "0.00", name: '0.00'}, {label: "Передумал", name: 'Передумал'}]}
                                        selected={statusPretendent}
                                        setSelected={setStatusPretendent}
                                        // onChange={addCity}
                                        placeholder='—'
                                        style={{height: '105px'}}
                                      />
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      Иванов Иван Иванович
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                      <img src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <MyDropdown5
                                        options={specOnlyData2}
                                        selected={spec}
                                        setSelected={setSpec}
                                        style={{width: '400px'}}
                                        // onChange={addCity}
                                      />
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      001 | 010
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center">
                                      <MyDropdown5
                                        options={comtegs}
                                        selected={comteg}
                                        setSelected={setComteg}
                                        // onChange={addCity}
                                        style={{width: '300px'}}
                                      />
                                    </CTableDataCell>    
                                    <CTableDataCell className="text-center">
                                      Тест
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      🟩
                                    </CTableDataCell>           
                                  </CTableRow>
                                </CTableBody>                   
                              </CTable>
                            </CCardBody>
                          </CCollapse>
                        </CCard>

                      </CCol>
                    </CRow>

                    <CModal
                      backdrop="static"
                      visible={visibleDelete}
                      onClose={() => setVisibleDelete(false)}
                      aria-labelledby="StaticBackdropExampleLabel"
                    >
                      <CModalHeader>
                        <CModalTitle id="StaticBackdropExampleLabel">Предупреждение</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Проект будет удален из базы!
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary" onClick={()=>deleteProfile(id)}>Удалить</CButton>
                      </CModalFooter>
                    </CModal>
                </Suspense>
            </CContainer>

            

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Projects
