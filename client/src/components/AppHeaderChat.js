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
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'
import logo from './../assets/brand/logo_04_light.png'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [soundCount, setSoundCount] = useState(100)
  const [toast, addToast] = useState(0)
  const toaster = useRef()


  const clickPhone = () => {
    addToast(exampleToast) //ваша рассылка удалена
  }

  const exampleToast = (
    <CToast autohide={false} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>
          <div style={{display: 'flex'}}>
            <svg
                className="rounded me-2"
                width="100"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
            >
              <rect width="100%" height="100%" fill="#007aff"></rect>
            </svg>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <p>ФИО</p>
              <span>г. Москва</span>
              <span>01.01.2000</span>
              <span>-звукорежиссер</span>
            </div>
          </div>
          
        </CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const plusSound = () => {
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <CButton color="dark" style={{marginRight: '10px', marginBottom: '5px', background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                Д
              </CButton>
              <CButton color="dark" style={{marginRight: '10px',  background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
                А
              </CButton>
            </div>  
          </CNavItem>
          <CNavItem>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{marginRight: '20px', marginBottom: '15px', width:'200px'}}>
                <CProgress color="success" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
              </div>
              <div style={{marginRight: '20px', width:'200px'}}>
                <CProgress color="success" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
              </div>
            </div>
            
          </CNavItem>
          <CNavItem>
            <CButton onClick={plusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              +
            </CButton>
          </CNavItem>
          <CNavItem>
            <CFormInput 
              id="autoSizingInput" 
              style={{width: '25px', textAlign:'center', marginRight: '10px', fontSize: '9px', marginRight: '10px', height: '25px', paddingLeft: '0px', paddingRight: '0px', marginTop: '-2px'}}
              value={soundCount}
            />
          </CNavItem> 
          <CNavItem> 
            <CButton onClick={minusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              -
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton color="dark" style={{marginRight: '20px', background: 'red', fontSize: '7px', width: '23px', height: '23px', paddingRight: '0px', paddingLeft: '0px', marginTop: '-7px'}}>
              Mute
            </CButton>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={clickPhone} style={{position: 'relative', transform: 'rotate(90deg)', marginBottom: '3px'}}>
              <CIcon icon={cilPhone} size="lg"/>
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/soundsnotif" style={{position: 'relative'}}>
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/filemanager" style={{position: 'relative'}}>
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
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
