import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCursor,
  cilSpeedometer,
  cilPeople,
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

export default _nav
