import React, { Suspense } from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react'

// routes config
//import routes from '../routes'

const columns = [
  {
      name: 'Дата/время',
      selector: row => row.date,
  },
  {
      name: 'Название проекта',
      selector: row => row.title,
  },
  {
      name: 'Заказчик',
      selector: row => row.receiverId,
  },
  {
      name: 'Менеджер',
      selector: row => row.managerId,
  },
  {
      name: 'Адрес',
      selector: row => row.address,
  },
  {
      name: 'Контакты',
      selector: row => row.contacts,
  },
];

const data = [
  {
      date: '01.04.2023 00:00',
      title: 'Проект 1',
      receiverId: '121212',
      managerId: '121212',
      address: 'Адрес',
      contacts: 'Контакты',
  },
  {
    date: '01.04.2023 00:00',
      title: 'Проект 2',
      receiverId: '121212',
      managerId: '121212',
      address: 'Адрес',
      contacts: 'Контакты',
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
                    
                    <CRow className="mb-3">
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
                    />
                  </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Notifications
