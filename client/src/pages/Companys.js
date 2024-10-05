import React, { Suspense, useEffect, useState, useRef } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
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
import MyDropdown3 from 'src/components/Dropdown3/Dropdown3';

import comtegs from 'src/data/comtegs';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import dolgnostData from 'src/data/dolgnostData';
import sferaData from 'src/data/sfera';
import companyData from 'src/data/companyData';

import { getCompany, getCompanyCount, editCompany, addCompany, deleteCompany } from '../http/companyAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';
import { getManager } from 'src/http/managerAPI';
import { CollectionsOutlined } from '@mui/icons-material';

//Workers.js
const Companys = () => {

  const { companys, setCompanys, companysAll, companysCount, managersAll, setManagersAll } = useUsersContext();
  const [sortedCities, setSortedCities] = useState([])
  const [companyCount, setCompanyCount] = useState([]); 
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

  
  const [showSavePhone, setShowSavePhone] = useState(false)
  const [showSaveFio, setShowSaveFio] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showSaveOffice, setShowSaveOffice] = useState(false)
  const [showSaveSklad, setShowSaveSklad] = useState(false)

  const [id, setId] = useState('');
  const [title, setTitle] = useState('Название компании');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('+7 (999) 999-99-99');
  const [managers, setManagers] = useState([]);
  const [managersObj, setManagersObj] = useState([]);
  const [managersData, setManagersData] = useState([])
  const [managerName, setManagerName] = useState('')
  const [office, setOffice] = useState('');
  const [sklad, setSklad] = useState('');

  const [bugalterFio, setBugalterFio] = useState('')
  const [bugalterEmail, setBugalterEmail] = useState('')
  const [bugalterPhone, setBugalterPhone] = useState('')

  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comteg, setComteg] = useState([]);
  const [sfera, setSfera] = useState([]);
  const [dogovorDate, setDogovorDate] = useState('');
  const [dogovorNumber, setDogovorNumber] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [projects, setProjects] = useState('');
  const [inn, setInn] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showManagers, setShowManagers] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

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
  useEffect(() => {
		const filteredData = companysAll.filter(user=> (user.title)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    setCompanys(text === '' ? companyCount : filteredData); 
    //console.log("specialist", specialist)
    setShowClear(text === '' ? false : true)
  }, [text]);



  //-----------------------------------------------------------------------------------------
  //			get managers
  //-----------------------------------------------------------------------------------------
  useEffect(()=> {
    const sorted = [...cities].sort((a, b) => {       
      var cityA = a.label, cityB = b.label
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })

    setSortedCities(sorted)

    const fetchData = async() => {

      // 2 специалисты 20 чел.
      let company = await getCompanyCount(20, 0)
      console.log("companys: ", company)
      console.log("count: ", companysCount)

      let arrManagers = []
      let managersDB = await getManager()
      managersDB.map((item, index)=> {
        arrManagers.push(item.fio)
      })
      setManagersData(arrManagers)
      //console.log("managersDB: ", arrManagers)

      let arrCompanys = []

      company.map(async (user, i) => {
        const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;


        let str_comment = ''
        user.comment && JSON.parse(user.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
        })

        let str_manager = ''
        let str_manager2 = ''
        user.managers && JSON.parse(user.managers).map((item, index)=> {
          const fioManager = managersDB.find(item2 => item2.GUID === item.name)
          if (fioManager) {
            str_manager = str_manager + fioManager.fio + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
            str_manager2 = str_manager2 + JSON.stringify(fioManager) + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
          } else {
            str_manager = str_manager + 'ФИО' + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
            str_manager2 = str_manager2 + JSON.stringify({fio: 'ФИО', dolgnost: 'менеджер', phone: ''}) + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
          }
        })


        const newUser = {
          id: user.id,
          title: user.title,
          city: user.city,
          office: user.office,
          sklad: user.sklad,
          comment: str_comment,
          managers: str_manager,
          managersObj: str_manager2,
        }
        arrCompanys.push(newUser)

        //если элемент массива последний
				if (i === company.length-1) {
          const sortedUser = [...arrCompanys].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

					setCompanyCount(sortedUser)
          setCompanys(sortedUser)
					
				}

      })   

      setLoading(false)
    }
    fetchData()
  }, [])

  const clickAdd = async()=> {   

    const data = {
      title: 'Новая компания',
    }
    const res = await addCompany(data)
    console.log("res: ", res)

    //контекст
    // if (res) {
    //   await addNewSpecialist(res?.id, res?.fio, res?.profile)
    // }

    companys.push({
      id: res?.id, 
      title: res?.fio, 
      managers: '',  
      comment: '',

    })

    const sortedUser = [...companys].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по возрастанию 
    })

    setCompanys(sortedUser)
  }
  
  //сортировка по ФИО
  const onSortTitle = () => {
    setCountPress(countPress + 1)
    
    if (countPress + 1 >= 3) {
      setCountPress(0)
    }
    console.log("check sort", countPress + 1)

    if (countPress + 1 === 1) {
      const sortedWorker = [...companys].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setCompanys(sortedWorker)
    } else if (countPress + 1 === 2) {
      const sortedWorker = [...companys].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setCompanys(sortedWorker)
    } else {
      const sortedWorker = [...companys].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })
      setCompanys(sortedWorker)
    }
    
  }


  //сортировка по Городу
  const onSortCity = () => {
    setCountPressCity(countPressCity + 1)
    
    if (countPressCity + 1 >= 3) {
      setCountPressCity(0)
    }
    console.log("check sort", countPressTG + 1)

    if (countPressCity + 1 === 1) {
      const sortedWorker = [...companys].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setCompanys(sortedWorker)
    } else if (countPressCity + 1 === 2) {
      const sortedWorker = [...companys].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setCompanys(sortedWorker)
    } else {
      const sortedWorker = [...companys].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по убыванию 
      })

      setCompanys(sortedWorker)
    }
    
  }

  //ЕЩЁ
  const clickNext = async() => {
    //setLoading(true)
  
    //1 все специалисты
    let response = await getCompanyCount(20, companys.length);
    //console.log("workers size: ", response)

    let managersDB = await getManager()
      //console.log("managersDB: ", managersDB)
  
    const arrCompanys = []
    
      response.reverse().map(async (user, i) => {
        const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
  
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;
  
        let str_comment = ''
        user.comment && JSON.parse(user.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
        })

        let str_manager = ''
        let str_manager2 = ''
        user.managers && JSON.parse(user.managers).map((item, index)=> {
          const fioManager = managersDB.find(item2 => item2.id === item.name)
          if (fioManager) {
            str_manager = str_manager + fioManager.fio + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
            str_manager2 = str_manager2 + JSON.stringify(fioManager) + (index+1 !== JSON.parse(user.managers).length ? ', ' : '')
          }
        })

        const newUser = {
          id: user.id,
          title: user.title,
          city: user.city,
          office: user.office,
          sklad: user.sklad,
          comment: str_comment,
          managers: str_manager,
          managersObj: str_manager2,
        }
        arrCompanys.push(newUser)

        //если элемент массива последний
				if (i === response.length-1) {
          const sortedUser = [...arrCompanys].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

          setCompanys(sortedUser)
          
          //сохранить кэш
          //localStorage.setItem("specialist", JSON.stringify(sortedUser));
  
          setLoading(false)
        }
      })    
      
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
      console.log("managersObj: ", managersObj)
  
  
      let managersArr = []
      let strManagers = ''
      managers.map((item, index)=> {
        const obj = {
          name: item,
        }
        strManagers = strManagers + item + (index+1 !== managers.length ? ', ' : '')
        managersArr.push(obj)
      })

      let managersObjArr = []
      let strManagersObj = ''
      managersObj.map((item, index)=> {
        const obj = {
          name: JSON.parse(item).id,
        }
        strManagersObj = strManagersObj + JSON.parse(item).fio + (index+1 !== managersObj.length ? ', ' : '')
        managersObjArr.push(obj)
      })
      console.log(managersObjArr)
  
  
      //комментарии 
      let commentArr = []
      let strComment = ''
      const obj1 = {
         content: comment,
      }
      strComment = comment
      commentArr.push(obj1)

  
      const saveData = {   
        title, 
        city,
        office,
        sklad,
        comment: JSON.stringify(commentArr),
        //projects: JSON.stringify(projectsArr),
        managers: JSON.stringify(managersObjArr),
        dogovorDate, 
        dogovorNumber, 
        bugalterFio, 
        bugalterEmail,
        bugalterPhone,  
        inn, //инн компании
        profile,
      }
      console.log("saveData: ", saveData)
  
      setCompanys((companys) => {	
  
        let userIndex = companys.findIndex((comp) => comp.id === id);
        const usersCopy = JSON.parse(JSON.stringify(companys));
  
        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          title, 
          city,
          office,
          sklad,
          comment,
          projects,
          managers: strManagersObj,
          dogovorDate, 
          dogovorNumber, 
          bugalterFio, 
          bugalterEmail,
          bugalterPhone,  
          inn, //инн компании
        };
  
        console.log("update user: ", usersCopy[userIndex])
  
        return usersCopy;
      });
  
      //сохранить изменения в базе
      await editCompany(saveData, id)
  
      addToast(exampleToast) //ваши данные сохранены

      setTimeout(()=> {
        closeProfile()
      }, 2000)
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
    setShowManagers(false)
  }

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 

  //открыть компанию
  const clickTitle = (user)=> {
    console.log("user: ", user)

    setShowProfile(true)
    //setModalUser(user)
    setShowSearch(false)
    setShowClear(false)

    const currentYear = new Date().getFullYear()

    setId(user.id)
    setTitle(user.title ? user.title : '')
    setCity(user.city ? user.city : '')
    setOffice(user.office ? user.office : '')
    setSklad(user.sklad ? user.sklad : '')
    setManagers(user.managers ? user.managers.split(', ') : [])
    setManagersObj(user.managersObj ? user.managersObj.split(', ') : [])

    //console.log(user.managers ? user.managers.split(', ') : [])
    //console.log(user.managersObj ? user.managersObj.split(', ') : [])

  }

  const onChangeManager = (e, index) => {
    console.log(e.target.value, index)

    setManagersObj((managersObj) => {                                           
      const usersCopy = JSON.parse(JSON.stringify(managersObj));			
      const userObject = JSON.parse(usersCopy[index]);
      usersCopy[index] = JSON.stringify({ ...userObject, fio: e.target.value});		
      //console.log(usersCopy) 
      return usersCopy;
    });   
  }

  useEffect(()=> {
    console.log("managersObj: ", managersObj)
  }, [managersObj])

  //добавить менеджера
  const addManager = () => {
    
    //console.log("managersObj: ", managersObj)
    const obj = {id: '', chatId: '', fio: '', }
    setManagersObj([ // with a new array
      ...managersObj, // that contains all the old items
      JSON.stringify(obj) // and one new item at the end
    ])
    // console.log([ // with a new array
    //   ...managersObj, // that contains all the old items
    //   JSON.stringify(obj) // and one new item at the end
    // ])
  }

  //удалить менеджера
  const deleteManager = (item) => {
    setManagersObj(
      managersObj.filter(a =>
        a.id !== item.id
      )
    );
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
                              Всего: {companysCount}
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
                                        <CTableHeaderCell className='my-th widthCity'>Город</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthSpace'>Менеджеры</CTableHeaderCell>                                           
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
                                    {companys.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index+1} style={{lineHeight: '14px'}}>
                                          <CTableDataCell className="text-center widthSpace my-td">
                                            {index+1}
                                          </CTableDataCell>
                                          <CTableDataCell onClick={()=>clickTitle(item)} className="widthSpace myfio-td" style={{cursor: 'pointer', textAlign: 'left'}}>
                                            {item.title ? (item.title.length > 30 ? item.title.substr(0, 30) + '...' : item.title) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.city ? (item.city.length > 15 ? item.city.substr(0, 15) + '...' : item.city) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.managers ? (item.managers.length > 30 ? item.managers.substr(0, 30) + '...' : item.managers) : ''}
                                          </CTableDataCell>   
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.office ? (item.office.length > 30 ? item.office.substr(0, 30) + '...' : item.office) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.sklad ? (item.sklad.length > 30 ? item.sklad.substr(0, 30) + '...' : item.sklad) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">

                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                            {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>   
                                          
                                          <CTableDataCell className="text-center widthSpace">

                                          </CTableDataCell>
                                          
                                          <CTableDataCell className="text-center widthSpace">
                                          
                                          </CTableDataCell>
                                                                               
                                          <CTableDataCell className="text-center widthSpace">

                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">

                                          </CTableDataCell>
                                        </CTableRow>
                                        ))
                                    }
                                    
                                  </CTableBody>                   
                                  </CTable>
                                </div>
                                
                                
                              )
                              :
                              <div style={{position: 'relative', height: showManagers ? 'auto' : '456px', display: 'flex', flexDirection: 'row'}}>
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

                                  <div className="menu-reyting" style={{marginBottom: '20px'}}>
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
                                  <CButton className='uley_add_user' style={{width: '250px', height: '40px', marginLeft: '6px'}}>
                                    <span style={{fontSize: '20px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
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
                                      <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} style={{backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
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
                                </div>

{/* 2 */}
                                <div style={{marginLeft: '37px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '300px'}}>
                                  {/* Город */}
                                  <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative'}}>                                     
                                      <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={sortedCities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      />
                                      <img src={Close} onClick={() => setCity('')} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img>
                                  </div>

                                  {/*  */}
                                  <label>Офис</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveOffice(true)} onMouseOut={()=>setShowSaveOffice(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(office)}} 
                                      alt="" 
                                      style={{visibility: showSaveOffice ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input className="text-field__input" type="text" name="office" id="office" value={office} onChange={(e) => setOffice(e.target.value)}/>
                                  </div> 

                                  {/*  */}
                                  <label>Склад</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveSklad(true)} onMouseOut={()=>setShowSaveSklad(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(sklad)}} 
                                      alt="" 
                                      style={{visibility: showSaveSklad ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input className="text-field__input" type="text" name="sklad" id="sklad" value={sklad} onChange={(e) => setSklad(e.target.value)}/>
                                  </div> 

                                  {/* Менеджеры */}
                                  <label>Менеджеры</label>
                                  <CButton onClick={()=>setShowManagers(!showManagers)} className='uley_add_user' style={{width: '300px', height: '40px', marginLeft: '0', marginBottom: '20px'}}>
                                    <span style={{fontSize: '20px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Менеджеры
                                    </span>
                                  </CButton>

                                  <div style={{display: showManagers ? 'block' : 'none'}}>
                                    {managersObj.map((item, index) => (
                                    <div className="text-field" key={index} style={{position: 'relative'}}>
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
                                        onInputChange={(e)=>onChangeManager(e, index)}
                                        onChange={(event, newValue) => {
                                            if (newValue && newValue.length) {
                                                setManagersObj((managersObj) => { 
                                                  const usersCopy = JSON.parse(JSON.stringify(managersObj));			
                                                  const userObject = JSON.parse(usersCopy[index]);
                                                  const managerId = managersAll.find(a=>a.fio === newValue)
                                                  usersCopy[index] = JSON.stringify({ ...userObject, id:managerId.id, fio: newValue});	                       
                                                  console.log(usersCopy)
                                                  return usersCopy;
                                                });
                                            }  
                                        }}
                                        value={item ? JSON.parse(item).fio : ''} 
                                        inputValue={item ? JSON.parse(item).fio : ''}
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
                                      <img src={Close} onClick={()=> deleteManager(item)} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px',  cursor: 'pointer'}}></img>
                                    </div>)
                                    )}
                                  </div>

                                  {/* Договор */}
                                  <label>Договор</label>
                                  <CButton className='uley_add_user' style={{width: '300px', height: '40px', marginLeft: '0'}}>
                                    <span style={{fontSize: '20px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Договор
                                    </span>
                                  </CButton> 
                                    
                                  
                                </div>

{/* 3 */}
                                <div style={{marginLeft: '37px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '300px'}}>
                                  <div className="uley-line" style={{left: '645px', width: '85px'}}></div>
                                  <div className="uley-line" style={{left: '810px', width: '85px'}}></div>
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    
                                    {/* проекты за месяц */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="reyting" id="reyting" value='' style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value='' style={{width: '40px', marginRight: '8px'}}/>
                                    </div>

                                    {/* проекты за месяц */}
                                    <div className="text-field" >
                                      <input className="text-field__input" type="text" name="reyting" id="reyting" value='' style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input className="text-field__input" type="text" name="rank" id="rank" value='' style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                  </div>
                                  
                                  {/*  */}
                                  <label>Сфера деятельности</label>
                                  <div className="text-field" style={{marginBottom: showManagers ? '129px' : '20px'}}> 
                                      <MyDropdown3
                                        tags={sfera}
                                        setTags={setSfera}
                                        options={sferaData}
                                        style={{minHeight: '40px !important'}}
                                      />
                                  </div>

                                  {/* + добавить менеджера */}
                                  <div style={{textAlign: 'left', display: showManagers ? 'block' : 'none'}}>
                                    <CButton onClick={()=>addManager()} className='uley_add_user' style={{marginBottom: '20px', marginLeft: '0'}}>
                                      <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                                      +</span>
                                    </CButton>
                                  </div>                                 

                                  {/*Должность и телефон менеджера  */}
                                  <div style={{display: showManagers ? 'block' : 'none'}}>
                                  {managersObj.map((item, index) => (
                                    <div key={index} className="text-field" style={{display: 'flex', justifyContent: 'space-between', height: '40px'}}>
                                      <div>
                                      {/* <label>Должность</label> */}
                                        <div className="text-field">
                                          <input className="text-field__input" type="text" name="email" id="email" value={JSON.parse(item).dolgnost} style={{width: '130px'}}/>
                                        </div> 
                                      </div>
                                      {/* phone */}
                                      <div className="text-field"  style={{marginBottom: '44px'}}>
                                        <input className="text-field__input" type="text" name="phone" id="phone" value={JSON.parse(item).phone} onChange={(e) => setPhone(e.target.value)} style={{width: '150px'}}/>  
                                      </div> 
                                    </div>
                                  ))}
                                  </div>

                                  <label>Комтеги</label>
                                  <div className="text-field"> 
                                      <MyDropdown3
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                        style={{minHeight: '40px !important'}}
                                      />
                                  </div>

                                  <label>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', width: '300px', height: '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 


                                </div>

{/* 4 */}
                                <div style={{marginLeft: '37px', marginTop: '56px', display: 'flex', flexDirection: 'column', width: '300px'}}>

                                  <label>Бухгалтерия</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveFio(true)} onMouseOut={()=>setShowSaveFio(false)} style={{marginBottom: '44px'}}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(bugalterFio)}} 
                                      alt="" 
                                      style={{visibility: showSaveFio ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      name="bugalterFio" 
                                      id="bugalterFio" 
                                      value={bugalterFio} 
                                      onChange={(e)=>setBugalterFio(e.target.value)} 
                                      style={{width: '300px'}}
                                    />
                                  </div>

                                  {/* phone */}
                                  <div className="text-field" onMouseOver={()=>showSavePhone(true)} onMouseOut={()=>showSavePhone(false)} style={{marginBottom: '44px'}}>
                                      <img 
                                        src={Disketa} 
                                        onClick={()=>{navigator.clipboard.writeText(phone)}} 
                                        alt="" 
                                        style={{visibility: showSavePhone ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                      />
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '300px'}}
                                          type="text" 
                                          name="phone" 
                                          id="phone"
                                          mask="+7 (999) 999-99-99"
                                          disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => setPhone(e.target.value)} 
                                          value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>    
                                  </div> 

                                  {/* email */}
                                  <label> </label>
                                  <div className="text-field" onMouseOver={()=>setShowSave3(true)} onMouseOut={()=>setShowSave3(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(email)}} 
                                      alt="" 
                                      style={{visibility: showSave3 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '300px'}}/>
                                  </div> 

                                  


                                  <label>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '300px', height: showManagers ? '533px' : '123px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
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
