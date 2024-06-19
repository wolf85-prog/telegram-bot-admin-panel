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
  

  const [countCol1, setCountCol1] = useState(6)
  const [countCol2, setCountCol2] = useState(6)
  const [countCol3, setCountCol3] = useState(6)

  const [countCol21, setCountCol21] = useState(6)
  const [countCol22, setCountCol22] = useState(6)
  const [countCol23, setCountCol23] = useState(6)

  const [countCol31, setCountCol31] = useState(6)
  const [countCol32, setCountCol32] = useState(6)
  const [countCol33, setCountCol33] = useState(6)

  const [countCol41, setCountCol41] = useState(6)
  const [countCol42, setCountCol42] = useState(6)
  const [countCol43, setCountCol43] = useState(6)

  const [countCol51, setCountCol51] = useState(6)
  const [countCol52, setCountCol52] = useState(6)
  const [countCol53, setCountCol53] = useState(6)

  const [countCol61, setCountCol61] = useState(6)
  const [countCol62, setCountCol62] = useState(6)
  const [countCol63, setCountCol63] = useState(6)

  const [countCol71, setCountCol71] = useState(6)
  const [countCol72, setCountCol72] = useState(6)
  const [countCol73, setCountCol73] = useState(6)

  const [countCol81, setCountCol81] = useState(6)
  const [countCol82, setCountCol82] = useState(6)
  const [countCol83, setCountCol83] = useState(6)

  //----------------------------------------------------

  const [timeold1, setTimeold1] = useState([false, false, false, false, false, false, false])
  const [timeold2, setTimeold2] = useState([false, false, false, false, false, false, false])
  const [timeold3, setTimeold3] = useState([false, false, false, false, false, false, false])

  const [timeold21, setTimeold21] = useState([false, false, false, false, false, false, false])
  const [timeold22, setTimeold22] = useState([false, false, false, false, false, false, false])
  const [timeold23, setTimeold23] = useState([false, false, false, false, false, false, false])

  const [timeold31, setTimeold31] = useState([false, false, false, false, false, false, false])
  const [timeold32, setTimeold32] = useState([false, false, false, false, false, false, false])
  const [timeold33, setTimeold33] = useState([false, false, false, false, false, false, false])

  const [timeold41, setTimeold41] = useState([false, false, false, false, false, false, false])
  const [timeold42, setTimeold42] = useState([false, false, false, false, false, false, false])
  const [timeold43, setTimeold43] = useState([false, false, false, false, false, false, false])

  const [timeold51, setTimeold51] = useState([false, false, false, false, false, false, false])
  const [timeold52, setTimeold52] = useState([false, false, false, false, false, false, false])
  const [timeold53, setTimeold53] = useState([false, false, false, false, false, false, false])

  const [timeold61, setTimeold61] = useState([false, false, false, false, false, false, false])
  const [timeold62, setTimeold62] = useState([false, false, false, false, false, false, false])
  const [timeold63, setTimeold63] = useState([false, false, false, false, false, false, false])

  const [timeold71, setTimeold71] = useState([false, false, false, false, false, false, false])
  const [timeold72, setTimeold72] = useState([false, false, false, false, false, false, false])
  const [timeold73, setTimeold73] = useState([false, false, false, false, false, false, false])

  const [timeold81, setTimeold81] = useState([false, false, false, false, false, false, false])
  const [timeold82, setTimeold82] = useState([false, false, false, false, false, false, false])
  const [timeold83, setTimeold83] = useState([false, false, false, false, false, false, false])

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

      let plan3 = await getPlan(`${day3}.${month3}.${year}`);
      console.log("plan3: ", plan3)

      let plan4 = await getPlan(`${day4}.${month4}.${year}`);
      console.log("plan4: ", plan4)

      let plan5 = await getPlan(`${day5}.${month5}.${year}`);
      console.log("plan5: ", plan5)

      let plan6 = await getPlan(`${day6}.${month6}.${year}`);
      console.log("plan6: ", plan6)

      let plan7 = await getPlan(`${day7}.${month7}.${year}`);
      console.log("plan7: ", plan7)

      let plan8 = await getPlan(`${day8}.${month8}.${year}`);
      console.log("plan8: ", plan8)


      
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

        setCountCol1(ind1)
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

        setCountCol21(ind1)
        setCountCol22(ind2 - ind1)
        setCountCol23(planTimes2.length - ind2) 

      }     
      
      //3-й день
      if (plan3 !== null) {
        const planTimes3 = JSON.parse(plan3.times)

        const ind1 = planTimes3.findIndex(date => date.time === '12:00')
        const ind2 = planTimes3.findIndex(date => date.time === '18:00')

        const times = planTimes3.slice(0, ind1);
        const times2 = planTimes3.slice(ind1, ind2);
        const times3 = planTimes3.slice(ind2, planTimes3.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value31[index] = true
            setValue31(value31)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value32[index] = true
            setValue32(value32)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value33[index] = true
            setValue33(value33)
          }
        })

        setDates3(times)
        setDates33(times2)
        setDates333(times3)

        setCountCol31(ind1)
        setCountCol32(ind2 - ind1)
        setCountCol33(planTimes3.length - ind2) 

      } 

      //4-й день
      if (plan4 !== null) {
        const planTimes4 = JSON.parse(plan4.times)
        //console.log("plan4 full: ", planTimes4)

        const ind1 = planTimes4.findIndex(date => date.time === '12:00')
        const ind2 = planTimes4.findIndex(date => date.time === '18:00')

        const times = planTimes4.slice(0, ind1);
        const times2 = planTimes4.slice(ind1, ind2);
        const times3 = planTimes4.slice(ind2, planTimes4.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value41[index] = true
            setValue41(value41)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value42[index] = true
            setValue42(value42)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value43[index] = true
            setValue43(value43)
          }
        })

        setDates4(times)
        setDates44(times2)
        setDates444(times3)

        setCountCol41(ind1)
        setCountCol42(ind2 - ind1)
        setCountCol43(planTimes4.length - ind2) 

      } 

      //5-й день
      if (plan5 !== null) {
        const planTimes5 = JSON.parse(plan5.times)

        const ind1 = planTimes5.findIndex(date => date.time === '12:00')
        const ind2 = planTimes5.findIndex(date => date.time === '18:00')

        const times = planTimes5.slice(0, ind1);
        const times2 = planTimes5.slice(ind1, ind2);
        const times3 = planTimes5.slice(ind2, planTimes5.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value51[index] = true
            setValue51(value51)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value52[index] = true
            setValue52(value52)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value53[index] = true
            setValue53(value53)
          }
        })

        setDates5(times)
        setDates55(times2)
        setDates555(times3)

        setCountCol51(ind1)
        setCountCol52(ind2 - ind1)
        setCountCol53(planTimes5.length - ind2) 

      } 

      //6-й день
      if (plan6 !== null) {
        const planTimes6 = JSON.parse(plan6.times)

        const ind1 = planTimes6.findIndex(date => date.time === '12:00')
        const ind2 = planTimes6.findIndex(date => date.time === '18:00')

        const times = planTimes6.slice(0, ind1);
        const times2 = planTimes6.slice(ind1, ind2);
        const times3 = planTimes6.slice(ind2, planTimes6.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value61[index] = true
            setValue61(value61)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value62[index] = true
            setValue62(value62)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value63[index] = true
            setValue63(value63)
          }
        })

        setDates6(times)
        setDates66(times2)
        setDates666(times3)

        setCountCol61(ind1)
        setCountCol62(ind2 - ind1)
        setCountCol63(planTimes6.length - ind2) 

      } 

      //7-й день
      if (plan7 !== null) {
        const planTimes7 = JSON.parse(plan7.times)

        const ind1 = planTimes7.findIndex(date => date.time === '12:00')
        const ind2 = planTimes7.findIndex(date => date.time === '18:00')

        const times = planTimes7.slice(0, ind1);
        const times2 = planTimes7.slice(ind1, ind2);
        const times3 = planTimes7.slice(ind2, planTimes7.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value71[index] = true
            setValue71(value71)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value72[index] = true
            setValue72(value72)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value73[index] = true
            setValue73(value73)
          }
        })

        setDates7(times)
        setDates77(times2)
        setDates777(times3)

        setCountCol71(ind1)
        setCountCol72(ind2 - ind1)
        setCountCol73(planTimes7.length - ind2) 

      } 

      //8-й день
      if (plan8 !== null) {
        const planTimes8 = JSON.parse(plan8.times)

        const ind1 = planTimes8.findIndex(date => date.time === '12:00')
        const ind2 = planTimes8.findIndex(date => date.time === '18:00')

        const times = planTimes8.slice(0, ind1);
        const times2 = planTimes8.slice(ind1, ind2);
        const times3 = planTimes8.slice(ind2, planTimes8.length); 

        times.forEach((time, index)=> {
          if (time.save) {
            value81[index] = true
            setValue81(value81)
          }
        })

        times2.forEach((time, index)=> {
          if (time.save) {
            value82[index] = true
            setValue82(value82)
          }
        })

        times3.forEach((time, index)=> {
          if (time.save) {
            value83[index] = true
            setValue83(value83)
          }
        })

        setDates8(times)
        setDates88(times2)
        setDates888(times3)

        setCountCol81(ind1)
        setCountCol82(ind2 - ind1)
        setCountCol83(planTimes8.length - ind2) 

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
        value1[ind] = false
        dates[ind].save = false
        dates[ind].proj = ''
        dates[ind].uuid = ''
      } else {
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
      setValue21(value21) 
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
      setValue31(value31) 
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
      setValue32(value32)
    }

    if (tab === 3) {
      if (value33[ind]) {
        value33[ind] = false
        dates333[ind].proj = ''
        dates333[ind].uuid = ''
        dates333[ind].save = false
      } else {
        value33[ind] = true
        dates333[ind].proj = projectName //location.state.project
        dates333[ind].uuid = uuidDistrib
        dates333[ind].save = true
      } 

      setDates333(dates333)
      setValue33(value33)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus4 = (ind, tab) => {
    if (tab === 1) {
      if (dates4[ind].save === true) {
        value41[ind] = false
        dates4[ind].save = false
        dates4[ind].proj = ''
        dates4[ind].uuid = ''
      } else {
        value41[ind] = true
        dates4[ind].proj = projectName //location.state.project
        dates4[ind].uuid = uuidDistrib
        dates4[ind].save = true
      }

      setDates4(dates4)
      setValue41(value41) 
    }

    if (tab === 2) {
      if (value42[ind]) {
        value42[ind] = false
        dates44[ind].proj = ''
        dates44[ind].uuid = ''
        dates44[ind].save = false
      } else {
        value42[ind] = true
        dates44[ind].proj = projectName //location.state.project
        dates44[ind].uuid = uuidDistrib
        dates44[ind].save = true
      } 

      setDates44(dates44)
      setValue42(value42)
    }

    if (tab === 3) {
      if (value43[ind]) {
        value43[ind] = false
        dates444[ind].proj = ''
        dates444[ind].uuid = ''
        dates444[ind].save = false
      } else {
        value43[ind] = true
        dates444[ind].proj = projectName //location.state.project
        dates444[ind].uuid = uuidDistrib
        dates444[ind].save = true
      } 

      setDates444(dates444)
      setValue43(value43)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus5 = (ind, tab) => {
    if (tab === 1) {
      if (dates5[ind].save === true) {
        value51[ind] = false
        dates5[ind].save = false
        dates5[ind].proj = ''
        dates5[ind].uuid = ''
      } else {
        value51[ind] = true
        dates5[ind].proj = projectName //location.state.project
        dates5[ind].uuid = uuidDistrib
        dates5[ind].save = true
      }

      setDates5(dates5)
      setValue51(value51) 
    }

    if (tab === 2) {
      if (value52[ind]) {
        value52[ind] = false
        dates55[ind].proj = ''
        dates55[ind].uuid = ''
        dates55[ind].save = false
      } else {
        value52[ind] = true
        dates55[ind].proj = projectName //location.state.project
        dates55[ind].uuid = uuidDistrib
        dates55[ind].save = true
      } 

      setDates55(dates55)
      setValue22(value52)
    }

    if (tab === 3) {
      if (value53[ind]) {
        value53[ind] = false
        dates555[ind].proj = ''
        dates555[ind].uuid = ''
        dates555[ind].save = false
      } else {
        value53[ind] = true
        dates555[ind].proj = projectName //location.state.project
        dates555[ind].uuid = uuidDistrib
        dates555[ind].save = true
      } 

      setDates555(dates555)
      setValue53(value53)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus6 = (ind, tab) => {
    if (tab === 1) {
      if (dates6[ind].save === true) {
        value61[ind] = false
        dates6[ind].save = false
        dates6[ind].proj = ''
        dates6[ind].uuid = ''
      } else {
        value61[ind] = true
        dates6[ind].proj = projectName //location.state.project
        dates6[ind].uuid = uuidDistrib
        dates6[ind].save = true
      }

      setDates6(dates6)
      setValue61(value61) 
    }

    if (tab === 2) {
      if (value62[ind]) {
        value62[ind] = false
        dates66[ind].proj = ''
        dates66[ind].uuid = ''
        dates66[ind].save = false
      } else {
        value62[ind] = true
        dates66[ind].proj = projectName //location.state.project
        dates66[ind].uuid = uuidDistrib
        dates66[ind].save = true
      } 

      setDates66(dates66)
      setValue62(value62)
    }

    if (tab === 3) {
      if (value63[ind]) {
        value63[ind] = false
        dates666[ind].proj = ''
        dates666[ind].uuid = ''
        dates666[ind].save = false
      } else {
        value63[ind] = true
        dates666[ind].proj = projectName //location.state.project
        dates666[ind].uuid = uuidDistrib
        dates666[ind].save = true
      } 

      setDates666(dates666)
      setValue63(value63)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus7 = (ind, tab) => {
    if (tab === 1) {
      if (dates7[ind].save === true) {
        value71[ind] = false
        dates7[ind].save = false
        dates7[ind].proj = ''
        dates7[ind].uuid = ''
      } else {
        value71[ind] = true
        dates7[ind].proj = projectName //location.state.project
        dates7[ind].uuid = uuidDistrib
        dates7[ind].save = true
      }

      setDates7(dates7)
      setValue71(value71) 
    }

    if (tab === 2) {
      if (value72[ind]) {
        value72[ind] = false
        dates77[ind].proj = ''
        dates77[ind].uuid = ''
        dates77[ind].save = false
      } else {
        value72[ind] = true
        dates77[ind].proj = projectName //location.state.project
        dates77[ind].uuid = uuidDistrib
        dates77[ind].save = true
      } 

      setDates77(dates77)
      setValue72(value72)
    }

    if (tab === 3) {
      if (value73[ind]) {
        value73[ind] = false
        dates777[ind].proj = ''
        dates777[ind].uuid = ''
        dates777[ind].save = false
      } else {
        value73[ind] = true
        dates777[ind].proj = projectName //location.state.project
        dates777[ind].uuid = uuidDistrib
        dates777[ind].save = true
      } 

      setDates777(dates777)
      setValue73(value73)
    }
    

    projectView ? setProjectView(false) : setProjectView(true)
  }

  const changeStatus8 = (ind, tab) => {
    if (tab === 1) {
      if (dates8[ind].save === true) {
        value81[ind] = false
        dates8[ind].save = false
        dates8[ind].proj = ''
        dates8[ind].uuid = ''
      } else {
        value81[ind] = true
        dates8[ind].proj = projectName //location.state.project
        dates8[ind].uuid = uuidDistrib
        dates8[ind].save = true
      }

      setDates8(dates8)
      setValue81(value81) 
    }

    if (tab === 2) {
      if (value82[ind]) {
        value82[ind] = false
        dates88[ind].proj = ''
        dates88[ind].uuid = ''
        dates88[ind].save = false
      } else {
        value82[ind] = true
        dates88[ind].proj = projectName //location.state.project
        dates88[ind].uuid = uuidDistrib
        dates88[ind].save = true
      } 

      setDates88(dates88)
      setValue82(value82)
    }

    if (tab === 3) {
      if (value83[ind]) {
        value83[ind] = false
        dates888[ind].proj = ''
        dates888[ind].uuid = ''
        dates888[ind].save = false
      } else {
        value83[ind] = true
        dates888[ind].proj = projectName //location.state.project
        dates888[ind].uuid = uuidDistrib
        dates888[ind].save = true
      } 

      setDates888(dates888)
      setValue83(value83)
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
          setCountCol1(countCol1+1) //для высоту ячейки с датой
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
            setCountCol1(countCol1-1)
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
            setCountCol1(countCol1+1) //для высоту ячейки с датой
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
              setCountCol1(countCol1-1)
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
            setCountCol1(countCol1+1) //для высоту ячейки с датой
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
              setCountCol1(countCol1-1)
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
            setCountCol1(countCol1+1) //для высоту ячейки с датой
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
              setCountCol1(countCol1-1)
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
            setCountCol1(countCol1+1) //для высоту ячейки с датой
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
              setCountCol1(countCol1-1)
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
            setCountCol1(countCol1+1) //для высоту ячейки с датой
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
              setCountCol1(countCol1-1)
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
        setCountCol21(countCol21+1) //для высоту ячейки с датой
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
          setCountCol21(countCol21-1)
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
          setCountCol21(countCol21+1) //для высоту ячейки с датой
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
            setCountCol21(countCol21-1)
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
          setCountCol21(countCol21+1) //для высоту ячейки с датой
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
            setCountCol21(countCol21-1)
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
          setCountCol21(countCol21+1) //для высоту ячейки с датой
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
            setCountCol21(countCol21-1)
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
          setCountCol21(countCol21+1) //для высоту ячейки с датой
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
            setCountCol21(countCol21-1)
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
          setCountCol21(countCol21+1) //для высоту ячейки с датой
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
            setCountCol21(countCol21-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol22(countCol22+1) //для высоту ячейки с датой
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
          setCountCol22(countCol22-1)
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
        setCountCol23(countCol23+1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
        setCountCol23(countCol23+1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
        setCountCol23(countCol23+1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
        setCountCol23(countCol23+1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
        setCountCol23(countCol23 + 1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
        setCountCol23(countCol23+1) //для высоту ячейки с датой
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
          setCountCol23(countCol23-1)
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
      if (dates3[ind+1].time === '07:00') {
        setCountCol31(countCol31+1) //для высоту ячейки с датой
        arr = dates3.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates3(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value31[index] = item.save
        })
        setValue31(value31)

      } else {
        if (dates3[ind+1].proj === ''){
          setCountCol31(countCol31-1)
          arr = dates3.slice(0); 
          arr.splice(ind+1, 1);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates3[ind+1].time === '08:00') {
          setCountCol31(countCol31+1) //для высоту ячейки с датой
          arr = dates3.slice(0); //копируем массив dates
          const newObj = {
            date: date_str3,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)
                  
        } else {
          if (dates3[ind+1].proj === ''){
            setCountCol31(countCol31-1)
            arr = dates3.slice(0); 
            arr.splice(ind+1, 1);
            setDates3(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value31[index] = item.save
            })
            setValue31(value31)           
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
        if (dates3[ind+1].time === '09:00') {
          setCountCol31(countCol31+1) //для высоту ячейки с датой
          arr = dates3.slice(0); //копируем массив dates
          const newObj = {
            date: date_str3,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)                 
        } else {
          if (dates3[ind+1].proj === ''){
            setCountCol31(countCol31-1)
            arr = dates3.slice(0); 
            arr.splice(ind+1, 1);
            setDates3(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value31[index] = item.save
            })
            setValue31(value31)           
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
        if (dates3[ind+1].time === '10:00') {
          setCountCol31(countCol31+1) //для высоту ячейки с датой
          arr = dates3.slice(0); //копируем массив dates
          const newObj = {
            date: date_str3,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)
                  
        } else {
          if (dates3[ind+1].proj === ''){
            setCountCol31(countCol31-1)
            arr = dates3.slice(0); 
            arr.splice(ind+1, 1);
            setDates3(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value31[index] = item.save
            })
            setValue31(value31)           
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
        if (dates3[ind+1].time === '11:00') {
          setCountCol31(countCol31+1) //для высоту ячейки с датой
          arr = dates3.slice(0); //копируем массив dates
          const newObj = {
            date: date_str3,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)                 
        } else {
          if (dates3[ind+1].proj === ''){
            setCountCol31(countCol31-1)
            arr = dates3.slice(0); 
            arr.splice(ind+1, 1);
            setDates3(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value31[index] = item.save
            })
            setValue31(value31)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates3[ind+1]?.time !== '11:30') {
          setCountCol31(countCol31+1) //для высоту ячейки с датой
          arr = dates3.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str3,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates3(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value31[index] = item.save
          })
          setValue31(value31)          
        } 
        
        if (dates3[ind+1]?.time === '11:30') {
          if (dates3[ind+1].proj === ''){
            setCountCol31(countCol31-1)
            arr = dates3.slice(0); 
            arr.splice(ind+1, 1);
            setDates3(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value31[index] = item.save
            })
            setValue31(value31)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1].time === '13:00') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '12:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)

      } else {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates33(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value32)           
        }        
      }
    }
  }

  if (t === '13:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1].time === '14:00') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '13:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)

      } else {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates33(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value22)           
        }        
      }
    }
  }

  if (t === '14:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1].time === '15:00') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '14:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)

      } else {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates33(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value32)           
        }        
      }
    }
  }

  if (t === '15:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1].time === '16:00') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '15:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)

      } else {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value32)           
        }        
      }
    }
  }

  if (t === '16:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1].time === '17:00') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '16:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)

      } else {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates22(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value32)           
        }        
      }
    }
  }

  if (t === '17:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates33[ind+1]?.time !== '17:30') {
        setCountCol32(countCol32+1) //для высоту ячейки с датой
        arr = dates33.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str3,
          time: '17:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates33(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value32[index] = item.save
        })
        setValue32(value32)          
      } 
      
      if (dates33[ind+1]?.time === '17:30') {
        if (dates33[ind+1].proj === ''){
          setCountCol32(countCol32-1)
          arr = dates33.slice(0); 
          arr.splice(ind+1, 1);
          setDates33(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value32[index] = item.save
          })
          setValue32(value32)           
        }        
      }
    }
  }

