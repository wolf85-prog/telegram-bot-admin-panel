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
import Icon from "./../chat-app-worker/components/Icon";
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
import dolgnostData from 'src/data/dolgnostData';
import sferaData from 'src/data/sfera';
import companyData from 'src/data/companyData';

import { getManager, getManagerCount, editManager, addManager, deleteManager } from './../http/managerAPI'
import { getCompany} from '../http/companyAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';
import { getContacts } from '../http/chatAPI'

//Workers.js
const Managers = () => {

  const { managers, setManagers, managersCount, managersAll, setManagersAll, companysAll } = useUsersContext();
  const [sortedCities, setSortedCities] = useState([])
  const [managerCount, setManagerCount] = useState([]);
  const [companysData, setCompanysData] = useState([]);

  const [companyName, setCompanyName] = useState('');

  const [projects, setProjects] = useState(''); 
  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(true);
  const [loading2, setLoading2]= useState(false);
  const [text, setText]= useState("");
  //const [spec, setSpec] = useState([]); 
  const [visibleSm, setVisibleSm] = useState(false)
  const [modalUser, setModalUser] = useState({})
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
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [reyting, setReyting] = useState('');
  const [rank, setRank] = useState('');
  const [company, setCompany] = useState('');
  const [comteg, setComteg] = useState([]);
  const [sfera, setSfera] = useState([]);
  const [dolgnost, setDolgnost] = useState('');
  const [inn, setInn] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [dogovor, setDogovor] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [office, setOffice] = useState('');
  const [sklad, setSklad] = useState('');

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
  //поиск
  useEffect(() => {
		const filteredData = managersAll.filter(user=> (user.fio + user.chatId + user.phone)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    
    filteredData.map(async (user, i) => {

      let str_sfera = ''
      user.sfera && JSON.parse(user.sfera).map((item, index)=> {
        str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
      })

      let str_komteg = ''
      user.comteg && JSON.parse(user.comteg).map((item, index)=> {
        str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
      })

      let str_comment = ''
      user.comment && JSON.parse(user.comment).map((item, index)=> {
        str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
      })

      let str_company = ''
      let str_company_name = ''
      const comp = companysAll.find(item=> parseInt(item.id) === parseInt(user.companyId))
      if (comp) {
        str_company = comp.id
        str_company_name = comp.title
      }

      let arr = []

      const newUser = {
        id: user.id,
        fio: user.fio,
        chatId: user.chatId, 
        phone: user.phone, 
        phone2: user.phone2,
        city: user.city, 
        sfera: str_sfera,
        dolgnost: user.dolgnost,
        company: str_company, 
        companyName: str_company_name,
        comteg: str_komteg, 
        comment: str_comment, 
        inn: user.inn, 
        profile: user.profile, 
        dogovor: user.dogovor ? '🟢' : '🔴', 
        email: user.email, 
        projects: user.projects,
        block: user.block,
      }
      arr.push(newUser)

      //если элемент массива последний
      if (i === filteredData.length-1) {
        setManagers(text === '' ? managerCount : arr)
      }
    })  
    
    //setManagers(text === '' ? managerCount : filteredData); 
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
      let users = await getManagerCount(20, 0)
      console.log("managers: ", users)
      console.log("count: ", managersCount)

      let arrCompanys = []
      let companysDB = await getCompany()
      companysDB.map((item, index)=> {
        arrCompanys.push(item.title)
      })
      const sortedComp = [...arrCompanys].sort((a, b) => {       
        var cityA = a, cityB = b
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })

      setCompanysData(sortedComp)

      let arrManagers = []

      users.map(async (user, i) => {
        const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_sfera = ''
        user.sfera && JSON.parse(user.sfera).map((item, index)=> {
          str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
        })

        let str_komteg = ''
        user.comteg && JSON.parse(user.comteg).map((item, index)=> {
          str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
        })

        let str_comment = ''
        user.comment && JSON.parse(user.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
        })

        let str_company = ''
        let str_company_name = ''
        const comp = companysAll.find(item=> parseInt(item.id) === parseInt(user.companyId))
        if (comp) {
          str_company = comp.id
          str_company_name = comp.title
        }

        const newUser = {
          id: user.id,
          fio: user.fio,
          chatId: user.chatId, 
          phone: user.phone, 
          phone2: user.phone2,
          city: user.city, 
          sfera: str_sfera,
          dolgnost: user.dolgnost,
          company: str_company, 
          companyName: str_company_name,
          comteg: str_komteg, 
          comment: str_comment, 
          inn: user.inn, 
          profile: user.profile, 
          dogovor: user.dogovor ? '🟢' : '🔴', 
          email: user.email, 
          projects: user.projects,
          block: user.block,
        }
        arrManagers.push(newUser)

        //если элемент массива последний
				if (i === users.length-1) {
          const sortedUser = [...arrManagers].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

          console.log("sortedUser: ", sortedUser)

					setManagerCount(sortedUser)
          setManagers(sortedUser)
					
					//сохранить кэш
					//localStorage.setItem("specialist", JSON.stringify(sortedUser));
				}

      })  

      setLoading(false)

      let wuserbots = await getContacts();
      //console.log("wuserbots: ", wuserbots)
      setUserbots(wuserbots)

      
    }
    fetchData()
  }, [])

  const clickAdd = async()=> {   

    //setShowProfile(true)
    //setModalWorker(worker)
    //setShowSearch(false)
    //setShowClear(false)

    const data = {
      fio: 'ФИО',
    }
    const res = await addManager(data)

    //контекст
    // if (res) {
    //   await addNewSpecialist(res?.id, res?.fio, res?.profile)
    // }

    managers.push({
      id: res?.id, 
      fio: res?.fio, 
      sfera: '',
      company: '', 
      comteg: '',  
      comment: '',

    })

    const sortedUser = [...managers].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по возрастанию 
    })

    setManagers(sortedUser)
  }
  
  //сортировка по ФИО
  const onSortFio = () => {
    setCountPress(countPress + 1)
    
    if (countPress + 1 >= 3) {
      setCountPress(0)
    }
    console.log("check sort", countPress + 1)

    if (countPress + 1 === 1) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else if (countPress + 1 === 2) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
        return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else {
      const sortedWorker = [...managers].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })
      setManagers(sortedWorker)
    }
    
  }

  //сортировка по telegram
  const onSortTG = () => {
    setCountPressTG(countPressTG + 1)
    
    if (countPressTG + 1 >= 3) {
      setCountPressTG(0)
    }
    console.log("check sort", countPressTG + 1)

    if (countPressTG + 1 === 1) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var tgA = a.telegram, tgB = b.telegram 
        return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else if (countPressTG + 1 === 2) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var tgA = a.telegram, tgB = b.telegram 
        return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else {
      const sortedWorker = [...managers].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })

      //setManagerCount(sortedWorker)
      setManagers(sortedWorker)
    }
    
  }

  //сортировка по Городу
  const onSortCity = () => {
    setCountPressCity(countPressCity + 1)
    
    if (countPressCity + 1 >= 3) {
      setCountPressCity(0)
    }
    //console.log("check sort", countPressTG + 1)

    if (countPressCity + 1 === 1) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else if (countPressCity + 1 === 2) {
      const sortedWorker = [...managers].sort((a, b) => {       
        var cityA = a.city, cityB = b.city
        return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setManagers(sortedWorker)
    } else {
      const sortedWorker = [...companys].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по убыванию 
      })

      //setManagerCount(sortedWorker)
      setManagers(sortedWorker)
    }
    
  }

