import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

// routes config
import routes from '../routes'

const MessageBot = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    <h2>Сообщения от бота</h2>
                    <h5>Раздел находится в разработке</h5>
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default MessageBot