//---------------18:00 - 23:00----------------------

  if (t === '18:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1].time === '19:00') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)

      } else {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1].time === '20:00') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)

      } else {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1].time === '21:00') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)

      } else {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1].time === '22:00') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)

      } else {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1].time === '23:00') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        const newObj = {
          date: date_str3,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)

      } else {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates333[ind+1]?.time !== '23:30') {
        setCountCol33(countCol33+1) //для высоту ячейки с датой
        arr = dates333.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str3,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates333(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value33[index] = item.save
        })
        setValue33(value33)          
      } 
      
      if (dates333[ind+1]?.time === '23:30') {
        if (dates333[ind+1].proj === ''){
          setCountCol33(countCol33-1)
          arr = dates333.slice(0); 
          arr.splice(ind+1, 1);
          setDates333(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value33[index] = item.save
          })
          setValue33(value33)           
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
      if (dates4[ind+1].time === '07:00') {
        setCountCol41(countCol41+1) //для высоту ячейки с датой
        arr = dates4.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates4(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value41[index] = item.save
        })
        setValue41(value41)

      } else {
        if (dates4[ind+1].proj === ''){
          setCountCol41(countCol41-1)
          arr = dates4.slice(0); 
          arr.splice(ind+1, 1);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value41[index] = item.save
          })
          setValue41(value41)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates4[ind+1].time === '08:00') {
          setCountCol41(countCol41+1) //для высоту ячейки с датой
          arr = dates4.slice(0); //копируем массив dates
          const newObj = {
            date: date_str4,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value41[index] = item.save
          })
          setValue41(value41)
                  
        } else {
          if (dates4[ind+1].proj === ''){
            setCountCol41(countCol41-1)
            arr = dates4.slice(0); 
            arr.splice(ind+1, 1);
            setDates4(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value41[index] = item.save
            })
            setValue41(value41)           
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
        if (dates4[ind+1].time === '09:00') {
          setCountCol41(countCol41+1) //для высоту ячейки с датой
          arr = dates4.slice(0); //копируем массив dates
          const newObj = {
            date: date_str4,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value41[index] = item.save
          })
          setValue41(value41)                 
        } else {
          if (dates4[ind+1].proj === ''){
            setCountCol41(countCol41-1)
            arr = dates4.slice(0); 
            arr.splice(ind+1, 1);
            setDates4(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value41[index] = item.save
            })
            setValue41(value41)           
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
        if (dates4[ind+1].time === '10:00') {
          setCountCol41(countCol41+1) //для высоту ячейки с датой
          arr = dates4.slice(0); //копируем массив dates
          const newObj = {
            date: date_str4,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)
                  
        } else {
          if (dates4[ind+1].proj === ''){
            setCountCol41(countCol41-1)
            arr = dates4.slice(0); 
            arr.splice(ind+1, 1);
            setDates4(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value41[index] = item.save
            })
            setValue41(value41)           
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
        if (dates4[ind+1].time === '11:00') {
          setCountCol41(countCol41+1) //для высоту ячейки с датой
          arr = dates4.slice(0); //копируем массив dates
          const newObj = {
            date: date_str4,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value41[index] = item.save
          })
          setValue41(value41)                 
        } else {
          if (dates4[ind+1].proj === ''){
            setCountCol41(countCol41-1)
            arr = dates4.slice(0); 
            arr.splice(ind+1, 1);
            setDates4(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value41[index] = item.save
            })
            setValue41(value41)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates4[ind+1]?.time !== '11:30') {
          setCountCol41(countCol41+1) //для высоту ячейки с датой
          arr = dates4.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str4,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates4(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value41[index] = item.save
          })
          setValue41(value41)          
        } 
        
        if (dates4[ind+1]?.time === '11:30') {
          if (dates4[ind+1].proj === ''){
            setCountCol41(countCol41-1)
            arr = dates4.slice(0); 
            arr.splice(ind+1, 1);
            setDates4(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value41[index] = item.save
            })
            setValue41(value41)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1].time === '13:00') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '12:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

  if (t === '13:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1].time === '14:00') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '13:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value42[index] = item.save
        })
        setValue42(value42)

      } else {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

  if (t === '14:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1].time === '15:00') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '14:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value42[index] = item.save
        })
        setValue42(value42)

      } else {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

  if (t === '15:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1].time === '16:00') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '15:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value42[index] = item.save
        })
        setValue42(value42)

      } else {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

  if (t === '16:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1].time === '17:00') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '16:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value42[index] = item.save
        })
        setValue42(value42)

      } else {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

  if (t === '17:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates44[ind+1]?.time !== '17:30') {
        setCountCol42(countCol42+1) //для высоту ячейки с датой
        arr = dates44.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str4,
          time: '17:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates44(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value42[index] = item.save
        })
        setValue42(value42)          
      } 
      
      if (dates44[ind+1]?.time === '17:30') {
        if (dates44[ind+1].proj === ''){
          setCountCol42(countCol42-1)
          arr = dates44.slice(0); 
          arr.splice(ind+1, 1);
          setDates44(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value42[index] = item.save
          })
          setValue42(value42)           
        }        
      }
    }
  }

