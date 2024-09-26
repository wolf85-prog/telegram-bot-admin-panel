import React, { Suspense, useEffect, useState, useRef } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import InputMask from 'react-input-mask';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CToast, 
  CToastBody,
  CToastClose,
  CToaster,

} from '@coreui/react'
import Icon from "../chat-app-worker/components/Icon";
import { useUsersContext } from "../chat-app-new/context/usersContext";

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

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';

import comtegs from 'src/data/comtegs';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import dolgnostData from 'src/data/dolgnost';
import sferaData from 'src/data/sfera';
import companyData from 'src/data/companyData';

import { getManager, getManagerCount, editManager, addManager, deleteManager } from '../http/managerAPI'
import { getWContacts} from '../http/workerAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';

//Workers.js
const Companys = () => {

  const { setCountPretendent, pretendents, setPretendents, managers, setManagers } = useUsersContext();

  const [projects, setProjects] = useState([]); 
  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  //const [spec, setSpec] = useState([]); 
  const [visibleSm, setVisibleSm] = useState(false)
  const [modalWorker, setModalWorker] = useState({})
  const [showProfile, setShowProfile] = useState(false)
  const [showSpec, setShowSpec] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [showMenuBlock18, setShowMenuBlock18] = useState(false)
  const [showBlock18, setShowBlock18] = useState(false)
  const [block18, setBlock18] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  
  const [showSavePhone1, setShowSavePhone1] = useState(false)
  const [showSavePhone2, setShowSavePhone2] = useState(false)
  const [showSaveTg, setShowSaveTg] = useState(false)
  const [showSave3, setShowSave3] = useState(false)

  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [age2, setAge2] = useState(0);
  const [speclist, setSpeclist] = useState([]);
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [reyting, setReyting] = useState('');
  const [rank, setRank] = useState('');
  const [company, setCompany] = useState('');
  const [inn, setInn] = useState('');
  const [comteg, setComteg] = useState([]);
  const [sfera, setSfera] = useState([]);
  const [dolgnost, setDolgnost] = useState('');

  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [dogovor, setDogovor] = useState('');
  const [samozanjatost, setSamozanjatost] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно сохранены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const deleteToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно удалены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )


  //поиск
  // useEffect(() => {
	// 	const filteredData = pretendents.filter(user=> (user.project + user.workerFamily + user.workerName)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setSpec(text === '' ? pretendents : filteredData) 
  // }, [text]);



  //-----------------------------------------------------------------------------------------
  //			get managers
  //-----------------------------------------------------------------------------------------
  useEffect(()=> {
    const fetchData = async() => {

      // 2 специалисты 20 чел.
      //let users = await getManagerCount(20, managers.length)
      //console.log("managers: ", users)

      //let arrManagers = []

      // workers.map(async (worker, i) => {
      //   const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
      //   const d2 = new Date(d)
      //   const month = String(d2.getMonth()+1).padStart(2, "0");
      //   const day = String(d2.getDate()).padStart(2, "0");
      //   const chas = d2.getHours();
      //   const min = String(d2.getMinutes()).padStart(2, "0");
      //   const newDate = `${day}.${month} ${chas}:${min}`;

      //   let str_spec = ''
      //   worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
      //     str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
      //   })

      //   let str_skill = ''
      //   worker.skill && JSON.parse(worker.skill).map((item, index)=> {
      //     str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
      //   })

      //   let str_merch = ''
      //   worker.merch && JSON.parse(worker.merch).map((item, index)=> {
      //     str_merch = str_merch + item.name + (index+1 !== JSON.parse(worker.merch).length ? ', ' : '')
      //   })

      //   let str_komteg = ''
      //   worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
      //     str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
      //   })

      //   let str_komteg2 = ''
      //   worker.comteg2 && JSON.parse(worker.comteg2).map((item, index)=> {
      //     str_komteg2 = str_komteg2 + item.name + (index+1 !== JSON.parse(worker.comteg2).length ? ', ' : '')
      //   })

      //   let str_company = ''
      //   worker.company && JSON.parse(worker.company).map((item, index)=> {
      //     str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
      //   })

      //   let str_comment = ''
      //   worker.comment && JSON.parse(worker.comment).map((item, index)=> {
      //     str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
      //   })

      //   let str_comment2 = ''
      //   worker.comment2 && JSON.parse(worker.comment2).map((item, index)=> {
      //     str_comment2 = str_comment2 + item.content + (index+1 !== JSON.parse(worker.comment2).length ? ', ' : '')
      //   })

      //   const newWorker = {
      //     id: worker.id,
      //     fio: worker.fio,
      //     chatId: worker.chatId, 
      //     phone: worker.phone, 
      //     phone2: worker.phone2,
      //     speclist: str_spec,
      //     city: worker.city, 
      //     skill: str_skill,
      //     promo: worker.promoId === '0' ? '' : worker.promoId, 
      //     rank: worker.rank, 
      //     merch: str_merch,  
      //     company: str_company, 
      //     comteg: str_komteg, 
      //     comteg2: str_komteg2, 
      //     comment: str_comment, 
      //     comment2: str_comment2, 
      //     age: worker.age, 
      //     reyting: worker.reyting, 
      //     inn: worker.inn, 
      //     passport: worker.passport, 
      //     profile: worker.profile, 
      //     dogovor: worker.dogovor ? '🟢' : '🔴', 
      //     samozanjatost: worker.samozanjatost ? '🟢' : '🔴', 
      //     passportScan: worker.passportScan, 
      //     email: worker.email, 
      //     block: worker.block,
      //     block18: worker.block18,
      //   }
      //   arrWorkers.push(newWorker)

      //   //если элемент массива последний
			// 	if (i === workers.length-1) {
      //     const sortedWorker = [...arrWorkers].sort((a, b) => {       
      //       var idA = a.id, idB = b.id 
      //       return idB-idA  //сортировка по возрастанию 
      //     })

			// 		setSpecialistCount(sortedWorker)
      //     setSpecialist(sortedWorker)
					
			// 		//сохранить кэш
			// 		localStorage.setItem("specialist", JSON.stringify(sortedWorker));
			// 	}

      // })  

      setLoading(false)

      // let wuserbots = await getWContacts();
      // console.log("wuserbots: ", wuserbots)
      // setUserbots(wuserbots)

      
    }
    fetchData()
  }, [])

  const clickAdd = async()=> {   

    setShowProfile(true)
    //setModalWorker(worker)
    setShowSearch(false)
    setShowClear(false)

    const data = {
      fio: 'ФИО',
    }
    // const res = await addSpecialist(data)

    // console.log("res: ", res)
    // if (res) {
    //   await addNewSpecialist(res?.id, res?.fio, res?.profile)
    // }
  }
  
  //сортировка по ФИО
  const onSortFio = () => {
    setCountPress(countPress + 1)
    
    if (countPress + 1 >= 3) {
      setCountPress(0)
    }
    console.log("check sort", countPress + 1)

    // if (countPress + 1 === 1) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
    //     return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else if (countPress + 1 === 2) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
    //     return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var fioA = a.id, fioB = b.id 
    //     return fioB-fioA  //сортировка по убыванию 
    //   })
    //   setSpecialist(sortedWorker)
    //}
    
  }

  //сортировка по telegram
  const onSortTG = () => {
    setCountPressTG(countPressTG + 1)
    
    if (countPressTG + 1 >= 3) {
      setCountPressTG(0)
    }
    console.log("check sort", countPressTG + 1)

    // if (countPressTG + 1 === 1) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var tgA = a.telegram, tgB = b.telegram 
    //     return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else if (countPressTG + 1 === 2) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var tgA = a.telegram, tgB = b.telegram 
    //     return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var fioA = a.id, fioB = b.id 
    //     return fioB-fioA  //сортировка по убыванию 
    //   })

    //   //setSpecialistCount(sortedWorker)
    //   setSpecialist(sortedWorker)
    //}
    
  }

  //сортировка по Городу
  const onSortCity = () => {
    setCountPressCity(countPressCity + 1)
    
    if (countPressCity + 1 >= 3) {
      setCountPressCity(0)
    }
    //console.log("check sort", countPressTG + 1)

    // if (countPressCity + 1 === 1) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var cityA = a.city, cityB = b.city
    //     return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else if (countPressCity + 1 === 2) {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var cityA = a.city, cityB = b.city
    //     return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
    //   })
    //   setSpecialist(sortedWorker)
    // } else {
    //   const sortedWorker = [...specialist].sort((a, b) => {       
    //     var idA = a.id, idB = b.id 
    //     return idB-idA  //сортировка по убыванию 
    //   })

    //   //setSpecialistCount(sortedWorker)
    //   setSpecialist(sortedWorker)
    //}
    
  }

  //ЕЩЁ
  const clickNext = async() => {
      //1 все специалисты
      
  }

  const onChangeReyting = () => {
    setShowBlacklist(false)
    setShowMenu2(false)

    //убрать из списка специальностей Blacklist
    //const res = speclist.filter(item=>item !== 'Blacklist')
    //console.log("speclist: ", res)

    //setSpeclist(res)
  }

  const onChangeBlacklist = () => {
    setShowBlacklist(true)
    setShowMenu1(false)

    //добавить в список специальностей Blacklist
    // speclist.push('Blacklist')
    // console.log("speclist: ", speclist)

    // setSpeclist(speclist)
  }

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }


  const clickSearch = (e) => {
    setShowClear(true)
    setText(e.target.value)
  }

  const clearSearch = () => {
    setText('')
  }

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }

  //удаление специалиста
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    //await deleteSpecialist(id)
    addToast(deleteToast) //ваши данные сохранены
  
  }

  //сохранить профиль
  const saveProfile = async(id) => { 
      setShowClose(true)
      console.log(id)
  
      let specArr = []
      let strSpec = ''

  
  
      addToast(exampleToast) //ваши данные сохранены
  }
  
  const blockedProfile = () => { 
      setBlockProfile(!blockProfile)
  }

  const closeProfile = () => { 
    setShowProfile(false)
    setShowClose(false)
    setShowSearch(true)

    setShowClear(true)
    setFilePreview('')
  }

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

          <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  {/* <h2>Менеджеры</h2> */}
                  <CToaster ref={toaster} push={toast} placement="top-end" /> 
                    <CRow className="mb-3">
                      <CCol sm={3} style={{position: 'relative'}}>
                        <CFormInput 
                          placeholder="Поиск..." 
                          onChange={(e)=>clickSearch(e)} 
                          aria-label="spec"
                          value={text}
                          style={{display: showSearch ? 'block' : 'none'}}
                        >   
                        </CFormInput>
                        <img src={Close} alt='' onClick={clearSearch} width={10} style={{display: showClear ? 'block' : 'none', position: 'absolute', top: '15px', right: '20px'}}/>
                      </CCol>
                      <CCol>
                        <CButton onClick={clickAdd} className='uley_add_user' style={{display: showSearch ? 'block' : 'none'}}>
                          <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                          +</span>
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                              Всего: 
                            </p>
                            <CCardBody>
                              {!showProfile ?
                              
                              (loading ? 
                                      
                                <CSpinner/> :
                                <div className='scrooll-table'>
                                  <div className="table-head-content"></div>
                                  <div className="table-head-content2"></div>
                                  <div className="table-head-content3"></div>
                                  {/* <div className="table-col-content"></div> */}
                                  <CTable align="middle" className="mb-0 border my-table" hover bordered>
                                    <CTableHead className='table-light'>
                                      <CTableRow>
                                        <CTableHeaderCell className='myid-th widthSpace'>№</CTableHeaderCell> 
                                        <CTableHeaderCell className='myfio-th widthSpace'>Название компании</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthSpace'>Менеджеры</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Город</CTableHeaderCell>                                           
                                        <CTableHeaderCell className='my-th widthSpace'>Адрес офиса</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Адрес склада</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthPhone'>Проекты</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Комментарий</CTableHeaderCell>      
                                        <CTableHeaderCell className='my-th widthSpace'>Телефон менеджера</CTableHeaderCell>                         
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Д</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody >                                  
                                    {/* {specialist.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index+1} style={{lineHeight: '14px'}}>
                                          <CTableDataCell className="text-center widthSpace my-td">
                                            {index+1}
                                          </CTableDataCell>
                                          <CTableDataCell onClick={()=>clickFio(item)} className="widthSpace myfio-td" style={{cursor: 'pointer', textAlign: 'left'}}>
                                          {item.fio ? (item.fio.length > 30 ? item.fio.substr(0, 30) + '...' : item.fio) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.chatId}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.city ? (item.city.length > 30 ? item.city.substr(0, 30) + '...' : item.city) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.company ? (item.company.length > 20 ? item.company.substr(0, 20) + '...' : item.company) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone2}
                                          </CTableDataCell>
                                          
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.rank}
                                          </CTableDataCell>
                                          
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg ? (item.comteg.length > 30 ? item.comteg.substr(0, 30) + '...' : item.comteg) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>                                        
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.reyting}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.reyting}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.inn}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.passport ? (item.passport.length > 30 ? item.passport.substr(0, 30) + '...' : item.passport) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.profile ? (item.profile.length > 30 ? item.profile.substr(0, 30) + '...' : item.profile) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.dogovor}
                                          </CTableDataCell>

                                          <CTableDataCell className="text-center widthSpace">
                                          {item.email}
                                          </CTableDataCell>

                                        </CTableRow>
                                        ))
                                    } */}
                                    
                                  </CTableBody>                   
                                  </CTable>
                                </div>
                                
                                
                              )
                              :
                              <div style={{position: 'relative', height: '660px', display: 'flex', flexDirection: 'row'}}>
{/* 1 */}                               
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '0'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
                                    <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="photo"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
                                  </div>

                                  <div className="menu-reyting">
                                      <div style={{width: '250px', display: 'flex', justifyContent: 'center'}}>
                                        {showBlacklist ?
                                        <span onClick={()=>setShowMenu2(true)} style={{cursor: 'pointer', color: 'red', fontSize: '24px', fontWeight: '700', marginBottom: '3px'}}>Blacklist</span>
                                        :<div className="star-block" style={{cursor: 'pointer', marginBottom: '8px'}} onClick={()=>setShowMenu1(true)}>
                                          <img className='star-icon' src={StarActive} alt='' /> 
                                          <img className='star-icon' src={StarActive} alt='' />
                                          <img className='star-icon' src={StarActive} alt='' />
                                          <img className='star-icon' src={Star} alt='' />
                                          <img className='star-icon' src={Star} alt='' />
                                        </div>
                                        }
                                      </div>
                                      <div className="menu-content" style={{display: showMenu1 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeBlacklist} style={{cursor: 'pointer'}}>Blacklist</span>
                                      </div>
                                      <div className="menu-content" style={{display: showMenu2 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeReyting} style={{cursor: 'pointer'}}>Рейтинг</span>
                                      </div>
                                  </div>

                                  <label>Реквизиты</label>
                                  <CButton className='uley_add_user' style={{width: '250px', marginLeft: '6px'}}>
                                    <span style={{verticalAlign: 'super', fontSize: '20px', color: '#fff'}}>
                                      Реквизиты
                                    </span>
                                  </CButton>


                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: block ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{block ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value='Название компании' onChange={(e)=>setFio(e.target.value)} style={{backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      <Icon id="delete" onClick={()=>clickDelete(id)} />
                                      <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>

                                  {/* 2 */}
                                

                                </div>

{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* Город */}
                                  <div className="text-field"> 
                                      <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={cities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      />
                                  </div>

                                  {/*  */}
                                  <label>Офис</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                  {/*  */}
                                  <label>Склад</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                  {/* ФИО */}
                                  <label>ФИО</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                  {/* Договор */}
                                  <label>Договор</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                
                                  
                                </div>

{/* 3 */}
<div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div className="uley-line" style={{left: '670px', width: '90px'}}></div>
                                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
                                    
                                    {/* проекты за месяц */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>

                                    {/* проекты за месяц */}
                                    <div className="text-field" >
                                      <input className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                  </div>
                                  
                                  {/*  */}
                                  <label>Сфера деятельности</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                  <label>Комтеги</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                      />
                                  </div>

                                  <label>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', width: '320px', height: '243px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 


                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '56px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  <label>Бухгалтерия</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveTg(true)} onMouseOut={()=>setShowSaveTg(false)} style={{marginBottom: '44px'}}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(telegram)}} 
                                      alt="" 
                                      style={{visibility: showSaveTg ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      pattern="[0-9]*"
                                      name="telegram" 
                                      id="telegram" 
                                      value={telegram} 
                                      //onChange={handleTg} 
                                      style={{width: '250px'}}
                                    />
                                  </div>

                                  {/* phone2 */}
                                  <div className="text-field" onMouseOver={()=>showSavePhone2(true)} onMouseOut={()=>showSavePhone2(false)}>
                                      <img 
                                        src={Disketa} 
                                        onClick={()=>{navigator.clipboard.writeText(phone2)}} 
                                        alt="" 
                                        style={{visibility: showSavePhone2 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                      />
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '250px'}}
                                          type="text" 
                                          name="phone2" 
                                          id="phone2"
                                          mask="+7 (999) 999-99-99"
                                          disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => setPhone2(e.target.value)} 
                                          value={phone2}
                                          placeholder=''
                                      >
                                      </InputMask>
                                      
                                  </div> 

                                  {/* ник */}
                                  <label> </label>
                                  <div className="text-field" onMouseOver={()=>setShowSave3(true)} onMouseOut={()=>setShowSave3(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(nik)}} 
                                      alt="" 
                                      style={{visibility: showSave3 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input disabled className="text-field__input" type="text" name="nik" id="nik" value={nik} onChange={(e) => setNik(e.target.value)} style={{width: '250px'}}/>
                                  </div> 

                                  


                                  <label>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '353px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 
                                </div>


                              </div>
                              }
                            </CCardBody>

                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{display: !showProfile ? 'block' : 'none', width: '50px', marginBottom: '15px', cursor: 'pointer'}}></img>
                              </div> 
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
                        Пользователь будет удален из базы!
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

export default Companys
