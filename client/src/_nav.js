import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilPeople,
  CBadge
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
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
    // badge: {
    //   color: 'info',
    //   text: '1',
    // },
  },
  // {
  //   component: CNavItem,
  //   name: 'Проекты',
  //   to: '/chat3',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  // },
  
  // {
  //   component: CNavGroup,
  //   name: 'Аналитика',
  //   to: '/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Отчеты',
  //       to: '/reports',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Рассылки',
    to: '/distribution',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Архив',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Сообщения от бота',
  //       to: '/messagesbot',
  //     },
  //   ],
  // },
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
  // {
  //   component: CNavItem,
  //   name: 'Управление ролями',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  // },
]

export default _nav