//---------------18:00 - 23:00----------------------

  if (t === '18:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1].time === '19:00') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)

      } else {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1].time === '20:00') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)

      } else {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1].time === '21:00') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)

      } else {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1].time === '22:00') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)

      } else {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1].time === '23:00') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        const newObj = {
          date: date_str4,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)

      } else {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates444[ind+1]?.time !== '23:30') {
        setCountCol43(countCol43+1) //для высоту ячейки с датой
        arr = dates444.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str4,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates444(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value43[index] = item.save
        })
        setValue43(value43)          
      } 
      
      if (dates444[ind+1]?.time === '23:30') {
        if (dates444[ind+1].proj === ''){
          setCountCol43(countCol43-1)
          arr = dates444.slice(0); 
          arr.splice(ind+1, 1);
          setDates444(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value43[index] = item.save
          })
          setValue43(value43)           
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
      if (dates5[ind+1].time === '07:00') {
        setCountCol51(countCol51+1) //для высоту ячейки с датой
        arr = dates5.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates5(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value51[index] = item.save
        })
        setValue51(value51)

      } else {
        if (dates5[ind+1].proj === ''){
          setCountCol51(countCol51-1)
          arr = dates5.slice(0); 
          arr.splice(ind+1, 1);
          setDates2(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value51[index] = item.save
          })
          setValue51(value51)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates5[ind+1].time === '08:00') {
          setCountCol51(countCol51+1) //для высоту ячейки с датой
          arr = dates5.slice(0); //копируем массив dates
          const newObj = {
            date: date_str5,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates5(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value51[index] = item.save
          })
          setValue51(value51)
                  
        } else {
          if (dates5[ind+1].proj === ''){
            setCountCol51(countCol51-1)
            arr = dates5.slice(0); 
            arr.splice(ind+1, 1);
            setDates5(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value51[index] = item.save
            })
            setValue51(value51)           
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
        if (dates5[ind+1].time === '09:00') {
          setCountCol51(countCol51+1) //для высоту ячейки с датой
          arr = dates5.slice(0); //копируем массив dates
          const newObj = {
            date: date_str5,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates5(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value51[index] = item.save
          })
          setValue51(value51)                 
        } else {
          if (dates5[ind+1].proj === ''){
            setCountCol51(countCol51-1)
            arr = dates5.slice(0); 
            arr.splice(ind+1, 1);
            setDates5(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value51[index] = item.save
            })
            setValue51(value51)           
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
        if (dates5[ind+1].time === '10:00') {
          setCountCol51(countCol51+1) //для высоту ячейки с датой
          arr = dates5.slice(0); //копируем массив dates
          const newObj = {
            date: date_str5,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates5(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)
                  
        } else {
          if (dates5[ind+1].proj === ''){
            setCountCol51(countCol51-1)
            arr = dates5.slice(0); 
            arr.splice(ind+1, 1);
            setDates5(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value51[index] = item.save
            })
            setValue51(value51)           
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
        if (dates5[ind+1].time === '11:00') {
          setCountCol51(countCol51+1) //для высоту ячейки с датой
          arr = dates5.slice(0); //копируем массив dates
          const newObj = {
            date: date_str5,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates5(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value51[index] = item.save
          })
          setValue51(value51)                 
        } else {
          if (dates5[ind+1].proj === ''){
            setCountCol51(countCol51-1)
            arr = dates5.slice(0); 
            arr.splice(ind+1, 1);
            setDates5(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value51[index] = item.save
            })
            setValue51(value51)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates5[ind+1]?.time !== '11:30') {
          setCountCol51(countCol51+1) //для высоту ячейки с датой
          arr = dates5.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str5,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates5(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value51[index] = item.save
          })
          setValue51(value51)          
        } 
        
        if (dates5[ind+1]?.time === '11:30') {
          if (dates5[ind+1].proj === ''){
            setCountCol51(countCol51-1)
            arr = dates5.slice(0); 
            arr.splice(ind+1, 1);
            setDates5(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value51[index] = item.save
            })
            setValue51(value51)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates55[ind+1].time === '13:00') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '12:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates55(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates55[ind+1].time === '14:00') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
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
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates55[ind+1].time === '15:00') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
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
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates55[ind+1].time === '16:00') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
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
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates55[ind+1].time === '17:00') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
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
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates55[ind+1]?.time !== '17:30') {
        setCountCol52(countCol52+1) //для высоту ячейки с датой
        arr = dates55.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str5,
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
      
      if (dates55[ind+1]?.time === '17:30') {
        if (dates55[ind+1].proj === ''){
          setCountCol52(countCol52-1)
          arr = dates55.slice(0); 
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
      if (dates555[ind+1].time === '19:00') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)

      } else {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates555[ind+1].time === '20:00') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)

      } else {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates555[ind+1].time === '21:00') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)

      } else {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates555[ind+1].time === '22:00') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)

      } else {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates555[ind+1].time === '23:00') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        const newObj = {
          date: date_str5,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)

      } else {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates555[ind+1]?.time !== '23:30') {
        setCountCol53(countCol53+1) //для высоту ячейки с датой
        arr = dates555.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str5,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates555(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value53[index] = item.save
        })
        setValue53(value53)          
      } 
      
      if (dates555[ind+1]?.time === '23:30') {
        if (dates555[ind+1].proj === ''){
          setCountCol53(countCol53-1)
          arr = dates555.slice(0); 
          arr.splice(ind+1, 1);
          setDates555(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value53[index] = item.save
          })
          setValue53(value53)           
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
      if (dates6[ind+1].time === '07:00') {
        setCountCol61(countCol61+1) //для высоту ячейки с датой
        arr = dates6.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates6(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value61[index] = item.save
        })
        setValue61(value61)

      } else {
        if (dates6[ind+1].proj === ''){
          setCountCol61(countCol61-1)
          arr = dates6.slice(0); 
          arr.splice(ind+1, 1);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value61[index] = item.save
          })
          setValue61(value61)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates6[ind+1].time === '08:00') {
          setCountCol61(countCol61+1) //для высоту ячейки с датой
          arr = dates6.slice(0); //копируем массив dates
          const newObj = {
            date: date_str6,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value61[index] = item.save
          })
          setValue61(value61)
                  
        } else {
          if (dates6[ind+1].proj === ''){
            setCountCol61(countCol61-1)
            arr = dates6.slice(0); 
            arr.splice(ind+1, 1);
            setDates6(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value61[index] = item.save
            })
            setValue61(value61)           
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
        if (dates6[ind+1].time === '09:00') {
          setCountCol61(countCol61+1) //для высоту ячейки с датой
          arr = dates6.slice(0); //копируем массив dates
          const newObj = {
            date: date_str6,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value61[index] = item.save
          })
          setValue61(value61)                 
        } else {
          if (dates6[ind+1].proj === ''){
            setCountCol61(countCol61-1)
            arr = dates6.slice(0); 
            arr.splice(ind+1, 1);
            setDates6(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value61[index] = item.save
            })
            setValue61(value61)           
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
        if (dates6[ind+1].time === '10:00') {
          setCountCol61(countCol61+1) //для высоту ячейки с датой
          arr = dates6.slice(0); //копируем массив dates
          const newObj = {
            date: date_str6,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)
                  
        } else {
          if (dates6[ind+1].proj === ''){
            setCountCol61(countCol61-1)
            arr = dates6.slice(0); 
            arr.splice(ind+1, 1);
            setDates6(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value61[index] = item.save
            })
            setValue61(value61)           
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
        if (dates6[ind+1].time === '11:00') {
          setCountCol61(countCol61+1) //для высоту ячейки с датой
          arr = dates6.slice(0); //копируем массив dates
          const newObj = {
            date: date_str6,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value61[index] = item.save
          })
          setValue61(value61)                 
        } else {
          if (dates6[ind+1].proj === ''){
            setCountCol61(countCol61-1)
            arr = dates6.slice(0); 
            arr.splice(ind+1, 1);
            setDates6(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value61[index] = item.save
            })
            setValue61(value61)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates6[ind+1]?.time !== '11:30') {
          setCountCol61(countCol61+1) //для высоту ячейки с датой
          arr = dates6.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str6,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates6(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value61[index] = item.save
          })
          setValue61(value61)          
        } 
        
        if (dates6[ind+1]?.time === '11:30') {
          if (dates6[ind+1].proj === ''){
            setCountCol61(countCol61-1)
            arr = dates6.slice(0); 
            arr.splice(ind+1, 1);
            setDates6(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value61[index] = item.save
            })
            setValue61(value61)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates66[ind+1].time === '13:00') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
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
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates66[ind+1].time === '14:00') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
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
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates66[ind+1].time === '15:00') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
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
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates66[ind+1].time === '16:00') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
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
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates66[ind+1].time === '17:00') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
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
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates66[ind+1]?.time !== '17:30') {
        setCountCol62(countCol62+1) //для высоту ячейки с датой
        arr = dates66.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str6,
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
      
      if (dates66[ind+1]?.time === '17:30') {
        if (dates66[ind+1].proj === ''){
          setCountCol62(countCol62-1)
          arr = dates66.slice(0); 
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
      if (dates666[ind+1].time === '19:00') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)

      } else {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates666[ind+1].time === '20:00') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)

      } else {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates666[ind+1].time === '21:00') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)

      } else {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates666[ind+1].time === '22:00') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)

      } else {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates666[ind+1].time === '23:00') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        const newObj = {
          date: date_str6,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)

      } else {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates666[ind+1]?.time !== '23:30') {
        setCountCol63(countCol63+1) //для высоту ячейки с датой
        arr = dates666.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str6,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates666(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value63[index] = item.save
        })
        setValue63(value63)          
      } 
      
      if (dates666[ind+1]?.time === '23:30') {
        if (dates666[ind+1].proj === ''){
          setCountCol63(countCol63-1)
          arr = dates666.slice(0); 
          arr.splice(ind+1, 1);
          setDates666(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value63[index] = item.save
          })
          setValue63(value63)           
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
      if (dates7[ind+1].time === '07:00') {
        setCountCol71(countCol71+1) //для высоту ячейки с датой
        arr = dates7.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates7(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value71[index] = item.save
        })
        setValue71(value71)

      } else {
        if (dates7[ind+1].proj === ''){
          setCountCol71(countCol71-1)
          arr = dates7.slice(0); 
          arr.splice(ind+1, 1);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value71[index] = item.save
          })
          setValue71(value71)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates7[ind+1].time === '08:00') {
          setCountCol71(countCol71+1) //для высоту ячейки с датой
          arr = dates7.slice(0); //копируем массив dates
          const newObj = {
            date: date_str7,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value71[index] = item.save
          })
          setValue71(value71)
                  
        } else {
          if (dates7[ind+1].proj === ''){
            setCountCol71(countCol71-1)
            arr = dates7.slice(0); 
            arr.splice(ind+1, 1);
            setDates7(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value71[index] = item.save
            })
            setValue71(value71)           
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
        if (dates7[ind+1].time === '09:00') {
          setCountCol71(countCol71+1) //для высоту ячейки с датой
          arr = dates7.slice(0); //копируем массив dates
          const newObj = {
            date: date_str7,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value71[index] = item.save
          })
          setValue71(value71)                 
        } else {
          if (dates7[ind+1].proj === ''){
            setCountCol71(countCol71-1)
            arr = dates7.slice(0); 
            arr.splice(ind+1, 1);
            setDates7(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value71[index] = item.save
            })
            setValue71(value71)           
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
        if (dates7[ind+1].time === '10:00') {
          setCountCol71(countCol71+1) //для высоту ячейки с датой
          arr = dates7.slice(0); //копируем массив dates
          const newObj = {
            date: date_str7,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value1[index] = item.save
          })
          setValue1(value1)
                  
        } else {
          if (dates7[ind+1].proj === ''){
            setCountCol71(countCol71-1)
            arr = dates7.slice(0); 
            arr.splice(ind+1, 1);
            setDates7(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value71[index] = item.save
            })
            setValue71(value71)           
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
        if (dates7[ind+1].time === '11:00') {
          setCountCol71(countCol71+1) //для высоту ячейки с датой
          arr = dates7.slice(0); //копируем массив dates
          const newObj = {
            date: date_str7,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value71[index] = item.save
          })
          setValue71(value71)                 
        } else {
          if (dates7[ind+1].proj === ''){
            setCountCol71(countCol71-1)
            arr = dates7.slice(0); 
            arr.splice(ind+1, 1);
            setDates7(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value71[index] = item.save
            })
            setValue71(value71)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates7[ind+1]?.time !== '11:30') {
          setCountCol71(countCol71+1) //для высоту ячейки с датой
          arr = dates7.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str7,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates7(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value71[index] = item.save
          })
          setValue71(value71)          
        } 
        
        if (dates7[ind+1]?.time === '11:30') {
          if (dates7[ind+1].proj === ''){
            setCountCol71(countCol71-1)
            arr = dates7.slice(0); 
            arr.splice(ind+1, 1);
            setDates7(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value71[index] = item.save
            })
            setValue71(value71)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates77[ind+1].time === '13:00') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
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
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
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
      if (dates77[ind+1].time === '14:00') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
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
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
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
      if (dates77[ind+1].time === '15:00') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
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
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
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
      if (dates77[ind+1].time === '16:00') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '15:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates77(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
          arr.splice(ind+1, 1);
          setDates77(arr)

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
      if (dates77[ind+1].time === '17:00') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '16:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates77(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)

      } else {
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
          arr.splice(ind+1, 1);
          setDates77(arr)

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
      if (dates77[ind+1]?.time !== '17:30') {
        setCountCol72(countCol72+1) //для высоту ячейки с датой
        arr = dates77.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str7,
          time: '17:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates77(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value22[index] = item.save
        })
        setValue22(value22)          
      } 
      
      if (dates77[ind+1]?.time === '17:30') {
        if (dates77[ind+1].proj === ''){
          setCountCol72(countCol72-1)
          arr = dates77.slice(0); 
          arr.splice(ind+1, 1);
          setDates77(arr)

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
      if (dates777[ind+1].time === '19:00') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)

      } else {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates777[ind+1].time === '20:00') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)

      } else {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (setDates777[ind+1].time === '21:00') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)

      } else {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates777[ind+1].time === '22:00') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)

      } else {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates777[ind+1].time === '23:00') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        const newObj = {
          date: date_str7,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)

      } else {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates777[ind+1]?.time !== '23:30') {
        setCountCol73(countCol73+1) //для высоту ячейки с датой
        arr = dates777.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str7,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates777(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value73[index] = item.save
        })
        setValue73(value73)          
      } 
      
      if (dates777[ind+1]?.time === '23:30') {
        if (dates777[ind+1].proj === ''){
          setCountCol73(countCol73-1)
          arr = dates777.slice(0); 
          arr.splice(ind+1, 1);
          setDates777(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value73[index] = item.save
          })
          setValue73(value73)           
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
      if (dates8[ind+1].time === '07:00') {
        setCountCol81(countCol81+1) //для высоту ячейки с датой
        arr = dates8.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '06:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates8(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value81[index] = item.save
        })
        setValue81(value81)

      } else {
        if (dates8[ind+1].proj === ''){
          setCountCol81(countCol81-1)
          arr = dates8.slice(0); 
          arr.splice(ind+1, 1);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)           
        }        
      }
    }
  }

  if (t === '07:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
      if (tab === 1) {
        //обработка нажатия вкл/выкл
        if (dates8[ind+1].time === '08:00') {
          setCountCol81(countCol81+1) //для высоту ячейки с датой
          arr = dates8.slice(0); //копируем массив dates
          const newObj = {
            date: date_str8,
            time: '07:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)
                  
        } else {
          if (dates8[ind+1].proj === ''){
            setCountCol81(countCol81-1)
            arr = dates8.slice(0); 
            arr.splice(ind+1, 1);
            setDates8(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value81[index] = item.save
            })
            setValue81(value81)           
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
        if (dates8[ind+1].time === '09:00') {
          setCountCol81(countCol81+1) //для высоту ячейки с датой
          arr = dates8.slice(0); //копируем массив dates
          const newObj = {
            date: date_str8,
            time: '08:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)                 
        } else {
          if (dates8[ind+1].proj === ''){
            setCountCol81(countCol81-1)
            arr = dates8.slice(0); 
            arr.splice(ind+1, 1);
            setDates8(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value81[index] = item.save
            })
            setValue81(value81)           
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
        if (dates8[ind+1].time === '10:00') {
          setCountCol81(countCol81+1) //для высоту ячейки с датой
          arr = dates8.slice(0); //копируем массив dates
          const newObj = {
            date: date_str8,
            time: '09:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)
                  
        } else {
          if (dates8[ind+1].proj === ''){
            setCountCol81(countCol81-1)
            arr = dates8.slice(0); 
            arr.splice(ind+1, 1);
            setDates8(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value81[index] = item.save
            })
            setValue81(value81)           
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
        if (dates8[ind+1].time === '11:00') {
          setCountCol81(countCol81+1) //для высоту ячейки с датой
          arr = dates8.slice(0); //копируем массив dates
          const newObj = {
            date: date_str8,
            time: '10:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)                 
        } else {
          if (dates8[ind+1].proj === ''){
            setCountCol81(countCol81-1)
            arr = dates8.slice(0); 
            arr.splice(ind+1, 1);
            setDates8(arr)

            //изменить чек
            arr.forEach((item, index)=> {
              value81[index] = item.save
            })
            setValue81(value81)           
          }        
        }
      }
    }
  }

  if (t === '11:00')  {
    if (tab === 1) {
      //обработка нажатия вкл/выкл
        if (dates8[ind+1]?.time !== '11:30') {
          setCountCol81(countCol81+1) //для высоту ячейки с датой
          arr = dates8.slice(0); //копируем массив dates
          console.log(arr)
          const newObj = {
            date: date_str8,
            time: '11:30',
            proj: '',
            uuid: '',
            save: false, 
            go: false, 
            
          }
          arr.splice(ind+1, 0, newObj);
          setDates8(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value81[index] = item.save
          })
          setValue81(value81)          
        } 
        
        if (dates8[ind+1]?.time === '11:30') {
          if (dates8[ind+1].proj === ''){
            setCountCol81(countCol81-1)
            arr = dates8.slice(0); 
            arr.splice(ind+1, 1);
            setDates8(arr)
  
            //изменить чек
            arr.forEach((item, index)=> {
              value81[index] = item.save
            })
            setValue81(value81)           
          }        
        }
    }
  }

  //12:00 - 17:00

  if (t === '12:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1].time === '13:00') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '12:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)

      } else {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates88.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

  if (t === '13:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1].time === '14:00') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '13:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)

      } else {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates88.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

  if (t === '14:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1].time === '15:00') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '14:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)

      } else {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates88.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

  if (t === '15:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1].time === '16:00') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '15:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)

      } else {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates88.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

  if (t === '16:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1].time === '17:00') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '16:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)

      } else {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates77.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

  if (t === '17:00')  {
    if (tab === 2) {
      //обработка нажатия вкл/выкл
      if (dates88[ind+1]?.time !== '17:30') {
        setCountCol82(countCol82+1) //для высоту ячейки с датой
        arr = dates88.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str8,
          time: '17:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates88(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value82[index] = item.save
        })
        setValue82(value82)          
      } 
      
      if (dates88[ind+1]?.time === '17:30') {
        if (dates88[ind+1].proj === ''){
          setCountCol82(countCol82-1)
          arr = dates88.slice(0); 
          arr.splice(ind+1, 1);
          setDates88(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value82[index] = item.save
          })
          setValue82(value82)           
        }        
      }
    }
  }

//---------------18:00 - 23:00----------------------

  if (t === '18:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1].time === '19:00') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '18:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)

      } else {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
        }        
      }
    }
  }
  
  if (t === '19:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1].time === '20:00') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '19:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)

      } else {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
        }        
      }
    }
  }
  
  if (t === '20:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1].time === '21:00') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '20:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)

      } else {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
        }        
      }
    }
  }
  
  if (t === '21:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1].time === '22:00') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '21:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)

      } else {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
        }        
      }
    }
  }
  
  if (t === '22:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1].time === '23:00') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        const newObj = {
          date: date_str8,
          time: '22:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)

      } else {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
        }        
      }
    }
  }
  
  if (t === '23:00')  {
    if (tab === 3) {
      //обработка нажатия вкл/выкл
      if (dates888[ind+1]?.time !== '23:30') {
        setCountCol83(countCol83+1) //для высоту ячейки с датой
        arr = dates888.slice(0); //копируем массив dates
        console.log(arr)
        const newObj = {
          date: date_str8,
          time: '23:30',
          proj: '',
          uuid: '',
          save: false, 
          go: false, 
          
        }
        arr.splice(ind+1, 0, newObj);
        setDates888(arr)

        //изменить чек
        arr.forEach((item, index)=> {
          value83[index] = item.save
        })
        setValue83(value83)          
      } 
      
      if (dates888[ind+1]?.time === '23:30') {
        if (dates888[ind+1].proj === ''){
          setCountCol83(countCol83-1)
          arr = dates888.slice(0); 
          arr.splice(ind+1, 1);
          setDates888(arr)

          //изменить чек
          arr.forEach((item, index)=> {
            value83[index] = item.save
          })
          setValue83(value83)           
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

    const d_str3 = new Date()  
    const d_str4 = new Date()  
    const d_str5 = new Date()  
    const d_str6 = new Date()  
    const d_str7 = new Date()  
    const d_str8 = new Date()  

    d_str3.setDate(d_str3.getDate() + 2) //3 день
    d_str4.setDate(d_str4.getDate() + 3) //4 день
    d_str5.setDate(d_str5.getDate() + 4) //5 день
    d_str6.setDate(d_str6.getDate() + 5) //6 день
    d_str7.setDate(d_str7.getDate() + 6) //7 день
    d_str8.setDate(d_str8.getDate() + 7) //8 день


    
    const obj = {
      id: uuidDistrib, 
      date: d_str.toLocaleDateString(),
    }
    const obj2 = {
      id: uuidDistrib, 
      date: d_str2.toLocaleDateString(),
    }

    const obj3 = {
      id: uuidDistrib, 
      date: d_str3.toLocaleDateString(),
    }

    const obj4 = {
      id: uuidDistrib, 
      date: d_str4.toLocaleDateString(),
    }

    const obj5 = {
      id: uuidDistrib, 
      date: d_str5.toLocaleDateString(),
    }

    const obj6 = {
      id: uuidDistrib, 
      date: d_str6.toLocaleDateString(),
    }

    const obj7 = {
      id: uuidDistrib, 
      date: d_str7.toLocaleDateString(),
    }

    const obj8 = {
      id: uuidDistrib, 
      date: d_str8.toLocaleDateString(),
    }

    //(удалить предыдущие записи запланированных рассылок)
    const res = await delDistributionWPlan(obj) //editDistributionWPlan(obj)
    const res2 = await delDistributionWPlan(obj2) //editDistributionWPlan(obj2)

    const res3 = await delDistributionWPlan(obj3) //editDistributionWPlan(obj2)
    const res4 = await delDistributionWPlan(obj4) //editDistributionWPlan(obj2)
    const res5 = await delDistributionWPlan(obj5) //editDistributionWPlan(obj2)
    const res6 = await delDistributionWPlan(obj6) //editDistributionWPlan(obj2)
    const res7 = await delDistributionWPlan(obj7) //editDistributionWPlan(obj2)
    const res8 = await delDistributionWPlan(obj8) //editDistributionWPlan(obj2)
    

    //1. сохранить все галочки и название проектов в массиве
    const newArray = [].concat(dates, dates1, dates11);
    const planer_str = JSON.stringify(newArray)
    //console.log("dates: ", newArray)

    const newArray2 = [].concat(dates2, dates22, dates222);
    const planer_str2 = JSON.stringify(newArray2)

    const newArray3 = [].concat(dates3, dates33, dates333);
    const planer_str3 = JSON.stringify(newArray3)

    const newArray4 = [].concat(dates4, dates44, dates444);
    const planer_str4 = JSON.stringify(newArray4)

    const newArray5 = [].concat(dates5, dates55, dates555);
    const planer_str5 = JSON.stringify(newArray5)

    const newArray6 = [].concat(dates6, dates66, dates666);
    const planer_str6 = JSON.stringify(newArray6)

    const newArray7 = [].concat(dates7, dates77, dates777);
    const planer_str7 = JSON.stringify(newArray7)

    const newArray8 = [].concat(dates8, dates88, dates888);
    const planer_str8 = JSON.stringify(newArray8)



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

    //3-й день
    const newObj3 = {
      "datestart": d_str3.toLocaleDateString(),
      "times": planer_str3
    }
    await newPlan(newObj3);

    //4-й день
    const newObj4 = {
      "datestart": d_str4.toLocaleDateString(),
      "times": planer_str4
    }
    await newPlan(newObj4);

    //5-й день
    const newObj5 = {
      "datestart": d_str5.toLocaleDateString(),
      "times": planer_str5
    }
    await newPlan(newObj5);

    //6-й день
    const newObj6 = {
      "datestart": d_str6.toLocaleDateString(),
      "times": planer_str6
    }
    await newPlan(newObj6);

    //7-й день
    const newObj7 = {
      "datestart": d_str7.toLocaleDateString(),
      "times": planer_str7
    }
    await newPlan(newObj7);

    //8-й день
    const newObj8 = {
      "datestart": d_str8.toLocaleDateString(),
      "times": planer_str8
    }
    await newPlan(newObj8);
    


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

    //массив дат 3-го дня
    newArray3.forEach(async (item)=> {
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
          date: `${day3}.${month3}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib3 = await newDistributionW(message)
        console.log("Рассылка3: ", dataDistrib3)
      } 
    })

    //массив дат 4-го дня
    newArray4.forEach(async (item)=> {
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
          date: `${day4}.${month4}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib4 = await newDistributionW(message)
        console.log("Рассылка4: ", dataDistrib4)
      } 
    })

    //массив дат 5-го дня
    newArray5.forEach(async (item)=> {
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
          date: `${day5}.${month5}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib5 = await newDistributionW(message)
        console.log("Рассылка5: ", dataDistrib5)
      } 
    })

    //массив дат 6-го дня
    newArray6.forEach(async (item)=> {
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
          date: `${day6}.${month6}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib6 = await newDistributionW(message)
        console.log("Рассылка6: ", dataDistrib6)
      } 
    })

    //массив дат 7-го дня
    newArray7.forEach(async (item)=> {
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
          date: `${day7}.${month7}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib7 = await newDistributionW(message)
        console.log("Рассылка7: ", dataDistrib7)
      } 
    })

    //массив дат 8-го дня
    newArray8.forEach(async (item)=> {
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
          date: `${day8}.${month8}.${year}`,   
          button: textButton,
          users: selected.toString(),  
          uuid: uuidDistrib, 
          editButton: showEditButtonAdd,  
          stavka: stavka,
          target: target,
        }
        //сохранение рассылки в базе данных
        const dataDistrib8 = await newDistributionW(message)
        console.log("Рассылка8: ", dataDistrib8)
      } 
    })

    //обновить список рассылок
    //await addNewDistrib(true)

    addToast(exampleToast) //уведомление - ваш план сохранен
    setShowSave(false)

    setTimeout(() => backPage(), 2000);
  }


  const saveNeedDate = (d3, count) => {
    console.log("count: ", count)
    setCountClick(count+1)
    if (count === 0) {
      setShowPlan3(true)
    }
    if (count === 1) {
      setShowPlan4(true)
    }
    if (count === 2) {
      setShowPlan5(true)
    }
    if (count === 3) {
      setShowPlan6(true)
    }
    if (count === 4) {
      setShowPlan7(true)
    }
    if (count === 5) {
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol1}px`}} >
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol21}px`}} >
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol22}px`}} >
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol23}px`}} >
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol31}px`}} >
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
                                    {dates3.map((item, index) => (
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
                                              checked={value31[index]}
                                              onChange={()=>changeStatus3(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold31[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol32}px`}} >
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
                                    {dates33.map((item, index) => (
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
                                              checked={value32[index]}
                                              onChange={()=>changeStatus3(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold32[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol33}px`}} >
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
                                    {dates333.map((item, index) => (
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
                                              checked={value33[index]}
                                              onChange={()=>changeStatus3(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold33[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol41}px`}} >
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
                                    {dates4.map((item, index) => (
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
                                              checked={value41[index]}
                                              onChange={()=>changeStatus4(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold41[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol42}px`}} >
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
                                    {dates44.map((item, index) => (
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
                                              checked={value42[index]}
                                              onChange={()=>changeStatus4(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold42[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol43}px`}} >
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
                                    {dates444.map((item, index) => (
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
                                              checked={value43[index]}
                                              onChange={()=>changeStatus4(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold43[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol51}px`}} >
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
                                    {dates5.map((item, index) => (
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
                                              checked={value51[index]}
                                              onChange={()=>changeStatus5(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold51[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol52}px`}} >
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
                                              checked={value52[index]}
                                              onChange={()=>changeStatus5(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold52[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol53}px`}} >
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
                                    {dates555.map((item, index) => (
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
                                              checked={value53[index]}
                                              onChange={()=>changeStatus5(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold53[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol61}px`}} >
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
                                    {dates6.map((item, index) => (
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
                                              checked={value61[index]}
                                              onChange={()=>changeStatus6(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold61[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol62}px`}} >
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
                                    {dates66.map((item, index) => (
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
                                              checked={value62[index]}
                                              onChange={()=>changeStatus6(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold62[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol63}px`}} >
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
                                    {dates666.map((item, index) => (
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
                                              checked={value63[index]}
                                              onChange={()=>changeStatus6(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold63[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol71}px`}} >
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
                                    {dates7.map((item, index) => (
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
                                              checked={value71[index]}
                                              onChange={()=>changeStatus7(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold71[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol72}px`}} >
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
                                    {dates77.map((item, index) => (
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
                                              checked={value72[index]}
                                              onChange={()=>changeStatus7(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold72[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol73}px`}} >
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
                                    {dates777.map((item, index) => (
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
                                              checked={value73[index]}
                                              onChange={()=>changeStatus7(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold73[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol81}px`}} >
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
                                    {dates8.map((item, index) => (
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
                                              checked={value81[index]}
                                              onChange={()=>changeStatus8(index, 1)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold81[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '50px', height: `${41*countCol82}px`}} >
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
                                    {dates88.map((item, index) => (
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
                                              checked={value82[index]}
                                              onChange={()=>changeStatus8(index, 2)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold82[index])  ? '' : 'disabled'}
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
                                        <CTableDataCell className="text-center" style={{width: '70px', height: `${41*countCol83}px`}} >
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
                                    {dates888.map((item, index) => (
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
                                              checked={value83[index]}
                                              onChange={()=>changeStatus8(index, 3)}
                                              disabled={((uuidDistrib === item.uuid || item.proj === '') && !timeold83[index])  ? '' : 'disabled'}
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
