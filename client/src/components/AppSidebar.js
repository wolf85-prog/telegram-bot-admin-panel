import React, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilEnvelopeClosed,
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
import CompIcon from 'src/assets/images/dashboard3.png'
import { newPretendent, getCountMessage } from 'src/http/adminAPI'

// sidebar nav config
//import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { countMessage, newProject, countProjects, countMessageWork, countPretendent } = useUsersContext();

  const [count, setCount ] = useState(0);
  const [countMesW, setCountMesW ] = useState(0);
  console.log("countMessage: ", countMessageWork)

  // useEffect(async() => {
  //   const res = await getCountMessage()
  //   console.log("res appsidebar: ", res)
  //   setCount(res.pretendents)
  //   setCountMesW(res.workers)
  // },[countMessage, newProject, countMessageWork, countPretendent])
  
  let navigation = []

  navigation = [ //показывать бейдж
    {
      component: CNavItem,
      name: 'Пункт управления',
      to: '/dashboard',
      // icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      icon: <img src={CompIcon} style={{width: '25px', marginRight: '18px', marginLeft: '4px'}} />,
      style: {backgroundColor: '#2a2f32'}, //1b2227 //1f282c
    },
    {
      component: CNavTitle,
      name: '',
    },
    // {
    //   component: CNavTitle,
    //   name: 'Основные разделы',
    // },
    // {
    //   component: CNavItem,
    //   name: 'Renthub',
    //   to: '/renthub',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },
    {
      component: CNavItem,
      name: 'Менеджеры',
      to: '/chat2',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      badge: countMessage !== 0 ? {color: 'info', text: countMessage,} : "",
      style: {backgroundColor: '#0078d421'},
    },
    
    {
      component: CNavItem,
      name: 'Рассылки',
      to: '/distribution',
      icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Уведомления',
      to: '/notifications',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      badge: countProjects !== 0 ? {color: 'info', text: countProjects,} : "",
    },

    {
      component: CNavTitle,
      name: '',
    },

    // {
    //   component: CNavItem,
    //   name: 'Workhub',
    //   to: '/workhub',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },

    {
      component: CNavItem,
      name: 'Специалисты',
      to: '/chatwork',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      badge: countMessageWork !== '0' ? {color: 'info', text: countMessageWork,} : "",
      style: {backgroundColor: '#0078d421'},
    },
    {
      component: CNavItem,
      name: 'Рассылки',
      to: '/distributionw',
      icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Уведомления',
      to: '/workers',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      badge: countPretendent ? {color: 'info', text: countPretendent,} : "",
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
