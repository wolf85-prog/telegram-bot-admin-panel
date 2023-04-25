import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCursor,
  cilSpeedometer,
  cilPeople,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from 'src/assets/brand/logo_04_light.png'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useUsersContext } from "./../chat-app-new/context/usersContext";

// sidebar nav config
//import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { countMessage } = useUsersContext();
  //console.log("countMessage: ", countMessage)
  let navigation = []
  
  countMessage !== 0
  ? navigation = [ //показывать бейдж
    {
      component: CNavItem,
      name: 'Панель управления',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Основные разделы',
    },
    {
      component: CNavItem,
      name: 'Заказчики',
      to: '/chat2',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      badge: {color: 'info', text: countMessage,},
    },
    
    {
      component: CNavItem,
      name: 'Рассылки',
      to: '/distribution',
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Уведомления',
      to: '/notifications',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    },
  ]
  : //не показывать бейдж
  navigation = [
    {
      component: CNavItem,
      name: 'Панель управления',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Основные разделы',
    },
    {
      component: CNavItem,
      name: 'Заказчики',
      to: '/chat2',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    
    {
      component: CNavItem,
      name: 'Рассылки',
      to: '/distribution',
      icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Уведомления',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Уведомления',
          to: '/notifications',
        },
      ],
    },
  ]

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logo} alt='' height={35} className="sidebar-brand-full"/>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
