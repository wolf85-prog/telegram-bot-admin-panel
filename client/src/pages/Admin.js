import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilCloudDownload,
  cilPeople,
} from '@coreui/icons'

import avatar2 from 'src/assets/images/avatars/2.jpg'

import WidgetsDropdown from '../views/widgets/WidgetsDropdown'

// if (!user._id) {
//   return <Navigate to="/register" />;
// }

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const progressExample = [
  { title: 'Визиты', value: '29.703 Users', percent: 40, color: 'success' },
  { title: 'Уникальные', value: '24.093 Users', percent: 20, color: 'info' },
  { title: 'Просмотры', value: '78.706 Views', percent: 60, color: 'warning' },
  { title: 'Новые пользователи', value: '22.123 Users', percent: 80, color: 'danger' },
  { title: 'Отказы', value: 'Average Rate', percent: 40.15, color: 'primary' },
]

const tableExample = [
  {
    avatar: { src: avatar2, status: 'success' },
    user: {
      name: 'Yiorgos Avraamu',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'USA', flag: cifUs },
    usage: {
      value: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    payment: { name: 'Mastercard', icon: cibCcMastercard },
    activity: '10 sec ago',
  },
  {
    avatar: { src: avatar2, status: 'danger' },
    user: {
      name: 'Avram Tarasios',
      new: false,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Brazil', flag: cifBr },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'info',
    },
    payment: { name: 'Visa', icon: cibCcVisa },
    activity: '5 minutes ago',
  },
  {
    avatar: { src: avatar2, status: 'warning' },
    user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
    country: { name: 'India', flag: cifIn },
    usage: {
      value: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'warning',
    },
    payment: { name: 'Stripe', icon: cibCcStripe },
    activity: '1 hour ago',
  },
  {
    avatar: { src: avatar2, status: 'secondary' },
    user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
    country: { name: 'France', flag: cifFr },
    usage: {
      value: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'danger',
    },
    payment: { name: 'PayPal', icon: cibCcPaypal },
    activity: 'Last month',
  },
  {
    avatar: { src: avatar2, status: 'success' },
    user: {
      name: 'Agapetus Tadeáš',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Spain', flag: cifEs },
    usage: {
      value: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'primary',
    },
    payment: { name: 'Google Wallet', icon: cibCcApplePay },
    activity: 'Last week',
  },
  {
    avatar: { src: avatar2, status: 'danger' },
    user: {
      name: 'Friderik Dávid',
      new: true,
      registered: 'Jan 1, 2021',
    },
    country: { name: 'Poland', flag: cifPl },
    usage: {
      value: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      color: 'success',
    },
    payment: { name: 'Amex', icon: cibCcAmex },
    activity: 'Last week',
  },
]

const Admin = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>

                <>
                <WidgetsDropdown />
                <CCard className="mb-4">
                  <CCardBody>
                    <CRow>
                      <CCol sm={5}>
                        <h4 id="traffic" className="card-title mb-0">
                          Трафик
                        </h4>
                        <div className="small text-medium-emphasis">Январь - июль 2022</div>
                      </CCol>
                      <CCol sm={7} className="d-none d-md-block">
                        <CButton color="primary" className="float-end">
                          <CIcon icon={cilCloudDownload} />
                        </CButton>
                        <CButtonGroup className="float-end me-3">
                          {['День', 'Месяц', 'Год'].map((value) => (
                            <CButton
                              color="outline-secondary"
                              key={value}
                              className="mx-0"
                              active={value === 'Month'}
                            >
                              {value}
                            </CButton>
                          ))}
                        </CButtonGroup>
                      </CCol>
                    </CRow>
                    <CChartLine
                      style={{ height: '300px', marginTop: '40px' }}
                      data={{
                        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                        datasets: [
                          {
                            label: 'My First dataset',
                            backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                            borderColor: getStyle('--cui-info'),
                            pointHoverBackgroundColor: getStyle('--cui-info'),
                            borderWidth: 2,
                            data: [
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                            ],
                            fill: true,
                          },
                          {
                            label: 'My Second dataset',
                            backgroundColor: 'transparent',
                            borderColor: getStyle('--cui-success'),
                            pointHoverBackgroundColor: getStyle('--cui-success'),
                            borderWidth: 2,
                            data: [
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                              random(50, 200),
                            ],
                          },
                          {
                            label: 'My Third dataset',
                            backgroundColor: 'transparent',
                            borderColor: getStyle('--cui-danger'),
                            pointHoverBackgroundColor: getStyle('--cui-danger'),
                            borderWidth: 1,
                            borderDash: [8, 5],
                            data: [65, 65, 65, 65, 65, 65, 65],
                          },
                        ],
                      }}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          x: {
                            grid: {
                              drawOnChartArea: false,
                            },
                          },
                          y: {
                            ticks: {
                              beginAtZero: true,
                              maxTicksLimit: 5,
                              stepSize: Math.ceil(250 / 5),
                              max: 250,
                            },
                          },
                        },
                        elements: {
                          line: {
                            tension: 0.4,
                          },
                          point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3,
                          },
                        },
                      }}
                    />
                  </CCardBody>
                  <CCardFooter>
                    <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                      {progressExample.map((item, index) => (
                        <CCol className="mb-sm-2 mb-0" key={index}>
                          <div className="text-medium-emphasis">{item.title}</div>
                          <strong>
                            {item.value} ({item.percent}%)
                          </strong>
                          <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                        </CCol>
                      ))}
                    </CRow>
                  </CCardFooter>
                </CCard>

                {/* <WidgetsBrand withCharts /> */}

                <CRow>
                  <CCol xs>
                    <CCard className="mb-4">
                      <CCardHeader>Трафик и Продажи</CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-info py-1 px-3">
                                  <div className="text-medium-emphasis small">Новые клиенты</div>
                                  <div className="fs-5 fw-semibold">9,123</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Постоянные клиенты</div>
                                  <div className="fs-5 fw-semibold">22,643</div>
                                </div>
                              </CCol>
                            </CRow>

                            {/* <hr className="mt-0" />
                            {progressGroupExample1.map((item, index) => (
                              <div className="progress-group mb-4" key={index}>
                                <div className="progress-group-prepend">
                                  <span className="text-medium-emphasis small">{item.title}</span>
                                </div>
                                <div className="progress-group-bars">
                                  <CProgress thin color="info" value={item.value1} />
                                  <CProgress thin color="danger" value={item.value2} />
                                </div>
                              </div>
                            ))} */}
                          </CCol>

                          <CCol xs={12} md={6} xl={6}>
                            <CRow>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Просмотры</div>
                                  <div className="fs-5 fw-semibold">78,623</div>
                                </div>
                              </CCol>
                              <CCol sm={6}>
                                <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                  <div className="text-medium-emphasis small">Другое</div>
                                  <div className="fs-5 fw-semibold">49,123</div>
                                </div>
                              </CCol>
                            </CRow>

                            {/* <hr className="mt-0" />

                            {progressGroupExample2.map((item, index) => (
                              <div className="progress-group mb-4" key={index}>
                                <div className="progress-group-header">
                                  <CIcon className="me-2" icon={item.icon} size="lg" />
                                  <span>{item.title}</span>
                                  <span className="ms-auto fw-semibold">{item.value}%</span>
                                </div>
                                <div className="progress-group-bars">
                                  <CProgress thin color="warning" value={item.value} />
                                </div>
                              </div>
                            ))} */}

                            <div className="mb-5"></div>

                            {/* {progressGroupExample3.map((item, index) => (
                              <div className="progress-group" key={index}>
                                <div className="progress-group-header">
                                  <CIcon className="me-2" icon={item.icon} size="lg" />
                                  <span>{item.title}</span>
                                  <span className="ms-auto fw-semibold">
                                    {item.value}{' '}
                                    <span className="text-medium-emphasis small">({item.percent}%)</span>
                                  </span>
                                </div>
                                <div className="progress-group-bars">
                                  <CProgress thin color="success" value={item.percent} />
                                </div>
                              </div>
                            ))} */}
                          </CCol>
                        </CRow>

                        <br />

                        <CTable align="middle" className="mb-0 border" hover responsive>
                          <CTableHead color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">
                                <CIcon icon={cilPeople} />
                              </CTableHeaderCell>
                              <CTableHeaderCell>Пользователь</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Страна</CTableHeaderCell>
                              <CTableHeaderCell>Использование</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">Метод оплаты</CTableHeaderCell>
                              <CTableHeaderCell>Активность</CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {tableExample.map((item, index) => (
                              <CTableRow v-for="item in tableItems" key={index}>
                                <CTableDataCell className="text-center">
                                  <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.user.name}</div>
                                  <div className="small text-medium-emphasis">
                                    <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                    {item.user.registered}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div className="clearfix">
                                    <div className="float-start">
                                      <strong>{item.usage.value}%</strong>
                                    </div>
                                    <div className="float-end">
                                      <small className="text-medium-emphasis">{item.usage.period}</small>
                                    </div>
                                  </div>
                                  <CProgress thin color={item.usage.color} value={item.usage.value} />
                                </CTableDataCell>
                                <CTableDataCell className="text-center">
                                  <CIcon size="xl" icon={item.payment.icon} />
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div className="small text-medium-emphasis">Last login</div>
                                  <strong>{item.activity}</strong>
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              </>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Admin
