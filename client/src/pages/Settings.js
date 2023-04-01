import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'

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
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Settings
