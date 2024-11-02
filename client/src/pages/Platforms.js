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

import { getProjectsDel, editProject } from '../http/projectAPI'
import { useAsyncError } from 'react-router-dom';
import Filters from 'src/components/table/Filters2'
import { getPlatforms, getPlatformId } from 'src/http/platformAPI';

const Platforms = () => {
  const { companysAll, managersAll, workersAll, platformsAll } = useUsersContext();

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
  const [age, setAge] = useState('');
  const [age2, setAge2] = useState(0);
  const [speclist, setSpeclist] = useState([]);
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [skill, setSkill] = useState('');
  const [reyting, setReyting] = useState('');
  const [promo, setPromo] = useState('');
  const [rank, setRank] = useState('');
  const [merch, setMerch] = useState('');
  const [company, setCompany] = useState('');
  const [inn, setInn] = useState('');
  const [comteg, setComteg] = useState('');
  const [comteg2, setComteg2] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comment2, setComment2] = useState('');
  const [passport, setPassport] = useState('');
  const [dogovor, setDogovor] = useState('');
  const [samozanjatost, setSamozanjatost] = useState('');
  const [passportScan, setPassportScan] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [address, setAddress] = useState('');
  const [track, setTrack] = useState('');
  const [url, setUrl] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState('');
  const [image, setImage]= useState("");

  const [height, setHeight] = useState(600)
  const [sortedCities, setSortedCities] = useState([])

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
    // const fetchData = async() => {
    //   const projs = await getProjectsDel()
    //   console.log("projsDel: ", projs)


    //   setProjects(projs)
    // }

    // fetchData()
    
}, [])

const openPlatform = async(id) => {
  console.log("id: ", id)

  const resPlatform = await getPlatformId(id)
  console.log("resPlatform: ", resPlatform)

  setShowProject(true)
  //setId(id)

  if (resPlatform) {
    setTitle(resPlatform.title)
    setCity(resPlatform.city !== null ? resPlatform.city : '')
    setAddress(resPlatform.address)
    setTrack(resPlatform.track)
    setUrl(resPlatform.url)
  }
  
  

  setTimeout(()=> {
    setHeight(509)
  }, 200)
  
}


const closeProfile = () => {
  setShowProject(false)
}

const onChangeReyting = () => {
  setShowBlacklist(false)
  setShowMenu2(false)

  //убрать из списка специальностей Blacklist
  const res = speclist.filter(item=>item !== 'Blacklist')
  console.log("speclist: ", res)

  setSpeclist(res)
}

const onChangeBlacklist = () => {
  setShowBlacklist(true)
  setShowMenu1(false)

  //добавить в список специальностей Blacklist
  speclist.push('Blacklist')
  console.log("speclist: ", speclist)

  setSpeclist(speclist)
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


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Площадки</h2> */}
                    <CCard className="mb-4">
                      <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                        Всего: {platformsAll.length}
                      </p>
                      <CCardBody style={{padding: '12px'}}>
                        {!showProject ? <Filters /> : '' }
                        {!showProject ? <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1400px', borderRadius: '5px' }}>
                          <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '61px'}}>№</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '270px'}}>Название</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '150px'}}>Город</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Адрес</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Как добраться</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Ссылка</CTableHeaderCell>                      
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Карта</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>      
                                <CTableBody> 
                                { platformsAll.map((item, index)=> ( 
                                    <CTableRow key={item.id}  v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                      <CTableDataCell className="text-center" style={{position: 'relative'}}>
                                        {index+1}                        
                                      </CTableDataCell> 
                                      <CTableDataCell onClick={()=>openPlatform(item.id)} className="text-center" style={{cursor: 'pointer'}}>
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
                        :
                        <div style={{position: 'relative', height: '448px', display: 'flex', flexDirection: 'row'}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  
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
                                      <Icon id="delete" />
                                      <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa}style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
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
                                          value={comment2} onChange={(e) => setComment2(e.target.value)} 
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
                    </CCard>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Platforms
