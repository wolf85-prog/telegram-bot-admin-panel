import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { 
  CContainer, 
  CSpinner, 
  CButton, 
  CTable, 
  CTableRow, 
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastClose,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CCollapse,
  CTooltip,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'


const DistributionR = () => {
  //const { distributionsWork: messages, addNewDistrib, workersAll } = useUsersContext();
  const [distributionsWork, setDistributionsWork]= useState([]);
  const [userReceivers, setUserReceivers]= useState([]);
  const [users, setUsers]= useState([]);
  const [loading, setLoading]= useState(true);
  const [proj, setProj] = useState('');
  const [seconds, setSeconds] = useState(1);

  const [visibleModal, setVisibleModal] = useState(false);

  const [text, setText]= useState("");

  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const [showTable, setShowTable] = useState([])

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Рассылка успешно удалена!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

          <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  <h2>Рассылки</h2>
                  <h5>Раздел находится в разработке</h5>

                  
                  
            </Suspense>
          </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DistributionR
