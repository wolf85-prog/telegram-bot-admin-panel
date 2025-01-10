import React, {useEffect, useState} from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilEnvelopeClosed,
  cilSpeedometer,
  cilPeople,
  cilMicrophone,
  cilSend,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavLink, CNavTitle } from '@coreui/react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from 'src/assets/brand/logo_04_light.png'
import logo2 from 'src/assets/brand/logo_04_blue.png'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { useUsersContext } from "./../chat-app-new/context/usersContext";
import CompIcon from 'src/assets/images/dashboard3.png'
import ProjIcon from 'src/assets/images/projects.png'
import ChatIcon from 'src/assets/images/chat.png'
import { newPretendent, getCountMessage } from 'src/http/adminAPI'

// sidebar nav config
//import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { countMessage, countMessageRent, countProjects, countMessageWork, countPretendent, showGetMess } = useUsersContext();

  const [count, setCount ] = useState(0);
  const [countMesW, setCountMesW ] = useState(0);
  //console.log("countMessageRent: ", countMessageRent)


  // useEffect(async() => {
  //   const res = await getCountMessage()
  //   console.log("res appsidebar: ", res)
  //   setCount(res.pretendents)
  //   setCountMesW(res.workers)
  // },[countMessage, newProject, countMessageWork, countPretendent])

  const handleLinkClick = (url) => {
    // Open the link in a new tab with desired features (optional)
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLinkClick2 = (url) => {
    // Open the link in a new tab with desired features (optional)
    window.open(url, '_self', 'noopener,noreferrer');
  };
  
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
      name: 'Проекты',
      to: '/projects',
      icon: <img src={ProjIcon} style={{width: '25px', marginRight: '18px', marginLeft: '4px'}} />,
      style: {backgroundColor: '#0078d421'},
    },
    {
      component: CNavLink,
      name: 'В эфире',
      icon: <CIcon icon={cilMicrophone} customClassName="nav-icon" />,
      style: {cursor: 'pointer'},
    },
    {
      component: CNavItem,
      name: 'Компании',
      to: '/companys',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
      component: CNavLink,
      name: 'Площадки',
      to: '/platforms',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      style: {cursor: 'pointer'},
    },  

//----------------------------------------------------------------------------------
    {
      component: CNavTitle,
      name: '',
    },
//-----------------------------------------------------------------------------------   

    {
      component: CNavLink,
      name: 'Менеджеры',
      icon: <img src={ChatIcon} style={{width: '21px', marginRight: '21px', marginLeft: '4px' }} />,
      onClick: ()=>handleLinkClick2('https://proj.uley.team:3002/chatrent'),
      style: {cursor: 'pointer', backgroundColor: '#0078d421'},
      badge: countMessageRent > 0 ? {color: 'info', text: countMessageRent,} : '',
    },
    {
      component: CNavLink,
      name: 'Рассылки',
      //to: '/distributionr',
      onClick: ()=>handleLinkClick2('https://proj.uley.team:3002/distributionr'),
      icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
      style: { cursor: 'pointer'},
    },   
    {
      component: CNavItem,
      name: 'Профиль',
      to: '/managers',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
      component: CNavLink,
      name: 'Уведомления',
      //to: '/managers',
      onClick: ()=>handleLinkClick2('https://proj.uley.team:3002/managers'),
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      badge: countProjects !== 0 ? {color: 'info', text: countProjects,} : "",
      style: { cursor: 'pointer'},
    },
    
//----------------------------------------------------------------------------------
    {
      component: CNavTitle,
      name: '',
    },
//-----------------------------------------------------------------------------------    

    // {
    //   component: CNavItem,
    //   name: 'Workhub',
    //   to: '/workhub',
    //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // },

//-------------------------------------------------------------------------------------------------    

    {
      component: CNavItem,
      name: 'Специалисты',
      to: '/chatwork',
      icon: <img src={ChatIcon} style={{width: '21px', marginRight: '20px', marginLeft: '6px'}} />,
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
      name: 'Профиль',
      to: '/specialist',
      icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Уведомления',
      to: '/workers',
      icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
      badge: countPretendent ? {color: 'info', text: countPretendent,} : "",
    },
//------------------------------------------------------------------------------------------------------
    {
      component: CNavTitle,
      name: '',
    },
//-------------------------------------------------------------------------------------------------------------

    {
      component: CNavItem,
      name: 'Тех. поддержка',
      to: '/support',
      icon: <img src={ChatIcon} style={{width: '21px', marginRight: '20px', marginLeft: '6px'}} />,
      badge: countMessageWork !== '0' ? {color: 'info', text: countMessageWork,} : "",
      style: {backgroundColor: '#0078d421'},
    },
    {
      component: CNavLink,
      name: 'Telegram',
      //href: 'https://t.me/ULEY_Assistant',
      icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
      onClick: ()=>handleLinkClick('https://t.me/ULEY_Assistant'),
      style: {cursor: 'pointer'},
    },
    {
      component: CNavItem,
      name: 'Архив',
      to: '/chat2',
      icon: <img src={ChatIcon} style={{width: '21px', marginRight: '20px', marginLeft: '6px'}} />,
      badge: countMessage !== 0 ? {color: 'info', text: countMessage,} : "",
      style: {сolor: '#e55353',},
    },
//--------------------------------------------------------------------------------------------------------    
    {
      component: CNavTitle,
      name: '',
    },
//---------------------------------------------------------------------------------------------------------
    
    
    // {
    //   component: CNavItem,
    //   name: 'Рассылки',
    //   to: '/distribution',
    //   icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    //   style: {сolor: '#e55353',},
    // },
   
    // {
    //   component: CNavItem,
    //   name: 'Уведомления',
    //   to: '/notifications',
    //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    //   badge: countProjects !== 0 ? {color: 'info', text: countProjects,} : "",
    //   style: {сolor: '#e55353',},
    // },
    // {
    //   component: CNavItem,
    //   name: 'Специалисты 2.0',
    //   to: '/specialist',
    //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    //   style: {color: '#e55353',},
    // },
    
    
  ]

  return (
    <CSidebar
      className="border-end"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      placement="start"
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/dashboard">
        <img src={logo} alt='' height={35} style={{position: 'absolute'}} className={showGetMess ? "logo-anim sidebar-brand-full" : "sidebar-brand-full"}/>
        <img src={logo2} alt='' height={35} style={{position: 'absolute', opacity: 0}} className={showGetMess ? "logo-anim2 sidebar-brand-full" : "sidebar-brand-full"}/>
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