//ЕЩЁ
const clickNext = async() => {
  setLoading2(true)

  //1 все специалисты
  let response = await getManagerCount(20, managers.length);
  //console.log("workers size: ", response)

  const arrManagers = []
  
    response.reverse().map(async (user, i) => {
      const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
      const d2 = new Date(d)

      const month = String(d2.getMonth()+1).padStart(2, "0");
      const day = String(d2.getDate()).padStart(2, "0");
      const chas = d2.getHours();
      const min = String(d2.getMinutes()).padStart(2, "0");
      
      const newDate = `${day}.${month} ${chas}:${min}`;

      let str_sfera = ''
      user.sfera && JSON.parse(user.sfera).map((item, index)=> {
        str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
      })

      let str_komteg = ''
      user.comteg && JSON.parse(user.comteg).map((item, index)=> {
        str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
      })

      let str_company = ''
      let str_company_name = ''
      const comp = companysAll.find(item=> parseInt(item.id) === parseInt(user.companyId))
      if (comp) {
        str_company = comp.id
        str_company_name = comp.title
      }

      let str_comment = ''
      user.comment && JSON.parse(user.comment).map((item, index)=> {
        str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
      })      
      

      const newUser = {
        id: user.id,
        fio: user.fio,
        chatId: user.chatId, 
        phone: user.phone, 
        phone2: user.phone2,
        city: user.city, 
        sfera: str_sfera,
        dolgnost: user.dolgnost,
        company: str_company, 
        companyName: str_company_name,
        comteg: str_komteg, 
        comment: str_comment, 
        inn: user.inn, 
        profile: user.profile, 
        dogovor: user.dogovor ? '🟢' : '🔴', 
        email: user.email, 
        projects: user.projects,
        block: user.block,
      }
      arrManagers.push(newUser)

       //если элемент массива последний
      if (i === response.length-1) {
        const sortedUser = [...arrManagers].sort((a, b) => {       
          var idA = a.id, idB = b.id 
          return idB-idA  //сортировка по возрастанию 
        })

        setManagerCount(sortedUser)
        setManagers(sortedUser)
        
        //сохранить кэш
        //localStorage.setItem("specialist", JSON.stringify(sortedUser));

        setLoading2(false)
      }
    })    
    
}


  const clickFio = (user)=> {
    console.log("user: ", user)

    setShowProfile(true)
    setModalUser(user)
    setShowSearch(false)
    setShowClear(false)

    const currentYear = new Date().getFullYear()

    setId(user.id)
    setFio(user.fio)
    setCity(user.city ? user.city : '')
    setCompany(user.company)
    setCompanyName(user.companyName)
    setDolgnost(user.dolgnost)
    setSfera(user.sfera ? user.sfera.split(',') : [])
    setPhone(user.phone)
    setPhone2(user.phone2)
    setTelegram(user.chatId)
    setProjects(user.projects)
    // setCompany(worker.company ? worker.company.split(',') : [])
    setInn(user.inn === null ? '' : user.inn)
    setComteg(user.comteg ? user.comteg.split(',') : [])
    setEmail(user.email)
    setComment(user.comment)
    setProfile(user.profile)
    setDogovor(user.dogovor)
    setOffice(user.office)
    setSklad(user.sklad)
    setBlock(user.block)

    if (userbots) {
      setNik(userbots.find((item) => user.chatId?.toString() === user.chatId?.toString())?.username)
      setDateReg(userbots.find((item) => user.chatId?.toString() === user.chatId?.toString())?.createdAt)
    }
  }

  const onChangeReyting = () => {
    setShowBlacklist(false)
    setShowMenu2(false)

    //убрать из списка специальностей Blacklist
    const res = sfera.filter(item=>item !== 'Blacklist')
    console.log("sfera: ", res)

    setSfera(res)
  }

  const onChangeBlacklist = () => {
    setShowBlacklist(true)
    setShowMenu1(false)

    //добавить в список специальностей Blacklist
    sfera.push('Blacklist')
    console.log("sfera: ", sfera)

    setSfera(sfera)
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

      let sferaArr = []
      let strSfera = ''
      sfera.map((item, index)=> {
        const obj = {
          name: item,
        }
        strSfera = strSfera + item + (index+1 !== sfera.length ? ', ' : '')
        sferaArr.push(obj)
      })


      let comtegArr = []
      let strComteg = ''
      comteg.map((item, index)=> {
        const obj = {
          name: item,
        }
        strComteg = strComteg + item + (index+1 !== comteg.length ? ', ' : '')
        comtegArr.push(obj)
      })

      //комментарии 1
      let commentArr = []
      let strComment = ''
      const obj1 = {
        content: comment,
      }
      strComment = comment
      commentArr.push(obj1)

      let str_company = ''
      let str_company_name = ''
      const comp = companysAll.find(item=> parseInt(item.id) === parseInt(company))
      if (comp) {
        str_company = comp.id
        str_company_name = comp.title
      }

      const saveData = {
        fio,
        chatId: telegram,
        phone, 
        phone2,
        city, 
        sfera: JSON.stringify(sferaArr),
        dolgnost: dolgnost,
        company: str_company,
        comteg: JSON.stringify(comtegArr),
        comment: JSON.stringify(commentArr), 
        profile, 
        dogovor: dogovor ? '🟢' : '🔴', 
        email: email, 
        block,
      }
      console.log(saveData)
  
      //сохранить в контексте
      setManagers((man) => {	 
        let userIndex = man.findIndex((item) => item.id === id);
        const usersCopy = JSON.parse(JSON.stringify(man));
  
        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          fio, 
          chatId: telegram,
          phone, 
          phone2,
          city: city, 
          sfera: strSfera,
          dolgnost: dolgnost,
          company: str_company,
          companyName: str_company_name,
          comteg: strComteg,
          comment: strComment,  
          block, 
          profile,
          email,
        };
  
        console.log("update user: ", usersCopy[userIndex])
  
        return usersCopy;
      });
  
      //сохранить изменения в базе
      await editManager(saveData, id)
  
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
  }

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 


  const onChangeCompany = (e) => {
    setCompanyName(e.target.value)     
  }
  
  const handleTg = event => {
    const result = event.target.value.replace(/\D/g, '');
    setTelegram(result);
  };

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
                              Всего: {managersCount}
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
                                        <CTableHeaderCell className='myfio-th widthFio' onClick={onSortFio}>ФИО</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthTg' onClick={onSortTG}>Телеграм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthCity' onClick={onSortCity}>Город</CTableHeaderCell>                                           
                                        <CTableHeaderCell className='my-th widthCompany'>Компания</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Должность</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон №2</CTableHeaderCell>                                        
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>                         
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>                     
                                        <CTableHeaderCell className='my-th widthSpace'>Офис</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Склад</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>ИНН</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Сфера деятельности</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Д</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody >                                  
                                    {managers.map((item, index) => (
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
                                          {item.companyName ? (item.companyName.length > 20 ? item.companyName.substr(0, 20) + '...' : item.companyName) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.dolgnost}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone2}
                                          </CTableDataCell>
                                          
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.projects}
                                          </CTableDataCell>
                                          
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg ? (item.comteg.length > 30 ? item.comteg.substr(0, 30) + '...' : item.comteg) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>                                        
                                          <CTableDataCell className="text-center widthSpace">

                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">

                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.inn}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                            {item.sfera ? (item.sfera.length > 30 ? item.sfera.substr(0, 30) + '...' : item.sfera) : ''}
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
                                    }
                                    
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

                                  <label>В системе</label>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" value={dateReg && dateReg.length >0 ? dateReg.split('-')[2].split('T')[0] + '.' + dateReg.split('-')[1] + '.' + dateReg.split('-')[0] : ''} style={{width: '250px'}}/>
                                    </div>
                                  </div> 


                                  <label>ИНН</label>
                                  <div className="text-field">
                                    <InputMask
                                        disabled
                                        className="text-field__input" 
                                        style={{width: '250px'}}
                                        type="text" 
                                        name="inn" 
                                        id="inn"
                                        mask="9999-999999-99"
                                        maskChar=""
                                        //onChange={(e) => setInn(e.target.value)} 
                                        value={inn}
                                        placeholder=''
                                    >
                                    </InputMask>
                                  </div> 

                                  <div>  
                                    <div>
                                      <label>Договор</label>
                                      <div style={{display: 'flex'}}>
                                        <input className="text-field__input" type="text" name="inn" id="inn" value='01.01.2024' onChange={(e) => setDogovor(e.target.value)} style={{width: '100%', paddingLeft: '5px', fontSize: '12px'}}/>
                                        <div className="text-field" style={{marginLeft:'-10px', backgroundColor: '#131c21'}}>
                                          <input className="text-field__input" type="text" name="samozanjatost" id="samozanjatost" value={dogovor} onChange={(e) => setDogovor(e.target.value)} style={{width: '40px', padding: '0', fontSize: '20px'}}/>
                                        </div> 
                                      </div>
                                    </div>  
                                  </div>
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: block ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{block ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e)=>setFio(e.target.value)} style={{backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
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
                                        options={sortedCities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      />
                                  </div>

                                  <label>Компания</label>
                                  <div className="text-field"> 
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
                                        onChange={(event, newValue) => {
                                            if (newValue && newValue.length) {
                                                
                                                const comp = companysAll.find(item=> item.title === newValue)
                                                console.log("comp: ", comp)
                                                if (comp) {
                                                  setCompanyName(comp.title)
                                                  setCompany(comp.id);
                                                  setInn(comp.inn) 
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

                                  <label>Должность</label>
                                  <div className="text-field"> 
                                      <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={dolgnostData}
                                        selected={dolgnost}
                                        setSelected={setDolgnost}
                                        // onChange={addCity}
                                      />
                                  </div>

                                  {/* email */}
                                  <label>Почта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 

                                  <label>Сфера деятельности</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={sfera.filter(item=>item !== 'Blacklist')}
                                        setTags={setSfera}
                                        options={sferaData}
                                      />
                                  </div>

                                  <label>Комтеги</label>
                                  <div className="text-field"> 
                                      <MyDropdown2
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                      />
                                  </div>
                                  
                                </div>

{/* 3 */}
<div style={{marginLeft: '40px', marginTop: '80px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div className="uley-line" style={{left: '670px', width: '50px'}}></div>
                                  <div style={{display: 'flex', marginBottom: '24px'}}>
                                    
                                    {/* проекты за месяц */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>

                                    {/* phone1 */}
                                    <div className="text-field" onMouseOver={()=>setShowSavePhone1(true)} onMouseOut={()=>setShowSavePhone1(false)}>
                                      <img 
                                        src={Disketa} 
                                        onClick={()=>{navigator.clipboard.writeText(phone)}} 
                                        alt="" 
                                        style={{visibility: showSavePhone1 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                      />
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '225px'}}
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

                                  </div>

                                  <div className="uley-line" style={{left: '670px', top: '151px', width: '50px'}}></div>
                                  <div style={{display: 'flex'}}>                                   
                                    {/* проекты за месяц */}
                                    <div className="text-field" >
                                      <input disabled className="text-field__input" type="text" name="projects" id="projects" value={projects} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>
                                    {/* проекты всего */}
                                    <div className="text-field">
                                      <input disabled className="text-field__input" type="text" name="projects" id="projects" value={projects} style={{width: '40px', marginRight: '8px'}}/>
                                    </div>

                                    {/* phone2 */}
                                    <div className="text-field" onMouseOver={()=>setShowSavePhone2(true)} onMouseOut={()=>setShowSavePhone2(false)}>
                                      <img 
                                        src={Disketa} 
                                        onClick={()=>{navigator.clipboard.writeText(phone2)}} 
                                        alt="" 
                                        style={{visibility: showSavePhone2 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                      />
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '225px'}}
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

                                  </div>
                                  
                                  {/*  */}
                                  <label>Офис</label>
                                  <div className="text-field">
                                    <input disabled className="text-field__input" type="text" name="office" id="office" value={office}/>
                                  </div> 

                                  {/*  */}
                                  <label>Склад</label>
                                  <div className="text-field">
                                    <input disabled className="text-field__input" type="text" name="sklad" id="sklad" value={sklad} />
                                  </div> 

                                  <label>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', width: '320px', height: '246px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 


                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '56px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  <label>Telegram</label>
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
                                      onChange={handleTg} 
                                      style={{width: '250px'}}
                                    />
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
                                    <input disabled className="text-field__input" type="text" name="nik" id="nik" value={nik} style={{width: '250px'}}/>
                                  </div> 


                                  <label>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '415px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
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

export default Managers
