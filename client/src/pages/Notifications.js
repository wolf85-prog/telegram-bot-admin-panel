import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
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
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CFormLabel,
  CFormInput,
  CForm
} from '@coreui/react'

// routes config
import routes from '../routes'

const columns = [
  {
      name: '№',
      selector: row => row.id,
  },
  {
      name: 'Проект',
      selector: row => row.title,
  },
  {
      name: 'Текст',
      selector: row => row.text,
  },
  {
      name: 'Заказчик',
      selector: row => row.receiverId,
  },
  {
      name: 'Дата',
      selector: row => row.date,
  },
];

const data = [
  {
      id: 1,
      title: 'Проект 1',
      text: 'Запрос специалистов ...',
      receiverId: '121212',
      date: '01.04.2023 00:00',
  },
  {
      id: 2,
      title: 'Проект 2',
      text: 'Запрос специалистов ...',
      receiverId: '121212',
      date: '01.04.2023 00:00',
  },
]

const Notifications = () => {

  createTheme('solarized', {
    text: {
      primary: '#fff',
      secondary: '#2aa198',
    },
    background: {
      default: '#131c21',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#ffffff13',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Уведомления</h2>
                    <h5>Раздел находится в разработке</h5>
                    <br />
                    
                    {/* <CRow className="mb-3">
                      <CCol sm={3} >
                        <CFormInput placeholder="Поиск..." aria-label="City"/>
                      </CCol>
                    </CRow>

                    <DataTable
                      columns={columns}
                      data={data}
                      fixedHeader
                      pagination
                      theme="solarized"
                    /> */}
                  </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Notifications
