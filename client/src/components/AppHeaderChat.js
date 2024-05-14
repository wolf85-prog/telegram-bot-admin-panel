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

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'
import logo from './../assets/brand/logo_04_light.png'
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Krestik from './../assets/images/krestik.png';
import block18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { workerCall, showCallCard, setShowCallCard, } = useUsersContext();

  const [soundCount, setSoundCount] = useState(100)
  const [mutePress, setMutePress] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const [toast, addToast] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [shake, setShake] = useState(false)
  const [shake2, setShake2] = useState(false)
  const [shake3, setShake3] = useState(false)
  const [shake4, setShake4] = useState(false)
  const toaster = useRef()


  const clickPhone = () => {
    //addToast(exampleToast) //ваша рассылка удалена
    setShowToast(!showToast)
  }

  const plusSound = () => {
    // Button begins to shake
    setShake2(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake2(false), 100);

    if (soundCount === 75) {
      setSoundCount(100)
    } else if (soundCount === 50) {
      setSoundCount(75)
    } else if (soundCount === 25) {
      setSoundCount(50)
    } else if (soundCount === 0) {
      setSoundCount(25)
    }  
  }

  const minusSound = () => {
    // Button begins to shake
    setShake(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 100);

    if (soundCount === 100) {
      setSoundCount(75)
    } else if (soundCount === 75) {
      setSoundCount(50)
    } else if (soundCount === 50) {
      setSoundCount(25)
    } else if (soundCount === 25) {
      setSoundCount(0)
    } 
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
          <CNavItem> 
            <CButton onClick={minusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: shake ? '#262829' : '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              -
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton onClick={()=>setMutePress(!mutePress)} className={mutePress ? 'button-m' : ''} color="dark" style={{marginRight: '20px', background: 'red', fontSize: '7px', width: '23px', height: '23px', paddingRight: '0px', paddingLeft: '0px', marginTop: '-7px'}}>
              Mute
            </CButton>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={clickPhone} style={{position: 'relative', transform: 'rotate(90deg)', marginBottom: '3px'}}>
              <CIcon icon={cilPhone} size="lg"/>
            </CNavLink>
            <div style={{
              display: showCallCard ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              padding: '8px'}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {workerCall.avatar ? 
                      <img src={workerCall.avatar} alt='' style={{borderRadius: '15px'}} width={314} height={314}/>
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
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '44px', position: 'absolute', top: '-10px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '44px', position: 'absolute', top: '37px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[1] : ''} {workerCall.fio ? workerCall.fio?.split(' ')[2]: ''}</span>
                        <span style={{fontSize: '18px', color: '#858585', fontWeight: '700', marginTop: '90px'}}>{workerCall.sity}</span>
                        <span style={{fontSize: '18px', color: '#858585', fontWeight: '700'}}>{workerCall.year_of_birth}</span>
                        <div className="star-block">
                          <img className='star-icon' src={StarActive} width={23} alt='' /> 
                          <img className='star-icon' src={StarActive} width={23} alt='' />
                          <img className='star-icon' src={StarActive} width={23} alt='' />
                          <img className='star-icon' src={Star} width={23} alt='' />
                          <img className='star-icon' src={Star} width={23} alt='' />
                      </div>
                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '14px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {workerCall.projects}
                          </li>
                        </ul>
                        <div style={{overflow: 'auto', height: '65px'}}>
                          <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                            {workerCall.specialities ? workerCall.specialities.split(',').map((item, index)=> 
                              (<li key={index} style={{fontSize: '14px', color: '#858585'}}>
                                {item}
                              </li>)
                            ) : null}    
                          </ul>
                        </div>
                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '0px'}}>
                          <li style={{fontSize: '14px', color: 'red', width:'480px'}}>
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
                      (workerCall.specialities.split(',').find(item => item === '+18') ? 
                      <img src={block18} width={100} alt='' style={{position: 'absolute', top: '230px', right: '580px'}}/>
                      :
                      <img src={Krestik} width={100} alt='' style={{position: 'absolute', top: '230px', right: '580px'}}/>)
                      : "")
                      : ""
                    }
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === '+18') ? 
                      <img src={block18} width={100} alt='' style={{position: 'absolute', top: '230px', right: '580px'}}/>
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
          </CNavItem>
          <CNavItem>
            <CNavLink href="/soundsnotif" style={{position: 'relative'}}>
              <CIcon icon={cilBell} size="lg" />
              {/* <CBadge color="success" className="ms-2">
                5
              </CBadge> */}
              {/* { newProject ?  <span className="badge bg-danger-gradient rounded-pill position-absolute top-0 end-0">1</span> 
              : ""
              } */}
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink style={{position: 'relative'}}>
              <CIcon icon={cilList} size="lg" onClick={()=>setShowBar(!showBar)}/>
              <div 
                style={{
                  backgroundColor: '#2a2f32', 
                  // width: '250px', 
                  height: '80px', 
                  position: 'absolute', 
                  top: '50px', 
                  right: '10px',
                  display: showBar ? 'flex' : 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '15px',
                  padding: '15px',
                }}>
                  <div style={{display: 'flex'}}> 
                    <div className='dark-theme' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '200px'}}>
                          <div style={{marginRight: '20px', marginBottom: '12px', width:'100%', position: 'relative', textAlign: 'center'}}>
                            <CProgress color="primery" height={10} value={10}/>
                            <span style={{position: 'absolute', top: '-3px', fontSize: '10px'}}>10%</span>
                          </div>
                          <div style={{marginRight: '20px', width:'100%', position: 'relative', textAlign: 'center'}}>
                            <CProgress color="primery" height={10} value={100}></CProgress>
                            <span style={{position: 'absolute', top: '-3px', fontSize: '10px'}}>100%</span>
                          </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <CButton color="dark" style={{marginLeft: '10px', marginBottom: '5px', background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                        Д
                      </CButton>
                      <CButton color="dark" style={{marginLeft: '10px',  background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                        А
                      </CButton>
                    </div>
                  </div>
              </div>
            </CNavLink>
            {/* <AppHeaderDropdown2 /> */}
          </CNavItem>
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

export default AppHeader
