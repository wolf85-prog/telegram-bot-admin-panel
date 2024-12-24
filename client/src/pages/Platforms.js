import React, { Suspense, useState, useEffect } from 'react'
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCollapse,
  CButton, 
  CTooltip,
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
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import { useUsersContext } from "../chat-app-new/context/usersContext";

import Autocomplete from '@mui/material/Autocomplete';
import DatePicker from "react-datepicker";
import Dropdown from 'react-bootstrap/Dropdown';
import InputMask from 'react-input-mask';

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';
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

import statusData from 'src/data/statusData';
import cities from 'src/data/cities';
import specifikaData from 'src/data/specifikaData';
import vids from 'src/data/vids';
import comtegs from 'src/data/comtegs';
import specOnlyData2 from 'src/data/specOnlyData2';

import { getProjectsDel, editProject } from '../http/projectAPI'
import { useAsyncError } from 'react-router-dom';
import Filters from 'src/components/table/Filters2'
import { getPlatforms, getPlatformId, editPlatform, getPlatformCount, addPlatform, deletePlatform } from 'src/http/platformAPI';

const Platforms = () => {
  const { platforms, setPlatforms, platformsAll, setPlatformsAll } = useUsersContext();

  const [platformCount, setPlatformCount] = useState([]);

  const [projects, setProjects] = useState([])
  const [showProject, setShowProject] = useState(false)

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
  const [blockW, setBlockW] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)
  
  const [cityValue, setCityValue] = useState(0)
  
  const [showSave, setShowSave] = useState(false)
  const [showSave2, setShowSave2] = useState(false)
  const [showSave3, setShowSave3] = useState(false)

  const [showSaveAddress, setShowSaveAddress] = useState(false)
  const [showSaveTrack, setShowSaveTrack] = useState(false)
  const [showSaveUrl, setShowSaveUrl] = useState(false)

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [track, setTrack] = useState('');
  const [url, setUrl] = useState('');
  const [comment, setComment] = useState('');

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState('');
  const [image, setImage]= useState("");

  const [height, setHeight] = useState(600)
  const [sortedCities, setSortedCities] = useState([])

  const [countPress, setCountPress] = useState(0);
  const [countPressAddress, setCountPressAddress] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);


    //поиск
  useEffect(() => {
    const filteredData = platformsAll.filter(user=> (user.title)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
    setPlatforms(text === '' ? platformCount : filteredData); 
  
    //setSpecialistsCount(text === '' ? specialistAll.length : filteredData.length)
    //console.log("specialist", specialist)
    setShowClear(text === '' ? false : true)
  }, [text]);

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
    const fetchData = async() => {

      // 2 специалисты 20 чел.
      let response = await getPlatformCount(20, platforms.length)
      console.log("platforms: ", response)

      let arrWorkers = []

      response.map(async (platform, i) => {
        const d = new Date(platform.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;


        const newPlatform = {
          id: platform.id,
          title: platform.title,
          city: platform.city,  
          address: platform.address,
          track: platform.track,
          url: platform.url,
          comment: platform.comment, 
          createdAt: platform.createdAt,
        }
        arrWorkers.push(newPlatform)

        //если элемент массива последний
				if (i === response.length-1) {
          const sortedWorker = [...arrWorkers].sort((a, b) => {           
              let titleA = a.title 
              let titleB = b.title
              // return titleB-titleA  //сортировка по возрастанию 
              if (titleA.toLowerCase() < titleB.toLowerCase()) {
                return -1;
              }
              if (titleA.toLowerCase() > titleB.toLowerCase()) {
                return 1;
              }
              return 0;
          })

					setPlatformCount(sortedWorker)
          setPlatforms(sortedWorker)
					
					//сохранить кэш
					//localStorage.setItem("specialist", JSON.stringify(sortedWorker));
				}

      })  

      setLoading(false)

      // let wuserbots = await getWContacts();
      // console.log("wuserbots: ", wuserbots)
      // setUserbots(wuserbots) 
    }

    fetchData()
    
}, [])

