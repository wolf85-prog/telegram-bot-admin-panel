import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
  CTooltip,
  CFormSelect,
  CForm,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormFeedback,
  CFormTextarea,
} from '@coreui/react'
import { cilPlus, cilCopy, cilVerticalAlignBottom, cilClearAll, cilSend } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Icon from './../chat-app-worker/components/Icon'
import InputMask from 'react-input-mask'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Autocomplete from '@mui/material/Autocomplete'

import DatePicker from 'react-datepicker'
//import Dropdown from 'react-bootstrap/Dropdown'
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import { useUsersContext } from '../chat-app-new/context/usersContext'

import { useTableData } from 'src/components/table/useTableData'
//import TableHeader from 'src/components/table/TableHeader'
import Filters from 'src/components/table/Filters'
// import Calendar from 'src/components/Calendar/Calendar_old'
import Calendar from 'src/components/Calendar/Calendar'
import Calendar2 from 'src/components/Calendar3/Calendar2'

import MyDropdown from 'src/components/Dropdown/Dropdown'
import MyDropdown4 from 'src/components/Dropdown4/Dropdown4'
import MyDropdown5 from 'src/components/Dropdown5/Dropdown5'
import MyDropdown52 from 'src/components/Dropdown52/Dropdown52'
import MyDropdown6 from 'src/components/Dropdown6/Dropdown6'

import Close from '../assets/images/clear.svg'
import zamok from '../assets/images/замок.png'
import zamok2 from '../assets/images/замок2.png'
import addAvatar from '../assets/images/add_avatar.png'
import Krestik from './../assets/images/krestik.png'
import imgBlock18 from './../assets/images/block18.png'
import Trubka from './../assets/images/trubka.png'
import Tg from './../assets/images/tg.png'
import Star from './../assets/images/star.png'
import StarActive from './../assets/images/star_activ.svg'
import Disketa from './../assets/images/copy.png'
import Disketa2 from './../assets/images/disketa.png'
import arrowDown from 'src/assets/images/arrowDown.svg'
import threeDots from 'src/assets/images/three-dots.svg'

import btnPause from 'src/assets/images/button_pause.png'
import btnRec from 'src/assets/images/button_rec.png'
import btnPlay from 'src/assets/images/button_play.png'
import btnStop from 'src/assets/images/button_stop.png'

import btnBlue2 from 'src/assets/images/button_blue2.png'
import btnRed2 from 'src/assets/images/button_red2.png'
import btnGreen2 from 'src/assets/images/button_green2.png'
import btnYellow2 from 'src/assets/images/button_yellow2.png'

import statusData from 'src/data/statusData'
import cities from 'src/data/cities'
import specifikaData from 'src/data/specifikaData'
import vids from 'src/data/vids'
import comtegs from 'src/data/comtegs'
import specOnlyData2 from 'src/data/specOnlyData2'
import { posterList } from 'src/data/data'
import startData from 'src/data/startData'
import { addCanceled, getCanceled, getCanceledId } from '../http/workerAPI'
import { getSpecialist, getSpecCount, editSpecialist, getSpecialistId } from './../http/specAPI'
import {
  getPretendentProjectId,
  editPretendent,
  getCreatePredSmeta,
  getCreateFinSmeta,
  getCreatePoster,
} from '../http/adminAPI'
import { getProjects, deleteProject, editProject, getProjectId } from '../http/projectAPI'
import { sendSpecialistOtkaz } from '../http/specAPI'
import {
  getPosters,
  getPostersAll,
  deletePoster,
  getWorkersReport,
  createWorkersReport,
  deleteWorkersReport,
  createPereklichkaPoster,
} from '../http/postersApi'

import {
  addMainspec,
  deleteMainspec,
  editMainspec,
  getMainSpecProject,
  getMainSpecId,
  deleteMainspecProject,
} from '../http/mainspecAPI'
import { toast } from "react-toastify";
import { $host } from '../http/index'
import { getManagerId } from 'src/http/managerAPI'


