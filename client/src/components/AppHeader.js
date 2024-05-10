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
  CProgressBar,
  CToast,
  CToastBody,
  CToaster,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Icon from "./../../src/chat-app-new/components/Icon";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown, AppHeaderDropdown2 } from './header/index'
import logo from './../assets/brand/logo_04_light.png'

import './DropdownHeader.css'

const AppHeader = (props) => {
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

  const updateD = () => {
    // Button begins to shake
    setShake3(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake3(false), 100);
  }

  const updateA = () => {
    // Button begins to shake
    setShake4(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake4(false), 100);
  }

  return (
    <CHeader position="sticky" className="mb-4">
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

        <CToaster ref={toaster} push={toast} placement="top-end" /> 

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
          {/* <CNavItem >
          </CNavItem> */}
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
            <div style={{display: showCallCard ? 'block' : 'none', position: 'absolute', top: '65px', right: '25px', width: '900px', height: '300px', backgroundColor: '#2a2f32', borderRadius: '15px', padding: '15px'}}>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      <svg
                          className="rounded me-2"
                          width="270"
                          height="270"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                      >
                        <rect width="100%" height="100%" fill="#007aff"></rect>
                      </svg>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <h3 style={{color: '#fff'}}>{workerCall.fio}</h3>
                        {/* <h3 style={{color: '#fff'}}>{workerCall.split(' ')[2]}</h3> */}
                        {/* <h3 style={{color: '#fff'}}>Отчество</h3> */}
                        <span style={{fontSize: '22px', color: '#858585', fontWeight: '700'}}>{workerCall.fio}</span>
                        <span style={{fontSize: '22px', color: '#858585', fontWeight: '700'}}>{workerCall.year_of_birth}</span>
                        {JSON.parse(workerCall.specialisies).map((spec, index)=>( 
                          <span key={index} style={{fontSize: '16px', color: '#858585'}}>
                            - {spec}
                          </span>
                        ))}
                        
                        <span style={{fontSize: '16px', color: '#858585'}}>{workerCall.comtags}</span>
                      </div>
                    </div>
                    
                  </CToastBody>
                  <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/>
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
                      <CButton onClick={updateD} color="dark" style={{marginLeft: '10px', marginBottom: '5px', background: shake3 ? '#262829' : '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                        Д
                      </CButton>
                      <CButton onClick={updateA} color="dark" style={{marginLeft: '10px',  background: shake4 ? '#262829' : '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
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
      <CHeaderDivider />
       <CContainer fluid>
        <AppBreadcrumb tabs={props.tabs} />
      </CContainer>
    </CHeader>

  )
}


export default AppHeader
