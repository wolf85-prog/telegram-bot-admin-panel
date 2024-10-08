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
import { useUsersContext } from "../chat-app-new/context/usersContext";
import CompIcon from 'src/assets/images/dashboard3.png'


const AppRightbar = () => {
  const dispatch = useDispatch()
  const rigthbarShow = useSelector((state) => state.rigthbarShow)

  return (
    <CSidebar
      style={{right: '0'}}
      className="border-end"
      overlaid="true"
      visible={rigthbarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', rigthbarShow: visible })
      }}
    >

    </CSidebar>
  )
}

export default React.memo(AppRightbar)
