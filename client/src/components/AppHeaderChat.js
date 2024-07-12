import React, {useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CButton,
  CFormInput,
  CProgress,
  CToastBody,
  CToastClose,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'
import logo from './../assets/brand/logo_04_light.png'
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Krestik from './../assets/images/krestik.png';
import block18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.gif";
import Photo1 from "./../assets/images/photo_1.jpg";
import Help from "./../assets/images/help.png";
import Help2 from "./../assets/images/help2.png";
import Next from "./../assets/images/next.png";
import Next2 from "./../assets/images/next2.png";
import Vopros from "./../assets/images/vopros.png";
import Vopros2 from "./../assets/images/vopros2.png";
import Error from "./../assets/images/error.png";
import Error2 from "./../assets/images/error2.png";
import Delete from "./../assets/images/cart.png";
import Delete2 from "./../assets/images/cart2.png";

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { AppHeaderDropdown } from './header/index'
import { getUpdateWorkers, getUpdateAvatars } from './../http/adminAPI';

const AppHeaderChat = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { workerUpdate, setWorkerUpdate, avatarUpdate, setAvatarUpdate, showUpdate, showUpdate2, setShowUpdate, setShowUpdate2, 
    workerCall, showCallCard, setShowCallCard, workerCallNo, showCallCardNo, setShowCallCardNo, callIndex, callIndex2, 
    soundVolume, setSoundVolume, soundMute, setSoundMute} = useUsersContext();

  const [soundCount, setSoundCount] = useState(100)
  const [mutePress, setMutePress] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const [showBarHelp, setShowBarHelp] = useState(false)
  const [toast, addToast] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [shake, setShake] = useState(false)
  const [shake2, setShake2] = useState(false)
  const toaster = useRef()

  const [workerCall2, setWorkerCall2] = useState({tg_id: '805436270', fio: 'Иванов Иван Ивановия', sity: 'Майкоп', year_of_birth: '01.01.1985', projects: '5', 
  specialities: 'Художник по свету,Звукорежиссер,Backline,Репортажная съемка,Диджей,Ведущий,Официант,Инженер Resolume,+18,Blacklist', 
  comtags: 'опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание, опоздание',
avatar: 'https://proj.uley.team/avatars/avatar_866043147_12-5-2024T14:38.jpg'})


  const clickPhone = () => {
    //addToast(exampleToast) //ваша рассылка удалена
    setShowToast(!showToast)
    //setShowCallCard(!showCallCard)
  }

  const plusSound = () => {
    // Button begins to shake
    setShake2(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake2(false), 200);

    if (soundCount === 75) {
      setSoundCount(100)
      setSoundVolume(1.0)
    } else if (soundCount === 50) {
      setSoundCount(75)
      setSoundVolume(0.75)
    } else if (soundCount === 25) {
      setSoundCount(50)
      setSoundVolume(0.5)
    } else if (soundCount === 0) {
      setSoundCount(25)
      setSoundVolume(0.25)
    }   
  }

  const minusSound = () => {
    // Button begins to shake
    setShake(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 200);

    if (soundCount === 100) {
      setSoundCount(75)
      setSoundVolume(0.75)
    } else if (soundCount === 75) {
      setSoundCount(50)
      setSoundVolume(0.50)
    } else if (soundCount === 50) {
      setSoundCount(25)
      setSoundVolume(0.25)
    } else if (soundCount === 25) {
      setSoundCount(0)
      setSoundVolume(0.0)
    } 
  }

  const updateD = async() => {
    // Button begins to shake
    if (showUpdate) {
      setShowUpdate(false);
    } else {
      setShowUpdate(true);
    }

    setWorkerUpdate(0)
    
    const resUpdate = await getUpdateWorkers()
  }

  const handleLinkClick = (url) => {
    // Open the link in a new tab with desired features (optional)
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clickMute = () => {
    setMutePress(!mutePress)
    setSoundMute(!soundMute)
  }

  return (
    <CHeader position="sticky" >
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
          {/* <h5>U.L.E.Y TEAM</h5> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Пункт управления
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/chat2">Менеджеры</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/chat3">Проекты</CNavLink>
          </CNavItem>
        </CHeaderNav>
        
        <CHeaderNav style={{marginTop: 'auto', display: 'flex', alignItems: 'center'}}>
          {/* + */}
          <CNavItem>
            <CButton onClick={plusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: shake2 ? '#262829' : '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              +
            </CButton>
          </CNavItem>
          
          <CNavItem>
            <CFormInput 
              id="autoSizingInput" 
              style={{width: '25px', textAlign:'center', marginRight: '10px', fontSize: '12px', marginRight: '10px', height: '25px', paddingLeft: '0px', paddingRight: '0px', marginTop: '-2px'}}
              value={soundCount}
            />
            </CNavItem> 
          
          {/* - */}
          <CNavItem> 
            <CButton onClick={minusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: shake ? '#262829' : '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              -
            </CButton>
          </CNavItem>
          
          {/* Mute */}
          <CNavItem>
            <CButton onClick={clickMute} className={mutePress ? 'button-m' : ''} color="dark" style={{marginRight: '20px', background: 'red', fontSize: '7px', width: '23px', height: '23px', paddingRight: '0px', paddingLeft: '0px', marginTop: '-7px'}}>
              Mute
            </CButton>
          </CNavItem>

          {/* Инструкция*/}
          <CNavItem>
            <CTooltip
              content="Инструкция"
              placement="bottom"
            >
              <CNavLink onClick={()=>handleLinkClick('https://www.notion.so/amusienko/dfed170e9f0242f8af156b8d175f038e?v=d6a54b36fb4b4e2487256a2f2578ecbc')} style={{position: 'relative', cursor: 'pointer'}}>
                <img src={Vopros} onMouseOver={e => (e.currentTarget.src = Vopros2)} onMouseOut={e => (e.currentTarget.src = Vopros)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Команды*/}
          <CNavItem>
            <CTooltip
              content="Команды / Триггеры"
              placement="bottom"
            >
              <CNavLink onClick={()=>setShowBarHelp(!showBarHelp)} style={{position: 'relative', cursor: 'pointer'}}>
                <img src={Help} onMouseOver={e => (e.currentTarget.src = Help2)} onMouseOut={e => (e.currentTarget.src = Help)}  style={{width: '18px', paddingBottom: '5px'}}/>
                <div
                  style={{
                    backgroundColor: '#2a2f32', 
                    width: '780px', 
                    height: '575px',
                    position: 'absolute', 
                    top: '50px', 
                    right: '10px',
                    display: showBarHelp ? 'flex' : 'none',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderRadius: '15px',
                    border: '1px solid #4b4b4b',
                    padding: '15px',
                  }}>
                    <p style={{fontSize: '13px', paddingRight: '15px'}}><b>Команды:</b><br/>
                      <br/>
                      /help <span style={{color: '#6e6e6e'}}>&mdash; список комманд;</span><br/>
                      /next <span style={{color: '#6e6e6e'}}>&mdash; 10 ближайших запусков;</span><br/>
                      /status <span style={{color: '#6e6e6e'}}>&mdash; вызов кнопок статуса;</span><br/>
                      /info <span style={{color: '#6e6e6e'}}>&mdash; панель информации;</span><br/>
                      <br/>
                      /go <span style={{color: '#6e6e6e'}}>&mdash; перекличка;</span><br/>
                      /phone <span style={{color: '#6e6e6e'}}>&mdash; контакты на площадке;</span><br/>
                      /place <span style={{color: '#6e6e6e'}}>&mdash; адрес площадки;</span><br/>
                      /office <span style={{color: '#6e6e6e'}}>&mdash; адрес офиса &laquo;U.L.E.Y&raquo;;</span><br/>
                      <br/>
                      /hallo <span style={{color: '#6e6e6e'}}>&mdash; приветствие-запрос;</span><br/>
                      /alert <span style={{color: '#6e6e6e'}}>&mdash; вызов на связь всех участников проекта;</span><br/>
                      /update <span style={{color: '#6e6e6e'}}>&mdash; смена основного состава;</span><br/>
                      /mango <span style={{color: '#6e6e6e'}}>&mdash; смена распределения звонков;</span><br/>
                      <br/>
                      /ping <span style={{color: '#6e6e6e'}}>&mdash; тест сервера; [отклик &mdash; Pong]</span><br/>
                      /telegram <span style={{color: '#6e6e6e'}}>&mdash; напоминание отключить блокировку;</span><br/>
                      /boost <span style={{color: '#6e6e6e'}}>&mdash; ускоритель обработки данных нового проекта;</span><br/>
                      /stop <span style={{color: '#6e6e6e'}}>&mdash; остановить смену;</span><br/>
                      <br/>
                      /inn <span style={{color: '#6e6e6e'}}>&mdash; запрос данных о самозанятости специалиста;</span><br/>
                      /id <span style={{color: '#6e6e6e'}}>&mdash; номер ID проекта;</span><br/>
                      /deleted <span style={{color: '#6e6e6e'}}>&mdash; удаленные проекты за 24 часа;</span><br/>
                      /error <span style={{color: '#6e6e6e'}}>&mdash; ошибки в проектах;</span><br/>
                      <br/>
                      /1 /2 /3 /4 /5 <span style={{color: '#6e6e6e'}}>&mdash; перенос запроса статуса окончания работ;</span><br/>
                    </p>
                    <p style={{fontSize: '13px'}}><b>Триггеры:</b><br/>
                      <br/>
                      Правила <span style={{color: '#6e6e6e'}}>&mdash; правила работы на проектах;</span><br/>
                      Такси <span style={{color: '#6e6e6e'}}>&mdash; инструкция по использованию;</span><br/>
                      Геолокация <span style={{color: '#6e6e6e'}}>&mdash; инструкция как подключить;</span><br/>
                      Контакты <span style={{color: '#6e6e6e'}}>&mdash; номер телефона &laquo;U.L.E.Y&raquo;;</span><br/>
                      <br/>
                      Оплата <span style={{color: '#6e6e6e'}}>&mdash; чат-бот &laquo;Office&raquo;;</span><br/>
                      Дресс-код <span style={{color: '#6e6e6e'}}>&mdash; форма одежды;</span><br/>
                      Мерч <span style={{color: '#6e6e6e'}}>&mdash; описание и условия получения;</span><br/>
                      Фотоотчет <span style={{color: '#6e6e6e'}}>&mdash; инструкция по отчету;</span><br/>
                      <br/>
                      Активатор <span style={{color: '#6e6e6e'}}>&mdash; инструкция по активации кнопок;</span><br/>
                      Соня <span style={{color: '#6e6e6e'}}>&mdash; предупреждение о времени выхода на связь;</span><br/>
                      Ночь <span style={{color: '#6e6e6e'}}>&mdash; логистика в ночное время;</span><br/>
                      Сказка на ночь <span style={{color: '#6e6e6e'}}>&mdash; подготовка к ночному проекту;</span><br/>
                      <br/>
                      Оплата <span style={{color: '#6e6e6e'}}>&mdash; чат-бот &laquo;Office&raquo;;</span><br/>
                      Штраф <span style={{color: '#6e6e6e'}}>&mdash; информация о штрафах;</span><br/>
                      Самозанятость <span style={{color: '#6e6e6e'}}>&mdash; НЕ готово;</span><br/>
                      Ставка <span style={{color: '#6e6e6e'}}>&mdash; НЕ готово;</span>
                    </p>
                </div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Обновление данных */}
          <CNavItem>
            <CNavLink style={{position: 'relative'}}>
              <CTooltip
                content="Обновление данных"
                placement="bottom"
              >
                <CIcon icon={cilList} size="lg" onClick={()=>setShowBar(!showBar)}/>
              </CTooltip>
              <div 
                  style={{
                    backgroundColor: '#2a2f32', 
                    // width: '250px', 
                    height: '44px', 
                    position: 'absolute', 
                    top: '50px', 
                    right: '10px',
                    display: showBar ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px',
                    border: '1px solid #4b4b4b',
                    padding: '10px',
                  }}>
                      <div className='dark-theme' style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '200px'}}>
                            <div style={{width:'100%', position: 'relative', textAlign: 'center'}}>
                              <CProgress color="primery" height={10} value={workerUpdate}/>
                              <span style={{position: 'absolute', top: '-3px', fontSize: '10px'}}>{workerUpdate}%</span>
                            </div>
                            <CButton onClick={updateD} className={showUpdate ? 'button-d' : ''} color="dark" style={{marginLeft: '10px', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                              Д
                            </CButton>
                      </div>
              </div>
            </CNavLink>
              {/* <AppHeaderDropdown2 /> */}
          </CNavItem>

          {/* Mango */}
          <CNavItem>
            <CTooltip
              content="Mango"
              placement="bottom"
            >
              <CNavLink onClick={clickPhone} style={{position: 'relative', transform: 'rotate(90deg)', marginBottom: '3px'}}>
                <CIcon icon={cilPhone} size="lg"/>
              </CNavLink>
            </CTooltip>
            <div style={{
              display: showCallCard ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {workerCall.avatar ? 
                      <img src={workerCall.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <svg
                          className="rounded me-2"
                          width="314"
                          height="314"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                      >
                        <rect width="314px" height="314px" fill="#007aff"></rect> 
                      </svg>
                      }
                      <CToastClose onClick={()=>setShowCallCard(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[1] : ''} {workerCall.fio ? workerCall.fio?.split(' ')[2]: ''}</span>
                        <div className="star-block" style={{marginTop: '85px'}}>
                          <img className='star-icon' src={StarActive} width={25} alt='' /> 
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                        </div>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', marginTop: '10px'}}>{workerCall.year_of_birth}</span>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerCall.sity}</span>
                        
                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '16px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {workerCall.projects}
                          </li>
                        </ul>
                        <div style={{overflow: 'auto', height: '70px'}}>
                          <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                            {workerCall.specialities ? workerCall.specialities.split(',').map((item, index)=> 
                              (<li key={index} style={{fontSize: '16px', color: '#858585'}}>
                                {item}
                              </li>)
                            ) : null}    
                          </ul>
                        </div>
                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '5px'}}>
                          <li style={{fontSize: '16px', color: 'red', width:'500px'}}>
                            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                              {workerCall.comtags ? workerCall.comtags.split(',').map((item, index)=> 
                                (<span key={index}>
                                  {item} {index === workerCall.comtags.split(',').length-1 ? '' : '| '}
                                </span>)
                              ) : null}
                            </div>
                            
                          </li>
                        </ul>
                      </div>
                    </div>
                      
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === 'Blacklist') ? 
                      <img src={Krestik} width={30} alt='' style={{position: 'absolute', top: '280px', right: '590px'}}/>
                      : "")
                      : ""
                    }
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === '+18') ? 
                      <img src={block18} width={50} alt='' style={{position: 'absolute', top: '10px', right: '580px'}}/>
                      : "")
                      : ""
                    }

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCard(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div> 
            
            <div style={{
              display: showCallCardNo ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex2}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      
                      <img src={Photo1} alt='' style={{borderRadius: '15px'}} width={314} height={314}/>
                      <CToastClose onClick={()=>setShowCallCardNo(false)} white style={{position: 'absolute'}}/>

                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '40px', position: 'absolute', top: '100px'}}>Номер не зарегистрирован</span>

                        <span style={{fontSize: '26px', color: '#858585', fontWeight: '700', marginTop: '150px'}}>{workerCallNo}</span>
                        
                      </div>
                    </div>

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCardNo(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div>
          </CNavItem>

          {/* Next*/}
          <CNavItem>
            <CTooltip
              content="10 ближайших проектов"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img src={Next} onMouseOver={e => (e.currentTarget.src = Next2)} onMouseOut={e => (e.currentTarget.src = Next)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Корзина*/}
          <CNavItem>
            <CTooltip
              content="Удаленные проекты"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img src={Delete} onMouseOver={e => (e.currentTarget.src = Delete2)} onMouseOut={e => (e.currentTarget.src = Delete)} style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Ошибки*/}
          <CNavItem>
            <CTooltip
              content="Ошибки в проектах"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img src={Error} onMouseOver={e => (e.currentTarget.src = Error2)} onMouseOut={e => (e.currentTarget.src = Error)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Звуки */}
          <CNavItem>
            <CTooltip
              content="Звуковые уведомления"
              placement="bottom"
            >
              <CNavLink href="/soundsnotif" style={{position: 'relative'}}>
                <CIcon icon={cilBell} size="lg" />
                {/* <CBadge color="success" className="ms-2">
                  5
                </CBadge> */}
                {/* { newProject ?  <span className="badge bg-danger-gradient rounded-pill position-absolute top-0 end-0">1</span> 
                : ""
                } */}
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Конверт */}
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeaderChat
