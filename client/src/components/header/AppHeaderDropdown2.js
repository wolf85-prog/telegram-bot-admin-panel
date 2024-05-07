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
    <div>
      <CIcon icon={cilList} size="lg" />
      <div style={{backgroundColor: '#f3f3f3', width: '100px', height: '50px', position: 'absolute', top: '50px', right: '50px'}}></div>
    </div>
    // <CDropdown variant="nav-item">
    //   <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
    //     <CIcon icon={cilList} size="lg" />
    //   </CDropdownToggle>
    //   <CDropdownMenu className="pt-0" placement="bottom-end" style={{backgroundColor: '#2a2f32'}}>   
    //     {/* <CDropdownItem href="#" style={{color: 'fff'}}>
    //       <div style={{display: 'flex'}}>
    //         <div style={{display: 'flex', flexDirection: 'column'}}>
    //             <CButton color="dark" style={{marginRight: '10px', marginBottom: '5px', background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
    //               Д
    //             </CButton>
    //             <CButton color="dark" style={{marginRight: '10px',  background: '#595d5f', fontSize: '8px', width:'20px', height: '20px', padding: '0'}}>
    //               А
    //             </CButton>
    //           </div> 
    //         <div style={{display: 'flex', flexDirection: 'column'}}>
    //             <div style={{marginRight: '20px', marginBottom: '15px', width:'200px'}}>
    //               <CProgress color="primery" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
    //             </div>
    //             <div style={{marginRight: '20px', width:'200px'}}>
    //               <CProgress color="info" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
    //             </div>
    //         </div>
    //       </div>
          
    //     </CDropdownItem> */}
    //     {/* <CDropdownHeader className="fw-semibold py-2" style={{backgroundColor: '#2a2f32'}}>
    //       <CProgress color="primery" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
    //     </CDropdownHeader>
    //     <CDropdownDivider />
    //     <CDropdownItem href="#" style={{color: 'fff'}}>
    //       Обновить аватар
    //     </CDropdownItem>
    //     <CDropdownHeader className="fw-semibold py-2" style={{backgroundColor: '#2a2f32'}}>
    //       <CProgress color="primery" height={10} value={100} style={{fontSize: '8px'}}>100%</CProgress>
    //     </CDropdownHeader>      */}
    //   </CDropdownMenu>

      
    // </CDropdown>
  )
});

export default AppHeaderDropdown2
