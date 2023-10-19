import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilOptions } from '@coreui/icons'

const Settings = () => {
  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          
            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Настройки</h2>
                    <h5>Раздел находится в разработке</h5>
                    
                    <CWidgetStatsA
                      className="mb-4"
                      color="primary"
                      value={
                        <>
                          
                        </>
                      }
                      title=""
                      action={
                        <CDropdown alignment="end">
                          <CDropdownToggle color="transparent" caret={false} className="p-0">
                            <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem>Посмотреть</CDropdownItem>
                            <CDropdownItem>Обновить</CDropdownItem>
                            <CDropdownItem disabled>Другое</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      }
                      chart={
                        <CChartLine
                          className="mt-3 mx-3"
                          style={{ height: '500px' }}
                          data={{
                            labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
                            datasets: [
                              {
                                label: 'My First dataset',
                                backgroundColor: 'transparent',
                                borderColor: 'rgba(255,255,255,.55)',
                                pointBackgroundColor: getStyle('--cui-primary'),
                                data: [65, 59, 84, 84, 51, 55, 40],
                              },
                            ],
                          }}
                          options={{
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                            maintainAspectRatio: false,
                            scales: {
                              x: {
                                grid: {
                                  display: false,
                                  drawBorder: false,
                                },
                                ticks: {
                                  display: true,
                                },
                              },
                              y: {
                                min: 10,
                                max: 99,
                                display: true,
                                grid: {
                                  display: false,
                                },
                                ticks: {
                                  display: true,
                                },
                              },
                            },
                            elements: {
                              line: {
                                borderWidth: 1,
                                tension: 0.4,
                              },
                              point: {
                                radius: 4,
                                hitRadius: 10,
                                hoverRadius: 4,
                              },
                            },
                          }}
                        />
                      }
                    />
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Settings