const openPlatform = (resPlatform) => {
  console.log("resPlatform: ", resPlatform)
  console.log("id: ", resPlatform.id)

  setShowProfile(true)
  setShowSearch(false)
  setShowClear(false)

  setId(resPlatform.id)

  if (resPlatform) {
    setTitle(resPlatform.title)
    setCity(resPlatform.city !== null ? resPlatform.city : '')
    setAddress(resPlatform.address)
    setTrack(resPlatform.track)
    setUrl(resPlatform.url)
    setComment(resPlatform.comment)
  }
  
  

  setTimeout(()=> {
    setHeight(509)
  }, 200)
  
}


 //сохранить профиль
 const savePlatforma = async() => { 
  console.log("id: ", id)

  const saveData = {   
    title, 
    city,
    address,
    track,
    url,
    comment,
  }
  console.log("saveData: ", saveData)

  setPlatforms((platforms) => {	
  
    let userIndex = platformsAll.findIndex((plat) => plat.id === id);
    const usersCopy = JSON.parse(JSON.stringify(platformsAll));

    const userObject = usersCopy[userIndex];
    usersCopy[userIndex] = { ...userObject, 
      title, 
      city,
      address,
      track,
      url,
      comment,
    };

    console.log("update user: ", usersCopy[userIndex])

    return usersCopy;
  });

  //сохранить изменения в базе
  await editPlatform(saveData, id)

  //Toast
  setShowModal(true)
  //addToast(exampleToast) //ваши данные сохранены

  setTimeout(()=> {
    setShowModal(false)
    closeProfile()
  }, 500)
 
}


const closeProfile = () => {
  setShowProfile(false)
  setShowClose(false)
  setShowSearch(true)

  setShowClear(true)
  //setFilePreview('')
  //setCityValue(0)
}

const onChangeReyting = () => {
  setShowBlacklist(false)
  setShowMenu2(false)

  //убрать из списка специальностей Blacklist
  // const res = speclist.filter(item=>item !== 'Blacklist')
  // console.log("speclist: ", res)

  // setSpeclist(res)
}

const onChangeBlacklist = () => {
  setShowBlacklist(true)
  setShowMenu1(false)

  //добавить в список специальностей Blacklist
  // speclist.push('Blacklist')
  // console.log("speclist: ", speclist)

  // setSpeclist(speclist)
}

const onChangeBlock18 = () => {
  setShowBlock18(!showBlock18)
  setShowMenuBlock18(false)
  setBlock18(!block18)
}  

