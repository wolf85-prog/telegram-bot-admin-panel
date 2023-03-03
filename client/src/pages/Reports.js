import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

const Reports = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Отчеты</h2>
                    <h5>Раздел находится в разработке</h5>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Reports