const Projects = () => {
  //const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
  const { companysAll, managersAll, workersAll, setWorkersAll, platformsAll } = useUsersContext()

  const tokenManager = process.env.REACT_APP_TELEGRAM_API_TOKEN

  const [showSidebar, setShowSidebar] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCalendar2, setShowCalendar2] = useState(true)
  const [showProject, setShowProject] = useState(false)
  const [showSaveTreck, setShowSaveTreck] = useState(false)
  const [showPosterMenu, setShowPosterMenu] = useState('none')

  const [showSaveAddress, setShowSaveAddress] = useState(false)

  const [height, setHeight] = useState(600)

  const [projects, setProjects] = useState([])
  const [projectsSort, setProjectsSort] = useState([])

  const [id, setId] = useState('')
  const [crmID, setCrmID] = useState('')
  const [projectName, setProjectName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('')
  const [city, setCity] = useState('')
  const [statusProject, setStatusProject] = useState({ name: '', color: '' })
  const [specifikaProject, setSpecifikaProject] = useState({ name: '', color: '' })
  const [vidProject, setVidProject] = useState([])
  const [company, setCompany] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companysData, setCompanysData] = useState([])

  const [managerName, setManagerName] = useState('')
  const [managerName2, setManagerName2] = useState('')

  const [managersData, setManagersData] = useState([])
  const [workersData, setWorkersData] = useState([])
  const [specialistName, setSpecialistName] = useState([])

  const [locationProject, setLocationProject] = useState('')
  const [platformsData, setPlatformsData] = useState([])

  const [phone, setPhone] = useState('')
  const [phone2, setPhone2] = useState('')

  const [teh1, setTeh1] = useState('')
  const [teh2, setTeh2] = useState('')
  const [teh3, setTeh3] = useState('')
  const [teh4, setTeh4] = useState('')
  const [teh5, setTeh5] = useState('')
  const [teh6, setTeh6] = useState('')
  const [teh7, setTeh7] = useState('')
  const [teh8, setTeh8] = useState('')
  const [tehText, setTehText] = useState('')
  const [address, setAddress] = useState('')
  const [track, setTrack] = useState('')
  const [geoId, setGeoId] = useState('')
  const [comment, setComment] = useState('')

  const [comteg, setComteg] = useState([])
  const [spec, setSpec] = useState([])
  const [stavka, setStavka] = useState([])
  const [statusPretendent, setStatusPretendent] = useState('')

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)
  const [visibleC, setVisibleC] = useState(false)

  const [visiblePoster, setVisiblePoster] = useState('')

  const [visiblePereklichka, setVisiblePereklichka] = useState(false)

  const [projectChatId, setProjectChatId] = useState('')

  const [showMainTable, setShowMainTable] = useState(false)
  const [showPretendentTable, setShowPretendentTable] = useState(false)
  const [showPosterTable, setShowPosterTable] = useState(false)
  const [showDots, setShowDots] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [posters, setPosters] = useState([])
  const [workersReport, setWorkersReport] = useState([])

  const [playPredSmeta, setPlayPredSmeta] = useState(false)
  const [donePredSmeta, setDonePredSmeta] = useState(false)

  const [playFinSmeta, setPlayFinSmeta] = useState(false)
  const [doneFinSmeta, setDoneFinSmeta] = useState(false)

  const [playPoster, setPlayPoster] = useState(false)
  const [playPereklichka, setPlayPereklichka] = useState(false)
  const [playSpiski, setPlaySpiski] = useState(false)

  const [showLoader, setShowLoader] = useState(false)
  const [sortedCities, setSortedCities] = useState([])
  const [mainspec, setMainspec] = useState([])
  const [dateProject, setDateProject] = useState([])
  const [timeProject, setTimeProject] = useState([])
  const [pretendents, setPretendents] = useState([])

  const [countPressDate, setCountPressDate] = useState(0)

  const [showHeader, setShowHeader] = useState(false)

  const [startProject, setStartProject] = useState({ name: '120 минут', color: '#1E90FF' })

  const customTooltipStyle = {
    '--cui-tooltip-bg': '#2a2f32',
    '--cui-tootip-color': '#fff',
    color: '#fff',
    'background-color': '#2a2f32',
  }

  // const table = useReactTable({
  //   defaultColumn: {
  //     size: 200, //starting column size
  //     minSize: 40, //enforced during column resizing
  //     maxSize: 500, //enforced during column resizing
  //   },
  //   data,
  //   columns,
  //   state: {
  //     columnFilters,
  //   },
  //   meta: {
  //     updateData: (rowIndex, columnId, value) =>
  //       setData((prev) =>
  //         prev.map((row, index) =>
  //           index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
  //         ),
  //       ),
  //   },
  //   getCoreRowModel: getCoreRowModel(),
  //   getSortedRowModel: getSortedRowModel(),

  //   getFilteredRowModel: getFilteredRowModel(),
  //   onColumnFiltersChange: setColumnFilters,
  //   // filterFns: {
  //   //   fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
  //   // },

  //   getPaginationRowModel: getPaginationRowModel(),

  //   enableRowSelection: true,
  //   getRowCanExpand: () => true,
  // })

  useEffect(() => {
    // сортировка городов
    const newCities = cities.map((item) => {
      const newArr = item.label
      return newArr
    })
    const one = [...newCities].slice(0, 4)
    const city = [...newCities].slice(5)
    // const sorted = city.sort((a, b) => {
    //   var cityA = a,
    //     cityB = b
    //   return cityA < cityB ? -1 : cityA > cityB ? 1 : 0 //сортировка по возрастанию
    // })
    const newSorted = [...one, ...city]
    setSortedCities(newSorted)

    //1
    let arrCompanys = []
    companysAll.map((item, index) => {
      arrCompanys.push(item.title)
    })
    const sortedComp = [...arrCompanys].sort((a, b) => {
      var cityA = a,
        cityB = b
      return cityA < cityB ? -1 : cityA > cityB ? 1 : 0 //сортировка по возрастанию
    })

    setCompanysData(sortedComp)

    //2
    let arrManagers = []
    managersAll.map((item, index) => {
      if (item.fio) {
        arrManagers.push(item.fio)
      }
    })
    const sortedManager = [...arrManagers].sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0 //сортировка по возрастанию
    })
    //console.log("sortedManager: ", sortedManager)
    setManagersData(sortedManager)

    //3

    //4
    let arrPlatfroms = []
    platformsAll.map((item, index) => {
      arrPlatfroms.push(item.title)
    })
    const sortedPlat = [...arrPlatfroms].sort((a, b) => {
      var cityA = a.toLowerCase(),
        cityB = b.toLowerCase()
      return cityA < cityB ? -1 : cityA > cityB ? 1 : 0 //сортировка по возрастанию
    })

    setPlatformsData(sortedPlat)

    //5
    const fetchData = async () => {
      const projs = await getProjects()
      //console.log("projs: ", projs)
      const sortProj = [...projs].sort((a, b) => {
        if (a.dateStart < b.dateStart) return -1
        if (a.dateStart > b.dateStart) return 1
        return 0
      })

      setProjects(sortProj)
      setProjectsSort(sortProj)

      //0 все специалисты
      let all = await getSpecialist()
      console.log('Все специалисты: ', 'all')
      const arrayWorkerAll = []

      all.map(async (user) => {
        if (user.fio !== 'Неизвестный специалист') {
          const newWorker = {
            id: user.id,
            userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
            username: '', //user.username,
            phone: user.phone,
            dateborn: user.age,
            city: user.city,
            //newcity: user.newcity,
            companys: user.company,
            //stag: user.stag,
            worklist: user.specialization,
            chatId: user.chatId,
            createDate: user.createdAt,
            avatar: user.profile,
            //from: user.from,
            promoId: user.promoId,
            blockW: user.blockW,
            block18: user.block18,
            krest: user.krest,
            deleted: user.deleted,
            comment: user.comment,
            comteg: user.comteg,
            projectAll: user.projectAll,
            projectMonth: user.projectMonth,
          }

          arrayWorkerAll.push(newWorker)
        }
      })

      setWorkersAll(arrayWorkerAll)
      let arrWorkers = []
      //console.log("workersAll: ", workersAll)
      arrayWorkerAll.map((item, index) => {
        const obj = {
          id: item.id,
          label: item.userfamily + ' ' + item.username,
          value: index,
        }
        arrWorkers.push(obj)
      })
      //console.log("arrWorkers: ", arrWorkers)
      setWorkersData(arrWorkers)
    }

    fetchData()
  }, [])

  // const managerName = React.useMemo(
  //   () => managersData.filter((v) => v.selected),
  //   [managersData],
  // );

  // useEffect(()=> {
  //   // console.log("pretendents status: ", worker.status)
  //   // console.log("pretendents id: ", worker.workerId)
  //   // sendSpecialistOtkaz(worker.workerId, {projectId: '120'})
  // }, [worker])

  // const {
  //   isPending: isPendingPosters,
  //   error: postersError,
  //   data: posters,
  // } = useQuery({
  //   queryKey: ['posters'],
  //   queryFn: () => {
  //     console.log('start!!!!!!')
  //     getPostersAll(crmID)
  //   },
  //   initialData: [],
  // })

  useEffect(() => {
    console.log('height: ', height)
  }, [height])

  useEffect(() => {
    //console.log("Mainspec: ", mainspec)
    //setMainspec(mainspec2)
  }, [mainspec])

  // Открыть проект
  const openProject = async (month, item, number, id, name, end, status, timeStart, specifika) => {
    console.log('item: ', month + 1, item, number, specifika, end)

    setShowHeader(true)
    setShowProject(true)
    setShowCalendar(false)
    setShowCalendar2(false)
    queryClient.invalidateQueries('estimateJobs', 'estimate')

    const resProj = await getProjectId(id)
    console.log('resProj: ', resProj)

    const resManager = await getManagerId(resProj.managerId)
    console.log('resManager: ', resManager)
    setProjectChatId(resManager.chatId)

    const resPretendents = await getPretendentProjectId(id)
    console.log('pretendents: ', resPretendents)

    const resPosters = await getPosters(resProj.crmID)
    console.log('posters: ', resPosters)
    setPosters(resPosters)

    const resWorkersReport = await getWorkersReport(resProj.crmID)
    console.log('posters: ', resWorkersReport)
    setWorkersReport(resWorkersReport)

    let newArray = []
    let colorStatus = ''
    resPretendents.map((item) => {
      const fioSpec = workersAll.find((el) => el.id === parseInt(item.workerId))
      //console.log("workers: ", workersAll)
      //console.log("fioSpec: ", fioSpec)
      const localDate =
        new Date(item.createdAt).toLocaleString().split(',')[0] +
        ' | ' +
        new Date(item.createdAt).toLocaleString().split(',')[1].slice(1, 6)

      if (item.status === 'В Проект') colorStatus = 'green'
      if (item.status === 'Отказано') colorStatus = 'yellow'

      const newObj = {
        id: item.id,
        data: localDate,
        status: item.status ? JSON.stringify({ name: item.status, color: colorStatus }) : '',
        fio: fioSpec?.userfamily + ' ' + fioSpec?.username,
        workerId: fioSpec?.id,
        projectId: item.projectId,
        receiverId: item.receiverId,
        spec: JSON.parse(fioSpec?.worklist)[0]?.spec,
        comment: JSON.parse(fioSpec?.comment),
        comteg: JSON.parse(fioSpec?.comteg),
        projectAll: fioSpec.projectAll,
        projectMonth: fioSpec.projectMonth,
      }
      newArray.push(newObj)
    })
    setPretendents(newArray)

    setId(id)
    setCrmID(resProj.crmID)
    setProjectName(name)

    var d = new Date(resProj.dateStart) // создаём объект даты
    var d2 = resProj.dateEnd ? new Date(resProj.dateEnd) : '' // создаём объект даты
    setStartDate(d.setHours(d.getHours() - 3))
    setEndDate(d2 !== '' ? d2.setHours(d2.getHours() - 3) : '')

    setStartTime(timeStart)
    setEndTime(resProj.dateEnd?.split('T')[1]?.slice(0, 5))

    let resMain
    resMain = await getMainSpecProject(id)
    console.log('resMain: ', resMain)

    if (resMain.length > 0) {
      let arr = []
      let myColor = ''
      let myColor2 = ''

      resMain.map((item) => {
        if (item.vidWork === 'Фальшстарт' || item.vidWork === 'Отмена') {
          myColor = 'red'
        } else {
          myColor = ''
        }

        const obj = {
          name: item.vidWork,
          color: myColor,
        }

        const obj1 = {
          name: item.specialization,
          color: '',
        }

        const obj2 = {
          name: item.stavka,
          color: '',
        }

        if (item.comteg === 'Опоздание' || item.comteg === 'Невыход') {
          myColor2 = 'red'
        } else {
          myColor2 = ''
        }

        const obj3 = {
          name: item.comteg,
          color: myColor2,
        }

        const newObj = {
          id: item.id,
          date: item.date,
          specId: item.specId,
          vidWork: JSON.stringify(obj),
          specialization: JSON.stringify(obj1),
          comteg: JSON.stringify(obj3),
          comment: item.comment,
          stavka: JSON.stringify(obj2),
          numder: item.number,
          hr: item.hr,
          count: item.count,
          projectId: id,
        }

        arr.push(newObj)
      })

      console.log('arr: ', arr)
      setMainspec(arr)
    } else {
      //новый состав специалистов
      const startD = new Date(resProj.dateStart?.split('T')[0]).toLocaleString().split(',')[0]
      const startT = resProj.dateStart?.split('T')[1]?.slice(0, 5)

      //console.log("startD: ", startD, startT)

      const data = {
        //id: resProj.crmID+1,
        date: startD + 'T' + resProj.dateStart?.split('T')[1].slice(0, 5),
        vidWork: null,
        specId: null,
        specialization: null,
        stavka: JSON.stringify({ label: '№1', name: '№1', color: '' }),
        comment: null,
        comteg: null,
        taxi: null,
        merch: null,
        projectId: id,
      }

      let arr = []
      setMainspec(
        //[...arr, {...data, id: parseInt(resProj.crmID)+1}, {...data, id: parseInt(resProj.crmID)+2}, {...data, id: parseInt(resProj.crmID)+3}, {...data, id: parseInt(resProj.crmID)+4}]
        [...arr, data, data, data, data],
      )
    }

    setStatusProject({
      name: status,
      color: statusData.find((stat) => stat.label === status)?.color,
    })
    setSpecifikaProject({
      name: specifika,
      color: specifikaData.find((stat) => stat.label === specifika)?.color,
    })

    setStartProject({
      name: resProj.start ? resProj.start : '120 минут',
      color: resProj.start
        ? startData.find((stat) => stat.label === resProj.start)?.color
        : startData.find((stat) => stat.label === '120 минут')?.color,
    })

    const compTitle = companysAll.find((item) => item.id.toString() === resProj.companyId)
    //console.log("companyName: ", compTitle?.title ? compTitle?.title : '')
    setCompanyName(compTitle?.title ? compTitle?.title : '')

    const managerFio = managersAll.find((item) => item.id.toString() === resProj.managerId)
    setManagerName(managerFio?.fio)

    const comp = managersAll.find((item) => item.fio === managerFio?.fio)
    if (comp) {
      setPhone(comp.phone)
    } else {
      setPhone('')
    }

    const managerFio2 = managersAll.find((item) => item.id.toString() === resProj.managerId2)
    setManagerName2(managerFio2?.fio)

    const comp2 = managersAll.find((item) => item.fio === managerFio2?.fio)
    if (comp2) {
      setPhone2(comp2.phone)
    } else {
      setPhone2('')
    }

    //setLocationProject(resProj.geo)
    const loc = platformsAll.find((item) => item.id === parseInt(resProj?.geo))
    console.log('platformsAll: ', 'platformsAll')
    console.log('geo: ', resProj?.geo)
    console.log('loc: ', loc)
    if (loc) {
      let text = `${loc.address}`
      setAddress(text)
      let text2 = `${loc.track} 
${loc.url}`
      setTrack(text2)
      setLocationProject(loc.title)
    } else {
      setLocationProject('')
      setAddress('')
      setTrack('')
    }

    setGeoId(resProj?.geo)

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

    setVisibleA(true)
    setVisibleB(true)
    setShowMainTable(true)
    setShowPretendentTable(true)
    setShowPosterTable(true)

    setTimeout(() => {
      setHeight(560)
    }, 200)
  }

  useEffect(() => {
    console.log('Локация: ', geoId)
  }, [geoId])

  useEffect(() => {
    console.log('Основной состав: ', mainspec)
  }, [mainspec])

  useEffect(() => {
    console.log(pretendents)
  }, [pretendents])


  // список дат из основного состава


  // const mainSpecDates = mainspec.map((mainSpecItem) => ({
  //     label: mainSpecItem.date,
  //     data: mainSpecItem.date,
  //   }))
  
  const mainSpecDates = useMemo(() =>
     mainspec.map((mainSpecItem) => ({
       label: mainSpecItem.date,
       value: mainSpecItem.date,
    })).filter((value, index, self) =>
    index === self.findIndex((t) => (
        t.value === value.value && value.value !== null
    ))),
      [mainspec]
    );


  //сохранить проект
  const saveProject = async (id) => {
    //Toast
    setShowModal(true)

    console.log('start: ', startDate)
    console.log('end: ', endDate)
    console.log('managerId: ', managersAll.find((item) => item.fio === managerName)?.id)
    console.log('managerId2: ', managersAll.find((item) => item.fio === managerName)?.id)
    console.log('companyId: ', companysAll.find((item) => item.title === companyName)?.id)

    //удаляем старые записи из Основного состава
    //const resAllDel = await deleteMainspecProject(id)
    //console.log("resAllDel: ", resAllDel)

    const month = String(new Date(startDate).getMonth() + 1).padStart(2, '0')
    const day = String(new Date(startDate).getDate()).padStart(2, '0')

    const month2 = String(new Date(endDate).getMonth() + 1).padStart(2, '0')
    const day2 = String(new Date(endDate).getDate()).padStart(2, '0')

    const saveData = {
      name: projectName,
      status: statusProject.name,
      start: startProject.name,
      datestart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
      dateend: endDate
        ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z`
        : '',
      teh: tehText,
      teh1,
      teh2,
      teh3,
      teh4,
      teh5,
      teh6,
      teh7,
      teh8,
      geo: geoId,
      managerId: managersAll.find((item) => item.fio === managerName)?.id,
      managerId2: managersAll.find((item) => item.fio === managerName2)?.id,
      companyId: companysAll.find((item) => item.title === companyName)?.id,
      comment,
      specifika: specifikaProject.name,
      city,
    }
    console.log(saveData)

    //сохранить изменения в базе
    const resSave = await editProject(saveData, id)
    console.log('resSave: ', resSave)

    console.log('mainSpec save: ', mainspec)
    mainspec.map(async (item, index) => {
      //setTimeout(async()=> {
      console.log('id item: ', item.id)
      if (item.id) {
        const resEdit = await editMainspec(
          {
            date: item.date,
            vidWork: item.vidWork ? JSON.parse(item.vidWork).name : '',
            specId: item.specId,
            specialization: item.specialization ? JSON.parse(item.specialization).name : '',
            stavka: item.stavka ? JSON.parse(item.stavka).name : '',
            comteg: item.comteg ? JSON.parse(item.comteg).name : '',
            comment: item.comment,
            projectId: item.projectId,
            number: index + 1,
            hr: item.hr,
          },
          item.id,
        )
        console.log('resEdit: ', resEdit)
      } else {
        await addMainspec({
          date: item.date,
          vidWork: item.vidWork ? JSON.parse(item.vidWork).name : '',
          specId: item.specId,
          specialization: item.specialization ? JSON.parse(item.specialization).name : '',
          stavka: item.stavka ? JSON.parse(item.stavka).name : '',
          comteg: item.comteg ? JSON.parse(item.comteg).name : '',
          comment: item.comment,
          projectId: item.projectId,
          number: index + 1,
          hr: item.hr,
        })
      }

      //}, 500 * ++index)
    })

    //send otkaz
    // pretendents.map(async (item, index) => {
    //   console.log('pretendent: ', item, index)
    //   setTimeout(async () => {
    //     if (item.status) {
    //       if (JSON.parse(item.status).name === 'Отказано') {
    //         //сохранение отказа в базе
    //         const newObj = {
    //           projectId: item.projectId,
    //           workerId: item.workerId.toString(),
    //           receiverId: item.receiverId,
    //           cancel: true,
    //         }
    //         console.log('newObj: ', newObj)

    //         //отправка сообщения об отказе
    //         const retCanceled = await getCanceledId(newObj)
    //         console.log('retCanceled: ', retCanceled)
    //         if (!retCanceled) {
    //           await sendSpecialistOtkaz(item.workerId, { projectId: item.projectId })
    //         }

    //         const resAdd = await addCanceled(newObj)
    //         console.log('resAdd: ', resAdd)
    //       }

    //       await editPretendent(item.id, { status: JSON.parse(item.status).name })
    //     }
    //   }, 3000 * ++index)
    // })

    //const resTable = await editMainspec({date: dateProject + 'T' + timeProject})

    setProjects((projects) => {
      const month = String(new Date(startDate).getMonth() + 1).padStart(2, '0')
      const day = String(new Date(startDate).getDate()).padStart(2, '0')

      let userIndex = projects.findIndex((item) => item.id === id)
      console.log(userIndex)
      const usersCopy = JSON.parse(JSON.stringify(projects))

      const userObject = usersCopy[userIndex]
      usersCopy[userIndex] = {
        ...userObject,
        id: id,
        name: projectName,
        status: statusProject.name,
        start: startProject.name,
        specifika: specifikaProject.name,
        dateStart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
        dateEnd: endDate
          ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z`
          : '',
      }

      console.log('update user: ', usersCopy)

      return usersCopy
    })

    setTimeout(() => {
      setShowModal(false)
      closeProfile()
    }, 2000)
  }

  const closeProfile = () => {
    setShowHeader(false)
    setShowProject(false)
    setShowCalendar2(true)
    setShowMainTable(false)
    setShowPretendentTable(false)
    setShowPosterTable(false)

    //очистить переменные
    setId('')
    setCrmID('')
    setProjectName('')
    setStartDate('')
    setEndDate('')
    setStartTime('')
    setEndTime('')
    setStatusProject({ name: '', color: '' })
    setStartProject({ name: '120 минут', color: '' })
    setSpecifikaProject({ name: '', color: '' })
    setCompanyName('')
    setManagerName('')
    setPhone('')
    setManagerName2('')
    setPhone2('')
    setLocationProject('')
    setAddress('')
    setGeoId('')
    setCity('')
    setComment('')
    setTehText('')
    setTeh1('')
    setTeh2('')
    setTeh3('')
    setTeh4('')
    setTeh5('')
    setTeh6('')
    setTeh7('')
    setTeh8('')

    setMainspec([])
    setPretendents([])
  }

  const onChangeManager = (e, index) => {
    //console.log(e.target.value, index)

    setManagerName(e.target.value)

    // setManagersObj((managersObj) => {
    //   const usersCopy = JSON.parse(JSON.stringify(managersObj));
    //   const userObject = JSON.parse(usersCopy[index]);
    //   usersCopy[index] = JSON.stringify({ ...userObject, fio: e.target.value});
    //   //console.log(usersCopy)
    //   return usersCopy;
    // });
  }

  const onChangeManager2 = (e, index) => {
    if (e) {
      setManagerName2(e.target.value)
    } else {
      setManagerName2('')
    }
  }

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)
  }

  //удаление специалиста
  const deleteProfile = async (id) => {
    console.log(id)
    setVisibleDelete(false)

    //удаление проекта из БД
    //await deleteProject(id)

    //перемещение в корзину
    const data = {
      deleted: true,
    }
    await editProject(data, id)

    //addToast(deleteToast) //ваши данные сохранены

    setProjects([...projects].filter((item) => item.id !== id))

    closeProfile()
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img
      src={threeDots}
      className="hidden-element"
      alt=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
      width={15}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </img>
  ))

  CustomToggle.displayName = 'Edit'

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')

      return (
        <div
          ref={ref}
          style={{
            backgroundColor: '#20272b',
            left: '5px',
            borderRadius: '6px',
            padding: '0 0 0 0',
            fontSize: '14px',
            top: '-45px',
            minWidth: '50px',
          }}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled" style={{ marginBottom: '0', padding: '5px 10px' }}>
            {React.Children.toArray(children).filter(
              (child) => !value || child.props.children?.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      )
    },
  )

  CustomMenu.displayName = 'Edit'

  const changeAddSpec = async (eventkey) => {
    console.log('spec: ', eventkey)

    //Добавить
    if (eventkey.split(' ')[0] === '1' || eventkey === '1') {
      const resProj = await getProjectId(id)
      const startDate = new Date(resProj.dateStart.split('T')[0]).toLocaleString().split(',')[0]
      const startTime = resProj.dateStart.split('T')[1].slice(0, 5)

      //добавить строку в основной состав
      const resAdd = await addMainspec({
        date: startDate + 'T' + startTime,
        projectId: id,
        number: parseInt(eventkey.split(' ')[2]) + 1,
        stavka: '№1',
      })
      console.log('resAdd: ', resAdd.id)

      const arrayCopy = JSON.parse(JSON.stringify(mainspec))
      //readyArray.splice(2, 0, 60);
      arrayCopy.splice(parseInt(eventkey.split(' ')[2]) + 1, 0, {
        id: resAdd.id,
        date: startDate + 'T' + startTime,
        specId: '',
        vidWork: '',
        specialization: '',
        comteg: '',
        comment: '',
        stavka: JSON.stringify({ label: '№1', name: '№1' }),
        taxi: '',
        merch: '',
        projectId: id,
        number: parseInt(eventkey.split(' ')[2]) + 1,
      })
      console.log('arrayCopy: ', arrayCopy)
      setMainspec(arrayCopy)
    }

    //дублировать
    else if (eventkey.split(' ')[0] === '2' || eventkey === '2') {
      const checkedItem = mainspec.find((item) => item.isChecked === true)

      if (checkedItem) {
        console.log('edit all checked')
        handleAllEdit(eventkey)
      } else {
        const dublSpec = mainspec.find((item) => item.id === parseInt(eventkey.split(' ')[1]))
        console.log('dublSpec: ', dublSpec)

        const resAdd = await addMainspec({ projectId: dublSpec.projectId, hr: dublSpec.hr })
        console.log('resAddId: ', resAdd.id)

        const arrayCopy = JSON.parse(JSON.stringify(mainspec))

        arrayCopy.splice(parseInt(eventkey.split(' ')[2]) + 1, 0, {
          id: resAdd.id,
          date: dublSpec.date,
          specId: dublSpec.specId,
          vidWork: dublSpec.vidWork, //JSON.stringify({name: resAdd.vidWork, color: ''}),
          specialization: dublSpec.specialization, //JSON.stringify({name: resAdd.specialization, color: ''}),
          stavka: dublSpec.stavka, //JSON.stringify({name: resAdd.stavka, color: ''}),
          taxi: dublSpec.number,
          merch: dublSpec.merch,
          comment: dublSpec.comment,
          comteg: dublSpec.comteg, //JSON.stringify({name: resAdd.comteg, color: ''}),
          hr: dublSpec.hr,
          projectId: dublSpec.projectId,
        })
        console.log('arrayCopy: ', arrayCopy)
        setMainspec(arrayCopy)
      }
    }
    //добавить разделитель
    else if (eventkey.split(' ')[0] === '3' || eventkey === '3') {
      //добавить строку в основной состав
      const resAdd = await addMainspec({
        projectId: id,
        hr: true,
        number: parseInt(eventkey.split(' ')[2]) + 1,
      })
      console.log('resAddId: ', resAdd.id)

      const arrayCopy = JSON.parse(JSON.stringify(mainspec))

      arrayCopy.splice(parseInt(eventkey.split(' ')[2]) + 1, 0, {
        id: resAdd.id,
        projectId: id,
        hr: true,
      })
      console.log('arrayCopy: ', arrayCopy)
      setMainspec(arrayCopy)
    }

    //удалить
    else if (eventkey.split(' ')[0] === '4') {
      console.log('index: ', eventkey.split(' ')[1])
      const checkedItem = mainspec.find((item) => item.isChecked === true)
      //console.log("checkedItem: ", checkedItem)

      if (checkedItem) {
        handleAllDelete()
      } else {
        setMainspec([...mainspec].filter((item) => item.id !== parseInt(eventkey.split(' ')[1])))
        deleteMainspec(eventkey.split(' ')[1])
      }
    }
  }

  useEffect(() => {
    if (endDate !== '' && endDate !== null) {
      //setEndTime('00:00')
      console.log('endDate: ', endDate)
    }
  }, [endDate])

  const changeDateProject = (e, index) => {
    console.log('change Date: ', index, e.target.value + 'T' + '00:00')
    let arr = []
    arr = [...mainspec]
    // console.log("arr: ", arr)
    arr[index].date = e.target.value + 'T' + arr[index].date?.split('T')[1]
    setMainspec(arr)
  }

  const changeTimeProject = (e, index) => {
    //console.log(e.target.value, index)
    let arr = []
    arr = [...mainspec]
    arr[index].date = arr[index].date.split('T')[0] + 'T' + e.target.value
    setMainspec(arr)
  }

  const changeCommentMain = (e, index) => {
    console.log(e.target.value, index)
    let arr = []
    arr = [...mainspec]
    arr[index].comment = e.target.value
    setMainspec(arr)
  }

  const handleChange = (e) => {
    const { name, checked } = e.target
    console.log('checked: ', name, checked)

    if (name === 'allselect') {
      const checkedvalue = mainspec.map((user) => {
        return { ...user, isChecked: checked }
      })
      console.log(checkedvalue)
      setMainspec(checkedvalue)
    } else {
      console.log('mainspec: ', mainspec)

      const checkedvalue = mainspec.map((user) =>
        user.id === parseInt(name) ? { ...user, isChecked: checked } : user,
      )
      console.log('checkedvalue: ', checkedvalue)
      setMainspec(checkedvalue)
    }
  }

  const handleAllEdit = async (eventkey) => {
    const checkedinputvalue = []
    for (let i = 0; i < mainspec.length; i++) {
      if (mainspec[i].isChecked === true) {
        checkedinputvalue.push(parseInt(mainspec[i].id))
      }
    }
    //console.log("checkedinputvalue: ", checkedinputvalue)

    const arrayCopy = JSON.parse(JSON.stringify(mainspec))
    let arr = []

    checkedinputvalue.map(async (item, index) => {
      //setTimeout(async()=> {
      const dublSpec = mainspec.find((el) => el.id === parseInt(item))
      console.log('dublSpec: ', dublSpec)

      // const resAdd = await addMainspec({projectId: dublSpec.projectId, hr: dublSpec.hr})
      // console.log("resAddId: ", resAdd.id)

      const newObj = {
        //id: resAdd.id,
        date: dublSpec.date,
        specId: dublSpec.specId,
        vidWork: dublSpec.vidWork, //JSON.stringify({name: dublSpec.vidWork, color: ''}),
        specialization: dublSpec.specialization, //JSON.stringify({name: dublSpec.specialization, color: ''}),
        stavka: dublSpec.stavka, //JSON.stringify({name: dublSpec.stavka, color: ''}),
        taxi: dublSpec.taxi,
        merch: dublSpec.merch,
        comment: dublSpec.comment,
        comteg: dublSpec.comteg, //JSON.stringify({name: dublSpec.comteg, color: ''}),
        projectId: dublSpec.projectId,
        hr: dublSpec.hr,
      }

      console.log('newObj: ', newObj)
      arrayCopy.splice(parseInt(eventkey.split(' ')[2]) + 1, 0, newObj)
      //}, 2000)
    })

    console.log('newArr: ', arrayCopy)
    const checkedvalue = arrayCopy.map((user) => {
      return { ...user, isChecked: false }
    })

    // const newCheckArr = checkedvalue.map(async(item)=> {
    //   if (!item.id) {
    //     const resAdd = await addMainspec({projectId: item.projectId, hr: item.hr})
    //     console.log("resAddId: ", resAdd.id)

    //     return {...item, id: resAdd.id}
    //   }
    //   return item

    // })
    // //setMainspec(newCheckArr)

    setMainspec(checkedvalue)
  }

  const handleAllDelete = () => {
    const checkedinputvalue = []
    for (let i = 0; i < mainspec.length; i++) {
      if (mainspec[i].isChecked === true) {
        checkedinputvalue.push(parseInt(mainspec[i].id))
      }
    }

    const copyArray = JSON.parse(JSON.stringify(mainspec))

    checkedinputvalue.map(async (item) => {
      await deleteMainspec(item)
    })

    const result = copyArray.filter((item) => !checkedinputvalue.some((el) => item.id === el))
    console.log('copyArray: ', result)

    setMainspec(result)
  }

  const onChangeCity = (e) => {
    //console.log(e.target.value)
    if (e) {
      setCity(e.target.value)
    } else {
      setCity('')
    }
  }

  const onChangeCompany = (e) => {
    //console.log(e.target.value)
    if (e) {
      setCompanyName(e.target.value)
    } else {
      setCompanyName('')
    }
  }

  const onChangeLocation = (e) => {
    if (e) {
      setLocationProject(e.target.value)
      if (e.target.value === '') {
        setGeoId('')
      }
    } else {
      setLocationProject('')
      setGeoId('')
    }

    //setAddress('')
  }

  // const filterOptions = (options, state) => {
  //   let newOptions = [];
  //   options.forEach((element) => {
  //     if (
  //       element
  //         //.replace(",", "")
  //         .toLowerCase()
  //         .includes(state.inputValue.toLowerCase())
  //     )
  //       newOptions.push(element);
  //   });
  //   return newOptions;
  // };

  const clickSave = () => {}

  // const createPredSmeta = async(id) => {
  // 	// Button begins to shake
  // 	setPress(true);
  // 	console.log(press)

  // 	// Buttons stops to shake after 2 seconds
  // 	setTimeout(() => setPress(false), 200);

  // 	audioIshodCall.play();
  // 	await getSendCall(id)
  // }

  const pressPredSmeta = async () => {
    setPlayPredSmeta(!playPredSmeta)

    //api
    console.log('crmID: ', crmID)
    const resAddSmeta = await getCreatePredSmeta(crmID)
    console.log('resAddSmeta: ', resAddSmeta)

    setTimeout(() => {
      if (resAddSmeta) {
        setDonePredSmeta(true)
      }
    }, 5000)
  }

  const pressFinSmeta = async () => {
    setPlayFinSmeta(!playFinSmeta)

    //api
    console.log('crmID: ', crmID)
    const resAddSmeta = await getCreateFinSmeta(crmID)
    console.log('resAddSmeta: ', resAddSmeta)

    setTimeout(() => {
      if (resAddSmeta) {
        setDoneFinSmeta(true)
      }
    }, 5000)
  }

  const handleCreateReport = async (e) => {
    console.log(e, typeof e)
    const reportRequest = { type: e, crmId: crmID }
    const resTemp = await createWorkersReport(reportRequest)
    console.log('Ответ 2', resTemp)

    const resWorkersReport = await getWorkersReport(crmID)
    console.log('resWorkersReport: ', resWorkersReport)
    setWorkersReport(resWorkersReport)
  }

  const handleSendWorkersReport = async (e) => {
    console.log(e)

    toast.info(`Отчет отправлен менеджеру с id: ${projectChatId}`)

    //send photo
    let poster = 'https://proj.uley.team/upload/poster_akkreditacija.jfif' //poster anketa
    const keyboard = JSON.stringify({
			inline_keyboard: [
				[
					{"text": "XLSX", callback_data:'/report_XLSX'},
          {"text": "PSD", callback_data:'/report_PSD'},
				],
			]
		});
    //const chatId = "805436270"

    const url_send_photo = `https://api.telegram.org/bot${tokenManager}/sendPhoto?chat_id=${projectChatId}&photo=${poster}&reply_markup=${keyboard}`
    console.log(url_send_photo)	
    await $host.get(url_send_photo);
  }

  const handleDeleteReport = async (reportId) => {
    await deleteWorkersReport(reportId)
    const resWorkersReport = await getWorkersReport(crmID)
    console.log('resWorkersReport: ', resWorkersReport)
    setWorkersReport(resWorkersReport)
  }

  const handleDeletePoster = async (posterId) => {
    await deletePoster(posterId)
    const resPosters = await getPosters(crmID)
    console.log('pretendents: ', resPosters)
    setPosters(resPosters)
  }

  const handleSubmitPereklichka = async (e) =>{
    e.preventDefault()    
    const formData = new FormData(e.currentTarget)

    // const newServices = serviceList.map((service) => ({
    //   ...service,
    //   service_price: format(Number(service.service_price)),
    // }))

    const pereclichkaForm = {
      crmID: crmID,
      pereklichkaDateTime: formData.get('pereklichkaDateTime'),
      pereklichkaTechText: formData.get('pereklichkaTechText'),
      pereklichkaStartScenario: formData.get('pereklichkaStartScenario'),
      pereklichkaMerch: formData.get('pereklichkaMerch'),
      pereklichkaWarmClothes: formData.get('pereklichkaWarmClothes'),
      pereklichkaSpecific: formData.get('pereklichkaSpecific'),
      pereklichkaDress: formData.get('pereklichkaDress'),
      
    }
    console.log(pereclichkaForm)
    console.log(mainspec)
    createPereklichkaPoster(pereclichkaForm)
    // navigate('/business/partner')
    
    setVisiblePereklichka(false)
    toast.info('Делаем перекличку')
  }

  const pressPoster = async () => {
    setPlayPoster(!playPoster)
    setShowLoader(true)

    //api
    const resAddPoster = await getCreatePoster(crmID)
    console.log('resAddPoster: ', resAddPoster)

    const resPosters = await getPosters(crmID)
    console.log('pretendents: ', resPosters)
    setPosters(resPosters)

    // setTimeout(() => {
    //   setShowLoader(false)
    // }, 2000)
    setShowLoader(false)
    setPlayPoster(false)
  }

  const pressPereklichka = async () => {
    setPlayPereklichka(!playPereklichka)
    setShowLoader(true)
    setVisiblePereklichka(!visiblePereklichka)

    //api
    //const resAddPoster = await getCreatePoster(crmID)
    //console.log('resAddPoster: ', resAddPoster)

    //const resPosters = await getPosters(crmID)
    //console.log('pretendents: ', resPosters)
    //setPosters(resPosters)

    // setTimeout(() => {
    //   setShowLoader(false)
    // }, 2000)
    // setShowLoader(false)
    // setPlayPereklichka(false)
  }

  const sortDate = () => {
    setCountPressDate(countPressDate + 1)

    if (countPressDate + 1 >= 3) {
      setCountPressDate(0)
    }
    console.log('check sort', countPressDate + 1)

    if (countPressDate + 1 === 1) {
      const sortedWorker = [...pretendents].sort((a, b) => {
        var tgA = a.data,
          tgB = b.data
        return tgA < tgB ? -1 : tgA > tgB ? 1 : 0 //сортировка по возрастанию
      })
      setPretendents(sortedWorker)
    } else if (countPressDate + 1 === 2) {
      const sortedWorker = [...pretendents].sort((a, b) => {
        var tgA = a.data,
          tgB = b.data
        return tgA > tgB ? -1 : tgA < tgB ? 1 : 0 //сортировка по возрастанию
      })
      setPretendents(sortedWorker)
    } else {
      const sortedWorker = [...pretendents].sort((a, b) => {
        var fioA = a.id,
          fioB = b.id
        return fioB - fioA //сортировка по убыванию
      })

      setPretendents(sortedWorker)
    }
  }

  const CustomToggleBottom = React.forwardRef(({ children, onClick }, ref) => (
    <button
      aria-label="Message options"
      style={{ backgroundColor: 'transparent', border: 'none', padding: '0' }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      <img src={btnPlay} alt="" width={30} style={{ marginBottom: '7px' }} />
    </button>
  ))

  CustomToggleBottom.displayName = 'menu'

  const CustomToggleMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('')

      return (
        <div
          ref={ref}
          style={{
            backgroundColor: '#20272b',
            right: '55px',
            borderRadius: '5px',
            padding: '0 0 0 0',
            fontSize: '14px',
            top: '-45px',
            minWidth: '50px',
          }}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled" style={{ marginBottom: '0', padding: '5px 10px' }}>
            {React.Children.toArray(children).filter(
              (child) => !value || child.props.children?.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      )
    },
  )

  CustomToggleMenu.displayName = 'Menu'

  return (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              {/* <h2>Проекты</h2> */}
              <CRow className="mt-2">
                <CCol xs>
                  <CCard
                    className="mb-4"
                    style={{
                      display: showHeader ? 'block' : 'none',
                      position: 'sticky',
                      top: '113px',
                      zIndex: '100',
                    }}
                  >
                    <CCardBody style={{ padding: '5px' }}>
                      <div
                        style={{
                          color: '#fff',
                          zIndex: '100',
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '-webkit-fill-available',
                        }}
                      >
                        <div className="text-field" style={{ marginBottom: '0' }}>
                          <input
                            disabled={true}
                            className="text-field__input"
                            type="text"
                            name="projectId"
                            id="projectId"
                            value={crmID}
                            style={{ width: '120px', marginRight: '25px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <CTooltip content="Удалить" placement="bottom" style={customTooltipStyle}>
                            <Icon
                              id="delete"
                              onClick={() => clickDelete(id)}
                              style={{ cursor: 'pointer' }}
                            />
                          </CTooltip>
                          <img
                            src={Trubka}
                            style={{
                              cursor: 'pointer',
                              width: '24px',
                              height: '24px',
                              marginLeft: '20px',
                            }}
                          />
                          <img
                            src={Tg}
                            style={{
                              cursor: 'pointer',
                              width: '24px',
                              height: '24px',
                              marginLeft: '20px',
                            }}
                          />
                          <img
                            src={zamok}
                            style={{
                              cursor: 'pointer',
                              width: '19px',
                              height: '24px',
                              marginLeft: '20px',
                            }}
                          />
                          <CTooltip
                            content="Сохранить"
                            placement="bottom"
                            style={customTooltipStyle}
                          >
                            <img
                              src={Disketa2}
                              onClick={() => saveProject(id)}
                              style={{
                                cursor: 'pointer',
                                width: '24px',
                                height: '24px',
                                marginLeft: '20px',
                              }}
                            />
                          </CTooltip>
                          <CTooltip content="Закрыть" placement="bottom" style={customTooltipStyle}>
                            <img
                              src={Close}
                              onClick={closeProfile}
                              style={{
                                cursor: 'pointer',
                                width: '19px',
                                height: '24px',
                                marginLeft: '20px',
                              }}
                            />
                          </CTooltip>
                        </div>
                      </div>
                    </CCardBody>
                  </CCard>

                  <CCard className="mb-4">
                    <CCardBody
                      style={{
                        padding: '12px',
                        height: showHeader ? `${height}px` : `${height + 25}px`,
                      }}
                    >
                      {!showProject ? (
                        <Filters
                          setShowCalendar={setShowCalendar}
                          setShowCalendar2={setShowCalendar2}
                          columnFilters={columnFilters}
                          setColumnFilters={setColumnFilters}
                          projects={projects}
                          setProjectsSort={setProjectsSort}
                        />
                      ) : (
                        ''
                      )}
                      {showCalendar ? (
                        // <Calendar openProject={openProject} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                        <h2 style={{ marginTop: '25%', textAlign: 'center' }}>
                          Раздел находится в разработке
                        </h2>
                      ) : showCalendar2 ? (
                        <Calendar2
                          openProject={openProject}
                          projects={projectsSort}
                          setProjects={setProjectsSort}
                          showSidebar={showSidebar}
                          setShowSidebar={setShowSidebar}
                          setShowProject={setShowProject}
                          setShowCalendar={setShowCalendar}
                          setShowCalendar2={setShowCalendar2}
                          setHeight={setHeight}
                        />
                      ) : showProject ? (
                        <div
                          style={{
                            position: 'relative',
                            height: '494px',
                            display: 'flex',
                            flexDirection: 'row',
                            //marginTop: '35px',
                          }}
                        >
                          {/* 1 */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '230px',
                              textAlign: 'center',
                              marginTop: '8px',
                              marginRight: '40px',
                            }}
                          >
                            <label className="title-label"></label>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '25px',
                                width: '230px',
                              }}
                            >
                              <div className="text-field">
                                {/*<input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg" id="dateReg" style={{width: '120px'}}/>*/}
                                <DatePicker
                                  className="uley-datepicker-control text-center text-field__input"
                                  style={{ height: '40px', width: '120px' }}
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  selectsStart
                                  //startDate={startDate}
                                  dateFormat="dd.MM.yyyy"
                                />
                              </div>
                              <div className="text-field">
                                <input
                                  disabled={false}
                                  className="text-field__input"
                                  type="text"
                                  value={startTime}
                                  onChange={(e) => setStartTime(e.target.value)}
                                  name="dateReg2"
                                  id="dateReg2"
                                  style={{ width: '90px' }}
                                />
                              </div>
                            </div>

                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                paddingTop: '25px',
                                width: '230px',
                              }}
                            >
                              <div className="text-field">
                                {/* <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg3" id="dateReg3" style={{width: '120px'}}/> */}
                                <DatePicker
                                  className="uley-datepicker-control text-center text-field__input"
                                  style={{ height: '40px', width: '120px' }}
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  selectsStart
                                  //endDate={endDate}
                                  dateFormat="dd.MM.yyyy"
                                />
                              </div>
                              <div className="text-field">
                                <input
                                  disabled={false}
                                  className="text-field__input"
                                  type="text"
                                  value={endTime}
                                  onChange={(e) => setEndTime(e.target.value)}
                                  name="dateReg4"
                                  id="dateReg4"
                                  style={{ width: '90px' }}
                                />
                              </div>
                            </div>

                            <label className="title-label">Статус</label>
                            <div className="text-field">
                              <MyDropdown4
                                style={{ backgroundColor: '#131c21' }}
                                options={statusData}
                                selected={statusProject}
                                setSelected={setStatusProject}
                                // onChange={addCity}
                              />
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                            </div>

                            <label className="title-label">Старт</label>
                            <div className="text-field">
                              <MyDropdown4
                                style={{ backgroundColor: '#131c21' }}
                                options={startData}
                                selected={startProject}
                                setSelected={setStartProject}
                                placeholder="Выбери старт"
                              />
                            </div>

                            <label className="title-label">Специфика</label>
                            <div className="text-field">
                              <MyDropdown4
                                style={{ backgroundColor: '#131c21' }}
                                options={specifikaData}
                                selected={specifikaProject}
                                setSelected={setSpecifikaProject}
                                placeholder="Выбери специфику"
                                // onChange={addCity}
                              />
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                            </div>

                            <label className="title-label">Комментарии</label>
                            <div className="text-field" style={{ marginBottom: '0px' }}>
                              <textarea
                                className="text-field__input"
                                type="text"
                                name="comment"
                                id="comment"
                                style={{
                                  resize: 'none',
                                  width: '230px',
                                  height: '80px',
                                  whiteSpace: 'pre-line',
                                  borderRadius: '6px',
                                  textAlign: 'left',
                                  marginRight: '40px',
                                }}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </div>
                          </div>

                          {/* 2 */}
                          <div
                            style={{
                              textAlign: 'center',
                              marginTop: '10px',
                              width: '320px',
                              marginRight: '40px',
                            }}
                          >
                            <label className="title-label">Проект</label>
                            <div className="text-field">
                              <input
                                disabled={false}
                                className="text-field__input"
                                type="text"
                                name="projectName"
                                id="projectName"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                style={{ width: '320px' }}
                              />
                            </div>

                            <label className="title-label">Компания</label>
                            <div className="text-field">
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                              <Autocomplete
                                sx={{
                                  display: 'inline-block',
                                  '& input': {
                                    zIndex: '25',
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
                                  },
                                }}
                                className="text-field__input"
                                openOnFocus
                                id="custom-input-company"
                                options={companysData}
                                noOptionsText={'Пусто'}
                                style={{ width: '100%', padding: '0' }}
                                onInputChange={onChangeCompany}
                                //isOptionEqualToValue={(option, value) => option === value}
                                onChange={(event, newValue) => {
                                  if (newValue && newValue.length) {
                                    const comp = companysAll.find((item) => item.title === newValue)
                                    console.log('comp: ', comp)
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
                                  <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                                    <input
                                      className="text-field__input"
                                      type="text"
                                      {...params.inputProps}
                                      placeholder=""
                                    />
                                  </div>
                                )}
                              />
                            </div>

                            <label className="title-label">Город</label>
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
                                  '& input': {
                                    zIndex: '25',
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
                                  },
                                }}
                                className="text-field__input"
                                openOnFocus
                                id="custom-input-demo"
                                options={sortedCities}
                                noOptionsText={'Пусто'}
                                style={{ width: '100%', padding: '0' }}
                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                onInputChange={onChangeCity}
                                onChange={(event, newValue) => {
                                  if (newValue && newValue.length) {
                                    setCity(newValue)
                                  }
                                }}
                                value={city}
                                inputValue={city}
                                renderInput={(params) => (
                                  <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                                    <input
                                      className="text-field__input"
                                      type="text"
                                      {...params.inputProps}
                                      placeholder=""
                                      autoComplete="off"
                                    />
                                  </div>
                                )}
                              />
                            </div>

                            <label className="title-label">Локация</label>
                            <div className="text-field" style={{ width: '320px' }}>
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                              <Autocomplete
                                sx={{
                                  display: 'inline-block',
                                  '& input': {
                                    zIndex: '25',
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
                                  },
                                }}
                                className="text-field__input"
                                openOnFocus
                                id="custom-input-demo"
                                options={platformsData}
                                noOptionsText={'Пусто'}
                                style={{ width: '100%', padding: '0' }}
                                //onInputChange={(e)=>setLocationProject(e.target.value)}
                                onInputChange={onChangeLocation}
                                //onInputChange={(e)=>console.log(e.target.value)}
                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                onChange={(event, newValue) => {
                                  if (newValue && newValue.length) {
                                    setLocationProject(newValue)

                                    const loc = platformsAll.find((item) => item.title === newValue)
                                    console.log('loc: ', loc)
                                    if (loc) {
                                      let text = `${loc.address}`
                                      setAddress(text)
                                      setTrack(loc.track)
                                      setGeoId(loc.id)
                                    }
                                  }
                                }}
                                value={locationProject}
                                inputValue={locationProject}
                                renderInput={(params) => (
                                  <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                                    <input
                                      className="text-field__input"
                                      type="text"
                                      {...params.inputProps}
                                      placeholder=""
                                    />
                                  </div>
                                )}
                              />
                            </div>

                            <div style={{ position: 'relative' }}>
                              <label className="title-label">Адрес</label>
                              <div
                                className="text-field"
                                onMouseOver={() => setShowSaveAddress(true)}
                                onMouseOut={() => setShowSaveAddress(false)}
                              >
                                <img
                                  src={Disketa}
                                  onClick={() => {
                                    navigator.clipboard.writeText(address)
                                  }}
                                  alt=""
                                  style={{
                                    visibility: showSaveAddress ? 'visible' : 'hidden',
                                    position: 'absolute',
                                    top: '10px',
                                    left: '288px',
                                    cursor: 'pointer',
                                    width: '15px',
                                    height: '15px',
                                  }}
                                />
                                <input
                                  className="text-field__input"
                                  type="text"
                                  name="address"
                                  id="address"
                                  value={address}
                                  style={{
                                    resize: 'none',
                                    width: '320px',
                                    height: '40px',
                                    whiteSpace: 'nowrap',
                                    borderRadius: '6px',
                                    textAlign: 'left',
                                  }}
                                />
                              </div>
                            </div>

                            <div style={{ position: 'relative' }}>
                              <label className="title-label">Как добраться</label>
                              <div
                                className="text-field"
                                style={{ marginBottom: '0px' }}
                                onMouseOver={() => setShowSaveTreck(true)}
                                onMouseOut={() => setShowSaveTreck(false)}
                              >
                                <img
                                  src={Disketa}
                                  onClick={() => {
                                    navigator.clipboard.writeText(track)
                                  }}
                                  alt=""
                                  style={{
                                    visibility: showSaveTreck ? 'visible' : 'hidden',
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    cursor: 'pointer',
                                    width: '15px',
                                    height: '15px',
                                  }}
                                />
                                <textarea
                                  className="text-field__input widthBlock5"
                                  type="text"
                                  name="treck"
                                  id="treck"
                                  value={track}
                                  style={{
                                    resize: 'none',
                                    height: '80px',
                                    borderRadius: '6px',
                                    textAlign: 'left',
                                    marginBottom: '0px',
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* 3 */}
                          <div
                            style={{
                              textAlign: 'center',
                              marginTop: '10px',
                              width: '320px',
                              marginRight: '40px',
                            }}
                          >
                            <label className="title-label">Менеджер</label>
                            <div className="text-field">
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                              <Autocomplete
                                sx={{
                                  display: 'inline-block',
                                  '& input': {
                                    zIndex: '25',
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
                                  },
                                }}
                                className="text-field__input"
                                id="custom-input-manager"
                                options={managersData}
                                noOptionsText={'Пусто'}
                                style={{ width: '100%', padding: '0' }}
                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                //filterOptions={filterOptions}
                                //onInputChange={(e)=>setManagerName(e.target.value)}
                                onInputChange={(event, newInputValue) => {
                                  setManagerName(newInputValue)
                                }}
                                onChange={(event, newValue) => {
                                  if (newValue && newValue.length) {
                                    const comp = managersAll.find((item) => item.fio === newValue)
                                    console.log('comp: ', comp)
                                    if (comp) {
                                      setPhone(comp.phone)
                                      setManagerName(comp.fio)
                                    }
                                  }
                                }}
                                value={managerName}
                                inputValue={managerName}
                                renderInput={(params) => (
                                  <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                                    <input
                                      className="text-field__input"
                                      type="text"
                                      {...params.inputProps}
                                      placeholder="ФИО"
                                    />
                                  </div>
                                )}
                              />
                            </div>

                            <label className="title-label">Старший</label>
                            <div className="text-field">
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                              <Autocomplete
                                sx={{
                                  display: 'inline-block',
                                  '& input': {
                                    zIndex: '25',
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
                                  },
                                }}
                                className="text-field__input"
                                openOnFocus
                                id="custom-input-manager2"
                                options={managersData}
                                noOptionsText={'Пусто'}
                                style={{ width: '100%', padding: '0' }}
                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                onInputChange={onChangeManager2}
                                onChange={(event, newValue) => {
                                  if (newValue && newValue.length) {
                                    const comp = managersAll.find((item) => item.fio === newValue)
                                    console.log('comp: ', comp)
                                    if (comp) {
                                      setPhone2(comp.phone)
                                      setManagerName2(comp.fio)
                                    }
                                  }
                                }}
                                value={managerName2}
                                inputValue={managerName2}
                                renderInput={(params) => (
                                  <div ref={params.InputProps.ref} style={{ position: 'relative' }}>
                                    <input
                                      className="text-field__input"
                                      type="text"
                                      {...params.inputProps}
                                      placeholder="ФИО"
                                    />
                                  </div>
                                )}
                              />
                            </div>

                            <label className="title-label">Техническое Задание</label>
                            <div className="text-field" style={{ marginBottom: '0px' }}>
                              <textarea
                                className="text-field__input"
                                type="text"
                                name="comment"
                                id="comment"
                                value={tehText}
                                onChange={(e) => setTehText(e.target.value)}
                                style={{
                                  resize: 'none',
                                  width: '320px',
                                  height: '210px',
                                  whiteSpace: 'pre-line',
                                  borderRadius: '6px',
                                  textAlign: 'left',
                                  marginBottom: '20px',
                                }}
                              />
                            </div>

                            <label
                              className="title-label"
                              style={{
                                marginTop: '44px',
                                position: 'absolute',
                                top: '380px',
                                right: '240px',
                              }}
                            >
                              Техническое Задание
                            </label>

                            <div
                              style={{ display: 'flex', flexDirection: 'row', marginTop: '42px' }}
                            >
                              <div>
                                <div style={{ display: 'flex' }}>
                                  <div className="text-field" style={{ marginBottom: '0px' }}>
                                    <input
                                      disabled={false}
                                      className="text-field__input"
                                      type="text"
                                      name="teh1"
                                      id="teh1"
                                      value={teh1}
                                      onChange={(e) => setTeh1(e.target.value)}
                                      style={{
                                        textAlign: 'left',
                                        width: '160px',
                                        marginRight: '0px',
                                      }}
                                    />
                                  </div>
                                  <div className="text-field" style={{ marginBottom: '0px' }}>
                                    <input
                                      disabled={false}
                                      className="text-field__input"
                                      type="text"
                                      name="teh2"
                                      id="teh2"
                                      value={teh2}
                                      onChange={(e) => setTeh2(e.target.value)}
                                      style={{
                                        textAlign: 'left',
                                        width: '160px',
                                        marginRight: '0px',
                                      }}
                                    />
                                  </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                  <div className="text-field" style={{ marginBottom: '0px' }}>
                                    <input
                                      disabled={false}
                                      className="text-field__input"
                                      type="text"
                                      name="teh3"
                                      id="teh3"
                                      value={teh3}
                                      onChange={(e) => setTeh3(e.target.value)}
                                      style={{
                                        textAlign: 'left',
                                        width: '160px',
                                        marginRight: '0px',
                                      }}
                                    />
                                  </div>
                                  <div className="text-field" style={{ marginBottom: '0px' }}>
                                    <input
                                      disabled={false}
                                      className="text-field__input"
                                      type="text"
                                      name="teh4"
                                      id="teh4"
                                      value={teh4}
                                      onChange={(e) => setTeh4(e.target.value)}
                                      style={{
                                        textAlign: 'left',
                                        width: '160px',
                                        marginRight: '0px',
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 4 */}
                          <div
                            style={{
                              textAlign: 'center',
                              marginTop: '10px',
                              width: '230px',
                              marginRight: '10px',
                            }}
                          >
                            <label className="title-label">Телефон</label>
                            <div className="text-field">
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                              <InputMask
                                className="text-field__input"
                                style={{ width: '230px', marginRight: '10px' }}
                                type="text"
                                name="phone"
                                id="phone"
                                mask="+7 (999) 999-99-99"
                                disabled={true}
                                maskChar=""
                                // onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                placeholder=""
                              ></InputMask>
                            </div>

                            <label className="title-label"> </label>
                            <div className="text-field">
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                              <InputMask
                                className="text-field__input"
                                style={{ width: '230px', marginRight: '10px' }}
                                type="text"
                                name="phone2"
                                id="phone2"
                                mask="+7 (999) 999-99-99"
                                disabled={true}
                                maskChar=""
                                // onChange={(e) => setPhone2(e.target.value)}
                                value={phone2}
                                placeholder=""
                              ></InputMask>
                            </div>

                            <div
                              style={{
                                textAlign: 'left',
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '33px',
                              }}
                            >
                              <label className="title-label" style={{ marginTop: '15px' }}>
                                Предварительная смета
                              </label>

                              <label className="title-label" style={{ marginTop: '20px' }}>
                                Финальная смета
                              </label>

                              <label className="title-label" style={{ marginTop: '20px' }}>
                                Постер
                              </label>

                              <label className="title-label" style={{ marginTop: '20px' }}>
                                Перекличка
                              </label>

                              <label className="title-label" style={{ marginTop: '20px' }}>
                                Списки
                              </label>
                            </div>

                            <div style={{ marginTop: '48px', marginLeft: '-40px' }}>
                              <div style={{ display: 'flex' }}>
                                <div className="text-field" style={{ marginBottom: '0px' }}>
                                  <input
                                    disabled={false}
                                    className="text-field__input"
                                    type="text"
                                    name="teh5"
                                    id="teh5"
                                    value={teh5}
                                    onChange={(e) => setTeh5(e.target.value)}
                                    style={{
                                      textAlign: 'left',
                                      width: '160px',
                                      marginRight: '0px',
                                    }}
                                  />
                                </div>
                                <div className="text-field" style={{ marginBottom: '0px' }}>
                                  <input
                                    disabled={false}
                                    className="text-field__input"
                                    type="text"
                                    name="teh6"
                                    id="teh6"
                                    value={teh6}
                                    onChange={(e) => setTeh6(e.target.value)}
                                    style={{
                                      textAlign: 'left',
                                      width: '160px',
                                      marginRight: '0px',
                                    }}
                                  />
                                </div>
                              </div>
                              <div style={{ display: 'flex' }}>
                                <div className="text-field" style={{ marginBottom: '0px' }}>
                                  <input
                                    disabled={false}
                                    className="text-field__input"
                                    type="text"
                                    name="teh7"
                                    id="teh7"
                                    value={teh7}
                                    onChange={(e) => setTeh7(e.target.value)}
                                    style={{
                                      textAlign: 'left',
                                      width: '160px',
                                      marginRight: '0px',
                                    }}
                                  />
                                </div>
                                <div className="text-field" style={{ marginBottom: '0px' }}>
                                  <input
                                    disabled={false}
                                    className="text-field__input"
                                    type="text"
                                    name="teh8"
                                    id="teh8"
                                    value={teh8}
                                    onChange={(e) => setTeh8(e.target.value)}
                                    style={{
                                      textAlign: 'left',
                                      width: '160px',
                                      marginRight: '0px',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 5 */}
                          <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {/* <label className='title-label'> </label> */}
                            <div
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                padding: '5px',
                                marginTop: '24px',
                              }}
                            >
                              <img
                                src={Trubka}
                                style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                              />
                            </div>

                            {/* <label className='title-label'> </label> */}
                            <div
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                padding: '5px',
                                marginTop: '44px',
                              }}
                            >
                              <img
                                src={Trubka}
                                style={{ cursor: 'pointer', width: '24px', height: '24px' }}
                              />
                            </div>
                            {/* Предварительная смета */}
                            <div
                              onClick={pressPredSmeta}
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                                marginTop: '40px',
                              }}
                            >
                              {playPredSmeta ? (
                                donePredSmeta ? (
                                  <img
                                    src={btnPlay}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                ) : (
                                  <img
                                    src={btnPause}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                )
                              ) : (
                                <img
                                  src={btnStop}
                                  alt=""
                                  width={30}
                                  style={{ marginBottom: '7px' }}
                                />
                              )}
                            </div>
                            {/* Финальная смета */}
                            <div
                              onClick={pressFinSmeta}
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                              }}
                            >
                              {playFinSmeta ? (
                                doneFinSmeta ? (
                                  <img
                                    src={btnStop}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                ) : (
                                  <img
                                    src={btnPlay}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                )
                              ) : (
                                <img
                                  src={btnPause}
                                  alt=""
                                  width={30}
                                  style={{ marginBottom: '7px' }}
                                />
                              )}
                            </div>

                            {/* Постер */}
                            <div
                              onClick={pressPoster}
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                                color: 'blue',
                              }}
                            >
                              {playPoster ? (
                                showLoader ? (
                                  <CSpinner style={{ width: '20px', height: '20px' }} />
                                ) : (
                                  <img
                                    src={btnPause}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                )
                              ) : (
                                <img
                                  src={btnRec}
                                  alt=""
                                  width={30}
                                  style={{ marginBottom: '7px' }}
                                />
                              )}
                            </div>

                            {/* Перекличка старое
                            <div
                              onClick={pressPereklichka}
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                                color: 'blue',
                              }}
                            >
                              {playPereklichka ? (
                                showLoader ? (
                                  <CSpinner style={{ width: '20px', height: '20px' }} />
                                ) : (
                                  <img
                                    src={btnPause}
                                    alt=""
                                    width={30}
                                    style={{ marginBottom: '7px' }}
                                  />
                                  
                                  
                                )
                              ) : (
                                <img
                                  src={btnPlay}
                                  alt=""
                                  width={30}
                                  style={{ marginBottom: '7px' }}
                                />
                               
                              )}
                              <CModal
                                  size="lg"
                                  alignment="center"
                                  visible={visiblePereklichka}
                                  onClose={() => setVisiblePereklichka(!visiblePereklichka)}
                                  aria-labelledby="LiveDemoExampleLabel"
                                  // style={{position: 'relative'}}
                                >
                                 <div style={{display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
                                   <div style={{display: 'flex'}}>
                                    <div>
                                    <label className="title-label">Дата</label>
                                    <div className="text-field">
                                      <input
                                        disabled={false}
                                        className="text-field__input"
                                        type="text"
                                        name="perekDate"
                                        id="perekDate"
                                        // value={projectName}
                                        // onChange={(e) => setProjectName(e.target.value)}
                                        style={{ width: '120px' }}
                                      />
                                    </div></div>
                                    <div>
                                    <label className="title-label">Время</label>
                                    <div className="text-field">
                                      <input
                                        disabled={false}
                                        className="text-field__input"
                                        type="text"
                                        name="perekTime"
                                        id="perekTime"
                                        // value={projectName}
                                        // onChange={(e) => setProjectName(e.target.value)}
                                        style={{ width: '120px' }}
                                      />
                                    </div></div>
                                  </div>
                                  <div >                                   
                                    
                                    <div className="text-field">
                                      <input
                                        disabled={false}
                                        className="text-field__input"
                                        type="text"
                                        name="perekDate"
                                        id="perekDate"
                                        // value={projectName}
                                        // onChange={(e) => setProjectName(e.target.value)}
                                        style={{ width: '350px',  height: '250px' }}
                                      />
                                    </div>
                                    
                                    
                                    
                                    <div className="text-field">
                                      <input
                                        disabled={false}
                                        className="text-field__input"
                                        type="text"
                                        name="perekTime"
                                        id="perekTime"
                                        // value={projectName}
                                        // onChange={(e) => setProjectName(e.target.value)}
                                        style={{ width: '350px',   }}
                                      />
                                    </div>
                                    
                                  </div>
                                 </div>
                                </CModal>
                              
                                      
                                
                                     
                                   
                            </div>*/}
                            <div
                              onClick={pressPereklichka}
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                                color: 'blue',
                              }}
                            > 
                          <img
                                  src={btnPlay}
                                  alt=""
                                  width={30}
                                  style={{ marginBottom: '7px' }}
                                />
                        </div>

                            <CModal
                              alignment="center"
                              size="lg"
                              visible={visiblePereklichka}
                              onClose={() => setVisiblePereklichka(false)}
                              aria-labelledby="VerticallyCenteredExample"
                            >
                              <CModalHeader>
                                <CModalTitle id="VerticallyCenteredExample">
                                  Создание переклички
                                </CModalTitle>
                              </CModalHeader>
                              <CModalBody>
                               <CForm
                                  className="row g-3 needs-validation"
                                  noValidate
                                  // validated={true}
                                  onSubmit={handleSubmitPereklichka}
                                >
                                  <CCol md={6}>
                                    
                                    <CFormSelect
                                    style={{"--form-select-bg": '#1f282c', backgroundColor:"#1f282c"}}        
                                    name="pereklichkaDateTime"
                                      label="Смена"                                       
                                      options={mainSpecDates}
                                    ></CFormSelect>
                                  </CCol>

                                  
                                  <CCol md={6} >
                                     <CFormTextarea
                                    
                                      id="validationTextarea"
                                      name="pereklichkaTechText"
                                      label="Техзадание"
                                      required
                                      
                                    ></CFormTextarea>
                                  </CCol>
                                 
                                  <CCol md={6}>
                                    
                                    <CFormSelect
                                    style={{"--form-select-bg": '#1f282c', backgroundColor:"#1f282c"}}                                  
                                      name="pereklichkaStartScenario"
                                      label="Старт"
                                      options={[
                                        { label: '180 минут', value: '180' },
                                        { label: '150 минут', value: '150' },
                                        { label: '120 минут', value: '120' },
                                        { label: '90 минут', value: '90' },
                                        { label: '60 минут', value: '60' },
                                        { label: '30 минут', value: '30' },
                                        { label: '15 минут', value: '15' },
                                      ]}
                                    ></CFormSelect>
                                    
                                  </CCol>
                                  <CCol xs={6}>
                                    <div style={{display: 'flex', gap: '15px', marginTop: "25px"}}>
                                      <CFormCheck
                                    className="mb-3"
                                    name="pereklichkaMerch"
                                    label="Мерч"
                                    value={"Мерч"}
                                    
                                    
                                  />
                                   <CFormCheck
                                    className="mb-3"
                                    name="pereklichkaDress"
                                    label="Дресс-код"
                                    value={"Дресс-код"}
                                    
                                    
                                  />
                                  
                                   <CFormCheck
                                    className="mb-3"
                                    id="validationFormCheck1"
                                    label="Тёплая одежда"
                                    value={"Тёплая одежда"}
                                    name="pereklichkaWarmClothes"
                                    
                                  /></div>
                                  </CCol>
                                  <CCol xs={6}>
                                    
                                  <CFormCheck
                                    type="radio"
                                    value={"Улица"}
                                    name="pereklichkaSpecific"
                                    label="Улица"
                                    
                                  />
                                  <CFormCheck
                                    className="mb-3"
                                    type="radio"
                                    value={"Помещение"}
                                    name="pereklichkaSpecific"
                                   
                                    label="Помещение"
                             
                                  /></CCol>
                                  <CCol xs={12}>
                                    <CButton color="primary" type="submit">
                                      Отправить
                                    </CButton>
                                  </CCol>
                                </CForm>
                              </CModalBody>

                              {/* <CModalFooter>
                                <CButton color="secondary" onClick={() => setVisiblePassport(false)}>
                                  Отмена
                                </CButton>
                                <CButton color="primary">Сохранить</CButton>
                              </CModalFooter> */}
                            </CModal>

                            {/* Списки */}

                            <div
                              className="text-field text-field__input"
                              style={{
                                textAlign: 'center',
                                height: '40px',
                                width: '40px',
                                marginBottom: '5px',
                                fontSize: '20px',
                                color: 'blue',
                              }}
                            >
                              <Dropdown
                                onSelect={(e) => handleCreateReport(e)}
                                as={ButtonGroup}
                                id={`dropdown-button-drop-up`}
                                drop="up"
                                variant="secondary"
                                title=""
                              >
                                <Dropdown.Toggle
                                  as={CustomToggleBottom}
                                  id="dropdown-custom-components"
                                ></Dropdown.Toggle>
                                <Dropdown.Menu as={CustomToggleMenu}>
                                  <Dropdown.Item eventKey={1} class="dropdown-menu">
                                    ФИО
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey={2} class="dropdown-menu">
                                    Серия / Номер
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey={3} class="dropdown-menu">
                                    Контакты
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey={4} class="dropdown-menu">
                                    Дата рождения
                                  </Dropdown.Item>
                                  <Dropdown.Item eventKey={5} class="dropdown-menu">
                                    Полный фарш
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {/* Сайдбар с комментариями */}
                      <div
                        style={{
                          display: showSidebar ? 'block' : 'none',
                          position: 'absolute',
                          right: '0px',
                          top: '120px',
                          height: '580px',
                          background: '#10171a',
                        }}
                      >
                        <div>
                          <img
                            src={Close}
                            onClick={() => setShowSidebar(false)}
                            style={{ position: 'absolute', top: '15px', right: '15px' }}
                          />
                        </div>

                        <div style={{ width: '20rem' }}></div>
                      </div>
                    </CCardBody>
                  </CCard>

                  <CCard className="mb-4" style={{ display: showMainTable ? 'block' : 'none' }}>
                    <CCardHeader onClick={() => setVisibleA(!visibleA)}>Специалисты</CCardHeader>
                    <CCollapse visible={visibleA}>
                      <CCardBody style={{ padding: '12px' }}>
                        <CTable
                          align="middle"
                          className="mb-0 border"
                          hover
                          responsive
                          style={{
                            fontSize: '16px',
                            overflow: 'hidden',
                            width: '1592px',
                            borderRadius: '5px',
                          }}
                        >
                          <CTableHead className="text-center" color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center" style={{ width: '56px' }}>
                                <CFormCheck
                                  name="allselect"
                                  checked={!mainspec.some((user) => user?.isChecked !== true)}
                                  onChange={handleChange}
                                  style={{
                                    backgroundColor: '#181924',
                                    border: '1px solid #121212',
                                  }}
                                />
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center" style={{ width: '180px' }}>
                                Дата
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '170px' }}
                              >
                                Вид работ
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                ФИО
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              ></CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Специальность
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '40px' }}
                              >
                                Ставка
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              >
                                С
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              >
                                Д
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Комтег
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '170px' }}
                              >
                                Комментарий
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '50px' }}
                              >
                                Мерч
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '50px' }}
                              >
                                Такси
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {mainspec.length > 0
                              ? mainspec.map((item, index) => (
                                  <CTableRow
                                    key={item.id}
                                    v-for="item in tableItems"
                                    style={{ lineHeight: '14px' }}
                                  >
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ position: 'relative', height: '30px' }}
                                    >
                                      <div
                                        className="parent-element"
                                        style={{ position: 'absolute', left: '3px', top: '6px' }}
                                      >
                                        <Dropdown onSelect={changeAddSpec}>
                                          <Dropdown.Toggle
                                            as={CustomToggle}
                                            //id="dropdown-custom-components"
                                            key={item.id}
                                            id={`dropdown-button-drop-${item.id}`}
                                            drop={index === mainspec.length - 1 ? 'up' : 'down'}
                                          ></Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}>
                                            <Dropdown.Item eventKey={`1 ${item.id} ${index}`}>
                                              Добавить
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey={`2 ${item.id} ${index}`}>
                                              Дублировать
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey={`3 ${item.id} ${index}`}>
                                              Разделитель
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey={`4 ${item.id} ${index}`}>
                                              Удалить
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>

                                      <CFormCheck
                                        name={item.id}
                                        checked={item?.isChecked || false}
                                        onChange={handleChange}
                                        style={{
                                          backgroundColor: '#181924',
                                          border: '1px solid #434343',
                                          margin: '0px 5px',
                                          position: 'absolute',
                                          left: '15px',
                                          top: '7px',
                                        }}
                                      />

                                      {/* {item.hr ? '' : <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>} */}
                                      {item.hr ? (
                                        ''
                                      ) : (
                                        <span
                                          style={{ position: 'absolute', left: '45px', top: '8px' }}
                                        >
                                          {item.count}
                                        </span>
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <div style={{ display: 'flex' }}>
                                          <InputMask
                                            mask="99.99.9999"
                                            value={
                                              item.date !== 'undefined'
                                                ? item.date?.split('T')[0]
                                                : ''
                                            }
                                            onChange={(e) => changeDateProject(e, index)}
                                          >
                                            {(inputProps) => (
                                              <CFormInput
                                                {...inputProps}
                                                placeholder=""
                                                disableUnderline
                                                aria-label="sm input example"
                                                style={{
                                                  backgroundColor: 'transparent',
                                                  height: '14px',
                                                  textAlign: 'center',
                                                  border: 'none',
                                                  borderRadius: '5px',
                                                  width: '100px',
                                                }}
                                              />
                                            )}
                                          </InputMask>
                                          <InputMask
                                            mask="99:99"
                                            value={
                                              item.date !== 'undefined'
                                                ? item.date?.split('T')[1]
                                                : ''
                                            }
                                            onChange={(e) => changeTimeProject(e, index)}
                                          >
                                            {(inputProps) => (
                                              <CFormInput
                                                {...inputProps}
                                                placeholder=""
                                                disableUnderline
                                                aria-label="sm input example"
                                                style={{
                                                  backgroundColor: 'transparent',
                                                  height: '14px',
                                                  border: 'none',
                                                  borderRadius: '5px',
                                                  width: '50px',
                                                  padding: '5px 0px',
                                                }}
                                              />
                                            )}
                                          </InputMask>
                                        </div>
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ height: '26px' }}
                                    >
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <MyDropdown5
                                          options={vids}
                                          selected={mainspec}
                                          setSelected={setMainspec}
                                          index={index}
                                          element={'vidWork'}
                                          placeholder="—"
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-left">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <MyDropdown6
                                          options={workersData}
                                          selected={mainspec}
                                          setSelected={setMainspec}
                                          index={index}
                                          element={'specId'}
                                          placeholder=""
                                          style={{ width: '370px' }}
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ padding: '0px 5px' }}
                                    >
                                      {/* <img src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/> */}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <MyDropdown5
                                          options={specOnlyData2}
                                          selected={mainspec}
                                          setSelected={setMainspec}
                                          index={index}
                                          element={'specialization'}
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <MyDropdown5
                                          options={[
                                            { value: 1, label: '№1', name: '№1', color: '' },
                                            { value: 2, label: '№2', name: '№2', color: '' },
                                            { value: 3, label: '№3', name: '№3', color: '' },
                                            { value: 4, label: '№4', name: '№4', color: '' },
                                            { value: 5, label: '№5', name: '№5', color: '' },
                                            { value: 6, label: '№6', name: '№6', color: '' },
                                            { value: 7, label: '№7', name: '№7', color: '' },
                                            { value: 8, label: '№8', name: '№8', color: '' },
                                          ]}
                                          selected={mainspec}
                                          setSelected={setMainspec}
                                          index={index}
                                          element={'stavka'}
                                          style={{ width: '130px' }}
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {/* 🟩 */}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {/* 🟩 */}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <MyDropdown5
                                          options={comtegs}
                                          selected={mainspec}
                                          setSelected={setMainspec}
                                          index={index}
                                          element={'comteg'}
                                          style={{ width: '300px' }}
                                        />
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.hr ? (
                                        <></>
                                      ) : (
                                        <input
                                          name="commentMain"
                                          value={item.comment}
                                          onChange={(e) => changeCommentMain(e, index)}
                                          style={{
                                            backgroundColor: 'transparent',
                                            height: '15px',
                                            textAlign: 'center',
                                            border: 'none',
                                            width: '140px',
                                            padding: '5px 0px',
                                            color: '#f3f3f3',
                                            fontSize: '14px',
                                          }}
                                        ></input>
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {/* ✅ */}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {/* ✅ */}
                                      {item.numder}
                                    </CTableDataCell>
                                  </CTableRow>
                                ))
                              : ''}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCollapse>
                  </CCard>

                  <CCard
                    className="mb-4"
                    style={{ display: showPretendentTable ? 'block' : 'none' }}
                  >
                    <CCardHeader onClick={() => setVisibleB(!visibleB)}>Претенденты</CCardHeader>
                    <CCollapse visible={visibleB}>
                      <CCardBody style={{ padding: '12px' }}>
                        <CTable
                          align="middle"
                          className="mb-0 border"
                          hover
                          responsive
                          style={{
                            fontSize: '16px',
                            overflow: 'auto',
                            width: '1471px',
                            borderRadius: '5px',
                          }}
                        >
                          <CTableHead className="text-center" color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">
                                {/* <CFormCheck
                                  style={{
                                    backgroundColor: '#181924',
                                    border: '1px solid #121212',
                                  }}
                                /> */}
                                <split style={{ position: 'absolute', left: '47px', top: '63px' }}>
                                  {pretendents.length}
                                </split>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                onClick={sortDate}
                                className="text-center"
                                style={{ width: '160px' }}
                              >
                                Дата
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '150px' }}
                              >
                                Статус
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                ФИО
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              ></CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Специальность
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '40px' }}
                              >
                                Проекты
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Комтег
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '170px' }}
                              >
                                Комментарий
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              >
                                С
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              >
                                Д
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {pretendents.length > 0
                              ? pretendents.map((item, index) => (
                                  <CTableRow
                                    key={item.id}
                                    v-for="item in tableItems"
                                    style={{ lineHeight: '14px' }}
                                  >
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ position: 'relative' }}
                                    >
                                      <div
                                        className="parent-element"
                                        style={{ position: 'absolute', left: '5px', top: '6px' }}
                                      >
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            as={CustomToggle}
                                            id="dropdown-custom-components"
                                          ></Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}>
                                            <Dropdown.Item>Добавить</Dropdown.Item>
                                            <Dropdown.Item>Дублировать</Dropdown.Item>
                                            <Dropdown.Item>Разделитель</Dropdown.Item>
                                            <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.data}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      <MyDropdown52
                                        options={[
                                          { label: 'В Проект', name: 'В Проект', color: 'green' },
                                          { label: 'Отказано', name: 'Отказано', color: 'yellow' },
                                          { label: 'Анбординг', name: 'Анбординг', color: 'pink' },
                                          { label: 'Запас', name: 'Запас', color: 'blue' },
                                        ]}
                                        selected={pretendents}
                                        setSelected={setPretendents}
                                        index={index}
                                        setWorker={setPretendents}
                                        element={'status'}
                                        placeholder="—"
                                        style={{ height: '100px' }}
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-left"
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <Link
                                        to={'/specialist'}
                                        state={{ workerId: item.workerId }}
                                        style={{ color: '#f3f3f3' }}
                                      >
                                        {item.fio
                                          ? item.fio.length > 23
                                            ? item.fio.substr(0, 23) + '...'
                                            : item.fio
                                          : ''}
                                      </Link>
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ padding: '0px 5px' }}
                                    >
                                      <img
                                        src={Trubka}
                                        alt=""
                                        onClick={clickSave}
                                        style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <CTooltip
                                        content={item.spec}
                                        placement="bottom"
                                        style={customTooltipStyle}
                                      >
                                        <div>{item.spec}</div>
                                      </CTooltip>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.projectMonth ? item.projectMonth : '0'} |{' '}
                                      {item.projectAll ? item.projectAll : '0'}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.comteg ? (
                                        // <CTooltip
                                        //   content={item.comteg[0]?.name}
                                        //   placement="bottom"
                                        // >
                                        <div>{item.comteg[0]?.name}</div>
                                      ) : (
                                        // </CTooltip>
                                        ''
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      {item.comment ? (
                                        <CTooltip
                                          content={item.comment[0]?.content}
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                            {item.comment[0]?.content &&
                                            item.comment[0]?.content.length > 10
                                              ? item.comment[0]?.content.substr(0, 10) + '...'
                                              : item.comment[0]?.content}
                                          </div>
                                        </CTooltip>
                                      ) : (
                                        ''
                                      )}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">🟩</CTableDataCell>
                                    <CTableDataCell className="text-center">🟩</CTableDataCell>
                                  </CTableRow>
                                ))
                              : ''}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCollapse>
                  </CCard>

                  <CCard
                    className="mb-4"
                    style={{ display: showPosterTable ? 'block' : 'none', margin: 0, padding: 0 }}
                  >
                    <CCardHeader onClick={() => setVisibleC(!visibleC)}>Постеры</CCardHeader>
                    <CCollapse visible={visibleC}>
                      <CCardBody style={{ padding: 0 }}>
                        <CRow className="justify-content-between">
                          <CCol md={6} xl={6} className="align-self-center">
                            {posters && posters.length > 0
                              ? posters.map((item, index) => (
                                  <>
                                    <img
                                      style={{ cursor: 'pointer', margin: '5px 0 5px 5px' }}
                                      alt=""
                                      height={'107'}
                                      width={'190'}
                                      onClick={() => setVisiblePoster(item.id)}
                                      src={`https://storage.yandexcloud.net/uley/${item.url}`}
                                    />
                                    {visiblePoster === item.id && (
                                      <>
                                        <CModal
                                          size="lg"
                                          alignment="center"
                                          visible={visiblePoster}
                                          onClose={() => setVisiblePoster(false)}
                                          aria-labelledby="LiveDemoExampleLabel"
                                          // style={{position: 'relative'}}
                                        >
                                          <div
                                            onMouseEnter={() => setShowPosterMenu('block')}
                                            onMouseLeave={() => setShowPosterMenu('none')}
                                          >
                                            <img
                                              alt=""
                                              src={`https://storage.yandexcloud.net/uley/${item.url}`}
                                              style={{ height: '479px', width: '798px' }}
                                            />
                                            <div
                                              style={{
                                                position: 'absolute',
                                                right: '5px',
                                                top: '5px',
                                                display: showPosterMenu,
                                              }}
                                            >
                                              <a
                                                style={{ verticalAlign: 'middle' }}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                                href={`https://storage.yandexcloud.net/uley/${item.url}`}
                                              >
                                                <CIcon
                                                  style={{
                                                    cursor: 'pointer',
                                                    margin: '0 10px',
                                                    '--ci-primary-color': '#7a8287',
                                                  }}
                                                  size="lg"
                                                  icon={cilVerticalAlignBottom}
                                                  // onClick={handlePasteTemplate}
                                                />
                                              </a>

                                              <Icon
                                                id="delete"
                                                style={{
                                                  cursor: 'pointer',
                                                  color: '#7a8287',
                                                }}
                                                onClick={() => handleDeletePoster(item.id)}
                                              />
                                            </div>
                                          </div>
                                        </CModal>
                                      </>
                                    )}
                                  </>
                                ))
                              : ''}
                          </CCol>
                          <CCol
                            style={{ textAlign: 'right' }}
                            md={6}
                            xl={6}
                            className="align-self-center"
                          >
                            <>
                              {workersReport && workersReport.length > 0
                                ? workersReport.map((item, index) => (
                                    <>
                                      <img
                                        style={{ cursor: 'pointer', margin: '5px 5px 5px 0' }}
                                        alt=""
                                        height={'107'}
                                        width={'190'}
                                        onClick={() => setVisiblePoster(item.id)}
                                        src={`https://testtm.uley.team/files/${item.url}_crop.jpg`}
                                      />
                                      {visiblePoster === item.id && (
                                        <>
                                          <CModal
                                            size="lg"
                                            alignment="center"
                                            visible={visiblePoster}
                                            onClose={() => setVisiblePoster(false)}
                                            aria-labelledby="LiveDemoExampleLabel"
                                            // style={{position: 'relative'}}
                                          >
                                            <div
                                              onMouseEnter={() => setShowPosterMenu('block')}
                                              onMouseLeave={() => setShowPosterMenu('none')}
                                            >
                                              <img
                                                alt=""
                                                src={`https://testtm.uley.team/files/${item.url}.jpg`}
                                                style={{ width: '798px' }}
                                              />
                                              <div
                                                style={{
                                                  position: 'absolute',
                                                  right: '5px',
                                                  top: '5px',
                                                  display: showPosterMenu,
                                                }}
                                              >
                                                <CIcon
                                                  style={{
                                                    cursor: 'pointer',
                                                    margin: '0 10px',
                                                    '--ci-primary-color': '#7a8287',
                                                  }}
                                                  size="lg"
                                                  icon={cilSend}
                                                  onClick={() => handleSendWorkersReport(item)}
                                                />

                                                <a
                                                  style={{ verticalAlign: 'middle' }}
                                                  rel="noopener noreferrer"
                                                  target="_blank"
                                                  href={`https://testtm.uley.team/files/${item.url}.pdf`}
                                                >
                                                  <CIcon
                                                    style={{
                                                      cursor: 'pointer',
                                                      margin: '0 10px',
                                                      '--ci-primary-color': '#7a8287',
                                                    }}
                                                    size="lg"
                                                    icon={cilVerticalAlignBottom}
                                                    // onClick={handlePasteTemplate}
                                                  />
                                                </a>

                                                <Icon
                                                  id="delete"
                                                  style={{
                                                    cursor: 'pointer',
                                                    color: '#7a8287',
                                                  }}
                                                  onClick={() => handleDeleteReport(item.id)}
                                                />
                                              </div>
                                            </div>
                                          </CModal>
                                        </>
                                      )}
                                    </>
                                  ))
                                : ''}
                            </>
                          </CCol>
                        </CRow>
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
                <CModalBody
                  style={{
                    height: '100px',
                    textAlign: 'center',
                    fontSize: '18px',
                    paddingTop: '35px',
                  }}
                >
                  Данные успешно сохранены
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
                <CModalBody>Проект будет удален из базы!</CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                    Отмена
                  </CButton>
                  <CButton color="primary" onClick={() => deleteProfile(id)}>
                    Удалить
                  </CButton>
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
