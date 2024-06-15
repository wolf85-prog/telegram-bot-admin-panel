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

import { Plan } from "./../components/index"

import { 
  getProjectId, 
  newPlan, 
  getPlan, 
  addTimer,
  newDistributionW, 
  getDistributionsW, 
  getDistributionsWPlan, 
  delDistributionWPlan,
  editDistributionWPlan,
  editDistributionW,
} from 'src/http/adminAPI';

const DistributionWPlaner = () => {
  const location = useLocation()
  //const [distributionsWork, setDistributionsWork]= useState([]);
  const { addNewDistrib, setDistributionsWork } = useUsersContext();

  const projectId= location.state?.project
  const labelName= location.state?.labelProj
  const textDistr= location.state?.text
  const catDistr= location.state?.category
  const countReceiver= location.state?.count
  const dateDistrib = location.state?.date
  const imageDistrib = location.state?.image
  const showEditButtonAdd = location.state?.showbuttons
  const textButton = location.state?.textbutton
  const selected = location.state?.selected
  const uuidDistrib = location.state?.uuid
  const stavka = location.state?.stavka
  const target = location.state?.target


  // console.log("catDistr: ", catDistr)
  // console.log("countReceiver: ", countReceiver)
  // console.log("dateDistrib: ", dateDistrib)
  // console.log("imageDistrib: ", imageDistrib)
  // console.log("selected: ", selected)
  // console.log("labelName: ", labelName)
  // console.log("uuidDistrib: ", uuidDistrib)
  // console.log("textButton: ", textButton)
  

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
  
  //день 2
  d.setDate(d.getDate() + 1);
  const month2 = String(d.getMonth()+1).padStart(2, "0");
	const day2 = String(d.getDate()).padStart(2, "0");
  const date_str2 = `${day2}.${month2}`;

  //день 3
  const d3 = d.setDate(d.getDate() + 1);
  const month3 = String(d.getMonth()+1).padStart(2, "0");
	const day3 = String(d.getDate()).padStart(2, "0");
  const year3 = d.getFullYear()
  const date_str3 = `${day3}.${month3}`;

  //день 4
  const d4 =  d.setDate(d.getDate() + 1);
  const month4 = String(d.getMonth()+1).padStart(2, "0");
	const day4 = String(d.getDate()).padStart(2, "0");
  const year4 = d.getFullYear()
  const date_str4 = `${day4}.${month4}`;

  //день 5
  const d5 = d.setDate(d.getDate() + 1);
  const month5 = String(d.getMonth()+1).padStart(2, "0");
	const day5 = String(d.getDate()).padStart(2, "0");
  const year5 = d.getFullYear()
  const date_str5 = `${day5}.${month5}`;

  //день 6
  const d6 =  d.setDate(d.getDate() + 1);
  const month6 = String(d.getMonth()+1).padStart(2, "0");
	const day6 = String(d.getDate()).padStart(2, "0");
  const year6 = d.getFullYear()
  const date_str6 = `${day6}.${month6}`;

  //день 7
  const d7 = d.setDate(d.getDate() + 1);
  const month7 = String(d.getMonth()+1).padStart(2, "0");
	const day7 = String(d.getDate()).padStart(2, "0");
  const year7 = d.getFullYear()
  const date_str7 = `${day7}.${month7}`;

  //день 8
  const d8 = d.setDate(d.getDate() + 1);
  const month8 = String(d.getMonth()+1).padStart(2, "0");
	const day8 = String(d.getDate()).padStart(2, "0");
  const year8 = d.getFullYear()
  const date_str8 = `${day8}.${month8}`;

  const year = d.getFullYear();


  //день 1
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

//----------------------------------------------------------
//день 2
const [dates2, setDates2] = useState([
  {date: date_str2, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates22, setDates22] = useState([
  {date: date_str2, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates222, setDates222] = useState([
  {date: date_str2, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str2, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 3
const [dates3, setDates3] = useState([
  {date: date_str3, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates33, setDates33] = useState([
  {date: date_str3, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates333, setDates333] = useState([
  {date: date_str3, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str3, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 4
const [dates4, setDates4] = useState([
  {date: date_str4, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates44, setDates44] = useState([
  {date: date_str4, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates444, setDates444] = useState([
  {date: date_str4, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str4, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 5
const [dates5, setDates5] = useState([
  {date: date_str5, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates55, setDates55] = useState([
  {date: date_str5, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates555, setDates555] = useState([
  {date: date_str5, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str5, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 6
const [dates6, setDates6] = useState([
  {date: date_str6, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates66, setDates66] = useState([
  {date: date_str6, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates666, setDates666] = useState([
  {date: date_str6, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str6, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 7
const [dates7, setDates7] = useState([
  {date: date_str7, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates77, setDates77] = useState([
  {date: date_str7, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates777, setDates777] = useState([
  {date: date_str7, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str7, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//день 8
const [dates8, setDates8] = useState([
  {date: date_str8, time: '06:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '07:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '08:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '09:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '10:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '11:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates88, setDates88] = useState([
  {date: date_str8, time: '12:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '13:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '14:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '15:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '16:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '17:00', proj: '', save: false, go: false,  uuid: ""},
])

const [dates888, setDates888] = useState([
  {date: date_str8, time: '18:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '19:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '20:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '21:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '22:00', proj: '', save: false, go: false,  uuid: ""},
  {date: date_str8, time: '23:00', proj: '', save: false, go: false,  uuid: ""},
])

//----------------------------------------------------------

  const [projectName, setProjectName] = useState('')
  const [projectView, setProjectView] = useState(false)
  //date
  const [value1, setValue1] = useState([false, false, false, false, false, false, false])
  const [value2, setValue2] = useState([false, false, false, false, false, false, false])
  const [value3, setValue3] = useState([false, false, false, false, false, false, false])

  //date2
  const [value21, setValue21] = useState([false, false, false, false, false, false, false])
  const [value22, setValue22] = useState([false, false, false, false, false, false, false])
  const [value23, setValue23] = useState([false, false, false, false, false, false, false])

  //date3
  const [value31, setValue31] = useState([false, false, false, false, false, false, false])
  const [value32, setValue32] = useState([false, false, false, false, false, false, false])
  const [value33, setValue33] = useState([false, false, false, false, false, false, false])

  //date4
  const [value41, setValue41] = useState([false, false, false, false, false, false, false])
  const [value42, setValue42] = useState([false, false, false, false, false, false, false])
  const [value43, setValue43] = useState([false, false, false, false, false, false, false])

  //date5
  const [value51, setValue51] = useState([false, false, false, false, false, false, false])
  const [value52, setValue52] = useState([false, false, false, false, false, false, false])
  const [value53, setValue53] = useState([false, false, false, false, false, false, false])

  //date6
  const [value61, setValue61] = useState([false, false, false, false, false, false, false])
  const [value62, setValue62] = useState([false, false, false, false, false, false, false])
  const [value63, setValue63] = useState([false, false, false, false, false, false, false])

  //date7
  const [value71, setValue71] = useState([false, false, false, false, false, false, false])
  const [value72, setValue72] = useState([false, false, false, false, false, false, false])
  const [value73, setValue73] = useState([false, false, false, false, false, false, false])

  //date8
  const [value81, setValue81] = useState([false, false, false, false, false, false, false])
  const [value82, setValue82] = useState([false, false, false, false, false, false, false])
  const [value83, setValue83] = useState([false, false, false, false, false, false, false])

  const [showLoader, setShowLoader] = useState(true)
  const [showSave, setShowSave] = useState(false)

  const [showPlan3, setShowPlan3] = useState(false)
  const [showPlan4, setShowPlan4] = useState(false)
  const [showPlan5, setShowPlan5] = useState(false)
  const [showPlan6, setShowPlan6] = useState(false)
  const [showPlan7, setShowPlan7] = useState(false)
  const [showPlan8, setShowPlan8] = useState(false)

  const [needDate3, setNeedDate3] = useState("")
  const [needDate4, setNeedDate4] = useState("")
  const [needDate5, setNeedDate5] = useState("")
  const [needDate6, setNeedDate6] = useState("")
  const [needDate7, setNeedDate7] = useState("")
  const [needDate8, setNeedDate8] = useState("")

  const [countClick, setCountClick] = useState(0)

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  let arr = []

  const navigate = useNavigate();
  const backPage = () => {
       navigate('/distributionw');
  } 

  useEffect(() => {
    const fetchData = async () => {
      //let project = await getProjectId(projectId);
      //console.log('Текущий проект: ', project.properties.Name.title[0]?.plain_text)
      setShowLoader(false)
      //setProjectName(project.properties.Name.title[0]?.plain_text)
      setProjectName(labelName)
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

      //открываем план день 1
      if (plan !== null) {
        const planTimes = JSON.parse(plan.times)

        const ind1 = planTimes.findIndex(date => date.time === '12:00')
        const ind2 = planTimes.findIndex(date => date.time === '18:00')

        const times = planTimes.slice(0, ind1);
        const times2 = planTimes.slice(ind1, ind2);
        const times3 = planTimes.slice(ind2, planTimes.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value1[index] = true
            setValue1(value1)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value2[index] = true
            setValue2(value2)
          }
        })

        times3.forEach((time, index)=> {
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

        times.forEach((time, index)=> {
          if (time.save) {
            value21[index] = true
            setValue21(value21)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value22[index] = true
            setValue22(value22)
          }
        })

        times3.forEach((time, index)=> {
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
      dates.forEach((time, index)=> {
        console.log("time: ", chas)
        if (time.time.split(":")[0] <= chas) {
          timeold1[index] = true
          setTimeold1(timeold1)
        }
      })

      dates1.forEach((time, index)=> {
        if (time.time.split(":")[0] <= chas ) {
          timeold2[index] = true
          setTimeold2(timeold2)
        }
      })

      dates11.forEach((time, index)=> {
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

  const changeStatus2 = (ind, tab) => {
    if (tab === 1) {
      if (dates2[ind].save === true) {
        value21[ind] = false
        dates2[ind].save = false
        dates2[ind].proj = ''
        dates2[ind].uuid = ''
      } else {
        value21[ind] = true
        dates2[ind].proj = projectName //location.state.project
        dates2[ind].uuid = uuidDistrib
        dates2[ind].save = true
      }

      setDates2(dates2)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates22[ind].proj = ''
        dates22[ind].uuid = ''
        dates22[ind].save = false
      } else {
        value22[ind] = true
        dates22[ind].proj = projectName //location.state.project
        dates22[ind].uuid = uuidDistrib
        dates22[ind].save = true
      } 

      setDates22(dates22)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates222[ind].proj = ''
        dates222[ind].uuid = ''
        dates222[ind].save = false
      } else {
        value23[ind] = true
        dates222[ind].proj = projectName //location.state.project
        dates222[ind].uuid = uuidDistrib
        dates222[ind].save = true
      } 

      setDates222(dates222)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus3 = (ind, tab) => {
    if (tab === 1) {
      if (dates3[ind].save === true) {
        value31[ind] = false
        dates3[ind].save = false
        dates3[ind].proj = ''
        dates3[ind].uuid = ''
      } else {
        value31[ind] = true
        dates3[ind].proj = projectName //location.state.project
        dates3[ind].uuid = uuidDistrib
        dates3[ind].save = true
      }

      setDates3(dates3)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value32[ind]) {
        value32[ind] = false
        dates33[ind].proj = ''
        dates33[ind].uuid = ''
        dates33[ind].save = false
      } else {
        value32[ind] = true
        dates33[ind].proj = projectName //location.state.project
        dates33[ind].uuid = uuidDistrib
        dates33[ind].save = true
      } 

      setDates33(dates33)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates333[ind].proj = ''
        dates333[ind].uuid = ''
        dates333[ind].save = false
      } else {
        value23[ind] = true
        dates333[ind].proj = projectName //location.state.project
        dates333[ind].uuid = uuidDistrib
        dates333[ind].save = true
      } 

      setDates333(dates333)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus4 = (ind, tab) => {
    if (tab === 1) {
      if (dates4[ind].save === true) {
        value21[ind] = false
        dates4[ind].save = false
        dates4[ind].proj = ''
        dates4[ind].uuid = ''
      } else {
        value21[ind] = true
        dates4[ind].proj = projectName //location.state.project
        dates4[ind].uuid = uuidDistrib
        dates4[ind].save = true
      }

      setDates4(dates4)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates44[ind].proj = ''
        dates44[ind].uuid = ''
        dates44[ind].save = false
      } else {
        value22[ind] = true
        dates44[ind].proj = projectName //location.state.project
        dates44[ind].uuid = uuidDistrib
        dates44[ind].save = true
      } 

      setDates44(dates44)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates444[ind].proj = ''
        dates444[ind].uuid = ''
        dates444[ind].save = false
      } else {
        value23[ind] = true
        dates444[ind].proj = projectName //location.state.project
        dates444[ind].uuid = uuidDistrib
        dates444[ind].save = true
      } 

      setDates444(dates444)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus5 = (ind, tab) => {
    if (tab === 1) {
      if (dates5[ind].save === true) {
        value21[ind] = false
        dates5[ind].save = false
        dates5[ind].proj = ''
        dates5[ind].uuid = ''
      } else {
        value21[ind] = true
        dates5[ind].proj = projectName //location.state.project
        dates5[ind].uuid = uuidDistrib
        dates5[ind].save = true
      }

      setDates2(dates2)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates55[ind].proj = ''
        dates55[ind].uuid = ''
        dates55[ind].save = false
      } else {
        value22[ind] = true
        dates55[ind].proj = projectName //location.state.project
        dates55[ind].uuid = uuidDistrib
        dates55[ind].save = true
      } 

      setDates55(dates55)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates555[ind].proj = ''
        dates555[ind].uuid = ''
        dates555[ind].save = false
      } else {
        value23[ind] = true
        dates555[ind].proj = projectName //location.state.project
        dates555[ind].uuid = uuidDistrib
        dates555[ind].save = true
      } 

      setDates555(dates555)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus6 = (ind, tab) => {
    if (tab === 1) {
      if (dates6[ind].save === true) {
        value21[ind] = false
        dates6[ind].save = false
        dates6[ind].proj = ''
        dates6[ind].uuid = ''
      } else {
        value21[ind] = true
        dates6[ind].proj = projectName //location.state.project
        dates6[ind].uuid = uuidDistrib
        dates6[ind].save = true
      }

      setDates6(dates6)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates66[ind].proj = ''
        dates66[ind].uuid = ''
        dates66[ind].save = false
      } else {
        value22[ind] = true
        dates66[ind].proj = projectName //location.state.project
        dates66[ind].uuid = uuidDistrib
        dates66[ind].save = true
      } 

      setDates66(dates22)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates666[ind].proj = ''
        dates666[ind].uuid = ''
        dates666[ind].save = false
      } else {
        value23[ind] = true
        dates666[ind].proj = projectName //location.state.project
        dates666[ind].uuid = uuidDistrib
        dates666[ind].save = true
      } 

      setDates666(dates666)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus7 = (ind, tab) => {
    if (tab === 1) {
      if (dates7[ind].save === true) {
        value21[ind] = false
        dates7[ind].save = false
        dates7[ind].proj = ''
        dates7[ind].uuid = ''
      } else {
        value21[ind] = true
        dates7[ind].proj = projectName //location.state.project
        dates7[ind].uuid = uuidDistrib
        dates7[ind].save = true
      }

      setDates7(dates7)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates77[ind].proj = ''
        dates77[ind].uuid = ''
        dates77[ind].save = false
      } else {
        value22[ind] = true
        dates77[ind].proj = projectName //location.state.project
        dates77[ind].uuid = uuidDistrib
        dates77[ind].save = true
      } 

      setDates77(dates77)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates777[ind].proj = ''
        dates777[ind].uuid = ''
        dates777[ind].save = false
      } else {
        value23[ind] = true
        dates777[ind].proj = projectName //location.state.project
        dates777[ind].uuid = uuidDistrib
        dates777[ind].save = true
      } 

      setDates777(dates777)
      setValue23(value23)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus8 = (ind, tab) => {
    if (tab === 1) {
      if (dates8[ind].save === true) {
        value21[ind] = false
        dates8[ind].save = false
        dates8[ind].proj = ''
        dates8[ind].uuid = ''
      } else {
        value21[ind] = true
        dates8[ind].proj = projectName //location.state.project
        dates8[ind].uuid = uuidDistrib
        dates8[ind].save = true
      }

      setDates8(dates8)
      setValue1(value1) 
    }

    if (tab === 2) {
      if (value22[ind]) {
        value22[ind] = false
        dates88[ind].proj = ''
        dates88[ind].uuid = ''
        dates88[ind].save = false
      } else {
        value22[ind] = true
        dates88[ind].proj = projectName //location.state.project
        dates88[ind].uuid = uuidDistrib
        dates88[ind].save = true
      } 

      setDates88(dates88)
      setValue22(value22)
    }

    if (tab === 3) {
      if (value23[ind]) {
        value23[ind] = false
        dates888[ind].proj = ''
        dates888[ind].uuid = ''
        dates888[ind].save = false
      } else {
        value23[ind] = true
        dates888[ind].proj = projectName //location.state.project
        dates888[ind].uuid = uuidDistrib
        dates888[ind].save = true
      } 

      setDates888(dates888)
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}

//-----------------table 3-----------------------------------------------------------------------------
const clickShowEditTime3 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}

//-----------------table 4-----------------------------------------------------------------------------
const clickShowEditTime4 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}


//-----------------table 5-----------------------------------------------------------------------------
const clickShowEditTime5 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}


//-----------------table 6-----------------------------------------------------------------------------
const clickShowEditTime6 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}


//-----------------table 7-----------------------------------------------------------------------------
const clickShowEditTime7 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
            value23[index] = item.save
          })
          setValue23(value23)           
        }        
      }
    }
  }

}


//-----------------table 8-----------------------------------------------------------------------------
const clickShowEditTime8 = (t, ind, tab) => {

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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates2(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
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
            arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates22(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates222(arr)

        //изменить чек
        arr.forEach((item, index)=> {
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
          arr.forEach((item, index)=> {
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
  //==========================================================================
  // запланировать (сохранить) рассылки
  //=========================================================================
  const savePlan = async() => {
    setShowSave(true)

    // console.log("категории: ", catDistr)
    // console.log("текст: ", textDistr)
    // console.log("постер: ", imageDistrib)
    // console.log("получатели: ", selected)

    const d_str = new Date() //текущая дата
    const d_str2 = new Date()  
    d_str2.setDate(d_str2.getDate() + 1) //завтрашний день

    
    const obj = {
      id: uuidDistrib, 
      date: d_str.toLocaleDateString(),
    }
    const obj2 = {
      id: uuidDistrib, 
      date: d_str2.toLocaleDateString(),
    }

    //(удалить предыдущие записи запланированных рассылок)
    const res = await delDistributionWPlan(obj) //editDistributionWPlan(obj)
    const res2 = await delDistributionWPlan(obj2) //editDistributionWPlan(obj2)
    

    //1. сохранить все галочки и название проектов в массиве
    const newArray = [].concat(dates, dates1, dates11);
    const planer_str = JSON.stringify(newArray)
    //console.log("dates: ", newArray)

    const newArray2 = [].concat(dates2, dates22, dates222);
    const planer_str2 = JSON.stringify(newArray2)

    const planer_str3 = JSON.stringify(dates3)
    console.log("dates3: ", dates3)



    //обновить план
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

    //console.log("catDistr2: ", catDistr)
    let str_cats
    if (typeof catDistr === 'string') {
      str_cats = catDistr.split(',').map(item => item).join(',')
    } else {
      str_cats = catDistr.map(item => item).join(',')
    }
    

    const d = new Date();
    const year = d.getFullYear();

    //массив дат 1-го дня
    newArray.forEach(async (item)=> {
      
      if (item.save === true && item.uuid === uuidDistrib && item.go === false ) {

        //новая рассылка
        const message = {
          //name: 'Рассылка', 
          text: textDistr, 
          image: imageDistrib ? imageDistrib : '', 
          project: labelName, 
          projectId: projectId, 
          receivers: str_cats, 
          datestart: `${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`, 
          delivered: 'false',  
          count: countReceiver,
          date: `${day}.${month}.${year}`,  
          button: textButton ? textButton: "",
          users: selected.toString(), 
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd, 
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib = await newDistributionW(message) 
        console.log("Рассылка: ", dataDistrib)      
      } 
    })

    //массив дат 2-го дня
    newArray2.forEach(async (item)=> {
      if (item.save === true && item.uuid === uuidDistrib && item.go === false) {

        //новая рассылка
        const message = {
          text: textDistr, 
          image: imageDistrib ? imageDistrib : '', 
          project: labelName, 
          projectId: projectId, 
          receivers: str_cats, 
          datestart: `${year}-${item.date.split('.')[1]}-${item.date.split('.')[0]}T${item.time}:00`, 
          delivered: 'false',  
          count: countReceiver,
          date: `${day2}.${month2}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib2 = await newDistributionW(message)
        console.log("Рассылка2: ", dataDistrib2)
      } 
    })

    //обновить список рассылок
    await addNewDistrib(true)

    addToast(exampleToast) //уведомление - ваш план сохранен
    setShowSave(false)

    setTimeout(() => backPage(), 2000);
  }


  const saveNeedDate3 = (date) => {
    setNeedDate3(date)
    setShowPlan3(true)
  }

  const saveNeedDate4 = (date) => {
    setNeedDate4(date)
    setShowPlan4(true)
  }

  const saveNeedDate5 = (date) => {
    setNeedDate5(date)
    setShowPlan5(true)
  }

  const saveNeedDate6 = (date) => {
    setNeedDate6(date)
    setShowPlan6(true)
  }

  const saveNeedDate7 = (date) => {
    setNeedDate7(date)
    setShowPlan7(true)
  }

  const saveNeedDate8 = (date) => {
    setNeedDate8(date)
    setShowPlan8(true)
  }


  const saveNeedDate = (d3, count) => {
    console.log("count: ", count)
    setCountClick(count+1)
    if (count === 0) {
      setNeedDate3(d3)
      setShowPlan3(true)
    }
    if (count === 1) {
      setNeedDate4(d4)
      setShowPlan4(true)
    }
    if (count === 2) {
      setNeedDate5(d5)
      setShowPlan5(true)
    }
    if (count === 3) {
      setNeedDate6(d6)
      setShowPlan6(true)
    }
    if (count === 4) {
      setNeedDate7(d7)
      setShowPlan7(true)
    }
    if (count === 5) {
      setNeedDate8(d8)
      setShowPlan8(true)
    }
    
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
{/* 1-й день */}
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

<br/>

{/* 2-й день */}
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
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
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

{/* 3-й день */}
{showPlan3 ? 
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
                                          <div>{date_str3}</div> 
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
                                              <div onClick={()=>clickShowEditTime3(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus3(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str3}</div> 
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
                                              <div onClick={()=>clickShowEditTime3(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus3(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str3}</div> 
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
                                              <div onClick={()=>clickShowEditTime3(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus3(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

<br/>

{/* 4-й день */}
{showPlan4 ? 
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
                                          <div>{date_str4}</div> 
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
                                              <div onClick={()=>clickShowEditTime4(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus4(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str4}</div> 
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
                                              <div onClick={()=>clickShowEditTime4(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus4(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str4}</div> 
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
                                              <div onClick={()=>clickShowEditTime4(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus4(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

<br/>

{/* 5-й день */}
{showPlan5 ? 
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
                                          <div>{date_str5}</div> 
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
                                              <div onClick={()=>clickShowEditTime5(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus5(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str5}</div> 
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
                                              <div onClick={()=>clickShowEditTime5(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus5(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str5}</div> 
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
                                              <div onClick={()=>clickShowEditTime5(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus5(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

<br/>

{/* 6-й день */}
{showPlan6 ? 
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
                                          <div>{date_str6}</div> 
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
                                              <div onClick={()=>clickShowEditTime6(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus6(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str6}</div> 
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
                                              <div onClick={()=>clickShowEditTime6(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus6(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str6}</div> 
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
                                              <div onClick={()=>clickShowEditTime6(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus6(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

<br/>

{/* 7-й день */}
{showPlan7 ? 
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
                                          <div>{date_str7}</div> 
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
                                              <div onClick={()=>clickShowEditTime7(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus7(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str7}</div> 
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
                                              <div onClick={()=>clickShowEditTime7(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus7(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str7}</div> 
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
                                              <div onClick={()=>clickShowEditTime7(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus7(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

<br/>

{/* 8-й день */}                              
{showPlan8 ? 
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
                                          <div>{date_str8}</div> 
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
                                              <div onClick={()=>clickShowEditTime8(`${item.time}`, index, 1)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab1"
                                              checked={value21[index]}
                                              onChange={()=>changeStatus8(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold21[index])  ? '' : 'disabled'}
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
                                          <div>{date_str8}</div> 
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
                                              <div onClick={()=>clickShowEditTime8(`${item.time}`, index, 2)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab2"
                                              checked={value22[index]}
                                              onChange={()=>changeStatus8(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold22[index])  ? '' : 'disabled'}
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
                                          <div>{date_str8}</div> 
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
                                              <div onClick={()=>clickShowEditTime8(`${item.time}`, index, 3)} >{item.time}</div>
                                            </div>
                                          </CTableDataCell>
                                          <CTableDataCell style={{width: '180px'}}>
                                            <div style={{display: item.proj ? "block": "none", color: item.go ? '#2eb85c': ''}}>{item.proj}</div>
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center" style={{width: '50px'}}>
                                            <CFormCheck 
                                              id="rowCheckTab3"
                                              checked={value23[index]}
                                              onChange={()=>changeStatus8(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold23[index])  ? '' : 'disabled'}
                                            />
                                          </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                    </CTableBody>
                                  </CTable>
                                  </div>
                                </CCol>
                              </CRow>
: <></>}

                              {/* {showPlan3 ? <Plan  uuidDistrib={uuidDistrib} needDate={d3} arrayDate={dates3} setArrayDate={setDates3} /> : <></>}
                              {showPlan4 ? <Plan  uuidDistrib={uuidDistrib} needDate={d4} /> : <></>}
                              {showPlan5 ? <Plan  uuidDistrib={uuidDistrib} needDate={d5} /> : <></>}
                              {showPlan6 ? <Plan  uuidDistrib={uuidDistrib} needDate={d6} /> : <></>}
                              {showPlan7 ? <Plan  uuidDistrib={uuidDistrib} needDate={d7} /> : <></>}
                              {showPlan8 ? <Plan  uuidDistrib={uuidDistrib} needDate={d8} /> : <></>} */}

<br/> 
                            {/* <CRow>
                              <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CButton color="secondary" onClick={() => saveNeedDate3(date_str3)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str3}</CButton>
                                <CButton color="secondary" onClick={() => saveNeedDate4(date_str4)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str4}</CButton>
                                <CButton color="secondary" onClick={() => saveNeedDate5(date_str5)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str5}</CButton>
                                <CButton color="secondary" onClick={() => saveNeedDate6(date_str6)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str6}</CButton>
                                <CButton color="secondary" onClick={() => saveNeedDate7(date_str7)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str7}</CButton>
                                <CButton color="secondary" onClick={() => saveNeedDate8(date_str8)} style={{width: '90px', fontSize: '12px', marginRight: '10px'}}>{date_str8}</CButton>
                              </div>
                              
                            </CRow> */}

                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
                              <div style={{marginRight: '16px'}}>
                                <Link to={'/distributionw_add'}>
                                  <CButton color="secondary" style={{width: '130px'}}>Назад</CButton>
                                </Link>
                              </div>
                              <div>
                                <CButton color="secondary" onClick={() => saveNeedDate(date_str3, countClick)}>Ещё</CButton> 
                              </div>
                              <div>
                                <CButton color="primary" onClick={savePlan} style={{width: '130px'}}>{showSave ? <CSpinner style={{width: '20px', height: '20px'}}/> : 'Сохранить'}</CButton>
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
