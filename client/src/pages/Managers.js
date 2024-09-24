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

//Workers.js
const Managers = () => {

  const { setCountPretendent, pretendents, setPretendents } = useUsersContext();

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

  
  const [showSave, setShowSave] = useState(false)
  const [showSave2, setShowSave2] = useState(false)
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
    setLoading(false)
  }, [])

  const clickAdd = async()=> {   

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
                                        <CTableHeaderCell className='myfio-th widthSpace' onClick={onSortFio}>ФИО</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthTg' onClick={onSortTG}>Телеграм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Специальность</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace' onClick={onSortCity}>Город</CTableHeaderCell>   
                                        <CTableHeaderCell className='my-th widthSpace'>Год</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон №2</CTableHeaderCell>                         
                                        <CTableHeaderCell className='my-th widthSpace'>Навык</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Промокод</CTableHeaderCell>                                       
                                        <CTableHeaderCell className='my-th widthSpace'>Мерч</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Прокатная компания</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег №2</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии №2</CTableHeaderCell>                                        
                                        <CTableHeaderCell className='my-th widthSpace'>Рейтинг</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>ИНН</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Д</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>С</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт [скан]</CTableHeaderCell>
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
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.speclist ? (item.speclist.length > 30 ? item.speclist.substr(0, 30) + '...' : item.speclist) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.city ? (item.city.length > 30 ? item.city.substr(0, 30) + '...' : item.city) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.age ? item.age.split('-')[0] : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.rank}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.phone2}
                                          </CTableDataCell> 
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.skill}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.promo}
                                          </CTableDataCell>                                         
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.merch}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.company ? (item.company.length > 20 ? item.company.substr(0, 20) + '...' : item.company) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg ? (item.comteg.length > 30 ? item.comteg.substr(0, 30) + '...' : item.comteg) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg2 ? (item.comteg2.length > 30 ? item.comteg2.substr(0, 30) + '...' : item.comteg2) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment2 ? (item.comment2.length > 30 ? item.comment2.substr(0, 30) + '...' : item.comment2) : ''}
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
                                          {item.samozanjatost}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.passportScan}
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
                              <div style={{position: 'relative', height: '765px', display: 'flex', flexDirection: 'row'}}>
                                <div style={{display: 'flex', flexDirection: 'column', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }

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
