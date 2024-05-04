import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Icon from "./../../src/chat-app-new/components/Icon";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from './../assets/brand/logo_04_light.png'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  //const { newProject } = useUsersContext();
  //console.log("countProject: ", newProject)

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
        <CHeaderNav style={{marginTop: 'auto'}}>
          <CNavItem> 
            <CButton color="dark" style={{marginRight: '10px', background: '#595d5f', fontSize: '12px'}}>
              Д
            </CButton>
          </CNavItem>
          <CNavItem>
            <div style={{marginRight: '20px', width:'50px'}}>
              <CProgress color="success" height={32} value={100} >100%</CProgress>
            </div>
          </CNavItem>
          <CNavItem> 
            <CButton color="dark" style={{marginRight: '10px', background: '#595d5f', fontSize: '12px'}}>
              А
            </CButton>
          </CNavItem>
          <CNavItem>
            <div style={{marginRight: '20px', width:'50px'}}>
              <CProgress color="success" height={32} value={100} >100%</CProgress>
            </div>
          </CNavItem>
          <CNavItem>
            <CButton color="dark" style={{marginRight: '10px', background: '#595d5f', fontSize: '12px'}}>
              -
            </CButton>
          </CNavItem>
          <CNavItem>
            <CFormInput id="autoSizingInput" placeholder="100" style={{width: '55px', marginRight: '10px', fontSize: '12px'}}/>
          </CNavItem> 
          <CNavItem> 
            <CButton color="dark" style={{marginRight: '10px', background: '#595d5f', fontSize: '12px'}}>
              +
            </CButton>
          </CNavItem>
          <CNavItem>
            <CButton color="dark" style={{marginRight: '10px', background: 'red', fontSize: '12px'}}>
              Mute
            </CButton>
          </CNavItem>
          <CNavItem>
            <Icon id="phone"/>
            {/* <CIcon icon={cilPhone} size="lg" /> */}
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
      <CHeaderDivider />
       <CContainer fluid>
        <AppBreadcrumb tabs={props.tabs} />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