const onChangeKrest = () => {
  setShowKrest(!showKrest)
  setShowMenuKrest(false)
  setBlockW(!blockW)
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

const clickAdd = async()=> {   

  const data = {
    title: 'Новая площадка',
  }
  
  const res = await addPlatform(data)


  platforms.push(
    {
      id: res?.id, 
      title: res?.title, 
      city: '',
      address: '',
      track: '',  
      url: '', 
      karta: '', 
      comment: '', 
  })

  const sortedUser = [...platforms].sort((a, b) => {       
    var idA = a.id, idB = b.id 
    return idB-idA  //сортировка по возрастанию 
  })

  setPlatforms(sortedUser)
}

//ЕЩЁ
const clickNext = async() => {
  //1 все платформы
  let response = await getPlatformCount(20, platforms.length);
  console.log("platforms size: ", response)

  const arrayWorker = []
  
    response.reverse().map(async (platform) => {
      const d = new Date(platform.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
      const d2 = new Date(d)

      const month = String(d2.getMonth()+1).padStart(2, "0");
      const day = String(d2.getDate()).padStart(2, "0");
      const chas = d2.getHours();
      const min = String(d2.getMinutes()).padStart(2, "0");
      
      const newDate = `${day}.${month} ${chas}:${min}`; 

      const newPlatform = {
        id: platform.id,
        title: platform.title,
        city: platform.city,  
        address: platform.address,
        track: platform.track,
        url: platform.url,
        comment: platform.comment, 
        createdAt: platform.createdAt,
      }
  
      arrayWorker.push(newPlatform)
    })    

    
    const sortedWorker = [...arrayWorker].sort((a, b) => {       
      let titleA = a.title 
			let titleB = b.title
			// return titleB-titleA  //сортировка по возрастанию 
			if (titleA.toLowerCase() < titleB.toLowerCase()) {
				return -1;
			}
			if (titleA.toLowerCase() > titleB.toLowerCase()) {
				return 1;
			}
			return 0;
    })
    
    setPlatforms(sortedWorker)

    setPlatformCount(sortedWorker)
}


//сортировка по ФИО
const onSortTitle = () => {
  setCountPress(countPress + 1)
  
  if (countPress + 1 >= 3) {
    setCountPress(0)
  }
  console.log("check sort", countPress + 1)

  if (countPress + 1 === 1) {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var fioA = a.title.toUpperCase(), fioB = b.title.toUpperCase(); 
      return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else if (countPress + 1 === 2) {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var fioA = a.title.toUpperCase(), fioB = b.title.toUpperCase(); 
      return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var fioA = a.id, fioB = b.id 
      return fioB-fioA  //сортировка по убыванию 
    })
    setPlatforms(sortedWorker)
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
    const sortedWorker = [...platforms].sort((a, b) => {      
      var cityA = a.city ? a.city.toUpperCase() : ''
      var cityB = b.city ? b.city.toUpperCase() : ''
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else if (countPressCity + 1 === 2) {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var cityA = a.city ? a.city.toUpperCase() : ''
      var cityB = b.city ? b.city.toUpperCase() : ''
      return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по убыванию 
    })

    //setSpecialistCount(sortedWorker)
    setPlatforms(sortedWorker)
  }
  
}

//сортировка по адресу
const onSortAddress = () => {
  setCountPressAddress(countPressAddress + 1)
  
  if (countPressAddress + 1 >= 3) {
    setCountPressAddress(0)
  }
  //console.log("check sort", countPressTG + 1)

  if (countPressAddress + 1 === 1) {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var cityA = a.address, cityB = b.address
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else if (countPressAddress + 1 === 2) {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var cityA = a.address, cityB = b.address
      return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    setPlatforms(sortedWorker)
  } else {
    const sortedWorker = [...platforms].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по убыванию 
    })

    //setSpecialistCount(sortedWorker)
    setPlatforms(sortedWorker)
  } 
}

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }

  //удаление платформы
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    //удаление платформы из БД
    await deletePlatform(id)


    //addToast(deleteToast) //ваши данные сохранены

    setPlatforms([...platforms].filter(item=>item.id !== id))

    closeProfile()
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Площадки</h2> */}
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
                    <CCard className="mb-4">
                      <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                        Всего: {platformsAll.length}
                      </p>
                      <CCardBody style={{padding: '12px'}}>
                        {/* {!showProject ? <Filters /> : '' } */}
                        {!showProfile ? 
                        
                        (loading ?                                      
                          <CSpinner/> :
                          <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1400px', borderRadius: '5px' }}>
                            <CTableHead className="text-center" color="light">
                                    <CTableRow>
                                      <CTableHeaderCell className="text-center" style={{width: '61px'}}>№</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{width: '270px', cursor: 'pointer'}} onClick={onSortTitle}>Название</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{minWidth: '150px', cursor: 'pointer'}} onClick={onSortCity}>Город</CTableHeaderCell>  
                                      <CTableHeaderCell className="text-center" style={{minWidth: '250px', cursor: 'pointer'}} onClick={onSortAddress}>Адрес</CTableHeaderCell>
                                      <CTableHeaderCell className="text-center" style={{minWidth: '265px'}}>Как добраться</CTableHeaderCell> 
                                      <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Ссылка</CTableHeaderCell>                      
                                      <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Карта</CTableHeaderCell>
                                    </CTableRow>
                                  </CTableHead>      
                                  <CTableBody> 
                                  { platforms.map((item, index)=> ( 
                                      <CTableRow key={item.id}  v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                        <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                          {index+1}                        
                                        </CTableDataCell> 
                                        <CTableDataCell onClick={()=>openPlatform(item)} style={{cursor: 'pointer'}}>
                                          {item.title && item.title.length > 25 ? item.title.substr(0, 25) + '...' : item.title}  
                                        </CTableDataCell>  
                                        <CTableDataCell className="text-center">
                                          {item.city} 
                                        </CTableDataCell>   
                                        <CTableDataCell className="text-center">
                                          {item.address && item.address.length > 25 ? item.address.substr(0, 25) + '...' : item.address} 
                                        </CTableDataCell> 
                                        <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                          {item.track && item.track.length > 25 ? item.track.substr(0, 25) + '...' : item.track} 
                                        </CTableDataCell>
                                        <CTableDataCell className="text-center widthSpace">
                                          {item.url && item.url.length > 20 ? item.url.substr(0, 20) + '...' : item.url} 
                                        </CTableDataCell>   
                                        <CTableDataCell className="text-center">
                                          {item.karta} 
                                        </CTableDataCell>            
                                      </CTableRow>
                                    ))
                                  }  
                                  </CTableBody>                   
                          </CTable> 
                        )
                        :
                        <div style={{position: 'relative', height: '448px', display: 'flex', flexDirection: 'row'}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {/* {
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  :  */}
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  
                                  {/* } */}
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
                                  
                                </div>
                                  <img src={imgBlock18} className="block-img"  width={50} alt='' style={{position: 'absolute', top: '0px', left: '195px', opacity: block18 ? '1' : '0' }}/>                                 
                                  <div className="menu-content-block">
                                    <span onClick={onChangeBlock18} style={{cursor: 'pointer'}}>{block18 ? 'Убрать' : 'Добавить'} 18+</span>
                                  </div>
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: blockW ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{blockW ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      <Icon id="delete" onClick={()=>clickDelete(id)} />
                                      <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={savePlatforma} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>
                                      {/* 2 */}
                                <div style={{ textAlign: 'center', marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '100%', position: 'relative'}}>
                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {/* Город */}
                                    <label className='title-label' style={{position: 'absolute', top: '-25px', left: '100px'}}>Город</label>
                                    <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative', marginRight: '40px', width: '250px'}}> 
                                        {/* <CFormSelect 
                                          aria-label="Default select example"
                                          style={{backgroundColor: '#131c21'}}
                                          options={sortedCities}
                                        />
                                        <img src={Close} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img> */}
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

                                    <div className="text-field" style={{marginRight: '40px'}}>
                                      <input disabled className="text-field__input" type="text" />
                                    </div> 

                                    <div className="text-field" >
                                      <input disabled className="text-field__input" type="text" />
                                    </div> 
                                  </div>
                                  
                                  

                                  <label className='title-label'>Адрес</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveAddress(true)} onMouseOut={()=>setShowSaveAddress(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(address)}} 
                                      alt="" 
                                      style={{visibility: showSaveAddress ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input disabled={false} className="text-field__input" type="text" name="address" id="address" value={address} onChange={(e)=>setAddress(e.target.value)} />
                                  </div> 

                                  <label className='title-label'>Как добраться</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveTrack(true)} onMouseOut={()=>setShowSaveTrack(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(track)}} 
                                      alt="" 
                                      style={{visibility: showSaveTrack ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input disabled={false} className="text-field__input" type="text" name="track" id="track" value={track} onChange={(e)=>setTrack(e.target.value)}/>
                                  </div> 

                                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginRight: '40px'}}>
                                      <label className='title-label'>Ссылка на карту</label>
                                      <div className="text-field" onMouseOver={()=>setShowSaveUrl(true)} onMouseOut={()=>setShowSaveUrl(false)}>
                                        <img 
                                          src={Disketa} 
                                          onClick={()=>{navigator.clipboard.writeText(url)}} 
                                          alt="" 
                                          style={{visibility: showSaveUrl ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                        />
                                        <input disabled={false} className="text-field__input" type="text" name="url" id="url" value={url} onChange={(e)=>setUrl(e.target.value)}/>
                                      </div> 

                                      <label className='title-label'>Карта</label>
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" />
                                      </div> 
                                    </div>

                                    <div style={{width: '50%'}}>
                                      <label className='title-label'>Комментарии</label>
                                      <div className="text-field" style={{marginBottom: '0px'}}>
                                        <textarea 
                                          className="text-field__input" 
                                          type="text" 
                                          name="comment2" 
                                          id="comment2" 
                                          value={comment} onChange={(e) => setComment(e.target.value)} 
                                          style={{resize: 'none', height: '125px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}/>
                                      </div> 
                                    </div>
                                    
                                  </div>

                                  

                                </div>

{/* 4 */}
                                <div style={{ textAlign: 'center', marginLeft: '40px', marginTop: '46px', display: 'flex', flexDirection: 'column', width: '250px', position: 'relative'}}>

                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '378px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
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

                    <CModal
                      alignment="center"
                      visible={showModal}
                      onClose={() => setShowModal(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '15px'}}>
                        Данные успешно сохранены!
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
                                            Площадка будет удалена из базы!
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

export default Platforms
