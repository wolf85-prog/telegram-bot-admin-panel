import React, {useContext} from 'react'
import {Context} from "../../index";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CButton,
} from '@coreui/react'
import {
  cilBell,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilList,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar from './../../assets/images/avatars/logo_chat_admin.png'
import {observer} from "mobx-react-lite";

const AppHeaderDropdown2 = observer(() => {
  const {user} = useContext(Context)

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilList} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end" style={{backgroundColor: '#2a2f32'}}>   
        <CDropdownItem href="#" style={{color: 'fff'}}>
          Обновить данные
        </CDropdownItem>
        <CDropdownHeader className="fw-semibold py-2" style={{backgroundColor: '#2a2f32'}}>
          <CProgress color="primery" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
        </CDropdownHeader>
        <CDropdownDivider />
        <CDropdownItem href="#" style={{color: 'fff'}}>
          Обновить аватар
        </CDropdownItem>
        <CDropdownHeader className="fw-semibold py-2" style={{backgroundColor: '#2a2f32'}}>
          <CProgress color="primery" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
        </CDropdownHeader>     
      </CDropdownMenu>
    </CDropdown>
  )
});

export default AppHeaderDropdown2
