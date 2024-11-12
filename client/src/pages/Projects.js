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

import { getProjects, deleteProject, editProject, getProjectId } from '../http/projectAPI'
import { addMainspec, deleteMainspec, editMainspec, getMainSpecProject, getMainSpecId } from '../http/mainspecAPI'

const Projects = () => {
  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
  const { companysAll, managersAll, workersAll, platformsAll } = useUsersContext();

  const [showSidebar, setShowSidebar] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCalendar2, setShowCalendar2] = useState(true)
  const [showProject, setShowProject] = useState(false)

  const [height, setHeight] = useState(600)

  const [projects, setProjects] = useState([]);

  const [id, setId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('')
  const [city, setCity] = useState('');
  const [statusProject, setStatusProject] = useState({name: '', color: ''});
  const [specifikaProject, setSpecifikaProject] = useState({name: '', color: ''});
  const [vidProject, setVidProject] = useState([]);
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companysData, setCompanysData] = useState([]);

  const [managerName, setManagerName] = useState('');
  const [managerName2, setManagerName2] = useState('');

  const [managersData, setManagersData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [specialistName, setSpecialistName] = useState([]);

  const [locationProject, setLocationProject] = useState('');
  const [platformsData, setPlatformsData] = useState([]);

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
  
  const [comteg, setComteg] = useState([]);
  const [spec, setSpec] = useState([]);
  const [stavka, setStavka] = useState([]);
  const [statusPretendent, setStatusPretendent] = useState('');

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  const [showMainTable, setShowMainTable] = useState(false)
  const [showPretendentTable, setShowPretendentTable] = useState(false)
  const [showDots, setShowDots] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [playPoster, setPlayPoster] = useState(false)

  const [sortedCities, setSortedCities] = useState([])

  const [mainspec, setMainspec] = useState([])
  const [mainspec2, setMainspec2] = useState([])
  const [dateProject, setDateProject] = useState([])
  const [timeProject, setTimeProject] = useState([])
  const [commentMain, setCommentMain] = useState([])

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
    // сортировка городов
    const newCities = cities.map((item)=> { 
      const newArr = item.label
      return newArr
    })
    const one = [...newCities].slice(0, 4)
    const city = [...newCities].slice(5)
    const sorted = city.sort((a, b) => {       
      var cityA = a, cityB = b
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    const newSorted = [...one, ...city]
    setSortedCities(newSorted)

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
    let arrPlatfroms = []
    platformsAll.map((item, index)=> {
      arrPlatfroms.push(item.title)
    })
    const sortedPlat = [...arrPlatfroms].sort((a, b) => {       
      var cityA = a.toLowerCase(), cityB = b.toLowerCase()
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })

    setPlatformsData(sortedPlat)

    //5
    const fetchData = async() => {
      const projs = await getProjects()
      console.log("projs: ", projs)
      const sortProj = [...projs].sort((a, b) => {  
        if (a.dateStart < b.dateStart)
          return -1;
        if (a.dateStart > b.dateStart)
            return 1;
        return 0;
      })

      setProjects(sortProj)
    }

    fetchData()
    
}, [])


  useEffect(()=> {
    console.log("height: ", height)
  }, [height])

  useEffect(()=> {
    console.log("Mainspec: ", mainspec)
    //setMainspec(mainspec2)
  }, [mainspec])


// Открыть проект  
  const openProject = async(month, item, number, id, name, 
    end, status, timeStart, specifika) => {

    console.log("item: ", month+1, item, number, specifika, end)

    const resProj = await getProjectId(id)
    console.log("resProj: ", resProj)

    let resMain
    resMain = await getMainSpecProject(id)
    console.log("resMain: ", resMain)
    

    if (resMain.length > 0) {
      setMainspec(resMain)

      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr4 = []
      let arr5 = []
      let arr6 = []

      resMain.map((item)=>{
        const obj = {
          name: item.vidWork,
          color: ''
        }
        arr.push(obj)

        const obj1 = {
          name: item.specialization,
          color: ''
        }
        arr1.push(obj1)

        const obj2 = {
          name: item.stavka,
          color: ''
        }
        arr2.push(obj2)

        const obj3 = {
          name: item.comteg,
          color: ''
        }
        arr3.push(obj3)

        arr4.push(item.specId)

        arr5.push(item.date?.split('T')[0])
        //console.log("arr5: ", arr5)
        arr6.push(item.date?.split('T')[1])
      })

      //console.log("arr5: ", arr5)
      
      setVidProject(arr)
      setSpec(arr1)
      setStavka(arr2)
      setComteg(arr3)
      setSpecialistName(arr4)
      setDateProject(arr5)
      setTimeProject(arr6)

    } else {
      const data = {
        comment: null,
        comteg: null,
        date: null,
        merch: null,
        projectId: id,
        specId: null,
        specialization: null,
        stavka: "№1",
        taxi: null,
        vidWork: null,
        number: 1,
      }

      const startDate = new Date(resProj.dateStart.split('T')[0]).toLocaleString().split(',')[0]
      const startTime = resProj.dateStart.split('T')[1].slice(0,5)

      const resAdd1 = await addMainspec({date: startDate+'T'+startTime, projectId: id, number: 1, stavka: "№1"})
      const resAdd2 = await addMainspec({date: startDate+'T'+startTime, projectId: id, number: 2, stavka: "№1"})
      const resAdd3 = await addMainspec({date: startDate+'T'+startTime, projectId: id, number: 3, stavka: "№1"})
      const resAdd4 = await addMainspec({date: startDate+'T'+startTime, projectId: id, number: 4, stavka: "№1"})
      
      console.log("resAdd: ", resAdd1)  

      let arr = []
      setMainspec(
        [...arr, resAdd1, resAdd2, resAdd3, resAdd4]
      );
      setVidProject([...arr, 
        {name: '', color: ''}, 
        {name: '', color: ''}, 
        {name: '', color: ''}, 
        {name: '', color: ''}
      ]) 

      setDateProject([startDate, startDate, startDate, startDate])
      setTimeProject([startTime, startTime, startTime, startTime])

      setStavka([...stavka, 
        "№1", 
        "№1", 
        "№1",
        "№1",
      ])
    }



    setStatusProject({name: status, color: statusData.find((stat)=> stat.label === status)?.color})
    setSpecifikaProject({name: specifika, color: specifikaData.find((stat)=> stat.label === specifika)?.color})

    setId(id)
    setProjectName(name)
    setStartDate(resProj ? resProj.dateStart : new Date().toISOString())
    setEndDate(resProj.dateEnd)
    setStartTime(timeStart) 
    //setEndTime(end?.split('T')[1]?.slice(0, 5))

    const compTitle = companysAll.find(item=> item.id.toString() === resProj.companyId)
    setCompanyName(compTitle?.title)

    const managerFio = managersAll.find(item=> item.id.toString() === resProj.managerId)
    setManagerName(managerFio?.fio)

    const comp = managersAll.find(item=> item.fio === managerFio?.fio)
    if (comp) {
      setPhone(comp.phone)
    } else {
      setPhone('')
    }

    const managerFio2 = managersAll.find(item=> item.id.toString() === resProj.managerId2)
    setManagerName2(managerFio2?.fio)

    const comp2 = managersAll.find(item=> item.fio === managerFio2?.fio)
    if (comp2) {
      setPhone2(comp2.phone2)
    } else {
      setPhone2('')
    }

    setLocationProject(resProj.geo)
    const loc = platformsAll.find(item=> item.title === resProj?.geo)
    if (loc) {
      setAddress(loc.address)
    } else {
      setAddress('')
    }

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

    setShowProject(true)
    setShowCalendar(false)
    setShowCalendar2(false)
    setVisibleA(true)
    setVisibleB(true)
    setShowMainTable(true)
    setShowPretendentTable(true)


    setTimeout(()=> {
      setHeight(509)
    }, 200)
    
  }

  //сохранить проект
  const saveProject = async(id) => {

    //Toast
    setShowModal(true)

    console.log("start: ", startDate)
    console.log("end: ", endDate)
    console.log("managerId: ", managersAll.find(item=> item.fio === managerName)?.id)
    console.log("managerId2: ", managersAll.find(item=> item.fio === managerName)?.id)
    console.log("companyId: ", companysAll.find(item=> item.title === companyName)?.id)

    const month = String(new Date(startDate).getMonth()+1).padStart(2, "0");
    const day = String(new Date(startDate).getDate()).padStart(2, "0");

    const month2 = String(new Date(endDate).getMonth()+1).padStart(2, "0");
    const day2 = String(new Date(endDate).getDate()).padStart(2, "0");
  
    const saveData = {
      name: projectName,
      status: statusProject.name,
      datestart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
      dateend: endDate ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z` : '',
      teh: tehText, 
      teh1,
      teh2,
      teh3,
      teh4,
      teh5,
      teh6,
      teh7,
      teh8,
      geo: locationProject, 
      managerId: managersAll.find(item=> item.fio === managerName)?.id, 
      managerId2: managersAll.find(item=> item.fio === managerName2)?.id,
      companyId: companysAll.find(item=> item.title === companyName)?.id, 
      comment, 
      specifika: specifikaProject.name, 
      city,
    }
    console.log(saveData)
  
    //сохранить изменения в базе
    const resSave = await editProject(saveData, id) 
    console.log("resSave: ", resSave)

    console.log("mainSpec: ", mainspec)
    console.log("dateProject: ", dateProject)
    let arr = []
    let arr2 = []
    mainspec.map(async(item, index)=> {
      //setTimeout(async()=> {
        await editMainspec(
          {
            date: dateProject[index] ? dateProject[index] + 'T' + timeProject[index] : null,
            vidWork: vidProject[index].name,
            specId: specialistName[index],
            specialization: spec[index].name,
            stavka: stavka[index].name,
            comteg: comteg[index].name,
            comment: commentMain[index],
            number: index+1,
          }, item.id
        )

        // arr.push(dateProject[index])
        // arr2.push(timeProject[index])


        // setDateProject(arr)
        // setTimeProject(arr2)
      //}, 500 * ++index)
    })

    //const resTable = await editMainspec({date: dateProject + 'T' + timeProject})
  
    setProjects((projects) => {	
      const month = String(new Date(startDate).getMonth()+1).padStart(2, "0");
      const day = String(new Date(startDate).getDate()).padStart(2, "0");
  
      let userIndex = projects.findIndex((item) => item.id === id);
      console.log(userIndex)
      const usersCopy = JSON.parse(JSON.stringify(projects));
  
      const userObject = usersCopy[userIndex];
      usersCopy[userIndex] = { ...userObject, 
        id: id,
        name: projectName, 
        status: statusProject.name,
        specifika: specifikaProject.name,
        dateStart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
        dateEnd: endDate ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z` : '',
      };
  
      console.log("update user: ", usersCopy)
  
      return usersCopy;
    });


    setTimeout(()=> {
      setShowModal(false)
      closeProfile()
    }, 500)
  }

  const closeProfile = () => {
    setShowProject(false)
    setShowCalendar2(true)
    setShowMainTable(false)
    setShowPretendentTable(false)
  }

  const onChangeCompany = (e) => {
    setCompanyName(e.target.value)     
  }

  const onChangeManager = (e, index) => {
    console.log(e.target.value, index)

    //setManagerName(e.target.value)

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
    //await deleteProject(id)


    //перемещение в корзину
    const data = {
      deleted: true
    }
    await editProject(data, id)

    //addToast(deleteToast) //ваши данные сохранены

    setProjects([...projects].filter(item=>item.id !== id))

    closeProfile()
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
			  style={{backgroundColor: '#20272b', left: '5px', borderRadius: '6px', padding: '0 0 0 0', fontSize: '14px', top: '-65px', minWidth:'50px'}}
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

  const changeAddSpec = async (eventkey) => {
		console.log("spec: ", eventkey)

    //Добавить
    if (eventkey.split(' ')[0] === '1' || eventkey==='1') {
      const resProj = await getProjectId(id)
      const startDate = new Date(resProj.dateStart.split('T')[0]).toLocaleString().split(',')[0]
      const startTime = resProj.dateStart.split('T')[1].slice(0,5)

      //добавить строку в основной состав
		  const resAdd = await addMainspec({date: startDate+'T'+startTime, projectId: id, number: parseInt(eventkey.split(' ')[2])+1, stavka: "№1"})
      console.log("resAdd: ", resAdd.id)

      const arrayCopy = JSON.parse(JSON.stringify(mainspec));
      //readyArray.splice(2, 0, 60);
      arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, {
        id: resAdd.id,
        date: startDate+'T'+startTime,
        specId: '', 
        vidWork: '', 
        specialization: '', 
        comteg: '',
        comment: '',
        stavka: '',
        taxi: '',
        merch: '',
        projectId: id,
        //number: parseInt(eventkey.split(' ')[2])+1,
      })
      console.log("arrayCopy: ", arrayCopy)
      setMainspec(arrayCopy)

      //setVidProject([])
      //setSpec([])
      let arr = [...stavka]
      let index = parseInt(eventkey.split(' ')[2])+1
      arr[index] = {value: 1, label: "№1", name: '№1', color: ''}
      setStavka(arr)
      //setComteg([])
      //setSpecialistName([])

      let arr2 = [...dateProject]
      let arr3 = [...timeProject]
      arr2[index] = startDate
      arr3[index] = startTime
      setDateProject(arr2)
      setTimeProject(arr3)
    } else

    //дублировать
    if (eventkey.split(' ')[0] === '2' || eventkey==='2') {
      const resBubl = await getMainSpecId(eventkey.split(' ')[1])
      console.log("resBubl: ", resBubl)
      //добавить строку в основной состав
		  const resAdd = await addMainspec({
        projectId: resBubl.projectId, 
        date: resBubl.date,
        specId: resBubl.specId,
        vidWork: resBubl.vidWork,
        specialization: resBubl.specialization,
        stavka: resBubl.stavka,
        taxi: resBubl.taxi,
        merch: resBubl.merch,
        comment: resBubl.comment,
        comteg: resBubl.comteg,
        number: parseInt(eventkey.split(' ')[2])+1,
      })

      const arrayCopy = JSON.parse(JSON.stringify(mainspec));
      
      arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, {
        id: resAdd.id,
        date: resBubl.date,
        specId: resBubl.specId,
        vidWork: resBubl.vidWork,
        specialization: resBubl.specialization,
        stavka: resBubl.stavka,
        taxi: resBubl.taxi,
        merch: resBubl.merch,
        comment: resBubl.comment,
        comteg: resBubl.comteg,
      })
      console.log("arrayCopy: ", arrayCopy)
      setMainspec(arrayCopy)

      let arr = []
      let arr1 = []
      let arr2 = []
      let arr3 = []
      let arr4 = []
      let arr5 = []
      let arr6 = []

      arrayCopy.map((item)=>{
        const obj = {
          name: item.vidWork,
          color: ''
        }
        arr.push(obj)

        const obj1 = {
          name: item.specialization,
          color: ''
        }
        arr1.push(obj1)

        const obj2 = {
          name: item.stavka,
          color: ''
        }
        arr2.push(obj2)

        const obj3 = {
          name: item.comteg,
          color: ''
        }
        arr3.push(obj3)

        arr4.push(item.specId)

        arr5.push(item.date?.split('T')[0])
        arr6.push(item.date?.split('T')[1])
      })

      
      setVidProject(arr)
      setSpec(arr1)
      setStavka(arr2)
      setComteg(arr3)
      setSpecialistName(arr4)
      setDateProject(arr5)
      setTimeProject(arr6)
    } else

    //добавить разделитель
    if (eventkey.split(' ')[0] === '3' || eventkey==='3') {
      //добавить строку в основной состав
		  const resAdd = await addMainspec({projectId: id, hr: true, number: parseInt(eventkey.split(' ')[2])+1})
      console.log("resAdd: ", resAdd.id)

      const arrayCopy = JSON.parse(JSON.stringify(mainspec));
      
      arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, {
        id: resAdd.id,
        date: '',
        specId: '', 
        vidWork: '', 
        specialization: '', 
        comteg: '',
        comment: '',
        stavka: '',
        taxi: '',
        merch: '',
        projectId: '',
        hr: true,
      })
      console.log("arrayCopy: ", arrayCopy)
      setMainspec(arrayCopy)
    } else

    //удалить
    if (eventkey.split(' ')[0] === '4') {
      console.log(eventkey.split(' ')[1])
      setMainspec([...mainspec].filter(item=>item.id !== parseInt(eventkey.split(' ')[1])))
      deleteMainspec(eventkey.split(' ')[1])
    }
	}

  useEffect(()=> {
    if (endDate !== '' && endDate !== null) {
      setEndTime('00:00')
    }
    
  }, [endDate])


  const changeDateProject=(e, index)=> {
    console.log("change Date: ", index)
    let arr = []
    arr = [...dateProject]
    console.log("arr: ", arr)
    arr[index] = e.target.value
    //console.log("dateProject: ", dateProject)
    setDateProject(arr)
  }

  const changeTimeProject=(e, index)=> {
    console.log(e.target.value, index)
    let arr = []
    arr = [...timeProject]
    arr[index] = e.target.value
    //console.log("timeProject: ", timeProject)
    setTimeProject(arr)
  }

  const changeCommentMain=(e, index)=> {
    console.log(e.target.value, index)
    let arr = []
    arr = [...commentMain]
    arr[index] = e.target.value
    console.log("commentMain: ", commentMain)
    setCommentMain(arr)
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
                                  <Calendar2 openProject={openProject} projects={projects} setProjects={setProjects} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
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
                                                  <img src={Disketa} onClick={()=>saveProject(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
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
                                            {/* <MyDropdown
                                              style={{backgroundColor: '#131c21'}}
                                              options={sortedCities}
                                              selected={city}
                                              setSelected={setCity}
                                            /> */}
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
                                              options={sortedCities}
                                              style={{width: '100%', padding: '0'}}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>setCity(e.target.value)}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  setCity(newValue)
                                                }  
                                              }}
                                              value={city} 
                                              inputValue={city}
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

                                          <label className='title-label'>Локация</label>
                                          <div className="text-field" style={{width: '320px'}}>
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
                                              options={platformsData}
                                              style={{width: '100%', padding: '0'}}
                                              onInputChange={(e)=>setLocationProject(e.target.value)}
                                              //onInputChange={(e)=>console.log(e.target.value)}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onChange={(event, newValue) => {
                                                  if (newValue && newValue.length) {
                                                      setLocationProject(newValue)
                                                      
                                                      const loc = platformsAll.find(item=> item.title === newValue)
                                                      console.log("loc: ", loc)
                                                      if (loc) {
                                                        setAddress(loc.address)
                                                      }
                                                  }  
                                              }}
                                              value={locationProject}
                                              inputValue={locationProject}
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

                                          <label className='title-label'>Адрес</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input" 
                                              type="text" 
                                              name="address" 
                                              id="address"
                                              value={address}
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
                                    <CTableHeaderCell className="text-center" style={{width: '180px'}}>Дата</CTableHeaderCell> 
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
                                { mainspec.length > 0 ?
                                 mainspec.map((item, index)=> (
                                    <CTableRow key={item.id} v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative', height: '30px'}}>
                                      <div className="parent-element" style={{position: 'absolute', left: '3px', top: '6px'}}>
                                        <Dropdown onSelect={changeAddSpec}>
                                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">											
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}> 
                                          <Dropdown.Item eventKey={`1 ${item.id} ${index}`}>Добавить</Dropdown.Item>
                                          <Dropdown.Item eventKey={`2 ${item.id} ${index}`}>Дублировать</Dropdown.Item>
                                          <Dropdown.Item eventKey={`3 ${item.id} ${index}`}>Разделитель</Dropdown.Item>
                                          <Dropdown.Item eventKey={`4 ${item.id} ${index}`}>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>                                     
                                      <CFormCheck style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} />
                                      {item.hr ? '' : <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>}
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {item.hr ?
                                      <></>
                                      :<div style={{display: 'flex'}}>
                                        <InputMask 
                                          mask="99.99.9999"
                                          value={dateProject[index] !== 'undefined' ? dateProject[index] : ''}
                                          onChange={(e)=>changeDateProject(e, index)}>
                                          {(inputProps) => <CFormInput 
                                                            {...inputProps} 
                                                            placeholder="" 
                                                            disableUnderline
                                                            aria-label="sm input example"
                                                            style={{backgroundColor: 'transparent', height: '14px', textAlign: 'center', border: 'none', width: '100px'}} 
                                                          />}
                                        </InputMask>
                                        <InputMask 
                                          mask="99:99"
                                          value={timeProject[index]}
                                          onChange={(e)=>changeTimeProject(e, index)}>
                                          {(inputProps) => <CFormInput 
                                                            {...inputProps} 
                                                            placeholder="" 
                                                            disableUnderline
                                                            aria-label="sm input example"
                                                            style={{backgroundColor: 'transparent', height: '14px', textAlign: 'center', border: 'none', width: '40px', padding: '5px 0px'}} 
                                                          />}
                                        </InputMask>
                                      </div>
                                    } 
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center" style={{height: '26px'}}>
                                      {item.hr ?
                                      <></> 
                                      :
                                      <MyDropdown5
                                        options={vids}
                                        selected={vidProject[index]}
                                        array={vidProject}
                                        setSelected={setVidProject}
                                        index={index}
                                        placeholder='—'
                                      />
                                      }
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown6
                                        options={workersData}
                                        selected={specialistName[index]}
                                        array={specialistName}
                                        setSelected={setSpecialistName}
                                        index={index}
                                        placeholder=''
                                        style={{width: '370px'}}
                                      />
                                    }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                      {/* <img src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/> */}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={specOnlyData2}
                                        selected={spec[index]}
                                        array={spec}
                                        setSelected={setSpec}
                                        index={index}
                                        style={{width: '400px'}}
                                        // onChange={addCity}
                                      />
                                    }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={[{value: 1, label: "№1", name: '№1', color: ''}, {value: 2, label: "№2", name: '№2', color: ''}, {value: 3, label: "№3", name: '№3', color: ''}, {value: 4, label: "№4", name: '№4', color: ''}, {value: 5, label: "№5", name: '№5', color: ''}, {value: 6, label: "№6", name: '№6', color: ''}, {value: 7, label: "№7", value: '7', color: ''}, {value: 8, label: "№8", value: '8', color: ''}]}
                                        selected={stavka[index]}
                                        array={stavka}
                                        setSelected={setStavka} 
                                        index={index}
                                        style={{width: '130px'}}
                                        // onChange={addCity}
                                      />
                                    }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {/* 🟩 */}
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {/* 🟩 */}
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={comtegs}
                                        selected={comteg[index]}
                                        setSelected={setComteg}
                                        array={comteg}
                                        index={index}
                                        style={{width: '300px'}}
                                      />
                                    }
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      {item.hr ?
                                      <></>
                                      :<input
                                        name='commentMain'
                                        value={commentMain[index]}
                                        onChange={(e)=>changeCommentMain(e, index)}
                                        style={{backgroundColor: 'transparent', height: '15px', textAlign: 'center', border: 'none', width: '140px', padding: '5px 0px', color: '#f3f3f3', fontSize: '14px'}} 
                                      ></input>
                                      }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {/* ✅ */}
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {/* ✅ */}
                                    </CTableDataCell>           
                                    </CTableRow>
                                  ))
                                  :""
                                }
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
                      alignment="center"
                      visible={showModal}
                      onClose={() => setShowModal(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '15px'}}>
                        Идёт сохранение данных...
                      </CModalBody>
                    </CModal>

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
